import React from "react";
import {
  DateRangePicker,
  Button,
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
  Trash2,
} from "lucide-react";
import type { DateRangeValue } from "../types/dashboard";

interface AddonFiltersProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  accountIds: string[];
  loading: boolean;
  onDateRangeChange: (startDate: string, endDate: string) => void;
  onAccountIdsChange: (accountIds: string[]) => void;
  onRefresh: () => void;
}

export const AddonFilters: React.FC<AddonFiltersProps> = ({
  dateRange,
  accountIds,
  loading,
  onDateRangeChange,
  onAccountIdsChange,
  onRefresh,
}) => {
  // State to track range validation
  const [isRangeInvalid, setIsRangeInvalid] = React.useState(false);
  // State to track account IDs input
  const [accountIdsInput, setAccountIdsInput] = React.useState<string>(() =>
    accountIds.join(", ")
  );
  // State to track selected shortcut
  const [selectedShortcut, setSelectedShortcut] = React.useState<string>("");

  // Sync account IDs input when accountIds prop changes
  React.useEffect(() => {
    setAccountIdsInput(accountIds.join(", "));
  }, [accountIds]);

  // Create date range value from props
  const dateRangeValue = React.useMemo(() => {
    try {
      return {
        start: parseDate(dateRange.startDate),
        end: parseDate(dateRange.endDate),
      };
    } catch {
      return null;
    }
  }, [dateRange.startDate, dateRange.endDate]);

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
        onDateRangeChange(value.start.toString(), value.end.toString());
      }

      // Clear the shortcut selection when manually changing dates
      setSelectedShortcut("");
    } else {
      setIsRangeInvalid(false);
    }
  };

  const handleAccountIdsChange = (value: string) => {
    setAccountIdsInput(value);
  };

  const handleAccountIdsBlur = () => {
    // Process the input when user leaves the field
    const processedAccountIds = accountIdsInput
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "" && /^[a-zA-Z0-9_-]+$/.test(id)); // Only allow alphanumeric, underscore, and dash

    onAccountIdsChange(processedAccountIds);
    // Update the input to show cleaned values
    setAccountIdsInput(processedAccountIds.join(", "));
  };

  const handleClearAllFilters = () => {
    // Reset all filters to defaults - set to past 7 days
    const today = new Date();
    const past7Days = new Date(today);
    past7Days.setDate(today.getDate() - 7);
    
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    onDateRangeChange(formatDate(past7Days), formatDate(today));
    onAccountIdsChange([]);
    setAccountIdsInput(""); // Clear the input field
    setIsRangeInvalid(false); // Reset validation state
    setSelectedShortcut("past7Days"); // Set default shortcut selection
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

    // Calculate past days using setTime for more reliable date arithmetic
    past7Days.setTime(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    past15Days.setTime(today.getTime() - (15 * 24 * 60 * 60 * 1000));

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
    onDateRangeChange(range.start, range.end);
    setSelectedShortcut(shortcut);
  };

  return (
    <div className="dark:border dark:border-gray-700 rounded-xl dark:shadow-lg p-4 sm:p-6">
      {/* Main Layout: Filters Container + Button */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
        {/* Filters Container */}
        <div className="flex-1 min-w-0">
          {/* Filters - Using flex wrap for better responsiveness */}
          <div className="flex flex-wrap gap-4 lg:gap-6">
            {/* Date Range Filter */}
            <div className="w-full min-w-[320px] lg:flex-[2] lg:min-w-[400px]">
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground-600">
                  Date Range
                </label>
                <div className="space-y-3">
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
                      minValue={parseDate("2024-01-01")}
                      maxValue={parseDate(
                        new Date().toISOString().split("T")[0]
                      )}
                    />
                  </I18nProvider>
                  {/* Quick Date Selection Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={selectedShortcut === "today" ? "solid" : "bordered"}
                      color={selectedShortcut === "today" ? "primary" : "default"}
                      onPress={() => handleDateShortcut("today")}
                      startContent={<Clock className="w-3 h-3" />}
                      isDisabled={loading}
                      className="text-xs px-2 h-7"
                    >
                      Today
                    </Button>

                    <Button
                      size="sm"
                      variant={selectedShortcut === "past7Days" ? "solid" : "bordered"}
                      color={selectedShortcut === "past7Days" ? "primary" : "default"}
                      onPress={() => handleDateShortcut("past7Days")}
                      startContent={<CalendarDays className="w-3 h-3" />}
                      isDisabled={loading}
                      className="text-xs px-2 h-7"
                    >
                      Past 7 Days
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedShortcut === "past15Days" ? "solid" : "bordered"}
                      color={selectedShortcut === "past15Days" ? "primary" : "default"}
                      onPress={() => handleDateShortcut("past15Days")}
                      startContent={<CalendarDays className="w-3 h-3" />}
                      isDisabled={loading}
                      className="text-xs px-2 h-7"
                    >
                      Past 15 Days
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedShortcut === "currentMonth" ? "solid" : "bordered"}
                      color={selectedShortcut === "currentMonth" ? "primary" : "default"}
                      onPress={() => handleDateShortcut("currentMonth")}
                      startContent={<Calendar className="w-3 h-3" />}
                      isDisabled={loading}
                      className="text-xs px-2 h-7"
                    >
                      This Month
                    </Button>
                  </div>
                </div>
              </div>
            </div>



            {/* Account IDs Filter */}
            <div className="w-full min-w-[280px] lg:flex-[1] lg:min-w-[320px]">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground-600">
                    Account IDs
                  </label>
                  {accountIds.length > 0 && (
                    <span className="text-xs text-foreground-500">
                      ({accountIds.length} selected)
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
        </div>

        {/* Action Buttons - Right side on desktop, bottom on mobile */}
        <div className="flex justify-start lg:justify-end lg:items-end lg:pb-0">
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
              onPress={onRefresh}
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