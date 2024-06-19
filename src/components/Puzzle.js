import React, { useState } from 'react';
import { connect } from 'react-redux';
// import './Puzzle.css'; // Assuming you have a separate CSS file for styling

const Puzzle = ({ dispatchDisplay }) => {
  const [piecesCollected, setPiecesCollected] = useState([true, false, false, false]); // Initial state indicating all pieces are not collected, modify to true if a piece is collected
  const totalPieces = 4;

  const handleClose = () => {
    dispatchDisplay('DISPLAY_HOME');
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
        <span className="collected-count">{piecesCollected.filter(Boolean).length}</span>/{totalPieces} Pieces Collected!
      </p>
      <div className="puzzle-grid">
        {piecesCollected.map((collected, index) => (
          <div
            key={index}
            className={`puzzle-piece ${collected ? `piece-${index + 1}` : `piece-${index + 1}-not-collected`}`}
          ></div>
        ))}
      </div>
      <button className="reward-button" onClick={handleReward}>Receive Reward</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr }),
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);
