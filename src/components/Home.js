import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useState } from 'react';

import ModeSelection from './ModeSelection';
import Sidebar from './Sidebar';
import Info from './Info';
import '../style/home.css';

let cnt = 0;

const Home = ({dispatchDisplay}) => {
    
    return (
      <div className="home-screen">
          <div className="main-content">
            <h1>Welcome to Flappy Birday!</h1>
            <button className="start-button" onClick={() => dispatchDisplay('DISPLAY_MODE_SELECTION')}>Start Game!</button>
            <div className="info">
              <p>Highest Point: <span className="high-score">XXX</span></p>
              <p>Number of Turns Left: <span className="turns-left">X</span></p>
            </div>
          </div>
      </div>
    );
};

const dispatchDisplay = (diplayTypeStr) => {
  return (dispatch) => {
    dispatch({type: diplayTypeStr})
  }
}

//const mapStateToProps = ({display}) => ({displayList: display.displayList});
const mapStateToProps = ({}) => ({});


const mapDispatchToProps = {dispatchDisplay};

export default connect(mapStateToProps, mapDispatchToProps)(Home);