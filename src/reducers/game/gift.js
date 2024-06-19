// giftReducer.js

import Gifts from '../../class/gifts';

const initialState = {
    gifts: new Gifts()
};

const giftReducer = (state = initialState, action) => {
    let gifts = null;
    switch (action.type) {
        case 'DISPLAY_END_GAME':
            return { ...state, gifts: new Gifts() };
        case 'GIFT_MOVE':
            gifts = new Gifts();
            gifts.copy(state.gifts);
            gifts.moveGifts();
            return { ...state, gifts: gifts };

        case 'GIFT_GENERATE':
            gifts = new Gifts();
            gifts.copy(state.gifts);
            const pipeCount = action.pipes.getPipeCount();
            const pipes = action.pipes.getPipes();
            gifts.generateGifts(pipes, pipeCount);
            return { ...state, gifts: gifts };

        case 'GIFT_EATEN':
            gifts = new Gifts();
            gifts.copy(state.gifts);
            gifts.eatGift(action.eatenIndex, process.env.USER_ID);
            return { ...state, gifts: gifts };

        default:
            return state;
    }
};

export default giftReducer;
