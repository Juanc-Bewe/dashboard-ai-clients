import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// Common filter interface that all data stores can use
export interface CommonFilters {
  startDate: string;
  endDate: string;
  enterpriseIds: string[];
  accountIds: string[];
  timezoneOffset: number;
  channelNames?: string[];
}

// URL query parameter utilities
const serializeFiltersToQuery = (filters: CommonFilters): URLSearchParams => {
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

const parseQueryToFilters = (searchParams: URLSearchParams): Partial<CommonFilters> => {
  const filters: Partial<CommonFilters> = {};

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

// Get default filters
export const getDefaultFilters = (): CommonFilters => {
  const now = new Date();
  const endDate = now.toISOString().split('T')[0];
  const startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return {
    startDate,
    endDate,
    enterpriseIds: [],
    accountIds: [],
    timezoneOffset: -new Date().getTimezoneOffset() / 60,
    channelNames: []
  };
};

// Zustand store interface
interface FiltersStore {
  filters: CommonFilters;

  // Actions
  updateFilters: (filters: Partial<CommonFilters>) => void;
  setFilters: (filters: Partial<CommonFilters>) => void;
  setChannelNames: (channelNames: string[]) => void;
  resetFilters: () => void;

  // URL sync methods
  initializeFromUrl: (searchParams: URLSearchParams) => void;
  getUrlParams: () => URLSearchParams;
}

// Create the shared filters store
export const useFiltersStore = create<FiltersStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    filters: getDefaultFilters(),

    // Update filters (this will trigger subscribers in data stores)
    updateFilters: (newFilters: Partial<CommonFilters>) => {
      const { filters } = get();
      const updatedFilters = { ...filters, ...newFilters };
      set({ filters: updatedFilters });
    },

    // Set filters without triggering automatic data fetching (for URL initialization)
    setFilters: (newFilters) => {
      set((state) => ({
        filters: { ...state.filters, ...newFilters }
      }));
    },

    // Convenience method for setting channel names
    setChannelNames: (channelNames: string[]) => {
      get().updateFilters({ channelNames });
    },

    // Reset to default filters
    resetFilters: () => {
      set({ filters: getDefaultFilters() });
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

// Hook for URL synchronization - can be used by pages
export const useUrlSync = () => {
  const updateFilters = useFiltersStore(state => state.updateFilters);
  const initializeFromUrl = useFiltersStore(state => state.initializeFromUrl);
  const getUrlParams = useFiltersStore(state => state.getUrlParams);
  const setChannelNames = useFiltersStore(state => state.setChannelNames);

  return {
    updateFilters,
    initializeFromUrl,
    getUrlParams,
    setChannelNames,
  };
};
