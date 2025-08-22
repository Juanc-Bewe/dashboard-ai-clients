import type { 
  EmailAnalyticsApiResponse, 
  EmailsAnalytics,
  EmailAnalyticsFilters
} from '../types/email-analytics-v2';
import { mockEmailAnalyticsResponse } from '../mocks/emailAnalytics';


export const emailAnalyticsService = {
  /**
   * Fetch email analytics data using new API structure
   * @param filters Optional filters for date range, timezone, account, etc.
   * @returns Promise<EmailAnalyticsApiResponse>
   */
  async getEmailAnalytics(filters?: EmailAnalyticsFilters): Promise<EmailAnalyticsApiResponse> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // In a real implementation, you would:
      // const queryParams = new URLSearchParams();
      // if (filters?.startDate) queryParams.append('startDate', filters.startDate);
      // if (filters?.endDate) queryParams.append('endDate', filters.endDate);
      // if (filters?.timezoneOffset) queryParams.append('timezoneOffset', filters.timezoneOffset.toString());
      // if (filters?.accountId) queryParams.append('accountId', filters.accountId);
      // 
      // const response = await fetch(`/lite/v1/analytics/business/notifications?${queryParams}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`,
      //   },
      // });
      // 
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // 
      // return await response.json();

      // For now, return mock data
      const selectedMock = mockEmailAnalyticsResponse;
      
      return {
        ...selectedMock,
        timestamp: new Date().toISOString(),
        path: `/lite/v1/analytics/business/notifications?${new URLSearchParams({
          startDate: filters?.startDate || '2025-08-01',
          endDate: filters?.endDate || '2025-08-19',
          timezoneOffset: (filters?.timezoneOffset || -5).toString(),
          ...(filters?.accountId && { accountId: filters.accountId })
        })}`
      };
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
   * Get email analytics for a specific account
   * @param accountId Account ID to filter by
   * @param filters Additional filters
   * @returns Promise<EmailsAnalytics>
   */
  async getEmailAnalyticsByAccount(
    accountId: string,
    filters?: Omit<EmailAnalyticsFilters, 'accountId'>
  ): Promise<EmailsAnalytics> {
    return this.getEmailAnalyticsData({
      ...filters,
      accountId
    });
  }
};
