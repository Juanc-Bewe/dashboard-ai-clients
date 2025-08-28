import type { ChatEventsAnalyticsResponse } from '../types/chat-events-analytics';
import { createApiClient } from '../utils/apiHelpers';
import { mockChatEventsAnalyticsData } from '../mocks/chatEventsAnalytics';

// Create API client instance
const apiClient = createApiClient();

// Mock chat events analytics data
export const mockChatEventsData: ChatEventsAnalyticsResponse = mockChatEventsAnalyticsData;

export interface ChatEventsAnalyticsFilters {
  startDate: string;
  endDate: string;
  timezoneOffset: number;
  enterpriseIds?: string[];
  accountIds?: string[];
  channelNames?: string[];
}

// API service functions
export const chatEventsAnalyticsService = {
  // Fetch chat events analytics data
  async getChatEventsAnalytics(filters: ChatEventsAnalyticsFilters): Promise<ChatEventsAnalyticsResponse> {
    try {
      const params: Record<string, any> = {
        startDate: filters.startDate,
        endDate: filters.endDate,
        timezoneOffset: filters.timezoneOffset
      };

      // Handle array parameters for replication
      const enterpriseIdsArray = (filters.enterpriseIds && filters.enterpriseIds.length > 0) ? filters.enterpriseIds : [];
      const accountIdsArray = (filters.accountIds && filters.accountIds.length > 0) ? filters.accountIds : [];
      const channelNamesArray = (filters.channelNames && filters.channelNames.length > 0) ? filters.channelNames : [];

      const response = await apiClient.get('/lite/v1/analytics/chat/events', {
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

      console.log('do chat events analytics', response.data);
      return response.data;

    } catch (error) {
      console.error('Error fetching chat events analytics:', error);
      throw new Error('Failed to fetch chat events analytics data');
    }
  },

  // Get default filters
  getDefaultFilters(): ChatEventsAnalyticsFilters {
    const now = new Date();
    const endDate = now.toISOString().split('T')[0];
    const startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return {
      startDate,
      endDate,
      timezoneOffset: -new Date().getTimezoneOffset() / 60
    };
  }
};
