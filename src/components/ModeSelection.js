import React, { useState } from 'react';
import EndGame from './Endgame';
import Sidebar from './Sidebar';
import Game from './Game';
import '../style/modeselection.css';

const ModeSelection = ({ fnGoBack }) => {
  const [displayScreen, setDisplayScreen] = useState('choose-game-mode');
  const [gameMode, setGameMode] = useState('');
  const [turnsLeft, setTurnsLeft] = useState(getTurnsLeft());

  const fnDisplay = (scr) => {
    setDisplayScreen(scr);
  };

  const handleGameModeChange = (e) => {
    setGameMode(e.target.value);
    document.getElementById("normal").checked = true;
  };

  const isChallengeMode = gameMode === 'challenge';
  const isEndlessMode = gameMode === 'endless';

  if (displayScreen === 'game') {
    return <Game />;
  }

  else if (displayScreen === 'info') {
    return <Info screen={sidebarOption} fnGoBack={fnDisplay} />;
  }
  return (
    <div className="mode-selection-container">
        <Sidebar onOptionChange={handleGameModeChange} />
      <div className="mode-selection-screen">
        <div className="mode-selection-content">
          <button className="turn-back-button" onClick={() => fnGoBack('home')}>Home</button>
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
                onClick={() => fnDisplay('game')}
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

export default ModeSelection;

function getTurnsLeft() {
  return 1;
}
