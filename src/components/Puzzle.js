import React, { useState } from 'react';
import { connect } from 'react-redux';

const Puzzle = ({dispatchDisplay}) => {

  const [piecesCollected, setPiecesCollected] = useState(0);
  const totalPieces = 10; // Example total pieces

  const handleClose = () => {
    dispatchDisplay('DISPLAY_HOME')
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

const dispatchDisplay = (diplayTypeStr) => {
  return (dispatch) => {
      dispatch({type: diplayTypeStr})
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {dispatchDisplay};

export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);
