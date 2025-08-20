import express from 'express';
import {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getMyRestaurants,
  getRestaurantStats
} from '../controllers/restaurantController';
import {
  getMenuItems,
  createMenuItem,
  getMenuCategories
} from '../controllers/menuController';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';
import { 
  validateRestaurant, 
  validateObjectId, 
  validateRestaurantId,
  validatePagination,
  validateMenuItem
} from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, validatePagination, getRestaurants);
router.get('/:id', validateObjectId, getRestaurant);
router.get('/:restaurantId/menu', validateRestaurantId, getMenuItems);
router.get('/:restaurantId/menu/categories', validateRestaurantId, getMenuCategories);

// Protected routes
router.use(authenticate);

// Restaurant management
router.post('/', authorize('admin', 'manager'), validateRestaurant, createRestaurant);
router.put('/:id', authorize('admin', 'manager'), validateObjectId, validateRestaurant, updateRestaurant);
router.delete('/:id', authorize('admin', 'manager'), validateObjectId, deleteRestaurant);

// Menu management
router.post('/:restaurantId/menu', authorize('admin', 'manager'), validateRestaurantId, validateMenuItem, createMenuItem);

// Owner-specific routes
router.get('/my/restaurants', authorize('admin', 'manager'), validatePagination, getMyRestaurants);

// Admin-only routes
router.get('/admin/stats', authorize('admin'), getRestaurantStats);

export default router;
