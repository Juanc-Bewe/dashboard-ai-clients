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
      
      // Add accountIds if provided
      if (mergedFilters.accountIds && mergedFilters.accountIds.length > 0) {
        params.accountIds = mergedFilters.accountIds.join(',');
      }
      
      // Add enterpriseIds if provided
      if (mergedFilters.enterpriseIds && mergedFilters.enterpriseIds.length > 0) {
        params.enterpriseIds = mergedFilters.enterpriseIds.join(',');
      }

      const response = await apiClient.get('/lite/v1/analytics/business/notifications', {
        params
      });
      return response.data;

      // Mock data fallback (commented out)
      /*
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const selectedMock = mockEmailAnalyticsResponse;
      
      return {
        ...selectedMock,
        timestamp: new Date().toISOString(),
        path: `/lite/v1/analytics/business/notifications?${new URLSearchParams({
          startDate: filters?.startDate || '2025-08-01',
          endDate: filters?.endDate || '2025-08-19',
          timezoneOffset: (filters?.timezoneOffset || -5).toString(),
          ...(filters?.accountIds && { accountIds: filters.accountIds.join(',') }),
          ...(filters?.enterpriseIds && { enterpriseIds: filters.enterpriseIds.join(',') })
        })}`
      };
      */
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
   * Get email analytics for a specific date range
   * @param startDate Start date in YYYY-MM-DD format
   * @param endDate End date in YYYY-MM-DD format
   * @param timezoneOffset Timezone offset in hours (default: -5)
   * @returns Promise<EmailsAnalytics>
   */
  async getEmailAnalyticsByDateRange(
    startDate: string, 
    endDate: string, 
    timezoneOffset: number = -5
  ): Promise<EmailsAnalytics> {
    return this.getEmailAnalyticsData({
      startDate,
      endDate,
      timezoneOffset
    });
  },

  /**
   * Get email analytics for specific accounts
   * @param accountIds Array of Account IDs to filter by
   * @param filters Additional filters
   * @returns Promise<EmailsAnalytics>
   */
  async getEmailAnalyticsByAccounts(
    accountIds: string[],
    filters?: Omit<EmailAnalyticsFilters, 'accountIds'>
  ): Promise<EmailsAnalytics> {
    return this.getEmailAnalyticsData({
      ...filters,
      accountIds
    });
  },

  /**
   * Get email analytics for specific enterprises
   * @param enterpriseIds Array of Enterprise IDs to filter by
   * @param filters Additional filters
   * @returns Promise<EmailsAnalytics>
   */
  async getEmailAnalyticsByEnterprises(
    enterpriseIds: string[],
    filters?: Omit<EmailAnalyticsFilters, 'enterpriseIds'>
  ): Promise<EmailsAnalytics> {
    return this.getEmailAnalyticsData({
      ...filters,
      enterpriseIds
    });
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
