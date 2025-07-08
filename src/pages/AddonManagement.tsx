import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Card,
  CardBody,
  Pagination,
  Spinner,
  Tabs,
  Tab,
  Skeleton,
  Tooltip,
} from "@heroui/react";
import { ArrowUpDown, ArrowUp, ArrowDown, Info } from "lucide-react";
import { useAddonManagement } from "../contexts/AddonManagementContext";
import { EmailAnalytics } from "../components/EmailAnalytics";
import { AddonFilters } from "../components/AddonFilters";
import type { Account } from "../types/addon-managment";

const statusColorMap = {
  COMPLETED: "success",
  PENDING: "warning",
  FAILED: "danger",
} as const;

type SortDirection = 'asc' | 'desc';
type SortableColumn = 'base' | 'baseUsed' | 'sessionCount';

interface Column {
  key: string;
  label: string;
  width: number;
  align: 'start' | 'center' | 'end';
  sortable?: boolean;
}

const columns: Column[] = [
  { key: 'accountName', label: 'NAME', width: 200, align: 'start' },
  { key: 'accountId', label: 'ID', width: 250, align: 'start' },
  { key: 'hasAutomode', label: 'HAS AUTOMODE', width: 140, align: 'center' },
  { key: 'onboardingCurrentState', label: 'ONBOARDING STATE', width: 160, align: 'center' },
  { key: 'active', label: 'ACTIVE', width: 100, align: 'center' },
  { key: 'base', label: 'BASE', width: 100, align: 'center', sortable: true },
  { key: 'baseUsed', label: 'BASE USED', width: 110, align: 'center', sortable: true },
  { key: 'sessionCount', label: 'SESSIONS', width: 110, align: 'center', sortable: true },
];

// Skeleton components
const OverviewCardSkeleton = () => (
  <Card>
    <CardBody className="text-center py-8">
      <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
      <Skeleton className="h-10 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-4 w-1/3 mx-auto" />
    </CardBody>
  </Card>
);

const StatsCardSkeleton = () => (
  <Card className="hover:shadow-md transition-shadow">
    <CardBody className="p-6">
      <Skeleton className="h-5 w-3/4 mb-4" />
      <div className="grid grid-cols-2 gap-4">
        <Card className="hover:shadow-sm transition-shadow">
          <CardBody className="text-center p-4">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </CardBody>
        </Card>
        <Card className="hover:shadow-sm transition-shadow">
          <CardBody className="text-center p-4">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </CardBody>
        </Card>
      </div>
    </CardBody>
  </Card>
);

const OnboardingCardSkeleton = () => (
  <Card className="hover:shadow-md transition-shadow">
    <CardBody className="p-6">
      <Skeleton className="h-5 w-3/4 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="hover:shadow-sm transition-shadow">
            <CardBody className="text-center p-4">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-1/2 mx-auto mb-1" />
              <Skeleton className="h-3 w-1/3 mx-auto" />
            </CardBody>
          </Card>
        ))}
      </div>
    </CardBody>
  </Card>
);



