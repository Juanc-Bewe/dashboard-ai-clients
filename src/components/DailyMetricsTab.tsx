import React from 'react';
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton } from '@heroui/react';
import { useDashboardStore } from '../contexts/DashboardContext';
import type { DailyMetric } from '../types/dashboard';
import { formatDateForTable } from '../utils/dateHelpers';

const DailyMetricsTabSkeleton: React.FC = () => {
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);
  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'totalConversations', label: 'Conversations' },
    { key: 'conversationsWithIdentification', label: 'With Identification' },
    { key: 'newClients', label: 'New Clients' },
    { key: 'resolutionRate', label: 'Resolution Rate' },
    { key: 'medianConversationDuration', label: 'Median Duration' },
    { key: 'medianUserFeeling', label: 'User Feeling' },
    { key: 'spamCount', label: 'Spam' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-6 w-64 mb-4 rounded-lg" />
        <Card>
          <CardBody>
            <Table aria-label="Daily metrics skeleton table">
              <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
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
    { key: 'date', label: 'Date' },
    { key: 'totalConversations', label: 'Conversations' },
    { key: 'conversationsWithIdentification', label: 'With Identification' },
    { key: 'newClients', label: 'New Clients' },
    { key: 'resolutionRate', label: 'Resolution Rate' },
    { key: 'medianConversationDuration', label: 'Median Duration' },
    { key: 'medianUserFeeling', label: 'User Feeling' },
    { key: 'spamCount', label: 'Spam' }
  ];

  const renderCell = (item: DailyMetric, columnKey: string) => {
    switch (columnKey) {
      case 'date':
        return formatDateForTable(item.date);
      case 'resolutionRate':
        return formatPercentage(item.resolutionRate);
      case 'medianConversationDuration':
        return formatDuration(item.medianConversationDuration);
      case 'medianUserFeeling':
        return item.medianUserFeeling.toFixed(1);
      default:
        const value = item[columnKey as keyof DailyMetric];
        return typeof value === 'object' ? JSON.stringify(value) : value;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Current Period Daily Metrics
        </h3>
        <Card>
          <CardBody>
            <Table aria-label="Daily metrics table">
              <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={data?.currentPeriod?.dailyMetrics?.filter(item => item.totalConversations > 0) || []}>
                {(item) => (
                  <TableRow key={item.date}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>

      {data?.previousPeriod?.dailyMetrics && data.previousPeriod.dailyMetrics.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Previous Period Daily Metrics
          </h3>
          <Card>
            <CardBody>
              <Table aria-label="Previous period daily metrics table">
                <TableHeader columns={columns}>
                  {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={data.previousPeriod.dailyMetrics.filter(item => item.totalConversations > 0)}>
                  {(item) => (
                    <TableRow key={item.date}>
                      {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}; 