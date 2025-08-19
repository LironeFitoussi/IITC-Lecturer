// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff' | 'customer';
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Restaurant Types
export interface Restaurant {
  _id: string;
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
  priceRange: 1 | 2 | 3 | 4;
  features: string[];
  owner: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Menu Item Types
export interface MenuItem {
  _id: string;
  restaurant: string;
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
  preparationTime: number;
  createdAt: string;
  updatedAt: string;
}

// Cart Types
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Cart {
  restaurant: Restaurant;
  items: CartItem[];
  totalAmount: number;
}

// Order Types
export interface Order {
  _id: string;
  customer: string;
  restaurant: Restaurant;
  items: {
    menuItem: MenuItem;
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
  estimatedDeliveryTime?: string;
  createdAt: string;
  updatedAt: string;
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

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
  RestaurantDetail: { restaurantId: string };
  MenuItemDetail: { menuItemId: string };
  Cart: undefined;
  OrderSummary: undefined;
  OrderConfirmation: { orderId: string };
  Profile: undefined;
};

// Query Types
export interface RestaurantQuery {
  page?: number;
  limit?: number;
  search?: string;
  cuisine?: string;
  priceRange?: number;
  rating?: number;
  city?: string;
  features?: string;
}

export interface MenuQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  maxPrice?: number;
  minPrice?: number;
}
