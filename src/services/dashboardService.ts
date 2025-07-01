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

// Mock dashboard data based on the real API response
export const mockDashboardData: DashboardApiResponse = {
  success: true,
  message: "Operación exitosa",
  data: {
    timezoneOffset: -5,
    currentPeriod: {
      dateRange: {
        startDate: "2025-06-10T00:00:00.000Z",
        endDate: "2025-06-29T23:59:59.999Z"
      },
      metrics: {
        totalConversations: 1391,
        totalAccountsWithConversations: 446,
        totalConversationsWithIdentification: 451,
        totalNewClients: 364,
        customerRetentionPercentage: 7.11,
        returningClients: 28,
        totalUniqueClients: 394,
        identificationPercentage: 32.42,
        medianMessagesPerConversation: 2,
        medianConversationDuration: 87,
        resolutionRate: 16.75,
        adjustedResolutionRate: 84.04,
        medianUserFeeling: 2,
        userFeelingDistribution: {
          "1": {
            count: 14,
            percentage: 1.01
          },
          "2": {
            count: 1307,
            percentage: 93.96
          },
          "3": {
            count: 70,
            percentage: 5.03
          }
        },
        errorRate: 1.37,
        totalSpam: 43,
        channelDistribution: {
          "web": {
            count: 1378,
            percentage: 99.07
          },
          "twilio-whatsapp": {
            count: 13,
            percentage: 0.93
          }
        },
        peakUsageHours: {
          "0": 24,
          "1": 4,
          "2": 7,
          "3": 8,
          "4": 8,
          "5": 10,
          "6": 32,
          "7": 46,
          "8": 65,
          "9": 102,
          "10": 88,
          "11": 110,
          "12": 116,
          "13": 92,
          "14": 110,
          "15": 83,
          "16": 98,
          "17": 91,
          "18": 65,
          "19": 71,
          "20": 52,
          "21": 43,
          "22": 39,
          "23": 27
        },
        weekdayDistribution: {
          "0": 151,
          "1": 113,
          "2": 133,
          "3": 202,
          "4": 248,
          "5": 318,
          "6": 226
        }
      },
      dailyMetrics: [
        {
          date: "2025-06-24",
          totalConversations: 133,
          conversationsWithIdentification: 37,
          newClients: 33,
          medianMessagesPerConversation: 2,
          medianConversationDuration: 75,
          resolutionRate: 12.78,
          adjustedResolutionRate: 84.21,
          medianUserFeeling: 2,
          errorRate: 3.01,
          spamCount: 4,
          peakUsageHours: { "0": 1, "1": 0, "2": 0, "3": 0, "4": 0, "5": 1, "6": 2, "7": 1, "8": 9, "9": 8, "10": 12, "11": 13, "12": 10, "13": 7, "14": 7, "15": 9, "16": 15, "17": 17, "18": 2, "19": 7, "20": 5, "21": 3, "22": 4, "23": 0 }
        },
        {
          date: "2025-06-25",
          totalConversations: 194,
          conversationsWithIdentification: 65,
          newClients: 58,
          medianMessagesPerConversation: 2,
          medianConversationDuration: 107,
          resolutionRate: 19.59,
          adjustedResolutionRate: 85.57,
          medianUserFeeling: 2,
          errorRate: 0.52,
          spamCount: 3,
          peakUsageHours: { "0": 2, "1": 0, "2": 1, "3": 0, "4": 0, "5": 2, "6": 5, "7": 5, "8": 6, "9": 8, "10": 16, "11": 17, "12": 13, "13": 18, "14": 17, "15": 15, "16": 16, "17": 18, "18": 8, "19": 9, "20": 3, "21": 2, "22": 8, "23": 5 }
        },
        {
          date: "2025-06-26",
          totalConversations: 221,
          conversationsWithIdentification: 73,
          newClients: 51,
          medianMessagesPerConversation: 1,
          medianConversationDuration: 70,
          resolutionRate: 14.48,
          adjustedResolutionRate: 81.45,
          medianUserFeeling: 2,
          errorRate: 2.26,
          spamCount: 5,
          peakUsageHours: { "0": 5, "1": 0, "2": 1, "3": 1, "4": 3, "5": 3, "6": 6, "7": 6, "8": 12, "9": 16, "10": 12, "11": 19, "12": 19, "13": 13, "14": 27, "15": 15, "16": 13, "17": 8, "18": 15, "19": 10, "20": 7, "21": 6, "22": 3, "23": 1 }
        },
        {
          date: "2025-06-27",
          totalConversations: 206,
          conversationsWithIdentification: 77,
          newClients: 57,
          medianMessagesPerConversation: 2,
          medianConversationDuration: 87,
          resolutionRate: 20.39,
          adjustedResolutionRate: 82.04,
          medianUserFeeling: 2,
          errorRate: 0.97,
          spamCount: 3,
          peakUsageHours: { "0": 4, "1": 0, "2": 0, "3": 1, "4": 1, "5": 1, "6": 4, "7": 12, "8": 9, "9": 16, "10": 12, "11": 25, "12": 18, "13": 22, "14": 14, "15": 11, "16": 8, "17": 8, "18": 10, "19": 7, "20": 9, "21": 4, "22": 5, "23": 5 }
        },
        {
          date: "2025-06-28",
          totalConversations: 138,
          conversationsWithIdentification: 42,
          newClients: 40,
          medianMessagesPerConversation: 2,
          medianConversationDuration: 98,
          resolutionRate: 16.67,
          adjustedResolutionRate: 86.23,
          medianUserFeeling: 2,
          errorRate: 0,
          spamCount: 7,
          peakUsageHours: { "0": 3, "1": 1, "2": 1, "3": 0, "4": 1, "5": 1, "6": 4, "7": 6, "8": 8, "9": 15, "10": 11, "11": 9, "12": 14, "13": 5, "14": 18, "15": 3, "16": 5, "17": 5, "18": 5, "19": 10, "20": 2, "21": 4, "22": 4, "23": 3 }
        },
        {
          date: "2025-06-29",
          totalConversations: 97,
          conversationsWithIdentification: 24,
          newClients: 21,
          medianMessagesPerConversation: 2,
          medianConversationDuration: 72,
          resolutionRate: 12.37,
          adjustedResolutionRate: 87.63,
          medianUserFeeling: 2,
          errorRate: 0,
          spamCount: 2,
          peakUsageHours: { "0": 1, "1": 2, "2": 0, "3": 0, "4": 1, "5": 0, "6": 2, "7": 3, "8": 2, "9": 5, "10": 4, "11": 6, "12": 4, "13": 4, "14": 4, "15": 8, "16": 12, "17": 6, "18": 6, "19": 12, "20": 6, "21": 4, "22": 2, "23": 3 }
        }
      ]
    },
    previousPeriod: {
      dateRange: {
        startDate: "2025-05-21T00:00:00.000Z",
        endDate: "2025-06-09T23:59:59.999Z"
      },
      metrics: {
        totalConversations: 0,
        totalAccountsWithConversations: 0,
        totalConversationsWithIdentification: 0,
        totalNewClients: 0,
        customerRetentionPercentage: 0,
        returningClients: 0,
        totalUniqueClients: 0,
        identificationPercentage: 0,
        medianMessagesPerConversation: 0,
        medianConversationDuration: 0,
        resolutionRate: 0,
        adjustedResolutionRate: 0,
        medianUserFeeling: 0,
        userFeelingDistribution: {
          "1": {
            count: 0,
            percentage: 0
          },
          "2": {
            count: 0,
            percentage: 0
          },
          "3": {
            count: 0,
            percentage: 0
          }
        },
        errorRate: 0,
        totalSpam: 0,
        channelDistribution: {},
        peakUsageHours: {
          "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0
        },
        weekdayDistribution: {
          "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0
        }
      },
      dailyMetrics: [
        {
          date: "2025-05-21",
          totalConversations: 0,
          conversationsWithIdentification: 0,
          newClients: 0,
          medianMessagesPerConversation: 0,
          medianConversationDuration: 0,
          resolutionRate: 0,
          adjustedResolutionRate: 0,
          medianUserFeeling: 0,
          errorRate: 0,
          spamCount: 0,
          peakUsageHours: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0 }
        }
      ]
    }
  },
  timestamp: "2025-07-01T01:31:57.060Z",
  path: "/lite/v1/analytics?startDate=2025-06-10&endDate=2025-06-29&timezoneOffset=-5"
};

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