import type { EmailAnalyticsApiResponse } from '../types/email-analytics-v2';

export const mockEmailAnalyticsResponse: EmailAnalyticsApiResponse = {
  success: true,
  message: "Operación exitosa",
  data: {
    emailsAnalytics: {
      totalEmails: 496,
      stateDistribution: {
        pending: {
          count: 496,
          percentage: 100
        },
        sended: {
          count: 496,
          percentage: 100
        },
        delivered: {
          count: 463,
          percentage: 93.3
        },
        processed: {
          count: 476,
          percentage: 96
        },
        open: {
          count: 242,
          percentage: 48.8
        },
        bounced: {
          count: 0,
          percentage: 0
        },
        click: {
          count: 71,
          percentage: 14.3
        },
        dropped: {
          count: 11,
          percentage: 2.2
        }
      },
      averageTimeToOpen: 14.6,
      medianTimeToOpen: 0.9,
      deliveryRate: 93.3,
      openRate: 48.8,
      processedRate: 96,
      bouncedRate: 0,
      clickRate: 14.3,
      timeToOpenDistribution: {
        "0-1h": {
          count: 124,
          percentage: 51.2
        },
        "1-6h": {
          count: 36,
          percentage: 14.9
        },
        "6-24h": {
          count: 46,
          percentage: 19
        },
        "1-7d": {
          count: 33,
          percentage: 13.6
        },
        "7d+": {
          count: 3,
          percentage: 1.2
        }
      }
    }
  },
  timestamp: "2025-08-21T23:35:17.099Z",
  path: "/lite/v1/analytics/business/notifications?startDate=2025-08-01&endDate=2025-08-19&timezoneOffset=-5"
};
