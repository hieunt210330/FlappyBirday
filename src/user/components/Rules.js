import React from "react";
import { connect } from "react-redux";
import '../style/home.css';
import '../style/rules.css';

const Rules = ({ dispatchDisplay }) => {
  return (
    <div className="rules-container">
      <h2>Game Rules</h2>
      <div className="rules-content">
        <div className="rule-section">
          <h3>Objective</h3>
          <p>Navigate the bird through a series of pipes without hitting them. Score points by passing through gaps in the pipes and collect rewards by making the bird touch them.</p>
        </div>
        <div className="rule-section">
          <h3>Basic Controls</h3>
          <p>Each tap or click makes the bird flap its wings and rise. The bird falls due to gravity when not flapping.</p>
        </div>
        <div className="rule-section">
          <h3>Gameplay Mechanics</h3>
          <ul>
            <li><strong>Starting the Game:</strong> Tap the screen or click the mouse to make the bird start flying.</li>
            <li><strong>Navigating the Bird:</strong> Tap or click to make the bird rise. The bird falls due to gravity, so keep tapping or clicking to maintain the correct altitude to pass through the gaps in the pipes.</li>
            <li><strong>Scoring Points:</strong> Earn a point for each set of pipes the bird successfully passes through. The score is displayed at the top of the screen.</li>
            <li><strong>Collecting Rewards:</strong> Touch displayed reward items with the bird to claim them.</li>
            <li><strong>Avoiding Obstacles:</strong> Avoid hitting the pipes and the ground. The game ends immediately if the bird collides with a pipe or the ground.</li>
            <li><strong>Game Over:</strong> When the game ends, the player's final score is displayed.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr })
});

export default connect(null, mapDispatchToProps)(Rules);
