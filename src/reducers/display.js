

const displayList = {
    displayHome: false,
    displayModeSelection: false,
    displayGame: false,
    displayEndGame: false,
    displayInfo: false,
    displaySidebar: false,
    displayPuzzle: false,
    displayCheckin: false,
    displayScoreboard: false,
    displayReward: false,
    displayBugReport: false,
    displayVolume: false,
    displayRules: false,
    displayExit: false,

}

const intialState = {
    displayList: displayList
}

export default (state = intialState, {type} = {}) => {
    let displayListTmp = {displayList};
    switch (type) {
        case 'DISPLAY_HOME':
            displayListTmp.displayHome = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};
        case 'DISPLAY_MODE_SELECTION':
            displayListTmp.displayModeSelection = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_GAME':
            displayListTmp.displayGame = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_END_GAME':
            displayListTmp.displayEndGame = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_INFO':
            displayListTmp.displayInfo = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_PUZZLE':
            displayListTmp.displayPuzzle = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_CHECKIN':
            displayListTmp.displayCheckin = true;
            displayListTmp.displayInfo = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_SCOREBOARD':
            displayListTmp.displayScoreboard = true;
            displayListTmp.displayInfo = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_REWARD':
            displayListTmp.displayReward = true;
            displayListTmp.displayInfo = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_BUG_REPORT':
            displayListTmp.displayBugReport = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_VOLUME':
            displayListTmp.displayVolume = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_RULES':
            displayListTmp.displayRules = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};
        
        default:
            return state;
    }
}