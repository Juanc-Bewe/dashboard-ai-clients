import React from 'react';
import { DateRangePicker, Select, SelectItem, Button } from '@heroui/react';
import { parseDate } from '@internationalized/date';
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

  const handleRefresh = () => {
    fetchDashboardData();
  };

  return (
    <div className="p-3 sm:p-4 rounded-lg shadow-sm border">
      <div className="flex flex-col gap-4">
        {/* Date Range and Enterprise Selector */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <DateRangePicker
              label="Date Range"
              value={dateRangeValue}
              onChange={handleDateRangeChange}
              size="sm"
              className="w-full"
              granularity="day"
              variant="bordered"
            />
          </div>

          <div className="flex-1">
            <Select
              label="Enterprises"
              placeholder="Select enterprises"
              selectionMode="multiple"
              selectedKeys={new Set(filters.enterpriseIds)}
              onSelectionChange={(keys) => handleEnterpriseChange(keys as Set<string>)}
              variant="bordered"
              size="sm"
              className="w-full"
            >
              {enterprises.map((enterprise) => (
                <SelectItem key={enterprise.id}>
                  {enterprise.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center sm:justify-end">
          <Button
            color="primary"
            onPress={handleRefresh}
            isLoading={loading}
            variant="flat"
            size="md"
            className="w-12 h-12 sm:w-auto sm:h-auto sm:px-4"
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