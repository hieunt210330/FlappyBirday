import React from 'react';
import '../style/endgame.css';

const EndGame = ({ score, turnsLeft, onReceiveGifts, onNewGame }) => {
  return (
    <div className="end-game-screen">
      <div className="end-game-content">
        <button className="close-button" onClick={onNewGame}>X</button>
        <h1>CONGRATULATIONS!</h1>
        <p className="sub-text">You scored</p>
        <div className="score">{score}</div>
        <p className="gifts-text">You've got some gifts!!!</p>
        <button className="receive-button" onClick={onReceiveGifts}>Receive</button>
        <div className="turns-left">
          <span>Turns Left:</span>
          <span className="turns-left-value">{turnsLeft}</span>
        </div>
        <button
          className="new-game-button"
          onClick={onNewGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default EndGame;
