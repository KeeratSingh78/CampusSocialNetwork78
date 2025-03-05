import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, 
  faTimes, 
  faPaperPlane 
} from '@fortawesome/free-solid-svg-icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! I\'m your Campus Connect assistant. How can I help you today?',
      sender: 'bot',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I can help you with that! What specific information do you need?",
        "That's a great question about campus resources.",
        "",
        "Have you checked the student portal for that information?",
        "I'd recommend reaching out to your academic advisor about this.",
        "The library would be a good resource for that question."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: Date.now()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">Campus Connect Assistant</div>
            <div className="chatbot-close" onClick={toggleChatbot}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`chatbot-message ${message.sender}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <div className="chatbot-send" onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </div>
        </div>
      )}
      
      <div className="chatbot-button" onClick={toggleChatbot}>
        <FontAwesomeIcon icon={faRobot} />
      </div>
    </div>
  );
};

export default Chatbot;