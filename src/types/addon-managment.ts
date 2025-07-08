// Date range interface
export interface DateRange {
  startDate: string;
  endDate: string;
}

// Account interface
export interface Account {
  accountId: string;
  accountName: string;
  apiProvider: string;
  externalId: string;
  hasAutomode: boolean;
  onboardingCurrentState: string;
  active: boolean;
  base: number;
  baseUsed: number;
  extra: number;
  totalAvailable: number;
  sessionCount: number;
}

// Analytics interfaces
export interface TopAccountMetric {
  accountId: string;
  accountName: string;
  value: number;
}

export interface BaseDistribution {
  base: number;
  count: number;
  percentage: number;
}

export interface StatusDistribution {
  active: {
    count: number;
    percentage: number;
  };
  inactive: {
    count: number;
    percentage: number;
  };
}

export interface AccountsAnalytics {
  topAccountsBySessions: TopAccountMetric[];
  topAccountsByBaseUsed: TopAccountMetric[];
  accountsWithZeroAvailable: number;
  baseDistribution: BaseDistribution[];
  activeStatusDistribution: StatusDistribution;
}

// Email analytics interfaces
export interface EmailStateDistribution {
  pending: { count: number; percentage: number };
  sended: { count: number; percentage: number };
  delivered: { count: number; percentage: number };
  processed: { count: number; percentage: number };
  open: { count: number; percentage: number };
  bounced: { count: number; percentage: number };
  click: { count: number; percentage: number };
  dropped: { count: number; percentage: number };
}

export interface TimeToOpenDistribution {
  "0-1h": { count: number; percentage: number };
  "1-6h": { count: number; percentage: number };
  "6-24h": { count: number; percentage: number };
  "1-7d": { count: number; percentage: number };
  "7d+": { count: number; percentage: number };
}

export interface EmailsAnalytics {
  totalEmails: number;
  stateDistribution: EmailStateDistribution;
  averageTimeToOpen: number;
  medianTimeToOpen: number;
  deliveryRate: number;
  openRate: number;
  processedRate: number;
  bouncedRate: number;
  clickRate: number;
  timeToOpenDistribution: TimeToOpenDistribution;
}

// Main data interface
export interface AddonManagementData {
  timezoneOffset: number;
  dateRange: DateRange;
  totalAccounts: number;
  totalSessions: number;
  totalEmails: number;
  accounts: Account[];
  accountsAnalytics: AccountsAnalytics;
  emailsAnalytics: EmailsAnalytics;
}

// Main API response interface
export interface AddonManagementApiResponse {
  success: boolean;
  message: string;
  data: AddonManagementData;
  timestamp: string;
  path: string;
}

// Filters interface for addon management
export interface AddonManagementFilters {
  startDate: string;
  endDate: string;
  timezoneOffset: number;
  accountIds: string[];
  enterpriseIds: string[];
}

// State interface for addon management context
export interface AddonManagementState {
  data: AddonManagementData | null;
  loading: boolean;
  error: string | null;
  filters: AddonManagementFilters;
  currentPage: number;
  itemsPerPage: number;
} 