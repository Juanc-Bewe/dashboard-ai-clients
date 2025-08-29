import React from "react";
import { Card, CardBody, Skeleton, Tooltip } from "@heroui/react";
import { Info, MessageCircle, Phone } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useConversationDataStore } from "../contexts/ConversationDataContext";
import type { AccountWithUsefulConversations, ChannelDistribution } from "../types/conversation-analytics";

interface UsefulConversationsChartProps {
  accounts: AccountWithUsefulConversations[];
}

const UsefulConversationsChart: React.FC<UsefulConversationsChartProps> = ({
  accounts,
}) => {
  // Find the maximum number of conversations to determine ranges dynamically
  const maxConversations = Math.max(
    ...accounts.map((acc) => acc.usefulConversationCount),
    0
  );

  // Generate dynamic ranges based on the data
  const generateRanges = (maxValue: number) => {
    const ranges = [
      { label: "1", min: 1, max: 1 },
      { label: "2", min: 2, max: 2 },
      { label: "3", min: 3, max: 3 },
      { label: "4", min: 4, max: 4 },
      { label: "5", min: 5, max: 5 },
      { label: "6-10", min: 6, max: 10 },
      { label: "11-15", min: 11, max: 15 },
      { label: "16-20", min: 16, max: 20 },
    ];

    // Add additional ranges if we have data beyond 20
    if (maxValue > 20) {
      let currentMin = 21;

      // Add ranges in increments based on the max value
      while (currentMin <= maxValue) {
        let rangeSize;
        if (currentMin <= 50) {
          rangeSize = 10; // 21-30, 31-40, 41-50
        } else if (currentMin <= 100) {
          rangeSize = 25; // 51-75, 76-100
        } else {
          rangeSize = 50; // 101-150, 151-200, etc.
        }

        const currentMax = Math.min(
          currentMin + rangeSize - 1,
          Math.ceil(maxValue / rangeSize) * rangeSize
        );
        ranges.push({
          label: `${currentMin}-${currentMax}`,
          min: currentMin,
          max: currentMax,
        });

        currentMin = currentMax + 1;
      }
    }

    return ranges;
  };

  const ranges = generateRanges(maxConversations);

  // Group accounts by ranges
  const chartData = ranges.map((range) => {
    const accountsInRange = accounts.filter(
      (account) =>
        account.usefulConversationCount >= range.min &&
        account.usefulConversationCount <= range.max
    );
    return {
      name: range.label,
      count: accountsInRange.length,
      range: `${range.min}${
        range.max !== range.min ? `-${range.max}` : ""
      } conversaciones útiles`,
    };
  });

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = totalAccounts > 0 ? Math.round((data.count / totalAccounts) * 100) : 0;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">
            {data.range}
          </p>
          <p style={{ color: payload[0].color }} className="text-sm">
            {`${data.count} cuentas`}
          </p>
          <p className="text-sm font-bold">
            {`${percentage}% del total`}
          </p>
        </div>
      );
    }
    return null;
  };

  const totalAccounts = accounts.length;

  return (
    <div className="space-y-4">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient
                id="usefulConversationsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              opacity={0.7}
            />
            <XAxis
              dataKey="name"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toString()}
              label={{ value: "Cuentas", angle: -90, position: "insideLeft" }}
            />
            <RechartsTooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              fill="url(#usefulConversationsGradient)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>


    </div>
  );
};

interface DailyConversationTimelineProps {
  dailyMetrics: any[];
}

