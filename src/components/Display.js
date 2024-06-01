import React, { useEffect } from "react";
import { connect } from "react-redux";
import Home from './Home';
import ModeSelection from './ModeSelection';
import Game from './Game';
import Sidebar from './Sidebar';
import Info from './Info';
import Puzzle from "./Puzzle";
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
        displayComponents.push(<Home key="endGame" />);
    }
    if (displayList.displayInfo) {
        displayComponents.push(<Info key="info" />);
    }
    if (displayList.displaySidebar) {
        displayComponents.push(<Sidebar key="sidebar" />);
    }
    if (displayList.displayPuzzle) {
        displayComponents.push(<Puzzle key="puzzle" />);
    }
    // Add more components as needed, e.g., BugReport, Volume, Rules

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
