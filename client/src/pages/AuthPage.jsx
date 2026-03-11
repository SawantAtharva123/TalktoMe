import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import '../styles/auth.css';

const AuthPage = () => {
  // We use state to toggle between 'login' and 'register' views
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Top Badge matching the UI requirement */}
        <div className="pill-badge">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Join Talk to me Bot
        </div>

        {/* Conditionally render Login or Register component based on state */}
        {isLoginView ? (
          <Login />
        ) : (
          <Register />
        )}

        {/* Toggle Button */}
        <div className="auth-toggle">
          {isLoginView ? 'Don\'t have an account?' : 'Already have one?'}
          <button onClick={() => setIsLoginView(!isLoginView)}>
            {isLoginView ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
