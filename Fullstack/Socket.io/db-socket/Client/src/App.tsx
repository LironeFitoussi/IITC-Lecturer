import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { authService, type Room } from './services/authService';
import { useSocket } from './hooks/useSocket';

interface User {
  id: string;
  username: string;
  email: string;
}



interface Message {
  _id: string;
  content: string;
  sender: { _id: string; username: string };
  room: string;
  messageType: string;
  createdAt: string;
}

const App: React.FC = () => {
  const socket = useSocket();
  const { user: currentUser, isAuthenticated, login, logout, loading } = useAuth();
  
  // Auth forms
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({
    username: '',
    password: '',
    email: ''
  });
  
  // Chat state
  const [userRooms, setUserRooms] = useState<Room[]>([]);
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [roomMessages, setRoomMessages] = useState<Message[]>([]);
  const [roomMessageInput, setRoomMessageInput] = useState('');
  const [newRoomForm, setNewRoomForm] = useState({
    name: '',
    description: '',
    isPrivate: false
  });
  
  // Connected users
  const [connectedUsers, setConnectedUsers] = useState<{ userId: string; username: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [privateMessages, setPrivateMessages] = useState<Message[]>([]);
  const [privateMessageInput, setPrivateMessageInput] = useState('');

  // API calls
  const handleRegister = async () => {
    try {
      const data = await authService.register({
        username: authForm.username,
        password: authForm.password,
        email: authForm.email
      });
      
      login(data.user);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      const data = await authService.login({
        username: authForm.username,
        password: authForm.password
      });
      
      login(data.user);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Login failed');
    }
  };



  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    socket.on('userRooms', (rooms: Room[]) => {
      setUserRooms(rooms);
    });

    socket.on('roomCreated', (room: Room) => {
      setUserRooms(prev => [...prev, room]);
      setAllRooms(prev => [...prev, room]);
    });

    socket.on('roomJoined', (room: Room) => {
      setSelectedRoom(room);
      setUserRooms(prev => {
        const exists = prev.find(r => r._id === room._id);
        return exists ? prev : [...prev, room];
      });
    });

    socket.on('roomLeft', (roomName: string) => {
      setSelectedRoom(null);
      setRoomMessages([]);
      setUserRooms(prev => prev.filter(r => r.name !== roomName));
    });

    socket.on('roomHistory', (messages: Message[]) => {
      setRoomMessages(messages);
    });

    socket.on('roomMessage', (message: Message) => {
      setRoomMessages(prev => [...prev, message]);
    });

    socket.on('userJoinedRoom', (userData: { userId: string; username: string }) => {
      console.log(`User ${userData.username} joined room`);
    });

    socket.on('userLeftRoom', (userData: { userId: string; username: string }) => {
      console.log(`User ${userData.username} left room`);
    });

    socket.on('roomDeleted', (roomName: string) => {
      setUserRooms(prev => prev.filter(r => r.name !== roomName));
      setAllRooms(prev => prev.filter(r => r.name !== roomName));
      if (selectedRoom?.name === roomName) {
        setSelectedRoom(null);
        setRoomMessages([]);
      }
    });

    socket.on('connectedUsers', (users: { userId: string; username: string }[]) => {
      setConnectedUsers(users);
    });

    socket.on('privateMessage', (message: any) => {
      const newMessage: Message = {
        _id: Date.now().toString(),
        content: message.content,
        sender: message.sender,
        room: 'private',
        messageType: 'text',
        createdAt: message.timestamp
      };
      setPrivateMessages(prev => [...prev, newMessage]);
    });

    socket.on('privateMessageSent', (data: any) => {
      console.log('Private message sent:', data);
    });

    socket.on('error', (error: string) => {
      alert(`Error: ${error}`);
    });

    return () => {
      socket.off('userRooms');
      socket.off('roomCreated');
      socket.off('roomJoined');
      socket.off('roomLeft');
      socket.off('roomHistory');
      socket.off('roomMessage');
      socket.off('userJoinedRoom');
      socket.off('userLeftRoom');
      socket.off('roomDeleted');
      socket.off('connectedUsers');
      socket.off('privateMessage');
      socket.off('privateMessageSent');
      socket.off('error');
    };
  }, [socket, selectedRoom]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleCreateRoom = () => {
    if (newRoomForm.name.trim() && socket) {
      socket.emit('createRoom', newRoomForm);
      setNewRoomForm({ name: '', description: '', isPrivate: false });
    }
  };

  const handleJoinRoom = (room: Room) => {
    if (socket) {
      socket.emit('joinRoom', room.name);
    }
  };

  const handleLeaveRoom = () => {
    if (selectedRoom && socket) {
      socket.emit('leaveRoom', selectedRoom.name);
    }
  };

  const handleRoomMessage = () => {
    if (roomMessageInput.trim() && selectedRoom && socket) {
      socket.emit('roomMessage', {
        roomName: selectedRoom.name,
        content: roomMessageInput
      });
      setRoomMessageInput('');
    }
  };

  const handlePrivateMessage = () => {
    if (privateMessageInput.trim() && selectedUser && socket) {
      socket.emit('privateMessage', {
        targetUserId: selectedUser,
        content: privateMessageInput
      });
      setPrivateMessageInput('');
    }
  };

  const getConnectedUsers = () => {
    if (socket) {
      socket.emit('getConnectedUsers');
    }
  };

  const handleLogout = () => {
    logout();
    setUserRooms([]);
    setAllRooms([]);
    setSelectedRoom(null);
    setRoomMessages([]);
    setConnectedUsers([]);
  };

  // Load rooms from API when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const loadRooms = async () => {
        try {
          const [userRoomsData, allRoomsData] = await Promise.all([
            authService.getUserRooms(),
            authService.getAllRooms()
          ]);
          setUserRooms(userRoomsData);
          setAllRooms(allRoomsData);
        } catch (error) {
          console.error('Failed to load rooms:', error);
        }
      };
      loadRooms();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && socket) {
      getConnectedUsers();
    }
  }, [isAuthenticated, socket]);

  // Show loading while auth context is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">DB Chat Authentication</h1>
          
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={authForm.username}
              onChange={(e) => setAuthForm(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              required
            />
            
            {!isLogin && (
              <input
                type="email"
                placeholder="Email"
                value={authForm.email}
                onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border rounded"
                required
              />
            )}
            
            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              required
            />
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>


        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">DB Chat with JWT & MongoDB</h1>
          <div className="flex gap-2">
            <span className="px-3 py-2 bg-green-100 text-green-800 rounded">
              Logged in as: {currentUser?.username}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Available Rooms */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">All Rooms ({allRooms.length})</h3>
            {userRooms.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 rounded">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Your Rooms ({userRooms.length})</h4>
                <div className="space-y-1">
                  {userRooms.map((room) => (
                    <div key={room._id} className="text-sm text-blue-700">
                      • {room.name} ({room.users.length} users)
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Room name..."
                value={newRoomForm.name}
                onChange={(e) => setNewRoomForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Description (optional)..."
                value={newRoomForm.description}
                onChange={(e) => setNewRoomForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newRoomForm.isPrivate}
                  onChange={(e) => setNewRoomForm(prev => ({ ...prev, isPrivate: e.target.checked }))}
                  className="mr-2"
                />
                Private Room
              </label>
              <button
                onClick={handleCreateRoom}
                className="w-full mt-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create Room
              </button>
            </div>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                {allRooms.map((room) => {
                  const isUserInRoom = userRooms.some(userRoom => userRoom._id === room._id);
                  return (
                    <div 
                      key={room._id} 
                      className={`p-2 border rounded cursor-pointer transition-colors ${
                        isUserInRoom ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleJoinRoom(room)}
                    >
                      <div className="font-medium flex justify-between items-center">
                        {room.name}
                        {isUserInRoom && (
                          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                            Joined
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {room.description || 'No description'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {room.users.length} users • {room.isPrivate ? 'Private' : 'Public'} • Created by {room.createdBy.username}
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>

          {/* Room Chat */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">
              Room Chat
              {selectedRoom && ` (${selectedRoom.name})`}
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
              {roomMessages.map((message) => (
                <div key={message._id} className="mb-2 p-2 bg-blue-50 rounded">
                  <div className="text-sm text-gray-600">
                    {message.sender.username} • {new Date(message.createdAt).toLocaleTimeString()}
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

          {/* Connected Users */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">Connected Users</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {connectedUsers.map((user) => (
                <div 
                  key={user.userId} 
                  className={`p-2 rounded cursor-pointer transition-colors ${
                    selectedUser === user.userId ? 'bg-blue-200' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedUser(user.userId)}
                >
                  <div className="font-medium">{user.username}</div>
                  <div className="text-sm text-gray-500">{user.userId.substring(0, 8)}...</div>
                </div>
              ))}
            </div>
          </div>

          {/* Private Messages */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">
              Private Messages
              {selectedUser && ` (to ${connectedUsers.find(u => u.userId === selectedUser)?.username})`}
            </h3>
            <div className="h-64 overflow-y-auto mb-3 border rounded p-2">
              {privateMessages.map((message) => (
                <div key={message._id} className="mb-2 p-2 bg-purple-50 rounded">
                  <div className="text-sm text-gray-600">
                    {message.sender.username} • {new Date(message.createdAt).toLocaleTimeString()}
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

export default App; 