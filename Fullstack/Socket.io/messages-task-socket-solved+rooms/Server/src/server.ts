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
  roomName?: string;
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
// Minimal room tracking for UI: set of active room names and socket->room map
const activeRooms = new Set<string>();
const socketToRoom = new Map<string, string | null>();

io.on('connection', (socket: Socket) => {
  console.log(`User ${socket.id} connected to basic server`);

  console.log(socket.handshake.auth.username);
  
  // Add user to list
  userArray.push({
    id: socket.id,
    username: socket.handshake.auth.username
  });
  // Initialize room mapping and send current rooms list
  socketToRoom.set(socket.id, null);
  socket.emit('rooms', Array.from(activeRooms));
  console.log("Connected users:", userArray);
  // Emit full users list to all clients
  io.emit('users', userArray);
  
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
  socket.on('message', (data: { text: string; userId: string; roomName?: string }) => {
    if (data.text && data.text.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        text: data.text.trim(),
        userId: data.userId,
        username: userArray.find(user => user.id === data.userId)?.username || 'Anonymous',
        timestamp: new Date(),
        roomName: (data.roomName || '').trim() || undefined
      };
      
      console.log(`Message from ${message.userId}: ${message.text}`);
      
      // If room provided, emit to that room; otherwise broadcast to all
      if (data.roomName && data.roomName.trim()) {
        io.to(data.roomName.trim()).emit('message', message);
      } else {
        io.emit('message', message);
      }
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
      socket.emit('privateMessage', payload);
    } catch (err) {
      console.error('privateMessage error', err);
      socket.emit('error', { code: 'GENERIC_ERROR', message: 'Something went wrong' });
    }
  });


  interface TypingProps {
    username: string  
  }

  socket.on('typing', ({ username, roomName }: TypingProps & { roomName?: string }) => {
    const targetRoom = (roomName || '').trim();
    if (targetRoom) {
      socket.to(targetRoom).emit('typing', { username });
    } else {
      socket.broadcast.emit('typing', { username });
    }
  })

  socket.on('stopTyping', ({ roomName }: { roomName?: string } = {}) => {
    const targetRoom = (roomName || '').trim();
    if (targetRoom) {
      socket.to(targetRoom).emit('stopTyping');
    } else {
      socket.broadcast.emit('stopTyping');
    }
  })

  // Minimal rooms support: client requests to join a room by name
  socket.on('joinRoom', ({ roomName }: { roomName: string }) => {
    try {
      const target = (roomName || '').trim();
      // Leave all rooms except the socket's own room, and cleanup empty rooms
      const previouslyJoined: string[] = [];
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          previouslyJoined.push(room);
          socket.leave(room);
        }
      }
      // After leaving, remove empty rooms from active set
      for (const prev of previouslyJoined) {
        const size = io.sockets.adapter.rooms.get(prev)?.size || 0;
        if (size === 0) {
          activeRooms.delete(prev);
        }
      }
      if (target) {
        socket.join(target);
        activeRooms.add(target);
        socketToRoom.set(socket.id, target);
      } else {
        socketToRoom.set(socket.id, null);
      }

      // Inform the requester which room they are in now
      socket.emit('joinedRoom', target);

      // Broadcast active rooms list to everyone when it changes
      io.emit('rooms', Array.from(activeRooms));

      // Optional: notify the room that someone joined (as a system message)
      if (target) {
        const username = userArray.find(u => u.id === socket.id)?.username || 'Someone';
        io.to(target).emit('message', {
          id: Date.now().toString(),
          text: `${username} joined the room` ,
          userId: 'system',
          username: 'System',
          timestamp: new Date()
        } as ChatMessage);
      }
    } catch (err) {
      console.error('joinRoom error', err);
      socket.emit('error', { code: 'JOIN_ROOM_ERROR', message: 'Could not join room' });
    }
  });

  // Optional: respond with current rooms list snapshot
  socket.on('getRooms', () => {
    socket.emit('rooms', Array.from(activeRooms));
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from basic server`);

    // Remove user from list
    userArray = userArray.filter(user => user.id !== socket.id);
    console.log(`Remaining connected users: ${userArray.length}`);

    // Handle potential room cleanup
    const prev = socketToRoom.get(socket.id) || null;
    socketToRoom.delete(socket.id);
    if (prev) {
      const size = io.sockets.adapter.rooms.get(prev)?.size || 0;
      if (size === 0) {
        activeRooms.delete(prev);
        io.emit('rooms', Array.from(activeRooms));
      }
    }

    // Broadcast user left event
    console.log(`Broadcasting userLeft: ${socket.id}, new count: ${userArray.length}`);
    socket.broadcast.emit('userLeft', {
      userId: socket.id,
      userCount: userArray.length
    });
    // Emit full users list to all clients
    io.emit('users', userArray);
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Basic server running on port ${PORT}`);
  console.log(`Server supports: message, userJoined, userLeft events`);
}); 