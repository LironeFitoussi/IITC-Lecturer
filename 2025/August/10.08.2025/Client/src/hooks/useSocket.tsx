import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

interface Props {
  username: string;
}

const useSocket = ({ username }: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const instance = io('http://localhost:3001', {
      auth: {
        username: username
      }
    });
    setSocket(instance);

    instance.on('connect', () => {
      console.log('Connected to server');
    });

    instance.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    instance.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      instance.disconnect();
      setSocket(null);
    };
  }, []);

  return socket;
};

export default useSocket;