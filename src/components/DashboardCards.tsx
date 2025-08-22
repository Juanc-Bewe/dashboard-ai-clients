import React from 'react';
import { Card, CardBody, Skeleton, Tooltip } from '@heroui/react';
import { Info, TrendingUp, TrendingDown } from 'lucide-react';
import { useDashboardStore } from '../contexts/DashboardContext';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission } from '../utils/permissionHelpers';

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
        return `${val.toFixed(2)}%`;
      case 'duration':
        return `${Math.round(val)}s`;
      case 'decimal':
        // Dynamic decimal places based on value size
        if (val < 0.1) return val.toFixed(4);
        if (val < 1) return val.toFixed(2);
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
              <div className="hidden md:flex items-center text-sm gap-1">
                {getTrendIcon()}
                <span className={`font-medium ${getChangeColor()}`}>
                  {change}
                </span>
              </div>
            )}
          </div>
          <p className="text-xl font-bold mb-2 md:mb-0">
            {formatValue(value, format)}
          </p>
          {change && (
            <div className="flex md:hidden items-center text-sm gap-1 mt-2">
              {getTrendIcon()}
              <span className={`font-medium ${getChangeColor()}`}>
                {change}
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

  const metrics = data?.currentPeriod?.metrics;
  const previousMetrics = data?.previousPeriod?.metrics;
  const { permissions } = useAuth();

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
      value: metrics?.averageTotalCostPerConversation ?? 0,
      previousValue: previousMetrics?.averageTotalCostPerConversation,
      format: 'decimal' as const,
      invertColors: true,
      permissions: "canViewBusinessAndCostsMetrics",
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
      title: 'Identification Rate',
      tooltip: 'Percentage of users who were successfully identified during conversations',
      value: metrics?.identificationPercentage ?? 0,
      previousValue: previousMetrics?.identificationPercentage,
      format: 'percentage' as const,
    },
    {
      title: 'Messages/Conv',
      tooltip: 'Average number of messages exchanged per conversation',
      value: metrics?.averageMessagesPerConversation ?? 0,
      previousValue: previousMetrics?.averageMessagesPerConversation,
      format: 'decimal' as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mainMetrics.filter((metric) => !metric.permissions || hasPermission(metric.permissions, permissions)).map((metric, index) => (
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