import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Bird from "./Game/Bird";
import Pipe from "./Game/Pipe";
import Foreground from "./Game/Foreground";
import Gift from "./Game/Gift";

import config from "../class/gameconfig";

import "../style.css";

let gameAnimation;
let genrator;

let effect_on = false;

let inGame = false;

let giftMessage = null;

const Game = ({ status, start, fly, score, giftMessage }) => {
    inGame = true;

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (inGame === false) {
                return;
            }
            start();
            if (e.code === "Space") {
                fly();
            }
        };
        if (effect_on === false) {
            effect_on = true;
            document.addEventListener("keydown", handleKeyPress, false);
        }
        
    }, []);

    return (
        <div>
        <div style={{ position: "fixed", overflow: "hidden" }}>
            <Bird />
            <Pipe />
            <Gift />
            <Foreground />
        </div>
        <div className="score-panel">Score: {score}</div>
        <div className="gift-message" style={{display: "none"}}>{giftMessage}</div>
        </div>
    );
}

const fly = () => {
    return (dispatch) => {
        try {
            dispatch({ type: "BIRD_FLY" });
        } catch (e) {
            //console.log(e);
        }
    };
};

const start = () => {
    return (dispatch, getState) => {
        const status = getState().game.status;
        const gameMode = getState().game.gameMode;
        if (status !== 'playing') {

            dispatch({ type: "START" });

            gameAnimation = setInterval(() => {
                dispatch({ type: "BIRD_FALL" });
                dispatch({ type: "PIPE_MOVE" });
                if (gameMode === 'challenge') {
                    dispatch({ type: "GIFT_MOVE" });
                }
                check(dispatch, getState);
            }, 1000 / config.getFPS());

            genrator = setInterval(() => {
                try {
                    dispatch({ type: "PIPE_GENERATE" });
                    if (gameMode === 'challenge')
                    {
                        dispatch({ type: "GIFT_GENERATE", pipes: getState().pipe.pipes, pipeCount: getState().pipe.pipeCount });
                    }
                } catch (e) {
                }

            }, config.getGenerateTime());

        }
    };
};

const check = (dispatch, getState) => {
    const state = getState();
    const bird = state.bird.bird;
    const pipes = state.pipe.pipes;
    const gifts = state.gift.gifts;
    const gameMode = getState().game.gameMode;

    for (let i = 0; i < pipes.getLength(); i++) {
        if (bird.getX() + bird.getWidth() > pipes.getPipe(i).getX() &&
            bird.getX() < pipes.getPipe(i).getX() + config.getPipeWidth() &&
            (bird.getY() < pipes.getPipe(i).getTopHeight() || bird.getY() + bird.getHeight() > pipes.getPipe(i).getTopHeight() + config.getPipeHole())
        ) {
            effect_on = false;
            inGame = false;
            clearInterval(gameAnimation);
            clearInterval(genrator);
            dispatch({ type: "DISPLAY_END_GAME", payload: state.game.score });
        }
        if (pipes.getPipe(i).isPassed() === false && bird.getX() > pipes.getPipe(i).getX() + config.getPipeWidth()) {
            dispatch({ type: "PIPE_PASS", payload: i });
            dispatch({ type: "SCORE_INCREASEMENT" });
        }
    }
    if (gameMode === 'challenge')
    {
        for (let i = 0; i < gifts.length; i++) {
            if (
                bird.getX() + bird.getWidth() > gifts[i].x &&
                bird.getX() < gifts[i].x + config.getGiftWidth() &&
                bird.getY() + bird.getHeight() > gifts[i].y &&
                bird.getY() < gifts[i].y + config.getGiftHeight()
            ) {
                dispatch({ type: "GIFT_EATEN", eaten_index: i });
                fadeOutEffect(state.gift.giftMessage, gifts[i]);
                state.gift.giftMessage = null;
    
                break;
            }
        }
    }
    
};

const mapStateToProps = ({ game, gift }) => ({ status: game.status, score: game.score, giftMessage: gift.giftMessage});

const mapDispatchToProps = { start, fly };

export default connect(mapStateToProps, mapDispatchToProps)(Game);


function fadeOutEffect(msg, gift_pos) {
    var fadeTarget = document.getElementsByClassName("gift-message")[0];
    fadeTarget.innerText = msg;
    fadeTarget.style.opacity = 1;
    
    let cur_top = gift_pos.y - 10;

    fadeTarget.style.left = (gift_pos.x - 5) + "vh";
    fadeTarget.style.top = cur_top + "vh";
    fadeTarget.style.display = "";

    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1/12;
            cur_top -= 1/12;
            fadeTarget.style.top = cur_top + "vh";

        } else {
            fadeTarget.style.display = "none";
            clearInterval(fadeEffect);

        }
    }, 1000/config.getFPS());
}
