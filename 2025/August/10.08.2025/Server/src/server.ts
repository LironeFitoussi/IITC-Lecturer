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

// Store connected users count
let userArray: { id: string; username: string }[] = [];

io.on('connection', (socket: Socket) => {
  console.log(`User ${socket.id} connected to basic server`);

  console.log(socket.handshake.auth.username);
  
  // Increment user count
  userArray.push({
    id: socket.id,
    username: socket.handshake.auth.username
  });
  console.log("Connected users:", userArray);
  
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
  
  // Handle incoming messages
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


  interface TypingProps {
    username: string  
  }

  socket.on('typing', ({ username }: TypingProps) => {
    socket.broadcast.emit('typing',{ username});
  })

  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping');
  })

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from basic server`);

    // Decrement user count
    userArray = userArray.filter(user => user.id !== socket.id);
    console.log(`Remaining connected users: ${userArray.length}`);

    // Broadcast user left event
    console.log(`Broadcasting userLeft: ${socket.id}, new count: ${userArray.length}`);
    socket.broadcast.emit('userLeft', {
      userId: socket.id,
      userCount: userArray.length
    });
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Basic server running on port ${PORT}`);
  console.log(`Server supports: message, userJoined, userLeft events`);
}); 