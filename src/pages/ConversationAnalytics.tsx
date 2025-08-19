import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { ConversationAnalyticsFilters } from '../components/ConversationAnalyticsFilters';
import { ConversationAnalyticsTabs } from '../components/ConversationAnalyticsTabs';
import { useConversationAnalyticsStore, useUrlSync } from '../contexts/ConversationAnalyticsContext';

export const ConversationAnalytics: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { initializeFromUrl, getUrlParams } = useUrlSync();

  const loading = useConversationAnalyticsStore((state) => state.loading);
  const error = useConversationAnalyticsStore((state) => state.error);
  const fetchData = useConversationAnalyticsStore((state) => state.fetchData);

  const isInitialized = useRef(false);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);

  // Initialize store and URL sync on mount
  useEffect(() => {
    if (!isInitialized.current) {
      // Initialize filters from URL
      const searchParams = new URLSearchParams(location.search);
      initializeFromUrl(searchParams);

      // Fetch initial data
      fetchData();

      isInitialized.current = true;
    }
  }, [initializeFromUrl, location.search, fetchData]);

  // Subscribe to filter changes and update URL
  useEffect(() => {
    if (!isInitialized.current) return;

    const unsubscribe = useConversationAnalyticsStore.subscribe(
      (state) => state.filters,
      () => {
        const params = getUrlParams();
        const queryString = params.toString();
        const currentQuery = location.search.replace('?', '');

        // Only update URL if query string actually changed
        if (queryString !== currentQuery) {
          const newUrl = queryString ? `${location.pathname}?${queryString}` : location.pathname;
          navigate(newUrl, { replace: true });
        }
      }
    );

    return unsubscribe;
  }, [location.pathname, location.search, navigate, getUrlParams]);

  // Auto-fetch data when filters change
  useEffect(() => {
    if (isInitialized.current) {
      fetchData();
    }
  }, [useConversationAnalyticsStore((state) => state.filters), fetchData]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-foreground">Análisis de Conversaciones</h1>
        <p className="mt-2 text-foreground-600">Monitorea las métricas de conversaciones y el rendimiento de cuentas</p>
      </div>

      {/* Filters Section */}
      <section className="relative">
        <div className={`transition-all duration-300 ease-in-out ${
          isFiltersCollapsed ? 'space-y-0' : 'space-y-4'
        }`}>
          {/* Filter Header with Toggle Button */}
          <div className="flex items-center justify-between rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-foreground-600" />
              <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
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
                {isFiltersCollapsed ? 'Mostrar Filtros' : 'Ocultar Filtros'}
              </Button>
            </div>
          </div>

          {/* Collapsible Filter Container */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isFiltersCollapsed
                ? 'max-h-0 opacity-0 pointer-events-none mt-0'
                : 'max-h-[800px] opacity-100 mt-4'
            }`}
          >
            <div className={isFiltersCollapsed ? 'invisible' : 'visible'}>
              <ConversationAnalyticsFilters />
            </div>
          </div>
        </div>
      </section>

            {/* Main Content */}
      <section className="space-y-6 pt-2">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-foreground-600">Cargando análisis de conversaciones...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            <ConversationAnalyticsTabs />
          </div>
        )}
      </section>
    </div>
  );
};
