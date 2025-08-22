import React, { useState } from "react";
import { Card, CardBody, Skeleton, Tooltip } from "@heroui/react";
import { Info, TrendingUp, TrendingDown, Copy, Check } from "lucide-react";
import { useConversationDataStore } from "../contexts/ConversationDataContext";

interface MetricCardProps {
  title: string;
  tooltip: string;
  value: number | string;
  previousValue?: number | string;
  format?: "number" | "percentage" | "duration" | "decimal";
  loading?: boolean;
  invertColors?: boolean;
  absoluteValue?: number;
  totalValue?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  tooltip,
  value,
  previousValue,
  format = "number",
  loading = false,
  invertColors = false,
  absoluteValue,
  totalValue,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // For percentage cards, copy the absolute value instead of the percentage
    const textToCopy =
      format === "percentage" && absoluteValue !== undefined
        ? absoluteValue.toString()
        : formatValue(value, format);

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const formatValue = (val: number | string, type: string) => {
    if (typeof val === "string") return val;

    switch (type) {
      case "percentage":
        return `${val.toFixed(2)}%`;
      case "duration":
        return `${Math.round(val)}s`;
      case "decimal":
        // Dynamic decimal places based on value size
        if (val < 0.1) return val.toFixed(4);
        if (val < 1) return val.toFixed(2);
        return val.toFixed(1);
      default:
        return val.toLocaleString();
    }
  };

  const calculateChange = () => {
    if (
      previousValue === undefined ||
      typeof value !== "number" ||
      typeof previousValue !== "number"
    ) {
      return null;
    }

    if (previousValue === 0) return value > 0 ? "+100%" : "0%";

    const change = ((value - previousValue) / previousValue) * 100;
    return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  };

  const change = calculateChange();
  const isPositive = change && change.startsWith("+");

  const getChangeColor = () => {
    if (!change || change === "0%") return "text-gray-600 dark:text-gray-400";

    if (invertColors) {
      return isPositive
        ? "text-red-600 dark:text-red-400"
        : "text-green-600 dark:text-green-400";
    } else {
      return isPositive
        ? "text-green-600 dark:text-green-400"
        : "text-red-600 dark:text-red-400";
    }
  };

  const getTrendIcon = () => {
    if (!change || change === "0%") return null;

    const iconClass = "h-4 w-4";
    const colorClass = getChangeColor();

    return isPositive ? (
      <TrendingUp className={`${iconClass} ${colorClass}`} />
    ) : (
      <TrendingDown className={`${iconClass} ${colorClass}`} />
    );
  };

