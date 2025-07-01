import React from 'react';
import { Card, CardBody, Skeleton } from '@heroui/react';
import { useDashboardStore } from '../contexts/DashboardContext';

interface MetricCardProps {
  title: string;
  value: number | string;
  previousValue?: number | string;
  format?: 'number' | 'percentage' | 'duration' | 'decimal';
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  previousValue, 
  format = 'number',
  loading = false 
}) => {
  const formatValue = (val: number | string, type: string) => {
    if (typeof val === 'string') return val;

    switch (type) {
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'duration':
        return `${Math.round(val)}s`;
      case 'decimal':
        return val.toFixed(1);
      default:
        return val.toLocaleString();
    }
  };

  const calculateChange = () => {
    if (previousValue === undefined || typeof value !== 'number' || typeof previousValue !== 'number') {
      return null;
    }

    if (previousValue === 0) return value > 0 ? '+100%' : '0%';

    const change = ((value - previousValue) / previousValue) * 100;
    return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  };

  const change = calculateChange();
  const isPositive = change && change.startsWith('+');
  const isNegative = change && !change.startsWith('+') && change !== '0%';

  if (loading) {
    return (
      <Card className="">
        <CardBody className="p-6">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-3 w-1/3" />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className=" hover:shadow-md transition-shadow">
      <CardBody className="p-6">
        <div className="flex flex-col">
          <p className="text-sm font-mediu mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold mb-2">
            {formatValue(value, format)}
          </p>
          {change && (
            <div className="flex items-center text-sm">
              <span className={`font-medium ${
                isPositive ? 'text-green-600 dark:text-green-400' :
                isNegative ? 'text-red-600 dark:text-red-400' :
                'text-gray-600 dark:text-gray-400'
              }`}>
                {change}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                vs previous period
              </span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export const DashboardCards: React.FC = () => {
  const data = useDashboardStore(state => state.data);
  const loading = useDashboardStore(state => state.loading);

  const metrics = data?.metrics;
  const previousMetrics = data?.previousPeriod?.metrics;

  const mainMetrics = [
    {
      title: 'Total Conversations',
      value: metrics?.totalConversations ?? 0,
      previousValue: previousMetrics?.totalConversations,
    },
    {
      title: "Total Accounts with Conversations",
      value: data?.metrics?.totalAccountsWithConversations ?? 0,
      previousValue: previousMetrics?.totalAccountsWithConversations,
    },
    {
      title: 'Resolution Rate',
      value: metrics?.adjustedResolutionRate ?? 0,
      previousValue: previousMetrics?.adjustedResolutionRate,
      format: 'percentage' as const,
    },
    {
      title: "Avg. cost per conversation",
      value: 0.5, // TODO: Implement average cost per conversation calculation
      previousValue: 0.47, // TODO: Implement previous period average cost per conversation
      format: 'decimal' as const,
    },
    {
      title: 'Customer Retention',
      value: metrics?.customerRetentionPercentage ?? 0,
      previousValue: previousMetrics?.customerRetentionPercentage,
      format: 'percentage' as const,
    },
    {
      title: 'Error Rate',
      value: metrics?.errorRate ?? 0,
      previousValue: previousMetrics?.errorRate,
      format: 'percentage' as const,
    },
    {
      title: 'Avg. User Feeling',
      value: metrics?.averageUserFeeling ?? 0,
      previousValue: previousMetrics?.averageUserFeeling,
      format: 'decimal' as const,
    },
    {
      title: 'Identification Rate',
      value: metrics?.identificationPercentage ?? 0,
      previousValue: previousMetrics?.identificationPercentage,
      format: 'percentage' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mainMetrics.map((metric, index) => (
        <MetricCard
          key={`${metric.title}-${index}`}
          title={metric.title}
          value={metric.value}
          previousValue={metric.previousValue}
          format={metric.format}
          loading={loading}
        />
      ))}
    </div>
  );
}; 