import React from 'react';
import { Tabs, Tab, Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Progress } from '@heroui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useDashboardStore } from '../contexts/DashboardContext';
import type { DailyMetric, UserFeelingDistribution } from '../types/dashboard';

const DailyMetricsTab: React.FC = () => {
  const data = useDashboardStore(state => state.data);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDuration = (seconds: number) => {
    return `${Math.round(seconds)}s`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'totalConversations', label: 'Conversations' },
    { key: 'conversationsWithIdentification', label: 'With ID' },
    { key: 'newClients', label: 'New Clients' },
    { key: 'resolutionRate', label: 'Resolution Rate' },
    { key: 'medianConversationDuration', label: 'Median Duration' },
    { key: 'medianUserFeeling', label: 'User Feeling' },
    { key: 'spamCount', label: 'Spam' }
  ];

  const renderCell = (item: DailyMetric, columnKey: string) => {
    switch (columnKey) {
      case 'date':
        return formatDate(item.date);
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
              <TableBody items={data?.currentPeriod?.dailyMetrics || []}>
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
                <TableBody items={data.previousPeriod.dailyMetrics}>
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

const UserFeelingTab: React.FC = () => {
  const data = useDashboardStore(state => state.data);

  const currentFeeling = data?.currentPeriod?.metrics?.userFeelingDistribution;
  const previousFeeling = data?.previousPeriod?.metrics?.userFeelingDistribution;

  const FeelingDistributionCard: React.FC<{ 
    title: string; 
    distribution: UserFeelingDistribution;
    total: number;
  }> = ({ title, distribution, total }) => {
    const feelingLabels = {
      "1": 'Negative',
      "2": 'Neutral', 
      "3": 'Positive'
    };

    const feelingColors = {
      "1": 'danger',
      "2": 'warning',
      "3": 'success'
    } as const;

    return (
      <Card>
        <CardBody>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {title}
          </h4>
          <div className="space-y-4">
            {Object.entries(distribution).map(([key, value]) => {
              // Handle both simple number and object with count/percentage
              const count = typeof value === 'number' ? value : value?.count || 0;
              const percentage = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {feelingLabels[key as keyof UserFeelingDistribution]}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress
                    value={percentage}
                    color={feelingColors[key as keyof typeof feelingColors]}
                    size="sm"
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {currentFeeling && (
        <FeelingDistributionCard
          title="Current Period"
          distribution={currentFeeling}
          total={data?.currentPeriod?.metrics?.totalConversationsWithIdentification || 0}
        />
      )}
      {previousFeeling && (
        <FeelingDistributionCard
          title="Previous Period"
          distribution={previousFeeling}
          total={data?.previousPeriod?.metrics?.totalConversationsWithIdentification || 0}
        />
      )}
    </div>
  );
};

const UseAndAdoption: React.FC = () => {
  const data = useDashboardStore(state => state.data);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Conversations Over Time */}
          <Card className="rounded-2xl">
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Conversations Over Time
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
          <Card className="rounded-2xl">
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

export const DashboardTabs: React.FC = () => {
  return (
    <div className="w-full">
      <Tabs aria-label="Dashboard tabs" variant="underlined" size="lg">
        <Tab key="overview" title="Overview">
          <UseAndAdoption />
        </Tab>
        <Tab key="daily" title="Daily Metrics">
          <DailyMetricsTab />
        </Tab>
        <Tab key="feelings" title="User Feelings">
          <UserFeelingTab />
        </Tab>
      </Tabs>
    </div>
  );
}; 