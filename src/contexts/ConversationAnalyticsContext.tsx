import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { ConversationAnalyticsData } from '../types/conversation-analytics';
import { conversationAnalyticsService, type ConversationAnalyticsFilters } from '../services/conversationAnalyticsService';

export interface ConversationAnalyticsState {
  data: ConversationAnalyticsData | null;
  loading: boolean;
  error: string | null;
  filters: ConversationAnalyticsFilters;
}

// URL query parameter utilities
const serializeFiltersToQuery = (filters: ConversationAnalyticsFilters): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (filters.startDate) params.set('startDate', filters.startDate);
  if (filters.endDate) params.set('endDate', filters.endDate);
  if (filters.enterpriseIds.length > 0) {
    params.set('enterprises', filters.enterpriseIds.join(','));
  }
  if (filters.accountIds.length > 0) {
    params.set('accounts', filters.accountIds.join(','));
  }
  if (filters.channelNames && filters.channelNames.length > 0) {
    params.set('channels', filters.channelNames.join(','));
  }
  if (filters.timezoneOffset !== 0) {
    params.set('timezoneOffset', filters.timezoneOffset.toString());
  }
  
  return params;
};

const parseQueryToFilters = (searchParams: URLSearchParams): Partial<ConversationAnalyticsFilters> => {
  const filters: Partial<ConversationAnalyticsFilters> = {};

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const enterprises = searchParams.get('enterprises');
  const accounts = searchParams.get('accounts');
  const channels = searchParams.get('channels');
  const timezoneOffset = searchParams.get('timezoneOffset');

  if (startDate && /^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    filters.startDate = startDate;
  }

  if (endDate && /^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
    filters.endDate = endDate;
  }

  if (enterprises) {
    filters.enterpriseIds = enterprises.split(',').filter(id => id.trim() !== '');
  }

  if (accounts) {
    filters.accountIds = accounts.split(',').filter(id => id.trim() !== '');
  }

  if (channels) {
    filters.channelNames = channels.split(',').filter(id => id.trim() !== '');
  }

  if (timezoneOffset) {
    const offset = parseInt(timezoneOffset, 10);
    if (!isNaN(offset)) {
      filters.timezoneOffset = offset;
    }
  }

  return filters;
};

// Zustand store interface
interface ConversationAnalyticsStore extends ConversationAnalyticsState {
  // Actions
  fetchData: () => Promise<void>;
  updateFilters: (filters: Partial<ConversationAnalyticsFilters>) => void;
  setFilters: (filters: Partial<ConversationAnalyticsFilters>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setData: (data: ConversationAnalyticsData | null) => void;
  setChannelNames: (channelNames: string[]) => void;
  initializeFromUrl: (searchParams: URLSearchParams) => void;
  getUrlParams: () => URLSearchParams;
}

// Create Zustand store with automatic data fetching
export const useConversationAnalyticsStore = create<ConversationAnalyticsStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    data: null,
    loading: false,
    error: null,
    filters: conversationAnalyticsService.getDefaultFilters(),

    // Fetch conversation analytics data
    fetchData: async () => {
      const { filters } = get();
      set({ loading: true, error: null });

      try {
        const response = await conversationAnalyticsService.getConversationAnalytics(filters);
        set({ data: response.data, loading: false });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        set({ error: errorMessage, loading: false });
      }
    },

    // Update filters and automatically fetch data
    updateFilters: (newFilters: Partial<ConversationAnalyticsFilters>) => {
      const { filters } = get();
      const updatedFilters = { ...filters, ...newFilters };
      set({ filters: updatedFilters });

      // Auto-fetch data when filters change
      get().fetchData();
    },

    // Set filters without auto-fetching (for URL initialization)
    setFilters: (newFilters) => {
      set((state) => ({
        filters: { ...state.filters, ...newFilters }
      }));
    },

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setData: (data) => set({ data }),

    // Convenience method for setting channel names
    setChannelNames: (channelNames: string[]) => {
      get().updateFilters({ channelNames });
    },

    // URL sync methods
    initializeFromUrl: (searchParams: URLSearchParams) => {
      const urlFilters = parseQueryToFilters(searchParams);

      if (Object.keys(urlFilters).length > 0) {
        const { filters } = get();
        const mergedFilters = { ...filters, ...urlFilters };
        set({ filters: mergedFilters });
      }
    },

    getUrlParams: () => {
      const { filters } = get();
      return serializeFiltersToQuery(filters);
    },
  }))
);

// Hook for URL synchronization
export const useUrlSync = () => {
  const updateFilters = useConversationAnalyticsStore(state => state.updateFilters);
  const initializeFromUrl = useConversationAnalyticsStore(state => state.initializeFromUrl);
  const getUrlParams = useConversationAnalyticsStore(state => state.getUrlParams);
  const setChannelNames = useConversationAnalyticsStore(state => state.setChannelNames);
  
  return {
    updateFilters,
    initializeFromUrl,
    getUrlParams,
    setChannelNames,
  };
};


