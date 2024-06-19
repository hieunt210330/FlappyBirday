// Gifts.js

import Gift from './gift';
import { createVoucher, incrementPuzzleCount } from "../api/database";

class Gifts {
    constructor() {
        this.gifts = [];
        this.lastGen = 0;
        this.giftMessage = null;
    }

    reset() {
        this.gifts = [];
        this.lastGen = 0;
        this.giftMessage = null;
    }

    copy(src_gifts) {
        this.gifts = [];
        for (let i = 0; i < src_gifts.gifts.length; i++) {
            const gift = new Gift();
            gift.copy(src_gifts.gifts[i]);
            this.gifts.push(gift);
        }
        this.lastGen = src_gifts.lastGen;
        this.giftMessage = src_gifts.giftMessage;
    }

    moveGifts() {
        if (this.gifts.length === 0) return;
        this.gifts.forEach(gift => gift.move());
    }

    generateGifts(pipes, pipeCount) {
        for (let i = this.lastGen; i < pipes.length; i++) {
            if (i < 1 || pipes[i - 1].isPassed() === true) continue;
            if (pipeCount >= 0) {
                const previousPipe = pipes[i - 1];
                const currentPipe = pipes[i];
                const giftX = (previousPipe.x + currentPipe.x) / 2;
                const giftY = (previousPipe.topHeight + (100 - currentPipe.topHeight)) / 2;
                this.gifts.push(new Gift(giftX, giftY));
                this.lastGen = i;
            }
        }
    }

    eatGift(eatenIndex, userId) {
        const prize = this.createPrize(userId);
        this.gifts = this.gifts.filter((_, index) => index !== eatenIndex);
        this.giftMessage = prize?.message;
    }

    createPrize(userId) {
        if (Math.floor(Math.random() * 1000) >= 200) {
            const expiryDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
            if (Math.floor(Math.random() * 1000) >= 500) {
                const discountPercentage = Math.floor(Math.random() * 20) + 1;
                const maxDiscountValue = Math.floor(Math.random() * 100) + 1;
                const minOrderValue = Math.floor(Math.random() * 1000) + 1;
                const voucher = createVoucher(userId, `DISCOUNT${discountPercentage}%`, discountPercentage, maxDiscountValue, minOrderValue, 0, expiryDate);
                return { message: `You got a ${discountPercentage}% discount voucher!`, voucher, type: "voucher" };
            } else {
                const discountValue = Math.floor(Math.random() * 10) + 1;
                const minOrderValue = Math.floor(Math.random() * 1000) + 1;
                const voucher = createVoucher(userId, `DISCOUNT${discountValue}$`, 0, 0, minOrderValue, discountValue, expiryDate);
                return { message: `You got a ${discountValue}$ discount voucher!`, voucher, type: "voucher" };
            }
        } else {
            incrementPuzzleCount(userId);
            return { type: "puzzle", message: 'You got a puzzle piece!' };
        }
    }

    getLength() {
        return this.gifts.length;
    }

    getGift(index) {
        return this.gifts[index];
    }

    getGifts() {
        return this.gifts;
    }

    getLastGenIndex() {
        return this.lastGen;
    }

    getGiftMessage() {
        return this.giftMessage;
    }

    setGiftMessage(message) {
        this.giftMessage = message;
    }

    setGifts(gifts) {
        this.gifts = gifts;
    }

    setLastGenIndex(index) {
        this.lastGen = index;
    }
}

export default Gifts;
