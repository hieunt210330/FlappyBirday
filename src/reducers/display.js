

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
    displayRules: false,
    displayReceipt: false,
    displayExit: false,

    displayLogin: false,
    displayAdminHome: false,
    displayRegister: false
}

const intialState = {
    displayList: displayList
}

export default (state = intialState, {type} = {}) => {
    let displayListTmp = {displayList};
    switch (type) {
        case 'DISPLAY_HOME_USER':
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

        case 'DISPLAY_FEEDBACK':
            displayListTmp.displayFeedback = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_RULES':
            displayListTmp.displayRules = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};
        
        case 'DISPLAY_RECEIPT':
            displayListTmp.displayReceipt = true;
            displayListTmp.displaySidebar = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_LOGIN':
            displayListTmp.displayLogin = true;
            return {...state, displayList: displayListTmp};
         
        case 'DISPLAY_REGISTER':
            displayListTmp.displayRegister = true;
            return {...state, displayList: displayListTmp};

        case 'DISPLAY_HOME_ADMIN':
            displayListTmp.displayAdminHome = true;
            return {...state, displayList: displayListTmp};

        default:
            return state;
    }
}