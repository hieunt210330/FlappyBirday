import config from "../../gameconfig";

const intialState = {
    d: "",
    x: 100,
    pipes: [
        {
            topHeight: 50,
            x: 70,
        },
    ]
}

export default (state = intialState, {type} = {}) => {
    let pipes = state.pipes;
    let tmp_pipes = pipes;
    switch (type) {
        case 'PIPE_MOVE':
            if (!state.pipes.length) 
            {
                return state;
            }
            
            try {
                tmp_pipes = tmp_pipes.map(({topHeight, x}) => {
                    x = x - config.PIPE_SPEED;
                    return {x: x, topHeight: topHeight};
                });
            }
            catch (e) {
                //console.log(e);
            }            
            
            while(tmp_pipes.length && tmp_pipes[0].x <= -100) {
                tmp_pipes.shift();
            }

            return {...state, pipes: tmp_pipes, d: ""};
        case 'PIPE_GENERATE':

            let topHeight;
            if (tmp_pipes.length == 0) {
                topHeight = Math.floor(Math.random() * 50) + 10;
                tmp_pipes.push({x: 100, topHeight: topHeight});
            }
            try {
                while(tmp_pipes.length && tmp_pipes[tmp_pipes.length - 1].x <= 5000) {
                    topHeight = Math.floor(Math.random() * 50) + 10;
                    tmp_pipes.push({x: tmp_pipes[tmp_pipes.length - 1].x + config.PIPE_DISTANCE,  
                                        topHeight: topHeight});
                }
            }
            catch (e) {
                //console.log(e);
            }

            return {...state, 
                pipes: tmp_pipes};
        default:
            return state;
    }
}