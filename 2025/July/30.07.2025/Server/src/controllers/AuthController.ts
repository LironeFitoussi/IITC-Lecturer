import { Request, Response } from 'express';
import { LoginRequest, RegisterRequest } from '../types';
import UserModel from '../models/User';
import bcrypt from 'bcryptjs';
import { AuthRequest, generateAccessToken } from '../middleware/auth';

const validatePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword)
}

const AuthController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name }: RegisterRequest = req.body;

      if (!email || !password || !name) {
        res.status(400).json({ message: 'Missing Fields' });
        return;
      }

      // Check if user already exists
      const existingUser = await UserModel.findOne({email});
      console.log(existingUser);
      
      if (existingUser ) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Create new user
      // CREATE HASHED PASSWORD
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({ 
        email, 
        password: hashedPassword, 
        name 
      });
      
      await user.save()
      console.log(`User created: ${user.email}`);

      // Generate token
      const token = generateAccessToken({ userId: user._id, email: user.email });

      // Set HTTP-only cookie
      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: LoginRequest = req.body;

      // Find user
      const user = await UserModel.findOne({email});
      if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      // Validate password
      const isValid = await validatePassword(password, user.password);
      if (!isValid) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      // Generate token
      const token = generateAccessToken({ userId: user.id, email: user.email });

      // Set HTTP-only cookie
      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  },

  async getMe(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = await UserModel.findById(req.user!.userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      console.error('GetMe error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Server error during logout' });
    }
  },

  async getAllUsers(req: AuthRequest, res: Response): Promise<void> {
    try {
      const users = await UserModel.find();
      
      // Remove password field from response
      const safeUsers = users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));

      res.json({
        message: `Found ${safeUsers.length} users`,
        users: safeUsers,
        total: safeUsers.length
      });
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({ message: 'Server error while fetching users' });
    }
  },

  async deleteUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      console.log(`🗑️ Delete request: User ${req.user!.userId} trying to delete user ${id}`);
      
      // Prevent users from deleting themselves (optional safety check)
      if (id === String(req.user!.userId)) {
        console.log(`❌ Self-deletion attempt blocked`);
        res.status(400).json({ message: 'Cannot delete your own account using this endpoint' });
        return;
      }

      const user = await UserModel.findById(id);
      if (!user) {
        console.log(`❌ User ${id} not found`);
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const deleted = await UserModel.findByIdAndDelete(id);
      
      if (deleted) {
        console.log(`✅ User ${id} deleted successfully`);
        res.json({ 
          message: 'User deleted successfully',
          deletedUser: {
            id: user.id,
            email: user.email,
            name: user.name
          }
        });
      } else {
        console.log(`❌ Failed to delete user ${id}`);
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ message: 'Server error while deleting user' });
    }
  }
};

export default AuthController; 