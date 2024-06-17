import React, { useEffect } from "react";
import { connect } from "react-redux";
import Home from './Home';
import EndScreen from './EndScreen';
import ModeSelection from './ModeSelection';
import Game from './Game';
import Sidebar from './SideBar';
import Info from './Info';
import Puzzle from "./Puzzle";
import Feedback from "./Feedback";
import Volume from "./Volume";
import Rules from "./Rules";
import Reward from './Reward';
import Scoreboard from './Scoreboard';
import Checkin from './Checkin';

import '../style/home.css';

const Display = ({ displayList, dispatchDisplay }) => {
    useEffect(() => {
        if (!Object.values(displayList).some(value => value === true)) {
            dispatchDisplay('DISPLAY_HOME');
        }
    }, [displayList, dispatchDisplay]);

    let displayComponents = [];

    if (displayList.displayHome) {
        displayComponents.push(<Home key="home" />);
    }
    if (displayList.displayModeSelection) {
        displayComponents.push(<ModeSelection key="modeSelection" />);
    }
    if (displayList.displayGame) {
        displayComponents.push(<Game key="game" />);
    }
    if (displayList.displayEndGame) {
        displayComponents.push(<EndScreen key="endGame" />);
    }
    if (displayList.displayInfo) {
        displayComponents.push(<Info key="info" />);
    }
    if (displayList.displaySidebar) {
        displayComponents.push(<Sidebar key="sidebar" />);
    }
    if (displayList.displayCheckin) {
        displayComponents.push(<Checkin key="checkin" />);
    }
    if (displayList.displayScoreboard) {
        displayComponents.push(<Scoreboard key="checkin" />);
    }
    if (displayList.displayReward) {
        displayComponents.push(<Reward key="reward" />);
    }
    if (displayList.displayPuzzle) {
        displayComponents.push(<Puzzle key="puzzle" />);
    }

    if (displayList.displayFeedback) {
        displayComponents.push(<Feedback key="bugReport" />);
    }
    if (displayList.displayVolume) {
        displayComponents.push(<Volume key="volume" />);
    }
    if (displayList.displayRules) {
        displayComponents.push(<Rules key="rules" />);
    }
    return (
        <div>
            {displayComponents}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr })
});

const mapStateToProps = ({ display }) => ({
    displayList: display.displayList
});

export default connect(mapStateToProps, mapDispatchToProps)(Display);
