export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface UserFeelingDistribution {
  feeling1: number;
  feeling2: number;
  feeling3: number;
}

export interface Metrics {
  totalConversations: number;
  totalAccountsWithConversations: number;
  totalConversationsWithIdentification: number;
  totalNewClients: number;
  customerRetentionPercentage: number;
  returningClients: number;
  totalUniqueClients: number;
  identificationPercentage: number;
  averageMessagesPerConversation: number;
  averageConversationDuration: number;
  resolutionRate: number;
  adjustedResolutionRate: number;
  averageUserFeeling: number;
  userFeelingDistribution: UserFeelingDistribution;
  errorRate: number;
  totalSpam: number;
}

export interface DailyMetric {
  date: string;
  totalConversations: number;
  conversationsWithIdentification: number;
  newClients: number;
  averageMessagesPerConversation: number;
  averageConversationDuration: number;
  resolutionRate: number;
  adjustedResolutionRate: number;
  averageUserFeeling: number;
  errorRate: number;
  spamCount: number;
}

export interface PreviousPeriod {
  dateRange: DateRange;
  metrics: Metrics;
}

export interface DashboardData {
  timezoneOffset: number;
  dateRange: DateRange;
  metrics: Metrics;
  dailyMetrics: DailyMetric[];
  previousPeriod: PreviousPeriod;
  previousPeriodDailyMetrics: DailyMetric[];
}

export interface DashboardApiResponse {
  success: boolean;
  message: string;
  data: DashboardData;
  timestamp: string;
  path: string;
}

import type { CalendarDate } from '@internationalized/date';

export interface DateRangeValue {
  start: CalendarDate;
  end: CalendarDate;
}

export interface DashboardFilters {
  startDate: string;
  endDate: string;
  dateRange?: DateRangeValue | null;
  enterpriseIds: string[];
  timezoneOffset: number;
}

export interface Enterprise {
  id: string;
  name: string;
}

export interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  filters: DashboardFilters;
  enterprises: Enterprise[];
} 