const mongoose = require('mongoose');
require('dotenv').config();

// Test MongoDB connection
async function testConnection() {
  try {
    console.log('🔌 Testing MongoDB connection...');
    
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-app';
    console.log(`📡 Connecting to: ${mongoURI.replace(/\/\/.*@/, '//***:***@')}`);
    
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test basic operations
    const TestSchema = new mongoose.Schema({
      name: String,
      email: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', TestSchema);
    
    // Create a test document
    const testDoc = new TestModel({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    await testDoc.save();
    console.log('✅ Test document created successfully!');
    
    // Find the test document
    const foundDoc = await TestModel.findOne({ email: 'test@example.com' });
    console.log('✅ Test document found:', foundDoc.name);
    
    // Clean up - delete test document
    await TestModel.deleteOne({ email: 'test@example.com' });
    console.log('✅ Test document cleaned up!');
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed!');
    console.log('🎉 All tests passed! MongoDB integration is working correctly.');
    
  } catch (error) {
    console.error('❌ MongoDB test failed:', error.message);
    console.log('\n📋 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check your MONGODB_URI in .env file');
    console.log('3. Verify network connectivity to MongoDB');
    console.log('4. Check MongoDB authentication credentials');
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

// Run the test
testConnection(); 