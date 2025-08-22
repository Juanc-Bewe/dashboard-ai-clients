
export interface EmailAnalyticsData {
  totalEmails: number;
  emailsByStatus: {
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    spam: number;
    pending: number;
    failed: number;
  };
  rates: {
    deliveryRate: number; // percentage
    openRate: number; // percentage
    clickRate: number; // percentage
    bounceRate: number; // percentage
    spamRate: number; // percentage
  };
  timing: {
    averageTimeToOpen: number; // in hours
    medianTimeToOpen: number; // in hours
  };
  summary: {
    totalSent: number;
    totalDelivered: number;
    totalOpened: number;
    totalClicked: number;
    totalSpam: number;
    totalBounced: number;
  };
}

export interface EmailAnalyticsState {
  data: EmailAnalyticsData | null;
  loading: boolean;
  error: string | null;
} 