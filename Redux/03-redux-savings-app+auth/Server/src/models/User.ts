import User, { IUser } from './UserModel';
import mongoose from 'mongoose';

// User operations using Mongoose
const UserModel = {
  async create(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<IUser> {
    try {
      const user = new User(userData);
      await user.save();
      console.log(`✅ User created: ${user.email}`);
      return user;
    } catch (error: any) {
      console.error(`❌ Error creating user:`, error.message);
      throw error;
    }
  },

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      console.log(`🔍 Looking for user with email: ${email}`);
      const user = await User.findOne({ email }).select('+password');
      console.log(`${user ? '✅' : '❌'} User ${user ? 'found' : 'not found'}`);
      return user;
    } catch (error: any) {
      console.error(`❌ Error finding user by email:`, error.message);
      throw error;
    }
  },

  async findById(id: string): Promise<IUser | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      return await User.findById(id);
    } catch (error: any) {
      console.error(`❌ Error finding user by ID:`, error.message);
      throw error;
    }
  },

  async validatePassword(plainPassword: string, user: IUser): Promise<boolean> {
    try {
      console.log(`🔐 Validating password for user: ${user.email}`);
      const isValid = await user.comparePassword(plainPassword);
      console.log(`${isValid ? '✅' : '❌'} Password validation: ${isValid ? 'SUCCESS' : 'FAILED'}`);
      return isValid;
    } catch (error: any) {
      console.error(`❌ Error validating password:`, error.message);
      return false;
    }
  },

  async emailExists(email: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email });
      return !!user;
    } catch (error: any) {
      console.error(`❌ Error checking email existence:`, error.message);
      return false;
    }
  },

  async updateBalance(userId: string, newBalance: number): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { balance: newBalance },
        { new: true, runValidators: true }
      );
      
      if (user) {
        console.log(`💰 Balance updated for ${user.email}: $${newBalance.toFixed(2)}`);
      }
      
      return user;
    } catch (error: any) {
      console.error(`❌ Error updating balance:`, error.message);
      throw error;
    }
  },

  // Helper functions for development/debugging
  async getAllUsers(): Promise<IUser[]> {
    try {
      return await User.find({}).sort({ createdAt: -1 });
    } catch (error: any) {
      console.error(`❌ Error getting all users:`, error.message);
      return [];
    }
  },

  async clearUsers(): Promise<void> {
    try {
      await User.deleteMany({});
      console.log('🗑️ All users cleared from database');
    } catch (error: any) {
      console.error(`❌ Error clearing users:`, error.message);
    }
  },

  async deleteUser(id: string): Promise<boolean> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return false;
      }

      const result = await User.findByIdAndDelete(id);
      
      if (result) {
        console.log(`🗑️ User deleted: ${result.email}`);
        return true;
      } else {
        console.log(`❌ User not found for deletion: ${id}`);
        return false;
      }
    } catch (error: any) {
      console.error(`❌ Error deleting user:`, error.message);
      return false;
    }
  }
};

export default UserModel; 