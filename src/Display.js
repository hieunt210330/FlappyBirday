import React, { useEffect } from "react";
import { connect } from "react-redux";
import Home from './user/components/Home';
import EndScreen from './user/components/EndScreen';
import ModeSelection from './user/components/ModeSelection';
import Game from './user/components/Game';
import Sidebar from './user/components/SideBar';
import Info from './user/components/Info';
import Puzzle from "./user/components/Puzzle";
import Feedback from "./user/components/Feedback";
import Rules from "./user/components/Rules";
import Reward from './user/components/Reward';
import Scoreboard from './user/components/Scoreboard';
import Checkin from './user/components/Checkin';

import Login from "./common/components/Login";

import AdminHome from "./admin/components/AdminHome";

const Display = ({ displayList, dispatchDisplay }) => {
    useEffect(() => {
        if (!Object.values(displayList).some(value => value === true)) {
            dispatchDisplay('DISPLAY_LOGIN');
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
    if (displayList.displayRules) {
        console.log("Displaying rules");
        displayComponents.push(<Rules key="rules" />);
    }
    if (displayList.displayLogin) {
        displayComponents.push(<Login key="login" />);
    }
    if (displayList.displayAdminHome) {
        displayComponents.push(<AdminHome key="adminHome" />);
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