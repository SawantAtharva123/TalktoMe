import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';

// A helper component to protect routes that require authentication
// It checks if a token exists in localStorage
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/" replace />;
  }
  return children; // If token exists, render the protected component
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route: Login / Register */}
        <Route path="/" element={<AuthPage />} />
        
        {/* Protected Route: Chat Application */}
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
