import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Configure axios to include credentials
axios.defaults.withCredentials = true;

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface Room {
  _id: string;
  name: string;
  description?: string;
  createdBy: { _id: string; username: string };
  users: string[];
  isPrivate: boolean;
  createdAt: string;
}

class AuthService {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  }

  async logout(): Promise<void> {
    await axios.post(`${API_BASE_URL}/logout`);
  }

  async validateToken(): Promise<User> {
    const response = await axios.get(`${API_BASE_URL}/validate`);
    return response.data;
  }

  async getUserRooms(): Promise<Room[]> {
    const response = await axios.get(`${API_BASE_URL}/user/rooms`);
    return response.data;
  }

  async getAllRooms(): Promise<Room[]> {
    const response = await axios.get(`${API_BASE_URL}/rooms`);
    return response.data;
  }
}

export const authService = new AuthService(); 