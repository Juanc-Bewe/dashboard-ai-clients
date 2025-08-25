import { create } from 'zustand';
import { useConversationDataStore } from './ConversationDataContext';
import { useNotificationsDataStore } from './NotificationsDataContext';
import { useAccountsDataStore } from './AccountsDataContext';
import { useChatEventsAnalyticsStore } from './ChatEventsAnalyticsContext';
import { serviceWorkerManager } from '../utils/serviceWorkerUtils';

// Define available tabs
export type TabKey = 'accounts' | 'quality' | 'notifications' | 'adoption-metrics' | 'costs' | 'chat-events';

export interface TabManagementState {
  activeTab: TabKey | null;
  isRefreshing: boolean;
}

interface TabManagementStore extends TabManagementState {
  // Actions
  setActiveTab: (tab: TabKey) => void;
  refreshActiveTab: () => Promise<void>;
  refreshAllTabs: () => Promise<void>;
  setRefreshing: (refreshing: boolean) => void;
}

// Create tab management store
export const useTabManagementStore = create<TabManagementStore>((set, get) => ({
  // Initial state
  activeTab: null,
  isRefreshing: false,

  // Set active tab
  setActiveTab: (tab: TabKey) => {
    set({ activeTab: tab });
  },

  // Refresh only the active tab's data
  refreshActiveTab: async () => {
    const { activeTab } = get();
    if (!activeTab) return;

    set({ isRefreshing: true });

          try {
        // Clear service worker cache before refreshing data
        if (serviceWorkerManager.isServiceWorkerRegistered()) {
          console.log('Clearing service worker cache before refresh...');
          await serviceWorkerManager.clearCache();
        }

        // Prepare promises for parallel execution
        const refreshPromises = [
          // Always refresh conversation data (for StaticMetricsCard and NorthStarMetricCard)
          useConversationDataStore.getState().refreshData(),
        ];

        // Add tab-specific data refresh
        switch (activeTab) {
          case 'notifications':
            refreshPromises.push(useNotificationsDataStore.getState().refreshData());
            break;
          case 'accounts':
            refreshPromises.push(useAccountsDataStore.getState().refreshData());
            break;
          case 'chat-events':
            refreshPromises.push(useChatEventsAnalyticsStore.getState().refreshData());
            break;
          case 'quality':
          case 'adoption-metrics':
          case 'costs':
            // Conversation data already included above
            break;
          default:
            console.warn(`Unknown tab: ${activeTab}`);
        }

        // Execute all refreshes in parallel
        await Promise.all(refreshPromises);
      } catch (error) {
      console.error('Error refreshing active tab:', error);
    } finally {
      set({ isRefreshing: false });
    }
  },

  // Refresh all tabs' data (for when filters change)
  refreshAllTabs: async () => {
    set({ isRefreshing: true });

    try {
      // Clear service worker cache before refreshing all data
      if (serviceWorkerManager.isServiceWorkerRegistered()) {
        console.log('Clearing service worker cache before refreshing all tabs...');
        await serviceWorkerManager.clearCache();
      }

      // Run all refreshes in parallel
      await Promise.all([
        useConversationDataStore.getState().refreshData(),
        useNotificationsDataStore.getState().refreshData(),
        useAccountsDataStore.getState().refreshData(),
        useChatEventsAnalyticsStore.getState().refreshData(),
      ]);
    } catch (error) {
      console.error('Error refreshing all tabs:', error);
    } finally {
      set({ isRefreshing: false });
    }
  },

  // Set refreshing state
  setRefreshing: (refreshing: boolean) => set({ isRefreshing: refreshing }),
}));

// Hook to get refresh functions
export const useTabRefresh = () => {
  const refreshActiveTab = useTabManagementStore(state => state.refreshActiveTab);
  const refreshAllTabs = useTabManagementStore(state => state.refreshAllTabs);
  const isRefreshing = useTabManagementStore(state => state.isRefreshing);
  
  return {
    refreshActiveTab,
    refreshAllTabs,
    isRefreshing,
  };
};
