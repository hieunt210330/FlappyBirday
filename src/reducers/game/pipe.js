import config from "../../gameconfig";

const default_x = 200;

const initialState = {
    pipes: [
        {
            topHeight: 50,
            x: default_x, //vh
        },
    ],
    gifts: [], // Để lưu trữ vị trí của các hộp quà
    pipeCount: 0, // Biến đếm số lần sinh pipe
}

export default (state = initialState, {type, payload} = {}) => {
    let pipes = state.pipes;
    let tmp_pipes = pipes;
    let gifts = state.gifts;
    let pipeCount = state.pipeCount;

    switch (type) {
        case 'DISPLAY_END_GAME':
            return {...state, pipes: [{topHeight: 50, x: default_x}], gifts: [], pipeCount: 0};
        case 'PIPE_MOVE':
            if (!state.pipes.length) {
                return state;
            }
            
            try {
                tmp_pipes = tmp_pipes.map(({topHeight, x}) => {
                    x = x - config.PIPE_SPEED;
                    return {x: x, topHeight: topHeight};
                });
                gifts = gifts.map(({x, y}) => {
                    x = x - config.PIPE_SPEED;
                    return {x: x, y: y};
                });
            } catch (e) {
                //console.log(e);
            }            
            
            while(tmp_pipes.length && tmp_pipes[0].x <= -100) {
                tmp_pipes.shift();
            }
            
            while(gifts.length && gifts[0].x <= -100) {
                gifts.shift();
            }

            return {...state, pipes: tmp_pipes, gifts: gifts};
        case 'PIPE_GENERATE':
            let topHeight;
            if (tmp_pipes.length == 0) {
                topHeight = Math.floor(Math.random() * 50) + 10;
                tmp_pipes.push({x: default_x, topHeight: topHeight});
            }

            try {
                while(tmp_pipes.length && tmp_pipes[tmp_pipes.length - 1].x <= 5000) {
                    topHeight = Math.floor(Math.random() * 50) + 10;
                    tmp_pipes.push({x: tmp_pipes[tmp_pipes.length - 1].x + config.PIPE_DISTANCE, topHeight: topHeight});
                    pipeCount++;
                    
                    // Thêm hộp quà mỗi 5 lần sinh pipe
                    if (pipeCount % 1 === 0) {
                        const previousPipe = tmp_pipes[tmp_pipes.length - 2];
                        const currentPipe = tmp_pipes[tmp_pipes.length - 1];
                        const giftX = (previousPipe.x + currentPipe.x) / 2;
                        const giftY = (previousPipe.topHeight + (100 - currentPipe.topHeight)) / 2; // Giả sử chiều cao của canvas là 100
                        gifts.push({x: giftX, y: giftY});
                    }
                }
            } catch (e) {
                //console.log(e);
            }

            return {...state, pipes: tmp_pipes, gifts: gifts, pipeCount: pipeCount};
        case 'GIFT_EATEN':
            gifts = gifts.filter((_, index) => index !== payload);
            return {...state, gifts: gifts};
        default:
            return state;
    }
}
