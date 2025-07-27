import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import authorRoutes from './routes/authors';
import bookRoutes from './routes/books';
import reviewRoutes from './routes/reviews';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import connectDB from './config/database';
import { DatabaseUtils } from './utils/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbInfo = await DatabaseUtils.getDatabaseInfo();
    
    res.json({ 
      message: 'Server is running!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      database: {
        type: 'MongoDB with Mongoose',
        status: DatabaseUtils.getConnectionStatus(),
        connected: DatabaseUtils.isConnected(),
        info: dbInfo
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server is running but database check failed',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      database: {
        type: 'MongoDB with Mongoose',
        status: DatabaseUtils.getConnectionStatus(),
        connected: DatabaseUtils.isConnected(),
        error: 'Database check failed'
      }
    });
  }
});

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
  console.log(`✍️ Author endpoints: http://localhost:${PORT}/api/authors`);
  console.log(`📚 Book endpoints: http://localhost:${PORT}/api/books`);
  console.log(`⭐ Review endpoints: http://localhost:${PORT}/api/reviews`);
  console.log(`🗄️ Database: MongoDB with Mongoose`);
}); 