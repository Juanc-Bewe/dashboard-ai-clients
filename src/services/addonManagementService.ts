import type { AddonManagementApiResponse, AddonManagementFilters } from '../types/addon-managment';
import { 
  getCurrentPin, 
  getBrowserTimezoneOffset, 
  createApiClient, 
  formatDateForApi, 
  getDefaultDateRange 
} from '../utils/apiHelpers';

// Create API client instance
const apiClient = createApiClient();

// API service functions
export const addonManagementService = {
  // Fetch addon management data from real API
  async fetchAddonManagementData(filters: AddonManagementFilters): Promise<AddonManagementApiResponse> {
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

      // Handle accountIds as separate query parameters
      let accountIdsArray: string[] = [];
      if (filters.accountIds && filters.accountIds.length > 0) {
        accountIdsArray = filters.accountIds;
      }

      // Handle enterpriseIds as separate query parameters
      let enterpriseIdsArray: string[] = [];
      if (filters.enterpriseIds && filters.enterpriseIds.length > 0) {
        enterpriseIdsArray = filters.enterpriseIds;
      }

      // Use provided timezone offset or get it from browser
      const timezoneOffset = filters.timezoneOffset !== undefined && filters.timezoneOffset !== null
        ? filters.timezoneOffset
        : getBrowserTimezoneOffset();

      params.timezoneOffset = timezoneOffset;

      console.log('Addon Management API params:', params);
      console.log('accountIdsArray:', accountIdsArray);
      console.log('enterpriseIdsArray:', enterpriseIdsArray);

      const response = await apiClient.get('/lite/v1/analytics/business', { 
        params,
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          
          // Add regular params
          Object.entries(params).forEach(([key, value]) => {
            if (key !== 'accountIds' && key !== 'enterpriseIds') {
              searchParams.append(key, String(value));
            }
          });
          
          // Add each accountId as a separate parameter
          accountIdsArray.forEach(id => {
            searchParams.append('accountIds', id);
          });
          
          // Add each enterpriseId as a separate parameter
          enterpriseIdsArray.forEach(id => {
            searchParams.append('enterpriseIds', id);
          });
          
          return searchParams.toString();
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching addon management data:', error);
      throw new Error('Failed to fetch addon management data');
    }
  },

  // Helper method to format date for API (YYYY-MM-DD format)
  formatDateForApi,

  // Helper method to get default date range (last 30 days)
  getDefaultDateRange
}; 