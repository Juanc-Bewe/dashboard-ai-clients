import React from "react";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { Account } from "../types/acounts";
import {
  getAccountsData,
  calculateAccountsMetrics,
  type AccountsMetrics,
} from "../services/accountsService";
import { useFiltersStore, type CommonFilters } from "./FiltersContext";

export interface AccountsDataState {
  accounts: Account[];
  metrics: AccountsMetrics | null;
  loading: boolean;
  error: string | null;
}

// Convert common filters to business filters
const convertToBusinessFilters = (commonFilters: CommonFilters) => {
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
interface AccountsDataStore extends AccountsDataState {
  // Actions
  fetchData: (filters?: CommonFilters) => Promise<void>;
  refreshData: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setData: (accounts: Account[], metrics: AccountsMetrics | null) => void;
  clearData: () => void;
}

// Create accounts data store
export const useAccountsDataStore = create<AccountsDataStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    accounts: [],
    metrics: null,
    loading: false,
    error: null,

    // Fetch accounts data
    fetchData: async (filters?: CommonFilters) => {
      // Use provided filters or get from filters store
      const filtersToUse = filters || useFiltersStore.getState().filters;

      set({ loading: true, error: null });

      try {
        const businessFilters = convertToBusinessFilters(filtersToUse);
        const response = await getAccountsData(businessFilters);

        if (response.success) {
          const accounts = response.data.accounts;
          const calculatedMetrics = calculateAccountsMetrics(accounts);
          set({
            accounts,
            metrics: calculatedMetrics,
            loading: false,
            error: null,
          });
        } else {
          set({
            error: "Error al cargar los datos de cuentas",
            loading: false,
            accounts: [],
            metrics: null,
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Error al cargar los datos de cuentas";
        set({
          error: errorMessage,
          loading: false,
          accounts: [],
          metrics: null,
        });
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
    setData: (accounts, metrics) => set({ accounts, metrics }),
    clearData: () => set({ accounts: [], metrics: null, error: null }),
  }))
);

// Singleton subscription to avoid multiple subscriptions
let accountsFilterSubscription: (() => void) | null = null;
let accountsSubscriptionCount = 0;

// Hook to automatically sync with filter changes
export const useAccountsAutoSync = () => {
  React.useEffect(() => {
    accountsSubscriptionCount++;

    // Only create subscription if this is the first subscriber
    if (!accountsFilterSubscription) {
      // Initial fetch with current filters
      const currentFilters = useFiltersStore.getState().filters;
      const { fetchData, metrics, loading } = useAccountsDataStore.getState();

      // Only fetch if we don't have data and aren't already loading
      if (!metrics && !loading) {
        fetchData(currentFilters);
      }

      // Create the subscription
      accountsFilterSubscription = useFiltersStore.subscribe(
        (state) => state.filters,
        (filters) => {
          // Get the fetchData function directly from store state
          const { fetchData } = useAccountsDataStore.getState();
          fetchData(filters);
        }
      );
    }

    // Cleanup function
    return () => {
      accountsSubscriptionCount--;

      // Only unsubscribe when no more components are using it
      if (accountsSubscriptionCount === 0 && accountsFilterSubscription) {
        accountsFilterSubscription();
        accountsFilterSubscription = null;
      }
    };
  }, []); // Empty dependency array - subscription is stable
};
