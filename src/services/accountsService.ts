import type { AccountsResponse, Account, AccountsWithSessionsResponse } from '../types/acounts';
import { createApiClient } from '../utils/apiHelpers';

// Create API client instance
const apiClient = createApiClient();

export interface BusinessAnalyticsFilters {
  startDate: string;
  endDate: string;
  timezoneOffset?: number;
  enterpriseIds?: string[];
  accountIds?: string[];
  channelNames?: string[];
}

export interface AccountsMetrics {
  totalAccounts: number;
  configurationStatus: {
    completed: number;
    failed: number;
    pending: number;
    inProgress: number;
    notStarted: number;
  };
  channelDistribution: {
    whatsapp: { active: number; inactive: number; total: number; percentage: number };
    web: { active: number; inactive: number; total: number; percentage: number };
    multiChannel: number;
  };
  automodeDistribution: {
    withAutomode: number;
    withoutAutomode: number;
  };
  activeStatus: {
    active: number;
    inactive: number;
  };
}

export const getAccountsData = async (filters: BusinessAnalyticsFilters): Promise<AccountsResponse> => {
  try {
    const params: Record<string, any> = {};

    // Add optional filters if provided (no date params - accounts data is atemporal)
    if (filters.enterpriseIds && filters.enterpriseIds.length > 0) {
      params.enterpriseIds = filters.enterpriseIds.join(',');
    }
    if (filters.accountIds && filters.accountIds.length > 0) {
      params.accountIds = filters.accountIds.join(',');
    }
    if (filters.channelNames && filters.channelNames.length > 0) {
      params.channelNames = filters.channelNames.join(',');
    }

    const response = await apiClient.get('/lite/v1/analytics/business/base', {
      params
    });
    return response.data;

    // Mock data fallback (commented out)
    /*
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAccountsResponse;
    */
  } catch (error) {
    console.error('Error fetching accounts data:', error);
    throw new Error('Failed to fetch accounts data');
  }
};

export const getAccountsWithSessionsData = async (filters: BusinessAnalyticsFilters): Promise<AccountsWithSessionsResponse> => {
  try {
    const params: Record<string, any> = {
      startDate: filters.startDate,
      endDate: filters.endDate
    };

    // Add optional filters if provided
    if (filters.timezoneOffset !== undefined) {
      params.timezoneOffset = filters.timezoneOffset;
    }
    if (filters.enterpriseIds && filters.enterpriseIds.length > 0) {
      params.enterpriseIds = filters.enterpriseIds.join(',');
    }
    if (filters.accountIds && filters.accountIds.length > 0) {
      params.accountIds = filters.accountIds.join(',');
    }
    if (filters.channelNames && filters.channelNames.length > 0) {
      params.channelNames = filters.channelNames.join(',');
    }

    const response = await apiClient.get('/lite/v1/analytics/business/activity', {
      params
    });
    return response.data;

    // Mock data fallback (commented out)
    /*
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAccountsWithSessionsResponse;
    */
  } catch (error) {
    console.error('Error fetching accounts with sessions data:', error);
    throw new Error('Failed to fetch accounts with sessions data');
  }
};

export const calculateAccountsMetrics = (accounts: Account[]): AccountsMetrics => {
  const totalAccounts = accounts.length;

  // Configuration Status
  const configurationStatus = {
    completed: accounts.filter(acc => acc.onboardingCurrentState === 'COMPLETED').length,
    failed: accounts.filter(acc => acc.onboardingCurrentState === 'FAILED').length,
    pending: accounts.filter(acc => acc.onboardingCurrentState === 'PENDING').length,
    inProgress: accounts.filter(acc => acc.onboardingCurrentState === 'IN_PROGRESS').length,
    notStarted: accounts.filter(acc => !acc.onboardingCurrentState || (acc.onboardingCurrentState as string) === '').length,
  };

  // Channel Distribution - with safety checks
  let whatsappActive = 0;
  let whatsappInactive = 0;
  let webActive = 0;
  let webInactive = 0;
  let multiChannel = 0;

  accounts.forEach(account => {
    // Safety check for channels array
    if (!account.channels || !Array.isArray(account.channels)) {
      return; // Skip this account if channels is not available
    }

    const whatsappChannel = account.channels.find(ch => ch.type === 'whatsapp');
    const webChannel = account.channels.find(ch => ch.type === 'web');
    
    // Count active channels per account
    const activeChannels = account.channels.filter(ch => ch.active).length;
    if (activeChannels > 1) {
      multiChannel++;
    }

    // Count WhatsApp channels
    if (whatsappChannel) {
      if (whatsappChannel.active) {
        whatsappActive++;
      } else {
        whatsappInactive++;
      }
    }

    // Count Web channels
    if (webChannel) {
      if (webChannel.active) {
        webActive++;
      } else {
        webInactive++;
      }
    }
  });

  const whatsappTotal = whatsappActive + whatsappInactive;
  const webTotal = webActive + webInactive;

  const channelDistribution = {
    whatsapp: {
      active: whatsappActive,
      inactive: whatsappInactive,
      total: whatsappTotal,
      percentage: totalAccounts > 0 ? (whatsappTotal / totalAccounts) * 100 : 0
    },
    web: {
      active: webActive,
      inactive: webInactive,
      total: webTotal,
      percentage: totalAccounts > 0 ? (webTotal / totalAccounts) * 100 : 0
    },
    multiChannel
  };

  // Automode Distribution - with safety checks
  const automodeDistribution = {
    withAutomode: accounts.filter(acc => acc.hasAutomode === true).length,
    withoutAutomode: accounts.filter(acc => acc.hasAutomode === false || acc.hasAutomode === undefined).length,
  };

  // Active Status - with safety checks
  const activeStatus = {
    active: accounts.filter(acc => acc.active === true).length,
    inactive: accounts.filter(acc => acc.active === false || acc.active === undefined).length,
  };

  return {
    totalAccounts,
    configurationStatus,
    channelDistribution,
    automodeDistribution,
    activeStatus,
  };
};

// Get default filters for business analytics
export const getDefaultBusinessFilters = (): BusinessAnalyticsFilters => {
  const now = new Date();
  const endDate = now.toISOString().split('T')[0];
  const startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  return {
    startDate,
    endDate,
    timezoneOffset: -new Date().getTimezoneOffset() / 60
  };
};
