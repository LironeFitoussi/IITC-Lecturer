import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const PORT = 3000
const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: "Basic Chat Server On"
    })
});

io.on('connection', (socket) => {
    console.log(`User: ${socket.id} connected to our server`);  

    socket.on('message', (message: string, socketId: string) => {
        console.log(`Message: ${message} | From: ${socketId}`);
        io.emit('message', message)
    })
})

httpServer.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`);
})
