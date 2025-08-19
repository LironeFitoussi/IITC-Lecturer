import express from 'express';
import {
  getMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuController';
import { authenticate, authorize } from '../middleware/auth';
import { validateObjectId, validateMenuItem } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/:id', validateObjectId, getMenuItem);

// Protected routes
router.use(authenticate);

// Menu item management (Restaurant Owner/Admin only)
router.put('/:id', authorize('admin', 'manager'), validateObjectId, validateMenuItem, updateMenuItem);
router.delete('/:id', authorize('admin', 'manager'), validateObjectId, deleteMenuItem);

export default router;

