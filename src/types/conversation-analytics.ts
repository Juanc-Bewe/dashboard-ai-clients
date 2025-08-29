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

// Data range interface
export interface DataRange {
  startDate: string;
  endDate: string;
}

// Volume metrics interface
export interface VolumeMetrics {
  totalConversations: number;
  totalAccounts: number;
  totalUsefulConversations: number;
  totalSpamConversations: number;
  totalConversationsWithErrors: number;
  totalConversationsWithIdentification: number;
}

// Quality metrics interface
export interface QualityMetrics {
  percentageOfUsefulConversations: number;
  identificationPercentage: number;
  errorRate: number;
  resolutionRate: number;
  adjustedResolutionRate: number;
}

// Temporal analytics interface
export interface UsefulConversationPerDay {
  day: string;
  count: number;
}

export interface TemporalAnalytics {
  usefulConversationsPerDay: UsefulConversationPerDay[];
  averageUsefulConversationPerDay: number;
}

// Account analytics interface
export interface AccountAnalytics {
  accountsWithConversations: AccountWithConversations[];
  accountsWithMoreFiftyConversations: AccountWithConversations[];
  accountsWithUsefulConversations: AccountWithUsefulConversations[];
}

// Customer analytics interface
export interface CustomerAnalytics {
  totalNewClients: number;
  totalUniqueClients: number;
  returningClients: number;
  customerRetentionPercentage: number;
}

// Conversation metrics interface
export interface ConversationMetrics {
  medianMessagesPerConversation: number;
  averageMessagesPerConversation: number;
  medianConversationDuration: number;
  averageConversationDuration: number;
}

// User experience interface
export interface UserFeelingDistribution {
  "1": {
    count: number;
    percentage: number;
  };
  "2": {
    count: number;
    percentage: number;
  };
  "3": {
    count: number;
    percentage: number;
  };
}

export interface UserExperience {
  medianUserFeeling: number;
  averageUserFeeling: number;
  userFeelingDistribution: UserFeelingDistribution;
}

// Channel and timing interface
export interface ChannelDistribution {
  "web"?: {
    count: number;
    percentage: number;
  };
  "twilio-whatsapp"?: {
    count: number;
    percentage: number;
  };
}

export interface PeakUsageHours {
  "0": number;
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
  "8": number;
  "9": number;
  "10": number;
  "11": number;
  "12": number;
  "13": number;
  "14": number;
  "15": number;
  "16": number;
  "17": number;
  "18": number;
  "19": number;
  "20": number;
  "21": number;
  "22": number;
  "23": number;
}

export interface WeekdayDistribution {
  "0": number;
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
}

export interface ChannelAndTiming {
  channelDistribution: ChannelDistribution;
  peakUsageHours: PeakUsageHours;
  weekdayDistribution: WeekdayDistribution;
}

// Cost analytics interface
export interface CostByCategory {
  llm: number;
  tools: number;
  tracing: number;
  whatsapp: number;
}

export interface CostDistribution {
  llm: {
    cost: number;
    percentage: number;
  };
  tools: {
    cost: number;
    percentage: number;
  };
  tracing: {
    cost: number;
    percentage: number;
  };
  whatsapp: {
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

export interface CostAnalytics {
  totalCost: number;
  medianTotalCostPerConversation: number;
  averageTotalCostPerConversation: number;
  medianCostByCategory: CostByCategory;
  averageCostByCategory: CostByCategory;
  costDistribution: CostDistribution;
  topExpensiveAccounts: TopExpensiveAccount[];
}

// Technology usage interface
export interface LlmModelDistribution {
  "gemini-2.0-flash-lite-001"?: {
    totalTokens?: number;
    cost?: number;
    percentage: number;
  };
  "gemini-2.5-flash"?: {
    totalTokens?: number;
    cost?: number;
    percentage: number;
  };
  "gemini-2.0-flash"?: {
    totalTokens?: number;
    cost?: number;
    percentage: number;
  };
  "gemini-2.0-flash-001"?: {
    totalTokens?: number;
    cost?: number;
    percentage: number;
  };
}

export interface ToolsDistribution {
  deepKnowledgeSearch?: {
    amount?: number;
    cost?: number;
    percentage: number;
  };
  get_products_and_services?: {
    amount?: number;
    cost?: number;
    percentage: number;
  };
  generate_unified_link?: {
    amount?: number;
    cost?: number;
    percentage: number;
  };
  get_booking_management_link?: {
    amount?: number;
    cost?: number;
    percentage: number;
  };
  get_services?: {
    amount?: number;
    cost?: number;
    percentage: number;
  };
  get_products?: {
    amount?: number;
    cost?: number;
    percentage: number;
  };
  generate_appointment_link?: {
    amount?: number;  
    cost?: number;
    percentage: number;
  };
  generate_purchase_link?: {
    amount?: number;
    cost?: number;
    percentage: number;
  };
}

export interface TechnologyUsage {
  llmModelDistributionByTokens: LlmModelDistribution;
  llmModelDistributionByCost: LlmModelDistribution;
  toolsDistributionByAmount: ToolsDistribution;
  toolsDistributionByCost: ToolsDistribution;
}

// Main metrics interface
export interface Metrics {
  volumeMetrics: VolumeMetrics;
  qualityMetrics: QualityMetrics;
  temporalAnalytics: TemporalAnalytics;
  accountAnalytics?: AccountAnalytics;
  customerAnalytics: CustomerAnalytics;
  conversationMetrics: ConversationMetrics;
  userExperience: UserExperience;
  channelAndTiming: ChannelAndTiming;
  costAnalytics: CostAnalytics;
  technologyUsage: TechnologyUsage;
}

// Daily metrics interface
export interface DailyMetrics extends Metrics {
  day: string;
}

// Period data interface
export interface PeriodData {
  dataRange: DataRange;
  metrics: Metrics;
  dailyMetrics: DailyMetrics[];
}

// Comparison data interface
export interface ComparisonData {
  accountsWithEqualOrMoreConversations: AccountComparison[];
  accountsLostInCurrent: any[];
  totalAccountsWithEqualOrMore: number;
  totalAccountsLost: number;
  totalCurrentAccounts: number;
  totalPreviousAccounts: number;
}

// Main data interface
export interface ConversationAnalyticsData {
  timezoneOffset: number;
  currentPeriod: PeriodData;
  previousPeriod: PeriodData;
  comparison: ComparisonData;
}

// API Response interface
export interface ConversationAnalyticsResponse {
  success: boolean;
  message: string;
  data: ConversationAnalyticsData;
  timestamp: string;
  path: string;
}