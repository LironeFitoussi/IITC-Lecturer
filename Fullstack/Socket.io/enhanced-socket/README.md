# Enhanced Socket.io Chat

An advanced Socket.io chat application demonstrating user management, private messaging, and enhanced real-time features.

## Features

- Real-time public messaging
- User ID tracking and management
- Username customization
- Private messaging between users
- Connected users list with real-time updates
- User count tracking
- Enhanced UI with user information display

## Project Structure

```
enhanced-socket/
├── Client/          # React frontend
│   ├── src/
│   │   ├── App.tsx  # Enhanced chat component
│   │   └── ...
└── Server/          # Express + Socket.io backend
    ├── src/
    │   └── server.ts # Enhanced chat server
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

1. **Server**: Enhanced Express server with Socket.io that tracks connected users, manages usernames, and handles private messaging
2. **Client**: React app with advanced UI showing connected users, public/private message areas, and username management
3. **Communication**: Uses multiple Socket.io events for different types of messaging

## Socket Events

### Server Events
- `log`: Sends user ID to newly connected client
- `message`: Broadcasts public messages to all clients
- `userJoined`: Notifies when a new user connects
- `userLeft`: Notifies when a user disconnects
- `userCount`: Broadcasts current user count
- `usernameChanged`: Notifies when a user changes their username
- `privateMessage`: Sends private message to specific user
- `privateMessageSent`: Confirms private message was sent
- `error`: Sends error messages to clients

### Client Events
- `message`: Sends public message
- `setUsername`: Updates user's display name
- `privateMessage`: Sends private message to specific user

## Key Features

- **User Management**: Each connection gets a unique ID and can set a custom username
- **Private Messaging**: Users can send private messages to specific users
- **Real-time Updates**: User list and count update automatically
- **Enhanced UI**: Separate sections for public messages, private messages, and user management

## Ports

- **Server**: 3001
- **Client**: 5173 (Vite default)

This demonstrates advanced Socket.io features beyond basic messaging. 