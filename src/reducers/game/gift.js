import config from "../../gameconfig";

const default_x = 200;

const initialState = {
    gifts: [],
    pipeCount: 0,
}

export default (state = initialState, {type, payload} = {pipes}) => {
    let tmp_pipes = pipes;
    let gifts = state.gifts;
    let pipeCount = state.pipeCount;

    switch (type) {
        case 'DISPLAY_END_GAME':
            return {...state, gifts: [], pipeCount: 0};
        case 'GIFT_MOVE':
            if (!gifts.length) {
                return state;
            }
            
            try {
                gifts = gifts.map(({x, y}) => {
                    x = x - config.PIPE_SPEED;
                    return {x: x, y: y};
                });
            } catch (e) {
            }            
            
            while(gifts.length && gifts[0].x <= -100) {
                gifts.shift();
            }

            return {...state, pipes: tmp_pipes, gifts: gifts};
        case 'GIFT_GENERATE':
            try {
                while(tmp_pipes.length && tmp_pipes[tmp_pipes.length - 1].x <= 5000) {
                    pipeCount++;
                    
                    if (pipeCount % 1 === 0) {
                        const previousPipe = tmp_pipes[tmp_pipes.length - 2];
                        const currentPipe = tmp_pipes[tmp_pipes.length - 1];
                        const giftX = (previousPipe.x + currentPipe.x) / 2;
                        const giftY = (previousPipe.topHeight + (100 - currentPipe.topHeight)) / 2; // Giả sử chiều cao của canvas là 100
                        gifts.push({x: giftX, y: giftY});
                    }
                }
            } catch (e) {
            }

            return {...state, gifts: gifts, pipeCount: pipeCount};
        case 'GIFT_EATEN':
            gifts = gifts.filter((_, index) => index !== payload);
            return {...state, gifts: gifts};
        default:
            return state;
    }
}
