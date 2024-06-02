import React, { useState } from 'react';
import { connect } from 'react-redux';  

import '../style/modeselection.css';

function getTurnsLeft() {
      return 1;
}

function decrementTurnsLeft() {
      // decrement turns left
      // do something
}


const ModeSelection = ({ displayList, dispatchDisplay }) => {

      const [gameMode, setGameMode] = useState('');

      const handleGameModeChange = (e) => {
            setGameMode(e.target.value);
            document.getElementById("normal").checked = true;
      };

      const isChallengeMode = gameMode === 'challenge';
      const isEndlessMode = gameMode === 'endless';

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
                                                <div className="radio-item" style={{ color: (getTurnsLeft() <= 0) ? 'black' : 'gray' }}>
                                                      <input type="radio" id="challenge" name="gameMode" value="challenge" onChange={handleGameModeChange} disabled={getTurnsLeft() <= 0} />
                                                      <label htmlFor="challenge" style={{ color: (getTurnsLeft() <= 0) ? '#D3D3D3' : '' }}>Challenge Mode ({getTurnsLeft()} turns left)</label>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="option" style={{ color: isEndlessMode ? 'black' : 'gray' }}>
                                          <label>Game Level</label>
                                          <div className="radio-group">
                                                <div className="radio-item">
                                                      <input type="radio" id="easy" name="gameLevel" value="easy" disabled={!isEndlessMode} />
                                                      <label htmlFor="easy">Easy</label>
                                                </div>
                                                <div className="radio-item">
                                                      <input type="radio" id="normal" name="gameLevel" value="normal" disabled={!isEndlessMode} />
                                                      <label htmlFor="normal">Normal</label>
                                                </div>
                                                <div className="radio-item">
                                                      <input type="radio" id="hard" name="gameLevel" value="hard" disabled={!isEndlessMode} />
                                                      <label htmlFor="hard">Hard</label>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="play-option">
                                          <button
                                                className="play-button"
                                                onClick={() => {
                                                      decrementTurnsLeft();
                                                      dispatchDisplay('DISPLAY_GAME')}}
                                                disabled={(isChallengeMode && getTurnsLeft() === 0) || (!isEndlessMode && !isChallengeMode && gameMode === '')}
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
      dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr })
});

const mapStateToProps = ({ display }) => ({
      displayList: display.displayList
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeSelection);
