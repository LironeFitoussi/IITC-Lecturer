import { Request, Response } from 'express';
import { AuthRequest, ApiResponse } from '../types';
import { generateToken } from '../utils/jwt';
import { asyncHandler } from '../middleware/errorHandler';
import User from '../models/User';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phone, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    } as ApiResponse);
    return;
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role || 'customer'
  });

  // Generate token
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role
  });

  const response: ApiResponse = {
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        isActive: user.isActive,
        createdAt: user.createdAt
      },
      token
    }
  };

  res.status(201).json(response);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.isActive) {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials or account inactive'
    } as ApiResponse);
    return;
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    } as ApiResponse);
    return;
  }

  // Generate token
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role
  });

  const response: ApiResponse = {
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        isActive: user.isActive,
        createdAt: user.createdAt
      },
      token
    }
  };

  res.status(200).json(response);
});

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const user = req.user!;

  const response: ApiResponse = {
    success: true,
    message: 'Profile retrieved successfully',
    data: {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    }
  };

  res.status(200).json(response);
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, phone, avatar } = req.body;
  const userId = req.user!._id;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, phone, avatar },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    } as ApiResponse);
    return;
  }

  const response: ApiResponse = {
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
        isActive: updatedUser.isActive,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
      }
    }
  };

  res.status(200).json(response);
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user!._id;

  // Get user with password
  const user = await User.findById(userId).select('+password');
  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    } as ApiResponse);
    return;
  }

  // Check current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    res.status(400).json({
      success: false,
      message: 'Current password is incorrect'
    } as ApiResponse);
    return;
  }

  // Update password
  user.password = newPassword;
  await user.save();

  const response: ApiResponse = {
    success: true,
    message: 'Password changed successfully'
  };

  res.status(200).json(response);
});

// @desc    Refresh token
// @route   POST /api/auth/refresh
// @access  Private
export const refreshToken = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const user = req.user!;

  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role
  });

  const response: ApiResponse = {
    success: true,
    message: 'Token refreshed successfully',
    data: { token }
  };

  res.status(200).json(response);
});
