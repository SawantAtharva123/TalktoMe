import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MessageBubble from './MessageBubble';
import '../styles/chat.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to the bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // 1. Add user message to UI immediately
    const userMessage = { role: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 2. Send the message to our backend endpoint using JWT for auth
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5005/api/chat',
        { message: userMessage.text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 3. Receive Gemini's reply and add bot message to UI
      const botMessage = { role: 'bot', text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Optional: Handle error by showing an error bubble
      setMessages((prev) => [...prev, { role: 'bot', text: 'Error: Could not connect to Gemini AI.' }]);
      
      // If unauthorized (token expired), redirect to login
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Allow sending when pressing Enter (without shift key for new line)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      {/* Optional Top Right Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Logout
      </button>

      {/* Header section (Talk to me Bot Pill) */}
      <div className="chat-header">
        <div className="pill-badge">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Talk to me Bot
        </div>

        {/* If no messages, show Hey!! */}
        {messages.length === 0 && <h1 className="chat-title">Hey!!</h1>}
      </div>

      {/* Chat Messages Area */}
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        {isLoading && (
          <div className="message-bot message-bubble loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input section */}
      <div className="chat-input-wrapper">
        <textarea
          className="chat-input"
          placeholder="What would you like to know?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button 
          className="chat-send-btn" 
          onClick={handleSend} 
          disabled={isLoading || !inputValue.trim()}
        >
          {/* Arrow up icon */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20V4M12 4L5 11M12 4L19 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
