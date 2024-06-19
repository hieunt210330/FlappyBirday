import Pipe from "./pipe";
import config from "./gameconfig";

class Pipes {
    constructor() {
        this.pipes = [];
        this.pipeCount = 0;
    }

    startGame() {
        const first_pipe_x = 100 * document.documentElement.clientWidth / document.documentElement.clientHeight;
        this.pipes = [new Pipe(first_pipe_x, 50)];
        this.pipeCount = 0;
    }

    endGame() {
        this.pipes = [];
        this.pipeCount = 0;
    }

    passPipe(index) {
        if (index < this.pipes.length) {
            this.pipes[index].pass();
        }
    }

    movePipes() {
        if (this.pipes.length === 0) return;
        this.pipes.forEach(pipe => pipe.move());
    }

    generatePipes() {
        if (this.pipes.length === 0) {
            const topHeight = Math.floor(Math.random() * 50) + 10;
            const default_x = 100 * document.documentElement.clientWidth / document.documentElement.clientHeight;
            this.pipes.push(new Pipe(default_x, topHeight));
        }
        while (this.pipes.length && this.pipes[this.pipes.length - 1].x <= 5000) {
            const topHeight = Math.floor(Math.random() * 50) + 10;
            const old_x = this.pipes[this.pipes.length - 1].x;
            this.pipes.push(new Pipe(old_x + config.getPipeDistance(), topHeight));
            this.pipeCount++;
        }
    }

    copy(src_pipes) {
        this.pipes = [];
        this.pipeCount = src_pipes.pipeCount;
        src_pipes.pipes.forEach(pipe => {
            const new_pipe = new Pipe(0, 0, false);
            new_pipe.copy(pipe);
            this.pipes.push(new_pipe);
        });
    }

    getPipes() {
        return this.pipes;
    }

    getPipe(index) {
        if (index < this.pipes.length) {
            return this.pipes[index];
        }
        return null;
    }

    getPipeCount() {
        return this.pipeCount;
    }

    getLength() {
        return this.pipes.length;
    }
}

export default Pipes;
