import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  User, 
  Restaurant, 
  MenuItem, 
  Order,
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  RestaurantQuery,
  MenuQuery 
} from '../types';

// Simple axios instance with hardcoded IP
const api = axios.create({
  baseURL: 'http://192.168.1.64:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(async (config: any) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

class ApiService {

  // Auth Methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    return (response.data as any).data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData);
    return (response.data as any).data;
  }

  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return (response.data as any).data.user;
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put('/auth/profile', userData);
    return (response.data as any).data.user;
  }

  async changePassword(passwords: { currentPassword: string; newPassword: string }): Promise<void> {
    await api.put('/auth/change-password', passwords);
  }

  async refreshToken(): Promise<string> {
    const response = await api.post('/auth/refresh');
    return (response.data as any).data.token;
  }

  // Restaurant Methods
  async getRestaurants(query: RestaurantQuery = {}): Promise<{
    restaurants: Restaurant[];
    pagination?: any;
  }> {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/restaurants?${params.toString()}`);
    return {
      restaurants: (response.data as any).data.restaurants,
      pagination: (response.data as any).pagination,
    };
  }

  async getRestaurant(id: string): Promise<Restaurant> {
    const response = await api.get(`/restaurants/${id}`);
    return (response.data as any).data.restaurant;
  }

  // Menu Methods
  async getMenuItems(restaurantId: string, query: MenuQuery = {}): Promise<{
    menuItems: MenuItem[];
    restaurant: { id: string; name: string };
    pagination?: any;
  }> {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/restaurants/${restaurantId}/menu?${params.toString()}`);
    return {
      menuItems: (response.data as any).data.menuItems,
      restaurant: (response.data as any).data.restaurant,
      pagination: (response.data as any).pagination,
    };
  }

  async getMenuItem(id: string): Promise<MenuItem> {
    const response = await api.get(`/menu/${id}`);
    return (response.data as any).data.menuItem;
  }

  async getMenuCategories(restaurantId: string): Promise<string[]> {
    const response = await api.get(`/restaurants/${restaurantId}/menu/categories`);
    return (response.data as any).data.categories;
  }

  // Order Methods
  async createOrder(orderData: any): Promise<Order> {
    const response = await api.post('/orders', orderData);
    return (response.data as any).data.order;
  }

  async getOrders(): Promise<Order[]> {
    const response = await api.get('/orders');
    return (response.data as any).data;
  }

  async getOrder(id: string): Promise<Order> {
    const response = await api.get(`/orders/${id}`);
    return (response.data as any).data.order;
  }

  // Utility Methods
  setAuthToken(token: string) {
    (api.defaults.headers as any).Authorization = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete (api.defaults.headers as any).Authorization;
  }

  // Test connection to server
  async testConnection(): Promise<{ success: boolean; message: string; baseUrl: string }> {
    try {
      await api.get('/health', { timeout: 5000 });
      return {
        success: true,
        message: 'Successfully connected to server',
        baseUrl: 'http://192.168.1.64:5000/api'
      };
    } catch (error: any) {
      let errorMessage = 'Failed to connect to server';
      
      if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        errorMessage = `Network error: Cannot reach server at http://192.168.1.64:5000/api. Make sure:
1. Your server is running on port 5000
2. Your mobile device is on the same WiFi network
3. The IP address (192.168.1.64) is correct for your network`;
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = `Connection refused: Server is not running on http://192.168.1.64:5000/api`;
      } else if (error.response?.status) {
        errorMessage = `Server error: ${error.response.status} - ${error.response.statusText}`;
      }
      
      return {
        success: false,
        message: errorMessage,
        baseUrl: 'http://192.168.1.64:5000/api'
      };
    }
  }

  // Get current base URL (for debugging)
  getBaseURL(): string {
    return 'http://192.168.1.64:5000/api';
  }
}

export default new ApiService();

