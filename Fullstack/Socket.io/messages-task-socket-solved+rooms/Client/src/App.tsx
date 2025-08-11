import React, { useState } from 'react';

// Components
import Login from './components/Login';
import Chat from './components/Chat';

const App: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [username, setUsername] = useState('');
  // Consider lifting selectedUserId to App if you want global control

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur border rounded-xl shadow-sm p-4 mb-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Basic Socket.io Chat</h1>
          <div className="text-xs md:text-sm text-gray-600">
            {userCount} user{userCount !== 1 ? 's' : ''} online
          </div>
        </div>
        <div className="bg-white border rounded-xl shadow-sm p-4">
          {
            username ? (
              <Chat setUserCount={setUserCount} username={username} />
            ) : (
              <Login setUsername={setUsername} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default App; 