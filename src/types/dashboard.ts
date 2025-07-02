export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface UserFeelingDistribution {
  "1": { count: number; percentage: number };
  "2": { count: number; percentage: number };
  "3": { count: number; percentage: number };
}

export interface ChannelDistribution {
  [key: string]: { count: number; percentage: number };
}

export interface PeakUsageHours {
  [hour: string]: number;
}

export interface WeekdayDistribution {
  [day: string]: number;
}

export interface CostByCategory {
  llm: number;
  tools: number;
  tracing: number;
  whatsapp: number;
}

export interface CostDistribution {
  [category: string]: {
    cost: number;
    percentage: number;
  };
}

export interface LLMModelDistributionByTokens {
  [modelName: string]: {
    totalTokens: number;
    percentage: number;
  };
}

export interface LLMModelDistributionByCost {
  [modelName: string]: {
    cost: number;
    percentage: number;
  };
}

export interface TopExpensiveAccount {
  accountId: string;
  accountName: string;
  sessionCount: number;
  totalCost: number;
}

export interface ToolsDistributionByAmount {
  [toolName: string]: {
    amount: number;
    percentage: number;
  };
}

export interface ToolsDistributionByCost {
  [toolName: string]: {
    cost: number;
    percentage: number;
  };
}

export interface AgentsDistributionByAmount {
  [agentName: string]: {
    amount: number;
    percentage: number;
  };
}

export interface AgentsDistributionByCost {
  [agentName: string]: {
    cost: number;
    percentage: number;
  };
}

export interface Metrics {
  totalConversations: number;
  totalAccountsWithConversations: number;
  totalConversationsWithIdentification: number;
  totalCost: number;
  totalNewClients: number;
  customerRetentionPercentage: number;
  returningClients: number;
  totalUniqueClients: number;
  identificationPercentage: number;
  medianMessagesPerConversation: number;
  medianConversationDuration: number;
  resolutionRate: number;
  adjustedResolutionRate: number;
  medianUserFeeling: number;
  userFeelingDistribution: UserFeelingDistribution;
  errorRate: number;
  totalSpam: number;
  channelDistribution: ChannelDistribution;
  peakUsageHours: PeakUsageHours;
  weekdayDistribution: WeekdayDistribution;
  medianTotalCostPerConversation: number;
  averageTotalCostPerConversation: number;
  medianCostByCategory: CostByCategory;
  averageCostByCategory: CostByCategory;
  costDistribution: CostDistribution;
  llmModelDistributionByTokens: LLMModelDistributionByTokens;
  llmModelDistributionByCost: LLMModelDistributionByCost;
  topExpensiveAccounts: TopExpensiveAccount[];
  toolsDistributionByAmount: ToolsDistributionByAmount;
  toolsDistributionByCost: ToolsDistributionByCost;
  agentsDistributionByAmount: AgentsDistributionByAmount;
  agentsDistributionByCost: AgentsDistributionByCost;
}

export interface DailyMetric {
  date: string;
  totalConversations: number;
  conversationsWithIdentification: number;
  totalCost: number;
  newClients: number;
  medianMessagesPerConversation: number;
  medianConversationDuration: number;
  resolutionRate: number;
  adjustedResolutionRate: number;
  medianUserFeeling: number;
  errorRate: number;
  spamCount: number;
  peakUsageHours: Record<string, number>;
  medianTotalCostPerConversation: number;
  averageTotalCostPerConversation: number;
  medianCostByCategory: CostByCategory;
  averageCostByCategory: CostByCategory;
  costDistribution: CostDistribution;
  llmModelDistributionByTokens: LLMModelDistributionByTokens;
  llmModelDistributionByCost: LLMModelDistributionByCost;
  toolsDistributionByAmount: ToolsDistributionByAmount;
  toolsDistributionByCost: ToolsDistributionByCost;
  agentsDistributionByAmount: AgentsDistributionByAmount;
  agentsDistributionByCost: AgentsDistributionByCost;
}

export interface Period {
  dateRange: DateRange;
  metrics: Metrics;
  dailyMetrics: DailyMetric[];
}

export interface DashboardData {
  timezoneOffset: number;
  currentPeriod: Period;
  previousPeriod: Period;
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
  accountIds: string[];
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