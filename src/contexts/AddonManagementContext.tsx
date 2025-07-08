import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { 
  AddonManagementState, 
  AddonManagementData, 
  AddonManagementFilters 
} from '../types/addon-managment';
import { addonManagementService } from '../services/addonManagementService';
import { getDefaultDateRange } from '../utils/apiHelpers';

// Actions
type AddonManagementAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DATA'; payload: AddonManagementData }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTERS'; payload: Partial<AddonManagementFilters> }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number };

// Get default date range
const defaultDateRange = getDefaultDateRange();

// Initial state
const initialState: AddonManagementState = {
  data: null,
  loading: false,
  error: null,
  filters: {
    startDate: defaultDateRange.startDate,
    endDate: defaultDateRange.endDate,
    timezoneOffset: 0,
    accountIds: [],
    enterpriseIds: [],
  },
  currentPage: 1,
  itemsPerPage: 10,
};

// Reducer
const addonManagementReducer = (
  state: AddonManagementState,
  action: AddonManagementAction
): AddonManagementState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_FILTERS':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload },
        currentPage: 1 // Reset to first page when filters change
      };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_ITEMS_PER_PAGE':
      return { ...state, itemsPerPage: action.payload, currentPage: 1 };
    default:
      return state;
  }
};

// Context type
interface AddonManagementContextType {
  state: AddonManagementState;
  setLoading: (loading: boolean) => void;
  setData: (data: AddonManagementData) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<AddonManagementFilters>) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  refreshData: () => Promise<void>;
}

// Context
const AddonManagementContext = createContext<AddonManagementContextType | null>(null);

// Provider component
export const AddonManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(addonManagementReducer, initialState);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setData = useCallback((data: AddonManagementData) => {
    dispatch({ type: 'SET_DATA', payload: data });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setFilters = useCallback(async (filters: Partial<AddonManagementFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    // Automatically refresh data when filters change
    try {
      setLoading(true);
      const updatedFilters = { ...state.filters, ...filters };
      const response = await addonManagementService.fetchAddonManagementData(updatedFilters);
      setData(response.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  }, [state.filters, setLoading, setData, setError]);

  const setCurrentPage = useCallback((page: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  }, []);

  const setItemsPerPage = useCallback((itemsPerPage: number) => {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: itemsPerPage });
  }, []);

    const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Call the real API service
      const response = await addonManagementService.fetchAddonManagementData(state.filters);
      
      setData(response.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  }, [state.filters, setLoading, setData, setError]);

  const value: AddonManagementContextType = {
    state,
    setLoading,
    setData,
    setError,
    setFilters,
    setCurrentPage,
    setItemsPerPage,
    refreshData,
  };

  return (
    <AddonManagementContext.Provider value={value}>
      {children}
    </AddonManagementContext.Provider>
  );
};

// Hook to use the context
export const useAddonManagement = () => {
  const context = useContext(AddonManagementContext);
  if (!context) {
    throw new Error('useAddonManagement must be used within an AddonManagementProvider');
  }
  return context;
}; 