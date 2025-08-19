import { Request } from 'express';
import { Document, Types } from 'mongoose';

// User Types
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'staff' | 'customer';
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Restaurant Types
export interface IRestaurant extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  cuisine: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  hours: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
  images: string[];
  rating: number;
  priceRange: 1 | 2 | 3 | 4; // $ to $$$$
  features: string[];
  owner: Types.ObjectId; // User ID
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Menu Types
export interface IMenuItem extends Document {
  _id: Types.ObjectId;
  restaurant: Types.ObjectId; // Restaurant ID
  name: string;
  description: string;
  price: number;
  category: string;
  ingredients: string[];
  allergens: string[];
  image?: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isAvailable: boolean;
  preparationTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export interface IOrder extends Document {
  _id: Types.ObjectId;
  customer: Types.ObjectId; // User ID
  restaurant: Types.ObjectId; // Restaurant ID
  items: {
    menuItem: Types.ObjectId; // MenuItem ID
    quantity: number;
    price: number;
    specialInstructions?: string;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    instructions?: string;
  };
  estimatedDeliveryTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Types
export interface AuthRequest extends Request {
  user?: IUser;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Query Types
export interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  search?: string;
}

export interface RestaurantQuery extends QueryOptions {
  cuisine?: string;
  priceRange?: number;
  rating?: number;
  city?: string;
  features?: string;
}

export interface MenuQuery extends QueryOptions {
  category?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  maxPrice?: number;
  minPrice?: number;
}
