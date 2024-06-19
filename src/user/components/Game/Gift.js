import React from "react";

import { connect } from "react-redux";

import "../../style.css";

const Gift = ({gifts}) => {
    return (
        <div>
            {
                gifts.getGifts().map(({x, y}, index) => {
                    const pos_x = x + "vh";
                    return (
                        <div key={`gift-${index}`}>
                            <div className="gift" style={{
                                left: pos_x,
                                top: y + "vh",
                            }}></div>
                        </div>
                    )
                })
            }
        </div>
    )
}


const mapStateToProps = ({gift}) => ({gifts: gift.gifts});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Gift);
