import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../api/database'; // Replace with your actual import
import '../style/register.css';
import { setCurUserId } from '../../class/user';

const Register =  ({ dispatchDisplay }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatchDisplay('DISPLAY_LOGIN');
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createUser(email, name, password, 'User');
        if (response === null) {
            alert('Wrong information. Please try again.');
        } else {
            setCurUserId(response.id);
            alert('User created successfully!')
            dispatchDisplay('DISPLAY_HOME_USER');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p className="login-link" onClick={handleLogin}>Return to login page</p>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr })
  });
  
  export default connect(null, mapDispatchToProps)(Register);
  