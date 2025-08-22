import React from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { ConversationAnalyticsData } from '../types/conversation-analytics';
import { conversationAnalyticsService, type ConversationAnalyticsFilters } from '../services/conversationAnalyticsService';
import { useFiltersStore, type CommonFilters } from './FiltersContext';

export interface ConversationDataState {
  data: ConversationAnalyticsData | null;
  loading: boolean;
  error: string | null;
}

// Convert common filters to conversation analytics filters
const convertToConversationFilters = (commonFilters: CommonFilters): ConversationAnalyticsFilters => {
  return {
    startDate: commonFilters.startDate,
    endDate: commonFilters.endDate,
    enterpriseIds: commonFilters.enterpriseIds,
    accountIds: commonFilters.accountIds,
    timezoneOffset: commonFilters.timezoneOffset,
    channelNames: commonFilters.channelNames,
  };
};

// Zustand store interface
interface ConversationDataStore extends ConversationDataState {
  // Actions
  fetchData: (filters?: CommonFilters) => Promise<void>;
  refreshData: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setData: (data: ConversationAnalyticsData | null) => void;
  clearData: () => void;
}

// Create conversation data store
export const useConversationDataStore = create<ConversationDataStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    data: null,
    loading: false,
    error: null,

    // Fetch conversation data
    fetchData: async (filters?: CommonFilters) => {
      // Use provided filters or get from filters store
      const filtersToUse = filters || useFiltersStore.getState().filters;
      
      set({ loading: true, error: null });

      try {
        const conversationFilters = convertToConversationFilters(filtersToUse);
        const response = await conversationAnalyticsService.getConversationAnalytics(conversationFilters);
        set({ data: response.data, loading: false });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        set({ error: errorMessage, loading: false, data: null });
      }
    },

    // Refresh data using current filters
    refreshData: async () => {
      const currentFilters = useFiltersStore.getState().filters;
      await get().fetchData(currentFilters);
    },

    // State setters
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setData: (data) => set({ data }),
    clearData: () => set({ data: null, error: null }),
  }))
);

// Singleton subscription to avoid multiple subscriptions
let conversationFilterSubscription: (() => void) | null = null;
let conversationSubscriptionCount = 0;

// Hook to automatically sync with filter changes
export const useConversationAutoSync = () => {
  React.useEffect(() => {
    conversationSubscriptionCount++;

    // Only create subscription if this is the first subscriber
    if (!conversationFilterSubscription) {
      // Initial fetch with current filters
      const currentFilters = useFiltersStore.getState().filters;
      const { fetchData, data, loading } = useConversationDataStore.getState();
      
      // Only fetch if we don't have data and aren't already loading
      if (!data && !loading) {
        fetchData(currentFilters);
      }

      // Create the subscription
      conversationFilterSubscription = useFiltersStore.subscribe(
        (state) => state.filters,
        (filters) => {
          // Get the fetchData function directly from store state
          const { fetchData } = useConversationDataStore.getState();
          fetchData(filters);
        }
      );
    }

    // Cleanup function
    return () => {
      conversationSubscriptionCount--;
      
      // Only unsubscribe when no more components are using it
      if (conversationSubscriptionCount === 0 && conversationFilterSubscription) {
        conversationFilterSubscription();
        conversationFilterSubscription = null;
      }
    };
  }, []); // Empty dependency array - subscription is stable
};


