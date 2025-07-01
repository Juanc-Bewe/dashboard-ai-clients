import React from 'react';
import { Card, CardBody, Skeleton } from '@heroui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useDashboardStore } from '../contexts/DashboardContext';

const UseAndAdoptionSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-7 w-80 mb-6 rounded-lg" />

        {/* Charts Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bar Chart Skeleton */}
          <Card className="rounded-2xl lg:col-span-2">
            <CardBody className="p-6">
              <Skeleton className="h-6 w-48 mb-4 rounded-lg" />
              <div className="h-80 flex items-center justify-center">
                <Skeleton className="h-full w-full rounded-lg" />
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

  // Prepare data for conversations over time chart
  const conversationsChartData = data?.currentPeriod?.dailyMetrics?.map(metric => ({
    date: new Date(metric.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    totalConversations: metric.totalConversations,
    conversationsWithIdentification: metric.conversationsWithIdentification
  })) || [];

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

  // Show skeleton while loading (after all hooks are called)
  if (loading) {
    return <UseAndAdoptionSkeleton />;
  }

  // KPI Cards data
  const kpiCards = [
    {
      title: 'Identification Rate',
      value: `${data?.currentPeriod?.metrics?.identificationPercentage || 0}%`,
      color: 'bg-blue-500',
      textColor: 'text-white'
    },
    {
      title: 'New Clients This Month',
      value: data?.currentPeriod?.metrics?.totalNewClients || 0,
      color: 'bg-green-500',
      textColor: 'text-white'
    },
    {
      title: 'Total Accounts Active',
      value: data?.currentPeriod?.metrics?.totalAccountsWithConversations || 0,
      color: 'bg-purple-500',
      textColor: 'text-white'
    },
    {
      title: 'Resolution Rate',
      value: `${data?.currentPeriod?.metrics?.resolutionRate || 0}%`,
      color: 'bg-emerald-500',
      textColor: 'text-white'
    },
    {
      title: 'Median Conversation Duration',
      value: data?.currentPeriod?.metrics?.medianConversationDuration 
        ? `${Math.floor((data.currentPeriod.metrics.medianConversationDuration || 0) / 60)}m ${Math.round((data.currentPeriod.metrics.medianConversationDuration || 0) % 60)}s`
        : '0s',
      color: 'bg-orange-500',
      textColor: 'text-white'
    },
    {
      title: 'Total Conversations',
      value: data?.currentPeriod?.metrics?.totalConversations || 0,
      color: 'bg-cyan-500',
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Conversations Over Time */}
          <Card className="rounded-2xl lg:col-span-2">
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Conversations By Day
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversationsChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        border: 'none',
                        borderRadius: '12px',
                      }}
                    />
                    <Bar
                      dataKey="totalConversations"
                      fill="#3b82f6"
                      name="Total Conversations"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="conversationsWithIdentification"
                      fill="#22c55e"
                      name="With Identification"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>

          {/* Customer Retention */}
          <Card className="rounded-2xl lg:col-span-1">
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Customer Retention
              </h3>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerRetentionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      cornerRadius={1}
                    >
                      {customerRetentionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}`, name]}
                      contentStyle={{ 
                        backgroundColor: '#374151', 
                        border: 'none', 
                        borderRadius: '12px',
                        color: 'white'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {customerRetentionData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {entry.name}: {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* KPI Cards */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Key Performance Indicators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpiCards.map((card, index) => (
              <Card key={index} className={`${card.color} ${card.textColor} rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <CardBody className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium opacity-90 mb-2">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold">
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