class GameConfig {
    constructor() {
        this.FPS = 60;
        this.PIPE_SPEED_EASY = 5 / this.FPS;
        this.PIPE_SPEED_NORMAL = 10 / this.FPS;
        this.PIPE_SPEED_HARD = 20 / this.FPS;
        this.PIPE_SPEED = this.PIPE_SPEED_NORMAL;

        this.GENERATE_TIME = 1500; // ms
        this.PIPE_HOLE = 30; // vh
        this.PIPE_DISTANCE = 40; // vh
        this.PIPE_WIDTH = 10; // vh

        this.GIFT_HEIGHT = 5; // vh
        this.GIFT_WIDTH = 5; // vh

        this.GRAVITY = 0.0625 * 1.2;
        this.JUMP_HEIGHT = 1 * 2;
    }

    setPipeSpeed(level) {
        switch (level) {
            case 'easy':
                this.PIPE_SPEED = this.PIPE_SPEED_EASY;
                break;
            case 'normal':
                this.PIPE_SPEED = this.PIPE_SPEED_NORMAL;
                break;
            case 'hard':
                this.PIPE_SPEED = this.PIPE_SPEED_HARD;
                break;
            default:
                this.PIPE_SPEED = this.PIPE_SPEED_NORMAL;
        }
    }

    getPipeSpeed() {
        return this.PIPE_SPEED;
    }

    getFPS() {
        return this.FPS;
    }

    getPipeWidth() {
        return this.PIPE_WIDTH;
    }

    getPipeHole() {
        return this.PIPE_HOLE;
    }

    getPipeDistance() {
        return this.PIPE_DISTANCE;
    }

    getGenerateTime() {
        return this.GENERATE_TIME;
    }

    getGiftHeight() {
        return this.GIFT_HEIGHT;
    }

    getGiftWidth() {
        return this.GIFT_WIDTH;
    }

    getGravity() {
        return this.GRAVITY;
    }

    getJumpHeight() {
        return this.JUMP_HEIGHT;
    }

    getPipeSpeedEasy() {
        return this.PIPE_SPEED_EASY;
    }

    getPipeSpeedNormal() {
        return this.PIPE_SPEED_NORMAL;
    }

    getPipeSpeedHard() {
        return this.PIPE_SPEED_HARD;
    }

    setPipeSpeedEasy(speed) {
        this.PIPE_SPEED_EASY = speed;
    }

    setPipeSpeedNormal(speed) {
        this.PIPE_SPEED_NORMAL = speed;
    }

    setPipeSpeedHard(speed) {
        this.PIPE_SPEED_HARD = speed;
    }

    setFPS(fps) {
        this.FPS = fps;
    }

    setPipeHole(hole) {
        this.PIPE_HOLE = hole;
    }

    setPipeWidth(width) {
        this.PIPE_WIDTH = width;
    }

    setGenerateTime(time) {
        this.GENERATE_TIME = time;
    }

    setGiftHeight(height) {
        this.GIFT_HEIGHT = height;
    }

    setGiftWidth(width) {
        this.GIFT_WIDTH = width;
    }

    setGravity(gravity) {
        this.GRAVITY = gravity;
    }

    setJumpHeight(height) {
        this.JUMP_HEIGHT = height;
    }

    setPipeDistance(distance) {
        this.PIPE_DISTANCE = distance;
    }

    setPipeSpeed(speed) {
        this.PIPE_SPEED = speed;
    }
}

const config = new GameConfig();
export default config;
