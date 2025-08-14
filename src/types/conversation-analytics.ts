// Account interfaces
export interface AccountWithConversations {
  accountId: string;
  accountName: string;
  sessionCount: number;
}

export interface AccountWithUsefulConversations {
  accountId: string;
  accountName: string;
  usefulConversationCount: number;
}

export interface AccountComparison {
  accountId: string;
  accountName: string;
  currentConversations: number;
  previousConversations: number;
  difference: number;
  percentageChange: number;
}

// Period data interface (used for both current and previous)
export interface PeriodData {
  startDate: string;
  endDate: string;
  totalConversations: number;
  totalAccounts: number;
  totalConversationsWithErrors: number;
  totalSpamConversations: number;
  totalUsefulConversations: number;
  percentageOfUsefulConversations: number;
  usefulConversationsPerDay: Record<string, number>;
  averageUsefulConversationPerDay: number;
  accountsWithConversations: AccountWithConversations[];
  accountsWithMoreFiftySessions: AccountWithConversations[];
  accountsWithUsefulConversations: AccountWithUsefulConversations[];
}

// Comparison data interface
export interface ComparisonData {
  accountsWithEqualOrMoreConversations: AccountComparison[];
  totalAccountsWithEqualOrMore: number;
  totalAccountsLost: number;
  totalCurrentAccounts: number;
  totalPreviousAccounts: number;
}

// Main data interface
export interface ConversationAnalyticsData {
  current: PeriodData;
  previous: PeriodData;
  comparison: ComparisonData;
}

// API Response interface (if needed)
export interface ConversationAnalyticsResponse {
  success: boolean;
  message: string;
  data: ConversationAnalyticsData;
  timestamp: string;
  path: string;
}