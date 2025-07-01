import axios from 'axios';
import type { DashboardApiResponse, DashboardFilters, Enterprise } from '../types/dashboard';

// API configuration
const API_BASE_URL = 'https://lindabackendqa.bewe.co';
const API_PIN = '1234';

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

// Mock dashboard data based on the provided example
export const mockDashboardData: DashboardApiResponse = {
  success: true,
  message: "Operación exitosa",
  data: {
    timezoneOffset: -5,
    dateRange: {
      startDate: "2025-06-24T00:00:00.000Z",
      endDate: "2025-06-29T23:59:59.999Z"
    },
    metrics: {
      totalConversations: 121,
      totalAccountsWithConversations: 15,
      totalConversationsWithIdentification: 100,
      totalNewClients: 29,
      customerRetentionPercentage: 24,
      returningClients: 12,
      totalUniqueClients: 41,
      identificationPercentage: 83,
      averageMessagesPerConversation: 8.6,
      averageConversationDuration: 667,
      resolutionRate: 79,
      adjustedResolutionRate: 84,
      averageUserFeeling: 2.4,
      userFeelingDistribution: {
        feeling1: 5,
        feeling2: 75,
        feeling3: 20
      },
      errorRate: 3.5,
      totalSpam: 6
    },
    dailyMetrics: [
      {
        date: "2025-06-24",
        totalConversations: 22,
        conversationsWithIdentification: 18,
        newClients: 5,
        averageMessagesPerConversation: 8.5,
        averageConversationDuration: 680,
        resolutionRate: 78,
        adjustedResolutionRate: 85,
        averageUserFeeling: 2.3,
        errorRate: 3.2,
        spamCount: 1
      },
      {
        date: "2025-06-25",
        totalConversations: 28,
        conversationsWithIdentification: 24,
        newClients: 7,
        averageMessagesPerConversation: 9.8,
        averageConversationDuration: 750,
        resolutionRate: 85,
        adjustedResolutionRate: 90,
        averageUserFeeling: 2.5,
        errorRate: 2.1,
        spamCount: 0
      },
      {
        date: "2025-06-26",
        totalConversations: 15,
        conversationsWithIdentification: 12,
        newClients: 3,
        averageMessagesPerConversation: 7.2,
        averageConversationDuration: 580,
        resolutionRate: 72,
        adjustedResolutionRate: 78,
        averageUserFeeling: 2.2,
        errorRate: 4.5,
        spamCount: 2
      },
      {
        date: "2025-06-27",
        totalConversations: 31,
        conversationsWithIdentification: 26,
        newClients: 8,
        averageMessagesPerConversation: 10.1,
        averageConversationDuration: 820,
        resolutionRate: 88,
        adjustedResolutionRate: 92,
        averageUserFeeling: 2.6,
        errorRate: 1.8,
        spamCount: 1
      },
      {
        date: "2025-06-28",
        totalConversations: 18,
        conversationsWithIdentification: 15,
        newClients: 4,
        averageMessagesPerConversation: 9.2,
        averageConversationDuration: 720,
        resolutionRate: 83,
        adjustedResolutionRate: 88,
        averageUserFeeling: 2.4,
        errorRate: 2.5,
        spamCount: 1
      },
      {
        date: "2025-06-29",
        totalConversations: 7,
        conversationsWithIdentification: 5,
        newClients: 2,
        averageMessagesPerConversation: 6.8,
        averageConversationDuration: 450,
        resolutionRate: 65,
        adjustedResolutionRate: 72,
        averageUserFeeling: 2.1,
        errorRate: 7,
        spamCount: 1
      }
    ],
    previousPeriod: {
      dateRange: {
        startDate: "2025-06-18T00:00:00.000Z",
        endDate: "2025-06-23T23:59:59.999Z"
      },
      metrics: {
        totalConversations: 112,
        totalAccountsWithConversations: 13,
        totalConversationsWithIdentification: 91,
        totalNewClients: 25,
        customerRetentionPercentage: 28,
        returningClients: 10,
        totalUniqueClients: 35,
        identificationPercentage: 81,
        averageMessagesPerConversation: 7.2,
        averageConversationDuration: 492,
        resolutionRate: 64,
        adjustedResolutionRate: 71,
        averageUserFeeling: 2.1,
        userFeelingDistribution: {
          feeling1: 8,
          feeling2: 68,
          feeling3: 15
        },
        errorRate: 6.1,
        totalSpam: 5
      }
    },
    previousPeriodDailyMetrics: [
      {
        date: "2025-06-18",
        totalConversations: 16,
        conversationsWithIdentification: 13,
        newClients: 3,
        averageMessagesPerConversation: 7.8,
        averageConversationDuration: 520,
        resolutionRate: 68,
        adjustedResolutionRate: 75,
        averageUserFeeling: 2.0,
        errorRate: 5.2,
        spamCount: 1
      },
      {
        date: "2025-06-19",
        totalConversations: 24,
        conversationsWithIdentification: 19,
        newClients: 6,
        averageMessagesPerConversation: 8.9,
        averageConversationDuration: 645,
        resolutionRate: 72,
        adjustedResolutionRate: 79,
        averageUserFeeling: 2.2,
        errorRate: 4.1,
        spamCount: 0
      },
      {
        date: "2025-06-20",
        totalConversations: 12,
        conversationsWithIdentification: 9,
        newClients: 2,
        averageMessagesPerConversation: 6.5,
        averageConversationDuration: 380,
        resolutionRate: 58,
        adjustedResolutionRate: 65,
        averageUserFeeling: 1.9,
        errorRate: 8.3,
        spamCount: 2
      },
      {
        date: "2025-06-21",
        totalConversations: 29,
        conversationsWithIdentification: 24,
        newClients: 7,
        averageMessagesPerConversation: 9.1,
        averageConversationDuration: 712,
        resolutionRate: 76,
        adjustedResolutionRate: 83,
        averageUserFeeling: 2.3,
        errorRate: 3.4,
        spamCount: 1
      },
      {
        date: "2025-06-22",
        totalConversations: 9,
        conversationsWithIdentification: 8,
        newClients: 2,
        averageMessagesPerConversation: 2.2,
        averageConversationDuration: 46,
        resolutionRate: 55.56,
        adjustedResolutionRate: 62.5,
        averageUserFeeling: 2.2,
        errorRate: 11.11,
        spamCount: 0
      },
      {
        date: "2025-06-23",
        totalConversations: 22,
        conversationsWithIdentification: 18,
        newClients: 5,
        averageMessagesPerConversation: 3.8,
        averageConversationDuration: 153,
        resolutionRate: 54.55,
        adjustedResolutionRate: 61.2,
        averageUserFeeling: 2.1,
        errorRate: 4.55,
        spamCount: 1
      }
    ]
  },
  timestamp: "2025-06-30T16:31:59.486Z",
  path: "/lite/v1/analytics?startDate=2025-06-24&endDate=2025-06-29&timezoneOffset=-5&enterpriseIds=67d1e99fdfc24caaab6a1b9a"
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
      
      if (filters.timezoneOffset !== undefined && filters.timezoneOffset !== null) {
        params.timezoneOffset = filters.timezoneOffset;
      }

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
    
    return mockEnterprises;
  }
}; 