import React from "react";

import { connect } from "react-redux";

import config from "../../class/GameConfig";

import "../../style.css";

const Pipe = ({pipes, d}) => {
    return (
        <div>
            {
                pipes.map(({x, topHeight}, index) => {
                    const pos_x = x + "vh";
                    return (
                        <div key={`pipe-${index}`}>
                            <div className="pipe-top" style={{
                                left: pos_x,
                                display: d,
                                height: topHeight + "vh",
                            }}></div>
                            <div className="pipe-bottom" style={{
                                left: pos_x,
                                display: d,
                                top: (topHeight + (config.PIPE_HOLE)) + "vh",
                            }}></div>
                        </div>
                    )
                })
            }
        </div>
    )
}


const mapStateToProps = ({pipe}) => ({pipes: pipe.pipes, d: pipe.d});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Pipe);
