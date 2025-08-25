import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { ConversationAnalyticsFilters } from "../components/ConversationAnalyticsFilters";
import { ConversationAnalyticsTabs } from "../components/ConversationAnalyticsTabs";
import { useFiltersStore, useUrlSync } from "../contexts/FiltersContext";
import { useConversationDataStore } from "../contexts/ConversationDataContext";
import { useNotificationsDataStore } from "../contexts/NotificationsDataContext";
import { useAccountsDataStore } from "../contexts/AccountsDataContext";

export const NewDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get error states from all data stores
  const conversationError = useConversationDataStore((state) => state.error);
  const notificationsError = useNotificationsDataStore((state) => state.error);
  const accountsError = useAccountsDataStore((state) => state.error);

  // Get URL sync methods
  const { initializeFromUrl, getUrlParams } = useUrlSync();

  // Compute overall error state (any error should be shown)
  const error = conversationError || notificationsError || accountsError;


  const isInitialized = useRef(false);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);

  // Initialize store and URL sync on mount
  useEffect(() => {
    if (!isInitialized.current) {
      const searchParams = new URLSearchParams(location.search);
      initializeFromUrl(searchParams);

      isInitialized.current = true;
    }
  }, [initializeFromUrl, location.search]);

  // Subscribe to filter changes and update URL
  useEffect(() => {
    if (!isInitialized.current) return;

    const unsubscribe = useFiltersStore.subscribe(
      (state) => state.filters,
      () => {
        const params = getUrlParams();
        const queryString = params.toString();
        const currentQuery = location.search.replace("?", "");

        // Only update URL if query string actually changed
        if (queryString !== currentQuery) {
          const newUrl = queryString
            ? `${location.pathname}?${queryString}`
            : location.pathname;
          navigate(newUrl, { replace: true });
        }
      }
    );

    return unsubscribe;
  }, [location.pathname, location.search, navigate, getUrlParams]);

  return (
    <div className="space-y-8">

      {/* Filters Section */}
      <section className="relative">
        <div
          className={`transition-all duration-300 ease-in-out ${
            isFiltersCollapsed ? "space-y-0" : "space-y-4"
          }`}
        >
          {/* Filter Header with Toggle Button */}
          <div className="flex items-center justify-between rounded-xl p-3 border border-gray-200 dark:border-gray-700 dark:shadow-lg">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-foreground-600" />
              <h2 className="text-sm font-semibold text-foreground">Filtros</h2>
            </div>
            <div className="flex justify-end">
              <Button
                variant="light"
                size="sm"
                onPress={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
                startContent={
                  isFiltersCollapsed ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )
                }
                className="text-foreground-600 hover:text-foreground text-sm"
              >
                {isFiltersCollapsed ? "Mostrar Filtros" : "Ocultar Filtros"}
              </Button>
            </div>
          </div>

          {/* Collapsible Filter Container */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isFiltersCollapsed
                ? "max-h-0 opacity-0 pointer-events-none mt-0"
                : "max-h-[800px] opacity-100 mt-4"
            }`}
          >
            <div className={isFiltersCollapsed ? "invisible" : "visible"}>
              <ConversationAnalyticsFilters />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="space-y-6 pt-2">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Always show the tabs - let each component handle its own loading */}
        <div className="space-y-4">
          <ConversationAnalyticsTabs />
        </div>
      </section>
    </div>
  );
};
