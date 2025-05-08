'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  isAuthenticated as checkAuth,
  logout as authLogout,
  getCurrentUser,
  getUserData,
} from '@/service/authService';
import { User } from '@/interface/user';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
  isLoading: boolean;
  syncAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const syncAuth = async () => {
    const status = checkAuth();
    setIsAuthenticated(status);
    
    if (status) {
      try {
        // Try to get fresh user data from the server
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        // If server request fails, fall back to cached data
        const cachedUser = getCurrentUser();
        setUser(cachedUser);
      }
    } else {
      setUser(null);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    // Initial auth check
    syncAuth();

    // Optional: Poll every minute if you want auto logout on token expiry
    const interval = setInterval(syncAuth, 60000);
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    // Clear auth state first
    authLogout();
    
    // Reset all state
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(true);

    // Clear any cached data
    if (typeof window !== 'undefined') {
      // Clear any cached data in sessionStorage
      sessionStorage.clear();
      
      // Clear any cached data in localStorage except auth data (already cleared by authLogout)
      const keysToKeep = ['token', 'refreshToken', 'tokenExpiry', 'user'];
      Object.keys(localStorage).forEach(key => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });
    }

    // Navigate to login page
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout, isLoading, syncAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
