import config from "../../gameconfig";

const initialState = {
    pipes: [],
    pipeCount: 0, 
}

export default (state = initialState, {type, payload} = {}) => {
    switch (type) {
        case 'START':
            let first_pipe_x = 100 * document.documentElement.clientWidth / document.documentElement.clientHeight;
            return {...state, pipes: [{topHeight: 50, x: first_pipe_x, passed: false}], pipeCount: 0};
        case 'DISPLAY_END_GAME':
            return {...state, pipes: [], pipeCount: 0};
        case 'PIPE_PASS':
            const updatedPipes = state.pipes.map((pipe, index) => {
                if (index === payload) {
                    return {...pipe, passed: true};
                }
                return pipe;
            });
            return {...state, pipes: updatedPipes};
        case 'PIPE_MOVE':
            if (!state.pipes.length) {
                return state;
            }

            const movedPipes = state.pipes.map(({topHeight, x, passed}) => ({
                topHeight,
                x: x - config.PIPE_SPEED,
                passed
            }));
            
            return {...state, pipes: movedPipes};
        case 'PIPE_GENERATE':
            let newPipes = [...state.pipes];
            let pipeCount = state.pipeCount;

            if (newPipes.length === 0) {
                const topHeight = Math.floor(Math.random() * 50) + 10;
                newPipes.push({x: default_x, topHeight, passed: false});
            }

            while(newPipes.length && newPipes[newPipes.length - 1].x <= 5000) {
                const topHeight = Math.floor(Math.random() * 50) + 10;
                const old_x = newPipes[newPipes.length - 1].x;
                newPipes.push({x: old_x + config.PIPE_DISTANCE, topHeight, passed: false});
                pipeCount++;
            }

            return {...state, pipes: newPipes, pipeCount};
        default:
            return state;
    }
}
