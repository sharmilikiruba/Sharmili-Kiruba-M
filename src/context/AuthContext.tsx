'use client';

// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types
export type UserRole = 'student' | 'warden' | 'guard' | 'admin';

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
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
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

  // Check if user is already logged in (e.g., from localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check localStorage for saved user data
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (savedUser && token) {
          // Validate token with backend (in real app)
          // For now, just parse saved user
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // In real app, make API call to backend
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();

      // Mock login - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      // Mock user data based on email
      let mockUser: User;
      
      if (email.includes('student')) {
        mockUser = {
          id: '1',
          name: 'Rahul Sharma',
          email: 'rahul.sharma@university.edu',
          role: 'student',
          hostelInfo: 'Krishna Hostel',
          roomInfo: 'Room A-204',
          phone: '+91 98765 43210'
        };
      } else if (email.includes('warden')) {
        mockUser = {
          id: '2',
          name: 'Dr. Priya Mehta',
          email: 'priya.mehta@university.edu',
          role: 'warden',
          hostelInfo: 'Krishna Hostel',
          phone: '+91 98765 43211'
        };
      } else if (email.includes('guard')) {
        mockUser = {
          id: '3',
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@university.edu',
          role: 'guard',
          phone: '+91 98765 43212'
        };
      } else if (email.includes('admin')) {
        mockUser = {
          id: '4',
          name: 'Admin User',
          email: 'admin@university.edu',
          role: 'admin',
          phone: '+91 98765 43213'
        };
      } else {
        throw new Error('Invalid credentials');
      }

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token'); // In real app, save actual JWT

      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // In real app, make API call to invalidate token
    // await fetch('/api/auth/logout', { method: 'POST' });

    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    setUser(null);
  };

  // Update user information
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser
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