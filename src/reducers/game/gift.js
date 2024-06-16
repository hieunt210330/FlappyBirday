import config from "../../gameconfig";

const initialState = {
    gifts: [],
    lastGen: 0,
}

export default (state = initialState, {type, pipes, eaten_index, pipeCount} = {}) => {
    let tmp_pipes = pipes;
    let gifts = state.gifts;
    let lastGen = state.lastGen;
    switch (type) {
        case 'DISPLAY_END_GAME':
            return {...state, gifts: [], lastGen: 0};
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

            return {...state, gifts: gifts};
        case 'GIFT_GENERATE':
            try {
                for (let i = lastGen; i < tmp_pipes.length; i++) {
                    if (i < 1 || tmp_pipes[i-1].passed === true)
                    {
                        continue;
                    }
                    if (pipeCount >= 0) {
                        const previousPipe = tmp_pipes[i - 1];
                        const currentPipe = tmp_pipes[i];
                        const giftX = (previousPipe.x + currentPipe.x) / 2;
                        const giftY = (previousPipe.topHeight + (100 - currentPipe.topHeight)) / 2; // Giả sử chiều cao của canvas là 100
                        gifts.push({x: giftX, y: giftY});
                        lastGen = i;
                    }
                }
            } catch (e) {
            }

            return {...state, gifts: gifts, lastGen: lastGen};
        case 'GIFT_EATEN':
            gifts = gifts.filter((_, index) => index !== eaten_index);
            return {...state, gifts: gifts};
        default:
            return state;
    }
}
