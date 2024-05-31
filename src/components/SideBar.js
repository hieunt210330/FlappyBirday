import React from 'react';
import { useState } from 'react';

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

const Sidebar = ({ onOptionChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const [option, setOption] = useState('');

  const fnDisplayOption = (option) => {
    setOption(option);
    onOptionChange(option);
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
            <button className="sidebar-button" onClick={() => fnDisplayOption('checkin')}><img src={checkinIcon} alt="Checkin" /></button>
            <button className="sidebar-button" onClick={() => fnDisplayOption('scoreboard')}><img src={scoreboardIcon} alt="Scoreboard" /></button>
            <button className="sidebar-button" onClick={() => fnDisplayOption('reward')}><img src={rewardIcon} alt="Reward" /></button>
            <button className="sidebar-button" onClick={() => fnDisplayOption('puzzle')}><img src={puzzleIcon} alt="Puzzle" /></button>
            <button className="sidebar-button"><img src={volumeIcon} alt="Volume" /></button>
            <button className="sidebar-button" onClick={() => fnDisplayOption('bug-report')}><img src={bugIcon} alt="Bug Report" /></button>
          </>
        )}
      </div>
      <div>
        {(option === 'checkin' || option === 'reward' || option === 'scoreboard') && <Info screen={option} />}
        {option === 'puzzle' && <Puzzle />}
      </div>
    </div>
  );
};

export default Sidebar;
