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

      // Add optional filters if provided
      if (filters.enterpriseIds && filters.enterpriseIds.length > 0) {
        params.enterpriseIds = filters.enterpriseIds.join(',');
      }

      if (filters.accountIds && filters.accountIds.length > 0) {
        params.accountIds = filters.accountIds.join(',');
      }

      if (filters.channelNames && filters.channelNames.length > 0) {
        params.channelNames = filters.channelNames.join(',');
      }

      const response = await apiClient.get('/lite/v1/analytics/chat/events', {
        params
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
