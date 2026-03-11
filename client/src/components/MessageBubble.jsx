import React from 'react';

const MessageBubble = ({ message }) => {
  // Determine if this is a user message or from the bot
  const isUser = message.role === 'user';
  
  return (
    <div className={`message-bubble ${isUser ? 'message-user' : 'message-bot'}`}>
      {message.text}
    </div>
  );
};

export default MessageBubble;
