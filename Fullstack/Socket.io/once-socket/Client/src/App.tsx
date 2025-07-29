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
  const [eventLog, setEventLog] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    socketRef.current = newSocket;

    // Regular event listeners
    newSocket.on('log', (userId: string) => {
      console.log('Received my user ID:', userId);
      setCurrentUser({ id: userId });
      setConnectedUsers(prev => [...prev, { id: userId }]);
      addEventLog(`Received user ID: ${userId}`);
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
      addEventLog(`User ${userId} joined`);
    });

    newSocket.on('userLeft', (userId: string) => {
      console.log(`User ${userId} left the chat`);
      setConnectedUsers(prev => prev.filter(user => user.id !== userId));
      addEventLog(`User ${userId} left`);
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
      addEventLog(`User ${userId} changed username to ${newUsername}`);
    });

    newSocket.on('privateMessage', (senderId: string, message: string) => {
      const newMessage: Message = {
        content: message,
        userId: senderId,
        timestamp: new Date(),
        isPrivate: true
      };
      setPrivateMessages(prev => [...prev, newMessage]);
      addEventLog(`Private message from ${senderId}`);
    });
    
    // Once event listener - only fires once
    newSocket.once('welcome', (message) => {
      console.log('Server says:', message);
      addEventLog(`Welcome message: ${message}`);
    });

    // Broadcast event listener
    newSocket.on('broadcastMessage', (message: string, senderId: string) => {
      addEventLog(`Broadcast from ${senderId}: ${message}`);
    });

    // Room-specific events
    newSocket.on('roomMessage', (room: string, message: string, userId: string) => {
      addEventLog(`Room ${room} message from ${userId}: ${message}`);
    });

    newSocket.on('privateMessageSent', (targetUserId: string, message: string) => {
      console.log(`Private message sent to ${targetUserId}: ${message}`);
      addEventLog(`Private message sent to ${targetUserId}`);
    });

    newSocket.on('error', (errorMessage: string) => {
      console.error('Server error:', errorMessage);
      addEventLog(`Error: ${errorMessage}`);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const addEventLog = (message: string) => {
    setEventLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

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

  const handleTestOnceEvent = () => {
    if (socketRef.current) {
      socketRef.current.emit('testOnce');
      addEventLog('Requested test once event');
    }
  };

  const handleTestBroadcast = () => {
    if (socketRef.current && currentUser) {
      socketRef.current.emit('testBroadcast', 'Hello everyone!', currentUser.id);
      addEventLog('Sent broadcast test');
    }
  };

  const handleJoinRoom = () => {
    if (socketRef.current) {
      socketRef.current.emit('joinRoom', 'test-room');
      addEventLog('Joined test-room');
    }
  };

  const handleLeaveRoom = () => {
    if (socketRef.current) {
      socketRef.current.emit('leaveRoom', 'test-room');
      addEventLog('Left test-room');
    }
  };

  const handleSendRoomMessage = () => {
    if (messageInput.trim() && socketRef.current && currentUser) {
      socketRef.current.emit('roomMessage', 'test-room', messageInput, currentUser.id);
      setMessageInput('');
      addEventLog('Sent room message');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Socket.io Once Events Demo</h1>
          <div className="text-sm text-gray-600">
            Connected Users: {userCount}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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

          {/* Event Log */}
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Event Log</h2>
            <div className="h-96 overflow-y-auto">
              {eventLog.map((log, index) => (
                <div key={index} className="text-xs p-1 border-b">
                  {log}
                </div>
              ))}
            </div>
            <div className="mt-2 space-y-2">
              <button
                onClick={handleTestOnceEvent}
                className="w-full px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
              >
                Test Once Event
              </button>
              <button
                onClick={handleTestBroadcast}
                className="w-full px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
              >
                Test Broadcast
              </button>
              <button
                onClick={handleJoinRoom}
                className="w-full px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
              >
                Join Test Room
              </button>
              <button
                onClick={handleLeaveRoom}
                className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Leave Test Room
              </button>
              <button
                onClick={handleSendRoomMessage}
                className="w-full px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm"
              >
                Send Room Message
              </button>
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