import config from "../../gameconfig";

const intialState = {
    y: 45,
    r: 0,
    d: "",
    dY: 0,
    end_jump: config.JUMP_TIME * config.FPS / 1000,
}

export default (state = intialState, {type} = {}) => {
    let tmp_y;
    let tmp_end_jump;
    let tmp_dY;
    let tmp_r = 0;
    switch (type) {
        case 'BIRD_FLY':
            console.log("BIRD_FLY");
            tmp_dY = Math.max(state.dY - config.JUMP_HEIGHT, -config.JUMP_HEIGHT * 0.7);
            return {...state, y: state.y, dY: tmp_dY, d: ""};
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
            return {...state, y: state.y + tmp_dY, dY: tmp_dY, d: ""};
        default:
            return state;
    }
}

