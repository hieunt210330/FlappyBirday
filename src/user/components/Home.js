import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import '../style/home.css';

import {
    getUserMaxScore,
    getTurnLeft
} from '../../api/database';

const Home = ({ dispatchDisplay }) => {
    const [highScore, setHighScore] = useState(null);
    const [turnsLeft, setTurnsLeft] = useState(null);
    const userId = process.env.USER_ID;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [highScore, turnsLeft] = await Promise.all([
                    getUserMaxScore(userId),
                    getTurnLeft(userId)
                ]);
                setHighScore(highScore);
                setTurnsLeft(turnsLeft);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div className="home-screen">
            <div className="main-content">
                <h1>Welcome to Flappy Birday!</h1>
                <button className="start-button" onClick={() => dispatchDisplay('DISPLAY_MODE_SELECTION')}>
                    Start Game!
                </button>
                <div className="info">
                    <p>Highest Point: <span className="high-score">{highScore !== null ? highScore : 'Loading...'}</span></p>
                    <p>Number of Turns Left: <span className="turns-left">{turnsLeft !== null ? turnsLeft : 'Loading...'}</span></p>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr })
});

export default connect(null, mapDispatchToProps)(Home);
