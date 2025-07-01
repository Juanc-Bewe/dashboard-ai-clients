import React from 'react';
import { Card, CardBody, Progress, Skeleton } from '@heroui/react';
import { useDashboardStore } from '../contexts/DashboardContext';
import type { UserFeelingDistribution } from '../types/dashboard';

const UserFeelingTabSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2].map((index) => (
        <Card key={index}>
          <CardBody>
            <Skeleton className="h-6 w-32 mb-4 rounded-lg" />
            <div className="space-y-4">
              {[1, 2, 3].map((feelingIndex) => (
                <div key={feelingIndex} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export const UserFeelingTab: React.FC = () => {
  const data = useDashboardStore(state => state.data);
  const loading = useDashboardStore(state => state.loading);

  // Show skeleton while loading
  if (loading) {
    return <UserFeelingTabSkeleton />;
  }

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