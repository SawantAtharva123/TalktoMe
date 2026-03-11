import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if passwords match
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      // Send POST request to our backend register API
      const response = await axios.post('http://localhost:5005/api/auth/register', {
        name,
        email,
        password
      });

      // If successful, save token to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect user to the chat interface
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
      
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      
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
      
      <input 
        type="password" 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        required 
      />
      
      <button type="submit" className="auth-submit-btn">Register</button>
    </form>
  );
};

export default Register;
