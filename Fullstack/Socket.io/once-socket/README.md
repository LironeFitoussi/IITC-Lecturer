# Socket.io Once Events Demo

An advanced Socket.io chat application demonstrating special event handling patterns including `once` events, broadcast messaging, room management, and event listener manipulation.

## Features

- Real-time public messaging
- User ID tracking and management
- Username customization
- Private messaging between users
- **Once events** - Events that fire only once
- **Broadcast messaging** - Send to all except sender
- **Room management** - Join/leave rooms and room-specific messaging
- **Event listener manipulation** - Add/remove event handlers dynamically
- **Conditional event handling** - Conditional message broadcasting
- **Timed events** - Delayed message delivery
- **Event logging** - Real-time event tracking
- **Connection state management** - Monitor socket connection status

## Project Structure

```
once-socket/
├── Client/          # React frontend
│   ├── src/
│   │   ├── App.tsx  # Once events demo component
│   │   └── ...
└── Server/          # Express + Socket.io backend
    ├── src/
    │   └── server.ts # Once events server
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

1. **Server**: Advanced Express server with Socket.io that demonstrates various event handling patterns
2. **Client**: React app with comprehensive UI showing event logs and testing controls
3. **Communication**: Uses multiple Socket.io events for different types of messaging and event handling

## Socket Events

### Server Events
- `log`: Sends user ID to newly connected client
- `welcome`: Once event - sends welcome message only once
- `message`: Broadcasts public messages to all clients
- `userJoined`: Notifies when a new user connects
- `userLeft`: Notifies when a user disconnects
- `userCount`: Broadcasts current user count
- `usernameChanged`: Notifies when a user changes their username
- `privateMessage`: Sends private message to specific user
- `privateMessageSent`: Confirms private message was sent
- `broadcastMessage`: Broadcasts message to all except sender
- `roomMessage`: Sends message to specific room
- `roomJoined`: Confirms room join
- `roomLeft`: Confirms room leave
- `error`: Sends error messages to clients

### Client Events
- `message`: Sends public message
- `setUsername`: Updates user's display name
- `privateMessage`: Sends private message to specific user
- `testOnce`: Requests a test once event
- `testBroadcast`: Sends broadcast test message
- `joinRoom`: Joins a specific room
- `leaveRoom`: Leaves a specific room
- `roomMessage`: Sends message to specific room

## Key Features

### Once Events
- `socket.once('welcome', ...)` - Event that fires only once per connection
- Demonstrates how to handle one-time events

### Broadcast Messaging
- `socket.broadcast.emit()` - Sends to all clients except the sender
- Useful for notifications and announcements

### Room Management
- `socket.join(roomName)` - Join a room
- `socket.leave(roomName)` - Leave a room
- `socket.to(roomName).emit()` - Send message to specific room

### Event Listener Manipulation
- `socket.on('event', handler)` - Add event listener
- `socket.off('event', handler)` - Remove specific event listener
- Demonstrates dynamic event management

### Conditional Event Handling
- Conditional message broadcasting based on parameters
- Shows how to control message flow

### Timed Events
- `setTimeout()` with Socket.io events
- Demonstrates delayed message delivery

## Event Log

The application includes a real-time event log that tracks:
- User connections/disconnections
- Message events
- Room operations
- Once events
- Broadcast events
- Error events

## Testing Controls

The UI includes buttons to test various features:
- **Test Once Event**: Triggers a once event
- **Test Broadcast**: Sends a broadcast message
- **Join Test Room**: Joins a test room
- **Leave Test Room**: Leaves the test room
- **Send Room Message**: Sends a message to the current room

## Ports

- **Server**: 3001
- **Client**: 5173 (Vite default)

This demonstrates advanced Socket.io event handling patterns and best practices. 