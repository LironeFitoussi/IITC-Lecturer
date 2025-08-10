import React, { useState } from 'react';

// Components
import Login from './components/Login';
import Chat from './components/Chat';

const App: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [username, setUsername] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Basic Socket.io Chat</h1>
          <div className="text-sm text-gray-600">
            {userCount} user{userCount !== 1 ? 's' : ''} online
          </div>
        </div>
        {
          username ? (
            <Chat setUserCount={setUserCount} username={username} />
          ) : (
            <Login setUsername={setUsername} />
          )
        }
      </div>
    </div>
  );
};

export default App; 