import React, { useEffect } from "react";
import { connect } from "react-redux";

import Bird from "./Game/Bird";
import Pipe from "./Game/Pipe";
import Foreground from "./Game/Foreground";

import config from "../gameconfig"
import "../style.css";

let birdFall;
let pipeGenrator;
let pipeMove;

let effect_on = false;

const Game = ({status, start, fly}) => {
    useEffect(() => {
        const handleKeyPress = (e) => {
            start();
            console.log(e.code);
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
        dispatch({type: "BIRD_FLY"});
    }
}

const start = () => {
    return (dispatch, getState) => {
        const status = getState().game.status;
        if (status !== 'playing') {
            birdFall = setInterval(() => {
                dispatch({type: "BIRD_FALL"});
            }, 1000/config.FPS);

            pipeMove = setInterval(() => {
                dispatch({type: "PIPE_MOVE"});
            }, 1000/config.FPS);

            pipeGenrator = setInterval(() => {
                dispatch({type: "PIPE_GENERATE"});
            }, config.PIPE_GENERATE_TIME);

            dispatch({type: "START"});
        }
    }
}

const mapStateToProps = ({game}) => ({status: game.status});

const mapDispatchToProps = {start, fly};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

