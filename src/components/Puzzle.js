import React, { useState } from 'react';

const Puzzle = () => {
  const [piecesCollected, setPiecesCollected] = useState(0);
  const totalPieces = 10; // Example total pieces

  const handleClose = () => {
    // Logic to close the puzzle
    console.log('Puzzle closed');
  };

  const handleReward = () => {
    // Logic to handle reward
    console.log('Reward received');
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <h2>Hidden Puzzle</h2>
        <button className="close-button" onClick={handleClose}>✖</button>
      </div>
      <p className="puzzle-status">
        <span className="collected-count">{piecesCollected}</span>/{totalPieces} Pieces Collected!
      </p>
      <div className="puzzle-image">
        <img src="puzzle-image-placeholder.png" alt="Puzzle" />
      </div>
      <button className="reward-button" onClick={handleReward}>Received Reward</button>
    </div>
  );
}

export default Puzzle;