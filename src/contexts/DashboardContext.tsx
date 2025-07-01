import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { DashboardState, DashboardFilters } from '../types/dashboard';
import { dashboardService } from '../services/dashboardService';

// URL query parameter utilities
const serializeFiltersToQuery = (filters: DashboardFilters): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (filters.startDate) params.set('startDate', filters.startDate);
  if (filters.endDate) params.set('endDate', filters.endDate);
  if (filters.enterpriseIds.length > 0) {
    params.set('enterprises', filters.enterpriseIds.join(','));
  }
  
  return params;
};

const parseQueryToFilters = (searchParams: URLSearchParams): Partial<DashboardFilters> => {
  const filters: Partial<DashboardFilters> = {};
  
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const enterprises = searchParams.get('enterprises');
  
  if (startDate && /^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    filters.startDate = startDate;
  }
  
  if (endDate && /^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
    filters.endDate = endDate;
  }
  
  if (enterprises) {
    filters.enterpriseIds = enterprises.split(',').filter(id => id.trim() !== '');
  }
  
  return filters;
};

// Helper function for initial filters
const getInitialFilters = (): DashboardFilters => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  return {
    startDate: sevenDaysAgo.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
    enterpriseIds: [],
    timezoneOffset: -(new Date().getTimezoneOffset() / 60)
  };
};

// Zustand store interface
interface DashboardStore extends DashboardState {
  // Actions
  fetchDashboardData: () => Promise<void>;
  fetchEnterprises: () => Promise<void>;
  updateFilters: (filters: Partial<DashboardFilters>) => void;
  setDateRange: (startDate: string, endDate: string) => void;
  setEnterpriseIds: (enterpriseIds: string[]) => void;
  initializeFromUrl: (searchParams: URLSearchParams) => void;
  getUrlParams: () => URLSearchParams;
}

// Create Zustand store with automatic data fetching
export const useDashboardStore = create<DashboardStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    data: null,
    loading: false,
    error: null,
    filters: getInitialFilters(),
    enterprises: [],

    // Fetch dashboard data
    fetchDashboardData: async () => {
      const { filters } = get();
      set({ loading: true, error: null });

      try {
        const response = await dashboardService.fetchDashboardData(filters);

        console.log('response', response);

        if (response.success) {
          console.log('response.data', response.data);
          set({ data: response.data, loading: false });
        } else {
          console.log('response.message', response.message);
          set({ error: response.message || 'Failed to fetch data', loading: false });
        }
      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : 'An error occurred',
          loading: false 
        });
      }
    },

    // Fetch enterprises
    fetchEnterprises: async () => {
      try {
        console.log('Fetching enterprises...');
        const enterprises = await dashboardService.fetchEnterprises();
        console.log('Fetched enterprises:', enterprises);
        set({ enterprises });

        // Auto-fetch dashboard data if we have enterprises and this is the first load
        const { data } = get();
        if (!data && enterprises.length > 0) {
          get().fetchDashboardData();
        }
      } catch (error) {
        console.error('Failed to fetch enterprises:', error);
      }
    },

    // Update filters and automatically fetch data
    updateFilters: (newFilters: Partial<DashboardFilters>) => {
      const { filters, enterprises } = get();
      const updatedFilters = { ...filters, ...newFilters };
      set({ filters: updatedFilters });

      // Auto-fetch data when filters change (if we have enterprises)
      if (enterprises.length > 0) {
        get().fetchDashboardData();
      }
    },

    // Convenience methods
    setDateRange: (startDate: string, endDate: string) => {
      get().updateFilters({ startDate, endDate });
    },

    setEnterpriseIds: (enterpriseIds: string[]) => {
      get().updateFilters({ enterpriseIds });
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
  const updateFilters = useDashboardStore(state => state.updateFilters);
  const initializeFromUrl = useDashboardStore(state => state.initializeFromUrl);
  const getUrlParams = useDashboardStore(state => state.getUrlParams);
  
  return {
    updateFilters,
    initializeFromUrl,
    getUrlParams,
  };
};