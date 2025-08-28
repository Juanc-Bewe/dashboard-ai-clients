import type {
  EmailAnalyticsApiResponse,
  EmailsAnalytics,
  EmailAnalyticsFilters
} from '../types/email-analytics-v2';
import { createApiClient } from '../utils/apiHelpers';

// Create API client instance
const apiClient = createApiClient();

export const emailAnalyticsService = {
  /**
   * Fetch email analytics data using new API structure
   * @param filters Optional filters for date range, timezone, account, etc.
   * @returns Promise<EmailAnalyticsApiResponse>
   */
  async getEmailAnalytics(filters?: EmailAnalyticsFilters): Promise<EmailAnalyticsApiResponse> {
    try {
      // Use default filters if none provided or if required fields are missing
      const defaultFilters = this.getDefaultFilters();
      const mergedFilters = { ...defaultFilters, ...filters };

      const params: Record<string, any> = {
        startDate: mergedFilters.startDate,
        endDate: mergedFilters.endDate,
        timezoneOffset: mergedFilters.timezoneOffset
      };

      // Handle array parameters for replication
      const accountIdsArray = (mergedFilters.accountIds && mergedFilters.accountIds.length > 0) ? mergedFilters.accountIds : [];
      const enterpriseIdsArray = (mergedFilters.enterpriseIds && mergedFilters.enterpriseIds.length > 0) ? mergedFilters.enterpriseIds : [];

      const response = await apiClient.get('/lite/v1/analytics/business/notifications', {
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
      console.error('Error fetching email analytics:', error);
      throw new Error('Failed to fetch email analytics data');
    }
  },

  /**
   * Extract just the analytics data from the API response
   * @param filters Optional filters for date range, timezone, account, etc.
   * @returns Promise<EmailsAnalytics>
   */
  async getEmailAnalyticsData(filters?: EmailAnalyticsFilters): Promise<EmailsAnalytics> {
    const response = await this.getEmailAnalytics(filters);
    return response.data.emailsAnalytics;
  },

  /**
   * Refresh email analytics data cache
   * @param filters Optional filters for date range, timezone, account, etc.
   * @returns Promise<EmailAnalyticsApiResponse>
   */
  async refreshEmailAnalytics(filters?: EmailAnalyticsFilters): Promise<EmailAnalyticsApiResponse> {
    return this.getEmailAnalytics(filters);
  },

  /**
   * Get default filters for email analytics
   * @returns EmailAnalyticsFilters with default values
   */
  getDefaultFilters(): EmailAnalyticsFilters {
    const now = new Date();
    const endDate = now.toISOString().split('T')[0];
    const startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return {
      startDate,
      endDate,
      timezoneOffset: -new Date().getTimezoneOffset() / 60,
      accountIds: [],
      enterpriseIds: []
    };
  }
};
