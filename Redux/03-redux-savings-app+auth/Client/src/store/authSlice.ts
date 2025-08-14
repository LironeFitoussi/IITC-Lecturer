import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  balance: number;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

// Auth slice with synchronous actions
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login user (mock implementation)
    loginUser: (state, action: PayloadAction<LoginCredentials>) => {
      // Mock user data for demo purposes
      const mockUser: User = {
        id: '1',
        email: action.payload.email,
        firstName: 'Demo',
        lastName: 'User',
        balance: 1000,
        createdAt: new Date().toISOString()
      };
      
      state.user = mockUser;
      state.isAuthenticated = true;
    },

    // Register user (mock implementation)
    registerUser: (state, action: PayloadAction<RegisterCredentials>) => {
      // Mock user data for demo purposes
      const mockUser: User = {
        id: '1',
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        balance: 1000,
        createdAt: new Date().toISOString()
      };
      
      state.user = mockUser;
      state.isAuthenticated = true;
    },

    // Logout user
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    // Get current user (mock implementation)
    getCurrentUser: () => {
      // For demo, we'll just check if there's a user in localStorage or keep current state
      // This could be enhanced later when adding backend
    },

    // Update user balance
    updateUserBalance: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.balance = action.payload;
      }
    },

    // Clear auth state
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions
export const { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getCurrentUser, 
  updateUserBalance, 
  clearAuth 
} = authSlice.actions;

// Selectors
export const selectAuth = (state: { auth: AuthState; savings: any }) => state.auth;
export const selectUser = (state: { auth: AuthState; savings: any }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState; savings: any }) => state.auth.isAuthenticated;

export default authSlice.reducer;
