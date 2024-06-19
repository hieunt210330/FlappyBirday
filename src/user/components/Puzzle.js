import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../style/puzzle.css'; // Import the CSS file

const Puzzle = ({ dispatchDisplay }) => {
  const [piecesCollected, setPiecesCollected] = useState([true, false, false, false]); // Trạng thái ban đầu cho các mảnh ghép
  const totalPieces = 4;

  const handleClose = () => {
    dispatchDisplay('DISPLAY_HOME_USER');
  };

  const handleReward = () => {
    // Logic để nhận phần thưởng
    console.log('Phần thưởng đã nhận');
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <button className="home-button" onClick={handleClose}>Home</button>
        <h2 className="header-text">Puzzle</h2>
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
