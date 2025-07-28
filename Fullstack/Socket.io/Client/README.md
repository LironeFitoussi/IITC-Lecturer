# Authentication Frontend

A simple React authentication frontend built with Vite, TypeScript, shadcn/ui, and React Context API.

## Features

- User registration and login
- JWT-based authentication with HTTP-only cookies
- Protected routes and user dashboard
- Modern UI with shadcn/ui components
- Toast notifications for user feedback
- Responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend server is running on `http://localhost:3001`

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Components

- **AuthContext**: React Context for managing authentication state
- **LoginForm**: User login form
- **RegisterForm**: User registration form  
- **Dashboard**: Protected user dashboard showing user information

## Authentication Flow

1. Users can register with email, name, and password
2. Users can login with email and password
3. Authentication tokens are stored in HTTP-only cookies
4. Users can view their profile information in the dashboard
5. Users can logout to clear their session

## UI Components

This app uses shadcn/ui components:
- Button
- Card
- Input  
- Label
- Sonner (for toast notifications)

All components are styled with Tailwind CSS and follow modern design principles.
