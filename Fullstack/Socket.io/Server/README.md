# Socket.io Chat Servers

This directory contains three different Socket.io chat servers, each designed for different use cases.

## Server Types

### 1. Basic Server (Port 3001)
- **File**: `src/serverBasic.ts`
- **Command**: `npm run dev:basic`
- **Features**: Simple public messaging only
- **Use Case**: Basic Socket.io introduction

### 2. Enhanced Server (Port 3002)
- **File**: `src/serverWithIds.ts`
- **Command**: `npm run dev:enhanced`
- **Features**: User IDs, usernames, private messaging, user tracking
- **Use Case**: Advanced Socket.io features demonstration

### 3. Once Server (Port 3003)
- **File**: `src/serverOnce.ts`
- **Command**: `npm run dev:once`
- **Features**: Enhanced features + once event handling
- **Use Case**: Demonstrating Socket.io once events

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

## Ports Used
- **All Servers**: 3001

## Client Connection
The client connects to port 3001 for all chat modes. Start the appropriate server based on your desired chat mode.

## Features Comparison

| Feature | Basic | Enhanced | Once |
|---------|-------|----------|------|
| Public Messages | ✅ | ✅ | ✅ |
| User IDs | ❌ | ✅ | ✅ |
| Usernames | ❌ | ✅ | ✅ |
| Private Messages | ❌ | ✅ | ✅ |
| User Tracking | ❌ | ✅ | ✅ |
| Once Events | ❌ | ❌ | ✅ |
| Welcome Messages | ❌ | ❌ | ✅ | 