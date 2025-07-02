import React from "react";
import {
  DateRangePicker,
  Select,
  SelectItem,
  Button,
  Checkbox,
  Input,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import {
  RefreshCw,
  Calendar,
  CalendarDays,
  Clock,
  Hash,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { useDashboardStore } from "../contexts/DashboardContext";
import { useAuth } from "../contexts/AuthContext";
import type { DateRangeValue } from "../types/dashboard";

export const DashboardFilters: React.FC = () => {
  const filters = useDashboardStore((state) => state.filters);
  const enterprises = useDashboardStore((state) => state.enterprises);
  const loading = useDashboardStore((state) => state.loading);
  const setDateRange = useDashboardStore((state) => state.setDateRange);
  const setEnterpriseIds = useDashboardStore((state) => state.setEnterpriseIds);
  const setAccountIds = useDashboardStore((state) => state.setAccountIds);
  const setChannelNames = useDashboardStore((state) => state.setChannelNames);
  const fetchDashboardData = useDashboardStore(
    (state) => state.fetchDashboardData
  );
  const setEnterprises = useDashboardStore((state) => state.setEnterprises);

  // Get auth data
  const { availableEnterprises, availableChannels, isAuthenticated } =
    useAuth();

  // State to track selected shortcut
  const [selectedShortcut, setSelectedShortcut] = React.useState<Set<string>>(
    new Set()
  );
  // State to track range validation
  const [isRangeInvalid, setIsRangeInvalid] = React.useState(false);
  // State to track account IDs input
  const [accountIdsInput, setAccountIdsInput] = React.useState<string>(() =>
    filters.accountIds.join(", ")
  );

  // Sync enterprises from auth context
  React.useEffect(() => {
    if (isAuthenticated && availableEnterprises.length > 0) {
      setEnterprises(availableEnterprises);
    }
  }, [availableEnterprises, isAuthenticated, setEnterprises]);

  // Sync account IDs input when filters change
  React.useEffect(() => {
    setAccountIdsInput(filters.accountIds.join(", "));
  }, [filters.accountIds]);

  // Create date range value from filters
  const dateRangeValue = React.useMemo(() => {
    try {
      return {
        start: parseDate(filters.startDate),
        end: parseDate(filters.endDate),
      };
    } catch {
      return null;
    }
  }, [filters.startDate, filters.endDate]);

  const handleDateRangeChange = (value: DateRangeValue | null) => {
    if (value) {
      // Calculate the difference in days
      const startDate = new Date(value.start.toString());
      const endDate = new Date(value.end.toString());
      const diffInTime = endDate.getTime() - startDate.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

      // Check if the range exceeds 90 days
      if (diffInDays > 90) {
        setIsRangeInvalid(true);
        // Still allow the selection but mark as invalid
      } else {
        setIsRangeInvalid(false);
        setDateRange(value.start.toString(), value.end.toString());
      }

      // Clear the shortcut selection when manually changing dates
      setSelectedShortcut(new Set());
    } else {
      setIsRangeInvalid(false);
    }
  };

  const handleEnterpriseChange = (keys: Set<string>) => {
    console.log("enterprise keys", keys);
    setEnterpriseIds(Array.from(keys));
  };

  const handleChannelChange = (keys: Set<string>) => {
    console.log("channel keys", keys);
    setChannelNames(Array.from(keys));
  };

  const handleSelectAllToggle = () => {
    // Only unselect all - remove select all functionality
    setEnterpriseIds([]);
  };

  const handleChannelSelectAllToggle = () => {
    // Only unselect all - remove select all functionality
    setChannelNames([]);
  };

  const handleAccountIdsChange = (value: string) => {
    setAccountIdsInput(value);
  };

  const handleAccountIdsBlur = () => {
    // Process the input when user leaves the field
    const accountIds = accountIdsInput
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "" && /^[a-zA-Z0-9_-]+$/.test(id)); // Only allow alphanumeric, underscore, and dash

    setAccountIds(accountIds);
    // Update the input to show cleaned values
    setAccountIdsInput(accountIds.join(", "));
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  const handleClearAllFilters = () => {
    // Reset all filters to defaults
    const shortcuts = getDateShortcuts();
    const defaultRange = shortcuts.past7Days; // Set default to past 7 days

    setDateRange(defaultRange.start, defaultRange.end);
    setEnterpriseIds([]);
    setChannelNames([]);
    setAccountIds([]);
    setSelectedShortcut(new Set(["past7Days"])); // Update shortcut selection
    setAccountIdsInput(""); // Clear the input field
    setIsRangeInvalid(false); // Reset validation state
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
      return date.toISOString().split("T")[0];
    };

    return {
      today: {
        start: formatDate(today),
        end: formatDate(today),
      },
      thisWeek: {
        start: formatDate(startOfWeek),
        end: formatDate(today),
      },
      currentMonth: {
        start: formatDate(startOfMonth),
        end: formatDate(today),
      },
      past7Days: {
        start: formatDate(past7Days),
        end: formatDate(today),
      },
      past15Days: {
        start: formatDate(past15Days),
        end: formatDate(today),
      },
    };
  };

  const handleDateShortcut = (
    shortcut: "today" | "thisWeek" | "currentMonth" | "past7Days" | "past15Days"
  ) => {
    const shortcuts = getDateShortcuts();
    const range = shortcuts[shortcut];
    setDateRange(range.start, range.end);
  };

  const handleQuickDateChange = (keys: any) => {
    const selectedKey = Array.from(keys as Set<string>)[0];
    if (selectedKey && selectedKey !== "custom") {
      handleDateShortcut(
        selectedKey as
          | "today"
          | "thisWeek"
          | "currentMonth"
          | "past7Days"
          | "past15Days"
      );
      // Update the selected shortcut state
      setSelectedShortcut(keys as Set<string>);
    }
  };

  return (
    <div className="dark:border dark:border-gray-700 rounded-xl dark:shadow-lg p-4 sm:p-6">
      {/* Main Layout: Filters Container + Button */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
        {/* Filters Container */}
        <div className="flex-1 min-w-0">
          {/* Top Row Filters */}
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:items-end">
            {/* Date Range Filter */}
            <div
              className={`min-w-0 ${
                enterprises.length > 1 || availableChannels.length > 0
                  ? "flex-1"
                  : "lg:max-w-2xl lg:flex-1"
              }`}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground-600">
                  Date Range
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
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
                        isInvalid={isRangeInvalid}
                        isDisabled={loading}
                        errorMessage={
                          isRangeInvalid
                            ? "Date range cannot exceed 90 days"
                            : undefined
                        }
                        minValue={parseDate("2025-06-15")}
                        maxValue={parseDate(
                          new Date().toISOString().split("T")[0]
                        )}
                      />
                    </I18nProvider>
                  </div>
                  <div className="w-full sm:w-36">
                    <Select
                      placeholder="Quick select"
                      size="sm"
                      variant="bordered"
                      aria-label="Quick date shortcuts"
                      selectedKeys={selectedShortcut}
                      onSelectionChange={handleQuickDateChange}
                      className="w-full"
                      isDisabled={loading}
                    >
                      <SelectItem
                        key="today"
                        startContent={<Clock className="w-3 h-3" />}
                      >
                        Today
                      </SelectItem>
                      <SelectItem
                        key="thisWeek"
                        startContent={<CalendarDays className="w-3 h-3" />}
                      >
                        This Week
                      </SelectItem>
                      <SelectItem
                        key="past7Days"
                        startContent={<CalendarDays className="w-3 h-3" />}
                      >
                        Past 7 Days
                      </SelectItem>
                      <SelectItem
                        key="past15Days"
                        startContent={<CalendarDays className="w-3 h-3" />}
                      >
                        Past 15 Days
                      </SelectItem>
                      <SelectItem
                        key="currentMonth"
                        startContent={<Calendar className="w-3 h-3" />}
                      >
                        This Month
                      </SelectItem>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Filter Group - Only show if more than one enterprise */}
            {enterprises.length > 1 && (
              <div className="flex-1 min-w-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground-600">
                      Enterprises
                    </label>
                    {enterprises.length > 0 &&
                      filters.enterpriseIds.length > 0 && (
                        <Checkbox
                          isSelected={false}
                          onValueChange={handleSelectAllToggle}
                          size="sm"
                          className="text-xs"
                          isDisabled={loading}
                        >
                          Clear All ({filters.enterpriseIds.length})
                        </Checkbox>
                      )}
                  </div>
                  <Select
                    placeholder="Select enterprises"
                    selectionMode="multiple"
                    selectedKeys={new Set(filters.enterpriseIds)}
                    onSelectionChange={(keys) =>
                      handleEnterpriseChange(keys as Set<string>)
                    }
                    variant="bordered"
                    size="sm"
                    className="w-full"
                    aria-label="Select enterprises"
                    isDisabled={loading}
                  >
                    {enterprises.map((enterprise) => (
                      <SelectItem key={enterprise.id}>
                        {enterprise.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            )}

            {/* Channel Filter Group - Only show if there are available channels */}
            {availableChannels.length > 0 && (
              <div className="flex-1 min-w-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground-600">
                      Channels
                    </label>
                    {availableChannels.length > 0 &&
                      filters.channelNames.length > 0 && (
                        <Checkbox
                          isSelected={false}
                          onValueChange={handleChannelSelectAllToggle}
                          size="sm"
                          className="text-xs"
                          isDisabled={loading}
                        >
                          Clear All ({filters.channelNames.length})
                        </Checkbox>
                      )}
                  </div>
                  <Select
                    placeholder="Select channels"
                    selectionMode="multiple"
                    selectedKeys={new Set(filters.channelNames)}
                    onSelectionChange={(keys) =>
                      handleChannelChange(keys as Set<string>)
                    }
                    variant="bordered"
                    size="sm"
                    className="w-full"
                    aria-label="Select channels"
                    startContent={
                      <MessageCircle className="w-3 h-3 text-foreground-400" />
                    }
                    isDisabled={loading}
                  >
                    {availableChannels.map((channel) => (
                      <SelectItem key={channel.id}>{channel.name}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Account IDs Filter - Bottom Row */}
          <div className="mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground-600">
                  Account IDs
                </label>
                {filters.accountIds.length > 0 && (
                  <span className="text-xs text-foreground-500">
                    ({filters.accountIds.length} selected)
                  </span>
                )}
              </div>
              <Input
                placeholder="Enter account IDs (comma separated)"
                value={accountIdsInput}
                onValueChange={handleAccountIdsChange}
                onBlur={handleAccountIdsBlur}
                variant="bordered"
                size="sm"
                className="w-full"
                startContent={<Hash className="w-3 h-3 text-foreground-400" />}
                aria-label="Enter account IDs"
                description="Enter alphanumeric account IDs separated by commas"
                isDisabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Refresh Button - Right side on desktop, bottom on mobile */}
        <div className="flex justify-center lg:justify-end lg:items-end lg:pb-0">
          <div className="flex flex-col gap-2">
            <Button
              color="default"
              onPress={handleClearAllFilters}
              variant="flat"
              size="sm"
              startContent={<Trash2 className="w-4 h-4" />}
              aria-label="Clear all filters"
              className="px-3"
              isDisabled={loading}
            >
              Clear All
            </Button>
            <Button
              color="primary"
              onPress={handleRefresh}
              isLoading={loading}
              isDisabled={loading}
              variant="flat"
              size="sm"
              startContent={
                !loading ? <RefreshCw className="w-4 h-4" /> : undefined
              }
              aria-label="Refresh data"
              className="px-3"
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
