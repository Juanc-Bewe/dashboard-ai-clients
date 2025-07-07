import axios from 'axios';
import config from '../config';

const PIN_KEY = 'dashboard_analytics_pin';

// Cookie utility function
export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Function to get current PIN from cookie
export const getCurrentPin = (): string | null => {
  return getCookie(PIN_KEY);
};

// Helper function to get browser timezone offset in hours
export const getBrowserTimezoneOffset = (): number => {
  // getTimezoneOffset() returns the offset in minutes from UTC
  // Positive values indicate timezone is behind UTC, negative values indicate ahead of UTC
  // We need to convert to hours and invert the sign to match the API expectation
  const offsetInMinutes = new Date().getTimezoneOffset();
  const offsetInHours = -offsetInMinutes / 60;
  return offsetInHours;
};

// Create axios instance with default config and interceptors
export const createApiClient = () => {
  const apiClient = axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
      'accept': 'application/json'
    }
  });

  // Add request interceptor to dynamically add the PIN header
  apiClient.interceptors.request.use((config) => {
    const pin = getCurrentPin();
    if (pin) {
      config.headers['x-analytics-pin'] = pin;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return apiClient;
};

// Common date formatting utility
export const formatDateForApi = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper to get default date range (last 30 days)
export const getDefaultDateRange = (): { startDate: string; endDate: string } => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  return {
    startDate: formatDateForApi(startDate),
    endDate: formatDateForApi(endDate)
  };
}; 