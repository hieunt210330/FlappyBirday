import config from './gameconfig';

class Gift {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move() {
        this.x -= config.getPipeSpeed();
    }

    copy(src_gift) {
        this.x = src_gift.x;
        this.y = src_gift.y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }
}

export default Gift;
