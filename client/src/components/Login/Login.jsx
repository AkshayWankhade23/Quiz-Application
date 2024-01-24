import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });

      if (response.data.success) {
        // Successfully logged in, you can handle the token or user data here
        const { token, userId } = response.data;

      // Store the token and user ID in localStorage or a state management system
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
        navigate('/')
        console.log('Login successful');
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Internal Server Error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Login;
