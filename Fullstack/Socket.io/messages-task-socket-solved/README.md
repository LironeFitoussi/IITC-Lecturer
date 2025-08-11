## Messages Task: Users Sidebar + Private Messages (DM)

This repository is a starter for a Socket.IO chat app where students implement a real-time users sidebar and 1:1 private messages (DM). The UI is scaffolded with dummy data so you can focus on the Socket.IO implementation and state management.

### Monorepo Layout
- `Client/`: React + Vite + TypeScript UI
- `Server/`: Express + Socket.IO + TypeScript server

### Quick Start
1) Install deps
```
cd Server && npm ci && cd ../Client && npm ci
```
2) Start server (port 3001)
```
cd Server
npm run dev
```
3) Start client (port 5173)
```
cd Client
npm run dev
```

### Educational Task (High-Level Spec)
Hebrew spec summary: Add a real-time users sidebar and the ability to send private messages (DM) to a selected user. The server broadcasts the full users list on any change and relays private messages to the target user only (plus echo back to sender). The client shows a clear Public/Private state and tags private messages.

Key points:
- Sidebar shows all connected users with count and highlights selected DM target.
- Client sends `privateMessage: { toUserId, text }` to server; server validates and emits `privateMessage` to `toUserId` and back to sender.
- Client receives `users`, `message` (public), `privateMessage` (private), and optional `error`.
- Prevent sending empty messages or to self. If target disconnects, clear selection and show a small hint.

### Data Models (TypeScript)
```
type User = { id: string; username: string };

type PublicMessage = {
  id: string;
  text: string;
  userId: string;
  username: string;
  timestamp: string; // ISO
};

type PrivateMessage = {
  id: string;
  text: string;
  fromUserId: string;
  toUserId: string;
  username: string;   // sender (server is source of truth)
  timestamp: string;  // ISO
};
```

### Event Contracts
Server → Client
- `users: User[]`
- `message: PublicMessage` (existing)
- `privateMessage: PrivateMessage` (new)
- `error?`: `{ code: string; message: string }`

Client → Server
- `message: { text: string }` (existing)
- `privateMessage: { toUserId: string; text: string }` (new)

### What’s Prebuilt
- UI two-column layout with `UsersSidebar` and DM mode banner in `Client/src/components/Chat.tsx`.
- Dummy users and messages to preview the design.
- Clear TODOs in UI and hook to wire events.

### Your Tasks (TODO Checklists)
Client
- [ ] Replace dummy `users` with live `socket.on('users', ...)` and update `UsersSidebar`.
- [ ] Listen for `privateMessage` and add to messages with `{ isPrivate: true }` tag.
- [ ] On send: if `selectedUserId` exists → `socket.emit('privateMessage', { toUserId, text })`; else keep public `message`.
- [ ] Block sending empty text and selecting self.
- [ ] If selected user disconnects, clear selection and show a small system hint.

Server
- [ ] Maintain authoritative `userArray: User[]`.
- [ ] On connect/disconnect, broadcast `users` (full list) to all clients.
- [ ] Implement `privateMessage` handler with validation and targeted emit using `io.to(toUserId)`, plus echo to `socket`.
- [ ] Return friendly `error` events for invalid cases (`DM_EMPTY_TEXT`, `DM_SELF_TARGET`, `DM_TARGET_OFFLINE`).

### Acceptance Criteria
- Sidebar shows connected users with live updates and count.
- Selecting a user switches to Private mode and is visually indicated.
- DM appears only to sender and recipient, tagged “Private”.
- Empty/self messages are blocked.
- When recipient disconnects, selection clears and sending is prevented.

### Manual Test Scenarios
- Two browser tabs as two users; verify users list, public and private messaging visibility.
- Attempt to DM yourself; ensure blocked on client and server.
- Disconnect recipient during DM; list updates and DM disabled.
- Try empty text; blocked with friendly feedback.
- Navigate away/back; ensure no duplicate listeners.

### Notes
- Keep server as source-of-truth for usernames in messages.
- Client stores chat history in memory only (no persistence).


