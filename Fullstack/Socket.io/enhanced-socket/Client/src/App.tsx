import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  content: string;
  userId: string;
  username?: string;
  timestamp: Date;
  isPrivate?: boolean;
}

interface User {
  id: string;
  username?: string;
}

const App: React.FC = () => {
  const socketRef = useRef<Socket | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [username, setUsername] = useState('');
  const [privateMessageInput, setPrivateMessageInput] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [privateMessages, setPrivateMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    socketRef.current = newSocket;

    newSocket.on('log', (userId: string) => {
      console.log('Received my user ID:', userId);
      setCurrentUser({ id: userId });
      setConnectedUsers(prev => [...prev, { id: userId }]);
    });

    newSocket.on('message', (message: string, userId: string) => {
      const newMessage: Message = {
        content: message,
        userId: userId,
        timestamp: new Date(),
        isPrivate: false
      };
      setMessages(prev => [...prev, newMessage]);
    });

    newSocket.on('userJoined', (userId: string) => {
      console.log(`User ${userId} joined the chat`);
      setConnectedUsers(prev => [...prev, { id: userId }]);
    });

    newSocket.on('userLeft', (userId: string) => {
      console.log(`User ${userId} left the chat`);
      setConnectedUsers(prev => prev.filter(user => user.id !== userId));
    });

    newSocket.on('userCount', (count: number) => {
      setUserCount(count);
    });

    newSocket.on('usernameChanged', (userId: string, newUsername: string) => {
      setConnectedUsers(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, username: newUsername } : user
        )
      );
    });

    newSocket.on('privateMessage', (senderId: string, message: string) => {
      const newMessage: Message = {
        content: message,
        userId: senderId,
        timestamp: new Date(),
        isPrivate: true
      };
      setPrivateMessages(prev => [...prev, newMessage]);
    });

    newSocket.on('privateMessageSent', (targetUserId: string, message: string) => {
      console.log(`Private message sent to ${targetUserId}: ${message}`);
    });

    newSocket.on('error', (errorMessage: string) => {
      console.error('Server error:', errorMessage);
      alert(`Error: ${errorMessage}`);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim() && socketRef.current && currentUser) {
      socketRef.current.emit('message', messageInput, currentUser.id);
      setMessageInput('');
    }
  };

  const handleSetUsername = () => {
    if (username.trim() && socketRef.current && currentUser) {
      socketRef.current.emit('setUsername', username, currentUser.id);
      setUsername('');
    }
  };

  const handleSendPrivateMessage = () => {
    if (privateMessageInput.trim() && selectedUser && socketRef.current && currentUser) {
      socketRef.current.emit('privateMessage', selectedUser, privateMessageInput, currentUser.id);
      setPrivateMessageInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handlePrivateKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendPrivateMessage();
    }
  };

  const getUserDisplayName = (userId: string) => {
    const user = connectedUsers.find(u => u.id === userId);
    return user?.username || userId;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Enhanced Socket.io Chat</h1>
          <div className="text-sm text-gray-600">
            Connected Users: {userCount}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Connected Users */}
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Connected Users ({connectedUsers.length})</h2>
            <div className="space-y-2">
              {connectedUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">{user.username || user.id}</span>
                  <span className="text-xs text-gray-500">{user.id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold mb-3">Public Messages</h2>
              <div className="h-64 overflow-y-auto mb-4">
                {messages.map((message, index) => (
                  <div key={index} className="mb-2 p-2 bg-blue-50 rounded">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-blue-800">
                        {getUserDisplayName(message.userId)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{message.content}</p>
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

            {/* Username Setting */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="text-md font-semibold mb-2">Set Username</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username..."
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  onClick={handleSetUsername}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Set
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Private Messages */}
        <div className="bg-white rounded-lg p-4 mt-4">
          <h2 className="text-lg font-semibold mb-3">Private Messages</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select User:</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Choose a user...</option>
                {connectedUsers
                  .filter(user => user.id !== currentUser?.id)
                  .map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username || user.id}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={privateMessageInput}
                  onChange={(e) => setPrivateMessageInput(e.target.value)}
                  onKeyDown={handlePrivateKeyDown}
                  placeholder="Type private message..."
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  onClick={handleSendPrivateMessage}
                  disabled={!selectedUser}
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300"
                >
                  Send Private
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Private Message History</h3>
            <div className="h-32 overflow-y-auto">
              {privateMessages.map((message, index) => (
                <div key={index} className="mb-2 p-2 bg-purple-50 rounded">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-purple-800">
                      {getUserDisplayName(message.userId)} (Private)
                    </span>
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 