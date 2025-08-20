import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats
} from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';
import { validateObjectId, validatePagination } from '../middleware/validation';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validation';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Admin only routes
router.get('/stats', authorize('admin'), getUserStats);
router.get('/', authorize('admin', 'manager'), validatePagination, getUsers);
router.get('/:id', authorize('admin', 'manager'), validateObjectId, getUser);
router.put('/:id', authorize('admin'), validateObjectId, [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'staff', 'customer'])
    .withMessage('Invalid role'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  handleValidationErrors
], updateUser);
router.delete('/:id', authorize('admin'), validateObjectId, deleteUser);

export default router;
