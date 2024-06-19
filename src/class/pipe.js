import config from "./gameconfig";

class Pipe {
    constructor(x, topHeight, passed = false) {
        this.x = x;
        this.topHeight = topHeight;
        this.passed = passed;
    }

    move() {
        this.x -= config.getPipeSpeed();
    }

    pass() {
        this.passed = true;
    }

    copy(src_pipe) {
        this.x = src_pipe.x;
        this.topHeight = src_pipe.topHeight;
        this.passed = src_pipe.passed;
    }

    getTopHeight() {
        return this.topHeight;
    }

    getX() {
        return this.x;
    }

    isPassed() {
        return this.passed;
    }

    setPassed(passed) {
        this.passed = passed;
    }

    setTopHeight() {
        return this.topHeight;
    }

    setX() {
        return this.x;
    }
}

export default Pipe;
