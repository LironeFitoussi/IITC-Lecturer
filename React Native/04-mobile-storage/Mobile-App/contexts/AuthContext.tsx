import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { User, LoginRequest, RegisterRequest } from '../types';
import ApiService from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // Initialize auth state on app start
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem('authToken'),
        AsyncStorage.getItem('user'),
      ]);

      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        ApiService.setAuthToken(storedToken);
        
        // Refresh user data from server
        try {
          await refreshUserData();
        } catch (error) {
          // If refresh fails, clear stored data
          await logout();
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await ApiService.login(credentials);
      
      // Store token and user data
      await Promise.all([
        AsyncStorage.setItem('authToken', response.token),
        AsyncStorage.setItem('user', JSON.stringify(response.user)),
      ]);
      
      setUser(response.user);
      ApiService.setAuthToken(response.token);
      
      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
        text2: `Hello ${response.user.name}`,
      });
      
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: errorMessage,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await ApiService.register(userData);
      
      // Store token and user data
      await Promise.all([
        AsyncStorage.setItem('authToken', response.token),
        AsyncStorage.setItem('user', JSON.stringify(response.user)),
      ]);
      
      setUser(response.user);
      ApiService.setAuthToken(response.token);
      
      Toast.show({
        type: 'success',
        text1: 'Welcome!',
        text2: `Account created successfully`,
      });
      
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: errorMessage,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Clear stored data
      await Promise.all([
        AsyncStorage.removeItem('authToken'),
        AsyncStorage.removeItem('user'),
        AsyncStorage.removeItem('cart'), // Clear cart on logout
      ]);
      
      setUser(null);
      ApiService.removeAuthToken();
      
      Toast.show({
        type: 'info',
        text1: 'Goodbye!',
        text2: 'You have been logged out',
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    try {
      const updatedUser = await ApiService.updateProfile(userData);
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your profile has been updated successfully',
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Update failed';
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: errorMessage,
      });
      throw error;
    }
  };

  const refreshUserData = async (): Promise<void> => {
    try {
      const updatedUser = await ApiService.getProfile();
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error refreshing user data:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

