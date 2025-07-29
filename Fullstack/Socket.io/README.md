# Socket.io Chat Applications

A comprehensive collection of Socket.io chat applications demonstrating different levels of complexity and features, from basic messaging to full-stack applications with authentication and database persistence.

## 🚀 Project Overview

This repository contains **5 separate Socket.io projects**, each focused on specific features and complexity levels. Each project is completely independent and can be run separately.

## 📁 Project Structure

```
Socket.io/
├── basic-socket/     # Simple real-time messaging
├── enhanced-socket/  # User management & private messaging
├── once-socket/      # Advanced event handling patterns
├── rooms-socket/     # Comprehensive room management
├── db-socket/        # Full-stack with JWT & MongoDB
└── README.md         # This file
```

## 🎯 Learning Progression

The projects are designed to be explored in order of increasing complexity:

### 1. **basic-socket** - Fundamentals
- **Complexity**: ⭐ Beginner
- **Features**: Basic real-time messaging
- **Learning**: Socket.io fundamentals, basic event handling
- **Tech Stack**: React + Express + Socket.io

### 2. **enhanced-socket** - User Management
- **Complexity**: ⭐⭐ Intermediate
- **Features**: User IDs, usernames, private messaging
- **Learning**: User tracking, private messaging, enhanced UI
- **Tech Stack**: React + Express + Socket.io

### 3. **once-socket** - Event Patterns
- **Complexity**: ⭐⭐⭐ Advanced
- **Features**: Once events, broadcast, room management, event logging
- **Learning**: Advanced Socket.io patterns, event manipulation
- **Tech Stack**: React + Express + Socket.io

### 4. **rooms-socket** - Room Management
- **Complexity**: ⭐⭐⭐⭐ Expert
- **Features**: Global chat, room creation/joining/leaving, room-specific messaging
- **Learning**: Complex room management, message routing
- **Tech Stack**: React + Express + Socket.io

### 5. **db-socket** - Full-Stack Application
- **Complexity**: ⭐⭐⭐⭐⭐ Expert+
- **Features**: JWT authentication, MongoDB persistence, HTTP-only cookies
- **Learning**: Full-stack development, authentication, database integration
- **Tech Stack**: React + Express + Socket.io + MongoDB + JWT

## 🛠️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for db-socket project only)

### Running Any Project

```bash
# Navigate to any project
cd [project-name]

# Start the server
cd Server
npm install
npm run dev

# In another terminal, start the client
cd Client
npm install
npm run dev
```

### Port Configuration
- **Server**: All projects run on port 3001
- **Client**: All projects run on port 5173 (Vite default)
- **MongoDB**: Port 27017 (for db-socket only)

## 📚 Project Details

### basic-socket
**Simple real-time chat with basic messaging**
- Real-time public messaging
- Simple user interface
- Socket.io connection management
- Basic message broadcasting

**Quick Start:**
```bash
cd basic-socket
# Server: cd Server && npm install && npm run dev
# Client: cd Client && npm install && npm run dev
```

### enhanced-socket
**Advanced chat with user management and private messaging**
- User ID tracking and management
- Username customization
- Private messaging between users
- Connected users list with real-time updates
- User count tracking

**Quick Start:**
```bash
cd enhanced-socket
# Server: cd Server && npm install && npm run dev
# Client: cd Client && npm install && npm run dev
```

### once-socket
**Advanced event handling patterns and testing**
- Once events (events that fire only once)
- Broadcast messaging (send to all except sender)
- Room management (join/leave rooms)
- Event listener manipulation
- Conditional event handling
- Timed events
- Real-time event logging

**Quick Start:**
```bash
cd once-socket
# Server: cd Server && npm install && npm run dev
# Client: cd Client && npm install && npm run dev
```

### rooms-socket
**Comprehensive room management system**
- Global chat for all users
- Room creation, joining, and leaving
- Room-specific messaging
- User presence in rooms
- Room history and auto-cleanup
- Private messaging
- Real-time room updates

**Quick Start:**
```bash
cd rooms-socket
# Server: cd Server && npm install && npm run dev
# Client: cd Client && npm install && npm run dev
```

### db-socket
**Full-stack application with authentication and persistence**
- JWT authentication with HTTP-only cookies
- MongoDB persistence for users, rooms, and messages
- React Context API for global state management
- Axios integration with automatic cookie handling
- Secure password hashing with bcrypt
- Persistent login sessions
- Room and message history
- Auto room cleanup

**Prerequisites:**
- MongoDB running on `mongodb://localhost:27017`

**Quick Start:**
```bash
cd db-socket
# Server: cd Server && npm install && npm run dev
# Client: cd Client && npm install && npm run dev
```

## 🔧 Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time communication

### Backend
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing
- **MongoDB** - Database (db-socket only)
- **Mongoose** - MongoDB ODM (db-socket only)
- **JWT** - Authentication (db-socket only)
- **bcrypt** - Password hashing (db-socket only)
- **cookie-parser** - Cookie handling (db-socket only)

## 🎓 Learning Objectives

### Socket.io Concepts Covered
- **Basic Events**: `connection`, `disconnect`, `message`
- **User Management**: User tracking, usernames, user lists
- **Private Messaging**: Direct user-to-user communication
- **Room Management**: Creating, joining, leaving rooms
- **Event Patterns**: Once events, broadcast, conditional handling
- **Authentication**: JWT integration with Socket.io
- **Persistence**: Database integration for messages and rooms

### React Patterns Covered
- **State Management**: useState, useRef, useEffect
- **Context API**: Global state management
- **Custom Hooks**: Socket.io integration
- **Component Architecture**: Modular, reusable components
- **Form Handling**: Controlled components
- **Real-time UI**: Live updates and user interactions

### Backend Patterns Covered
- **Express Middleware**: CORS, authentication, error handling
- **Socket.io Events**: Event handling and emission
- **Database Integration**: MongoDB with Mongoose
- **Authentication**: JWT with HTTP-only cookies
- **Security**: Password hashing, input validation
- **Error Handling**: Comprehensive error management

## 🚀 Deployment

Each project can be deployed independently:

### Frontend Deployment
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Configure in package.json

### Backend Deployment
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repository
- **DigitalOcean**: Deploy with App Platform

### Database (db-socket only)
- **MongoDB Atlas**: Cloud database service
- **Local MongoDB**: For development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the individual project README files
2. Ensure all dependencies are installed
3. Verify MongoDB is running (for db-socket)
4. Check console for error messages
5. Open an issue with detailed information

## 🎉 Acknowledgments

This project demonstrates various Socket.io patterns and best practices for building real-time applications. Each project builds upon the previous one, creating a comprehensive learning experience from basic concepts to advanced full-stack development.

---

**Happy coding! 🚀** 