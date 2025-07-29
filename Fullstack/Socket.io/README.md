# Socket.io Chat Examples

A comprehensive Socket.io chat application demonstrating different levels of complexity and features.

## Features

- **Multiple Chat Modes**: Basic, Enhanced, Once, Rooms, and DB
- **Real-time messaging** across all modes
- **User ID tracking** in enhanced modes
- **Private messaging** capabilities
- **Username management**
- **Once event handling** demonstration
- **Room management** in Rooms and DB modes
- **JWT authentication** in DB mode
- **Database persistence** in DB mode

## Project Structure

```
Socket.io/
├── Client/
│   ├── src/App.tsx              # Main app with mode selection
│   ├── src/SocketWithIds.tsx    # Enhanced chat component
│   ├── src/SocketWithOnce.tsx   # Once chat component
│   ├── src/SocketWithRooms.tsx  # Rooms chat component
│   └── src/SocketWithDB.tsx     # DB chat component
└── Server/
    ├── src/serverBasic.ts       # Basic server (Port 3001)
    ├── src/serverWithIds.ts     # Enhanced server (Port 3001)
    ├── src/serverOnce.ts        # Once server (Port 3001)
    ├── src/serverRooms.ts       # Rooms server (Port 3001)
    └── src/serverDB.ts          # DB server (Port 3001)
```

## Quick Start

### 1. Start a Server
Choose one of the following based on your needs:

**Basic Server** (Simple chat):
```bash
cd Server && npm run dev:basic
```

**Enhanced Server** (User IDs, private messaging):
```bash
cd Server && npm run dev:enhanced
```

**Once Server** (Enhanced + once events):
```bash
cd Server && npm run dev:once
```

**Rooms Server** (Room management):
```bash
cd Server && npm run dev:rooms
```

**DB Server** (JWT auth + MongoDB):
```bash
cd Server && npm run dev:db
```

### 2. Start Client
```bash
cd Client && npm run dev
```

### 3. Open `http://localhost:5173` and select your chat mode!

## Chat Modes

### 🟦 Basic Chat
- **Server**: Port 3001
- **Features**: Simple public messaging
- **Use Case**: Socket.io fundamentals

### 🟩 Enhanced Chat  
- **Server**: Port 3001
- **Features**: User IDs, usernames, private messaging, user tracking
- **Use Case**: Advanced Socket.io features

### 🟥 Once Chat
- **Server**: Port 3001  
- **Features**: Enhanced features + once event handling + welcome messages
- **Use Case**: Demonstrating Socket.io once events

### 🟧 Rooms Chat
- **Server**: Port 3001
- **Features**: Room management, room-specific chat, global messages
- **Use Case**: Multi-room chat application

### 🟪 DB Chat
- **Server**: Port 3001
- **Features**: JWT authentication, MongoDB persistence, persistent rooms and messages
- **Use Case**: Production-ready chat application

## Server Commands

| Mode | Command | Port | Features |
|------|---------|------|----------|
| Basic | `npm run dev:basic` | 3001 | Public messages only |
| Enhanced | `npm run dev:enhanced` | 3001 | Full user management |
| Once | `npm run dev:once` | 3001 | Enhanced + once events |
| Rooms | `npm run dev:rooms` | 3001 | Room management |
| DB | `npm run dev:db` | 3001 | JWT auth + MongoDB |

## How it Works

1. **Selection Screen**: Choose your preferred chat mode
2. **Server Connection**: Client connects to the appropriate server
3. **Chat Interface**: Use the features available in your selected mode
4. **Switch Modes**: Return to selection to try different modes

## Code Organization

- **Modular Design**: Each chat mode has its own server and component
- **Clean Separation**: No shared state between different modes
- **Easy Testing**: Run different servers independently
- **Educational**: Progressive complexity from basic to advanced 