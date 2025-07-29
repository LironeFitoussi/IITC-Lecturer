# Socket.io Chat Servers

This directory contains five different Socket.io chat servers, each designed for different use cases.

## Server Types

### 1. Basic Server (Port 3001)
- **File**: `src/serverBasic.ts`
- **Command**: `npm run dev:basic`
- **Features**: Simple public messaging only
- **Use Case**: Basic Socket.io introduction

### 2. Enhanced Server (Port 3001)
- **File**: `src/serverWithIds.ts`
- **Command**: `npm run dev:enhanced`
- **Features**: User IDs, usernames, private messaging, user tracking
- **Use Case**: Advanced Socket.io features demonstration

### 3. Once Server (Port 3001)
- **File**: `src/serverOnce.ts`
- **Command**: `npm run dev:once`
- **Features**: Enhanced features + once event handling
- **Use Case**: Demonstrating Socket.io once events

### 4. Rooms Server (Port 3001)
- **File**: `src/serverRooms.ts`
- **Command**: `npm run dev:rooms`
- **Features**: Room management, room-specific chat, global messages
- **Use Case**: Multi-room chat application

### 5. DB Server (Port 3001)
- **File**: `src/serverDB.ts`
- **Command**: `npm run dev:db`
- **Features**: JWT authentication, MongoDB persistence, persistent rooms and messages
- **Use Case**: Production-ready chat application

## Running the Servers

### Start Basic Server
```bash
npm run dev:basic
```

### Start Enhanced Server
```bash
npm run dev:enhanced
```

### Start Once Server
```bash
npm run dev:once
```

### Start Rooms Server
```bash
npm run dev:rooms
```

### Start DB Server
```bash
npm run dev:db
```

## Ports Used
- **All Servers**: 3001

## Client Connection
The client connects to port 3001 for all chat modes. Start the appropriate server based on your desired chat mode.

## Features Comparison

| Feature | Basic | Enhanced | Once | Rooms | DB |
|---------|-------|----------|------|-------|-----|
| Public Messages | ✅ | ✅ | ✅ | ✅ | ✅ |
| User IDs | ❌ | ✅ | ✅ | ✅ | ✅ |
| Usernames | ❌ | ✅ | ✅ | ✅ | ✅ |
| Private Messages | ❌ | ✅ | ✅ | ✅ | ✅ |
| User Tracking | ❌ | ✅ | ✅ | ✅ | ✅ |
| Once Events | ❌ | ❌ | ✅ | ❌ | ❌ |
| Welcome Messages | ❌ | ❌ | ✅ | ❌ | ❌ |
| Room Management | ❌ | ❌ | ❌ | ✅ | ✅ |
| JWT Authentication | ❌ | ❌ | ❌ | ❌ | ✅ |
| Database Persistence | ❌ | ❌ | ❌ | ❌ | ✅ | 