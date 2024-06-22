import Bird from '../../../class/bird';

const intialState = {
    bird: new Bird()
}

export default (state = intialState, {type} = {}) => {
    let tmp_bird = state.bird;
    let bird = new Bird();
    bird.copy(tmp_bird);
    switch (type) {
        case 'DISPLAY_END_GAME':
            return {...state, bird: new Bird()};
        case 'BIRD_FLY':
            bird.fly();
            return {...state, bird: bird};
        case 'BIRD_FALL':
            bird.fall();
            return {...state, bird: bird};
        default:
            return state;
    }
}

