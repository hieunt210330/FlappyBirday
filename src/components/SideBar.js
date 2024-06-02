import React, { useState } from 'react';
import { connect } from 'react-redux';
import exitIcon from '../../.../../images/icons/exit.png'; 
import rulesIcon from '../../.../../images/icons/rules.png';
import checkinIcon from '../../.../../images/icons/checkin.png';
import scoreboardIcon from '../../.../../images/icons/scoreboard.png';
import puzzleIcon from '../../.../../images/icons/puzzle.png';
import volumeIcon from '../../.../../images/icons/volume.png';
import bugIcon from '../../.../../images/icons/bug.png';
import toggleIcon from '../../.../../images/icons/sidebar.png';
import rewardIcon from '../../.../../images/icons/reward.png';

import '../style/sidebar.css';

import Puzzle from './Puzzle';
import Info from './Info';

const Sidebar = ({dispatchDisplay}) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <img src={toggleIcon} alt="Toggle" />
        </button>
        {isExpanded && (
          <>
            <button className="sidebar-button"><img src={exitIcon} alt="Exit" /></button>
            <button className="sidebar-button"><img src={rulesIcon} alt="Rules" /></button>
            <button className="sidebar-button" onClick={() => dispatchDisplay('DISPLAY_CHECKIN')}><img src={checkinIcon} alt="Checkin" /></button>
            <button className="sidebar-button" onClick={() => dispatchDisplay('DISPLAY_SCOREBOARD')}><img src={scoreboardIcon} alt="Scoreboard" /></button>
            <button className="sidebar-button" onClick={() => dispatchDisplay('DISPLAY_CHECKIN')}><img src={rewardIcon} alt="Reward" /></button>
            <button className="sidebar-button" onClick={() => dispatchDisplay('DISPLAY_REWARD')}><img src={puzzleIcon} alt="Puzzle" /></button>
            <button className="sidebar-button"><img src={volumeIcon} alt="Volume" /></button>
            <button className="sidebar-button" onClick={() => dispatchDisplay('DISPLAY_BUG_REPORT')}><img src={bugIcon} alt="Bug Report" /></button>
          </>
        )}
      </div>
    </div>
  );
};

const dispatchDisplay = (diplayTypeStr) => {
  return (dispatch) => {
      dispatch({type: diplayTypeStr})
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {dispatchDisplay};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
