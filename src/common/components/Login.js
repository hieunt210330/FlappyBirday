import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import '../style/login.css'; // Import the CSS file

const Login = ({ dispatchDisplay }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic for handling login
    //console.log('Login:', { email, password });
    if (email === 'admin@admin.com' && password === 'admin') {
      dispatchDisplay('DISPLAY_HOME_ADMIN');
      return;
    }
    //dispatchDisplay('DISPLAY_HOME_USER');
    dispatchDisplay('DISPLAY_HOME_USER');

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
