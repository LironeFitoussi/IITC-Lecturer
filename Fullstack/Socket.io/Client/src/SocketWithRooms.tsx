import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  content: string;
  userId: string;
  username?: string;
  timestamp: Date;
  isPrivate?: boolean;
  roomName?: string;
}

interface User {
  id: string;
  username?: string;
}

interface Room {
  name: string;
  userCount: number;
  lastMessage?: any;
}

interface AppWithRoomsProps {
  onBackToSimple: () => void;
}

const AppWithRooms: React.FC<AppWithRoomsProps> = ({ onBackToSimple }) => {
  const socketRef = useRef<Socket | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [username, setUsername] = useState('');
  
  // Room state
  const [rooms, setRooms] = useState<Room[]>([]);
  const [myRooms, setMyRooms] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [roomMessages, setRoomMessages] = useState<Message[]>([]);
  const [roomMessageInput, setRoomMessageInput] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  
  // Global and private messaging
  const [globalMessages, setGlobalMessages] = useState<Message[]>([]);
  const [globalMessageInput, setGlobalMessageInput] = useState('');
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

    newSocket.on('welcome', (message: string) => {
      console.log('Welcome message:', message);
    });

    newSocket.on('userJoined', (userId: string) => {
      console.log(`User ${userId} joined`);
      setConnectedUsers(prev => [...prev, { id: userId }]);
    });

    newSocket.on('userLeft', (userId: string) => {
      console.log(`User ${userId} left`);
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

    // Room events
    newSocket.on('roomList', (roomList: Room[]) => {
      setRooms(roomList);
    });

    newSocket.on('roomCreated', (roomName: string, creatorId: string) => {
      console.log(`Room '${roomName}' created by ${creatorId}`);
      newSocket.emit('getRooms'); // Refresh room list
    });

    newSocket.on('roomJoined', (roomName: string) => {
      console.log(`Joined room: ${roomName}`);
      setSelectedRoom(roomName);
      newSocket.emit('getMyRooms'); // Refresh my rooms
    });

    newSocket.on('roomLeft', (roomName: string) => {
      console.log(`Left room: ${roomName}`);
      if (selectedRoom === roomName) {
        setSelectedRoom('');
        setRoomMessages([]);
      }
      newSocket.emit('getMyRooms'); // Refresh my rooms
    });

    newSocket.on('userJoinedRoom', (userId: string, roomName: string) => {
      console.log(`User ${userId} joined room ${roomName}`);
    });

    newSocket.on('userLeftRoom', (userId: string, roomName: string) => {
      console.log(`User ${userId} left room ${roomName}`);
    });

    newSocket.on('roomHistory', (roomName: string, messages: any[]) => {
      if (selectedRoom === roomName) {
        setRoomMessages(messages.map(msg => ({
          content: msg.content,
          userId: msg.userId,
          timestamp: new Date(msg.timestamp),
          roomName: msg.roomName
        })));
      }
    });

    newSocket.on('roomMessage', (messageData: any) => {
      const newMessage: Message = {
        content: messageData.content,
        userId: messageData.userId,
        timestamp: new Date(messageData.timestamp),
        roomName: messageData.roomName
      };
      setRoomMessages(prev => [...prev, newMessage]);
    });

    newSocket.on('myRooms', (roomList: string[]) => {
      setMyRooms(roomList);
    });

    newSocket.on('roomDeleted', (roomName: string) => {
      console.log(`Room '${roomName}' was deleted`);
      if (selectedRoom === roomName) {
        setSelectedRoom('');
        setRoomMessages([]);
      }
      newSocket.emit('getRooms'); // Refresh room list
    });

    // Global and private messages
    newSocket.on('globalMessage', (message: string, userId: string) => {
      const newMessage: Message = {
        content: message,
        userId: userId,
        timestamp: new Date(),
        isPrivate: false
      };
      setGlobalMessages(prev => [...prev, newMessage]);
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

    // Initial data fetch
    newSocket.emit('getRooms');
    newSocket.emit('getMyRooms');

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSetUsername = () => {
    if (username.trim() && socketRef.current) {
      socketRef.current.emit('setUsername', username);
      setCurrentUser(prev => prev ? { ...prev, username } : null);
      setUsername('');
    }
  };

  const handleCreateRoom = () => {
    if (newRoomName.trim() && socketRef.current) {
      socketRef.current.emit('createRoom', newRoomName);
      setNewRoomName('');
    }
  };

  const handleJoinRoom = (roomName: string) => {
    if (socketRef.current) {
      socketRef.current.emit('joinRoom', roomName);
    }
  };

  const handleLeaveRoom = () => {
    if (selectedRoom && socketRef.current) {
      socketRef.current.emit('leaveRoom', selectedRoom);
    }
  };

  const handleRoomMessage = () => {
    if (roomMessageInput.trim() && selectedRoom && socketRef.current && currentUser) {
      socketRef.current.emit('roomMessage', selectedRoom, roomMessageInput, currentUser.id);
      setRoomMessageInput('');
    }
  };

  const handleGlobalMessage = () => {
    if (globalMessageInput.trim() && socketRef.current && currentUser) {
      socketRef.current.emit('globalMessage', globalMessageInput, currentUser.id);
      setGlobalMessageInput('');
    }
  };

  const handlePrivateMessage = () => {
    if (privateMessageInput.trim() && selectedUser && socketRef.current) {
      socketRef.current.emit('privateMessage', selectedUser, privateMessageInput);
      setPrivateMessageInput('');
    }
  };

  const getUserDisplayName = (userId: string) => {
    const user = connectedUsers.find(u => u.id === userId);
    return user?.username || userId.substring(0, 8) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Rooms Chat with Socket.io</h1>
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
              <p><strong>My Rooms:</strong> {myRooms.join(', ') || 'None'}</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Available Rooms */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">Available Rooms</h3>
            <div className="mb-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="New room name..."
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  onClick={handleCreateRoom}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {rooms.map((room) => (
                <div 
                  key={room.name} 
                  className="p-2 border rounded cursor-pointer hover:bg-gray-50"
                  onClick={() => handleJoinRoom(room.name)}
                >
                  <div className="font-medium">{room.name}</div>
                  <div className="text-sm text-gray-500">
                    {room.userCount} users
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Room Chat */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">
              Room Chat
              {selectedRoom && ` (${selectedRoom})`}
            </h3>
            {selectedRoom && (
              <button
                onClick={handleLeaveRoom}
                className="mb-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Leave Room
              </button>
            )}
            <div className="h-64 overflow-y-auto mb-3 border rounded p-2">
              {roomMessages.map((message, index) => (
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
                value={roomMessageInput}
                onChange={(e) => setRoomMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRoomMessage()}
                placeholder="Type a room message..."
                className="flex-1 px-3 py-2 border rounded"
                disabled={!selectedRoom}
              />
              <button
                onClick={handleRoomMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                disabled={!selectedRoom}
              >
                Send
              </button>
            </div>
          </div>

          {/* Global Chat */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">Global Chat</h3>
            <div className="h-64 overflow-y-auto mb-3 border rounded p-2">
              {globalMessages.map((message, index) => (
                <div key={index} className="mb-2 p-2 bg-green-50 rounded">
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
                value={globalMessageInput}
                onChange={(e) => setGlobalMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGlobalMessage()}
                placeholder="Type a global message..."
                className="flex-1 px-3 py-2 border rounded"
              />
              <button
                onClick={handleGlobalMessage}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Send
              </button>
            </div>
          </div>

          {/* Connected Users & Private Messages */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">Users & Private Messages</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto mb-3">
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
            <div className="h-32 overflow-y-auto mb-3 border rounded p-2">
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
                onKeyDown={(e) => e.key === 'Enter' && handlePrivateMessage()}
                placeholder="Type a private message..."
                className="flex-1 px-3 py-2 border rounded"
                disabled={!selectedUser}
              />
              <button
                onClick={handlePrivateMessage}
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

export default AppWithRooms; 