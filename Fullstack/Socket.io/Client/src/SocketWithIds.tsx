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

interface AppWithIdsProps {
  onBackToSimple: () => void;
}

const AppWithIds: React.FC<AppWithIdsProps> = ({ onBackToSimple }) => {
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
    if (username.trim() && socketRef.current) {
      socketRef.current.emit('setUsername', username);
      setCurrentUser(prev => prev ? { ...prev, username } : null);
      setUsername('');
    }
  };

  const handleSendPrivateMessage = () => {
    if (privateMessageInput.trim() && selectedUser && socketRef.current) {
      socketRef.current.emit('privateMessage', selectedUser, privateMessageInput);
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
    return user?.username || userId.substring(0, 8) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Enhanced Chat with User IDs</h1>
          <button
            onClick={() => {
              if (socketRef.current) {
                socketRef.current.close();
              }
              onBackToSimple();
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Selection
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <h2 className="text-xl font-semibold mb-3">Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Your ID:</strong> {currentUser?.id || 'Connecting...'}</p>
              <p><strong>Username:</strong> {currentUser?.username || 'Not set'}</p>
              <p><strong>Connected Users:</strong> {userCount}</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Set your username..."
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">Connected Users ({connectedUsers.length})</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {connectedUsers.map((user) => (
                <div 
                  key={user.id} 
                  className={`p-2 rounded cursor-pointer transition-colors ${
                    selectedUser === user.id ? 'bg-blue-200' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedUser(user.id)}
                >
                  <div className="font-medium">{getUserDisplayName(user.id)}</div>
                  <div className="text-sm text-gray-500">{user.id.substring(0, 8)}...</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">Public Chat</h3>
            <div className="h-64 overflow-y-auto mb-3 border rounded p-2">
              {messages.map((message, index) => (
                <div key={index} className="mb-2 p-2 bg-blue-50 rounded">
                  <div className="text-sm text-gray-600">
                    {getUserDisplayName(message.userId)} • {message.timestamp.toLocaleTimeString()}
                  </div>
                  <div>{message.content}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a public message..."
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

          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">
              Private Messages
              {selectedUser && ` (to ${getUserDisplayName(selectedUser)})`}
            </h3>
            <div className="h-64 overflow-y-auto mb-3 border rounded p-2">
              {privateMessages.map((message, index) => (
                <div key={index} className="mb-2 p-2 bg-purple-50 rounded">
                  <div className="text-sm text-gray-600">
                    {getUserDisplayName(message.userId)} • {message.timestamp.toLocaleTimeString()}
                  </div>
                  <div>{message.content}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={privateMessageInput}
                onChange={(e) => setPrivateMessageInput(e.target.value)}
                onKeyDown={handlePrivateKeyDown}
                placeholder="Type a private message..."
                className="flex-1 px-3 py-2 border rounded"
                disabled={!selectedUser}
              />
              <button
                onClick={handleSendPrivateMessage}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300"
                disabled={!selectedUser}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppWithIds; 