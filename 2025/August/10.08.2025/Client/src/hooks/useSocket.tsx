import { io, Socket } from 'socket.io-client';
import { useRef, useEffect } from 'react';

const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io('http://localhost:3001');

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    return socketRef.current;
};

export default useSocket;