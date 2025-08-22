import type { ConversationAnalyticsResponse } from '../types/conversation-analytics';
import { createApiClient } from '../utils/apiHelpers';

// Create API client instance
const apiClient = createApiClient();

export interface ConversationAnalyticsFilters {
  startDate: string;
  endDate: string;
  enterpriseIds: string[];
  accountIds: string[];
  timezoneOffset: number;
  channelNames?: string[];
}

// API service functions
export const conversationAnalyticsService = {
  // Fetch conversation analytics data
  async getConversationAnalytics(filters: ConversationAnalyticsFilters): Promise<ConversationAnalyticsResponse> {
    try {
      const params: Record<string, any> = {
        startDate: filters.startDate,
        endDate: filters.endDate,
        enterpriseIds: filters.enterpriseIds.join(','),
        accountIds: filters.accountIds.join(','),
        timezoneOffset: filters.timezoneOffset
      };

      // Add channelNames if provided
      if (filters.channelNames && filters.channelNames.length > 0) {
        params.channelNames = filters.channelNames.join(',');
      }

      const response = await apiClient.get('/lite/v1/analytics/conversations', {
        params
      });
      return response.data;

    } catch (error) {
      console.error('Error fetching conversation analytics:', error);
      throw new Error('Failed to fetch conversation analytics data');
    }
  },

  // Get default filters
  getDefaultFilters(): ConversationAnalyticsFilters {
    const now = new Date();
    const endDate = now.toISOString().split('T')[0];
    const startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return {
      startDate,
      endDate,
      enterpriseIds: [],
      accountIds: [],
      timezoneOffset: -new Date().getTimezoneOffset() / 60,
      channelNames: []
    };
  }
};