  if (loading) {
    return (
      <Card className="">
        <CardBody className="p-6">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-3 w-1/3" />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="group relative">
      <CardBody className="p-6">
        <div className="flex flex-col">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium">{title}</p>
              <Tooltip content={tooltip} placement="top">
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              {change && (
                <div className="hidden md:flex items-center text-sm gap-1">
                  {getTrendIcon()}
                  <span className={`font-medium ${getChangeColor()}`}>
                    {change}
                  </span>
                </div>
              )}
              <Tooltip
                content={
                  copied
                    ? "¡Copiado!"
                    : format === "percentage" && absoluteValue !== undefined
                    ? `Copiar cantidad (${absoluteValue})`
                    : "Copiar valor"
                }
                placement="top"
              >
                <button
                  onClick={handleCopy}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                  )}
                </button>
              </Tooltip>
            </div>
          </div>
          <div className="mb-2 md:mb-0">
            {format === "percentage" && absoluteValue !== undefined ? (
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {formatValue(value, format)}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-current h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        totalValue && totalValue > 0
                          ? (absoluteValue / totalValue) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <div className="text-sm text-foreground-600 text-right">
                  {absoluteValue.toLocaleString()} de{" "}
                  {totalValue?.toLocaleString()}
                </div>
              </div>
            ) : (
              <p className="text-2xl font-bold">{formatValue(value, format)}</p>
            )}
          </div>
          {change && (
            <div className="flex md:hidden items-center text-sm gap-1 mt-2">
              {getTrendIcon()}
              <span className={`font-medium ${getChangeColor()}`}>
                {change}
              </span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export const StaticMetricsCard: React.FC = () => {
  const data = useConversationDataStore((state) => state.data);
  const loading = useConversationDataStore((state) => state.loading);

  if (!data?.currentPeriod?.metrics && !loading) {
    return null;
  }

  const currentMetrics = data?.currentPeriod?.metrics;
  const previousMetrics = data?.previousPeriod?.metrics;
  const volumeMetrics = currentMetrics?.volumeMetrics;
  const qualityMetrics = currentMetrics?.qualityMetrics;
  const customerAnalytics = currentMetrics?.customerAnalytics;
  const conversationMetrics = currentMetrics?.conversationMetrics;
  const temporalAnalytics = currentMetrics?.temporalAnalytics;

  // Key metrics for the overview section
  const keyMetrics = [
    {
      title: "Cuentas Activas",
      tooltip:
        "Número de cuentas únicas que tuvieron al menos una conversación",
      value: volumeMetrics?.totalAccounts ?? 0,
      previousValue: previousMetrics?.volumeMetrics?.totalAccounts,
    },
    {
      title: "Conversaciones",
      tooltip: "Número total de conversaciones en el período seleccionado",
      value: volumeMetrics?.totalConversations ?? 0,
      previousValue: previousMetrics?.volumeMetrics?.totalConversations,
    },
    {
      title: "Mensajes/Conv",
      tooltip: "Número promedio de mensajes intercambiados por conversación",
      value: conversationMetrics?.averageMessagesPerConversation ?? 0,
      previousValue:
        previousMetrics?.conversationMetrics?.averageMessagesPerConversation,
      format: "decimal" as const,
    },
    {
      title: "Útiles por Día",
      tooltip:
        "Promedio de conversaciones útiles por día en el período seleccionado",
      value: temporalAnalytics?.averageUsefulConversationPerDay ?? 0,
      previousValue:
        previousMetrics?.temporalAnalytics?.averageUsefulConversationPerDay,
      format: "decimal" as const,
    },
    {
      title: "Conversaciones Útiles",
      tooltip:
        "Porcentaje de conversaciones útiles del total de conversaciones",
      value: qualityMetrics?.percentageOfUsefulConversations ?? 0,
      previousValue:
        previousMetrics?.qualityMetrics?.percentageOfUsefulConversations,
      format: "percentage" as const,
      absoluteValue: volumeMetrics?.totalUsefulConversations ?? 0,
      totalValue: volumeMetrics?.totalConversations ?? 0,
    },
    {
      title: "Tasa de Identificación",
      tooltip:
        "Porcentaje de conversaciones donde se identificó exitosamente al usuario",
      value: qualityMetrics?.identificationPercentage ?? 0,
      previousValue: previousMetrics?.qualityMetrics?.identificationPercentage,
      format: "percentage" as const,
      absoluteValue: volumeMetrics?.totalConversationsWithIdentification ?? 0,
      totalValue: volumeMetrics?.totalConversations ?? 0,
    },
    {
      title: "Retención",
      tooltip:
        "Porcentaje de clientes que regresaron para múltiples conversaciones",
      value: customerAnalytics?.customerRetentionPercentage ?? 0,
      previousValue:
        previousMetrics?.customerAnalytics?.customerRetentionPercentage,
      format: "percentage" as const,
      absoluteValue: customerAnalytics?.returningClients ?? 0,
      totalValue: customerAnalytics?.totalUniqueClients ?? 0,
    },
    {
      title: "Tasa de Error",
      tooltip:
        "Porcentaje de conversaciones que resultaron en errores o respuestas fallidas",
      value: qualityMetrics?.errorRate ?? 0,
      previousValue: previousMetrics?.qualityMetrics?.errorRate,
      format: "percentage" as const,
      invertColors: true,
      absoluteValue: volumeMetrics?.totalConversationsWithErrors ?? 0,
      totalValue: volumeMetrics?.totalConversations ?? 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quantity Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics
          .filter((metric) => metric.format !== "percentage")
          .map((metric, index) => (
            <MetricCard
              key={`${metric.title}-${index}`}
              title={metric.title}
              tooltip={metric.tooltip}
              value={metric.value}
              previousValue={metric.previousValue}
              format={metric.format}
              loading={loading}
              invertColors={metric.invertColors}
              absoluteValue={metric.absoluteValue}
              totalValue={metric.totalValue}
            />
          ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      {/* Percentage Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics
          .filter((metric) => metric.format === "percentage")
          .map((metric, index) => (
            <MetricCard
              key={`${metric.title}-${index}`}
              title={metric.title}
              tooltip={metric.tooltip}
              value={metric.value}
              previousValue={metric.previousValue}
              format={metric.format}
              loading={loading}
              invertColors={metric.invertColors}
              absoluteValue={metric.absoluteValue}
              totalValue={metric.totalValue}
            />
          ))}
      </div>
    </div>
  );
};
