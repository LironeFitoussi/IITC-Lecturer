import { Request, Response } from 'express';
import { AuthRequest, ApiResponse, QueryOptions } from '../types';
import { asyncHandler } from '../middleware/errorHandler';
import User from '../models/User';

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    page = 1,
    limit = 10,
    sort = '-createdAt',
    search,
    role
  } = req.query as QueryOptions & { role?: string };

  // Build query
  let query: any = {};
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (role) {
    query.role = role;
  }

  // Execute query with pagination
  const skip = (Number(page) - 1) * Number(limit);
  const users = await User.find(query)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await User.countDocuments(query);
  const pages = Math.ceil(total / Number(limit));

  const response: ApiResponse = {
    success: true,
    message: 'Users retrieved successfully',
    data: { users },
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages
    }
  };

  res.status(200).json(response);
});

// @desc    Get single user (Admin/Manager)
// @route   GET /api/users/:id
// @access  Private/Admin/Manager
export const getUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    } as ApiResponse);
    return;
  }

  const response: ApiResponse = {
    success: true,
    message: 'User retrieved successfully',
    data: { user }
  };

  res.status(200).json(response);
});

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, role, phone, isActive } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role, phone, isActive },
    { new: true, runValidators: true }
  );

  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    } as ApiResponse);
    return;
  }

  const response: ApiResponse = {
    success: true,
    message: 'User updated successfully',
    data: { user }
  };

  res.status(200).json(response);
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.params.id;
  const currentUser = req.user!;

  // Prevent self-deletion
  if (userId === currentUser._id.toString()) {
    res.status(400).json({
      success: false,
      message: 'You cannot delete your own account'
    } as ApiResponse);
    return;
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    } as ApiResponse);
    return;
  }

  // Soft delete by setting isActive to false
  user.isActive = false;
  await user.save();

  const response: ApiResponse = {
    success: true,
    message: 'User deleted successfully'
  };

  res.status(200).json(response);
});

// @desc    Get user statistics (Admin only)
// @route   GET /api/users/stats
// @access  Private/Admin
export const getUserStats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const stats = await User.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 }
      }
    }
  ]);

  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const inactiveUsers = totalUsers - activeUsers;

  // Get recent registrations (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentRegistrations = await User.countDocuments({
    createdAt: { $gte: thirtyDaysAgo }
  });

  const response: ApiResponse = {
    success: true,
    message: 'User statistics retrieved successfully',
    data: {
      totalUsers,
      activeUsers,
      inactiveUsers,
      recentRegistrations,
      roleDistribution: stats
    }
  };

  res.status(200).json(response);
});
