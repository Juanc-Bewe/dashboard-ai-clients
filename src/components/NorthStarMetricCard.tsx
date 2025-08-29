import React from "react";
import { Card, CardBody, Tooltip, Input } from "@heroui/react";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { useConversationDataStore } from "../contexts/ConversationDataContext";
import type { AccountWithUsefulConversations, AccountWithConversations } from "../types/conversation-analytics";

export const NorthStarMetricCard: React.FC = () => {
  const data = useConversationDataStore((state) => state.data);
  const loading = useConversationDataStore((state) => state.loading);
  const [referenceValue, setReferenceValue] = React.useState(3);

  // Calculate North Star Metric: accounts with ≥referenceValue useful conversations
  const northStarMetric = React.useMemo(() => {
    if (
      !data?.currentPeriod?.metrics?.accountAnalytics
        ?.accountsWithUsefulConversations
    ) {
      return { current: 0, previous: 0, variation: 0, percentageChange: 0 };
    }

    const currentCount =
      data.currentPeriod.metrics.accountAnalytics.accountsWithUsefulConversations.filter(
        (account: AccountWithUsefulConversations) =>
          account.usefulConversationCount >= referenceValue
      ).length;

    const previousCount =
      data?.previousPeriod?.metrics?.accountAnalytics?.accountsWithUsefulConversations?.filter(
        (account: AccountWithUsefulConversations) =>
          account.usefulConversationCount >= referenceValue
      ).length || 0;

    const variation = currentCount - previousCount;
    const percentageChange =
      previousCount > 0 ? (variation / previousCount) * 100 : 0;

    return {
      current: currentCount,
      previous: previousCount,
      variation,
      percentageChange,
    };
  }, [data, referenceValue]);

  // Calculate Multi-Channel Metric: accounts with ≥referenceValue useful conversations across both channels
  const multiChannelMetric = React.useMemo(() => {
    if (
      !data?.currentPeriod?.metrics?.accountAnalytics?.accountsWithUsefulConversations
    ) {
      return { current: 0, previous: 0, variation: 0, percentageChange: 0 };
    }

    // Filter accounts that have useful conversations >= referenceValue AND have both channels
    const currentCount =
      data.currentPeriod.metrics.accountAnalytics.accountsWithUsefulConversations.filter(
        (account: AccountWithUsefulConversations) =>
          account.usefulConversationCount >= referenceValue &&
          account.channels &&
          account.channels.includes("twilio-whatsapp") &&
          account.channels.includes("web")
      ).length;

    const previousCount =
      data?.previousPeriod?.metrics?.accountAnalytics?.accountsWithUsefulConversations?.filter(
        (account: AccountWithUsefulConversations) =>
          account.usefulConversationCount >= referenceValue &&
          account.channels &&
          account.channels.includes("twilio-whatsapp") &&
          account.channels.includes("web")
      ).length || 0;

    const variation = currentCount - previousCount;
    const percentageChange =
      previousCount > 0 ? (variation / previousCount) * 100 : 0;

    return {
      current: currentCount,
      previous: previousCount,
      variation,
      percentageChange,
    };
  }, [data, referenceValue]);

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
            <div className="flex items-center justify-center gap-1 mb-2">
              <h2 className="text-lg font-bold text-foreground mb-0.5">
                North Star Metrics
              </h2>
              <Tooltip
                content={`Métricas clave: Cuentas con ≥${referenceValue} conversaciones útiles y omnicanal`}
                placement="top"
                showArrow
              >
                <Info className="w-4 h-4 text-foreground-500 cursor-help hover:text-foreground-700" />
              </Tooltip>
            </div>

            {/* Filter control */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-xs text-foreground-600">≥</span>
              <Input
                type="number"
                size="sm"
                value={referenceValue.toString()}
                onValueChange={(value) => {
                  const numValue = parseInt(value) || 1;
                  if (numValue >= 1 && numValue <= 100) {
                    setReferenceValue(numValue);
                  }
                }}
                className="w-16"
                classNames={{
                  input: "text-center text-xs",
                  inputWrapper: "min-h-6 h-6",
                }}
                min={1}
                max={100}
              />
              <span className="text-xs text-foreground-600">conversaciones</span>
            </div>
          </div>

          {/* Both metrics side by side */}
          <div className="grid grid-cols-2 gap-6 py-2">
            {/* North Star Metric */}
            <div className="text-center">
              <div className="text-sm text-foreground-600 mb-1">General</div>
              <div className="text-4xl font-bold text-foreground mb-1">
                {northStarMetric.current}
              </div>

              {/* Variation indicator */}
              {northStarMetric.previous > 0 && (
                <div className="flex items-center justify-center gap-1">
                  {northStarMetric.variation > 0 ? (
                    <>
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-green-600 font-semibold text-xs">
                        +{northStarMetric.variation} (+
                        {northStarMetric.percentageChange.toFixed(1)}%)
                      </span>
                    </>
                  ) : northStarMetric.variation < 0 ? (
                    <>
                      <TrendingDown className="w-3 h-3 text-red-600" />
                      <span className="text-red-600 font-semibold text-xs">
                        {northStarMetric.variation} (
                        {northStarMetric.percentageChange.toFixed(1)}%)
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

            {/* Multi-Channel Metric */}
            <div className="text-center">
              <div className="text-sm text-foreground-600 mb-1">Multi-Canal</div>
              <div className="text-4xl font-bold text-foreground mb-1">
                {multiChannelMetric.current}
              </div>

              {/* Variation indicator */}
              {multiChannelMetric.previous > 0 && (
                <div className="flex items-center justify-center gap-1">
                  {multiChannelMetric.variation > 0 ? (
                    <>
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-green-600 font-semibold text-xs">
                        +{multiChannelMetric.variation} (+
                        {multiChannelMetric.percentageChange.toFixed(1)}%)
                      </span>
                    </>
                  ) : multiChannelMetric.variation < 0 ? (
                    <>
                      <TrendingDown className="w-3 h-3 text-red-600" />
                      <span className="text-red-600 font-semibold text-xs">
                        {multiChannelMetric.variation} (
                        {multiChannelMetric.percentageChange.toFixed(1)}%)
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
