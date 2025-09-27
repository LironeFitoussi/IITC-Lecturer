import { Request, Response } from 'express';
import { AuthRequest, ApiResponse, RestaurantQuery } from '../types';
import { asyncHandler } from '../middleware/errorHandler';
import Restaurant from '../models/Restaurant';
import MenuItem from '../models/MenuItem';

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
export const getRestaurants = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    page = 1,
    limit = 10,
    sort = '-createdAt',
    search,
    cuisine,
    priceRange,
    rating,
    city,
    features
  } = req.query as RestaurantQuery;

  // Build query
  let query: any = { isActive: true };
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (cuisine) {
    query.cuisine = { $in: cuisine.split(',') };
  }
  
  if (priceRange) {
    query.priceRange = Number(priceRange);
  }
  
  if (rating) {
    query.rating = { $gte: Number(rating) };
  }
  
  if (city) {
    query['address.city'] = { $regex: city, $options: 'i' };
  }
  
  if (features) {
    query.features = { $in: features.split(',') };
  }

  // Execute query with pagination
  const skip = (Number(page) - 1) * Number(limit);
  const restaurants = await Restaurant.find(query)
    .populate('owner', 'name email')
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Restaurant.countDocuments(query);
  const pages = Math.ceil(total / Number(limit));

  const response: ApiResponse = {
    success: true,
    message: 'Restaurants retrieved successfully',
    data: { restaurants },
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages
    }
  };

  res.status(200).json(response);
});

// @desc    Get single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
export const getRestaurant = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const restaurant = await Restaurant.findById(req.params.id)
    .populate('owner', 'name email')
    .populate('menuItems');

  if (!restaurant || !restaurant.isActive) {
    res.status(404).json({
      success: false,
      message: 'Restaurant not found'
    } as ApiResponse);
    return;
  }

  const response: ApiResponse = {
    success: true,
    message: 'Restaurant retrieved successfully',
    data: { restaurant }
  };

  res.status(200).json(response);
});

// @desc    Create restaurant
// @route   POST /api/restaurants
// @access  Private (Manager/Admin)
export const createRestaurant = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const restaurantData = {
    ...req.body,
    owner: req.user!._id
  };

  const restaurant = await Restaurant.create(restaurantData);
  await restaurant.populate('owner', 'name email');

  const response: ApiResponse = {
    success: true,
    message: 'Restaurant created successfully',
    data: { restaurant }
  };

  res.status(201).json(response);
});

// @desc    Update restaurant
// @route   PUT /api/restaurants/:id
// @access  Private (Owner/Admin)
export const updateRestaurant = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  let restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    res.status(404).json({
      success: false,
      message: 'Restaurant not found'
    } as ApiResponse);
    return;
  }

  // Check ownership (unless admin)
  if (req.user!.role !== 'admin' && restaurant.owner.toString() !== req.user!._id.toString()) {
    res.status(403).json({
      success: false,
      message: 'Not authorized to update this restaurant'
    } as ApiResponse);
    return;
  }

  restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('owner', 'name email');

  const response: ApiResponse = {
    success: true,
    message: 'Restaurant updated successfully',
    data: { restaurant }
  };

  res.status(200).json(response);
});

// @desc    Delete restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private (Owner/Admin)
export const deleteRestaurant = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    res.status(404).json({
      success: false,
      message: 'Restaurant not found'
    } as ApiResponse);
    return;
  }

  // Check ownership (unless admin)
  if (req.user!.role !== 'admin' && restaurant.owner.toString() !== req.user!._id.toString()) {
    res.status(403).json({
      success: false,
      message: 'Not authorized to delete this restaurant'
    } as ApiResponse);
    return;
  }

  // Soft delete
  restaurant.isActive = false;
  await restaurant.save();

  // Also deactivate all menu items
  await MenuItem.updateMany(
    { restaurant: restaurant._id },
    { isAvailable: false }
  );

  const response: ApiResponse = {
    success: true,
    message: 'Restaurant deleted successfully'
  };

  res.status(200).json(response);
});

// @desc    Get my restaurants
// @route   GET /api/restaurants/my/restaurants
// @access  Private (Manager/Admin)
export const getMyRestaurants = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const {
    page = 1,
    limit = 10,
    sort = '-createdAt'
  } = req.query as { page?: number; limit?: number; sort?: string };

  const skip = (Number(page) - 1) * Number(limit);
  
  const restaurants = await Restaurant.find({ owner: req.user!._id })
    .sort(sort)
    .skip(skip)
    .limit(Number(limit))
    .populate('owner', 'name email');

  const total = await Restaurant.countDocuments({ owner: req.user!._id });
  const pages = Math.ceil(total / Number(limit));

  const response: ApiResponse = {
    success: true,
    message: 'Your restaurants retrieved successfully',
    data: { restaurants },
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages
    }
  };

  res.status(200).json(response);
});

// @desc    Get restaurant statistics
// @route   GET /api/restaurants/stats
// @access  Private (Admin)
export const getRestaurantStats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const totalRestaurants = await Restaurant.countDocuments();
  const activeRestaurants = await Restaurant.countDocuments({ isActive: true });
  const inactiveRestaurants = totalRestaurants - activeRestaurants;

  // Cuisine distribution
  const cuisineStats = await Restaurant.aggregate([
    { $match: { isActive: true } },
    { $unwind: '$cuisine' },
    {
      $group: {
        _id: '$cuisine',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  // Price range distribution
  const priceRangeStats = await Restaurant.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$priceRange',
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Average rating
  const avgRatingResult = await Restaurant.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  const averageRating = avgRatingResult[0]?.averageRating || 0;

  const response: ApiResponse = {
    success: true,
    message: 'Restaurant statistics retrieved successfully',
    data: {
      totalRestaurants,
      activeRestaurants,
      inactiveRestaurants,
      averageRating: Math.round(averageRating * 100) / 100,
      cuisineDistribution: cuisineStats,
      priceRangeDistribution: priceRangeStats
    }
  };

  res.status(200).json(response);
});
