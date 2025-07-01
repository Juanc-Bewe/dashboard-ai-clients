import React from 'react';
import { DateRangePicker, Select, SelectItem, Button, Checkbox } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import { RefreshCw } from 'lucide-react';
import { useDashboardStore } from '../contexts/DashboardContext';
import type { DateRangeValue } from '../types/dashboard';

export const DashboardFilters: React.FC = () => {
  const filters = useDashboardStore(state => state.filters);
  const enterprises = useDashboardStore(state => state.enterprises);
  const loading = useDashboardStore(state => state.loading);
  const setDateRange = useDashboardStore(state => state.setDateRange);
  const setEnterpriseIds = useDashboardStore(state => state.setEnterpriseIds);
  const fetchDashboardData = useDashboardStore(state => state.fetchDashboardData);

  console.log('DashboardFilters - enterprises:', enterprises);

  // Create date range value from filters
  const dateRangeValue = React.useMemo(() => {
    try {
      return {
        start: parseDate(filters.startDate),
        end: parseDate(filters.endDate)
      };
    } catch {
      return null;
    }
  }, [filters.startDate, filters.endDate]);

  const handleDateRangeChange = (value: DateRangeValue | null) => {
    if (value) {
      setDateRange(value.start.toString(), value.end.toString());
    }
  };

  const handleEnterpriseChange = (keys: Set<string>) => {
    console.log('keys', keys);
    setEnterpriseIds(Array.from(keys));
  };

  const handleSelectAllToggle = () => {
    // Only unselect all - remove select all functionality
    setEnterpriseIds([]);
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  return (
    <div className="p-3 sm:p-4 rounded-lg shadow-sm border">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-start">
        {/* Date Range Filter */}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-600">Date Range</label>
            <I18nProvider locale="en-CA">
              <DateRangePicker
                value={dateRangeValue}
                onChange={handleDateRangeChange}
                size="sm"
                className="w-full"
                granularity="day"
                variant="bordered"
                aria-label="Select date range"
              />
            </I18nProvider>
          </div>
        </div>

        {/* Enterprise Filter Group */}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground-600">Enterprises</label>
              {enterprises.length > 0 && filters.enterpriseIds.length > 0 && (
                <Checkbox
                  isSelected={false}
                  onValueChange={handleSelectAllToggle}
                  size="sm"
                  className="text-xs"
                >
                  Clear All ({filters.enterpriseIds.length})
                </Checkbox>
              )}
            </div>
            <Select
              placeholder="Select enterprises"
              selectionMode="multiple"
              selectedKeys={new Set(filters.enterpriseIds)}
              onSelectionChange={(keys) => handleEnterpriseChange(keys as Set<string>)}
              variant="bordered"
              size="sm"
              className="w-full"
              aria-label="Select enterprises"
            >
              {enterprises.map((enterprise) => (
                <SelectItem key={enterprise.id}>
                  {enterprise.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center lg:justify-start lg:pt-6">
          <Button
            color="primary"
            onPress={handleRefresh}
            isLoading={loading}
            variant="flat"
            size="md"
            className="w-12 h-12 lg:w-auto lg:h-auto lg:px-4"
            radius="full"
            isIconOnly
            aria-label="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}; 