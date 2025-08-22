import React from "react";
import {
  DateRangePicker,
  Select,
  SelectItem,
  Button,
  Input,
  Tooltip,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import {
  RefreshCw,
  Hash,
  Trash2,
  Clock,
  Calendar,
  CalendarDays,
} from "lucide-react";
import { useFiltersStore } from "../contexts/FiltersContext";
import { useTabRefresh } from "../contexts/TabManagementContext";
import { useAuth } from "../contexts/AuthContext";
import { hasPermission } from "../utils/permissionHelpers";
import type { DateRangeValue } from "../types/dashboard";

export const ConversationAnalyticsFilters: React.FC = () => {
  const filters = useFiltersStore((state) => state.filters);
  const updateFilters = useFiltersStore((state) => state.updateFilters);
  const setChannelNames = useFiltersStore((state) => state.setChannelNames);
  const resetFilters = useFiltersStore((state) => state.resetFilters);

  const { refreshActiveTab, isRefreshing } = useTabRefresh();

  // Get auth data
  const { availableEnterprises, permissions } = useAuth();

  // Static channel options
  const availableChannels = [
    { id: "web", name: "Web" },
    { id: "twilio-whatsapp", name: "WhatsApp" },
  ];

  // State to track range validation
  const [isRangeInvalid, setIsRangeInvalid] = React.useState(false);
  // State to track account IDs input
  const [accountIdsInput, setAccountIdsInput] = React.useState<string>(() =>
    filters.accountIds.join(", ")
  );
  // State to track selected shortcut
  const [selectedShortcut, setSelectedShortcut] = React.useState<string>("");

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
      const startDate = value.start.toString();
      const endDate = value.end.toString();

      // Validate date range (max 31 days)
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 31) {
        setIsRangeInvalid(true);
        return;
      }

      setIsRangeInvalid(false);
      updateFilters({ startDate, endDate });

      // Clear the shortcut selection when manually changing dates
      setSelectedShortcut("");
    } else {
      setIsRangeInvalid(false);
    }
  };

  const handleEnterpriseChange = (keys: Set<string>) => {
    updateFilters({ enterpriseIds: Array.from(keys) });
  };

  const handleChannelChange = (keys: Set<string>) => {
    setChannelNames(Array.from(keys));
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

    updateFilters({ accountIds });
    // Update the input to show cleaned values
    setAccountIdsInput(accountIds.join(", "));
  };

  const handleRefresh = async () => {
    await refreshActiveTab();
  };

  // Date shortcut functions
  const getDateShortcuts = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const past7Days = new Date(today);
    const past15Days = new Date(today);
    const past30Days = new Date(today);

    // Get Monday as start of week
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(today.getDate() - daysToMonday);

    // Calculate past days using setTime for more reliable date arithmetic
    past7Days.setTime(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    past15Days.setTime(today.getTime() - 15 * 24 * 60 * 60 * 1000);
    past30Days.setTime(today.getTime() - 30 * 24 * 60 * 60 * 1000);

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
      past30Days: {
        start: formatDate(past30Days),
        end: formatDate(today),
      },
    };
  };

  const handleDateShortcut = (
    shortcut:
      | "today"
      | "thisWeek"
      | "currentMonth"
      | "past7Days"
      | "past15Days"
      | "past30Days"
  ) => {
    const shortcuts = getDateShortcuts();
    const range = shortcuts[shortcut];
    updateFilters({ startDate: range.start, endDate: range.end });
    setSelectedShortcut(shortcut);
  };

  const handleClearAllFilters = () => {
    resetFilters();
    setAccountIdsInput(""); // Clear the input field
    setIsRangeInvalid(false); // Reset validation state
    setSelectedShortcut("past7Days"); // Set default shortcut selection
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl dark:shadow-lg p-4 sm:p-6">
      {/* Main Layout: Filters Container + Button */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
        {/* Filters Container */}
        <div className="flex-1 min-w-0">
          <div className="space-y-4">
            {/* First Row: Date Range and Enterprise Filters */}
            <div className="flex flex-wrap gap-4 lg:gap-6">
              {/* Date Range Filter */}
              <div className="w-full min-w-[320px] lg:flex-[2] lg:min-w-[400px]">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground-600">
                    Rango de Fechas
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
                        aria-label="Seleccionar rango de fechas"
                        isInvalid={isRangeInvalid}
                        isDisabled={isRefreshing}
                        errorMessage={
                          isRangeInvalid
                            ? "El rango de fechas no puede exceder 31 días"
                            : undefined
                        }
                        minValue={parseDate("2025-06-15")}
                        maxValue={parseDate(
                          new Date().toISOString().split("T")[0]
                        )}
                      />
                    </I18nProvider>
                    {/* Quick Date Selection Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={
                          selectedShortcut === "today" ? "solid" : "bordered"
                        }
                        color={
                          selectedShortcut === "today" ? "primary" : "default"
                        }
                        onPress={() => handleDateShortcut("today")}
                        startContent={<Clock className="w-3 h-3" />}
                        isDisabled={isRefreshing}
                        className="text-xs px-2 h-7"
                      >
                        Hoy
                      </Button>

                      <Button
                        size="sm"
                        variant={
                          selectedShortcut === "past7Days"
                            ? "solid"
                            : "bordered"
                        }
                        color={
                          selectedShortcut === "past7Days"
                            ? "primary"
                            : "default"
                        }
                        onPress={() => handleDateShortcut("past7Days")}
                        startContent={<CalendarDays className="w-3 h-3" />}
                        isDisabled={isRefreshing}
                        className="text-xs px-2 h-7"
                      >
                        Últimos 7 Días
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          selectedShortcut === "past15Days"
                            ? "solid"
                            : "bordered"
                        }
                        color={
                          selectedShortcut === "past15Days"
                            ? "primary"
                            : "default"
                        }
                        onPress={() => handleDateShortcut("past15Days")}
                        startContent={<CalendarDays className="w-3 h-3" />}
                        isDisabled={isRefreshing}
                        className="text-xs px-2 h-7"
                      >
                        Últimos 15 Días
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          selectedShortcut === "past30Days"
                            ? "solid"
                            : "bordered"
                        }
                        color={
                          selectedShortcut === "past30Days"
                            ? "primary"
                            : "default"
                        }
                        onPress={() => handleDateShortcut("past30Days")}
                        startContent={<CalendarDays className="w-3 h-3" />}
                        isDisabled={isRefreshing}
                        className="text-xs px-2 h-7"
                      >
                        Últimos 30 Días
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          selectedShortcut === "currentMonth"
                            ? "solid"
                            : "bordered"
                        }
                        color={
                          selectedShortcut === "currentMonth"
                            ? "primary"
                            : "default"
                        }
                        onPress={() => handleDateShortcut("currentMonth")}
                        startContent={<Calendar className="w-3 h-3" />}
                        isDisabled={isRefreshing}
                        className="text-xs px-2 h-7"
                      >
                        Este Mes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Filter Group - Only show if more than one enterprise */}
              {availableEnterprises.length > 1 &&
                hasPermission("canFilterByEnterprise", permissions) && (
                  <div className="w-full min-w-[240px] lg:flex-[1] lg:min-w-[280px]">
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground-600">
                          Enterprises
                        </label>
                        {filters.enterpriseIds.length > 0 && (
                          <span className="text-xs text-foreground-500">
                            ({filters.enterpriseIds.length} seleccionados)
                          </span>
                        )}
                      </div>
                      <Select
                        placeholder="Seleccionar enterprises"
                        selectionMode="multiple"
                        selectedKeys={new Set(filters.enterpriseIds)}
                        onSelectionChange={(keys) =>
                          handleEnterpriseChange(keys as Set<string>)
                        }
                        variant="bordered"
                        size="sm"
                        className="w-full mt-4"
                        aria-label="Seleccionar enterprises"
                        isDisabled={isRefreshing}
                      >
                        {availableEnterprises.map((enterprise) => (
                          <SelectItem key={enterprise.id}>
                            {enterprise.name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}

              {/* Channel Filter Group */}
              {hasPermission("canFilterByChannel", permissions) && (
                <div className="w-full min-w-[240px] lg:flex-[1] lg:min-w-[280px]">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground-600">
                        Canales
                      </label>
                      {filters.channelNames &&
                        filters.channelNames.length > 0 && (
                          <span className="text-xs text-foreground-500">
                            ({filters.channelNames.length} seleccionados)
                          </span>
                        )}
                    </div>
                    <Select
                      placeholder="Seleccionar canales"
                      selectionMode="multiple"
                      selectedKeys={new Set(filters.channelNames || [])}
                      onSelectionChange={(keys) =>
                        handleChannelChange(keys as Set<string>)
                      }
                      variant="bordered"
                      size="sm"
                      className="w-full mt-4"
                      aria-label="Seleccionar canales"
                      isDisabled={isRefreshing}
                    >
                      {availableChannels.map((channel) => (
                        <SelectItem key={channel.id}>{channel.name}</SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              )}
            </div>

            {/* Second Row: Account IDs Filter (Full Width) */}
            {hasPermission("canFilterByAccount", permissions) && (
              <div className="w-full">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground-600">
                      IDs de Cuenta
                    </label>
                    {filters.accountIds.length > 0 && (
                      <span className="text-xs text-foreground-500">
                        ({filters.accountIds.length} seleccionados)
                      </span>
                    )}
                  </div>
                  <Input
                    placeholder="Ingrese IDs de cuenta (separados por comas)"
                    value={accountIdsInput}
                    onValueChange={handleAccountIdsChange}
                    onBlur={handleAccountIdsBlur}
                    variant="bordered"
                    size="sm"
                    className="w-full"
                    startContent={
                      <Hash className="w-3 h-3 text-foreground-400" />
                    }
                    aria-label="Ingresar IDs de cuenta"
                    description="Ingrese IDs de cuenta alfanuméricos separados por comas"
                    isDisabled={isRefreshing}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Refresh Button - Right side on desktop, bottom on mobile */}
        <div className="flex justify-start lg:justify-end lg:items-end lg:pb-0">
          <div className="flex flex-col gap-2">
            <Button
              color="default"
              onPress={handleClearAllFilters}
              variant="flat"
              size="sm"
              startContent={<Trash2 className="w-4 h-4" />}
              aria-label="Limpiar todos los filtros"
              className="px-3"
              isDisabled={isRefreshing}
            >
              Limpiar Todo
            </Button>
            <Tooltip
              content="Actualizar datos de análisis de conversaciones"
              placement="top"
              delay={500}
            >
              <Button
                color="primary"
                onPress={handleRefresh}
                isLoading={isRefreshing}
                isDisabled={isRefreshing}
                variant="flat"
                size="sm"
                startContent={
                  !isRefreshing ? <RefreshCw className="w-4 h-4" /> : undefined
                }
                aria-label="Actualizar datos"
                className="px-3"
              >
                {isRefreshing ? "Actualizando..." : "Actualizar"}
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
