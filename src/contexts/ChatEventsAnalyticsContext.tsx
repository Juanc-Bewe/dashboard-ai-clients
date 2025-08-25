import React from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { ChatEventsAnalyticsData } from '../types/chat-events-analytics';
import { chatEventsAnalyticsService, type ChatEventsAnalyticsFilters } from '../services/chatEventsAnalyticsService';
import { useFiltersStore, type CommonFilters } from './FiltersContext';

export interface ChatEventsAnalyticsState {
  data: ChatEventsAnalyticsData | null;
  loading: boolean;
  error: string | null;
}

// Convert common filters to chat events analytics filters
const convertToChatEventsFilters = (commonFilters: CommonFilters): ChatEventsAnalyticsFilters => {
  return {
    startDate: commonFilters.startDate,
    endDate: commonFilters.endDate,
    timezoneOffset: commonFilters.timezoneOffset,
    enterpriseIds: commonFilters.enterpriseIds,
    accountIds: commonFilters.accountIds,
    channelNames: commonFilters.channelNames,
  };
};

// Zustand store interface
interface ChatEventsAnalyticsStore extends ChatEventsAnalyticsState {
  // Actions
  fetchData: (filters?: CommonFilters) => Promise<void>;
  refreshData: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setData: (data: ChatEventsAnalyticsData | null) => void;
  clearData: () => void;
}

// Create chat events analytics store
export const useChatEventsAnalyticsStore = create<ChatEventsAnalyticsStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    data: null,
    loading: false,
    error: null,

    // Fetch chat events analytics data
    fetchData: async (filters?: CommonFilters) => {
      // Use provided filters or get from filters store
      const filtersToUse = filters || useFiltersStore.getState().filters;
      
      set({ loading: true, error: null });

      try {
        const chatEventsFilters = convertToChatEventsFilters(filtersToUse);
        const response = await chatEventsAnalyticsService.getChatEventsAnalytics(chatEventsFilters);
        
        if (response.success) {
          set({ data: response.data, loading: false, error: null });
        } else {
          set({ data: null, loading: false, error: response.message || 'Error fetching chat events analytics data' });
        }
      } catch (error) {
        console.error('Error fetching chat events analytics:', error);
        set({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Error fetching chat events analytics data' 
        });
      }
    },

    // Refresh data using current filters
    refreshData: async () => {
      const currentFilters = useFiltersStore.getState().filters;
      await get().fetchData(currentFilters);
    },

    // Set loading state
    setLoading: (loading: boolean) => set({ loading }),

    // Set error state
    setError: (error: string | null) => set({ error }),

    // Set data
    setData: (data: ChatEventsAnalyticsData | null) => set({ data }),

    // Clear all data
    clearData: () => set({ data: null, loading: false, error: null }),
  }))
);

// Hook for auto-syncing with filters
export const useChatEventsAutoSync = () => {
  const fetchData = useChatEventsAnalyticsStore(state => state.fetchData);
  
  React.useEffect(() => {
    // Subscribe to filter changes
    const unsubscribe = useFiltersStore.subscribe(
      (state) => state.filters,
      (filters) => {
        fetchData(filters);
      },
      {
        // Fire immediately on subscription
        fireImmediately: true,
      }
    );

    return unsubscribe;
  }, [fetchData]);
};

// Hook for accessing chat events analytics data
export const useChatEventsAnalytics = () => {
  const data = useChatEventsAnalyticsStore(state => state.data);
  const loading = useChatEventsAnalyticsStore(state => state.loading);
  const error = useChatEventsAnalyticsStore(state => state.error);
  const fetchData = useChatEventsAnalyticsStore(state => state.fetchData);
  const refreshData = useChatEventsAnalyticsStore(state => state.refreshData);

  return {
    data,
    loading,
    error,
    fetchData,
    refreshData,
  };
};
