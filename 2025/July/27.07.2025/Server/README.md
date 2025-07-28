# Simple JWT Backend API

A simple Express.js backend with JWT authentication for user management. Uses in-memory storage for development simplicity.

## Features

- 🔐 JWT-based authentication with HTTP-only cookies
- 👤 User registration and login
- 🛡️ Password hashing with bcrypt
- ✅ Input validation middleware
- 🚫 Global error handling
- 📝 TypeScript support
- 🎯 Simple in-memory user storage
- 🔍 User management endpoints

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone and navigate to the project:
   ```bash
   git clone <your-repo-url>
   cd Server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   # Create .env file
   echo "PORT=3001
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CLIENT_URL=http://localhost:5173" > .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Server will be running at `http://localhost:3001`

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Base URL
```
http://localhost:3001/api
```

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "message": "Server is running!",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "Password123"
}
```

**Password Requirements:**
- At least 6 characters
- Must contain: uppercase letter, lowercase letter, and number

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "1640123456789abc123",
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```
*Note: JWT token is automatically set as HTTP-only cookie*

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "1640123456789abc123",
    "email": "john@example.com", 
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```
*Note: JWT token is automatically set as HTTP-only cookie*

#### Logout User
```http
POST /api/auth/logout
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```
*Note: HTTP-only cookie is automatically cleared*

### Protected Endpoints
*Requires valid JWT token in HTTP-only cookies (automatically handled)*

#### Get Current User
```http
GET /api/auth/me
Cookie: accessToken=<jwt-token> (automatically included)
```

**Response:**
```json
{
  "user": {
    "id": "1640123456789abc123",
    "email": "john@example.com",
    "name": "John Doe", 
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Users
```http
GET /api/auth/users
Cookie: accessToken=<jwt-token> (automatically included)
```

**Response:**
```json
{
  "message": "Found 2 users",
  "users": [
    {
      "id": "1640123456789abc123",
      "email": "john@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": "1640123456789def456", 
      "email": "jane@example.com",
      "name": "Jane Smith",
      "createdAt": "2024-01-15T11:00:00.000Z"
    }
  ],
  "total": 2
}
```

#### Delete User
```http
DELETE /api/auth/users/:id
Cookie: accessToken=<jwt-token> (automatically included)
```

**Response:**
```json
{
  "message": "User deleted successfully",
  "deletedUser": {
    "id": "1640123456789abc123",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

## Error Responses

### Validation Errors (400)
```json
{
  "message": "Password must contain at least one uppercase letter"
}
```

### Authentication Errors (401)
```json
{
  "message": "Access denied. No token provided.",
  "note": "Make sure cookies are enabled and you are logged in"
}
```

### Authorization Errors (403)  
```json
{
  "message": "Invalid token."
}
```

### Token Expiration (401)
```json
{
  "message": "Token expired. Please login again."
}
```

### Not Found (404)
```json
{
  "message": "User not found"
}
```

### Server Errors (500)
```json
{
  "error": {
    "message": "Internal Server Error"
  }
}
```

## Project Structure

```
Server/
├── src/
│   ├── controllers/
│   │   └── AuthController.ts      # Authentication logic
│   ├── middleware/
│   │   ├── auth.ts                # JWT middleware
│   │   ├── errorHandler.ts        # Global error handling
│   │   └── validation.ts          # Input validation
│   ├── models/
│   │   └── User.ts                # User data operations
│   ├── routes/
│   │   └── auth.ts                # API routes
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   └── server.ts                  # Express app setup
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `JWT_SECRET` | JWT signing key | **Required** |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Development Scripts

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Production start
npm start

# Clean build directory
npm run clean
```

## Security Features

- **HTTP-Only Cookies**: JWT tokens stored securely in HTTP-only cookies
- **Password Hashing**: bcrypt with salt rounds of 10
- **Input Validation**: Email format and password strength validation
- **Error Handling**: Sanitized error messages in production
- **CORS**: Configurable cross-origin resource sharing
- **Token Expiration**: 24-hour JWT expiry with proper error handling

## Data Storage

This backend uses **in-memory storage** for simplicity:
- ✅ Perfect for development and testing
- ✅ No database setup required
- ❌ Data is lost when server restarts
- ❌ Not suitable for production

## Testing the API

### Using Frontend Example (Interactive)

**Try the live HTML example:**
1. Start the server: `npm run dev` 
2. Open `frontend-example.html` in your browser
3. Interactive UI for all endpoints with automatic token management
4. Shows real frontend integration with localStorage

### Using Postman (Recommended for API Testing)

**Import the complete test collection:**
1. Import `postman_collection.json` into Postman
2. Run the entire test suite with the Collection Runner
3. All endpoints, authentication, and edge cases are covered

See `POSTMAN_TESTING.md` for detailed instructions.

### Using curl

```bash
# Register (sets HTTP-only cookie)
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Password123"}' \
  -c cookies.txt

# Login (sets HTTP-only cookie)  
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}' \
  -c cookies.txt

# Get current user (uses cookies)
curl -X GET http://localhost:3001/api/auth/me \
  -b cookies.txt

# Get all users (uses cookies)
curl -X GET http://localhost:3001/api/auth/users \
  -b cookies.txt
```

### Manual Testing with Postman/Insomnia

1. Set `Content-Type: application/json` headers
2. Enable cookie handling in your client
3. Cookies are automatically managed after login/register
4. Use the endpoints as documented above

## License

MIT License 