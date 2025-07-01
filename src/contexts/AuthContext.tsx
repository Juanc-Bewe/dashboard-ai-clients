import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (pin: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const TOKEN_KEY = 'dashboard_jwt_token';

// Cookie utility functions
const setCookie = (name: string, value: string, hours: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (hours * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict`;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isAuthenticated = !!token;

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = getCookie(TOKEN_KEY);
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = async (pin: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - replace with your actual endpoint
      // For demo: PIN "1234" will work
      if (pin == '9796') {
        const mockJwt = 'mock-jwt-token-' + Date.now();
        
        // Save token to cookie with 12-hour expiration
        setCookie(TOKEN_KEY, mockJwt, 12);
        setToken(mockJwt);
        return true;
      }
      
      return false;
      
      /* 
      // Uncomment this when your API is ready:
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      });

      if (response.ok) {
        const data = await response.json();
        const jwt = data.token;
        
        // Save token to cookie with 12-hour expiration
        setCookie(TOKEN_KEY, jwt, 12);
        setToken(jwt);
        return true;
      }
      
      return false;
      */
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

    const logout = () => {
    setIsLoggingOut(true);
    removeCookie(TOKEN_KEY);
    setToken(null);
    
    // Navigate to login page without preserving any state or search parameters
    // This ensures a clean logout that doesn't remember previous URL parameters
    window.location.href = '/login';
  };

  const value: AuthContextType = {
    isAuthenticated,
    token,
    login,
    logout,
    loading,
    isLoggingOut,
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