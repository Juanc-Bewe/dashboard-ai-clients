import React from "react";
import { Card, CardBody, Skeleton, Tooltip } from "@heroui/react";
import {
  Info,
  MessageCircle,
  Eye,
  MousePointer,
  X,
  Send,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useChatEventsAnalytics, useChatEventsAutoSync } from "../contexts/ChatEventsAnalyticsContext";

interface MetricCardProps {
  title: string;
  tooltip: string;
  value: number | string;
  format?: "number" | "percentage" | "time";
  loading?: boolean;
  icon?: React.ReactNode;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  tooltip,
  value,
  format = "number",
  loading = false,
  icon,
  color = "blue",
}) => {
  const formatValue = (val: number | string, type: string) => {
    if (typeof val === "string") return val;

    switch (type) {
      case "percentage":
        return `${val.toFixed(1)}%`;
      case "time":
        return val === 0 ? "0s" : `${val.toFixed(1)}s`;
      default:
        return val.toLocaleString();
    }
  };

  if (loading) {
    return (
      <Card className="">
        <CardBody className="p-6">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-8 w-1/2 mb-2" />
        </CardBody>
      </Card>
    );
  }

  const colorClasses = {
    blue: "text-foreground",
    green: "text-foreground",
    purple: "text-foreground",
    orange: "text-foreground",
    red: "text-foreground",
    yellow: "text-foreground",
  };

  return (
    <Card className="group relative">
      <CardBody className="p-6">
        <div className="flex flex-col">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2">
              {icon && <div className="text-gray-500 dark:text-gray-400">{icon}</div>}
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium">{title}</p>
                <Tooltip content={tooltip} placement="top">
                  <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="mb-2 md:mb-0">
            <p className={`text-xl font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>
              {formatValue(value, format)}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

interface ConversionFunnelProps {
  data: {
    totalSessions: number;
    sessionsWithChatDisplayed: number;
    sessionsWithChatOpened: number;
    sessionsWithFirstMessageSent: number;
  };
  loading: boolean;
}

const ConversionFunnel: React.FC<ConversionFunnelProps> = ({ data, loading }) => {
  const funnelData = [
    {
      name: "Renderizaciones del Chat",
      value: data.totalSessions,
      percentage: 100,
      color: "#3b82f6",
    },
    {
      name: "Chat Mostrado",
      value: data.sessionsWithChatDisplayed,
      percentage: data.totalSessions > 0 ? (data.sessionsWithChatDisplayed / data.totalSessions) * 100 : 0,
      color: "#10b981",
    },
    {
      name: "Chat Abierto",
      value: data.sessionsWithChatOpened,
      percentage: data.totalSessions > 0 ? (data.sessionsWithChatOpened / data.totalSessions) * 100 : 0,
      color: "#f59e0b",
    },
    {
      name: "Mensaje Enviado",
      value: data.sessionsWithFirstMessageSent,
      percentage: data.totalSessions > 0 ? (data.sessionsWithFirstMessageSent / data.totalSessions) * 100 : 0,
      color: "#8b5cf6",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {funnelData.map((step, index) => {
        // Calculate the width percentage for visual funnel effect
        const widthPercentage = step.percentage;

        return (
          <div key={step.name} className="relative">
            <div className="flex items-center justify-between p-4 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: step.color }}
                />
                <span className="font-medium text-gray-900 dark:text-white min-w-0">
                  {step.name}
                </span>

                {/* Visual bar representing the funnel */}
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: step.color,
                        width: `${Math.max(widthPercentage, 2)}%`, // Minimum 2% for visibility
                        opacity: 0.8
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-lg font-bold text-foreground">
                  {step.value.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[60px] text-right">
                  {step.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            
            {index < funnelData.length - 1 && (
              <div className="flex justify-center my-2">
                <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-600" />
              </div>
            )}
          </div>
        );
      })}

    </div>
  );
};

interface BubbleAnalyticsProps {
  data: {
    totalBubbleInteractions: number;
    clickedAfterDisplayed: number;
    dismissedAfterDisplayed: number;
    bubbleClickRate: number;
    averageTimeToOpenWithBubble: number;
    averageTimeToOpenWithoutBubble: number;
    bubbleSpeedsUpOpening: boolean;
  };
  loading: boolean;
}

const BubbleAnalytics: React.FC<BubbleAnalyticsProps> = ({ data, loading }) => {
  const bubbleData = [
    {
      name: "Clicks",
      value: data.clickedAfterDisplayed,
      color: "#10b981",
    },
    {
      name: "Descartadas",
      value: data.dismissedAfterDisplayed,
      color: "#ef4444",
    },
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const total = data.totalBubbleInteractions;
      const percentage = total > 0 ? ((payload[0].value as number / total) * 100).toFixed(1) : "0";
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">
            {payload[0].payload.name}
          </p>
          <p style={{ color: payload[0].payload.color }} className="text-sm">
            {`${payload[0].value} interacciones (${percentage}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-80 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bubble Metrics Summary - Improved UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <MousePointer className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tasa de Interacción
              </span>
              <Tooltip
                content="Porcentaje de usuarios que hacen clic en la guía visual del chat en lugar de descartarla"
                placement="top"
              >
                <Info className="h-3 w-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
              </Tooltip>
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground mb-2">
            {data.bubbleClickRate.toFixed(1)}%
          </p>
          {/* <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.clickedAfterDisplayed.toLocaleString()} de {data.totalBubbleInteractions.toLocaleString()} usuarios
          </p> */}
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tiempo con Burbuja
              </span>
              <Tooltip
                content="Tiempo promedio que tardan los usuarios en abrir el chat cuando tienen la burbuja disponible"
                placement="top"
              >
                <Info className="h-3 w-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
              </Tooltip>
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground mb-2">
            {data.averageTimeToOpenWithBubble.toFixed(1)}s
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tiempo sin Burbuja
              </span>
              <Tooltip
                content="Tiempo promedio que tardan los usuarios en abrir el chat cuando no tienen la burbuja disponible"
                placement="top"
              >
                <Info className="h-3 w-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
              </Tooltip>
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground mb-2">
            {data.averageTimeToOpenWithoutBubble.toFixed(1)}s
          </p>
        </div>
      </div>

      {/* Bubble Interaction Donut Chart - Moved to Bottom */}
      {bubbleData.length > 0 ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient
                  id="gradientClicks"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient
                  id="gradientDismissed"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <Pie
                data={bubbleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                stroke="none"
              >
                {bubbleData.map((entry, index) => {
                  const gradientId = entry.name === "Clicks" ? "gradientClicks" : "gradientDismissed";
                  return (
                    <Cell key={`cell-${index}`} fill={`url(#${gradientId})`} />
                  );
                })}
              </Pie>

              {/* Center text showing total */}
              <text
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-current text-xl font-bold text-foreground"
              >
                {data.totalBubbleInteractions}
              </text>
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-current text-sm text-foreground-600"
              >
                interacciones
              </text>
              <RechartsTooltip
                content={<CustomTooltip />}
                animationDuration={0}
                isAnimationActive={false}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No hay interacciones de burbuja disponibles</p>
        </div>
      )}

      {/* Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {bubbleData.map((entry, index) => {
          const total = data.totalBubbleInteractions;
          const percentage = total > 0 ? ((entry.value / total) * 100).toFixed(1) : "0";

          return (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full shadow-sm flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                  {entry.name}
                </span>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                  {entry.value}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChatEventsAnalyticsTabSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Metrics Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-64 rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Card key={index} className="">
              <CardBody className="p-6">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-8 w-1/2 mb-2" />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Conversion Rates Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }, (_, index) => (
            <Card key={index} className="">
              <CardBody className="p-6">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-8 w-1/2 mb-2" />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Conversion Funnel Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-56 rounded-lg" />
        <Card className="w-full">
          <CardBody className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Time Metrics Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }, (_, index) => (
            <Card key={index} className="">
              <CardBody className="p-6">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-8 w-1/2 mb-2" />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Bubble Analytics Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-56 rounded-lg" />
        <Card className="w-full">
          <CardBody className="p-6">
            <Skeleton className="h-80 w-full" />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export const ChatEventsAnalyticsTab: React.FC = () => {
  const { data, loading, error } = useChatEventsAnalytics();

  // Auto-sync chat events data (for this tab)
  useChatEventsAutoSync();

  if (loading) {
    return <ChatEventsAnalyticsTabSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  const metrics = data?.chatEventsMetrics;

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          Métricas de Engagement del Chat
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            title="Renderizaciones del Chat"
            tooltip="Total de veces que el chat fue renderizado/mostrado en páginas web durante el período"
            value={metrics?.totalSessions ?? 0}
            icon={<Users className="h-4 w-4" />}
            color="blue"
          />
          <MetricCard
            title="Chat Mostrado"
            tooltip="Número de sesiones donde se mostró el chat al usuario"
            value={metrics?.sessionsWithChatDisplayed ?? 0}
            icon={<Eye className="h-4 w-4" />}
            color="green"

          />
          <MetricCard
            title="Chat Abierto"
            tooltip="Número de sesiones donde el usuario abrió el chat"
            value={metrics?.sessionsWithChatOpened ?? 0}
            icon={<MessageCircle className="h-4 w-4" />}
            color="purple"

          />
          <MetricCard
            title="Mensajes Enviados"
            tooltip="Número de sesiones donde el usuario envió al menos un mensaje"
            value={metrics?.sessionsWithFirstMessageSent ?? 0}
            icon={<Send className="h-4 w-4" />}
            color="orange"

          />
        </div>
      </div>

      {/* Conversion Rates */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          Tasas de Conversión
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Tasa de Apertura"
            tooltip="Porcentaje de usuarios que abren el chat después de que se les muestra"
            value={metrics?.chatOpeningRate ?? 0}
            format="percentage"
            icon={<TrendingUp className="h-4 w-4" />}
            color="blue"

          />
          <MetricCard
            title="Tasa de Conversión a Mensaje"
            tooltip="Porcentaje de usuarios que envían mensaje después de abrir el chat"
            value={metrics?.messageConversionRate ?? 0}
            format="percentage"
            icon={<Send className="h-4 w-4" />}
            color="green"

          />
          <MetricCard
            title="Uso de Preprompts"
            tooltip="Porcentaje de conversaciones iniciadas usando preprompts"
            value={metrics?.prepromptUsageRate ?? 0}
            format="percentage"
            icon={<MessageCircle className="h-4 w-4" />}
            color="purple"

          />
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          <h2 className="text-xl font-semibold text-foreground">
            Embudo de Conversión
          </h2>
          <Tooltip
            content="Visualiza el flujo de usuarios desde la visualización del chat hasta el envío del primer mensaje"
            placement="top"
          >
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
          </Tooltip>
        </div>

        <Card className="w-full">
          <CardBody className="p-6">
            {metrics ? (
              <ConversionFunnel
                data={{
                  totalSessions: metrics.totalSessions,
                  sessionsWithChatDisplayed: metrics.sessionsWithChatDisplayed,
                  sessionsWithChatOpened: metrics.sessionsWithChatOpened,
                  sessionsWithFirstMessageSent: metrics.sessionsWithFirstMessageSent,
                }}
                loading={false}
              />
            ) : (
              <div className="text-center text-foreground-600 py-8">
                No hay datos del embudo de conversión disponibles
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Time Metrics */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          Métricas de Tiempo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Tiempo hasta Abrir Chat"
            tooltip="Tiempo promedio desde que se muestra el chat hasta que se abre"
            value={metrics?.timeToOpenChat.average ?? 0}
            format="time"
            icon={<Clock className="h-4 w-4" />}
            color="blue"

          />
          <MetricCard
            title="Tiempo hasta Primer Mensaje"
            tooltip="Tiempo promedio desde que se abre el chat hasta el primer mensaje"
            value={metrics?.timeToFirstMessage.average ?? 0}
            format="time"
            icon={<Clock className="h-4 w-4" />}
            color="green"

          />
          <MetricCard
            title="Tiempo Total hasta Mensaje"
            tooltip="Tiempo promedio completo desde mostrar chat hasta enviar mensaje"
            value={metrics?.timeFromDisplayToMessage.average ?? 0}
            format="time"
            icon={<Clock className="h-4 w-4" />}
            color="purple"

          />
        </div>
      </div>

      {/* Bubble Analytics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-green-500 rounded-full"></div>
          <h2 className="text-xl font-semibold text-foreground">
            Interacciones de Usuario
          </h2>
          <Tooltip
            content="Análisis detallado de las interacciones del usuario con los elementos de la interfaz del chat"
            placement="top"
          >
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
          </Tooltip>
        </div>

        <Card className="w-full">
          <CardBody className="p-6">
            {metrics?.bubbleImpactInsights ? (
              <BubbleAnalytics
                data={metrics.bubbleImpactInsights}
                loading={false}
              />
            ) : (
              <div className="text-center text-foreground-600 py-8">
                No hay datos de análisis de burbujas disponibles
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
