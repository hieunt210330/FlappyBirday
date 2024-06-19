import Pipes from '../../../class/pipes';

const initialState = {
    pipes: new Pipes()
}


const pipeReducer = (state = initialState, action) => {
    let pipes = new Pipes();
    switch (action.type) {
        case 'START':
            pipes.copy(new Pipes());
            pipes.startGame();
            return { ...state, pipes: pipes };
        case 'DISPLAY_END_GAME':
            pipes.copy(new Pipes());
            pipes.endGame();
            return { ...state, pipes: pipes };
        case 'PIPE_PASS':
            pipes.copy(state.pipes);
            pipes.passPipe(action.payload);
            return { ...state, pipes: pipes };
        case 'PIPE_MOVE':
            pipes.copy(state.pipes);
            pipes.movePipes();
            return { ...state, pipes: pipes };
        case 'PIPE_GENERATE':
            pipes.copy(state.pipes);
            pipes.generatePipes();
            return { ...state, pipes: pipes };
        default:
            return state;
    }
};

export default pipeReducer;
