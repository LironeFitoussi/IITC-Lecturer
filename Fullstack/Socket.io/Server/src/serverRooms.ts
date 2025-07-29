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

const connectedUsers = new Map<string, { id: string, username?: string, rooms: string[] }>();
const rooms = new Map<string, { name: string, users: string[], messages: any[] }>();

io.on('connection', (socket: any) => {
  console.log(`User ${socket.id} connected to rooms server`);
  
  connectedUsers.set(socket.id, { id: socket.id, rooms: [] });
  
  socket.emit('log', socket.id);
  
  socket.broadcast.emit('userJoined', socket.id);
  
  console.log(`Current connected users: ${connectedUsers.size}`);
  io.emit('userCount', connectedUsers.size);

  socket.emit('welcome', `Welcome to the Rooms Chat Server! Your ID is ${socket.id}`);

  // Get all available rooms
  socket.on('getRooms', () => {
    const roomList = Array.from(rooms.values()).map(room => ({
      name: room.name,
      userCount: room.users.length,
      lastMessage: room.messages[room.messages.length - 1] || null
    }));
    socket.emit('roomList', roomList);
  });

  // Create a new room
  socket.on('createRoom', (roomName: string) => {
    if (rooms.has(roomName)) {
      socket.emit('error', `Room '${roomName}' already exists`);
      return;
    }

    rooms.set(roomName, {
      name: roomName,
      users: [socket.id],
      messages: []
    });

    socket.join(roomName);
    
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.rooms.push(roomName);
      connectedUsers.set(socket.id, user);
    }

    console.log(`Room '${roomName}' created by ${socket.id}`);
    io.emit('roomCreated', roomName, socket.id);
    socket.emit('roomJoined', roomName);
  });

  // Join a room
  socket.on('joinRoom', (roomName: string) => {
    const room = rooms.get(roomName);
    if (!room) {
      socket.emit('error', `Room '${roomName}' does not exist`);
      return;
    }

    if (room.users.includes(socket.id)) {
      socket.emit('error', `You are already in room '${roomName}'`);
      return;
    }

    socket.join(roomName);
    room.users.push(socket.id);
    
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.rooms.push(roomName);
      connectedUsers.set(socket.id, user);
    }

    console.log(`User ${socket.id} joined room: ${roomName}`);
    socket.emit('roomJoined', roomName);
    socket.to(roomName).emit('userJoinedRoom', socket.id, roomName);
    
    // Send room history
    socket.emit('roomHistory', roomName, room.messages);
  });

  // Leave a room
  socket.on('leaveRoom', (roomName: string) => {
    const room = rooms.get(roomName);
    if (!room) {
      socket.emit('error', `Room '${roomName}' does not exist`);
      return;
    }

    socket.leave(roomName);
    room.users = room.users.filter(id => id !== socket.id);
    
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.rooms = user.rooms.filter(r => r !== roomName);
      connectedUsers.set(socket.id, user);
    }

    console.log(`User ${socket.id} left room: ${roomName}`);
    socket.emit('roomLeft', roomName);
    socket.to(roomName).emit('userLeftRoom', socket.id, roomName);

    // Delete room if empty
    if (room.users.length === 0) {
      rooms.delete(roomName);
      console.log(`Room '${roomName}' deleted (empty)`);
      io.emit('roomDeleted', roomName);
    }
  });

  // Send message to a specific room
  socket.on('roomMessage', (roomName: string, message: string, userId: string) => {
    const room = rooms.get(roomName);
    if (!room) {
      socket.emit('error', `Room '${roomName}' does not exist`);
      return;
    }

    if (!room.users.includes(socket.id)) {
      socket.emit('error', `You are not in room '${roomName}'`);
      return;
    }

    const messageData = {
      content: message,
      userId: userId,
      roomName: roomName,
      timestamp: new Date().toISOString()
    };

    room.messages.push(messageData);
    console.log(`Room message in ${roomName} from ${userId}: ${message}`);
    
    socket.to(roomName).emit('roomMessage', messageData);
    socket.emit('roomMessage', messageData); // Also send to sender
  });

  // Get user's rooms
  socket.on('getMyRooms', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.emit('myRooms', user.rooms);
    }
  });

  // Set username
  socket.on('setUsername', (username: string) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.username = username;
      connectedUsers.set(socket.id, user);
      io.emit('usernameChanged', socket.id, username);
    }
  });

  // Private message (outside of rooms)
  socket.on('privateMessage', (targetUserId: string, message: string) => {
    const targetSocket = io.sockets.sockets.get(targetUserId);
    if (targetSocket) {
      targetSocket.emit('privateMessage', socket.id, message);
      socket.emit('privateMessageSent', targetUserId, message);
    } else {
      socket.emit('error', 'User not found');
    }
  });

  // Global message (to all users)
  socket.on('globalMessage', (message: string, userId: string) => {
    console.log(`Global message from ${userId}: ${message}`);
    io.emit('globalMessage', message, userId);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from rooms server`);
    
    // Remove user from all rooms
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.rooms.forEach(roomName => {
        const room = rooms.get(roomName);
        if (room) {
          room.users = room.users.filter(id => id !== socket.id);
          socket.to(roomName).emit('userLeftRoom', socket.id, roomName);
          
          // Delete room if empty
          if (room.users.length === 0) {
            rooms.delete(roomName);
            console.log(`Room '${roomName}' deleted (empty)`);
            io.emit('roomDeleted', roomName);
          }
        }
      });
    }
    
    connectedUsers.delete(socket.id);
    socket.broadcast.emit('userLeft', socket.id);
    
    console.log(`Current connected users after disconnect: ${connectedUsers.size}`);
    io.emit('userCount', connectedUsers.size);
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Rooms server running on port ${PORT}`);
}); 