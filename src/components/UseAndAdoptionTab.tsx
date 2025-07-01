import React from 'react';
import { Card, CardBody, Skeleton } from '@heroui/react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useDashboardStore } from '../contexts/DashboardContext';
import { DailyConversationAnalytics } from './DailyConversationAnalytics';
import { PeakUsageHours } from './PeakUsageHours';

const UseAndAdoptionSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-7 w-80 mb-6 rounded-lg" />

        {/* Charts Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Area Chart Skeleton */}
          <Card className="rounded-2xl lg:col-span-2">
            <CardBody className="p-6">
              <Skeleton className="h-6 w-56 mb-4 rounded-lg" />
              <div className="h-80 flex items-center justify-center">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
              {/* Insights Skeleton */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="text-center">
                      <Skeleton className="h-4 w-20 mb-2 mx-auto rounded-md" />
                      <Skeleton className="h-6 w-16 mx-auto rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Pie Chart Skeleton */}
          <Card className="rounded-2xl lg:col-span-1">
            <CardBody className="p-6">
              <Skeleton className="h-6 w-40 mb-4 rounded-lg" />
              <div className="h-80 flex items-center justify-center">
                <Skeleton className="h-48 w-48 rounded-full" />
              </div>
              {/* Legend Skeleton */}
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Peak Usage Hours Chart Skeleton */}
        <div className="mb-8">
          <Card className="rounded-2xl">
            <CardBody className="p-6">
              <Skeleton className="h-6 w-56 mb-4 rounded-lg" />
              <div className="h-80 flex items-center justify-center">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* KPI Cards Skeleton */}
        <div>
          <Skeleton className="h-6 w-56 mb-4 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, index) => (
              <Card key={index} className="rounded-2xl shadow-lg">
                <CardBody className="p-6">
                  <div className="text-center">
                    <Skeleton className="h-4 w-32 mb-2 mx-auto rounded-md" />
                    <Skeleton className="h-8 w-20 mx-auto rounded-lg" />
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const UseAndAdoptionTab: React.FC = () => {
  const data = useDashboardStore(state => state.data);
  const loading = useDashboardStore(state => state.loading);

  // Prepare data for customer retention donut chart
  const customerRetentionData = React.useMemo(() => {
    if (!data?.currentPeriod?.metrics) return [];
    
    const newClients = data.currentPeriod.metrics.totalNewClients || 0;
    const returningClients = data.currentPeriod.metrics.returningClients || 0;
    const totalUniqueClients = data.currentPeriod.metrics.totalUniqueClients || 0;
    
    // Calculate returning monthly (total unique - new - returning weekly)
    const returningMonthly = Math.max(0, totalUniqueClients - newClients - returningClients);

    return [
      { name: 'New Clients', value: newClients, color: '#22c55e' },
      { name: 'Returning Weekly', value: returningClients, color: '#3b82f6' },
      { name: 'Returning Monthly', value: returningMonthly, color: '#f59e0b' }
    ].filter(item => item.value > 0);
  }, [data?.currentPeriod?.metrics]);

  // Prepare data for channel distribution donut chart
  const channelDistributionData = React.useMemo(() => {
    if (!data?.currentPeriod?.metrics?.channelDistribution) return [];
    
    const channels = data.currentPeriod.metrics.channelDistribution;
    const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    return Object.entries(channels).map(([channel, data], index) => ({
      name: channel === 'web' ? 'Web' : 
            channel === 'twilio-whatsapp' ? 'WhatsApp' : 
            channel.charAt(0).toUpperCase() + channel.slice(1),
      value: data.count,
      color: colors[index % colors.length]
    })).filter(item => item.value > 0);
  }, [data?.currentPeriod?.metrics?.channelDistribution]);

  // Show skeleton while loading (after all hooks are called)
  if (loading) {
    return <UseAndAdoptionSkeleton />;
  }

  // KPI Cards data
  const kpiCards = [
    {
      title: 'Identification Rate',
      value: `${data?.currentPeriod?.metrics?.identificationPercentage || 0}%`,
      color: 'bg-gradient-to-br from-blue-600 to-blue-700',
      textColor: 'text-white'
    },
    {
      title: 'New Clients This Month',
      value: data?.currentPeriod?.metrics?.totalNewClients || 0,
      color: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
      textColor: 'text-white'
    },
    {
      title: 'Total Accounts Active',
      value: data?.currentPeriod?.metrics?.totalAccountsWithConversations || 0,
      color: 'bg-gradient-to-br from-violet-600 to-violet-700',
      textColor: 'text-white'
    },
    {
      title: 'Resolution Rate',
      value: `${data?.currentPeriod?.metrics?.adjustedResolutionRate || 0}%`,
      color: 'bg-gradient-to-br from-green-600 to-green-700',
      textColor: 'text-white'
    },
    {
      title: 'Median Conversation Duration',
      value: data?.currentPeriod?.metrics?.medianConversationDuration 
        ? `${Math.floor((data.currentPeriod.metrics.medianConversationDuration || 0) / 60)}m ${Math.round((data.currentPeriod.metrics.medianConversationDuration || 0) % 60)}s`
        : '0s',
      color: 'bg-gradient-to-br from-amber-600 to-orange-600',
      textColor: 'text-white'
    },
    {
      title: 'Total Conversations',
      value: data?.currentPeriod?.metrics?.totalConversations || 0,
      color: 'bg-gradient-to-br from-cyan-600 to-blue-600',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Usage & Adoption Metrics Section */}
      <div>
        <h2 className="text-xl font-semibold mb-6">
          Usage & Adoption Metrics Section:
        </h2>

        {/* Charts Row */}
        <div className="space-y-6 mb-8">
          {/* Daily Conversation Analytics - Full Width */}
          <DailyConversationAnalytics data={data} />

          {/* Customer Retention and Channel Distribution Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Retention */}
            <Card className="rounded-2xl border-0">
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold mb-6">
                  Customer Retention
                </h3>

                {/* Chart Container */}
                <div className="relative h-64 flex items-center justify-center mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerRetentionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        cornerRadius={3}
                      >
                        {customerRetentionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center Total */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-2xl font-bold">
                      {customerRetentionData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Total Clients
                    </div>
                  </div>
                </div>

                {/* Enhanced Legend with Stats */}
                <div className="space-y-3">
                  {customerRetentionData.map((entry, index) => {
                    const total = customerRetentionData.reduce((sum, item) => sum + item.value, 0);
                    const percentage = total > 0 ? Math.round((entry.value / total) * 100) : 0;

                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full shadow-sm" 
                            style={{ backgroundColor: entry.color }}
                          ></div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {entry.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            {entry.value.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            ({percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

            {/* Channel Distribution */}
            <Card className="rounded-2xl border-0">
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold mb-6">
                  Channel Distribution
                </h3>

                {/* Chart Container */}
                <div className="relative h-64 flex items-center justify-center mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        cornerRadius={3}
                      >
                        {channelDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [value.toLocaleString(), 'Conversations']}
                        labelStyle={{ color: '#374151' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center Total */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-2xl font-bold">
                      {channelDistributionData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Total Conversations
                    </div>
                  </div>
                </div>

                {/* Enhanced Legend with Stats */}
                <div className="space-y-3">
                  {channelDistributionData.map((entry, index) => {
                    const total = channelDistributionData.reduce((sum, item) => sum + item.value, 0);
                    const percentage = total > 0 ? Math.round((entry.value / total) * 100) : 0;

                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full shadow-sm" 
                            style={{ backgroundColor: entry.color }}
                          ></div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {entry.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            {entry.value.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            ({percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Peak Usage Hours Chart */}
        <div className="mb-8">
          <PeakUsageHours data={data} />
        </div>

        {/* KPI Cards */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Key Performance Indicators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpiCards.map((card, index) => (
              <Card key={index} className={`${card.color} ${card.textColor} rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <CardBody className="p-4">
                  <div className="text-center">
                    <p className="text-xs font-medium opacity-90 mb-1">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold">
                      {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 