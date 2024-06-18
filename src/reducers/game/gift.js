import config from "../../gameconfig";

import {
    createVoucher,
    incrementPuzzleCount
} from "../../api/database"

const generateVoucher = () => {
    let expiryDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
    if (Math.floor(Math.random()*1000) >= 500) 
    {
        let discountPercentage = Math.floor(Math.random() * 20) + 1;
        let maxdiscountValue = 0;
        let minOrderValue = 0;
        let discountValue = 0;
        let expiryDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
        if (Math.floor(Math.random()*1000) >= 500) 
        {
            maxdiscountValue = Math.floor(Math.random() * 100) + 1;
        }
        if (Math.floor(Math.random()*1000) >= 500) 
        {
            minOrderValue = Math.floor(Math.random() * 1000) + 1;
        }
    
        createVoucher(process.env.USER_ID, `DISCOUNT${discountPercentage}$`, discountPercentage, maxdiscountValue, minOrderValue, discountValue, expiryDate);
        return `You got a ${discountPercentage}% discount voucher!`
    }
    else
    {
        let discountPercentage = 0;
        let maxdiscountValue = 0;
        let minOrderValue = 0;
        let discountValue = Math.floor(Math.random() * 10) + 1;
        if (Math.floor(Math.random()*1000) >= 500) 
        {
            minOrderValue = Math.floor(Math.random() * 1000) + 1;
        }
        createVoucher(process.env.USER_ID, `DISCOUNT${discountPercentage}$`, discountPercentage, maxdiscountValue, minOrderValue, discountValue, expiryDate);
        return `You got a ${discountValue}$ discount voucher!`
    }
}


const initialState = {
    gifts: [],
    lastGen: 0,
    gitf_message: ''
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
            if (Math.floor(Math.random()*1000) >= 200) {

                gifts = gifts.filter((_, index) => index !== eaten_index);
                return {...state, gifts: gifts, giftMessage: generateVoucher()};
            }
            else
            {
                incrementPuzzleCount(process.env.USER_ID);
                gifts = gifts.filter((_, index) => index !== eaten_index);
                return {...state, gifts: gifts, giftMessage: 'You got a puzzle piece!'};
            }
        default:
            return state;
    }
}
