import React from "react";
import { Card, CardBody, Tooltip } from "@heroui/react";
import { TrendingUp, Info } from "lucide-react";
import { useConversationAnalyticsStore } from "../contexts/ConversationAnalyticsContext";
import type { AccountWithUsefulConversations } from "../types/conversation-analytics";

export const NorthStarMetricCard: React.FC = () => {
  const data = useConversationAnalyticsStore((state) => state.data);
  const loading = useConversationAnalyticsStore((state) => state.loading);

  // Calculate North Star Metric: accounts with ≥3 useful conversations
  const northStarMetric = React.useMemo(() => {
    if (
      !data?.currentPeriod?.metrics?.accountAnalytics
        ?.accountsWithUsefulConversations
    ) {
      return 0;
    }

    return data.currentPeriod.metrics.accountAnalytics.accountsWithUsefulConversations.filter(
      (account: AccountWithUsefulConversations) =>
        account.usefulConversationCount >= 3
    ).length;
  }, [data]);

  if (loading) {
    return (
      <Card className="w-full h-fit">
        <CardBody className="p-6">
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-"></div>
            <span className="ml-2 text-foreground-600 text-sm">
              Cargando métricas...
            </span>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full h-fit">
      <CardBody className="px-4 py-3 text-center">
        <div className="space-y-1">
          <div>
            <div className="flex items-center justify-center gap-1">
              <h2 className="text-lg font-bold text-foreground mb-0.5">
                North Star Metric
              </h2>
              <Tooltip
                content="Cuentas activas con ≥3 conversaciones útiles"
                placement="top"
                showArrow
              >
                <Info className="w-4 h-4 text-foreground-500 cursor-help hover:text-foreground-700" />
              </Tooltip>
            </div>
          </div>

          <div className="py-1">
            <div className="text-3xl font-bold text-purple-600">
              {northStarMetric}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-foreground-600 bg-gray-50 dark:bg-gray-800/50 rounded-md p-1.5 mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>Motor de crecimiento</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
