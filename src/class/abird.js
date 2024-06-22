import config from './agameconfig';

class Bird {
    constructor() {
        this.y = 45; // vh
        this.dY = 0;
        this.x = 47.5 * document.documentElement.clientWidth / document.documentElement.clientHeight; // vh
        this.width = 7.083; // vh
        this.height = 5; // vh
    }

    fly() {
        this.dY = Math.max(this.dY - config.getJumpHeight(), -config.getJumpHeight() * 0.7);
    }

    fall() {
        this.dY += config.getGravity();
        this.y += this.dY;
        if (this.dY >= config.getJumpHeight() * 0.4) {
            this.dY = config.getJumpHeight() * 0.4;
        }
        if (this.y >= 100) {
            this.y = 100;
            this.dY = 0;
        } else if (this.y <= 0) {
            this.y = 0;
            this.dY = 0;
        }
    }

    copy(src_bird) {
        this.y = src_bird.y;
        this.dY = src_bird.dY;
        this.x = src_bird.x;
        this.width = src_bird.width;
        this.height = src_bird.height;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setY(y) {
        this.y = y;
    }
    
    setX(x) {
        this.x = x;
    }

    setDY(dY) {
        this.dY = dY;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }
}

export default Bird;