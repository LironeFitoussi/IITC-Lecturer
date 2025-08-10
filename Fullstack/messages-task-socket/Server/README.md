# Socket.IO Chat Server (Educational Task)

Single server used for the users sidebar + private messages task.

## Setup
```bash
npm ci
npm run dev
```

Server runs on `http://localhost:3001`.

## Current Behavior
- Keeps an in-memory `userArray` with `{ id, username }`.
- Public `message` flow is implemented and broadcast to all.
- Emits join/leave events used by the existing UI.

## Your Tasks (Server)
- [ ] Emit `users` (full list) to all clients on any connect/disconnect.
- [ ] Implement `privateMessage` handler:
  - Validate: non-empty text, target exists, target != self.
  - Build payload: `{ id, text, fromUserId, toUserId, username, timestamp }` (username from `userArray`).
  - Emit to target with `io.to(toUserId).emit('privateMessage', payload)` and echo to sender with `socket.emit('privateMessage', payload)`.
- [ ] On invalid DM, emit `error` with codes: `DM_EMPTY_TEXT`, `DM_SELF_TARGET`, `DM_TARGET_OFFLINE`.

These match the contracts described in the repository root README and the client README.