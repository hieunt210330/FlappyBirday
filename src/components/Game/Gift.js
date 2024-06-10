import React from "react";

import { connect } from "react-redux";

import config from "../../gameconfig";

import "../../style.css";

const Gift = ({gifts, d}) => {
    return (
        <div>
            {
                gifts.map(({x, y}, index) => {
                    const pos_x = x + "vh";
                    return (
                        <div key={`gift-${index}`}>
                            <div className="gift" style={{
                                left: pos_x,
                                display: d,
                                top: y + "vh",
                            }}></div>
                        </div>
                    )
                })
            }
        </div>
    )
}


const mapStateToProps = ({pipe}) => ({gifts: pipe.gifts, d: pipe.d});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Gift);
