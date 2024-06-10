import React, { useEffect } from "react";
import { connect } from "react-redux";

import '../style/home.css';

const Rules = ({dispatchDisplay}) => {

};

const dispatchDisplay = (diplayTypeStr) => {
  return (dispatch) => {
    dispatch({type: diplayTypeStr})
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {dispatchDisplay};

export default connect(mapStateToProps, mapDispatchToProps)(Rules);