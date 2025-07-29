import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Once Chat Server Running!' });
});

const connectedUsers = new Map<string, { id: string, username?: string }>();

io.on('connection', (socket: any) => {
  console.log(`User ${socket.id} connected to once server`);
  
  connectedUsers.set(socket.id, { id: socket.id });
  
  socket.emit('log', socket.id);
  
  // שליחה לכולם חוץ מהשולח - broadcast example
  socket.broadcast.emit('userJoined', socket.id);
  
  console.log(`Current connected users: ${connectedUsers.size}`);
  io.emit('userCount', connectedUsers.size);

  socket.emit('welcome', `Welcome to the Once Chat Server! Your ID is ${socket.id}`);

  // Example of event listener with handler function
  const messageHandler = (message: string, userId: string) => {
    console.log(`Message from ${userId}: ${message}`);
    io.emit('message', message, userId);
  };

  // Add event listener
  socket.on('message', messageHandler);

  // Example of removing event listener
  socket.on('removeMessageHandler', () => {
    console.log(`Removing message handler for user ${socket.id}`);
    socket.off('message', messageHandler);
    socket.emit('handlerRemoved', 'Message handler removed successfully');
  });

  // Example of conditional event handling
  socket.on('conditionalMessage', (message: string, userId: string, shouldBroadcast: boolean) => {
    console.log(`Conditional message from ${userId}: ${message}`);
    if (shouldBroadcast) {
      io.emit('message', message, userId);
    } else {
      socket.emit('message', message, userId);
    }
  });

  // Example of event with timeout
  socket.on('timedMessage', (message: string, userId: string) => {
    console.log(`Timed message from ${userId}: ${message}`);
    setTimeout(() => {
      io.emit('message', `[DELAYED] ${message}`, userId);
    }, 2000);
  });

  // Test once event
  socket.on('testOnce', () => {
    console.log(`Test once event requested by ${socket.id}`);
    socket.emit('welcome', `This is a test once event for ${socket.id}`);
  });

  // Test broadcast event
  socket.on('testBroadcast', (message: string, senderId: string) => {
    console.log(`Broadcast test from ${senderId}: ${message}`);
    socket.broadcast.emit('broadcastMessage', message, senderId);
  });

  // Room management
  socket.on('joinRoom', (roomName: string) => {
    socket.join(roomName);
    console.log(`User ${socket.id} joined room ${roomName}`);
    socket.emit('roomJoined', roomName);
  });

  socket.on('leaveRoom', (roomName: string) => {
    socket.leave(roomName);
    console.log(`User ${socket.id} left room ${roomName}`);
    socket.emit('roomLeft', roomName);
  });

  socket.on('roomMessage', (roomName: string, message: string, userId: string) => {
    console.log(`Room message in ${roomName} from ${userId}: ${message}`);
    socket.to(roomName).emit('roomMessage', roomName, message, userId);
  });

  socket.on('setUsername', (username: string) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.username = username;
      connectedUsers.set(socket.id, user);
      io.emit('usernameChanged', socket.id, username);
    }
  });



  socket.on('privateMessage', (targetUserId: string, message: string) => {
    const targetSocket = io.sockets.sockets.get(targetUserId);
    if (targetSocket) {
      targetSocket.emit('privateMessage', socket.id, message);
      socket.emit('privateMessageSent', targetUserId, message);
    } else {
      socket.emit('error', 'User not found');
    }
  });

  // Example of error handling
  socket.on('error', (error: any) => {
    console.error(`Socket error for ${socket.id}:`, error);
    socket.emit('error', 'An error occurred on the server');
  });

  // Example of connection state
  socket.on('getConnectionState', () => {
    const state = {
      id: socket.id,
      connected: socket.connected,
      rooms: Array.from(socket.rooms),
      timestamp: new Date().toISOString()
    };
    socket.emit('connectionState', state);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from once server`);
    
    connectedUsers.delete(socket.id);
    
    socket.broadcast.emit('userLeft', socket.id);
    
    console.log(`Current connected users after disconnect: ${connectedUsers.size}`);
    io.emit('userCount', connectedUsers.size);
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Once server running on port ${PORT}`);
}); 