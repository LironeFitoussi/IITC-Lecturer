import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import AppWithIds from './SocketWithIds';
import AppWithOnce from './SocketWithOnce';

// Define the different chat modes
type ChatMode = 'none' | 'simple' | 'enhanced' | 'once';

const App: React.FC = () => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [chatMode, setChatMode] = useState<ChatMode>('none');

  useEffect(() => {
    if (chatMode === 'simple') {
      const newSocket = io('http://localhost:3001');
      setSocket(newSocket);

      newSocket.on('message', (message: string) => {
        setMessages(prev => [...prev, `${message}`]);
      });

      return () => {
        newSocket.close();
      };
    }
  }, [chatMode]);

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

  const switchToEnhanced = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
    setChatMode('enhanced');
  };

  const switchToSimple = () => {
    setChatMode('simple');
  };

  const switchToNone = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
    setChatMode('none');
  };

  const switchToOnce = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
    setChatMode('once');
  };


  if (chatMode === 'once') {
    return <AppWithOnce onBackToSimple={switchToNone} />;
  }

  if (chatMode === 'enhanced') {
    return <AppWithIds onBackToSimple={switchToNone} />;
  }

  if (chatMode === 'simple') {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Simple Chat</h1>
            <button
              onClick={switchToEnhanced}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Switch to Enhanced Chat
            </button>
            <button
              onClick={switchToOnce}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Switch to Once Chat
            </button>
            <button
              onClick={switchToNone}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Back to Selection
            </button>
          </div>
          
          <div className="bg-white rounded-lg p-4 mb-4 h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className="mb-2 p-2 bg-blue-100 rounded">
                {message}
              </div>
            ))}
          </div>

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
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Socket.io Chat Examples</h1>
          <p className="text-lg text-gray-600 mb-8">Choose a chat mode to get started</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Simple Chat</h2>
              <p className="text-gray-600 mb-4">Basic Socket.io chat with public messaging</p>
              <button
                onClick={switchToSimple}
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Simple Chat
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Enhanced Chat</h2>
              <p className="text-gray-600 mb-4">Advanced chat with user IDs and private messaging</p>
              <button
                onClick={switchToEnhanced}
                className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Start Enhanced Chat
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Once Chat</h2>
              <p className="text-gray-600 mb-4">Enhanced chat with additional once event handling</p>
              <button
                onClick={switchToOnce}
                className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Start Once Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 