export const AddonManagement: React.FC = () => {
  const { state, setCurrentPage, setFilters, refreshData } = useAddonManagement();
  const [selectedTab, setSelectedTab] = useState("account-management");
  
  const [sortState, setSortState] = useState<{
    column: SortableColumn | null;
    direction: SortDirection;
  }>({ column: null, direction: 'asc' });

  const { data, loading, error, currentPage, itemsPerPage } = state;

  useEffect(() => {
    if (!data) {
      refreshData();
    }
  }, [data, refreshData]);

  // Filter and sort accounts based on selected tab
  const filteredAccounts = useMemo(() => {
    if (!data?.accounts) return [];

    let filtered = data.accounts.filter((account: Account) => {
      // Account IDs filter
      const matchesAccountIds = state.filters.accountIds.length === 0 || 
        state.filters.accountIds.includes(account.accountId);
      
      // Note: Date range filtering would need to be implemented based on available date fields in the Account type
      // For now, we'll assume all accounts match the date range
      const matchesDateRange = true; // This would need to be implemented based on your data structure
      
      return matchesAccountIds && matchesDateRange;
    });

    // Apply tab-specific filtering
    if (selectedTab === "account-management") {
      // Show all accounts for account management
      // Additional filtering can be added here if needed
    } else if (selectedTab === "email-analytics") {
      // Filter for email analytics related accounts
      // This could filter by specific criteria related to email analytics
      // For now, we'll show all accounts but this can be customized
    }

    // Apply sorting if a sort column is selected
    if (sortState.column) {
      filtered = filtered.sort((a, b) => {
        const aValue = a[sortState.column!];
        const bValue = b[sortState.column!];
        
        if (sortState.direction === 'asc') {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    }

    return filtered;
  }, [data?.accounts, state.filters.accountIds, selectedTab, sortState]);

  // Pagination
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAccounts = filteredAccounts.slice(startIndex, endIndex);

  const handleRefresh = () => {
    refreshData();
  };

  const handleDateRangeChange = async (startDate: string, endDate: string) => {
    await setFilters({ 
      startDate, 
      endDate, 
      timezoneOffset: -(new Date().getTimezoneOffset() / 60) // Include timezone offset
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleAccountIdsChange = async (accountIds: string[]) => {
    await setFilters({ accountIds });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleEnterpriseIdsChange = async (enterpriseIds: string[]) => {
    await setFilters({ enterpriseIds });
    setCurrentPage(1); // Reset to first page when filter changes
  };



  const handleSort = (column: SortableColumn) => {
    // Reset to first page when sorting changes
    setCurrentPage(1);
    
    setSortState(prevState => {
      if (prevState.column === column) {
        // Same column - cycle through directions
        if (prevState.direction === 'asc') {
          return { column, direction: 'desc' };
        } else {
          // Clear sorting (return to original order)
          return { column: null, direction: 'asc' };
        }
      } else {
        // Different column - set new column with ascending direction
        return { column, direction: 'asc' };
      }
    });
  };

  const getSortIcon = (column: string) => {
    if (sortState.column !== column) {
      return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-400" />;
    }
    return sortState.direction === 'asc'
      ? <ArrowUp className="w-3 h-3 ml-1 text-primary" />
      : <ArrowDown className="w-3 h-3 ml-1 text-primary" />;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
  };

  // Calculate dashboard stats
  const dashboardStats = useMemo(() => {
    if (!data?.accounts) return null;

    const accounts = data.accounts;
    const total = accounts.length;

    // AI Clients Status
    const activeCount = accounts.filter(acc => acc.active).length;
    const inactiveCount = total - activeCount;

    // Automode Configuration
    const automodeYes = accounts.filter(acc => acc.hasAutomode).length;
    const automodeNo = total - automodeYes;

    // Onboarding Status
    const completedCount = accounts.filter(acc => acc.onboardingCurrentState === 'COMPLETED').length;
    const pendingCount = accounts.filter(acc => acc.onboardingCurrentState === 'PENDING').length;
    const failedCount = accounts.filter(acc => acc.onboardingCurrentState === 'FAILED').length;

    // Sessions calculation
    const totalSessions = accounts.reduce((sum, acc) => sum + acc.sessionCount, 0);

    return {
      total,
      totalSessions,
      active: activeCount,
      inactive: inactiveCount,
      automodeYes,
      automodeNo,
      completed: completedCount,
      pending: pendingCount,
      failed: failedCount,
      completedPercentage: calculatePercentage(completedCount, total),
      pendingPercentage: calculatePercentage(pendingCount, total),
      failedPercentage: calculatePercentage(failedCount, total),
    };
  }, [data?.accounts]);

  const renderCell = (account: Account, columnKey: string) => {
    switch (columnKey) {
      case 'accountName':
        return (
          <div className="font-medium text-left">
            {account.accountName}
          </div>
        );
      case 'accountId':
        return (
          <div className="text-sm text-foreground-600 font-mono">
            {account.accountId}
          </div>
        );
      case 'hasAutomode':
        return (
          <div className="flex justify-center">
            <Chip
              color={account.hasAutomode ? "success" : "default"}
              size="sm"
              variant="flat"
            >
              {account.hasAutomode ? "Yes" : "No"}
            </Chip>
          </div>
        );
      case 'onboardingCurrentState':
        return (
          <div className="flex justify-center">
            <Chip
              className="capitalize"
              color={statusColorMap[account.onboardingCurrentState as keyof typeof statusColorMap] || "default"}
              size="sm"
              variant="flat"
            >
              {account.onboardingCurrentState}
            </Chip>
          </div>
        );
      case 'active':
        return (
          <div className="flex justify-center">
            <Chip
              color={account.active ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {account.active ? "Active" : "Inactive"}
            </Chip>
          </div>
        );
      case 'base':
        return (
          <div className="text-center font-mono">
            {formatNumber(account.base)}
          </div>
        );
      case 'baseUsed':
        return (
          <div className="text-center font-mono">
            {formatNumber(account.baseUsed)}
          </div>
        );
      case 'sessionCount':
        return (
          <div className="text-center font-mono">
            {formatNumber(account.sessionCount)}
          </div>
        );
      default:
        return String(account[columnKey as keyof Account] || '');
    }
  };

  const handleTabChange = (key: React.Key) => {
    setSelectedTab(key as string);
    // Reset to first page when changing tabs
    setCurrentPage(1);
  };



  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Error loading data: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-foreground">Data Management</h1>
        <p className="mt-2 text-foreground-600">Monitor accounts, email analytics, and system performance</p>
      </div>

      {/* Filters Section */}
      <section className="relative">
        <AddonFilters
          dateRange={{ startDate: state.filters.startDate, endDate: state.filters.endDate }}
          accountIds={state.filters.accountIds}
          enterpriseIds={state.filters.enterpriseIds}
          loading={loading}
          onDateRangeChange={handleDateRangeChange}
          onAccountIdsChange={handleAccountIdsChange}
          onEnterpriseIdsChange={handleEnterpriseIdsChange}
          onRefresh={handleRefresh}
        />
      </section>

      {/* Tabs Navigation */}
      <section>
        <Card>
          <CardBody className="p-0">
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={handleTabChange}
              aria-label="Data Management tabs" 
              className="w-full"
              classNames={{
                base: "w-full",
                tabList: "w-full",
                panel: "p-0",
              }}
            >
              <Tab key="account-management" title="Account Management" />
              <Tab key="email-analytics" title="Email Analytics" />
            </Tabs>
          </CardBody>
        </Card>
      </section>

      {/* Main Content */}
      <section className="space-y-6">
        {/* Dashboard Overview - Show only for account management */}
        {selectedTab === "account-management" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              <h2 className="text-xl font-semibold text-foreground">Account Overview</h2>
            </div>
            
            {loading ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <OverviewCardSkeleton />
                  <OverviewCardSkeleton />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <StatsCardSkeleton />
                  <StatsCardSkeleton />
                </div>
                <OnboardingCardSkeleton />
              </div>
            ) : dashboardStats ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Account Overview */}
                  <Card>
                    <CardBody className="text-center py-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <h3 className="text-md font-semibold">
                          Total Accounts
                        </h3>
                        <Tooltip content="This metric is not affected by date range filters - it shows all accounts regardless of time period">
                          <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                        </Tooltip>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {formatNumber(dashboardStats.total)}
                      </div>
                    </CardBody>
                  </Card>

                  {/* Sessions Overview */}
                  <Card>
                    <CardBody className="text-center py-6">
                      <h3 className="text-md font-semibold mb-2">
                        Total Sessions
                      </h3>
                      <div className="text-3xl font-bold mb-1">
                        {formatNumber(dashboardStats.totalSessions)}
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* AI Clients Status */}
                  <Card>
                    <CardBody className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-md font-semibold">
                          AI Clients Status
                        </h3>
                        <Tooltip content="This metric is not affected by date range filters - it shows the current status of all accounts">
                          <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                        </Tooltip>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardBody className="text-center p-4">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {formatNumber(dashboardStats.active)}
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">Active</p>
                          </CardBody>
                        </Card>
                        <Card>
                          <CardBody className="text-center p-4">
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                              {formatNumber(dashboardStats.inactive)}
                            </div>
                            <p className="text-sm text-red-600 dark:text-red-400">Inactive</p>
                          </CardBody>
                        </Card>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Automode Configuration */}
                  <Card>
                    <CardBody className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-md font-semibold">
                          Automode Configuration
                        </h3>
                        <Tooltip content="This metric is not affected by date range filters - it shows the current configuration of all accounts">
                          <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                        </Tooltip>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardBody className="text-center p-4">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {formatNumber(dashboardStats.automodeYes)}
                            </div>
                            <p className="text-sm text-blue-600 dark:text-blue-400">Yes</p>
                          </CardBody>
                        </Card>
                        <Card>
                          <CardBody className="text-center p-4">
                            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                              {formatNumber(dashboardStats.automodeNo)}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">No</p>
                          </CardBody>
                        </Card>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                {/* Onboarding/Configuration */}
                <Card>
                  <CardBody className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-md font-semibold">
                        Onboarding / Configuration
                      </h3>
                      <Tooltip content="This metric is not affected by date range filters - it shows the current onboarding status of all accounts">
                        <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                      </Tooltip>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardBody className="text-center p-4">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {formatNumber(dashboardStats.completed)}
                          </div>
                          <p className="text-sm text-green-600 dark:text-green-400">Completed</p>
                          <p className="text-xs text-green-500 dark:text-green-400 mt-1">
                            {dashboardStats.completedPercentage}%
                          </p>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody className="text-center p-4">
                          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {formatNumber(dashboardStats.pending)}
                          </div>
                          <p className="text-sm text-orange-600 dark:text-orange-400">Pending</p>
                          <p className="text-xs text-orange-500 dark:text-orange-400 mt-1">
                            {dashboardStats.pendingPercentage}%
                          </p>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody className="text-center p-4">
                          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {formatNumber(dashboardStats.failed)}
                          </div>
                          <p className="text-sm text-red-600 dark:text-red-400">Failed</p>
                          <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                            {dashboardStats.failedPercentage}%
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ) : null}
          </div>
        )}

        {/* Email Analytics Dashboard - Show only for email analytics */}
        {selectedTab === "email-analytics" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
              <h2 className="text-xl font-semibold text-foreground">Email Analytics</h2>
            </div>
            <EmailAnalytics />
          </div>
        )}

        {/* Account Data Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-foreground">Account Data</h2>
            <Tooltip content="Sessions column is filtered by the selected date range - sessions are counted only within the specified time period">
              <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
            </Tooltip>
          </div>
          
          <Card>
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <Table 
                  aria-label="Data table"
                  isCompact
                  removeWrapper
                  classNames={{
                    wrapper: "min-h-[400px]",
                    table: "min-w-[1170px]",
                    th: "bg-gray-50 dark:bg-gray-800/50 text-tiny font-semibold border-b border-gray-200 dark:border-gray-700",
                    td: "text-small whitespace-nowrap border-b border-gray-100 dark:border-gray-800",
                    tr: "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                  }}
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn 
                        key={column.key}
                        width={column.width}
                        minWidth={column.width}
                        align={column.align}
                      >
                        {column.sortable ? (
                          <button
                            className="flex items-center justify-center w-full hover:text-primary transition-colors cursor-pointer"
                            onClick={() => handleSort(column.key as SortableColumn)}
                          >
                            {column.label}
                            {getSortIcon(column.key)}
                          </button>
                        ) : (
                          column.label
                        )}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody 
                    items={paginatedAccounts}
                    isLoading={loading}
                    loadingContent={<Spinner label="Loading..." />}
                    emptyContent={
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        {filteredAccounts.length === 0 ? "No data found" : "No data matches your search"}
                      </div>
                    }
                  >
                    {(account) => (
                      <TableRow key={account.accountId}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCell(account, columnKey as string)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="flex justify-center p-4 border-t border-gray-200 dark:border-gray-700">
                  <Pagination
                    showControls
                    color="primary"
                    page={currentPage}
                    total={totalPages}
                    onChange={setCurrentPage}
                  />
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
};
