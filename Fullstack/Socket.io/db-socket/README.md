# Socket.io DB Chat with JWT & MongoDB

A full-stack Socket.io chat application with JWT authentication, MongoDB persistence, and comprehensive room management.

## Features

- **JWT Authentication** - Secure user registration and login
- **MongoDB Persistence** - Rooms and messages stored in database
- **HTTP-Only Cookies** - Secure token management
- **Room Management** - Create, join, and leave persistent rooms
- **Real-time Messaging** - Socket.io for instant message delivery
- **User Management** - Track connected users and user profiles
- **Private Messaging** - Direct messages between users
- **Room History** - Persistent message history for all rooms
- **Auto Room Cleanup** - Empty rooms are automatically deleted
- **React Context API** - Global authentication state management
- **Axios Integration** - HTTP requests with automatic cookie handling

## Project Structure

```
db-socket/
├── Client/          # React frontend
│   ├── src/
│   │   ├── App.tsx  # Main DB chat component
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx # JWT auth context
│   │   ├── services/
│   │   │   └── authService.ts  # API service layer
│   │   └── hooks/
│   │       └── useSocket.ts    # Socket.io hook
│   └── ...
└── Server/          # Express + Socket.io + MongoDB backend
    ├── src/
    │   └── server.ts # DB chat server
    └── ...
```

## Quick Start

### Prerequisites
- MongoDB installed and running on `mongodb://localhost:27017`
- Node.js and npm

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

1. **Server**: Express server with Socket.io, MongoDB integration, and JWT authentication
2. **Client**: React app with authentication context, API services, and Socket.io integration
3. **Database**: MongoDB stores users, rooms, and messages persistently
4. **Authentication**: JWT tokens stored in HTTP-only cookies for security

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}
```

### Rooms Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  createdBy: ObjectId (ref: User),
  users: [ObjectId] (ref: User),
  isPrivate: Boolean,
  createdAt: Date
}
```

### Messages Collection
```javascript
{
  _id: ObjectId,
  content: String,
  sender: ObjectId (ref: User),
  room: ObjectId (ref: Room),
  messageType: String,
  createdAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/validate` - Validate JWT token

### Rooms
- `GET /api/rooms` - Get all public rooms
- `GET /api/user/rooms` - Get user's joined rooms

### Messages
- `GET /api/rooms/:roomId/messages` - Get room message history

## Socket Events

### Authentication
- `authenticate` - Authenticate socket connection with JWT
- `authenticated` - Confirm successful authentication
- `authError` - Authentication error

### Room Management
- `createRoom` - Create new room
- `roomCreated` - Confirm room creation
- `joinRoom` - Join existing room
- `roomJoined` - Confirm room join
- `leaveRoom` - Leave room
- `roomLeft` - Confirm room leave
- `roomDeleted` - Room deleted (empty)

### Messaging
- `roomMessage` - Send message to room
- `privateMessage` - Send private message
- `userJoined` - User joined chat
- `userLeft` - User left chat

## Security Features

### JWT Authentication
- Tokens stored in HTTP-only cookies
- Automatic token validation on page refresh
- Secure token transmission

### Password Security
- bcrypt password hashing
- Secure password storage

### CORS Configuration
- Proper CORS setup with credentials
- Origin validation

## Key Components

### AuthContext
- Global authentication state management
- Automatic token validation
- Persistent login sessions

### AuthService
- Centralized API calls
- Axios with automatic cookie handling
- Error handling

### useSocket Hook
- Socket.io connection management
- Automatic authentication
- Event handling

## Authentication Flow

1. **Registration**: User registers → Password hashed → JWT created → Cookie set
2. **Login**: User logs in → Credentials verified → JWT created → Cookie set
3. **Socket Connection**: Socket connects → JWT from cookie → User authenticated
4. **Persistence**: Token validated on page refresh → User stays logged in

## Room Management

1. **Creation**: User creates room → Stored in MongoDB → All users notified
2. **Joining**: User joins room → Added to room users → Room history loaded
3. **Messaging**: Messages sent → Stored in MongoDB → Real-time delivery
4. **Leaving**: User leaves room → Removed from room users
5. **Cleanup**: Empty rooms → Automatically deleted from database

## Ports

- **Server**: 3001
- **Client**: 5173 (Vite default)
- **MongoDB**: 27017

## Environment Setup

### MongoDB
```bash
# Start MongoDB service
mongod

# Or using Homebrew (macOS)
brew services start mongodb-community
```

### Environment Variables
```bash
# Server environment
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=mongodb://localhost:27017/chatdb
```

This demonstrates a complete full-stack Socket.io application with authentication, persistence, and real-time features. 