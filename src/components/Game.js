import React, { useEffect } from "react";
import { connect } from "react-redux";

import Bird from "./Game/Bird";
import Pipe from "./Game/Pipe";
import Foreground from "./Game/Foreground";
import Gift from "./Game/Gift";

import config from "../gameconfig"
import "../style.css";

let gameAnimation;
let pipeGenrator;

let effect_on = false;

let inGame = false;

const Game = ({status, start, fly}) => {
    inGame = true;
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (inGame === false)
            {
                return;
            }
            start();
            if (e.code === "Space") {
                fly();
            }
        }
        if (effect_on == false) {
            effect_on = true;        
            document.addEventListener("keydown", handleKeyPress, false);
        }
    }, []);

    return (
        <div style={{
            overflow: "hidden",
        }}>
            <Bird />
            <Pipe />
            <Foreground />
            <Gift />
        </div>
    )
}

const fly = () => {
    return (dispatch) => {
        try{
            dispatch({type: "BIRD_FLY"});
        }
        catch(e){
            //console.log(e);
        }
    }
}

const start = () => {
    return (dispatch, getState) => {
        const status = getState().game.status;
        if (status !== 'playing') {
            gameAnimation = setInterval(() => {
                dispatch({type: "BIRD_FALL"});
                dispatch({type: "PIPE_MOVE"});
                check(dispatch, getState);
            }, 1000/config.FPS);

            pipeGenrator = setInterval(() => {
                try{
                    dispatch({type: "PIPE_GENERATE"});
                }
                catch(e){
                }
        
            }, config.PIPE_GENERATE_TIME);

            dispatch({type: "START"});
        }
    }
}

let cnt = 0;

const check = (dispatch, getState) => {
    const state = getState();
    const bird = state.bird;
    const pipes = state.pipe.pipes;
    const gifts = state.pipe.gifts;

    for (let i = 0; i < pipes.length; i++) {
        if (
            bird.x + bird.width > pipes[i].x &&
            bird.x < pipes[i].x + config.PIPE_WIDTH &&
            (bird.y < pipes[i].topHeight || bird.y + bird.height > pipes[i].topHeight + config.PIPE_HOLE)
        ) {
            effect_on = false;
            inGame = false;
            clearInterval(gameAnimation);
            clearInterval(pipeGenrator);
            dispatch({type: "DISPLAY_END_GAME"});
        }
    }

    // Kiểm tra va chạm giữa con chim và hộp quà
    for (let i = 0; i < gifts.length; i++) {
        if (
            bird.x + bird.width > gifts[i].x &&
            bird.x < gifts[i].x + config.GIFT_WIDTH && // Giả sử hộp quà có chiều rộng là config.GIFT_WIDTH
            bird.y + bird.height > gifts[i].y &&
            bird.y < gifts[i].y + config.GIFT_HEIGHT // Giả sử hộp quà có chiều cao là config.GIFT_HEIGHT
        ) {
            dispatch({type: "GIFT_EATEN", payload: i});
        }
    }
}

const mapStateToProps = ({game}) => ({status: game.status});

const mapDispatchToProps = {start, fly};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
