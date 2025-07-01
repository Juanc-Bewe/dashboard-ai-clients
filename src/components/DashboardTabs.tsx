import React from 'react';
import { Tabs, Tab } from '@heroui/react';
import { DailyMetricsTab } from './DailyMetricsTab';
// import { UserFeelingTab } from './UserFeelingTab';
import { UseAndAdoptionTab } from './UseAndAdoptionTab';
import { BusinessAndCostTab } from './BusinessAndCostTab';

export const DashboardTabs: React.FC = () => {
  return (
    <div className="w-full">
      <Tabs aria-label="Dashboard tabs" variant="underlined" size="lg">
        <Tab key="overview" title="Overview">
          <UseAndAdoptionTab />
        </Tab>
        <Tab key="business" title="Business and Cost">
          <BusinessAndCostTab />
        </Tab>
        <Tab key="daily" title="Daily Metrics">
          <DailyMetricsTab />
        </Tab>
        {/* <Tab key="feelings" title="User Feelings">
          <UserFeelingTab />
        </Tab> */}
      </Tabs>
    </div>
  );
};