import React from "react";
import {
  Card,
  CardBody,
  Spinner,
  Button,
} from "@heroui/react";
import { RefreshCw, Mail, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { useAddonManagement } from "../contexts/AddonManagementContext";

export const EmailAnalytics: React.FC = () => {
  const { state, refreshData } = useAddonManagement();
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

  const handleRefresh = () => {
    refreshData();
  };

  if (loading && !emailsAnalytics) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Email Analytics
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

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
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

        <Card className="hover:shadow-md transition-shadow">
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

        <Card className="hover:shadow-md transition-shadow">
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

        <Card className="hover:shadow-md transition-shadow">
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

      {/* Email Status Distribution */}
      <Card className="hover:shadow-md transition-shadow">
        <CardBody className="p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Email Status Distribution
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Card className="hover:shadow-sm transition-shadow">
              <CardBody className="text-center p-4">
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {formatNumber(emailsAnalytics.stateDistribution.delivered.count)}
                </div>
                <p className="text-sm text-green-600 dark:text-green-400">Delivered</p>
                <p className="text-xs text-green-500 dark:text-green-400 mt-1">
                  {emailsAnalytics.stateDistribution.delivered.percentage.toFixed(1)}%
                </p>
              </CardBody>
            </Card>
            
            <Card className="hover:shadow-sm transition-shadow">
              <CardBody className="text-center p-4">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {formatNumber(emailsAnalytics.stateDistribution.open.count)}
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Opened</p>
                <p className="text-xs text-purple-500 dark:text-purple-400 mt-1">
                  {emailsAnalytics.stateDistribution.open.percentage.toFixed(1)}%
                </p>
              </CardBody>
            </Card>
            
            <Card className="hover:shadow-sm transition-shadow">
              <CardBody className="text-center p-4">
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {formatNumber(emailsAnalytics.stateDistribution.click.count)}
                </div>
                <p className="text-sm text-orange-600 dark:text-orange-400">Clicked</p>
                <p className="text-xs text-orange-500 dark:text-orange-400 mt-1">
                  {emailsAnalytics.stateDistribution.click.percentage.toFixed(1)}%
                </p>
              </CardBody>
            </Card>
            
            <Card className="hover:shadow-sm transition-shadow">
              <CardBody className="text-center p-4">
                <div className="text-xl font-bold text-red-600 dark:text-red-400">
                  {formatNumber(emailsAnalytics.stateDistribution.bounced.count)}
                </div>
                <p className="text-sm text-red-600 dark:text-red-400">Bounced</p>
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                  {emailsAnalytics.stateDistribution.bounced.percentage.toFixed(1)}%
                </p>
              </CardBody>
            </Card>
            
            <Card className="hover:shadow-sm transition-shadow">
              <CardBody className="text-center p-4">
                <div className="text-xl font-bold text-red-700 dark:text-red-500">
                  {formatNumber(emailsAnalytics.stateDistribution.dropped.count)}
                </div>
                <p className="text-sm text-red-700 dark:text-red-500">Dropped</p>
                <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                  {emailsAnalytics.stateDistribution.dropped.percentage.toFixed(1)}%
                </p>
              </CardBody>
            </Card>
            
            <Card className="hover:shadow-sm transition-shadow">
              <CardBody className="text-center p-4">
                <div className="text-xl font-bold text-gray-600 dark:text-gray-400">
                  {formatNumber(emailsAnalytics.stateDistribution.pending.count)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {emailsAnalytics.stateDistribution.pending.percentage.toFixed(1)}%
                </p>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timing Analytics */}
        <Card className="hover:shadow-md transition-shadow">
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

        {/* Performance & Issues Section */}
        <Card className="hover:shadow-md transition-shadow">
          <CardBody className="p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Performance Metrics
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Processed Rate</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {emailsAnalytics.processedRate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Bounced Rate</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-red-600 dark:text-red-400">
                    {emailsAnalytics.bouncedRate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Processed Count</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    {formatNumber(emailsAnalytics.stateDistribution.processed.count)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Sent Count</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
                    {formatNumber(emailsAnalytics.stateDistribution.sended.count)}
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Time to Open Distribution */}
      <Card className="hover:shadow-md transition-shadow">
        <CardBody className="p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Time to Open Distribution
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(emailsAnalytics.timeToOpenDistribution).map(([timeRange, data]) => (
              <Card key={timeRange} className="hover:shadow-sm transition-shadow">
                <CardBody className="text-center p-4">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(data.count)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{timeRange}</p>
                  <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                    {data.percentage.toFixed(1)}%
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}; 