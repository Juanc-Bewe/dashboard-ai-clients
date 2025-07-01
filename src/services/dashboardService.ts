import axios from 'axios';
import type { DashboardApiResponse, DashboardFilters } from '../types/dashboard';
import dashboardMetrics from '../mocks/dashboardMetrics';

// API configuration
const API_BASE_URL = 'https://lindabackendqa.bewe.co';
const PIN_KEY = 'dashboard_analytics_pin';

// Cookie utility function
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

// Function to get current PIN from cookie
const getCurrentPin = (): string | null => {
  return getCookie(PIN_KEY);
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
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

// Remove mock enterprises - using data from auth context instead

// Mock dashboard data based on the real API response
export const mockDashboardData: DashboardApiResponse = dashboardMetrics  as unknown as DashboardApiResponse;

// Helper function to get browser timezone offset in hours
const getBrowserTimezoneOffset = (): number => {
  // getTimezoneOffset() returns the offset in minutes from UTC
  // Positive values indicate timezone is behind UTC, negative values indicate ahead of UTC
  // We need to convert to hours and invert the sign to match the API expectation
  const offsetInMinutes = new Date().getTimezoneOffset();
  const offsetInHours = -offsetInMinutes / 60;
  return offsetInHours;
};

// API service functions
export const dashboardService = {
  // Validate PIN against API
  async validatePin(pin: string): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const response = await apiClient.post('/lite/v1/analytics/auth', {
        pin: pin
      });

      // If we get a successful response, return the full response data
      if (response.status === 201) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      }

      return { success: false };
    } catch (error) {
      console.error('Error validating PIN:', error);
      return { success: false };
    }
  },

  // Fetch dashboard data from real API
  async fetchDashboardData(filters: DashboardFilters): Promise<DashboardApiResponse> {
    try {
      // Check if PIN is available
      const pin = getCurrentPin();
      if (!pin) {
        throw new Error('Authentication PIN not found. Please log in again.');
      }

      // Build params object, only including values that have content
      const params: Record<string, string | number> = {};

      if (filters.startDate) {
        params.startDate = filters.startDate;
      }

      if (filters.endDate) {
        params.endDate = filters.endDate;
      }

      if (filters.enterpriseIds && filters.enterpriseIds.length > 0) {
        params.enterpriseIds = filters.enterpriseIds.join(',');
      }

      // Use provided timezone offset or get it from browser
      const timezoneOffset = filters.timezoneOffset !== undefined && filters.timezoneOffset !== null
        ? filters.timezoneOffset
        : getBrowserTimezoneOffset();

      params.timezoneOffset = timezoneOffset;

      console.log('params', params);

      const response = await apiClient.get('/lite/v1/analytics', { params });

      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  },

  // Enterprises are now provided by auth context - method removed
}; 