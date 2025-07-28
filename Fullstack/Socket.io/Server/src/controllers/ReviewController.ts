import { Request, Response } from 'express';
import { CreateReviewRequest, UpdateReviewRequest } from '../types';
import ReviewModel from '../models/Review';
import BookModel from '../models/Book';
import UserModel from '../models/User';
import { AuthRequest } from '../middleware/auth';

const ReviewController = {
  async createReview(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { bookId, rating, comment }: CreateReviewRequest = req.body;
      const userId = req.user!.userId;

      // Check if book exists
      const book = await BookModel.findById(bookId);
      if (!book) {
        res.status(400).json({ message: 'Book not found' });
        return;
      }

      // Check if user already reviewed this book
      const existingReview = await ReviewModel.findByBookAndUser(bookId, userId);
      if (existingReview) {
        res.status(400).json({ message: 'You have already reviewed this book' });
        return;
      }

      // Create new review
      const review = await ReviewModel.create({ bookId, userId, rating, comment });

      res.status(201).json({
        message: 'Review created successfully',
        review
      });
    } catch (error) {
      console.error('Create review error:', error);
      res.status(500).json({ message: 'Server error during review creation' });
    }
  },

  async getAllReviews(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await ReviewModel.getAllReviews();

      res.json({
        message: `Found ${reviews.length} reviews`,
        reviews,
        total: reviews.length
      });
    } catch (error) {
      console.error('Get all reviews error:', error);
      res.status(500).json({ message: 'Server error while fetching reviews' });
    }
  },

  async getReviewById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const review = await ReviewModel.findById(id);
      if (!review) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }

      res.json({
        review
      });
    } catch (error) {
      console.error('Get review by ID error:', error);
      res.status(500).json({ message: 'Server error while fetching review' });
    }
  },

  async getReviewsByBook(req: Request, res: Response): Promise<void> {
    try {
      const { bookId } = req.params;

      // Check if book exists
      const book = await BookModel.findById(bookId);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }

      const reviews = await ReviewModel.findByBookId(bookId);
      const averageRating = await ReviewModel.getAverageRating(bookId);
      const reviewCount = await ReviewModel.getReviewCount(bookId);

      res.json({
        message: `Found ${reviews.length} reviews for this book`,
        book,
        reviews,
        averageRating,
        reviewCount,
        total: reviews.length
      });
    } catch (error) {
      console.error('Get reviews by book error:', error);
      res.status(500).json({ message: 'Server error while fetching reviews by book' });
    }
  },

  async getReviewsByUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;

      const reviews = await ReviewModel.findByUserId(userId);

      res.json({
        message: `Found ${reviews.length} reviews by you`,
        reviews,
        total: reviews.length
      });
    } catch (error) {
      console.error('Get reviews by user error:', error);
      res.status(500).json({ message: 'Server error while fetching user reviews' });
    }
  },

  async updateReview(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateReviewRequest = req.body;
      const userId = req.user!.userId;

      // Check if review exists and belongs to user
      const existingReview = await ReviewModel.findById(id);
      if (!existingReview) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }

      if (existingReview.userId !== userId) {
        res.status(403).json({ message: 'You can only update your own reviews' });
        return;
      }

      const review = await ReviewModel.updateReview(id, updateData);
      if (!review) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }

      res.json({
        message: 'Review updated successfully',
        review
      });
    } catch (error) {
      console.error('Update review error:', error);
      res.status(500).json({ message: 'Server error while updating review' });
    }
  },

  async deleteReview(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      // Check if review exists and belongs to user
      const existingReview = await ReviewModel.findById(id);
      if (!existingReview) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }

      if (existingReview.userId !== userId) {
        res.status(403).json({ message: 'You can only delete your own reviews' });
        return;
      }

      const deleted = await ReviewModel.deleteReview(id);
      if (!deleted) {
        res.status(404).json({ message: 'Review not found' });
        return;
      }

      res.json({
        message: 'Review deleted successfully'
      });
    } catch (error) {
      console.error('Delete review error:', error);
      res.status(500).json({ message: 'Server error while deleting review' });
    }
  },

  async getBookStats(req: Request, res: Response): Promise<void> {
    try {
      const { bookId } = req.params;

      // Check if book exists
      const book = await BookModel.findById(bookId);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }

      const averageRating = await ReviewModel.getAverageRating(bookId);
      const reviewCount = await ReviewModel.getReviewCount(bookId);

      res.json({
        book,
        stats: {
          averageRating,
          reviewCount
        }
      });
    } catch (error) {
      console.error('Get book stats error:', error);
      res.status(500).json({ message: 'Server error while fetching book stats' });
    }
  }
};

export default ReviewController; 