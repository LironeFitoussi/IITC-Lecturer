import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../types';

// Define the User document interface extending the base User type
export interface UserDocument extends Document, Omit<User, 'id'> {
  _id: mongoose.Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the User schema
const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
  toJSON: {
    transform: function(doc, ret) {
      delete (ret as any).password; // Remove password from JSON output
      return ret;
    }
  }
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 10
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const UserModel = mongoose.model<UserDocument>('User', userSchema);

// User operations wrapper to maintain compatibility with existing code
const UserOperations = {
  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user = new UserModel(userData);
    const savedUser = await user.save();
    
    console.log(`User created: ${savedUser.email}, Total users: ${await UserModel.countDocuments()}`);
    
    return {
      id: savedUser._id.toString(),
      email: savedUser.email,
      password: savedUser.password,
      name: savedUser.name,
      createdAt: savedUser.createdAt
    };
  },

  async findByEmail(email: string): Promise<User | undefined> {
    console.log(`Looking for user with email: ${email}`);
    
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    console.log(`Found user: ${user ? 'Yes' : 'No'}`);
    
    if (!user) return undefined;
    
    return {
      id: user._id.toString(),
      email: user.email,
      password: user.password,
      name: user.name,
      createdAt: user.createdAt
    };
  },

  async findById(id: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findById(id);
      
      if (!user) return undefined;
      
      return {
        id: user._id.toString(),
        email: user.email,
        password: user.password,
        name: user.name,
        createdAt: user.createdAt
      };
    } catch (error) {
      console.error('Error finding user by ID:', error);
      return undefined;
    }
  },

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    console.log(`Validating password...`);
    console.log(`Plain password length: ${plainPassword.length}`);
    console.log(`Hashed password: ${hashedPassword}`);
    
    const isValid = await bcrypt.compare(plainPassword, hashedPassword);
    console.log(`Password validation result: ${isValid}`);
    return isValid;
  },

  async emailExists(email: string): Promise<boolean> {
    const count = await UserModel.countDocuments({ email: email.toLowerCase() });
    return count > 0;
  },

  // Helper functions for development/debugging
  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.find({}).select('-password');
    
    return users.map(user => ({
      id: user._id.toString(),
      email: user.email,
      password: '', // Password is excluded by select
      name: user.name,
      createdAt: user.createdAt
    }));
  },

  async clearUsers(): Promise<void> {
    await UserModel.deleteMany({});
    console.log('All users cleared');
  },

  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await UserModel.findByIdAndDelete(id);
      const deleted = !!result;
      
      if (deleted) {
        console.log(`User deleted: ${id}, Total users: ${await UserModel.countDocuments()}`);
      } else {
        console.log(`User not found for deletion: ${id}`);
      }
      
      return deleted;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
};

export default UserOperations; 