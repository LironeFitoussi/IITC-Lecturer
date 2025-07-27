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

### Author Endpoints

#### Create Author
```http
POST /api/authors
Content-Type: application/json

{
  "name": "Jane Austen",
  "email": "jane.austen@example.com",
  "bio": "English novelist known for her romantic fiction"
}
```

**Response:**
```json
{
  "message": "Author created successfully",
  "author": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Austen",
    "email": "jane.austen@example.com",
    "bio": "English novelist known for her romantic fiction",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Authors
```http
GET /api/authors
```

#### Get Author by ID
```http
GET /api/authors/:id
```

#### Update Author
```http
PUT /api/authors/:id
Content-Type: application/json

{
  "bio": "Updated biography"
}
```

#### Delete Author
```http
DELETE /api/authors/:id
```

### Book Endpoints

#### Create Book
```http
POST /api/books
Content-Type: application/json

{
  "title": "Pride and Prejudice",
  "description": "A romantic novel of manners",
  "publishedYear": 1813,
  "authorId": "507f1f77bcf86cd799439011"
}
```

**Response:**
```json
{
  "message": "Book created successfully",
  "book": {
    "id": "507f1f77bcf86cd799439012",
    "title": "Pride and Prejudice",
    "description": "A romantic novel of manners",
    "publishedYear": 1813,
    "authorId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Books
```http
GET /api/books
```

#### Search Books
```http
GET /api/books/search?q=pride
```

#### Get Book by ID
```http
GET /api/books/:id
```

#### Get Books by Author
```http
GET /api/books/author/:authorId
```

#### Update Book
```http
PUT /api/books/:id
Content-Type: application/json

{
  "description": "Updated description"
}
```

#### Delete Book
```http
DELETE /api/books/:id
```

### Review Endpoints

#### Create Review (Protected)
```http
POST /api/reviews
Cookie: accessToken=<jwt-token> (automatically included)
Content-Type: application/json

{
  "bookId": "507f1f77bcf86cd799439012",
  "rating": 5,
  "comment": "Excellent book! Highly recommended."
}
```

**Response:**
```json
{
  "message": "Review created successfully",
  "review": {
    "id": "507f1f77bcf86cd799439013",
    "bookId": "507f1f77bcf86cd799439012",
    "userId": "1640123456789abc123",
    "rating": 5,
    "comment": "Excellent book! Highly recommended.",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Reviews
```http
GET /api/reviews
```

#### Get Review by ID
```http
GET /api/reviews/:id
```

#### Get Reviews for a Book
```http
GET /api/reviews/book/:bookId
```

#### Get Book Statistics
```http
GET /api/reviews/book/:bookId/stats
```

**Response:**
```json
{
  "book": {
    "id": "507f1f77bcf86cd799439012",
    "title": "Pride and Prejudice",
    "description": "A romantic novel of manners",
    "publishedYear": 1813,
    "authorId": "507f1f77bcf86cd799439011"
  },
  "stats": {
    "averageRating": 4.5,
    "reviewCount": 10
  }
}
```

#### Get User's Reviews (Protected)
```http
GET /api/reviews/user/me
Cookie: accessToken=<jwt-token> (automatically included)
```

#### Update Review (Protected)
```http
PUT /api/reviews/:id
Cookie: accessToken=<jwt-token> (automatically included)
Content-Type: application/json

{
  "rating": 4,
  "comment": "Updated review comment"
}
```

#### Delete Review (Protected)
```http
DELETE /api/reviews/:id
Cookie: accessToken=<jwt-token> (automatically included)
```

## Database Schema

### User Model
```typescript
{
  email: string (required, unique, lowercase)
  password: string (required, min 6 chars, hashed)
  name: string (required, max 50 chars)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Author Model
```typescript
{
  name: string (required, max 100 chars)
  email: string (required, unique, lowercase)
  bio: string (optional, max 500 chars)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Book Model
```typescript
{
  title: string (required, max 200 chars)
  description: string (required, max 1000 chars)
  publishedYear: number (required, min 1000, max current year + 1)
  authorId: string (required, references Author)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Review Model
```typescript
{
  bookId: string (required, references Book)
  userId: string (required, references User)
  rating: number (required, min 1, max 5)
  comment: string (required, max 500 chars)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## Relationships

- **Author → Books**: One-to-Many (One author can write multiple books)
- **Book → Reviews**: One-to-Many (One book can have multiple reviews)
- **User → Reviews**: One-to-Many (One user can write multiple reviews)
- **Book → Author**: Many-to-One (Many books can belong to one author)

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