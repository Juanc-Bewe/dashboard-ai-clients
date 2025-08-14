import type { ConversationAnalyticsResponse } from '../types/conversation-analytics';

export const mockConversationAnalyticsData: ConversationAnalyticsResponse = {
  success: true,
  message: "Operación exitosa",
  data: {
    current: {
      startDate: "2025-08-06T05:00:00.000Z",
      endDate: "2025-08-13T04:59:59.999Z",
      totalConversations: 5847,
      totalAccounts: 1157,
      totalConversationsWithErrors: 32,
      totalSpamConversations: 45,
      totalUsefulConversations: 742,
      percentageOfUsefulConversations: 12.69,
      usefulConversationsPerDay: {
        "2025-08-06": 89,
        "2025-08-07": 156,
        "2025-08-08": 134,
        "2025-08-09": 98,
        "2025-08-10": 87,
        "2025-08-11": 92,
        "2025-08-12": 86
      },
      averageUsefulConversationPerDay: 106,
      accountsWithConversations: [
        {
          accountId: "640140dba3c6fb66d5187489",
          accountName: "CLINICA VETERINARIA DON BOSCO",
          sessionCount: 34
        },
        {
          accountId: "640368dd271d78d34307a59b",
          accountName: "Centro Medico Atlántico",
          sessionCount: 18
        },
        {
          accountId: "6401f52599bdcb6fc85fdbbe",
          accountName: "Ortopedia Chiavassa",
          sessionCount: 29
        }
      ],
      accountsWithMoreFiftySessions: [
        {
          accountId: "640128894caadaec67bf9431",
          accountName: "Todogoma",
          sessionCount: 67
        },
        {
          accountId: "6401f52599bdcb6fc85fdbbe",
          accountName: "Ortopedia Chiavassa",
          sessionCount: 58
        },
        {
          accountId: "6401340a1d73ffce0b9d6fcd",
          accountName: "Embotelladora Agua y Soda Cimes",
          sessionCount: 119
        }
      ],
      accountsWithUsefulConversations: [
        {
          accountId: "640368dd271d78d34307a59b",
          accountName: "Centro Medico Atlántico",
          usefulConversationCount: 12
        },
        {
          accountId: "6400adbde1a2ba17f293cd43",
          accountName: "El Palacio del Colchón",
          usefulConversationCount: 8
        },
        {
          accountId: "640140dba3c6fb66d5187489",
          accountName: "CLINICA VETERINARIA DON BOSCO",
          usefulConversationCount: 15
        }
      ]
    },
    previous: {
      startDate: "2025-07-29T05:00:00.000Z",
      endDate: "2025-08-06T04:59:59.999Z",
      totalConversations: 5102,
      totalAccounts: 1300,
      totalConversationsWithErrors: 29,
      totalSpamConversations: 39,
      totalUsefulConversations: 625,
      percentageOfUsefulConversations: 12.250098000784005,
      usefulConversationsPerDay: {
        "2025-07-29": 193,
        "2025-07-30": 211,
        "2025-07-31": 99,
        "2025-08-01": 24,
        "2025-08-02": 9,
        "2025-08-03": 12,
        "2025-08-04": 35,
        "2025-08-05": 38
      },
      averageUsefulConversationPerDay: 69.44444444444444,
      accountsWithConversations: [
        {
          accountId: "640140dba3c6fb66d5187489",
          accountName: "CLINICA VETERINARIA DON BOSCO",
          sessionCount: 28
        },
        {
          accountId: "640368dd271d78d34307a59b",
          accountName: "Centro Medico Atlántico",
          sessionCount: 11
        }
      ],
      accountsWithMoreFiftySessions: [
        {
          accountId: "640128894caadaec67bf9431",
          accountName: "Todogoma",
          sessionCount: 51
        },
        {
          accountId: "6401f52599bdcb6fc85fdbbe",
          accountName: "Ortopedia Chiavassa",
          sessionCount: 53
        }
      ],
      accountsWithUsefulConversations: [
        {
          accountId: "640368dd271d78d34307a59b",
          accountName: "Centro Medico Atlántico",
          usefulConversationCount: 6
        },
        {
          accountId: "6400adbde1a2ba17f293cd43",
          accountName: "El Palacio del Colchón",
          usefulConversationCount: 1
        }
      ]
    },
    comparison: {
      accountsWithEqualOrMoreConversations: [
        {
          accountId: "6401340a1d73ffce0b9d6fcd",
          accountName: "Embotelladora Agua y Soda Cimes",
          currentConversations: 119,
          previousConversations: 65,
          difference: 54,
          percentageChange: 83.07692307692308
        },
        {
          accountId: "65ef0f64eddb6a0dfe4468c5",
          accountName: "ZEN SUSHI SAC",
          currentConversations: 52,
          previousConversations: 3,
          difference: 49,
          percentageChange: 1633.3333333333333
        },
        {
          accountId: "664bc2f84db6a64a7ec05a5d",
          accountName: "SOCIEDAD RADIOLOGICA VALLE MAULE LIA",
          currentConversations: 108,
          previousConversations: 80,
          difference: 28,
          percentageChange: 35
        }
      ],
      totalAccountsWithEqualOrMore: 467,
      totalAccountsLost: 508,
      totalCurrentAccounts: 1157,
      totalPreviousAccounts: 1300
    }
  },
  timestamp: "2025-08-13T20:24:42.951Z",
  path: "/lite/v1/analytics/conversations?startDate=2025-08-06&endDate=2025-08-13&timezoneOffset=-5"
};
