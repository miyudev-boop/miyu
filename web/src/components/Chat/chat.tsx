import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import './ChatStyles.module.css';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (message: string) => {
    setMessages([...messages, { user: 'You', text: message }]);
    setIsTyping(true);

    // Simulate API interaction with AI
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
    const data = await response.json();

    setMessages((prev) => [...prev, { user: 'AI', text: data.reply }]);
    setIsTyping(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} user={msg.user} text={msg.text} />
        ))}
        {isTyping && <p className="typing-indicator">AI is typing...</p>}
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default Chat;

