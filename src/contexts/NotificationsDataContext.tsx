import React from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { EmailsAnalytics } from '../types/email-analytics-v2';
import type { EmailAnalyticsFilters } from '../types/email-analytics-v2';
import { emailAnalyticsService } from '../services/emailAnalyticsService';
import { useFiltersStore, type CommonFilters } from './FiltersContext';

export interface NotificationsDataState {
  data: EmailsAnalytics | null;
  loading: boolean;
  error: string | null;
}

// Convert common filters to email analytics filters
const convertToEmailFilters = (commonFilters: CommonFilters): EmailAnalyticsFilters => {
  return {
    startDate: commonFilters.startDate,
    endDate: commonFilters.endDate,
    timezoneOffset: commonFilters.timezoneOffset,
    enterpriseIds: commonFilters.enterpriseIds.length > 0 ? commonFilters.enterpriseIds : undefined,
    accountIds: commonFilters.accountIds.length > 0 ? commonFilters.accountIds : undefined,
  };
};

// Zustand store interface
interface NotificationsDataStore extends NotificationsDataState {
  // Actions
  fetchData: (filters?: CommonFilters) => Promise<void>;
  refreshData: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setData: (data: EmailsAnalytics | null) => void;
  clearData: () => void;
}

// Create notifications data store
export const useNotificationsDataStore = create<NotificationsDataStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    data: null,
    loading: false,
    error: null,

    // Fetch notifications data
    fetchData: async (filters?: CommonFilters) => {
      // Use provided filters or get from filters store
      const filtersToUse = filters || useFiltersStore.getState().filters;
      
      set({ loading: true, error: null });

      try {
        const emailFilters = convertToEmailFilters(filtersToUse);
        const data = await emailAnalyticsService.getEmailAnalyticsData(emailFilters);
        set({ data, loading: false });
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
let notificationsFilterSubscription: (() => void) | null = null;
let subscriptionCount = 0;

// Hook to automatically sync with filter changes
export const useNotificationsAutoSync = () => {
  React.useEffect(() => {
    subscriptionCount++;

    // Only create subscription if this is the first subscriber
    if (!notificationsFilterSubscription) {
      // Initial fetch with current filters
      const currentFilters = useFiltersStore.getState().filters;
      const { fetchData, data, loading } = useNotificationsDataStore.getState();
      
      // Only fetch if we don't have data and aren't already loading
      if (!data && !loading) {
        fetchData(currentFilters);
      }

      // Create the subscription
      notificationsFilterSubscription = useFiltersStore.subscribe(
        (state) => state.filters,
        (filters) => {
          // Get the fetchData function directly from store state
          const { fetchData } = useNotificationsDataStore.getState();
          fetchData(filters);
        }
      );
    }

    // Cleanup function
    return () => {
      subscriptionCount--;
      
      // Only unsubscribe when no more components are using it
      if (subscriptionCount === 0 && notificationsFilterSubscription) {
        notificationsFilterSubscription();
        notificationsFilterSubscription = null;
      }
    };
  }, []); // Empty dependency array - subscription is stable
};


