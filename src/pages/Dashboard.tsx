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

  const fetchEnterprises = useDashboardStore(state => state.fetchEnterprises);
  const isInitialized = useRef(false);

  // Initialize store and URL sync on mount
  useEffect(() => {
    if (!isInitialized.current) {
      // Initialize filters from URL
      const searchParams = new URLSearchParams(location.search);
      initializeFromUrl(searchParams);

      // Load enterprises (which will also trigger initial data fetch)
      fetchEnterprises();

      isInitialized.current = true;
    }
  }, [initializeFromUrl, fetchEnterprises, location.search]);

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="mt-2">Monitor your AI clients performance and metrics</p>
      </div>

      {/* Filters */}
      <DashboardFilters />

      {/* Main Metrics Cards */}
      <DashboardCards />

      {/* Detailed Tabs */}
      <DashboardTabs />
    </div>
  );
}; 