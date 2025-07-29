# MongoDB Setup for DB Chat Server

## Prerequisites

1. **Install MongoDB** on your system:
   - **macOS**: `brew install mongodb-community`
   - **Windows**: Download from [MongoDB website](https://www.mongodb.com/try/download/community)
   - **Linux**: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB service**:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   
   # Linux
   sudo systemctl start mongod
   ```

## Database Configuration

The DB chat server is configured to connect to:
- **Database**: `chatdb`
- **Connection URL**: `mongodb://localhost:27017/chatdb`

## Running the DB Server

1. **Start MongoDB** (if not already running)
2. **Install dependencies**:
   ```bash
   cd Server
   npm install
   ```
3. **Start the DB server**:
   ```bash
   npm run dev:db
   ```

## Database Collections

The application creates the following collections:

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  password: String (hashed),
  email: String (unique),
  createdAt: Date
}
```

### Rooms Collection
```javascript
{
  _id: ObjectId,
  name: String (unique),
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
  messageType: String (enum: ['text', 'system']),
  createdAt: Date
}
```

## Features

- **JWT Authentication**: Secure user registration and login
- **Password Hashing**: Passwords are hashed using bcrypt
- **Persistent Rooms**: Rooms persist between server restarts
- **Message History**: All messages are stored in the database
- **User Management**: Full user account system

## Security Notes

- Change the `JWT_SECRET` in production
- Use environment variables for sensitive data
- Consider adding rate limiting for API endpoints
- Implement proper CORS configuration for production 