# Socket.io Rooms Chat

A comprehensive Socket.io chat application demonstrating advanced room management, global chat, room-specific messaging, and user tracking.

## Features

- **Global Chat** - Public messaging for all connected users
- **Room Management** - Create, join, and leave chat rooms
- **Room-Specific Messaging** - Messages are isolated to specific rooms
- **User Management** - Track connected users and usernames
- **Private Messaging** - Send private messages to specific users
- **Real-time Updates** - Live user count, room updates, and message delivery
- **Room History** - View message history when joining rooms
- **Auto Room Cleanup** - Empty rooms are automatically deleted
- **User Presence** - See who's in each room in real-time

## Project Structure

```
rooms-socket/
├── Client/          # React frontend
│   ├── src/
│   │   ├── App.tsx  # Rooms chat component
│   │   └── ...
└── Server/          # Express + Socket.io backend
    ├── src/
    │   └── server.ts # Rooms chat server
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

1. **Server**: Advanced Express server with Socket.io that manages rooms, users, and message routing
2. **Client**: React app with comprehensive UI for room management and messaging
3. **Communication**: Uses multiple Socket.io events for different types of messaging and room operations

## Socket Events

### Server Events
- `log`: Sends user ID to newly connected client
- `globalMessage`: Broadcasts messages to all connected users
- `userJoined`: Notifies when a new user connects
- `userLeft`: Notifies when a user disconnects
- `userCount`: Broadcasts current user count
- `usernameChanged`: Notifies when a user changes their username
- `roomCreated`: Notifies when a new room is created
- `roomJoined`: Confirms room join and sends room info
- `roomLeft`: Confirms room leave
- `roomMessage`: Sends message to specific room
- `roomHistory`: Sends room message history
- `userJoinedRoom`: Notifies when user joins a room
- `userLeftRoom`: Notifies when user leaves a room
- `roomDeleted`: Notifies when a room is deleted
- `privateMessage`: Sends private message to specific user
- `privateMessageSent`: Confirms private message was sent
- `error`: Sends error messages to clients

### Client Events
- `globalMessage`: Sends message to global chat
- `setUsername`: Updates user's display name
- `createRoom`: Creates a new chat room
- `joinRoom`: Joins an existing room
- `leaveRoom`: Leaves current room
- `roomMessage`: Sends message to specific room
- `privateMessage`: Sends private message to specific user

## Key Features

### Room Management
- **Create Rooms**: Users can create new chat rooms with custom names
- **Join Rooms**: Users can join existing rooms
- **Leave Rooms**: Users can leave rooms and return to global chat
- **Room Isolation**: Messages in rooms are only visible to room members
- **Auto Cleanup**: Empty rooms are automatically deleted

### Global vs Room Chat
- **Global Chat**: All connected users can see and participate
- **Room Chat**: Only room members can see and participate
- **Seamless Switching**: Users can switch between global and room chats

### User Management
- **User Tracking**: Server tracks all connected users
- **Username System**: Users can set custom display names
- **User Presence**: Shows which users are in each room
- **Real-time Updates**: User lists update automatically

### Message Types
- **Global Messages**: Visible to all users
- **Room Messages**: Visible only to room members
- **Private Messages**: Direct messages between two users

## UI Features

- **Connected Users Panel**: Shows all online users
- **Rooms Panel**: Lists available rooms with user counts
- **Room Creation**: Form to create new rooms
- **Chat Area**: Displays messages for current room/global chat
- **User Management**: Set username functionality
- **Private Messaging**: Select users and send private messages
- **Room Navigation**: Easy switching between rooms and global chat

## Room Lifecycle

1. **Creation**: User creates room → Room added to server → All users notified
2. **Joining**: User joins room → Added to room users → Room history sent
3. **Messaging**: Messages sent to room → Only room members receive
4. **Leaving**: User leaves room → Removed from room users
5. **Cleanup**: If room becomes empty → Room automatically deleted

## Ports

- **Server**: 3001
- **Client**: 5173 (Vite default)

This demonstrates comprehensive Socket.io room management and real-time chat functionality. 