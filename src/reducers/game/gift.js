import config from "../../gameconfig";

const initialState = {
    gifts: [],
    lastGenerate: 0,
}

export default (state = initialState, {type, pipes, eaten_index, pipeCount} = {}) => {
    let tmp_pipes = pipes;
    let gifts = state.gifts;
    let lastGenerate = state.lastGenerate;
    switch (type) {
        case 'DISPLAY_END_GAME':
            return {...state, gifts: []};
        case 'GIFT_MOVE':
            if (!gifts.length) {
                return state;
            }
            let cnt = 1;
            try {
                gifts = gifts.map(({x, y}) => {
                    x = x - config.PIPE_SPEED;
                    if (cnt === 1){
                        console.log(x);
                        cnt++;
                    }
                    return {x: x, y: y};
                });
            } catch (e) {
            }            
            
            return {...state, gifts: gifts};
        case 'GIFT_GENERATE':
            try {
                for (let i = lastGenerate; i < tmp_pipes.length; i++) {
                    lastGenerate = i;
                    if (i < 1)
                    {
                        continue;
                    }
                    if (pipeCount >= 0) {
                        const previousPipe = tmp_pipes[i - 1];
                        const currentPipe = tmp_pipes[i];
                        const giftX = (previousPipe.x + currentPipe.x) / 2;
                        const giftY = (previousPipe.topHeight + (100 - currentPipe.topHeight)) / 2; // Giả sử chiều cao của canvas là 100
                        gifts.push({x: giftX, y: giftY});
                        console.log(gifts);
                    }
                }
            } catch (e) {
                console.log(e);
            }

            return {...state, gifts: gifts, lastGenerate: lastGenerate};
        case 'GIFT_EATEN':
            gifts = gifts.filter((_, index) => index !== eaten_index);
            return {...state, gifts: gifts};
        default:
            return state;
    }
}
