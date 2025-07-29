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
  res.json({ message: 'Basic Chat Server Running!' });
});

io.on('connection', (socket: any) => {
  console.log(`User ${socket.id} connected to basic server`);

  socket.on('message', (message: string) => {
    console.log(`Message: ${message}`);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from basic server`);
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Basic server running on port ${PORT}`);
}); 