import React from 'react';
import { useState } from 'react';

import Reward from './Reward';
import Scoreboard from './Scoreboard';
import Checkin from './Checkin';

import '../style.css';

const Info = ({ screen }) => {
  const [activeTab, setActiveTab] = useState('screen');

  const tabs = ['Global Ranking', 'Received Rewards', 'Daily Checkin'];

  const fnDisplayTab = (option) => {
    setActiveTab(option);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar} className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            style={{ ...styles.tab, ...(activeTab === tab ? styles.activeTab : styles.inactiveTab) }}
            onClick={() => fnDisplayTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {activeTab === 'Global Ranking' && <Scoreboard />}
        {activeTab === 'Received Rewards' && <Reward />}
        {activeTab === 'Daily Checkin' && <Checkin />}
      </div>
    </div>
  );
}

export default Info;

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    width: '80%',
    margin: '20px auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    minWidth: '500px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: '1px solid #ccc',
  },
  tab: {
    flex: 1,
    padding: '10px 0',
    cursor: 'pointer',
    textAlign: 'center',
    minWidth: '150px',
    width: '90%',
  },
  activeTab: {
    backgroundColor: '#dfeaff',
    fontWeight: 'bold',
  },
  inactiveTab: {
    backgroundColor: '#f9f9f9',
  },
  content: {
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    margin: '10px 0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    height: "50vh",
    overflow: "auto",
  },
  header: {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    color: '#f00',
  },
  cell: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
  },
  tbody: {
    height: "50vh",
    overflow: "scroll",
  },
};
