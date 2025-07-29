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
  res.json({ message: 'Rooms Chat Server Running!' });
});

interface User {
  id: string;
  username?: string;
  socketId: string;
}

interface Room {
  id: string;
  name: string;
  users: User[];
  messages: any[];
}

const connectedUsers = new Map<string, User>();
const rooms = new Map<string, Room>();

io.on('connection', (socket: any) => {
  console.log(`User ${socket.id} connected to rooms server`);
  
  // Add user to connected users
  connectedUsers.set(socket.id, { 
    id: socket.id, 
    socketId: socket.id 
  });
  
  socket.emit('log', socket.id);
  socket.broadcast.emit('userJoined', socket.id);
  
  console.log(`Current connected users: ${connectedUsers.size}`);
  io.emit('userCount', connectedUsers.size);

  // Global message handling
  socket.on('globalMessage', (message: string, userId: string) => {
    console.log(`Global message from ${userId}: ${message}`);
    io.emit('globalMessage', message, userId);
  });

  // Room management
  socket.on('createRoom', (roomName: string, userId: string) => {
    const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newRoom: Room = {
      id: roomId,
      name: roomName,
      users: [],
      messages: []
    };
    
    rooms.set(roomId, newRoom);
    console.log(`Room created: ${roomName} (${roomId})`);
    
    // Join the creator to the room
    socket.join(roomId);
    newRoom.users.push({ id: userId, socketId: socket.id });
    
    io.emit('roomCreated', newRoom);
    socket.emit('roomJoined', roomId, roomName);
  });

  socket.on('joinRoom', (roomId: string, userId: string) => {
    const room = rooms.get(roomId);
    if (room) {
      socket.join(roomId);
      
      // Add user to room if not already there
      if (!room.users.find(u => u.id === userId)) {
        room.users.push({ id: userId, socketId: socket.id });
      }
      
      console.log(`User ${userId} joined room ${room.name}`);
      
      socket.emit('roomJoined', roomId, room.name);
      socket.to(roomId).emit('userJoinedRoom', roomId, userId);
      
      // Send room history
      socket.emit('roomHistory', roomId, room.messages);
    } else {
      socket.emit('error', 'Room not found');
    }
  });

  socket.on('leaveRoom', (roomId: string, userId: string) => {
    const room = rooms.get(roomId);
    if (room) {
      socket.leave(roomId);
      
      // Remove user from room
      room.users = room.users.filter(u => u.id !== userId);
      
      console.log(`User ${userId} left room ${room.name}`);
      
      socket.emit('roomLeft', roomId);
      socket.to(roomId).emit('userLeftRoom', roomId, userId);
      
      // Delete room if empty
      if (room.users.length === 0) {
        rooms.delete(roomId);
        console.log(`Room ${room.name} deleted (empty)`);
        io.emit('roomDeleted', roomId);
      }
    }
  });

  socket.on('roomMessage', (roomId: string, message: string, userId: string) => {
    const room = rooms.get(roomId);
    if (room) {
      const messageObj = {
        content: message,
        userId: userId,
        timestamp: new Date(),
        room: roomId
      };
      
      room.messages.push(messageObj);
      console.log(`Room message in ${room.name} from ${userId}: ${message}`);
      
      socket.to(roomId).emit('roomMessage', roomId, message, userId);
    }
  });

  // Username management
  socket.on('setUsername', (username: string, userId: string) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.username = username;
      connectedUsers.set(socket.id, user);
      io.emit('usernameChanged', userId, username);
    }
  });

  // Private messaging
  socket.on('privateMessage', (targetUserId: string, message: string, senderId: string) => {
    const targetUser = connectedUsers.get(targetUserId);
    if (targetUser) {
      const targetSocket = io.sockets.sockets.get(targetUserId);
      if (targetSocket) {
        targetSocket.emit('privateMessage', senderId, message);
        socket.emit('privateMessageSent', targetUserId, message);
      }
    } else {
      socket.emit('error', 'User not found');
    }
  });

  // Get connected users
  socket.on('getConnectedUsers', () => {
    const users = Array.from(connectedUsers.values());
    socket.emit('connectedUsers', users);
  });

  // Get rooms
  socket.on('getRooms', () => {
    const roomsList = Array.from(rooms.values());
    socket.emit('roomsList', roomsList);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from rooms server`);
    
    // Remove user from connected users
    connectedUsers.delete(socket.id);
    
    // Remove user from all rooms
    rooms.forEach((room, roomId) => {
      room.users = room.users.filter(u => u.socketId !== socket.id);
      
      // Delete room if empty
      if (room.users.length === 0) {
        rooms.delete(roomId);
        console.log(`Room ${room.name} deleted (empty after disconnect)`);
        io.emit('roomDeleted', roomId);
      }
    });
    
    socket.broadcast.emit('userLeft', socket.id);
    
    console.log(`Current connected users after disconnect: ${connectedUsers.size}`);
    io.emit('userCount', connectedUsers.size);
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Rooms server running on port ${PORT}`);
});
