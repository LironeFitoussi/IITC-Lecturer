# Restaurant Management Backend API

A comprehensive Node.js backend API for restaurant management with user authentication, built with TypeScript, Express, and MongoDB.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Manager, Staff, Customer)
- Secure password hashing with bcrypt
- Token refresh functionality
- Rate limiting for security

### 👥 User Management
- User registration and login
- Profile management
- User roles and permissions
- Admin user management dashboard
- User statistics and analytics

### 🏪 Restaurant Management
- Complete CRUD operations for restaurants
- Restaurant search and filtering
- Cuisine-based categorization
- Location-based queries
- Restaurant owner management
- Restaurant statistics

### 🍽️ Menu Management
- Menu item CRUD operations
- Category-based organization
- Dietary restriction filters (Vegetarian, Vegan, Gluten-free)
- Price range filtering
- Ingredient and allergen management
- Availability control

### 🛡️ Security Features
- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation and sanitization
- Error handling and logging
- MongoDB injection protection

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS, bcryptjs
- **Validation**: express-validator
- **Rate Limiting**: express-rate-limit
- **Logging**: Morgan
- **Environment**: dotenv

## Project Structure

```
Server/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.ts    # Authentication logic
│   │   ├── userController.ts    # User management
│   │   ├── restaurantController.ts # Restaurant operations
│   │   └── menuController.ts    # Menu management
│   ├── middleware/
│   │   ├── auth.ts             # JWT authentication
│   │   ├── errorHandler.ts     # Error handling
│   │   ├── security.ts         # Security configurations
│   │   └── validation.ts       # Input validation
│   ├── models/
│   │   ├── User.ts            # User schema
│   │   ├── Restaurant.ts      # Restaurant schema
│   │   ├── MenuItem.ts        # Menu item schema
│   │   └── Order.ts          # Order schema
│   ├── routes/
│   │   ├── auth.ts           # Auth routes
│   │   ├── users.ts          # User routes
│   │   ├── restaurants.ts    # Restaurant routes
│   │   └── menu.ts           # Menu routes
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── utils/
│   │   └── jwt.ts            # JWT utilities
│   └── server.ts             # Main server file
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/restaurant_db

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
   JWT_EXPIRE=7d

   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get current user profile
- `PUT /profile` - Update user profile
- `PUT /change-password` - Change password
- `POST /refresh` - Refresh JWT token

### User Management (`/api/users`)
- `GET /` - Get all users (Admin)
- `GET /stats` - User statistics (Admin)
- `GET /:id` - Get single user (Admin/Manager)
- `PUT /:id` - Update user (Admin)
- `DELETE /:id` - Delete user (Admin)

### Restaurant Management (`/api/restaurants`)
- `GET /` - Get all restaurants (Public)
- `POST /` - Create restaurant (Manager/Admin)
- `GET /:id` - Get single restaurant (Public)
- `PUT /:id` - Update restaurant (Owner/Admin)
- `DELETE /:id` - Delete restaurant (Owner/Admin)
- `GET /my/restaurants` - Get user's restaurants (Manager/Admin)
- `GET /admin/stats` - Restaurant statistics (Admin)

### Menu Management (`/api/restaurants/:id/menu`, `/api/menu`)
- `GET /restaurants/:id/menu` - Get restaurant menu (Public)
- `POST /restaurants/:id/menu` - Add menu item (Owner/Admin)
- `GET /restaurants/:id/menu/categories` - Get menu categories (Public)
- `GET /menu/:id` - Get single menu item (Public)
- `PUT /menu/:id` - Update menu item (Owner/Admin)
- `DELETE /menu/:id` - Delete menu item (Owner/Admin)

## User Roles

- **Customer**: Basic user, can view restaurants and menus
- **Staff**: Restaurant staff member
- **Manager**: Can manage restaurants and menus
- **Admin**: Full system access

## Error Handling

The API uses a centralized error handling system with:
- Custom error classes
- Async error wrapper
- Mongoose error handling
- JWT error handling
- Validation error formatting

## Security Features

- **Rate Limiting**: Different limits for auth and general API routes
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **Input Validation**: Comprehensive validation using express-validator
- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Security**: Secure token generation and verification

## Development

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

### Database Indexes
The application creates the following indexes for optimal performance:
- User: email, role
- Restaurant: name (text), cuisine, city, priceRange, rating, owner
- MenuItem: restaurant, category, name (text), price, dietary flags

## Health Check

Visit `http://localhost:5000/health` to check server status.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

