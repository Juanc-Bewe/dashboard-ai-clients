import React from "react";
import {
  Card,
  CardBody,
  Spinner,
  Skeleton,
} from "@heroui/react";
import { Mail, TrendingUp, Clock } from "lucide-react";
import { useAddonManagement } from "../contexts/AddonManagementContext";

// Skeleton components for email analytics
const EmailOverviewCardSkeleton = () => (
  <Card className="hover:shadow-md transition-shadow">
    <CardBody className="text-center p-6">
      <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
      <Skeleton className="h-8 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-4 w-1/3 mx-auto" />
    </CardBody>
  </Card>
);

const EmailStatsCardSkeleton = () => (
  <Card className="hover:shadow-md transition-shadow">
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
  <Card className="hover:shadow-md transition-shadow">
    <CardBody className="p-6">
      <Skeleton className="h-5 w-3/4 mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="hover:shadow-sm transition-shadow">
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

        {/* Email Status Summary */}
        <Card className="hover:shadow-md transition-shadow">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Email Status Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Processed Rate</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {emailsAnalytics.processedRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Bounced Rate</span>
                <span className="text-lg font-bold text-red-600 dark:text-red-400">
                  {emailsAnalytics.bouncedRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Delivered</span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  {formatNumber(emailsAnalytics.stateDistribution.delivered.count)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Opened</span>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {formatNumber(emailsAnalytics.stateDistribution.open.count)}
                </span>
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