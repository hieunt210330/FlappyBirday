import React, { useState } from 'react';

import ModeSelection from './ModeSelection';
import Sidebar from './Sidebar';
import '../style/home.css';

const Home = () => {
  const [displayScreen, setDisplayScreen] = useState('home');
  const [sidebarOption, setSidebarOption] = useState('');

  const fnDisplay = (scr) => {
    setDisplayScreen(scr);
  };

  const handleOptionChange = (option) => {
    setSidebarOption(option);
  };

  switch (displayScreen) {
    case 'home':
      return (
        <div className="home-screen">
          <Sidebar onOptionChange={handleOptionChange} />
          {!sidebarOption && (
            <div className="main-content">
              <h1>Welcome to Flappy Birday!</h1>
              <button className="start-button" onClick={() => fnDisplay('choose-game-mode')}>Start Game!</button>
              <div className="info">
                <p>Highest Point: <span className="high-score">XXX</span></p>
                <p>Number of Turns Left: <span className="turns-left">X</span></p>
              </div>
            </div>
          )}
        </div>
      );
    case 'choose-game-mode':
      return <ModeSelection fnGoBack={fnDisplay} />
    default:
      return (<div></div>);
  }

  return (<div></div>);
};

export default Home;
