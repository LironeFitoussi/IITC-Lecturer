import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chatdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// JWT Secret
const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

// Database Schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPrivate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  messageType: { type: String, enum: ['text', 'system'], default: 'text' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Room = mongoose.model('Room', roomSchema);
const Message = mongoose.model('Message', messageSchema);

// Authentication middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// API Routes
app.get('/', (req, res) => {
  res.json({ message: 'DB Chat Server Running!' });
});

// Register user
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({
      username,
      password: hashedPassword,
      email
    });
    
    await user.save();
    
    // Generate JWT
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET);
    
    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    
    res.status(201).json({ user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET);
    
    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    
    res.json({ user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get rooms (protected)
app.get('/api/rooms', authenticateToken, async (req, res) => {
  try {
    const rooms = await Room.find({ isPrivate: false }).populate('createdBy', 'username');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's rooms (protected)
app.get('/api/user/rooms', authenticateToken, async (req: any, res) => {
  try {
    const rooms = await Room.find({ users: req.user.userId }).populate('createdBy', 'username');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get room messages (protected)
app.get('/api/rooms/:roomId/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .populate('sender', 'username')
      .sort({ createdAt: 1 })
      .limit(100);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Validate token (protected)
app.get('/api/validate', authenticateToken, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout user
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Socket.io connection handling
const connectedUsers = new Map<string, { userId: string, username: string, socketId: string }>();

io.on('connection', (socket: any) => {
  console.log(`User connected: ${socket.id}`);

  // Authenticate socket connection
  socket.on('authenticate', async () => {
    try {
      // Get token from cookies
      const cookies = socket.request.headers.cookie;
      if (!cookies) {
        socket.emit('authError', 'No authentication cookie');
        return;
      }

      const tokenMatch = cookies.match(/token=([^;]+)/);
      if (!tokenMatch) {
        socket.emit('authError', 'No token found in cookies');
        return;
      }

      const token = tokenMatch[1];
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        socket.emit('authError', 'User not found');
        return;
      }

      // Store user info
      connectedUsers.set(socket.id, {
        userId: user._id.toString(),
        username: user.username,
        socketId: socket.id
      });

      socket.userId = user._id.toString();
      socket.username = user.username;

      console.log(`User ${user.username} authenticated`);
      socket.emit('authenticated', { userId: user._id, username: user.username });

      // Send user's rooms
      const userRooms = await Room.find({ users: user._id });
      socket.emit('userRooms', userRooms);

      // Broadcast user joined
      socket.broadcast.emit('userJoined', { userId: user._id, username: user.username });
    } catch (error) {
      socket.emit('authError', 'Invalid token');
    }
  });

  // Create room
  socket.on('createRoom', async (roomData: { name: string, description?: string, isPrivate?: boolean }) => {
    try {
      if (!socket.userId) {
        socket.emit('error', 'Not authenticated');
        return;
      }

      const existingRoom = await Room.findOne({ name: roomData.name });
      if (existingRoom) {
        socket.emit('error', 'Room already exists');
        return;
      }

      const room = new Room({
        name: roomData.name,
        description: roomData.description,
        createdBy: socket.userId,
        users: [socket.userId],
        isPrivate: roomData.isPrivate || false
      });

      await room.save();
      socket.join(roomData.name);

      console.log(`Room '${roomData.name}' created by ${socket.username}`);
      io.emit('roomCreated', room);
      socket.emit('roomJoined', room);
    } catch (error) {
      socket.emit('error', 'Failed to create room');
    }
  });

  // Join room
  socket.on('joinRoom', async (roomName: string) => {
    try {
      if (!socket.userId) {
        socket.emit('error', 'Not authenticated');
        return;
      }

      const room = await Room.findOne({ name: roomName });
      if (!room) {
        socket.emit('error', 'Room not found');
        return;
      }

      if (room.users.includes(socket.userId)) {
        socket.emit('error', 'Already in room');
        return;
      }

      room.users.push(socket.userId);
      await room.save();

      socket.join(roomName);

      console.log(`User ${socket.username} joined room: ${roomName}`);
      socket.emit('roomJoined', room);
      socket.to(roomName).emit('userJoinedRoom', { userId: socket.userId, username: socket.username });

      // Send room history
      const messages = await Message.find({ room: room._id })
        .populate('sender', 'username')
        .sort({ createdAt: 1 })
        .limit(100);
      socket.emit('roomHistory', messages);
    } catch (error) {
      socket.emit('error', 'Failed to join room');
    }
  });

  // Leave room
  socket.on('leaveRoom', async (roomName: string) => {
    try {
      if (!socket.userId) {
        socket.emit('error', 'Not authenticated');
        return;
      }

      const room = await Room.findOne({ name: roomName });
      if (!room) {
        socket.emit('error', 'Room not found');
        return;
      }

      room.users = room.users.filter((userId: any) => userId.toString() !== socket.userId);
      await room.save();

      socket.leave(roomName);

      console.log(`User ${socket.username} left room: ${roomName}`);
      socket.emit('roomLeft', roomName);
      socket.to(roomName).emit('userLeftRoom', { userId: socket.userId, username: socket.username });

      // Delete room if empty
      if (room.users.length === 0) {
        await Room.findByIdAndDelete(room._id);
        console.log(`Room '${roomName}' deleted (empty)`);
        io.emit('roomDeleted', roomName);
      }
    } catch (error) {
      socket.emit('error', 'Failed to leave room');
    }
  });

  // Send room message
  socket.on('roomMessage', async (data: { roomName: string, content: string }) => {
    try {
      if (!socket.userId) {
        socket.emit('error', 'Not authenticated');
        return;
      }

      const room = await Room.findOne({ name: data.roomName });
      if (!room) {
        socket.emit('error', 'Room not found');
        return;
      }

      if (!room.users.includes(socket.userId)) {
        socket.emit('error', 'Not in room');
        return;
      }

      // Save message to database
      const message = new Message({
        content: data.content,
        sender: socket.userId,
        room: room._id
      });

      await message.save();
      await message.populate('sender', 'username');

      console.log(`Room message in ${data.roomName} from ${socket.username}: ${data.content}`);
      
      // Emit to room
      socket.to(data.roomName).emit('roomMessage', message);
      socket.emit('roomMessage', message);
    } catch (error) {
      socket.emit('error', 'Failed to send message');
    }
  });

  // Private message
  socket.on('privateMessage', async (data: { targetUserId: string, content: string }) => {
    try {
      if (!socket.userId) {
        socket.emit('error', 'Not authenticated');
        return;
      }

      const targetUser = connectedUsers.get(data.targetUserId);
      if (!targetUser) {
        socket.emit('error', 'User not found');
        return;
      }

      const targetSocket = io.sockets.sockets.get(targetUser.socketId);
      if (targetSocket) {
        targetSocket.emit('privateMessage', {
          content: data.content,
          sender: { userId: socket.userId, username: socket.username },
          timestamp: new Date()
        });
        socket.emit('privateMessageSent', { targetUserId: data.targetUserId, content: data.content });
      } else {
        socket.emit('error', 'User not online');
      }
    } catch (error) {
      socket.emit('error', 'Failed to send private message');
    }
  });

  // Get connected users
  socket.on('getConnectedUsers', () => {
    const users = Array.from(connectedUsers.values()).map(user => ({
      userId: user.userId,
      username: user.username
    }));
    socket.emit('connectedUsers', users);
  });

  socket.on('disconnect', async () => {
    console.log(`User disconnected: ${socket.id}`);
    
    const user = connectedUsers.get(socket.id);
    if (user) {
      // Remove user from all rooms
      const rooms = await Room.find({ users: user.userId });
      for (const room of rooms) {
        room.users = room.users.filter((userId: any) => userId.toString() !== user.userId);
        await room.save();
        
        socket.to(room.name).emit('userLeftRoom', { userId: user.userId, username: user.username });
        
        // Delete room if empty
        if (room.users.length === 0) {
          await Room.findByIdAndDelete(room._id);
          console.log(`Room '${room.name}' deleted (empty)`);
          io.emit('roomDeleted', room.name);
        }
      }
      
      connectedUsers.delete(socket.id);
      socket.broadcast.emit('userLeft', { userId: user.userId, username: user.username });
    }
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`DB server running on port ${PORT}`);
}); 