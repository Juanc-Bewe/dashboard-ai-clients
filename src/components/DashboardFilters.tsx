import React from 'react';
import { DateRangePicker, Select, SelectItem, Button, Checkbox } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import { RefreshCw, Calendar, CalendarDays, Clock } from 'lucide-react';
import { useDashboardStore } from '../contexts/DashboardContext';
import type { DateRangeValue } from '../types/dashboard';

export const DashboardFilters: React.FC = () => {
  const filters = useDashboardStore(state => state.filters);
  const enterprises = useDashboardStore(state => state.enterprises);
  const loading = useDashboardStore(state => state.loading);
  const setDateRange = useDashboardStore(state => state.setDateRange);
  const setEnterpriseIds = useDashboardStore(state => state.setEnterpriseIds);
  const fetchDashboardData = useDashboardStore(state => state.fetchDashboardData);

  // State to track selected shortcut
  const [selectedShortcut, setSelectedShortcut] = React.useState<Set<string>>(new Set());

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
      // Clear the shortcut selection when manually changing dates
      setSelectedShortcut(new Set());
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

  // Date shortcut functions
  const getDateShortcuts = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const past7Days = new Date(today);
    const past15Days = new Date(today);
    
    // Get Monday as start of week
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(today.getDate() - daysToMonday);
    
    // Calculate past days
    past7Days.setDate(today.getDate() - 7);
    past15Days.setDate(today.getDate() - 15);
    
    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    return {
      today: {
        start: formatDate(today),
        end: formatDate(today)
      },
      thisWeek: {
        start: formatDate(startOfWeek),
        end: formatDate(today)
      },
      currentMonth: {
        start: formatDate(startOfMonth),
        end: formatDate(today)
      },
      past7Days: {
        start: formatDate(past7Days),
        end: formatDate(today)
      },
      past15Days: {
        start: formatDate(past15Days),
        end: formatDate(today)
      }
    };
  };

  const handleDateShortcut = (shortcut: 'today' | 'thisWeek' | 'currentMonth' | 'past7Days' | 'past15Days') => {
    const shortcuts = getDateShortcuts();
    const range = shortcuts[shortcut];
    setDateRange(range.start, range.end);
  };

  const handleQuickDateChange = (keys: any) => {
    const selectedKey = Array.from(keys as Set<string>)[0];
    if (selectedKey && selectedKey !== 'custom') {
      handleDateShortcut(selectedKey as 'today' | 'thisWeek' | 'currentMonth' | 'past7Days' | 'past15Days');
      // Update the selected shortcut state
      setSelectedShortcut(keys as Set<string>);
    }
  };

  return (
    <div className="dark:border dark:border-gray-700 rounded-xl dark:shadow-lg p-4 sm:p-6">
      {/* Filter Header */}

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-start">
        {/* Date Range Filter */}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-600">Date Range</label>
            <div className="flex gap-2">
              <div className="flex-1">
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
              <div className="w-36">
                <Select
                  placeholder="Quick select"
                  size="sm"
                  variant="bordered"
                  aria-label="Quick date shortcuts"
                  selectedKeys={selectedShortcut}
                  onSelectionChange={handleQuickDateChange}
                  className="w-full"
                >
                  <SelectItem key="today" startContent={<Clock className="w-3 h-3" />}>
                    Today
                  </SelectItem>
                  <SelectItem key="thisWeek" startContent={<CalendarDays className="w-3 h-3" />}>
                    This Week
                  </SelectItem>
                  <SelectItem key="past7Days" startContent={<CalendarDays className="w-3 h-3" />}>
                    Past 7 Days
                  </SelectItem>
                  <SelectItem key="past15Days" startContent={<CalendarDays className="w-3 h-3" />}>
                    Past 15 Days
                  </SelectItem>
                  <SelectItem key="currentMonth" startContent={<Calendar className="w-3 h-3" />}>
                    This Month
                  </SelectItem>
                </Select>
              </div>
            </div>
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