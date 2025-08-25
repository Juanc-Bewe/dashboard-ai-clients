import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { NorthStarMetricCard } from "./NorthStarMetricCard";
import { StaticMetricsCard } from "./StaticMetricsCard";
import { QualityMetricsCard } from "./QualityMetricsCard";
import { CostMetricsCard } from "./CostMetricsCard";
import { UsabilityAndIndependenceTab } from "./UsabilityAndIndependenceTab";
import { AccountsTab } from "./AccountsTab";
import { NotificationsTab } from "./NotificationsTab";
import { ChatEventsAnalyticsTab } from "./ChatEventsAnalyticsTab";
import { useAuth } from "../contexts/AuthContext";
import { hasPermission } from "../utils/permissionHelpers";
import {
  useTabManagementStore,
  type TabKey,
} from "../contexts/TabManagementContext";
import { useConversationAutoSync } from "../contexts/ConversationDataContext";

export const ConversationAnalyticsTabs: React.FC = () => {
  const { permissions } = useAuth();
  const setActiveTab = useTabManagementStore((state) => state.setActiveTab);

  // Auto-sync conversation data (for NorthStar, Static, Quality, UsabilityAndIndependence, and Cost tabs)
  useConversationAutoSync();

  // Set initial active tab
  React.useEffect(() => {
    setActiveTab("accounts");
  }, [setActiveTab]);

  const handleTabChange = (key: React.Key) => {
    setActiveTab(key as TabKey);
  };

  return (
    <div className="w-full space-y-6">
      {/* Full width North Star Metric Card */}
      <div className="w-full">
        <NorthStarMetricCard />
      </div>

      {/* Static Metrics Cards */}
      <div className="w-full">
        <StaticMetricsCard />
      </div>

      {/* Tabs with other metrics below */}
      <div className="w-full">
        <Tabs
          aria-label="Métricas de conversación"
          variant="underlined"
          size="lg"
          className="w-full"
          onSelectionChange={handleTabChange}
          defaultSelectedKey="accounts"
        >
          <Tab key="accounts" title="Activación multicanal">
            <AccountsTab />
          </Tab>

          <Tab key="quality" title="Conversaciones Útiles">
            <QualityMetricsCard />
          </Tab>

          <Tab key="notifications" title="Notificaciones">
            <NotificationsTab />
          </Tab>

          <Tab key="adoption-metrics" title="Uso y Adopción">
            <UsabilityAndIndependenceTab />
          </Tab>

          <Tab key="chat-events" title="Eventos de Chat">
            <ChatEventsAnalyticsTab />
          </Tab>

          {hasPermission("canViewBusinessAndCostsMetrics", permissions) && (
            <Tab key="costs" title="Costos">
              <CostMetricsCard />
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};
