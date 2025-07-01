import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DashboardFilters } from '../components/DashboardFilters';
import { DashboardCards } from '../components/DashboardCards';
import { DashboardTabs } from '../components/DashboardTabs';
import { useDashboardStore, useUrlSync } from '../contexts/DashboardContext';

export const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { initializeFromUrl, getUrlParams } = useUrlSync();

  const isInitialized = useRef(false);
  // const skipNextUrlSync = useRef(false);

  // Initialize store and URL sync on mount
  useEffect(() => {
    if (!isInitialized.current) {
      // Initialize filters from URL
      const searchParams = new URLSearchParams(location.search);

      initializeFromUrl(searchParams);

      isInitialized.current = true;
    }
  }, [initializeFromUrl, location.search]);

  // Subscribe to filter changes and update URL
  useEffect(() => {
    if (!isInitialized.current) return;

    const unsubscribe = useDashboardStore.subscribe(
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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="mt-2 text-foreground-600">Monitor your AI clients performance and metrics</p>
      </div>

      {/* Filters Section */}
      <section className="relative">
        <DashboardFilters />
        {/* Subtle separator line */}
      </section>

      {/* Main Dashboard Content */}
      <section className="space-y-6 pt-2">
        {/* Metrics Overview */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-foreground">Key Metrics Overview</h2>
          </div>
          <DashboardCards />
        </div>

        {/* Detailed Analytics */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-foreground">Detailed Analytics</h2>
          </div>
          <DashboardTabs />
        </div>
      </section>
    </div>
  );
}; 