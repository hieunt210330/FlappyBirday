import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useState } from 'react';

import ModeSelection from './ModeSelection';
import Sidebar from './Sidebar';
import Info from './Info';
import '../style/home.css';

const Home = ({status, dispatchDisplay}) => {
  
  const [displayScreen, setDisplayScreen] = useState('home');
  const [sidebarOption, setSidebarOption] = useState('');

  const fnDisplay = (scr) => {
    setDisplayScreen(scr);
    setSidebarOption('');
  };

  const handleOptionChange = (option) => {
    setSidebarOption(option);
    if (option) {
      setDisplayScreen('info');
    } else {
      setDisplayScreen('home');
    }
  };
  
  dispatchDisplay('DISPLAY_HOME');

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
      return <ModeSelection fnGoBack={fnDisplay} />;
    case 'info':
      return <Info screen={sidebarOption} fnGoBack={fnDisplay} />;
    
    default:
      return (<div></div>);
  }
};

const dispatchDisplay = (diplayTypeStr) => {
  return (dispatch, getState) => {
    dispatch({type: diplayTypeStr})
  }
}

//const mapStateToProps = ({display}) => ({displayList: display.displayList});
const mapStateToProps = ({display}) => ({status: display.displayList});


const mapDispatchToProps = {dispatchDisplay};

export default connect(mapStateToProps, mapDispatchToProps)(Home);