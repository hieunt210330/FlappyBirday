const FPS = 60;

const PIPE_SPEED_EASY = 5/FPS;
const PIPE_SPEED_NORMAL = 10/FPS;
const PIPE_SPEED_HARD = 20/FPS;

var PIPE_SPEED = PIPE_SPEED_NORMAL;

const GENERATE_TIME = 1500; //ms
const PIPE_HOLE = 30; // vh
const PIPE_DISTANCE = 40; // vh
const PIPE_WIDTH = 10; // vh

const GIFT_HEIGHT = 5; // vh
const GIFT_WIDTH = 5; // vh

const GRAVITY = 0.0625 * 1.2;
const JUMP_HEIGHT = 1 * 2;
const JUMP_TIME = 500; //ms
const JUMP_ANGLE = 30;


export default 
{
    FPS,
    PIPE_SPEED,
    GRAVITY,
    JUMP_HEIGHT,
    JUMP_TIME,
    JUMP_ANGLE,
    GENERATE_TIME,
    PIPE_HOLE,
    PIPE_DISTANCE,
    PIPE_WIDTH,
    GIFT_HEIGHT,
    GIFT_WIDTH,
    PIPE_SPEED_EASY,
    PIPE_SPEED_NORMAL,
    PIPE_SPEED_HARD,
} 