import axios from 'axios';
import type { DashboardApiResponse, DashboardFilters, Enterprise } from '../types/dashboard';
import dashboardMetrics from '../mocks/dashboardMetrics';

// API configuration
const API_BASE_URL = 'https://lindabackendqa.bewe.co';
const API_PIN = 'A3B5K9';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'accept': 'application/json',
    'x-analytics-pin': API_PIN
  }
});

// Mock enterprises data
export const mockEnterprises: Enterprise[] = [
  { id: '67d1ff17d9f450bbf6684a81', name: 'Bewe' },
  { id: '6331d0e09660361198fdd08d', name: 'Guru' },
  { id: '68096b49af47c25355650547', name: 'Adn' },
];

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
  // Fetch dashboard data from real API
  async fetchDashboardData(filters: DashboardFilters): Promise<DashboardApiResponse> {
    try {
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

  // Fetch enterprises (still using mock data)
  async fetchEnterprises(): Promise<Enterprise[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('Service returning enterprises:', mockEnterprises);
    return mockEnterprises;
  }
}; 