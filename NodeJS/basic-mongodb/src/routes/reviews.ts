import express from 'express';
import ReviewController from '../controllers/ReviewController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Review routes (some require authentication)
router.get('/', ReviewController.getAllReviews);
router.get('/:id', ReviewController.getReviewById);
router.get('/book/:bookId', ReviewController.getReviewsByBook);
router.get('/book/:bookId/stats', ReviewController.getBookStats);

// Protected routes (require authentication)
router.post('/', authenticateToken, ReviewController.createReview);
router.get('/user/me', authenticateToken, ReviewController.getReviewsByUser);
router.put('/:id', authenticateToken, ReviewController.updateReview);
router.delete('/:id', authenticateToken, ReviewController.deleteReview);

export default router; 