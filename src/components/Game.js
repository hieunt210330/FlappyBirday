import React, { useEffect } from "react";
import { connect } from "react-redux";

import Bird from "./Game/Bird";
import Pipe from "./Game/Pipe";
import Foreground from "./Game/Foreground";

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
    /*
    const foreground = state.game.foreground;

    if (bird.y + bird.height > config.FOREGROUND_Y) {
        clearInterval(birdFall);
        clearInterval(pipeGenrator);
        clearInterval(pipeMove);
        dispatch({type: "DISPLAY_END_GAME"});
    }
    */

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

}

const mapStateToProps = ({game}) => ({status: game.status});

const mapDispatchToProps = {start, fly};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