const DailyConversationTimeline: React.FC<DailyConversationTimelineProps> = ({
  dailyMetrics,
}) => {
  // Prepare data for the timeline chart
  const timelineData = dailyMetrics.map((metric) => {
    const totalConversations = metric.volumeMetrics?.totalConversations || 0;
    const conversationsWithIdentification =
      metric.volumeMetrics?.totalConversationsWithIdentification || 0;
    const usefulConversations =
      metric.volumeMetrics?.totalUsefulConversations || 0;
    const identificationRate =
      totalConversations > 0
        ? (conversationsWithIdentification / totalConversations) * 100
        : 0;

    return {
      date: new Date(metric.day).toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
      }),
      fullDate: metric.day,
      totalConversations,
      conversationsWithIdentification,
      usefulConversations,
      conversationsWithoutIdentification:
        totalConversations - conversationsWithIdentification,
      identificationRate: Math.round(identificationRate * 10) / 10,
    };
  });

  // Custom tooltip for timeline
  const TimelineTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">
            {new Date(data.fullDate).toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="overflow-hidden"
        >
          <AreaChart
            data={timelineData}
            margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient
                id="totalConversationsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient
                id="identifiedConversationsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient
                id="usefulConversationsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              opacity={0.7}
            />
            <XAxis
              dataKey="date"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <RechartsTooltip content={<TimelineTooltip />} />

            {/* Total conversations area (background) */}
            <Area
              type="monotone"
              dataKey="totalConversations"
              stackId="1"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#totalConversationsGradient)"
              name="Total Conversaciones"
            />

            {/* Identified conversations area (stacked on top) */}
            <Area
              type="monotone"
              dataKey="conversationsWithIdentification"
              stackId="2"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#identifiedConversationsGradient)"
              name="Con Identificación"
            />

            {/* Useful conversations line (separate, not stacked) */}
            <Area
              type="monotone"
              dataKey="usefulConversations"
              stroke="#a855f7"
              strokeWidth={3}
              fill="url(#usefulConversationsGradient)"
              name="Conversaciones Útiles"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline insights - similar to DailyConversationAnalytics */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Período
            </p>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {timelineData
                .reduce((sum, day) => sum + day.totalConversations, 0)
                .toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mejor Día
            </p>
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              {timelineData.length > 0
                ? timelineData.reduce((max, current) =>
                    current.totalConversations > max.totalConversations
                      ? current
                      : max
                  ).date
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Prom. Identificación
            </p>
            <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
              {timelineData.length > 0
                ? Math.round(
                    timelineData.reduce(
                      (sum, day) => sum + day.identificationRate,
                      0
                    ) / timelineData.length
                  )
                : 0}
              %
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Promedio Diario
            </p>
            <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              {timelineData.length > 0
                ? Math.round(
                    timelineData.reduce(
                      (sum, day) => sum + day.totalConversations,
                      0
                    ) / timelineData.length
                  )
                : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ConversationsPerChannelChartProps {
  data: ChannelDistribution;
  loading: boolean;
}

const ConversationsPerChannelChart: React.FC<ConversationsPerChannelChartProps> = ({
  data,
  loading,
}) => {
  const chartData = [
    {
      name: "Web",
      value: data.web?.count || 0,
      percentage: data.web?.percentage || 0,
      color: "#3B82F6",
      icon: MessageCircle,
    },
    {
      name: "WhatsApp",
      value: data["twilio-whatsapp"]?.count || 0,
      percentage: data["twilio-whatsapp"]?.percentage || 0,
      color: "#10B981",
      icon: Phone,
    },
  ].filter((item) => item.value > 0);

  const totalConversations = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">
            {data.name}
          </p>
          <p style={{ color: data.color }} className="text-sm">
            {`${data.value} conversaciones`}
          </p>
          <p className="text-sm font-medium text-blue-600">
            {`${data.percentage}% del total`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Skeleton className="w-48 h-48 rounded-full" />
      </div>
    );
  }

  if (totalConversations === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            No hay conversaciones disponibles
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {/* Web Gradient - Blue */}
              <linearGradient id="gradientWeb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.3} />
              </linearGradient>

              {/* WhatsApp Gradient - Green */}
              <linearGradient id="gradientWhatsApp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => {
                const gradientId = entry.name === "Web" ? "gradientWeb" : "gradientWhatsApp";
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
              {totalConversations}
            </text>
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current text-sm text-foreground-600"
            >
              conversaciones
            </text>

            <RechartsTooltip
              content={<CustomTooltip />}
              animationDuration={0}
              isAnimationActive={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Channel Legend - Matching the automode distribution style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {chartData.map((channel, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full shadow-sm flex-shrink-0"
                style={{ backgroundColor: channel.color }}
              ></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                {channel.name}
              </span>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                {channel.value}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                ({channel.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const QualityMetricsCard: React.FC = () => {
  const data = useConversationDataStore((state) => state.data);
  const loading = useConversationDataStore((state) => state.loading);

  if (!data?.currentPeriod?.metrics && !loading) {
    return (
      <Card className="w-full">
        <CardBody className="p-6">
          <p className="text-foreground-600 text-center">
            No hay datos de métricas disponibles
          </p>
        </CardBody>
      </Card>
    );
  }

  const currentMetrics = data?.currentPeriod?.metrics;

  const accountsData =
    currentMetrics?.accountAnalytics?.accountsWithUsefulConversations || [];

  const channelDistributionData = currentMetrics?.channelAndTiming?.channelDistribution || {web: {count: 0, percentage: 0}, "twilio-whatsapp": {count: 0, percentage: 0}};

  return (
    <div className="space-y-6">
      {/* Accounts with Useful Conversations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          <h2 className="text-xl font-semibold text-foreground">
            Distribución de Cuentas
          </h2>
          <Tooltip
            content="Muestra cómo se distribuyen las cuentas según el número de conversaciones útiles que han tenido"
            placement="top"
          >
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
          </Tooltip>
        </div>

        <Card className="w-full">
          <CardBody className="p-6">
            {loading ? (
              <div className="space-y-4">
                <div className="flex items-end justify-between h-40">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 flex-1"
                    >
                      <Skeleton
                        className="w-8 rounded"
                        style={{ height: `${Math.random() * 120 + 20}px` }}
                      />
                      <Skeleton className="w-8 h-4" />
                    </div>
                  ))}
                </div>
              </div>
            ) : accountsData.length > 0 ? (
              <UsefulConversationsChart accounts={accountsData} />
            ) : (
              <div className="text-center text-foreground-600 py-8">
                No hay datos de cuentas con conversaciones útiles disponibles
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Daily Conversation Timeline */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          <h2 className="text-xl font-semibold text-foreground">
            Analítica Diaria de Conversaciones
          </h2>
          <Tooltip
            content="Visualiza la evolución diaria de conversaciones totales, con identificación y útiles durante el período seleccionado"
            placement="top"
          >
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
          </Tooltip>
        </div>

        <Card className="w-full">
          <CardBody className="p-6">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-80 w-full" />
                <div className="grid grid-cols-4 gap-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            ) : data?.currentPeriod?.dailyMetrics &&
              data.currentPeriod.dailyMetrics.length > 0 ? (
              <DailyConversationTimeline
                dailyMetrics={data.currentPeriod.dailyMetrics}
              />
            ) : (
              <div className="text-center text-foreground-600 py-8">
                No hay datos diarios de conversaciones disponibles
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Conversations Per Channel */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          <h2 className="text-xl font-semibold text-foreground">
            Conversaciones por Canal
          </h2>
          <Tooltip
            content="Distribución de conversaciones según el canal utilizado (Web, WhatsApp, etc.)"
            placement="top"
          >
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
          </Tooltip>
        </div>

        <Card className="w-full">
          <CardBody className="p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Skeleton className="w-48 h-48 rounded-full" />
              </div>
            ) : (
              <ConversationsPerChannelChart
                data={channelDistributionData}
                loading={loading}
              />
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
