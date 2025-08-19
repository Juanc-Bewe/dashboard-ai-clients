import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { NorthStarMetricCard } from "./NorthStarMetricCard";
import { StaticMetricsCard } from "./StaticMetricsCard";
import { QualityMetricsCard } from "./QualityMetricsCard";
import { CostMetricsCard } from "./CostMetricsCard";
import { UseAndAdoptionTab } from "./UseAndAdoptionTab";
import { UsabilityAndIndependenceTab } from "./UsabilityAndIndependenceTab";
import { useAuth } from "../contexts/AuthContext";
import { hasPermission } from "../utils/permissionHelpers";

export const ConversationAnalyticsTabs: React.FC = () => {
  const { permissions } = useAuth();

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
        <Tabs aria-label="Métricas de conversación" variant="underlined" size="lg" className="w-full">

          <Tab key="quality" title="Conversaciones Útiles">
            <QualityMetricsCard />
          </Tab>

          {hasPermission("canViewBusinessAndCostsMetrics", permissions) && (
            <Tab key="costs" title="Costos">
              <CostMetricsCard />
            </Tab>
          )}

          <Tab key="adoption" title="Adopción">
            <UseAndAdoptionTab />
          </Tab>

          <Tab key="adoption-metrics" title="Uso y Adopción">
            <UsabilityAndIndependenceTab />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
