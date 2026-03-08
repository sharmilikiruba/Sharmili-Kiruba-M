'use client';

// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '@/lib/api-client';
import { useRouter } from 'next/navigation';

// Define user types
export type UserRole = 'student' | 'warden' | 'guard' | 'admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hostelInfo?: string;
  roomInfo?: string;
  phone?: string;
  avatar?: string;
}

// Define authentication context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, role: string) => Promise<User>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

// Create context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is already logged in (e.g., from localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check sessionStorage for saved user data
        const savedUser = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('auth_token');

        if (savedUser && savedUser !== 'undefined' && token) {
          // Parse and validate saved user
          const parsedUser = JSON.parse(savedUser);

          // Normalize role to lowercase
          if (parsedUser.role) {
            parsedUser.role = parsedUser.role.toLowerCase();
          }

          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid data
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('auth_token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string, role: string) => {
    try {
      // NOTE: We intentionally do NOT set the global isLoading here.
      // The login page manages its own local loading state.
      // Setting isLoading=true globally would cause DashboardLayout to show
      // an infinite spinner when navigating to the admin dashboard.
      setError(null);

      // Backend often expects capitalized roles but lowercase emails
      const normalizedEmail = email.trim().toLowerCase();
      const payloadRole = role.trim(); // Keep original casing (Admin, Guard, etc.)

      const response = await apiClient.post('auth/login', {
        email: normalizedEmail,
        password,
        role: payloadRole
      });

      // Handle both nested { token, user } and flat { token, ...userData } responses
      const { token, user: nestedUser, ...flatUser } = response.data;
      const userData = nestedUser || flatUser;
      const authToken = token || response.data.accessToken;

      if (!userData || !authToken) {
        throw new Error('Invalid response from server');
      }

      // Normalize internal role to lowercase to match UserRole type
      const internalRole = (userData.role || payloadRole).toLowerCase() as UserRole;

      // Ensure user object has required fields
      const normalizedUser: User = {
        id: userData.id || userData.user_id || userData._id || 'unknown',
        name: userData.name || userData.username || 'User',
        email: userData.email || normalizedEmail,
        role: internalRole,
        hostelInfo: userData.hostelInfo || userData.hostel_info,
        roomInfo: userData.roomInfo || userData.room_info,
        phone: userData.phone,
        avatar: userData.avatar
      };

      // Save to sessionStorage
      sessionStorage.setItem('auth_token', authToken);
      sessionStorage.setItem('user', JSON.stringify(normalizedUser));

      setUser(normalizedUser);
      return normalizedUser;
    } catch (error: any) {
      console.error('Login failed:', error);

      let errorMessage = 'Login failed. Please try again.';
      const errorData = error.response?.data;
      if (typeof errorData?.message === 'string') {
        errorMessage = errorData.message;
      } else if (errorData?.error?.message) {
        errorMessage = errorData.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Handle specific error cases
      if (errorMessage.toLowerCase().includes('account locked')) {
        errorMessage = 'Account is locked due to multiple failed attempts. Please try again later.';
      } else if (errorMessage.toLowerCase().includes('invalid credentials') ||
        errorMessage.toLowerCase().includes('role mismatch')) {
        errorMessage = 'Invalid email, password, or role selected.';
      } else if (error.response?.status === 404) {
        errorMessage = 'User not found. Please check your email.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    }
    // No finally block needed: we don't manage global isLoading in login().
  };

  // Logout function
  const logout = () => {
    // Clear sessionStorage
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('auth_token');

    setUser(null);
    setError(null);
    router.push('/login/login_page');
  };

  // Update user information
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };

      // Normalize role if updated
      if (updatedUser.role) {
        updatedUser.role = updatedUser.role.toLowerCase() as UserRole;
      }

      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    updateUser,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;