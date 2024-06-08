import config from "../../gameconfig";

const intialState = {
    y: 45, //vh
    r: 0,
    d: "",
    dY: 0,
    x: 47.5 * document.documentElement.clientWidth / document.documentElement.clientHeight, //vh
    width: 7.083, //vh
    height: 5, //vh
    end_jump: config.JUMP_TIME * config.FPS / 1000,
}

export default (state = intialState, {type} = {}) => {
    let tmp_y;
    let tmp_dY;
    const x = 47.5 * document.documentElement.clientWidth / document.documentElement.clientHeight;
    const width = 7.083;
    const height = 5;
    switch (type) {
        case 'DISPLAY_END_GAME':
            return {...state, y: 45, dY: 0, d: "", x: x, width: width, height: height};
        case 'BIRD_FLY':
            tmp_dY = Math.max(state.dY - config.JUMP_HEIGHT, -config.JUMP_HEIGHT * 0.7);
            return {...state, y: state.y, dY: tmp_dY, d: "", x: x, width: width, height: height};
        case 'BIRD_FALL':
            tmp_dY = state.dY + config.GRAVITY;
            tmp_y = state.y + tmp_dY;
            if (tmp_dY >= config.JUMP_HEIGHT * 0.4)
            {
                tmp_dY = config.JUMP_HEIGHT *0.4;
            }
            if (tmp_y >= 100) {
                tmp_y = 100;
                tmp_dY = 0;
            }
            else if (tmp_y <= 0) {
                tmp_y = 0;
                tmp_dY = 0;
            }
            return {...state, y: state.y + tmp_dY, dY: tmp_dY, d: "", x: x, width: width, height: height};
        default:
            return state;
    }
}

