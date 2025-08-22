import React from "react";
import { Card, CardBody, Skeleton, Tooltip } from "@heroui/react";
import {
  Info,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Minus,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  useAccountsDataStore,
  useAccountsAutoSync,
} from "../contexts/AccountsDataContext";
import type { AccountsMetrics } from "../services/accountsService";

interface MetricCardProps {
  title: string;
  tooltip: string;
  value: number | string;
  format?: "number" | "percentage";
  loading?: boolean;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  tooltip,
  value,
  format = "number",
  loading = false,
}) => {
  const formatValue = (val: number | string, type: string) => {
    if (typeof val === "string") return val;

    switch (type) {
      case "percentage":
        return `${val.toFixed(1)}%`;
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
          </div>
          <div className="mb-2 md:mb-0">
            <p className="text-xl font-bold">{formatValue(value, format)}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

interface ConfigurationStatusChartProps {
  data: AccountsMetrics["configurationStatus"];
  loading: boolean;
}

const ConfigurationStatusChart: React.FC<ConfigurationStatusChartProps> = ({
  data,
  loading,
}) => {
  const chartData = [
    {
      name: "Completado",
      value: data.completed,
      color: "#10b981",
      icon: CheckCircle,
    },
    { name: "Fallido", value: data.failed, color: "#ef4444", icon: XCircle },
    { name: "Pendiente", value: data.pending, color: "#f59e0b", icon: Clock },
    {
      name: "En Progreso",
      value: data.inProgress,
      color: "#3b82f6",
      icon: AlertCircle,
    },
    {
      name: "No Iniciado",
      value: data.notStarted,
      color: "#8B5CF6",
      icon: Minus,
    },
  ].filter((item) => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">
            {payload[0].payload.name}
          </p>
          <p style={{ color: payload[0].payload.color }} className="text-sm">
            {`${payload[0].value} cuentas`}
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

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {/* Completado Gradient - Green */}
              <linearGradient
                id="gradientCompleted"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.3} />
              </linearGradient>

              {/* Fallido Gradient - Red */}
              <linearGradient id="gradientFailed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.3} />
              </linearGradient>

              {/* Pendiente Gradient - Amber */}
              <linearGradient id="gradientPending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.3} />
              </linearGradient>

              {/* En Progreso Gradient - Blue */}
              <linearGradient
                id="gradientInProgress"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.3} />
              </linearGradient>

              {/* No Iniciado Gradient - Purple */}
              <linearGradient
                id="gradientNotStarted"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.3} />
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
                let gradientId = "gradientCompleted"; // default

                switch (entry.name) {
                  case "Completado":
                    gradientId = "gradientCompleted";
                    break;
                  case "Fallido":
                    gradientId = "gradientFailed";
                    break;
                  case "Pendiente":
                    gradientId = "gradientPending";
                    break;
                  case "En Progreso":
                    gradientId = "gradientInProgress";
                    break;
                  case "No Iniciado":
                    gradientId = "gradientNotStarted";
                    break;
                }

                return (
                  <Cell key={`cell-${index}`} fill={`url(#${gradientId})`} />
                );
              })}
            </Pie>
            <RechartsTooltip
              content={<CustomTooltip />}
              animationDuration={0}
              isAnimationActive={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Configuration Status Summary - Compact Grouped Card */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-5 gap-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Completado
              </span>
              <Tooltip
                content="Cuentas que completaron exitosamente el proceso de onboarding"
                placement="top"
              >
                <Info className="h-2 w-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
              </Tooltip>
            </div>
            <div className="font-bold">
              <span className="text-base text-green-600">{data.completed}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {" "}
                (
                {data.completed +
                  data.failed +
                  data.pending +
                  data.inProgress +
                  data.notStarted >
                0
                  ? Math.round(
                      (data.completed /
                        (data.completed +
                          data.failed +
                          data.pending +
                          data.inProgress +
                          data.notStarted)) *
                        100
                    )
                  : 0}
                %)
              </span>
            </div>
          </div>

          <div className="text-center border-l border-gray-300 dark:border-gray-600">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Fallido
              </span>
              <Tooltip
                content="Cuentas que fallaron durante el proceso de onboarding"
                placement="top"
              >
                <Info className="h-2 w-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
              </Tooltip>
            </div>
            <div className="font-bold">
              <span className="text-base text-red-600">{data.failed}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {" "}
                (
                {data.completed +
                  data.failed +
                  data.pending +
                  data.inProgress +
                  data.notStarted >
                0
                  ? Math.round(
                      (data.failed /
                        (data.completed +
                          data.failed +
                          data.pending +
                          data.inProgress +
                          data.notStarted)) *
                        100
                    )
                  : 0}
                %)
              </span>
            </div>
          </div>

          <div className="text-center border-l border-gray-300 dark:border-gray-600">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Pendiente
              </span>
              <Tooltip
                content="Cuentas con onboarding pendiente de procesar"
                placement="top"
              >
                <Info className="h-2 w-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
              </Tooltip>
            </div>
            <div className="font-bold">
              <span className="text-base text-yellow-600">{data.pending}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {" "}
                (
                {data.completed +
                  data.failed +
                  data.pending +
                  data.inProgress +
                  data.notStarted >
                0
                  ? Math.round(
                      (data.pending /
                        (data.completed +
                          data.failed +
                          data.pending +
                          data.inProgress +
                          data.notStarted)) *
                        100
                    )
                  : 0}
                %)
              </span>
            </div>
          </div>

          <div className="text-center border-l border-gray-300 dark:border-gray-600">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                En Progreso
              </span>
              <Tooltip
                content="Cuentas con onboarding actualmente en proceso"
                placement="top"
              >
                <Info className="h-2 w-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
              </Tooltip>
            </div>
            <div className="font-bold">
              <span className="text-base text-blue-600">{data.inProgress}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {" "}
                (
                {data.completed +
                  data.failed +
                  data.pending +
                  data.inProgress +
                  data.notStarted >
                0
                  ? Math.round(
                      (data.inProgress /
                        (data.completed +
                          data.failed +
                          data.pending +
                          data.inProgress +
                          data.notStarted)) *
                        100
                    )
                  : 0}
                %)
              </span>
            </div>
          </div>

          <div className="text-center border-l border-gray-300 dark:border-gray-600">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                No Iniciado
              </span>
              <Tooltip
                content="Cuentas que no han iniciado el proceso de onboarding"
                placement="top"
              >
                <Info className="h-2 w-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
              </Tooltip>
            </div>
            <div className="font-bold">
              <span className="text-base text-purple-600">
                {data.notStarted}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {" "}
                (
                {data.completed +
                  data.failed +
                  data.pending +
                  data.inProgress +
                  data.notStarted >
                0
                  ? Math.round(
                      (data.notStarted /
                        (data.completed +
                          data.failed +
                          data.pending +
                          data.inProgress +
                          data.notStarted)) *
                        100
                    )
                  : 0}
                %)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AccountsTab: React.FC = () => {
  // Get data from accounts store
  const { metrics, loading, error } = useAccountsDataStore();

  // Auto-sync with filter changes (this handles both initial fetch and filter changes)
  useAccountsAutoSync();

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Metrics - Grouped by Category */}
      <div className="space-y-6">
        {/* Accounts Overview */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            Resumen de Cuentas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <MetricCard
              title="Total de Cuentas"
              tooltip="Número total de cuentas en el sistema"
              value={metrics?.totalAccounts ?? 0}
              loading={loading}
            />

            <MetricCard
              title="Cuentas Activas"
              tooltip="Cuentas que están actualmente activas en el sistema"
              value={metrics?.activeStatus.active ?? 0}
              loading={loading}
            />

            <MetricCard
              title="Cuentas Inactivas"
              tooltip="Cuentas que están actualmente inactivas en el sistema"
              value={metrics?.activeStatus.inactive ?? 0}
              loading={loading}
            />
          </div>
        </div>

        {/* Distribución Detallada - Charts */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            Distribución Detallada
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Automode Distribution - Donut Chart */}
            <Card className="rounded-2xl border-0 bg-gradient-to-b">
              <CardBody className="p-6">
                <div className="pt-4">
                  <div className="text-center">
                    <div className="text-s mb-2 flex items-center justify-center gap-1">
                      Configuración por Tipo
                      <Tooltip
                        content="Distribución de cuentas según el tipo de configuración durante el onboarding"
                        placement="top"
                      >
                        <Info className="h-3 w-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center h-80">
                    <Skeleton className="w-48 h-48 rounded-full" />
                  </div>
                ) : (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          <linearGradient
                            id="gradientAutomode"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#3B82F6"
                              stopOpacity={0.9}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3B82F6"
                              stopOpacity={0.3}
                            />
                          </linearGradient>
                          <linearGradient
                            id="gradientManual"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#F59E0B"
                              stopOpacity={0.9}
                            />
                            <stop
                              offset="95%"
                              stopColor="#F59E0B"
                              stopOpacity={0.3}
                            />
                          </linearGradient>
                        </defs>
                        <Pie
                          data={[
                            {
                              name: "Con Automode",
                              value:
                                metrics?.automodeDistribution.withAutomode ?? 0,
                              color: "#3B82F6",
                            },
                            {
                              name: "Sin Automode",
                              value:
                                metrics?.automodeDistribution.withoutAutomode ??
                                0,
                              color: "#F59E0B",
                            },
                          ].filter((item) => item.value > 0)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          innerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                          stroke="none"
                        >
                          {[
                            { fill: "url(#gradientAutomode)" },
                            { fill: "url(#gradientManual)" },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>

                        {/* Center text showing total */}
                        <text
                          x="50%"
                          y="45%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-current text-xl font-bold text-foreground"
                        >
                          {metrics?.totalAccounts ?? 0}
                        </text>
                        <text
                          x="50%"
                          y="55%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-current text-sm text-foreground-600"
                        >
                          cuentas
                        </text>
                        <RechartsTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const total =
                                (metrics?.automodeDistribution.withAutomode ??
                                  0) +
                                (metrics?.automodeDistribution
                                  .withoutAutomode ?? 0);
                              const percentage =
                                total > 0
                                  ? (
                                      ((payload[0].value as number) / total) *
                                      100
                                    ).toFixed(1)
                                  : "0";
                              return (
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                                  <p className="font-semibold text-gray-900 dark:text-white">
                                    {payload[0].payload.name}
                                  </p>
                                  <p
                                    style={{ color: payload[0].payload.color }}
                                    className="text-sm"
                                  >
                                    {`${payload[0].value} cuentas (${percentage}%)`}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                          animationDuration={0}
                          isAnimationActive={false}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Legend */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {[
                    {
                      name: "Con Automode",
                      value: metrics?.automodeDistribution.withAutomode ?? 0,
                      color: "#3B82F6",
                    },
                    {
                      name: "Sin Automode",
                      value: metrics?.automodeDistribution.withoutAutomode ?? 0,
                      color: "#F59E0B",
                    },
                  ].map((entry, index) => {
                    const total =
                      (metrics?.automodeDistribution.withAutomode ?? 0) +
                      (metrics?.automodeDistribution.withoutAutomode ?? 0);
                    const percentage =
                      total > 0
                        ? ((entry.value / total) * 100).toFixed(1)
                        : "0";

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
              </CardBody>
            </Card>

            {/* Channel Distribution - Stacked Bar Chart */}
            <Card className="rounded-2xl border-0 bg-gradient-to-b">
              <CardBody className="p-6">
                <div className="pt-4">
                  <div className="text-center">
                    <div className="text-s mb-2 flex items-center justify-center gap-1">
                      Distribución por Canal
                      <Tooltip
                        content="Cuentas activas por tipo de canal de comunicación disponible"
                        placement="top"
                      >
                        <Info className="h-3 w-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-64 w-full" />
                  </div>
                ) : (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          {
                            name: "WhatsApp",
                            value:
                              metrics?.channelDistribution.whatsapp.active ?? 0,
                            percentage:
                              metrics && metrics.totalAccounts > 0
                                ? Math.round(
                                    ((metrics.channelDistribution.whatsapp
                                      .active ?? 0) /
                                      metrics.totalAccounts) *
                                      100
                                  )
                                : 0,
                            color: "#10B981",
                          },
                          {
                            name: "Web",
                            value: metrics?.channelDistribution.web.active ?? 0,
                            percentage:
                              metrics && metrics.totalAccounts > 0
                                ? Math.round(
                                    ((metrics.channelDistribution.web.active ??
                                      0) /
                                      metrics.totalAccounts) *
                                      100
                                  )
                                : 0,
                            color: "#3B82F6",
                          },
                          {
                            name: "Ambos",
                            value:
                              metrics?.channelDistribution.multiChannel ?? 0,
                            percentage:
                              metrics && metrics.totalAccounts > 0
                                ? Math.round(
                                    ((metrics.channelDistribution
                                      .multiChannel ?? 0) /
                                      metrics.totalAccounts) *
                                      100
                                  )
                                : 0,
                            color: "#8B5CF6",
                          },
                          {
                            name: "Sin Canal",
                            value: metrics
                              ? metrics.totalAccounts -
                                (metrics.channelDistribution.whatsapp.active +
                                  metrics.channelDistribution.web.active +
                                  metrics.channelDistribution.multiChannel)
                              : 0,
                            percentage:
                              metrics && metrics.totalAccounts > 0
                                ? Math.round(
                                    ((metrics.totalAccounts -
                                      (metrics.channelDistribution.whatsapp
                                        .active +
                                        metrics.channelDistribution.web.active +
                                        metrics.channelDistribution
                                          .multiChannel)) /
                                      metrics.totalAccounts) *
                                      100
                                  )
                                : 0,
                            color: "#F97316",
                          },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <defs>
                          {/* WhatsApp Gradient - Green */}
                          <linearGradient
                            id="gradientWhatsApp"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#10B981"
                              stopOpacity={0.9}
                            />
                            <stop
                              offset="95%"
                              stopColor="#10B981"
                              stopOpacity={0.3}
                            />
                          </linearGradient>

                          {/* Web Gradient - Blue */}
                          <linearGradient
                            id="gradientWeb"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#3B82F6"
                              stopOpacity={0.9}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3B82F6"
                              stopOpacity={0.3}
                            />
                          </linearGradient>

                          {/* Both Channels Gradient - Purple */}
                          <linearGradient
                            id="gradientBoth"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8B5CF6"
                              stopOpacity={0.9}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8B5CF6"
                              stopOpacity={0.3}
                            />
                          </linearGradient>

                          {/* No Channel Gradient - Orange */}
                          <linearGradient
                            id="gradientNoChannel"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#F97316"
                              stopOpacity={0.9}
                            />
                            <stop
                              offset="95%"
                              stopColor="#F97316"
                              stopOpacity={0.3}
                            />
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
                        />
                        <RechartsTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              const value = data.value || 0;
                              const percentage = data.percentage || 0;

                              return (
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                                  <p className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {label}
                                  </p>
                                  <div className="space-y-1">
                                    <p
                                      className="text-sm"
                                      style={{ color: data.color }}
                                    >
                                      Cuentas activas: {value}
                                    </p>
                                    <p className="text-sm font-medium text-blue-600">
                                      Porcentaje del total: {percentage}%
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                          animationDuration={0}
                          isAnimationActive={false}
                        />
                        <Bar
                          dataKey="value"
                          name="Cuentas Activas"
                          radius={[4, 4, 0, 0]}
                        >
                          <Cell fill="url(#gradientWhatsApp)" />
                          <Cell fill="url(#gradientWeb)" />
                          <Cell fill="url(#gradientBoth)" />
                          <Cell fill="url(#gradientNoChannel)" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Channel Values Summary - Compact Grouped Card */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          WhatsApp
                        </span>
                        <Tooltip
                          content="Cuentas que tienen únicamente el canal de WhatsApp activo"
                          placement="top"
                        >
                          <Info className="h-2 w-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
                        </Tooltip>
                      </div>
                      <div className="font-bold">
                        <span className="text-base text-green-600">
                          {metrics?.channelDistribution.whatsapp.active ?? 0}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {" "}
                          (
                          {metrics && metrics.totalAccounts > 0
                            ? Math.round(
                                ((metrics.channelDistribution.whatsapp.active ??
                                  0) /
                                  metrics.totalAccounts) *
                                  100
                              )
                            : 0}
                          %)
                        </span>
                      </div>
                    </div>

                    <div className="text-center border-l border-gray-300 dark:border-gray-600">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          Web
                        </span>
                        <Tooltip
                          content="Cuentas que tienen únicamente el canal Web activo"
                          placement="top"
                        >
                          <Info className="h-2 w-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
                        </Tooltip>
                      </div>
                      <div className="font-bold">
                        <span className="text-base text-blue-600">
                          {metrics?.channelDistribution.web.active ?? 0}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {" "}
                          (
                          {metrics && metrics.totalAccounts > 0
                            ? Math.round(
                                ((metrics.channelDistribution.web.active ?? 0) /
                                  metrics.totalAccounts) *
                                  100
                              )
                            : 0}
                          %)
                        </span>
                      </div>
                    </div>

                    <div className="text-center border-l border-gray-300 dark:border-gray-600">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          Ambos
                        </span>
                        <Tooltip
                          content="Cuentas que tienen tanto WhatsApp como Web activos simultáneamente"
                          placement="top"
                        >
                          <Info className="h-2 w-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
                        </Tooltip>
                      </div>
                      <div className="font-bold">
                        <span className="text-base text-purple-600">
                          {metrics?.channelDistribution.multiChannel ?? 0}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {" "}
                          (
                          {metrics && metrics.totalAccounts > 0
                            ? Math.round(
                                ((metrics.channelDistribution.multiChannel ??
                                  0) /
                                  metrics.totalAccounts) *
                                  100
                              )
                            : 0}
                          %)
                        </span>
                      </div>
                    </div>

                    <div className="text-center border-l border-gray-300 dark:border-gray-600">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          Sin Canal
                        </span>
                        <Tooltip
                          content="Cuentas que no tienen ningún canal activo"
                          placement="top"
                        >
                          <Info className="h-2 w-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
                        </Tooltip>
                      </div>
                      <div className="font-bold">
                        <span className="text-base text-orange-600">
                          {metrics
                            ? metrics.totalAccounts -
                              (metrics.channelDistribution.whatsapp.active +
                                metrics.channelDistribution.web.active +
                                metrics.channelDistribution.multiChannel)
                            : 0}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {" "}
                          (
                          {metrics && metrics.totalAccounts > 0
                            ? Math.round(
                                ((metrics.totalAccounts -
                                  (metrics.channelDistribution.whatsapp.active +
                                    metrics.channelDistribution.web.active +
                                    metrics.channelDistribution.multiChannel)) /
                                  metrics.totalAccounts) *
                                  100
                              )
                            : 0}
                          %)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Configuration Status */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          <h2 className="text-xl font-semibold text-foreground">
            Estado de Configuración
          </h2>
          <Tooltip
            content="Estado actual del proceso de onboarding de configuración para el addon de IA"
            placement="top"
          >
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
          </Tooltip>
        </div>

        <Card className="w-full">
          <CardBody className="p-6">
            {metrics ? (
              <ConfigurationStatusChart
                data={metrics.configurationStatus}
                loading={loading}
              />
            ) : (
              <div className="text-center text-foreground-600 py-8">
                No hay datos de configuración disponibles
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
