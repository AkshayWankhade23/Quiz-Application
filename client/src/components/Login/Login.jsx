import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from "./Style.module.css"
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', { email, password });

      if (response.data.success) {
        const { token, userId } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
        navigate('/dashboard-page')
        toast.success('Login successful');
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  };

  return (
    <div className={style.login_main}>
      <form>
        <div>
          <label className={style.label}>Email</label>
          <input className={style.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className={style.label}>Password</label>
          <input className={style.input}  type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="button" onClick={handleLogin} className={style.login_btn}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
