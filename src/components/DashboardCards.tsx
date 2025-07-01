import React from 'react';
import { Card, CardBody, Skeleton, Tooltip } from '@heroui/react';
import { Info, TrendingUp, TrendingDown } from 'lucide-react';
import { useDashboardStore } from '../contexts/DashboardContext';

interface MetricCardProps {
  title: string;
  tooltip: string;
  value: number | string;
  previousValue?: number | string;
  format?: 'number' | 'percentage' | 'duration' | 'decimal';
  loading?: boolean;
  invertColors?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  tooltip,
  value, 
  previousValue, 
  format = 'number',
  loading = false,
  invertColors = false
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

  const getChangeColor = () => {
    if (!change || change === '0%') return 'text-gray-600 dark:text-gray-400';

    if (invertColors) {
      return isPositive 
        ? 'text-red-600 dark:text-red-400'
        : 'text-green-600 dark:text-green-400';
    } else {
      return isPositive
        ? 'text-green-600 dark:text-green-400'
        : 'text-red-600 dark:text-red-400';
    }
  };

  const getTrendIcon = () => {
    if (!change || change === '0%') return null;

    const iconClass = "h-4 w-4";
    const colorClass = getChangeColor();

    return isPositive
      ? <TrendingUp className={`${iconClass} ${colorClass}`} />
      : <TrendingDown className={`${iconClass} ${colorClass}`} />;
  };

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
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-1">
              <p className="text-sm font-mediu">
                {title}
              </p>
              <Tooltip content={tooltip} placement="top">
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
              </Tooltip>
            </div>
            {change && (
              <div className="flex items-center text-sm gap-1">
                {getTrendIcon()}
                <span className={`font-medium ${getChangeColor()}`}>
                  {change}
                </span>
              </div>
            )}
          </div>
          <p className="text-2xl font-bold">
            {formatValue(value, format)}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export const DashboardCards: React.FC = () => {
  const data = useDashboardStore(state => state.data);
  const loading = useDashboardStore(state => state.loading);

  const metrics = data?.currentPeriod?.metrics;
  const previousMetrics = data?.previousPeriod?.metrics;

  const mainMetrics = [
    {
      title: 'Conversations',
      tooltip: 'Total number of conversations in the selected period',
      value: metrics?.totalConversations ?? 0,
      previousValue: previousMetrics?.totalConversations,
    },
    {
      title: "Active Accounts",
      tooltip: "Number of unique accounts that had at least one conversation",
      value: metrics?.totalAccountsWithConversations ?? 0,
      previousValue: previousMetrics?.totalAccountsWithConversations,
    },
    {
      title: 'Resolution Rate',
      tooltip: 'Percentage of conversations that were successfully resolved',
      value: metrics?.adjustedResolutionRate ?? 0,
      previousValue: previousMetrics?.adjustedResolutionRate,
      format: 'percentage' as const,
    },
    {
      title: "Cost/Conv",
      tooltip: "Average cost per conversation based on AI usage and operational expenses",
      value: 0.5, // TODO: Implement average cost per conversation calculation
      previousValue: 0.47, // TODO: Implement previous period average cost per conversation
      format: 'decimal' as const,
      invertColors: true,
    },
    {
      title: 'Retention',
      tooltip: 'Percentage of customers who returned for multiple conversations',
      value: metrics?.customerRetentionPercentage ?? 0,
      previousValue: previousMetrics?.customerRetentionPercentage,
      format: 'percentage' as const,
    },
    {
      title: 'Error Rate',
      tooltip: 'Percentage of conversations that resulted in errors or failed responses',
      value: metrics?.errorRate ?? 0,
      previousValue: previousMetrics?.errorRate,
      format: 'percentage' as const,
      invertColors: true,
    },
    {
      title: 'User Feeling',
      tooltip: 'Average user satisfaction rating based on feedback and interaction patterns',
      value: metrics?.medianUserFeeling ?? 0,
      previousValue: previousMetrics?.medianUserFeeling,
      format: 'decimal' as const,
    },
    {
      title: 'ID Rate',
      tooltip: 'Percentage of users who were successfully identified during conversations',
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
          tooltip={metric.tooltip}
          value={metric.value}
          previousValue={metric.previousValue}
          format={metric.format}
          loading={loading}
          invertColors={metric.invertColors}
        />
      ))}
    </div>
  );
}; 