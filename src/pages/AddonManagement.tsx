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
} from "@heroui/react";
import { Search, RefreshCw } from "lucide-react";
import { useAddonManagement } from "../contexts/AddonManagementContext";
import type { Account } from "../types/addon-managment";

const statusColorMap = {
  COMPLETED: "success",
  PENDING: "warning",
  FAILED: "danger",
} as const;

const columns = [
  { key: 'accountName', label: 'NAME', width: 200, align: 'start' as const },
  { key: 'accountId', label: 'ID', width: 250, align: 'start' as const },
  { key: 'hasAutomode', label: 'HAS AUTOMODE', width: 140, align: 'center' as const },
  { key: 'onboardingCurrentState', label: 'ONBOARDING STATE', width: 160, align: 'center' as const },
  { key: 'active', label: 'ACTIVE', width: 100, align: 'center' as const },
  { key: 'base', label: 'BASE', width: 100, align: 'center' as const },
  { key: 'baseUsed', label: 'BASE USED', width: 110, align: 'center' as const },
];

export const AddonManagement: React.FC = () => {
  const { state, setCurrentPage, refreshData } = useAddonManagement();
  const [filterValue, setFilterValue] = useState("");

  const { data, loading, error, currentPage, itemsPerPage } = state;

  useEffect(() => {
    if (!data) {
      refreshData();
    }
  }, [data, refreshData]);

  // Filter accounts based on search
  const filteredAccounts = useMemo(() => {
    if (!data?.accounts) return [];

    return data.accounts.filter(
      (account: Account) =>
        account.accountName.toLowerCase().includes(filterValue.toLowerCase()) ||
        account.accountId.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [data?.accounts, filterValue]);

  // Pagination
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAccounts = filteredAccounts.slice(startIndex, endIndex);

  const handleRefresh = () => {
    refreshData();
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

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
          Addon Management
        </h1>
        <Button
          color="primary"
          onPress={handleRefresh}
          isLoading={loading}
          startContent={!loading ? <RefreshCw className="w-4 h-4" /> : undefined}
        >
          Refresh
        </Button>
      </div>

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
                    {column.label}
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

      {/* Summary Stats */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-primary">
                {formatNumber(data.totalAccounts)}
              </div>
              <p className="text-sm text-foreground-600">Total Accounts</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-success">
                {formatNumber(data.totalSessions)}
              </div>
              <p className="text-sm text-foreground-600">Total Sessions</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {formatNumber(data.totalEmails)}
              </div>
              <p className="text-sm text-foreground-600">Total Emails</p>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
