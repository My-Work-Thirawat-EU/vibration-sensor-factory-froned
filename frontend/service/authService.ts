import axios, { AxiosError } from 'axios';
import axiosInstance from './axios';
import { LoginResponse } from '@/interface/login';
import { User } from '@/interface/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Token storage keys
const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_EXPIRY_KEY = 'tokenExpiry';
const USER_KEY = 'user';

// Helper function to safely store data in localStorage
const safeStorageSet = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error storing ${key} in localStorage:`, error);
  }
};

// Helper function to safely get data from localStorage
const safeStorageGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return null;
  }
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/api/login', {
      username,
      password,
    });
    const { user, token, refresh_token, token_expiry } = response.data;
    
    // Store tokens and user data
    safeStorageSet(TOKEN_KEY, token);
    safeStorageSet(REFRESH_TOKEN_KEY, refresh_token);
    safeStorageSet(TOKEN_EXPIRY_KEY, new Date(token_expiry).toISOString());
    safeStorageSet(USER_KEY, JSON.stringify(user));

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw new Error('Invalid username or password');
      }
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const logout = () => {
  try {
    // Clear all auth-related data
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    localStorage.removeItem(USER_KEY);
    
    // Clear any pending requests
    if (axiosInstance.defaults.headers.common['Authorization']) {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const getCurrentUser = (): User | null => {
  const userStr = safeStorageGet(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
  
};

export const getUserData = async (): Promise<User> => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('No user data available');
    }

    const response = await axiosInstance.get('/api/users/' + currentUser.id);
    let user = response.data;

    // Patch: convert _id.$oid to id if needed
    if (user._id && user._id.$oid) {
      user.id = user._id.$oid;
    }
    // Fallback for username/organization
    user.username = user.username || 'Unknown';
    user.organization = user.organization || 'Unknown';

    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
    throw error;
  }
};

export const getToken = (): string | null => {
  return safeStorageGet(TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return safeStorageGet(REFRESH_TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  const tokenExpiry = safeStorageGet(TOKEN_EXPIRY_KEY);
  
  if (!token || !tokenExpiry) return false;

  const expiryDate = new Date(tokenExpiry);
  if (isNaN(expiryDate.getTime())) return false;

  // Check if token is expired or will expire in the next 5 minutes
  const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000);
  return expiryDate > fiveMinutesFromNow;
};

export const refreshToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await axiosInstance.post<LoginResponse>('/api/refresh-token', {
      refresh_token: refreshToken,
    });

    const { token, refresh_token, token_expiry } = response.data;
    
    safeStorageSet(TOKEN_KEY, token);
    safeStorageSet(REFRESH_TOKEN_KEY, refresh_token);
    safeStorageSet(TOKEN_EXPIRY_KEY, new Date(token_expiry).toISOString());

    return true;
  } catch (error) {
    console.error('Token refresh failed:', error);
    logout(); // Clear invalid tokens
    return false;
  }
}; 