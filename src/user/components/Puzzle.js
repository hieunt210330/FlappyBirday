import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../style/puzzle.css'; // Import the CSS file

import { getPuzzleCount, resetPuzzleCount, createVoucher } from '../../api/database';
import { curUserId } from '../../class/user';

const Puzzle = ({ dispatchDisplay }) => {
  const [piecesCollected, setPiecesCollected] = useState(0); // Using a number instead of an array
  const totalPieces = 4;

  const convertPiecesCollected = (piecesCollected) => {
    const collectedArray = [];
    for (let i = 0; i < totalPieces; i++) {
      collectedArray.push(i < piecesCollected);
    }
    return collectedArray;
  }

  useEffect(() => {
    const fetchPuzzleCount = async () => {
      const count = await getPuzzleCount(curUserId);
      setPiecesCollected(count);
    };

    fetchPuzzleCount();
  }, []);

  const handleClose = () => {
    dispatchDisplay('DISPLAY_HOME_USER');
  };

  const handleReward = async () => {
    await resetPuzzleCount(curUserId);
    const count = await getPuzzleCount(curUserId);
    setPiecesCollected(count);

    const expiryDate = new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0];
    if (Math.floor(Math.random() * 1000) >= 500) {
      const discountPercentage = Math.floor(Math.random() * 40) + 1;
      createVoucher(curUserId, `PUZZLE${discountPercentage}%`, discountPercentage, 0, 0, 0, expiryDate);
      alert(`You got a ${discountPercentage}% discount voucher!`);
    } else {
      const discountValue = Math.floor(Math.random() * 100) + 1;
      await createVoucher(curUserId, `PUZZLE${discountValue}$`, 0, 0, 0, discountValue, expiryDate);
      alert(`You got a ${discountValue}$ discount voucher!`);
    }
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <button className="home-button" onClick={handleClose}>Home</button>
        <h2 className="header-text">Puzzle</h2>
      </div>
      <p className="puzzle-status">
        <span className="collected-count">{piecesCollected}</span>/{totalPieces} Pieces Collected!
      </p>
      <div className="puzzle-grid">
        {convertPiecesCollected(piecesCollected).map((collected, index) => (
          <div
            key={index}
            className={`puzzle-piece ${collected ? `piece-${index + 1}` : `piece-${index + 1}-not-collected`}`}
          ></div>
        ))}
      </div>
      <button className="reward-button" onClick={handleReward}
              disabled={piecesCollected < totalPieces}
        >Receive Reward</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr }),
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);
