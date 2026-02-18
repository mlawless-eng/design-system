import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthMethod } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (method: AuthMethod) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('auth_token');
    if (token) {
      // TODO: Verify token and fetch user
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (method: AuthMethod) => {
    setIsLoading(true);

    try {
      // Mock authentication - replace with real API calls
      const mockUser: User = {
        id: 'user-123',
        email: method === 'wallet' ? undefined : `user@${method}.com`,
        walletAddress: method === 'wallet' ? '0x1234...5678' : undefined,
        displayName: `${method} User`,
        isOnboarded: false, // Always false for new users
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store mock token
      localStorage.setItem('auth_token', 'mock-jwt-token');

      // Set user
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
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
