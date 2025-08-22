import { mockAccountsResponse } from '../mocks/accounts';
import type { AccountsResponse, Account } from '../types/acounts';

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

export const getAccountsData = async (): Promise<AccountsResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAccountsResponse;
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

  // Channel Distribution
  let whatsappActive = 0;
  let whatsappInactive = 0;
  let webActive = 0;
  let webInactive = 0;
  let multiChannel = 0;

  accounts.forEach(account => {
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

  // Automode Distribution
  const automodeDistribution = {
    withAutomode: accounts.filter(acc => acc.hasAutomode).length,
    withoutAutomode: accounts.filter(acc => !acc.hasAutomode).length,
  };

  // Active Status
  const activeStatus = {
    active: accounts.filter(acc => acc.active).length,
    inactive: accounts.filter(acc => !acc.active).length,
  };

  return {
    totalAccounts,
    configurationStatus,
    channelDistribution,
    automodeDistribution,
    activeStatus,
  };
};
