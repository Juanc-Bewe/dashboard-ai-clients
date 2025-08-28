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
        timezoneOffset: filters.timezoneOffset
      };

      // Handle array parameters for replication
      const enterpriseIdsArray = filters.enterpriseIds || [];
      const accountIdsArray = filters.accountIds || [];
      const channelNamesArray = filters.channelNames || [];

      const response = await apiClient.get('/lite/v1/analytics/conversations', {
        params,
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          
          // Add regular params
          Object.entries(params).forEach(([key, value]) => {
            if (key !== 'enterpriseIds' && key !== 'accountIds' && key !== 'channelNames') {
              searchParams.append(key, String(value));
            }
          });
          
          // Add each enterpriseId as a separate parameter
          enterpriseIdsArray.forEach(id => {
            searchParams.append('enterpriseIds', id);
          });
          
          // Add each accountId as a separate parameter
          accountIdsArray.forEach(id => {
            searchParams.append('accountIds', id);
          });
          
          // Add each channelName as a separate parameter
          channelNamesArray.forEach(name => {
            searchParams.append('channelNames', name);
          });
          
          return searchParams.toString();
        }
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
