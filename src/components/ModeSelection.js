import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';  

import '../style/modeselection.css';

import { 
      decrementTurnLeft,
      getTurnLeft
 } from '../api/database';

const ModeSelection = ({ displayList, dispatchDisplay }) => {

      const [gameMode, setGameMode] = useState('');
      const [gameLevel, setGameLevel] = useState('');
      const [turnsLeft, setTurnsLeft] = useState(null);
      const userId = process.env.USER_ID;

      useEffect(() => {
            const fetchTurnsLeft = async () => {
                try {
                    const turns = await getTurnLeft(userId);
                    setTurnsLeft(turns);
                } catch (error) {
                    console.error('Error fetching turns left:', error);
                }
            };
    
            fetchTurnsLeft();
        }, [userId]);

      const handleGameModeChange = (e) => {
            setGameMode(e.target.value);
            document.getElementById("normal").checked = true;
      };

      const handleGameLevelChange = (e) => {
            setGameLevel(e.target.value);
      }

      const isChallengeMode = gameMode === 'challenge';
      const isEndlessMode = gameMode === 'endless';

      const handlePlayClick = async () => {
            if (isChallengeMode && turnsLeft > 0) {
                  await decrementTurnLeft(userId);
                  setTurnsLeft(turnsLeft - 1);
            }
            if (isEndlessMode)
            {
                  const payload = { gameMode: gameMode, gameLevel: gameLevel};
                  //dispatch({type: "DISPLAY_GAME", payload: payload });
                  dispatchDisplay('DISPLAY_GAME', payload);
            }
            else
            {
                  const payload = {gameMode: gameMode, gameLevel: 'normal'};
                  //dispatch({type:"DISPLAY_GAME", payload: payload });
                  dispatchDisplay('DISPLAY_GAME', payload);

            }
      };

      return (
            <div className="mode-selection-container">
                  <div className="mode-selection-screen">
                        <div className="mode-selection-content">
                              <button className="turn-back-button" onClick={() => dispatchDisplay('DISPLAY_HOME')}>Home</button>
                              <h2>New Game</h2>
                              <div className="options">
                                    <div className="option">
                                          <label>Game Mode</label>
                                          <div className="radio-group">
                                                <div className="radio-item">
                                                      <input type="radio" id="endless" name="gameMode" value="endless" onChange={handleGameModeChange} />
                                                      <label htmlFor="endless">Endless Journey</label>
                                                </div>
                                                <div className="radio-item" style={{ color: (turnsLeft > 0) ? 'black' : 'gray' }}>
                                                      <input type="radio" id="challenge" name="gameMode" value="challenge" onChange={handleGameModeChange} disabled={turnsLeft <= 0} />
                                                      <label htmlFor="challenge" style={{ color: (turnsLeft <= 0) ? '#D3D3D3' : '' }}>Challenge Mode ({turnsLeft} turns left)</label>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="option" style={{ color: isEndlessMode ? 'black' : 'gray' }}>
                                          <label>Game Level</label>
                                          <div className="radio-group">
                                                <div className="radio-item">
                                                      <input type="radio" id="easy" name="gameLevel" value="easy" onChange={handleGameLevelChange} disabled={!isEndlessMode} />
                                                      <label htmlFor="easy">Easy</label>
                                                </div>
                                                <div className="radio-item">
                                                      <input type="radio" id="normal" name="gameLevel" value="normal" onChange={handleGameLevelChange} disabled={!isEndlessMode} />
                                                      <label htmlFor="normal">Normal</label>
                                                </div>
                                                <div className="radio-item">
                                                      <input type="radio" id="hard" name="gameLevel" value="hard" onChange={handleGameLevelChange} disabled={!isEndlessMode} />
                                                      <label htmlFor="hard">Hard</label>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="play-option">
                                          <button
                                                className="play-button"
                                                onClick={handlePlayClick}
                                                disabled={(isChallengeMode && turnsLeft === 0) || (!isEndlessMode && !isChallengeMode && gameMode === '')}
                                          >
                                                Play
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

const mapDispatchToProps = (dispatch) => ({
      dispatchDisplay: (displayTypeStr, payload) => dispatch({ type: displayTypeStr, payload: payload})
});

const mapStateToProps = ({ display }) => ({
      displayList: display.displayList
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeSelection);
