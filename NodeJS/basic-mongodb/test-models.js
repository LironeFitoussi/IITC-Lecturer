const mongoose = require('mongoose');
require('dotenv').config();

// Test all models working together
async function testModels() {
  try {
    console.log('🔌 Testing all models integration...');
    
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-app';
    console.log(`📡 Connecting to: ${mongoURI.replace(/\/\/.*@/, '//***:***@')}`);
    
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully!');
    
    // Define schemas for testing
    const UserSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true }
    }, { timestamps: true });
    
    const AuthorSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      bio: { type: String }
    }, { timestamps: true });
    
    const BookSchema = new mongoose.Schema({
      title: { type: String, required: true },
      description: { type: String, required: true },
      publishedYear: { type: Number, required: true },
      authorId: { type: String, required: true }
    }, { timestamps: true });
    
    const ReviewSchema = new mongoose.Schema({
      bookId: { type: String, required: true },
      userId: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true }
    }, { timestamps: true });
    
    // Create models
    const UserModel = mongoose.model('TestUser', UserSchema);
    const AuthorModel = mongoose.model('TestAuthor', AuthorSchema);
    const BookModel = mongoose.model('TestBook', BookSchema);
    const ReviewModel = mongoose.model('TestReview', ReviewSchema);
    
    console.log('📝 Testing model creation and relationships...');
    
    // 1. Create a test user
    const testUser = new UserModel({
      email: 'testuser@example.com',
      password: 'hashedpassword123',
      name: 'Test User'
    });
    await testUser.save();
    console.log('✅ Test user created:', testUser.name);
    
    // 2. Create a test author
    const testAuthor = new AuthorModel({
      name: 'Test Author',
      email: 'testauthor@example.com',
      bio: 'A test author for testing purposes'
    });
    await testAuthor.save();
    console.log('✅ Test author created:', testAuthor.name);
    
    // 3. Create a test book
    const testBook = new BookModel({
      title: 'Test Book',
      description: 'A test book for testing purposes',
      publishedYear: 2024,
      authorId: testAuthor._id.toString()
    });
    await testBook.save();
    console.log('✅ Test book created:', testBook.title);
    
    // 4. Create a test review
    const testReview = new ReviewModel({
      bookId: testBook._id.toString(),
      userId: testUser._id.toString(),
      rating: 5,
      comment: 'Excellent test book!'
    });
    await testReview.save();
    console.log('✅ Test review created with rating:', testReview.rating);
    
    // 5. Test relationships
    const authorBooks = await BookModel.find({ authorId: testAuthor._id.toString() });
    console.log(`✅ Author has ${authorBooks.length} book(s)`);
    
    const bookReviews = await ReviewModel.find({ bookId: testBook._id.toString() });
    console.log(`✅ Book has ${bookReviews.length} review(s)`);
    
    const userReviews = await ReviewModel.find({ userId: testUser._id.toString() });
    console.log(`✅ User has ${userReviews.length} review(s)`);
    
    // 6. Test aggregation (average rating)
    const avgRating = await ReviewModel.aggregate([
      { $match: { bookId: testBook._id.toString() } },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } }
    ]);
    
    if (avgRating.length > 0) {
      console.log(`✅ Book average rating: ${avgRating[0].averageRating}`);
    }
    
    // 7. Clean up test data
    await UserModel.deleteOne({ _id: testUser._id });
    await AuthorModel.deleteOne({ _id: testAuthor._id });
    await BookModel.deleteOne({ _id: testBook._id });
    await ReviewModel.deleteOne({ _id: testReview._id });
    console.log('✅ Test data cleaned up!');
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed!');
    console.log('🎉 All models integration tests passed!');
    
  } catch (error) {
    console.error('❌ Models integration test failed:', error.message);
    console.log('\n📋 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check your MONGODB_URI in .env file');
    console.log('3. Verify all models are properly defined');
    console.log('4. Check for any schema validation errors');
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

// Run the test
testModels(); 