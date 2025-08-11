# Client (React + Vite)

A minimal chat UI scaffold with a users sidebar and DM mode banner. Wired with dummy data so you can focus on Socket.IO.

## Setup

1. Install dependencies:
```bash
npm ci
```

2. Run the dev server (expects backend at `http://localhost:3001`):
```bash
npm run dev
```

Open `http://localhost:5173` in multiple tabs to simulate multiple users.

## Where to Work

- `src/components/Chat.tsx`: main state for messages, users, selected DM target. Contains many TODOs.
- `src/components/UsersSidebar.tsx`: sidebar UI. Selecting a user enables DM mode.
- `src/hooks/useSocket.tsx`: socket creation. Add listeners for `users` and `privateMessage`.
- `src/types/chat.ts`: shared types for contracts.

## Event Contracts (Client perspective)
- From server: `users`, `message`, `privateMessage`, optional `error`
- To server: `message`, `privateMessage`

## TODOs (Client)
- Replace dummy `users` state with data from `socket.on('users')`.
- Listen for `privateMessage` and append tagged private messages.
- On send: if a user is selected → emit `privateMessage`; else emit `message`.
- Prevent selecting yourself; block empty messages.
- If selected user disconnects, clear selection and show a small hint.
