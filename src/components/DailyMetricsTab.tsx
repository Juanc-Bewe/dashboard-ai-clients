import React from 'react';
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton } from '@heroui/react';
import { useDashboardStore } from '../contexts/DashboardContext';
import type { DailyMetric } from '../types/dashboard';
import { formatDateForTable } from '../utils/dateHelpers';

const DailyMetricsTabSkeleton: React.FC = () => {
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);
  const columns = [
    { key: 'date', label: 'Date', width: 120 },
    { key: 'totalConversations', label: 'Conversations', width: 120 },
    { key: 'conversationsWithIdentification', label: 'With ID', width: 100 },
    { key: 'newClients', label: 'New Clients', width: 100 },
    { key: 'resolutionRate', label: 'Resolution', width: 100 },
    { key: 'medianConversationDuration', label: 'Duration', width: 100 },
    { key: 'medianUserFeeling', label: 'Feeling', width: 80 },
    { key: 'spamCount', label: 'Spam', width: 80 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-6 w-64 mb-4 rounded-lg" />
        <Card>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <Table 
                aria-label="Daily metrics skeleton table"
                isCompact
                removeWrapper
                classNames={{
                  wrapper: "min-h-[200px]",
                  table: "min-w-[800px]",
                  th: "bg-gray-50 dark:bg-gray-800/50 text-tiny font-semibold",
                  td: "text-small whitespace-nowrap",
                }}
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn 
                      key={column.key}
                      width={column.width}
                      minWidth={column.width}
                      align="center"
                    >
                      {column.label}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody>
                  {skeletonRows.map((index) => (
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          <Skeleton className="h-4 w-full rounded-md" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export const DailyMetricsTab: React.FC = () => {
  const data = useDashboardStore(state => state.data);
  const loading = useDashboardStore(state => state.loading);

  // Show skeleton while loading
  if (loading) {
    return <DailyMetricsTabSkeleton />;
  }

  const formatDuration = (seconds: number) => {
    return `${Math.round(seconds)}s`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const columns = [
    { key: 'date', label: 'Date', width: 120, align: 'start' as const },
    { key: 'totalConversations', label: 'Conversations', width: 120, align: 'center' as const },
    { key: 'conversationsWithIdentification', label: 'With ID', width: 100, align: 'center' as const },
    { key: 'newClients', label: 'New Clients', width: 100, align: 'center' as const },
    { key: 'resolutionRate', label: 'Resolution', width: 100, align: 'center' as const },
    { key: 'medianConversationDuration', label: 'Duration', width: 100, align: 'center' as const },
    { key: 'medianUserFeeling', label: 'Feeling', width: 80, align: 'center' as const },
    { key: 'spamCount', label: 'Spam', width: 80, align: 'center' as const }
  ];

  const renderCell = (item: DailyMetric, columnKey: string) => {
    switch (columnKey) {
      case 'date':
        return (
          <div className="font-medium text-left">
            {formatDateForTable(item.date)}
          </div>
        );
      case 'resolutionRate':
        return (
          <div className="text-center font-mono">
            {formatPercentage(item.resolutionRate)}
          </div>
        );
      case 'medianConversationDuration':
        return (
          <div className="text-center font-mono">
            {formatDuration(item.medianConversationDuration)}
          </div>
        );
      case 'medianUserFeeling':
        return (
          <div className="text-center font-mono">
            {item.medianUserFeeling.toFixed(1)}
          </div>
        );
      case 'totalConversations':
      case 'conversationsWithIdentification':
      case 'newClients':
      case 'spamCount':
        const value = item[columnKey as keyof DailyMetric];
        return (
          <div className="text-center font-mono">
            {typeof value === 'number' ? value.toLocaleString() : String(value)}
          </div>
        );
      default:
        const defaultValue = item[columnKey as keyof DailyMetric];
        return (
          <div className="text-center">
            {typeof defaultValue === 'object' ? JSON.stringify(defaultValue) : String(defaultValue)}
          </div>
        );
    }
  };

  const renderTable = (items: DailyMetric[], title: string, ariaLabel: string) => (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h3>
      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <Table 
              aria-label={ariaLabel}
              isCompact
              removeWrapper
              classNames={{
                wrapper: "min-h-[200px]",
                table: "min-w-[800px]",
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
                items={items}
                emptyContent={
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No daily metrics data available
                  </div>
                }
              >
                {(item) => (
                  <TableRow key={item.date}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCell(item, columnKey as string)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderTable(
        data?.currentPeriod?.dailyMetrics?.filter(item => item.totalConversations > 0) || [],
        "Current Period Daily Metrics",
        "Current period daily metrics table"
      )}

      {data?.previousPeriod?.dailyMetrics && data.previousPeriod.dailyMetrics.length > 0 && (
        renderTable(
          data.previousPeriod.dailyMetrics.filter(item => item.totalConversations > 0),
          "Previous Period Daily Metrics",
          "Previous period daily metrics table"
        )
      )}
    </div>
  );
}; 