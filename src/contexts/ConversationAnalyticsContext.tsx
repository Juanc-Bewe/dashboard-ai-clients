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

  if (timezoneOffset) {
    const offset = parseInt(timezoneOffset, 10);
    if (!isNaN(offset)) {
      filters.timezoneOffset = offset;
    }
  }

  return filters;
};

// Zustand store
export const useConversationAnalyticsStore = create<ConversationAnalyticsState & {
  setFilters: (filters: Partial<ConversationAnalyticsFilters>) => void;
  fetchData: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setData: (data: ConversationAnalyticsData | null) => void;
}>()(
  subscribeWithSelector((set, get) => ({
    data: null,
    loading: false,
    error: null,
    filters: conversationAnalyticsService.getDefaultFilters(),

    setFilters: (newFilters) => {
      set((state) => ({
        filters: { ...state.filters, ...newFilters }
      }));
    },

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

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setData: (data) => set({ data })
  }))
);

// URL sync utilities
export const useUrlSync = () => {
  const getUrlParams = (): URLSearchParams => {
    const { filters } = useConversationAnalyticsStore.getState();
    return serializeFiltersToQuery(filters);
  };

  const initializeFromUrl = (searchParams: URLSearchParams) => {
    const defaultFilters = conversationAnalyticsService.getDefaultFilters();
    const urlFilters = parseQueryToFilters(searchParams);
    
    const mergedFilters = {
      ...defaultFilters,
      ...urlFilters
    };

    useConversationAnalyticsStore.getState().setFilters(mergedFilters);
  };

  return {
    getUrlParams,
    initializeFromUrl
  };
};
