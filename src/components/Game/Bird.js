import React from "react";

import { connect } from "react-redux";

import "../../style.css";


const Bird = ({bird}) => {
    
    let y = bird.getY();
    let x = bird.getX();
    x = 47.5 * document.documentElement.clientWidth / document.documentElement.clientHeight;

    return (
        <div className="bird"
            style={{
                top: y + "vh",
                left: x + "vh",
            }}>
        </div>
    )
}

const mapStateToProps = ({bird}) => ({bird: bird.bird});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Bird);