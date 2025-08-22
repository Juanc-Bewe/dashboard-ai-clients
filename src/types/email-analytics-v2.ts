export interface StateDistributionItem {
  count: number;
  percentage: number;
}

export interface StateDistribution {
  pending: StateDistributionItem;
  sended: StateDistributionItem;
  delivered: StateDistributionItem;
  processed: StateDistributionItem;
  open: StateDistributionItem;
  bounced: StateDistributionItem;
  click: StateDistributionItem;
  dropped: StateDistributionItem;
}

export interface TimeToOpenDistributionItem {
  count: number;
  percentage: number;
}

export interface TimeToOpenDistribution {
  "0-1h": TimeToOpenDistributionItem;
  "1-6h": TimeToOpenDistributionItem;
  "6-24h": TimeToOpenDistributionItem;
  "1-7d": TimeToOpenDistributionItem;
  "7d+": TimeToOpenDistributionItem;
}

export interface EmailsAnalytics {
  totalEmails: number;
  stateDistribution: StateDistribution;
  averageTimeToOpen: number;
  medianTimeToOpen: number;
  deliveryRate: number;
  openRate: number;
  processedRate: number;
  bouncedRate: number;
  clickRate: number;
  timeToOpenDistribution: TimeToOpenDistribution;
}

export interface EmailAnalyticsApiResponse {
  success: boolean;
  message: string;
  data: {
    emailsAnalytics: EmailsAnalytics;
  };
  timestamp: string;
  path: string;
}

export interface EmailAnalyticsFilters {
  startDate?: string;
  endDate?: string;
  timezoneOffset?: number;
  accountIds?: string[];
  enterpriseIds?: string[];
}
