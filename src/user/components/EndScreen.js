import React from "react";
import { connect } from "react-redux";
import '../style/end.css';
import { RotateCcw , Home } from "lucide-react";

const EndScreen = ({ score, dispatchDisplay }) => {
  return (
    <div className="home-screen">
      <div className="main-content">
        <h1>Game Over!</h1>
        <div className="score-info">
          <p>Your Score: <span className="score">{score}</span></p>
        </div>
        <div className="button-row">
          <button className="icon-button replay-button" onClick={() => dispatchDisplay('DISPLAY_GAME')}>
            Replay
          </button>
          <button className="icon-button home-button-end" onClick={() => dispatchDisplay('DISPLAY_HOME_USER')}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

const dispatchDisplay = (displayTypeStr) => {
  return (dispatch) => {
    dispatch({ type: displayTypeStr });
  };
};

const mapStateToProps = (state) => ({
  score: state.game.score,
});

const mapDispatchToProps = { dispatchDisplay };

export default connect(mapStateToProps, mapDispatchToProps)(EndScreen);
