# 🔧 MongoDB Setup & Connection Fix

## 🚨 Issue
The backend server cannot connect to MongoDB because it's not installed or not running.

```
Error connecting to MongoDB: MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
```

## 🔧 Solutions (Choose One)

### Option 1: Install MongoDB Locally (Recommended for Development)

#### Windows Installation:
1. **Download MongoDB Community Server**:
   - Go to https://www.mongodb.com/try/download/community
   - Select Windows, MSI package
   - Download and run the installer

2. **Install with default settings**:
   - Choose "Complete" installation
   - Install MongoDB Compass (GUI tool)
   - Install as Windows Service (recommended)

3. **Start MongoDB Service**:
   ```bash
   # Start MongoDB service
   net start MongoDB
   
   # Or restart if already installed
   net stop MongoDB
   net start MongoDB
   ```

4. **Verify Installation**:
   ```bash
   # Test connection
   mongosh
   # Should connect to MongoDB shell
   ```

### Option 2: Use MongoDB Atlas (Cloud Database)

1. **Create Free Account**:
   - Go to https://www.mongodb.com/atlas
   - Sign up for free account
   - Create a new cluster (free tier available)

2. **Get Connection String**:
   - In Atlas dashboard, click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

3. **Update Environment Variables**:
   Create `.env` file in Server directory:
   ```env
   # Replace with your Atlas connection string
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant_db?retryWrites=true&w=majority
   
   # Other required variables
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex_at_least_32_characters
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

### Option 3: Use Docker (If you have Docker installed)

```bash
# Run MongoDB in Docker container
docker run --name mongodb -d -p 27017:27017 mongo:latest

# Start container if already created
docker start mongodb
```

## 🚀 Quick Setup with MongoDB Atlas (Easiest)

1. **Sign up at MongoDB Atlas**: https://www.mongodb.com/atlas
2. **Create a free cluster**
3. **Create database user** (Database Access → Add New Database User)
4. **Whitelist your IP** (Network Access → Add IP Address → Add Current IP)
5. **Get connection string** (Clusters → Connect → Connect your application)

## 📝 Environment Configuration

Create `Server/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (choose one)
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/restaurant_db

# OR MongoDB Atlas (replace with your connection string):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant_db?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex_at_least_32_characters
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/
```

## ✅ After MongoDB is Set Up

1. **Restart the backend server**:
   ```bash
   npm run dev
   ```

2. **You should see**:
   ```
   🚀 Server running in development mode on port 5000
   📡 Health check available at http://localhost:5000/health
   🔗 API base URL: http://localhost:5000/api
   MongoDB Connected: localhost:27017 (or your Atlas cluster)
   ```

## 🔍 Troubleshooting

### If MongoDB service won't start on Windows:
```bash
# Check if MongoDB service exists
sc query MongoDB

# Start service as administrator
net start MongoDB
```

### If using Atlas and getting connection errors:
- Check your IP is whitelisted
- Verify username/password in connection string
- Ensure database user has proper permissions

### Connection string format for Atlas:
```
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

## 🎯 Recommended: MongoDB Atlas for Learning

For this learning project, I recommend using **MongoDB Atlas** (free cloud database) because:
- ✅ No local installation required
- ✅ Always available
- ✅ Free tier sufficient for development
- ✅ Easy to set up
- ✅ Accessible from any device

Choose the option that works best for your setup!

