import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {getUserByEmail} from '../../api/database';

import {setCurUserId} from '../../class/user'

import '../style/login.css'; // Import the CSS file

const Login = ({ dispatchDisplay }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = await getUserByEmail(email);
    if (user === null) {
      alert('User not found');
      return;
    }
    if (password === user.password) {
      if(user.isAdmin === true)
      {
        dispatchDisplay('DISPLAY_HOME_ADMIN');
      }
      else if (user.isAdmin === false)
      {
        setCurUserId(user.id);
        dispatchDisplay('DISPLAY_HOME_USER');
      }
    }
    else {
      alert('Invalid password');
    }
    return;

  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr })
});

export default connect(null, mapDispatchToProps)(Login);
