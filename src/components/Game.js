import React, { useEffect } from "react";
import { connect } from "react-redux";

import Bird from "./Game/Bird";
import Pipe from "./Game/Pipe";
import Foreground from "./Game/Foreground";
import Gift from "./Game/Gift";

import config from "../gameconfig"
import "../style.css";

let gameAnimation;
let genrator;

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
            <Gift />
            <Foreground />
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

            dispatch({type: "START"});

            gameAnimation = setInterval(() => {
                dispatch({type: "BIRD_FALL"});
                dispatch({type: "PIPE_MOVE"});
                dispatch({type: "GIFT_MOVE"});
                check(dispatch, getState);
            }, 1000/config.FPS);

            genrator = setInterval(() => {
                try{
                    dispatch({type: "PIPE_GENERATE"});
                    dispatch({type: "GIFT_GENERATE", pipes: getState().pipe.pipes, pipeCount: getState().pipe.pipeCount});
                }
                catch(e){
                }
        
            }, config.GENERATE_TIME);

        }
    }
}

let cnt = 0;

const check = (dispatch, getState) => {
    const state = getState();
    const bird = state.bird;
    const pipes = state.pipe.pipes;
    const gifts = state.gift.gifts;

    for (let i = 0; i < pipes.length; i++) {
        if (bird.x + bird.width > pipes[i].x &&
            bird.x < pipes[i].x + config.PIPE_WIDTH &&
            (bird.y < pipes[i].topHeight || bird.y + bird.height > pipes[i].topHeight + config.PIPE_HOLE)
        ) {
            effect_on = false;
            inGame = false;
            clearInterval(gameAnimation);
            clearInterval(genrator);
            dispatch({type: "DISPLAY_END_GAME"});
        }
        if (pipes[i].passed === false && bird.x > pipes[i].x + config.PIPE_WIDTH) {
            dispatch({type: "PIPE_PASS", payload: i});
            dispatch({type: "SCORE_INCREASEMENT"});
        }
    }

    for (let i = 0; i < gifts.length; i++) {
        if (
            bird.x + bird.width > gifts[i].x &&
            bird.x < gifts[i].x + config.GIFT_WIDTH &&
            bird.y + bird.height > gifts[i].y &&
            bird.y < gifts[i].y + config.GIFT_HEIGHT
        ) {
            dispatch({type: "GIFT_EATEN", eaten_index: i});
            break;
        }
    }
}

const mapStateToProps = ({game}) => ({status: game.status});

const mapDispatchToProps = {start, fly};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
