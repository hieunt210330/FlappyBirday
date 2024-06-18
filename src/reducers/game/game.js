
import {
    updateScore,
} from "../../api/database"

const initialState = {
    score: 0,
    status: 'end',
}

export default (state = initialState, {type} = {payload}) => {
    switch (type) {
        case 'START':
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