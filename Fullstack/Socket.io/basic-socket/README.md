# Basic Socket.io Chat

A simple Socket.io chat application demonstrating basic real-time messaging functionality.

## Features

- Real-time public messaging
- Simple user interface
- Socket.io connection management
- Basic message broadcasting

## Project Structure

```
basic-socket/
├── Client/          # React frontend
│   ├── src/
│   │   ├── App.tsx  # Main chat component
│   │   └── ...
└── Server/          # Express + Socket.io backend
    ├── src/
    │   └── server.ts # Basic chat server
    └── ...
```

## Quick Start

### Server
```bash
cd Server
npm install
npm run dev
```

### Client
```bash
cd Client
npm install
npm run dev
```

## How it Works

1. **Server**: Simple Express server with Socket.io that broadcasts all messages to all connected clients
2. **Client**: React app that connects to the server and displays messages in real-time
3. **Communication**: Uses Socket.io events (`message`) for real-time messaging

## Socket Events

- `message`: Broadcasts a message to all connected clients
- `connection`: Handles new client connections
- `disconnect`: Handles client disconnections

## Ports

- **Server**: 3001
- **Client**: 5173 (Vite default)

This is the foundation for more advanced Socket.io features demonstrated in other variations. 