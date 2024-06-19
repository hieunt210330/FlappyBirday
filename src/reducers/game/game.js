
import {
    updateScore,
} from "../../api/database"

import config from "../../class/GameConfig";

const initialState = {
    score: 0,
    status: 'end',
    gameMode: 'endless',
    gameLevel: 'normal'
}

export default (state = initialState, {type , payload} = {} ) => {
    const gameLevel = payload?.gameLevel === undefined ? state.gameLevel : payload.gameLevel;
    const gameMode = payload?.gameMode === undefined ? state.gameMode : payload.gameMode;

    switch (type) {
        case 'DISPLAY_GAME':
            return {...state, gameMode: gameMode, gameLevel: gameLevel}
        case 'START':
            if (gameLevel === 'normal')
            {
                config.PIPE_SPEED = config.PIPE_SPEED_NORMAL;
            }
            else if (gameLevel === 'hard')
            {
                config.PIPE_SPEED = config.PIPE_SPEED_HARD;
            }
            else if (gameLevel === 'easy')
            {
                config.PIPE_SPEED = config.PIPE_SPEED_EASY;
            }
            return {...state, score:0, status: 'playing'}
        case 'DISPLAY_END_GAME':
            updateScore(process.env.USER_ID, state.score);
            return {...state, status: 'end'}
        case 'SCORE_INCREASEMENT':
            return {...state, score: state.score + 1}
        default:
            return state;
    }
}