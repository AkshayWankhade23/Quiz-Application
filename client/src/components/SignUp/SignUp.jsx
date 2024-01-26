import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

const Signup = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password matching validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("password doesn’t match");
      return;
    }

    try {
      // Send signup data to the backend
      const response = await axios.post('http://localhost:3000/api/signup', formData);

      // Assuming the backend returns a token upon successful signup
      const { token, userId } = response.data;

      // Store the token and user ID in localStorage or a state management system
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // Redirect to another page or perform any other actions after successful signup
      navigate('/create-quiz')
      toast.success('Signup successful!');

    } catch (error) {
      console.error('Signup error:', error.response.data.error || 'Internal Server Error');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <br />
        <label>Confirm Password:
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
