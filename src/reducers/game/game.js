export default (state = {}, {type} = {}) => {
    switch (type) {
        case 'START':
            return {...state, status: 'playing'}
        case 'DISPLAY_END_GAME':
            return {...state, status: 'end'}
        default:
            return state;
    }
}