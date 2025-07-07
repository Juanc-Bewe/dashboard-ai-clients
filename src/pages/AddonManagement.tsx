import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Card,
  CardBody,
  Pagination,
  Spinner,
  Tabs,
  Tab,
} from "@heroui/react";
import { Search, RefreshCw, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useAddonManagement } from "../contexts/AddonManagementContext";
import { EmailAnalytics } from "../components/EmailAnalytics";
import type { Account } from "../types/addon-managment";

const statusColorMap = {
  COMPLETED: "success",
  PENDING: "warning",
  FAILED: "danger",
} as const;

type SortDirection = 'asc' | 'desc';
type SortableColumn = 'base' | 'baseUsed';

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
];

export const AddonManagement: React.FC = () => {
  const { state, setCurrentPage, refreshData } = useAddonManagement();
  const [filterValue, setFilterValue] = useState("");
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

  // Filter and sort accounts
  const filteredAccounts = useMemo(() => {
    if (!data?.accounts) return [];

    let filtered = data.accounts.filter(
      (account: Account) =>
        account.accountName.toLowerCase().includes(filterValue.toLowerCase()) ||
        account.accountId.toLowerCase().includes(filterValue.toLowerCase())
    );

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
  }, [data?.accounts, filterValue, sortState]);

  // Pagination
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAccounts = filteredAccounts.slice(startIndex, endIndex);

  const handleRefresh = () => {
    refreshData();
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

    return {
      total,
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
      default:
        return String(account[columnKey as keyof Account] || '');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Error loading data: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Data Management
        </h1>
      </div>

      <Card>
        <CardBody className="p-0">
          <Tabs 
            aria-label="Data Management tabs" 
            className="w-full"
            classNames={{
              base: "w-full",
              tabList: "w-full",
              tabContent: "p-6",
            }}
          >
            <Tab key="account-management" title="Account Management">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Account Management
                  </h2>
                  <Button
                    color="primary"
                    onPress={handleRefresh}
                    isLoading={loading}
                    startContent={!loading ? <RefreshCw className="w-4 h-4" /> : undefined}
                  >
                    Refresh
                  </Button>
                </div>

                {/* Dashboard Overview */}
                {dashboardStats && (
                  <div className="space-y-6">
                    {/* Account Overview */}
                    <Card className="hover:shadow-md transition-shadow">
                      <CardBody className="text-center py-8">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Account Overview
                        </h2>
                        <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {formatNumber(dashboardStats.total)}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Accounts</p>
                      </CardBody>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* AI Clients Status */}
                      <Card className="hover:shadow-md transition-shadow">
                        <CardBody className="p-6">
                          <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            AI Clients Status
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <Card className="hover:shadow-sm transition-shadow">
                              <CardBody className="text-center p-4">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                  {formatNumber(dashboardStats.active)}
                                </div>
                                <p className="text-sm text-green-600 dark:text-green-400">Active</p>
                              </CardBody>
                            </Card>
                            <Card className="hover:shadow-sm transition-shadow">
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
                      <Card className="hover:shadow-md transition-shadow">
                        <CardBody className="p-6">
                          <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            Automode Configuration
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <Card className="hover:shadow-sm transition-shadow">
                              <CardBody className="text-center p-4">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                  {formatNumber(dashboardStats.automodeYes)}
                                </div>
                                <p className="text-sm text-blue-600 dark:text-blue-400">Yes</p>
                              </CardBody>
                            </Card>
                            <Card className="hover:shadow-sm transition-shadow">
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
                    <Card className="hover:shadow-md transition-shadow">
                      <CardBody className="p-6">
                        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-4">
                          Onboarding / Configuration
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="hover:shadow-sm transition-shadow">
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
                          <Card className="hover:shadow-sm transition-shadow">
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
                          <Card className="hover:shadow-sm transition-shadow">
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
                )}

                {/* Search Bar */}
                <Card>
                  <CardBody>
                    <Input
                      isClearable
                      placeholder="Search by account name or ID..."
                      startContent={<Search className="w-4 h-4" />}
                      value={filterValue}
                      onClear={() => setFilterValue("")}
                      onValueChange={setFilterValue}
                      className="max-w-sm"
                    />
                  </CardBody>
                </Card>

                {/* Table */}
                <Card>
                  <CardBody className="p-0">
                    <div className="overflow-x-auto">
                      <Table 
                        aria-label="Accounts table"
                        isCompact
                        removeWrapper
                        classNames={{
                          wrapper: "min-h-[400px]",
                          table: "min-w-[1060px]",
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
                          emptyContent={
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              {filteredAccounts.length === 0 ? "No accounts found" : "No accounts match your search"}
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
                    {totalPages > 1 && (
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
            </Tab>
            
            <Tab key="email-analytics" title="Email Analytics">
              <EmailAnalytics />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};
