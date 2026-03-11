import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload
    setError('');

    try {
      // Send POST request to our backend API
      const response = await axios.post('http://localhost:5005/api/auth/login', {
        email,
        password
      });

      // If successful, save token to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect user to the chat interface
      navigate('/chat');
    } catch (err) {
      // In case of error (e.g. wrong password), show message
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
      
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      
      <button type="submit" className="auth-submit-btn">Login</button>
    </form>
  );
};

export default Login;
