import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConversationAnalyticsFilters } from '../components/ConversationAnalyticsFilters';
import { useConversationAnalyticsStore, useUrlSync } from '../contexts/ConversationAnalyticsContext';

export const ConversationAnalytics: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { initializeFromUrl, getUrlParams } = useUrlSync();

  const data = useConversationAnalyticsStore((state) => state.data);
  const loading = useConversationAnalyticsStore((state) => state.loading);
  const error = useConversationAnalyticsStore((state) => state.error);
  const fetchData = useConversationAnalyticsStore((state) => state.fetchData);

  const isInitialized = useRef(false);

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
        <h1 className="text-3xl font-bold text-foreground">Conversation Analytics</h1>
        <p className="mt-2 text-foreground-600">Monitor conversation metrics and account performance</p>
      </div>

      {/* Filters Section */}
      <section className="relative">
        <ConversationAnalyticsFilters />
      </section>

      {/* Main Content */}
      <section className="space-y-6 pt-2">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-foreground-600">Loading conversation analytics...</span>
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

        {data && !loading && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-foreground">Overview</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Current Period Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Conversations</p>
                      <p className="text-2xl font-bold text-foreground">{data.current.totalConversations.toLocaleString()}</p>
                    </div>
                    <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Accounts</p>
                      <p className="text-2xl font-bold text-foreground">{data.current.totalAccounts.toLocaleString()}</p>
                    </div>
                    <div className="h-8 w-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Useful Conversations</p>
                      <p className="text-2xl font-bold text-foreground">{data.current.totalUsefulConversations.toLocaleString()}</p>
                    </div>
                    <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Useful %</p>
                      <p className="text-2xl font-bold text-foreground">{data.current.percentageOfUsefulConversations.toFixed(1)}%</p>
                    </div>
                    <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                      <svg className="h-4 w-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-foreground">Period Comparison</h2>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accounts with Equal/More</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{data.comparison.totalAccountsWithEqualOrMore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accounts Lost</p>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">{data.comparison.totalAccountsLost}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Change</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {data.comparison.totalCurrentAccounts - data.comparison.totalPreviousAccounts > 0 ? '+' : ''}
                      {data.comparison.totalCurrentAccounts - data.comparison.totalPreviousAccounts}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
