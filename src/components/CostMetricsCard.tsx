import React from "react";
import { Card, CardBody, Skeleton } from "@heroui/react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useConversationDataStore } from "../contexts/ConversationDataContext";
import { formatCurrency } from "../utils/currencyHelpers";

// Professional color palette with better contrast
const CHART_COLORS = {
  primary: [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
  ],
  gradient: "rgba(59, 130, 246, 0.1)",
  // Model-specific colors for better distinction
  modelColors: {
    "2.5-flash": "#3B82F6", // Blue - Primary model
    "2.0-flash-lite": "#10B981", // Green - Secondary model
    "2.0-flash": "#F59E0B", // Amber - Tertiary model
    "2.0-flash-001": "#EF4444", // Red - Quaternary model
    default: "#6B7280", // Gray - Fallback
  } as Record<string, string>,
};

// Helper function to get model color safely
const getModelColor = (modelName: string): string => {
  return (
    CHART_COLORS.modelColors[modelName] || CHART_COLORS.modelColors.default
  );
};

const CostMetricsSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-7 w-80 mb-6 rounded-lg" />

        {/* Esqueleto de Tarjetas de Costos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl w-full max-w-2xl">
            <CardBody className="p-6">
              <Skeleton className="h-6 w-40 mb-4 rounded-lg" />
              <div className="text-center">
                <Skeleton className="h-12 w-32 mx-auto mb-6 rounded-lg" />
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="rounded-2xl">
            <CardBody className="p-6">
              <Skeleton className="h-6 w-40 mb-4 rounded-lg" />
              <div className="space-y-3">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Esqueleto de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardBody className="p-6">
            <Skeleton className="h-6 w-40 mb-4 rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </CardBody>
        </Card>
        <Card className="rounded-2xl">
          <CardBody className="p-6">
            <Skeleton className="h-6 w-40 mb-4 rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </CardBody>
        </Card>
      </div>

      {/* Tools Usage Analytics Skeleton */}
      <div>
        <Skeleton className="h-7 w-80 mb-6 rounded-lg" />
        <div className="grid grid-cols-1 gap-6">
          <Card className="rounded-2xl">
            <CardBody className="p-6">
              <Skeleton className="h-12 w-32 mx-auto mb-6 rounded-lg" />
              <Skeleton className="h-80 w-full rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                <Skeleton className="h-8 w-full rounded-lg" />
                <Skeleton className="h-8 w-full rounded-lg" />
                <Skeleton className="h-8 w-full rounded-lg" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.dataKey === "cost"
              ? formatCurrency(entry.value)
              : `${entry.value.toLocaleString()} tokens`}
            {entry.payload.percentage &&
              ` (${entry.payload.percentage.toFixed(1)}%)`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const CostMetricsCard: React.FC = () => {
  const data = useConversationDataStore((state) => state.data);
  const loading = useConversationDataStore((state) => state.loading);

  // Show skeleton while loading
  if (loading) {
    return <CostMetricsSkeleton />;
  }

  const costAnalytics = data?.currentPeriod?.metrics?.costAnalytics;
  const technologyUsage = data?.currentPeriod?.metrics?.technologyUsage;

  if (!costAnalytics) {
    return (
      <Card className="w-full">
        <CardBody className="p-6">
          <p className="text-foreground-600 text-center">
            No hay datos de métricas de costos disponibles
          </p>
        </CardBody>
      </Card>
    );
  }

  // Get total cost and individual costs
  const totalCost = costAnalytics.totalCost;
  const costDistribution = costAnalytics.costDistribution;

  // Get model distribution data
  const llmModelCostData = technologyUsage?.llmModelDistributionByCost;
  const llmModelTokenData = technologyUsage?.llmModelDistributionByTokens;

  // Transform data for charts with specific colors
  const costByModelData = llmModelCostData
    ? Object.entries(llmModelCostData).map(([model, data]) => {
        const shortName = model.replace("gemini-", "").replace("-001", "");
        return {
          name: shortName,
          cost: data.cost,
          percentage: data.percentage,
          fullName: model,
          color: getModelColor(shortName),
        };
      })
    : [];

  const tokensByModelData = llmModelTokenData
    ? Object.entries(llmModelTokenData).map(([model, data]) => {
        const shortName = model.replace("gemini-", "").replace("-001", "");
        return {
          name: shortName,
          tokens: data.totalTokens,
          percentage: data.percentage,
          fullName: model,
          color: getModelColor(shortName),
        };
      })
    : [];

  // Transform cost distribution data for donut chart
  const costBreakdownData = [
    {
      name: "LLM",
      cost: costDistribution?.llm?.cost || 0,
      percentage: costDistribution?.llm?.percentage || 0,
      color: "#3B82F6", // Blue
    },
    {
      name: "Tools",
      cost: costDistribution?.tools?.cost || 0,
      percentage: costDistribution?.tools?.percentage || 0,
      color: "#10B981", // Green
    },
    {
      name: "Tracing",
      cost: costDistribution?.tracing?.cost || 0,
      percentage: costDistribution?.tracing?.percentage || 0,
      color: "#F59E0B", // Amber
    },
    {
      name: "Whatsapp",
      cost: costDistribution?.whatsapp?.cost || 0,
      percentage: costDistribution?.whatsapp?.percentage || 0,
      color: "#8B5CF6", // Purple
    },
  ].filter((item) => item.cost > 0); // Only show items with cost > 0

  return (
    <div className="space-y-8">
      {/* Sección de Métricas de Negocio y Costos */}
      <div>
        <h2 className="text-xl font-semibold mb-6">
          Sección de Métricas de Negocio y Costos:
        </h2>

        {/* Resumen de Costos - Tarjetas lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl border-0 bg-gradient-to-b w-full max-w-2xl">
            <CardBody className="p-6">
              {/* Resumen de Costo Total */}
              <div className="pt-4">
                <div className="text-center">
                  <div className="text-s mb-2">Costo Total</div>
                  <div className="text-3xl font-bold">
                    {formatCurrency(totalCost)}
                  </div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <defs>
                      <linearGradient
                        id="gradientLLM"
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
                        id="gradientTools"
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
                      <linearGradient
                        id="gradientTracing"
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
                      <linearGradient
                        id="gradientWhatsapp"
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
                    </defs>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="cost"
                      stroke="none"
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#gradient${entry.name})`}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              {/* Leyenda Mejorada con Estadísticas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                {costBreakdownData.map((entry, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-3 h-3 rounded-full shadow-sm flex-shrink-0"
                          style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="text-sm font-medium">
                          {entry.name}
                        </span>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          {formatCurrency(entry.cost)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          ({entry.percentage.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* Cuentas Más Costosas */}
          <Card className="rounded-2xl border-0 bg-gradient-to-b">
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Cuentas Más Costosas
              </h3>
              <div className="space-y-3">
                {costAnalytics.topExpensiveAccounts
                  .slice(0, 5)
                  .map((account, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {account.accountName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {account.sessionCount} sesiones
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {formatCurrency(account.totalCost)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Sección de Análisis de Modelos */}
      <div>
        <h2 className="text-xl font-semibold mb-6">
          Análisis de Rendimiento de Modelos:
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Costo por Modelo - Gráfico de Dona */}
          <Card className="rounded-2xl border-0 bg-gradient-to-b">
            <CardBody className="p-6">
              {/* Resumen de Costos */}
              <div className="pt-4">
                <div className="text-center">
                  <div className="text-s mb-2">Costo Total LLM</div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(
                      costByModelData.reduce(
                        (sum, item) => sum + (item.cost || 0),
                        0
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <defs>
                      <linearGradient
                        id="gradient2.5-flash"
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
                        id="gradient2.0-flash-lite"
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
                      <linearGradient
                        id="gradient2.0-flash"
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
                      <linearGradient
                        id="gradient2.0-flash-001"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#EF4444"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="95%"
                          stopColor="#EF4444"
                          stopOpacity={0.3}
                        />
                      </linearGradient>
                      <linearGradient
                        id="gradientDefault"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6B7280"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6B7280"
                          stopOpacity={0.3}
                        />
                      </linearGradient>
                    </defs>
                    <Pie
                      data={costByModelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="cost"
                      stroke="none"
                    >
                      {costByModelData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#gradient${entry.name})`}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              {/* Leyenda Mejorada con Estadísticas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 mb-4">
                {costByModelData.map((entry, index) => {
                  const total = costByModelData.reduce(
                    (sum, item) => sum + (item.cost || 0),
                    0
                  );
                  const percentage =
                    total > 0
                      ? Math.round(((entry.cost || 0) / total) * 100 * 10) / 10
                      : 0;

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
                          {formatCurrency(entry.cost || 0)}
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

          {/* Uso por Modelo (Tokens) - Gráfico de Barras */}
          <Card className="rounded-2xl border-0 bg-gradient-to-b">
            <CardBody className="p-6">
              {/* Resumen de Tokens */}
              <div className="pt-4">
                <div className="text-center">
                  <div className="text-s mb-2">Total de Tokens Utilizados</div>
                  <div className="text-2xl font-bold">
                    {tokensByModelData
                      .reduce((sum, item) => sum + (item.tokens || 0), 0)
                      .toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={tokensByModelData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="barGradient2.5-flash"
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
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                      <linearGradient
                        id="barGradient2.0-flash-lite"
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
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                      <linearGradient
                        id="barGradient2.0-flash"
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
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                      <linearGradient
                        id="barGradient2.0-flash-001"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#EF4444"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="95%"
                          stopColor="#EF4444"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                      <linearGradient
                        id="barGradientDefault"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6B7280"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6B7280"
                          stopOpacity={0.2}
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
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="tokens" radius={[4, 4, 0, 0]}>
                      {tokensByModelData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#barGradient${entry.name})`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Leyenda Mejorada con Estadísticas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 mb-4">
                {tokensByModelData.map((entry, index) => {
                  const total = tokensByModelData.reduce(
                    (sum, item) => sum + (item.tokens || 0),
                    0
                  );
                  const percentage =
                    total > 0
                      ? Math.round(((entry.tokens || 0) / total) * 100 * 10) /
                        10
                      : 0;

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
                          {(entry.tokens || 0).toLocaleString()}
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
        </div>
      </div>

      {/* Tools Usage Analytics Section */}
      <div>
        <h2 className="text-xl font-semibold mb-6">
          Análisis de Uso de Herramientas:
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Tools Distribution by Amount - Bar Chart */}
          <Card className="rounded-2xl border-0 bg-gradient-to-b">
            <CardBody className="p-6">
              {/* Tools Usage Summary */}
              <div className="pt-4">
                <div className="text-center">
                  <div className="text-s mb-2">
                    Total de Uso de Herramientas
                  </div>
                  <div className="text-2xl font-bold">
                    {technologyUsage?.toolsDistributionByAmount
                      ? Object.values(technologyUsage.toolsDistributionByAmount)
                          .reduce((sum, item) => sum + (item.amount || 0), 0)
                          .toLocaleString()
                      : "0"}
                  </div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={
                      technologyUsage?.toolsDistributionByAmount
                        ? Object.entries(
                            technologyUsage.toolsDistributionByAmount
                          ).map(([toolName, data], index) => ({
                            name: toolName
                              .replace(/_/g, " ")
                              .replace(/([A-Z])/g, " $1")
                              .trim()
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() +
                                  word.slice(1).toLowerCase()
                              )
                              .join(" "),
                            amount: data.amount || 0,
                            percentage: data.percentage,
                            fullName: toolName,
                            color:
                              CHART_COLORS.primary[
                                index % CHART_COLORS.primary.length
                              ],
                          }))
                        : []
                    }
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <defs>
                      {CHART_COLORS.primary.map((color, index) => (
                        <linearGradient
                          key={`toolsGradient${index}`}
                          id={`toolsUsageGradient${index}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={color}
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="95%"
                            stopColor={color}
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      opacity={0.7}
                    />
                    <XAxis dataKey="name" hide={true} />
                    <YAxis fontSize={12} axisLine={false} tickLine={false} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {label}
                              </p>
                              <p
                                style={{ color: payload[0].color }}
                                className="text-sm"
                              >
                                {`${payload[0].value?.toLocaleString()} usos`}
                                {payload[0].payload.percentage &&
                                  ` (${payload[0].payload.percentage.toFixed(
                                    1
                                  )}%)`}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      {technologyUsage?.toolsDistributionByAmount &&
                        Object.entries(
                          technologyUsage.toolsDistributionByAmount
                        ).map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`url(#toolsUsageGradient${
                              index % CHART_COLORS.primary.length
                            })`}
                          />
                        ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Leyenda Mejorada con Estadísticas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                {technologyUsage?.toolsDistributionByAmount &&
                  Object.entries(technologyUsage.toolsDistributionByAmount).map(
                    ([toolName, toolData], index) => {
                      const displayName = toolName
                        .replace(/_/g, " ")
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ");
                      const color =
                        CHART_COLORS.primary[
                          index % CHART_COLORS.primary.length
                        ];

                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full shadow-sm flex-shrink-0"
                              style={{ backgroundColor: color }}
                            ></div>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                              {displayName}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                              {(toolData.amount || 0).toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                              ({(toolData.percentage || 0).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
