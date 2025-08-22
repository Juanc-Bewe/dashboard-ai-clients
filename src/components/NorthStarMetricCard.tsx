import React from "react";
import { Card, CardBody, Tooltip } from "@heroui/react";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
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
      return { current: 0, previous: 0, variation: 0, percentageChange: 0 };
    }

    const currentCount = data.currentPeriod.metrics.accountAnalytics.accountsWithUsefulConversations.filter(
      (account: AccountWithUsefulConversations) =>
        account.usefulConversationCount >= 3
    ).length;

    const previousCount = data?.previousPeriod?.metrics?.accountAnalytics
      ?.accountsWithUsefulConversations?.filter(
        (account: AccountWithUsefulConversations) =>
          account.usefulConversationCount >= 3
      ).length || 0;

    const variation = currentCount - previousCount;
    const percentageChange = previousCount > 0 ? ((variation / previousCount) * 100) : 0;

    return {
      current: currentCount,
      previous: previousCount,
      variation,
      percentageChange
    };
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

          <div className="py-2">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-1">
                {northStarMetric.current}
              </div>
              
              {/* Variation indicator below the value */}
              {northStarMetric.previous > 0 && (
                <div className="flex items-center justify-center gap-1">
                  {northStarMetric.variation > 0 ? (
                    <>
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-green-600 font-semibold text-xs">
                        +{northStarMetric.variation} (+{northStarMetric.percentageChange.toFixed(1)}%)
                      </span>
                    </>
                  ) : northStarMetric.variation < 0 ? (
                    <>
                      <TrendingDown className="w-3 h-3 text-red-600" />
                      <span className="text-red-600 font-semibold text-xs">
                        {northStarMetric.variation} ({northStarMetric.percentageChange.toFixed(1)}%)
                      </span>
                    </>
                  ) : (
                    <>
                      <Minus className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-500 font-semibold text-xs">
                        Sin cambios
                      </span>
                    </>
                  )}
                </div>
              )}
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
