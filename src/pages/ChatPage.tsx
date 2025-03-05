import React, { useState, useEffect } from "react";
import   "../styles/chatbot.css";// Assuming CSS file is in 'styles' folder

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

// ChatPage Component
const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  // Function to handle user input
  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulating bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "This is an automated response!",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

// Corrected default export
export default ChatPage;
