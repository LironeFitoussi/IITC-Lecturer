import { Request, Response } from 'express';
import { AuthRequest, ApiResponse } from '../types';
import { asyncHandler } from '../middleware/errorHandler';
import Order from '../models/Order';
import Restaurant from '../models/Restaurant';
import MenuItem from '../models/MenuItem';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const {
    restaurant,
    items,
    totalAmount,
    orderType = 'delivery',
    deliveryAddress,
    paymentMethod = 'cash'
  } = req.body;

  // Verify restaurant exists
  const restaurantDoc = await Restaurant.findById(restaurant);
  if (!restaurantDoc || !restaurantDoc.isActive) {
    res.status(404).json({
      success: false,
      message: 'Restaurant not found or inactive'
    } as ApiResponse);
    return;
  }

  // Verify all menu items exist and calculate total
  let calculatedTotal = 0;
  for (const item of items) {
    const menuItem = await MenuItem.findById(item.menuItem);
    if (!menuItem || !menuItem.isAvailable) {
      res.status(400).json({
        success: false,
        message: `Menu item not found or unavailable: ${item.menuItem}`
      } as ApiResponse);
      return;
    }
    calculatedTotal += menuItem.price * item.quantity;
  }

  // Create order
  const order = await Order.create({
    customer: req.user!._id,
    restaurant,
    items,
    totalAmount,
    orderType,
    deliveryAddress,
    paymentMethod,
    status: 'pending',
    paymentStatus: 'pending'
  });

  // Populate the order with restaurant and menu item details
  const populatedOrder = await Order.findById(order._id)
    .populate('restaurant', 'name address contact')
    .populate('items.menuItem', 'name price category');

  const response: ApiResponse = {
    success: true,
    message: 'Order created successfully',
    data: { order: populatedOrder }
  };

  res.status(201).json(response);
});

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
export const getOrders = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const {
    page = 1,
    limit = 10,
    status,
    restaurant
  } = req.query as any;

  // Build query
  let query: any = { customer: req.user!._id };
  
  if (status) {
    query.status = status;
  }
  
  if (restaurant) {
    query.restaurant = restaurant;
  }

  // Execute query with pagination
  const skip = (Number(page) - 1) * Number(limit);
  const orders = await Order.find(query)
    .populate('restaurant', 'name address contact cuisine images')
    .populate('items.menuItem', 'name price category')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Order.countDocuments(query);
  const pages = Math.ceil(total / Number(limit));

  const response: ApiResponse = {
    success: true,
    message: 'Orders retrieved successfully',
    data: orders,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages
    }
  };

  res.status(200).json(response);
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const order = await Order.findById(req.params.id)
    .populate('restaurant', 'name address contact cuisine images')
    .populate('items.menuItem', 'name price category description');

  if (!order) {
    res.status(404).json({
      success: false,
      message: 'Order not found'
    } as ApiResponse);
    return;
  }

  // Verify order belongs to user (unless admin)
  if (order.customer.toString() !== req.user!._id.toString() && req.user!.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Access denied'
    } as ApiResponse);
    return;
  }

  const response: ApiResponse = {
    success: true,
    message: 'Order retrieved successfully',
    data: { order }
  };

  res.status(200).json(response);
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Restaurant Owner/Admin)
export const updateOrderStatus = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { status } = req.body;
  
  const order = await Order.findById(req.params.id)
    .populate('restaurant', 'owner');

  if (!order) {
    res.status(404).json({
      success: false,
      message: 'Order not found'
    } as ApiResponse);
    return;
  }

  // Check if user can update this order
  const canUpdate = req.user!.role === 'admin' || 
    (req.user!.role === 'manager' && order.restaurant.owner.toString() === req.user!._id.toString());

  if (!canUpdate) {
    res.status(403).json({
      success: false,
      message: 'Access denied'
    } as ApiResponse);
    return;
  }

  order.status = status;
  await order.save();

  const response: ApiResponse = {
    success: true,
    message: 'Order status updated successfully',
    data: { order }
  };

  res.status(200).json(response);
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404).json({
      success: false,
      message: 'Order not found'
    } as ApiResponse);
    return;
  }

  // Verify order belongs to user
  if (order.customer.toString() !== req.user!._id.toString()) {
    res.status(403).json({
      success: false,
      message: 'Access denied'
    } as ApiResponse);
    return;
  }

  // Can only cancel if order is still pending or confirmed
  if (!['pending', 'confirmed'].includes(order.status)) {
    res.status(400).json({
      success: false,
      message: 'Order cannot be cancelled at this stage'
    } as ApiResponse);
    return;
  }

  order.status = 'cancelled';
  await order.save();

  const response: ApiResponse = {
    success: true,
    message: 'Order cancelled successfully',
    data: { order }
  };

  res.status(200).json(response);
});

// @desc    Get order statistics (Admin only)
// @route   GET /api/orders/stats
// @access  Private (Admin)
export const getOrderStats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: 'pending' });
  const completedOrders = await Order.countDocuments({ status: 'delivered' });
  const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });

  // Get revenue from completed orders
  const revenueResult = await Order.aggregate([
    { $match: { status: 'delivered', paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);
  
  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

  const response: ApiResponse = {
    success: true,
    message: 'Order statistics retrieved successfully',
    data: {
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      totalRevenue
    }
  };

  res.status(200).json(response);
});
