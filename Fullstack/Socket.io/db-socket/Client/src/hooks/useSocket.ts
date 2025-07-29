import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !socketRef.current) {
      const socket = io('http://localhost:3001', {
        withCredentials: true
      });
      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('Connected to server');
        socket.emit('authenticate');
      });

      socket.on('authenticated', (userData: any) => {
        console.log('Authenticated:', userData);
      });

      socket.on('authError', (error: string) => {
        console.error('Authentication error:', error);
        logout();
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      return () => {
        socket.close();
        socketRef.current = null;
      };
    }

    if (!isAuthenticated && socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  }, [isAuthenticated, logout]);

  return socketRef.current;
}; 