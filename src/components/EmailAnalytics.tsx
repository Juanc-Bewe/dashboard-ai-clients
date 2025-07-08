import React from "react";
import {
  Card,
  CardBody,
  Skeleton,
} from "@heroui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Mail, TrendingUp, Clock } from "lucide-react";
import { useAddonManagement } from "../contexts/AddonManagementContext";

// Custom tooltip for area chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
        <p style={{ color: payload[0].color }} className="text-sm">
          {`${payload[0].value.toLocaleString()} emails`}
          {payload[0].payload.percentage &&
            ` (${payload[0].payload.percentage.toFixed(1)}%)`}
        </p>
      </div>
    );
  }
  return null;
};

// Skeleton components for email analytics
const EmailOverviewCardSkeleton = () => (
  <Card className="">
    <CardBody className="text-center p-6">
      <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
      <Skeleton className="h-8 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-4 w-1/3 mx-auto" />
    </CardBody>
  </Card>
);

const EmailStatsCardSkeleton = () => (
  <Card className="">
    <CardBody className="p-6">
      <Skeleton className="h-5 w-3/4 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        ))}
      </div>
    </CardBody>
  </Card>
);

const TimeDistributionSkeleton = () => (
  <Card className="">
    <CardBody className="p-6">
      <Skeleton className="h-5 w-3/4 mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="">
            <CardBody className="text-center p-4">
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-4 w-1/2 mx-auto mb-1" />
              <Skeleton className="h-3 w-1/3 mx-auto" />
            </CardBody>
          </Card>
        ))}
      </div>
    </CardBody>
  </Card>
);

export const EmailAnalytics: React.FC = () => {
  const { state } = useAddonManagement();
  const { data, loading, error } = state;

  const emailsAnalytics = data?.emailsAnalytics;

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  const formatTime = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`;
    }
    return `${hours.toFixed(1)}h`;
  };

  if (loading && !emailsAnalytics) {
    return (
      <div className="space-y-6">
        {/* Overview Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EmailOverviewCardSkeleton />
          <EmailOverviewCardSkeleton />
          <EmailOverviewCardSkeleton />
          <EmailOverviewCardSkeleton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmailStatsCardSkeleton />
          <EmailStatsCardSkeleton />
        </div>

        <TimeDistributionSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        Error loading email analytics: {error}
      </div>
    );
  }

  if (!emailsAnalytics) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No email analytics data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="">
          <CardBody className="text-center p-6">
            <div className="flex items-center justify-center mb-2">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Total Emails
              </h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatNumber(emailsAnalytics.totalEmails)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Sent this period
            </p>
          </CardBody>
        </Card>

        <Card className="">
          <CardBody className="text-center p-6">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Delivery Rate
              </h3>
            </div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {emailsAnalytics.deliveryRate.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Successfully delivered
            </p>
          </CardBody>
        </Card>

        <Card className="">
          <CardBody className="text-center p-6">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Open Rate
              </h3>
            </div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {emailsAnalytics.openRate.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Emails opened
            </p>
          </CardBody>
        </Card>

        <Card className="">
          <CardBody className="text-center p-6">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Click Rate
              </h3>
            </div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {emailsAnalytics.clickRate.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Links clicked
            </p>
          </CardBody>
        </Card>
      </div>



      <div className="space-y-6">
        {/* Timing Analytics */}
        <Card className="">
          <CardBody className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Time to Open Analytics
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatTime(emailsAnalytics.averageTimeToOpen)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Time</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatTime(emailsAnalytics.medianTimeToOpen)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Median Time</p>
              </div>
            </div>
          </CardBody>
        </Card>

      </div>

      {/* Time to Open Distribution */}
      <Card className="">
        <CardBody className="p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Time to Open Distribution
          </h3>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Object.values(emailsAnalytics.timeToOpenDistribution).reduce((sum, item) => sum + item.count, 0).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Opens</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {emailsAnalytics.openRate.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overall Open Rate</p>
            </div>
          </div>

          {/* Area Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={Object.entries(emailsAnalytics.timeToOpenDistribution).map(([timeRange, data]) => ({
                  timeRange,
                  count: data.count,
                  percentage: data.percentage,
                }))}
                margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
              >
                <defs>
                  <linearGradient id="timeDistributionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.7} />
                <XAxis
                  dataKey="timeRange"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#timeDistributionGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Enhanced Legend with Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-4">
            {Object.entries(emailsAnalytics.timeToOpenDistribution).map(([timeRange, data]) => (
              <div
                key={timeRange}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shadow-sm flex-shrink-0 bg-blue-500"></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                    {timeRange}
                  </span>
                </div>
                <div className="flex flex-col items-end ml-2">
                  <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                    {formatNumber(data.count)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {data.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};