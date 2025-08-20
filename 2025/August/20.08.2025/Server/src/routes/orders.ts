import express from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  getOrderStats
} from '../controllers/orderController';
import { authenticate, authorize } from '../middleware/auth';
import { 
  validateOrder,
  validateObjectId,
  validatePagination
} from '../middleware/validation';

const router = express.Router();

// All order routes require authentication
router.use(authenticate);

// Customer routes
router.post('/', validateOrder, createOrder);
router.get('/', validatePagination, getOrders);
router.get('/:id', validateObjectId, getOrder);
router.put('/:id/cancel', validateObjectId, cancelOrder);

// Restaurant owner/admin routes
router.put('/:id/status', validateObjectId, authorize('admin', 'manager'), updateOrderStatus);

// Admin-only routes
router.get('/admin/stats', authorize('admin'), getOrderStats);

export default router;
