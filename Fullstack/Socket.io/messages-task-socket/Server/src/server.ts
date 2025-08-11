import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  timestamp: Date;
  username: string;
}

type User = { id: string; username: string };

type PrivateMessage = {
  id: string;
  text: string;
  fromUserId: string;
  toUserId: string;
  username: string; // sender username (authoritative)
  timestamp: string; // ISO
};

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
  res.json({ message: 'Basic Chat Server Running!' });
});

// Store connected users (authoritative in-memory list)
let userArray: User[] = [];
let rooms: string[] = []

interface TypingProps {
  username: string  
}

io.on('connection', (socket: Socket) => {
  console.log(`User ${socket.id} connected to basic server`);

  console.log(socket.handshake.auth.username);
  
  // Add user to list
  userArray.push({
    id: socket.id,
    username: socket.handshake.auth.username
  });

  console.log("Connected users:", userArray);

  // Emit full users list to all clients
  io.emit('users', userArray);
  socket.emit('roomsMap', rooms)

  // Broadcast user joined event to all OTHER users
  console.log(`Broadcasting userJoined to others: ${socket.id}, count: ${userArray.length}`);
  socket.broadcast.emit('userJoined', { 
    userId: socket.id,  
    username: socket.handshake.auth.username,
    userCount: userArray.length
  });
  
  // Send current user count to the new user
  console.log(`Sending userCount ${userArray.length} to ${socket.id}`);
  socket.emit('userCount', userArray.length);
  
  // Handle incoming public messages
  socket.on('message', (data: { text: string; userId: string }) => {
    if (data.text && data.text.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        text: data.text.trim(),
        userId: data.userId,
        username: userArray.find(user => user.id === data.userId)?.username || 'Anonymous',
        timestamp: new Date()
      };
      
      console.log(`Message from ${message.userId}: ${message.text}`);
      
      // Broadcast message to all clients
      io.emit('message', message);
    }
  });

  // Private messages: validate and forward only to recipient (and echo to sender)
  socket.on('privateMessage', ({ toUserId, text }: { toUserId: string; text: string }) => {
    try {
      const trimmed = (text ?? '').trim();
      if (!trimmed) {
        socket.emit('error', { code: 'DM_EMPTY_TEXT', message: 'Empty messages are not allowed' });
        return;
      }
      if (toUserId === socket.id) {
        socket.emit('error', { code: 'DM_SELF_TARGET', message: 'Cannot send a private message to yourself' });
        return;
      }
      const recipient = userArray.find(u => u.id === toUserId);
      if (!recipient) {
        socket.emit('error', { code: 'DM_TARGET_OFFLINE', message: 'Recipient is offline' });
        return;
      }
      const sender = userArray.find(u => u.id === socket.id);
      const payload: PrivateMessage = {
        id: Date.now().toString(),
        text: trimmed,
        fromUserId: socket.id,
        toUserId,
        username: sender?.username || 'Unknown',
        timestamp: new Date().toISOString()
      };
      io.to(toUserId).emit('privateMessage', payload);
      // socket.emit('privateMessage', payload);
    } catch (err) {
      console.error('privateMessage error', err);
      socket.emit('error', { code: 'GENERIC_ERROR', message: 'Something went wrong' });
    }
  });

  // Typing events
  socket.on('typing', ({ username }: TypingProps) => {
    socket.broadcast.emit('typing',{ username});
  })

  // Stop typing events
  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping');
  })

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from basic server`);

    // Remove user from list
    userArray = userArray.filter(user => user.id !== socket.id);
    console.log(`Remaining connected users: ${userArray.length}`);

    // Broadcast user left event
    console.log(`Broadcasting userLeft: ${socket.id}, new count: ${userArray.length}`);
    socket.broadcast.emit('userLeft', {
      userId: socket.id,
      userCount: userArray.length
    });
    // Emit full users list to all clients
    io.emit('users', userArray);
  });

  // Join Room
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    // console.log(`====${socket.id} joined room: ${roomName}====`);

    if (!rooms.includes(roomName)) {
      rooms.push(roomName)
    }
    // Notify others in the room
    socket.to(roomName).emit("message", `${socket.id} joined the room.`);
    io.emit('roomsMap', rooms)
  });

  // Leave a room
  socket.on("leaveRoom", (roomName) => {
    socket.leave(roomName);
    console.log(`${socket.id} left room: ${roomName}`);
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Basic server running on port ${PORT}`);
  console.log(`Server supports: message, userJoined, userLeft events`);
}); 