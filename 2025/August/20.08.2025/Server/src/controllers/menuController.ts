import { Request, Response } from 'express';
import { AuthRequest, ApiResponse, MenuQuery } from '../types';
import { asyncHandler } from '../middleware/errorHandler';
import MenuItem from '../models/MenuItem';
import Restaurant from '../models/Restaurant';

// @desc    Get menu items for a restaurant
// @route   GET /api/restaurants/:restaurantId/menu
// @access  Public
export const getMenuItems = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    page = 1,
    limit = 20,
    sort = 'category name',
    category,
    isVegetarian,
    isVegan,
    isGlutenFree,
    maxPrice,
    minPrice,
    search
  } = req.query as any;

  const restaurantId = req.params.restaurantId;

  // Verify restaurant exists
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant || !restaurant.isActive) {
    res.status(404).json({
      success: false,
      message: 'Restaurant not found'
    } as ApiResponse);
    return;
  }

  // Build query
  let query: any = { 
    restaurant: restaurantId,
    isAvailable: true
  };
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { ingredients: { $in: [new RegExp(search, 'i')] } }
    ];
  }
  
  if (category) {
    query.category = category;
  }
  
  if (isVegetarian === 'true' || isVegetarian === true) {
    query.isVegetarian = true;
  }
  
  if (isVegan === 'true' || isVegan === true) {
    query.isVegan = true;
  }
  
  if (isGlutenFree === 'true' || isGlutenFree === true) {
    query.isGlutenFree = true;
  }
  
  if (maxPrice) {
    query.price = { ...query.price, $lte: Number(maxPrice) };
  }
  
  if (minPrice) {
    query.price = { ...query.price, $gte: Number(minPrice) };
  }

  // Execute query with pagination
  const skip = (Number(page) - 1) * Number(limit);
  const menuItems = await MenuItem.find(query)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit))
    .populate('restaurant', 'name');

  const total = await MenuItem.countDocuments(query);
  const pages = Math.ceil(total / Number(limit));

  const response: ApiResponse = {
    success: true,
    message: 'Menu items retrieved successfully',
    data: { 
      restaurant: {
        id: restaurant._id,
        name: restaurant.name
      },
      menuItems 
    },
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages
    }
  };

  res.status(200).json(response);
});

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
export const getMenuItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const menuItem = await MenuItem.findById(req.params.id)
    .populate('restaurant', 'name address contact');

  if (!menuItem || !menuItem.isAvailable) {
    res.status(404).json({
      success: false,
      message: 'Menu item not found'
    } as ApiResponse);
    return;
  }

  const response: ApiResponse = {
    success: true,
    message: 'Menu item retrieved successfully',
    data: { menuItem }
  };

  res.status(200).json(response);
});

// @desc    Create menu item
// @route   POST /api/restaurants/:restaurantId/menu
// @access  Private (Restaurant Owner/Admin)
export const createMenuItem = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const restaurantId = req.params.restaurantId;

  // Verify restaurant exists and user has permission
  const restaurant = await Restaurant.findById(restaurantId);
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
      message: 'Not authorized to add menu items to this restaurant'
    } as ApiResponse);
    return;
  }

  const menuItemData = {
    ...req.body,
    restaurant: restaurantId
  };

  const menuItem = await MenuItem.create(menuItemData);
  await menuItem.populate('restaurant', 'name');

  const response: ApiResponse = {
    success: true,
    message: 'Menu item created successfully',
    data: { menuItem }
  };

  res.status(201).json(response);
});

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private (Restaurant Owner/Admin)
export const updateMenuItem = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  let menuItem = await MenuItem.findById(req.params.id).populate('restaurant');

  if (!menuItem) {
    res.status(404).json({
      success: false,
      message: 'Menu item not found'
    } as ApiResponse);
    return;
  }

  const restaurant = menuItem.restaurant as any;

  // Check ownership (unless admin)
  if (req.user!.role !== 'admin' && restaurant.owner.toString() !== req.user!._id.toString()) {
    res.status(403).json({
      success: false,
      message: 'Not authorized to update this menu item'
    } as ApiResponse);
    return;
  }

  menuItem = await MenuItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('restaurant', 'name');

  const response: ApiResponse = {
    success: true,
    message: 'Menu item updated successfully',
    data: { menuItem }
  };

  res.status(200).json(response);
});

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private (Restaurant Owner/Admin)
export const deleteMenuItem = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const menuItem = await MenuItem.findById(req.params.id).populate('restaurant');

  if (!menuItem) {
    res.status(404).json({
      success: false,
      message: 'Menu item not found'
    } as ApiResponse);
    return;
  }

  const restaurant = menuItem.restaurant as any;

  // Check ownership (unless admin)
  if (req.user!.role !== 'admin' && restaurant.owner.toString() !== req.user!._id.toString()) {
    res.status(403).json({
      success: false,
      message: 'Not authorized to delete this menu item'
    } as ApiResponse);
    return;
  }

  // Soft delete
  menuItem.isAvailable = false;
  await menuItem.save();

  const response: ApiResponse = {
    success: true,
    message: 'Menu item deleted successfully'
  };

  res.status(200).json(response);
});

// @desc    Get menu categories for a restaurant
// @route   GET /api/restaurants/:restaurantId/menu/categories
// @access  Public
export const getMenuCategories = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const restaurantId = req.params.restaurantId;

  const categories = await MenuItem.distinct('category', {
    restaurant: restaurantId,
    isAvailable: true
  });

  const response: ApiResponse = {
    success: true,
    message: 'Menu categories retrieved successfully',
    data: { categories }
  };

  res.status(200).json(response);
});
