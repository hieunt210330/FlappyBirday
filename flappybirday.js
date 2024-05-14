// Need to define all constants

const GameState = {
    PLAYING: 0,
    PAUSED: 1,
    GAMEOVER: 2,
    DROPPING: 3,
    READY: 4            
}

let state = GameState.PLAYING;

let board;
let boardWitdh = window.innerWidth;
let boardHeight = window.innerHeight;
let context;

let groundHeight = boardHeight * 65 / 1080;

// need to write functions to calulate the bird size and position based on the board size
let birdWidth = boardHeight / 18; // bird width/height ration = 17/12
let birdHeight = birdWidth * 12 / 17;
let birdX = boardWitdh / 2 - birdWidth / 2;
let birdInitY = boardHeight / 2 - birdHeight / 2;

let bird = {
    x: birdX,
    y: birdInitY,
    width: birdWidth,
    height: birdHeight
}

let pipeArray = []; // each element in pipes array should be a pair of top and bottom pipes

// need to write functions to calulate the pipes size and position based on the board size
let pipeWidth = 64; // will be calculated based on the bird size
let pipeHeight = 512; // will be calculated based on the bird size
let pipeX = boardWitdh;
let pipeY = 0;
let pipeOpeningSpace = 500; // will be calculated based on the board size or/and bird size or/and score
let pipeDistance = 300; // will be calculated based on the board size

let topPipeImg;
let bottomPipeImg;

//physics
// need to write function to calculate physics based on score
let velocityX = -2; //pipes moving left speed
let velocityY = -6; //bird jump speed
let gravity = 0.4;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWitdh;
    context = board.getContext('2d'); // used for drawing on the board

    // draw the bird
    //context.fillStyle = "green";
    //context.fillRect(bird.x, bird.y, bird.width, bird.height);

    // load the images
    birdImage = new Image();
    birdImage.src = "./img/flappybird.png";
    birdImage.onload = function() {
        context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./img/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./img/bottompipe.png";

    requestAnimationFrame(update);

    // instead of using setInterval, check the position of the pipes to make sure the gap between the pipes is always the same
    setInterval(placePipes, 1500); // every 1.5 seconds

    document.addEventListener('keydown', moveBird);
}

window.onresize = function() {
    // handle bird position, background, pipes display when window is resized
};


function update(){
    
    requestAnimationFrame(update);

    if (document.hasFocus() == false){
        // pause the game
        return;
    }

    else if (state == GameState.GAMEOVER){
        // if the game is over, the bird drops to the ground
        state = GameState.DROPPING;
        return;
    }

    else if (state == GameState.DROPPING){
        // After dropped, set the game state to READY
        state = GameState.READY;
    }

    else if (state == GameState.READY){

    }

    else if (state == GameState.PLAYING)
    {
        context.clearRect(0, 0, boardWitdh, boardHeight);

        velocityY += gravity;
        
        // function updateBirdPosition():
        // Bird can go up and out of the screen
        // bird.y += velocityY;

        // Bird can't go up and out of the screen
        bird.y = Math.max(bird.y + velocityY, 0);

        // Bird can't be below the ground
        bird.y = Math.min(bird.y + velocityY, boardHeight + bird.height - groundHeight);

        // draw the pipes
        for (let i = 0; i < pipeArray.length; i++){
            let pipe = pipeArray[i];
            
            // must handle the case when the pipe is out of the screen only draw the pipe if it is in the screen (computer screen, not window.innerHeight). If it is not in the screen, remove it from the array.
            pipe.top.x += velocityX;
            context.drawImage(topPipeImg, pipe.top.x, pipe.top.y, pipe.top.width, pipe.top.height);

            pipe.bottom.x += velocityX;
            context.drawImage(bottomPipeImg, pipe.bottom.x, pipe.bottom.y, pipe.bottom.width, pipe.bottom.height);
        }

        // draw the bird, need to handle the draw of the bird when go up up and down based on velocityY
        context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

        let score = 0;

        // calculate the score
        for (let i = 0; i < pipeArray.length; i++){
            let pipe = pipeArray[i];
            if (pipe.passed == true)
            {
                score++;
            }
            else if (pipe.top.x + pipe.top.width < bird.x){
                pipe.passed = true;
                score++;
            }
        }

        // display score
        context.fillStyle = "white";
        context.font = "45px sans-serif";
        context.fillText(score, 10, 50);

        if (checkCollision(bird, pipeArray))
        {
            state = GameState.GAMEOVER;
        }
    }
}

// instead of using setInterval, check the position of the pipes to make sure the gap between the pipes is always the same
function placePipes()
{
    if (document.hasFocus() == false){
        // pause the game
        return;
    }

    else if (state == GameState.PLAYING)
    {
        // need a function update pipeY based on difficulty level and score
        let randomPipeY  = pipeY - pipeHeight/4 - Math.random() * (pipeHeight/2);

        // need a function to create new pipe
        let topPipe = {
            img: topPipeImg,
            x: pipeX,
            y: randomPipeY,
            width: pipeWidth,
            height: pipeHeight,
            passed: false
        };

        let bottomPipe = {
            img: bottomPipeImg,
            x: pipeX,
            y: randomPipeY + pipeHeight + pipeOpeningSpace,
            width: pipeWidth,
            height: pipeHeight,
            passed: false
        };

        let pipe = {
            passed: false,
            top: topPipe,
            bottom: bottomPipe
        }

        pipeArray.push(pipe);
    }

}

function moveBird(e)
{
    if (state == GameState.PLAYING)
    {
        if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyW"){
            velocityY = -6;
        }
    }
    else if (state == GameState.DROPPING || state == GameState.READY)
    {
        if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyW"){
            // reset the game
            bird.y = birdInitY;
            pipeArray = [];
            score = 0;
            state = GameState.PLAYING;
        }
    }

}

function checkCollision(bird, pipeArray){
    // Check if the the bird is touching the ground.
    if (bird.y + bird.height >= boardHeight - groundHeight)
    {
        return true;
    }

    for (let i = 0; i < pipeArray.length; i++)
    {
        let pipe = pipeArray[i];
        // check if the bird is not outside the pipe
        if (pipe.top.x <= bird.x + bird.width && bird.x <= pipe.top.x + pipe.top.width)
        {
            // check if the bird is between the top and bottom pipes
            if (bird.y <= pipe.top.y + pipe.top.height)
            {
                return true;
            }
            else if (bird.y + bird.height >= pipe.bottom.y)
            {
                return true;
            }
        }
    }
    
    return false;
}