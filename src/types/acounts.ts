export interface Channel {
  type: 'whatsapp' | 'web';
  active: boolean;
}

export interface Account {
  accountId: string;
  accountName: string;
  hasAutomode: boolean;
  apiProvider?: string;
  externalId?: string;
  onboardingCurrentState?: 'FAILED' | 'SUCCESS' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | '' | undefined;
  active: boolean;
  base: number;
  baseUsed: number;
  extra: number;
  totalAvailable: number;
  channels: Channel[];
}

export interface AccountsResponse {
  success: boolean;
  message: string;
  data: {
    accounts: Account[];
  };
  timestamp: string;
  path: string;
}

export interface AccountWithSessions {
  accountId: string;
  accountName: string;
  sessionCount: number;
}

export interface AccountsWithSessionsResponse {
  success: boolean;
  message: string;
  data: {
    accountsWithSessions: AccountWithSessions[];
  };
  timestamp: string;
  path: string;
}
