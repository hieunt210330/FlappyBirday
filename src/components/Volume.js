import React, { useEffect } from "react";
import { connect } from "react-redux";

import '../style/home.css';

const Volume = ({dispatchDisplay}) => {

};

const dispatchDisplay = (diplayTypeStr) => {
  return (dispatch) => {
    dispatch({type: diplayTypeStr})
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {dispatchDisplay};

export default connect(mapStateToProps, mapDispatchToProps)(Volume);