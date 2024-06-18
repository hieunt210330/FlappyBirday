import React from "react";

import { connect } from "react-redux";

import config from "../../gameconfig";

import "../../style.css";


const Bird = ({y, dY, r, d}) => {
    
    const x = 47.5 * document.documentElement.clientWidth / document.documentElement.clientHeight;

    return (
        <div className="bird"
            style={{
                top: y + "vh",
                left: x + "vh",
            }}>
        </div>
    )
}

const mapStateToProps = ({bird}) => ({y: bird.y, dY: bird.dY, r: bird.r, d: bird.d});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Bird);