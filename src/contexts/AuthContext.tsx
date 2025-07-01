import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { dashboardService } from '../services/dashboardService';

interface AuthContextType {
  isAuthenticated: boolean;
  pin: string | null;
  login: (pin: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const PIN_KEY = 'dashboard_analytics_pin';

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
  const [pin, setPin] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isAuthenticated = !!pin;

  // Check for existing PIN on mount
  useEffect(() => {
    const savedPin = getCookie(PIN_KEY);
    if (savedPin) {
      setPin(savedPin);
    }
    setLoading(false);
  }, []);

  const login = async (inputPin: string): Promise<boolean> => {
    try {
      setLoading(true);

      // Validate PIN against the API
      const isValid = await dashboardService.validatePin(inputPin);

      if (isValid) {
        // Save PIN to cookie with 12-hour expiration
        console.log('saving pin to cookie', inputPin);
        setCookie(PIN_KEY, inputPin, 12);
        setPin(inputPin);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsLoggingOut(true);
    removeCookie(PIN_KEY);
    setPin(null);

    // Navigate to login page without preserving any state or search parameters
    // This ensures a clean logout that doesn't remember previous URL parameters
    window.location.href = '/login';
  };

  const value: AuthContextType = {
    isAuthenticated,
    pin,
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