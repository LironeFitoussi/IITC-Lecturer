import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
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
  res.json({ message: 'Enhanced Chat Server Running!' });
});

const connectedUsers = new Map<string, { id: string, username?: string }>();

io.on('connection', (socket: Socket) => {
  console.log(`User ${socket.id} connected to enhanced server`);
  
  connectedUsers.set(socket.id, { id: socket.id });
  
  socket.emit('log', socket.id);
  
  socket.broadcast.emit('userJoined', socket.id);
  
  console.log(`Current connected users: ${connectedUsers.size}`);
  io.emit('userCount', connectedUsers.size);

  socket.on('message', (message: string, userId: string) => {
    console.log(`Message from ${userId}: ${message}`);
    io.emit('message', message, userId);
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

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from enhanced server`);
    
    connectedUsers.delete(socket.id);
    
    socket.broadcast.emit('userLeft', socket.id);
    
    console.log(`Current connected users after disconnect: ${connectedUsers.size}`);
    io.emit('userCount', connectedUsers.size);
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Enhanced server running on port ${PORT}`);
});