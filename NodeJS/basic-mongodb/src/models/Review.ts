import mongoose, { Document, Schema } from 'mongoose';
import { Review } from '../types';

// Define the Review document interface
export interface ReviewDocument extends Document, Omit<Review, 'id'> {
  _id: mongoose.Types.ObjectId;
}

// Create the Review schema
const reviewSchema = new Schema<ReviewDocument>({
  bookId: {
    type: String,
    required: [true, 'Book ID is required']
  },
  userId: {
    type: String,
    required: [true, 'User ID is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    maxlength: [500, 'Comment cannot be more than 500 characters']
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
reviewSchema.index({ bookId: 1 });
reviewSchema.index({ userId: 1 });
reviewSchema.index({ bookId: 1, userId: 1 }, { unique: true }); // One review per user per book

// Create and export the Review model
const ReviewModel = mongoose.model<ReviewDocument>('Review', reviewSchema);

// Review operations wrapper
const ReviewOperations = {
  async create(reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review> {
    const review = new ReviewModel(reviewData);
    const savedReview = await review.save();
    
    return {
      id: savedReview._id.toString(),
      bookId: savedReview.bookId,
      userId: savedReview.userId,
      rating: savedReview.rating,
      comment: savedReview.comment,
      createdAt: savedReview.createdAt,
      updatedAt: savedReview.updatedAt
    };
  },

  async findById(id: string): Promise<Review | undefined> {
    try {
      const review = await ReviewModel.findById(id);
      
      if (!review) return undefined;
      
      return {
        id: review._id.toString(),
        bookId: review.bookId,
        userId: review.userId,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt
      };
    } catch (error) {
      console.error('Error finding review by ID:', error);
      return undefined;
    }
  },

  async findByBookId(bookId: string): Promise<Review[]> {
    const reviews = await ReviewModel.find({ bookId }).sort({ createdAt: -1 });
    
    return reviews.map(review => ({
      id: review._id.toString(),
      bookId: review.bookId,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    }));
  },

  async findByUserId(userId: string): Promise<Review[]> {
    const reviews = await ReviewModel.find({ userId }).sort({ createdAt: -1 });
    
    return reviews.map(review => ({
      id: review._id.toString(),
      bookId: review.bookId,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    }));
  },

  async findByBookAndUser(bookId: string, userId: string): Promise<Review | undefined> {
    const review = await ReviewModel.findOne({ bookId, userId });
    
    if (!review) return undefined;
    
    return {
      id: review._id.toString(),
      bookId: review.bookId,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    };
  },

  async getAllReviews(): Promise<Review[]> {
    const reviews = await ReviewModel.find({}).sort({ createdAt: -1 });
    
    return reviews.map(review => ({
      id: review._id.toString(),
      bookId: review.bookId,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    }));
  },

  async updateReview(id: string, updateData: Partial<Omit<Review, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Review | undefined> {
    try {
      const review = await ReviewModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!review) return undefined;
      
      return {
        id: review._id.toString(),
        bookId: review.bookId,
        userId: review.userId,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt
      };
    } catch (error) {
      console.error('Error updating review:', error);
      return undefined;
    }
  },

  async deleteReview(id: string): Promise<boolean> {
    try {
      const result = await ReviewModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting review:', error);
      return false;
    }
  },

  async getAverageRating(bookId: string): Promise<number> {
    const result = await ReviewModel.aggregate([
      { $match: { bookId } },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } }
    ]);
    
    return result.length > 0 ? Math.round(result[0].averageRating * 10) / 10 : 0;
  },

  async getReviewCount(bookId: string): Promise<number> {
    return await ReviewModel.countDocuments({ bookId });
  }
};

export default ReviewOperations; 