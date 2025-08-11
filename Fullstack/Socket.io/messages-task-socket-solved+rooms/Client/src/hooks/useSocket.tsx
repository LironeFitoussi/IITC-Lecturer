import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import type { PrivateMessage, ServerError, User } from '../types/chat';

interface Props {
  username: string;
  onUsers?: (users: User[]) => void;
  onPrivateMessage?: (payload: PrivateMessage) => void;
  onError?: (error: ServerError) => void;
}

const useSocket = ({ username, onUsers, onPrivateMessage, onError }: Props) => {
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

    // Wire server-driven events to optional callbacks
    if (typeof onUsers === 'function') {
      instance.on('users', onUsers);
    }
    if (typeof onPrivateMessage === 'function') {
      instance.on('privateMessage', onPrivateMessage);
    }
    if (typeof onError === 'function') {
      instance.on('error', onError);
    }

    return () => {
      if (typeof onUsers === 'function') instance.off('users', onUsers);
      if (typeof onPrivateMessage === 'function') instance.off('privateMessage', onPrivateMessage);
      if (typeof onError === 'function') instance.off('error', onError);
      instance.disconnect();
      setSocket(null);
    };
  }, [username, onUsers, onPrivateMessage, onError]);

  return socket;
};

export default useSocket;