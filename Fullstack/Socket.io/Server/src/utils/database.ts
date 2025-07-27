import mongoose from 'mongoose';

// Database utility functions
export const DatabaseUtils = {
  // Check if MongoDB is connected
  isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  },

  // Get connection status
  getConnectionStatus(): string {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    return states[mongoose.connection.readyState as keyof typeof states] || 'unknown';
  },

  // Get database info
  async getDatabaseInfo() {
    try {
      const db = mongoose.connection.db;
      if (!db) {
        throw new Error('Database not connected');
      }

      const stats = await db.stats();
      return {
        name: db.databaseName,
        collections: stats.collections,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        indexes: stats.indexes,
        indexSize: stats.indexSize
      };
    } catch (error) {
      console.error('Error getting database info:', error);
      return null;
    }
  },

  // Clear all collections (for testing)
  async clearAllCollections(): Promise<void> {
    try {
      const collections = await mongoose.connection.db?.collections();
      if (!collections) {
        throw new Error('No collections found');
      }

      for (const collection of collections) {
        await collection.deleteMany({});
      }
      console.log('✅ All collections cleared');
    } catch (error) {
      console.error('Error clearing collections:', error);
      throw error;
    }
  },

  // Drop database (for testing)
  async dropDatabase(): Promise<void> {
    try {
      await mongoose.connection.db?.dropDatabase();
      console.log('✅ Database dropped');
    } catch (error) {
      console.error('Error dropping database:', error);
      throw error;
    }
  },

  // Graceful shutdown
  async gracefulShutdown(): Promise<void> {
    try {
      console.log('🔄 Closing MongoDB connection...');
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed gracefully');
    } catch (error) {
      console.error('❌ Error during graceful shutdown:', error);
      throw error;
    }
  }
};

// Export mongoose for direct access if needed
export { mongoose }; 