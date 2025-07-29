import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const App: React.FC = () => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('message', (message: string) => {
      setMessages(prev => [...prev, `${message}`]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim() && socket) {
      socket.emit('message', messageInput, socket.id);
      setMessageInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Basic Socket.io Chat</h1>
        </div>
        
        {/* Messages */}
        <div className="bg-white rounded-lg p-4 mb-4 h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-2 p-2 bg-blue-100 rounded">
              {message}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App; 