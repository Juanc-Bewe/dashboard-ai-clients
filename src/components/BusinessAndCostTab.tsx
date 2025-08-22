import React from "react";
import { Card, CardBody, Skeleton } from "@heroui/react";
import {
  PieChart,
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
import { useDashboardStore } from "../contexts/DashboardContext";
import { formatCurrency } from "../utils/currencyHelpers";
import { TopExpensiveAccounts } from "./TopExpensiveAccounts";

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
    default: "#6B7280", // Gray - Fallback
  } as Record<string, string>,
};

// Helper function to get model color safely
const getModelColor = (modelName: string): string => {
  return (
    CHART_COLORS.modelColors[modelName] || CHART_COLORS.modelColors.default
  );
};

const BusinessAndCostSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-7 w-80 mb-6 rounded-lg" />

        {/* Cost Cards Skeleton */}
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
          
          <TopExpensiveAccounts accounts={[]} loading={true} />
        </div>
      </div>

      {/* Charts Skeleton */}
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

      {/* Tools & Agents Analytics Skeleton */}
      <div>
        <Skeleton className="h-7 w-80 mb-6 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardBody className="p-6">
              <Skeleton className="h-12 w-32 mx-auto mb-6 rounded-lg" />
              <Skeleton className="h-64 w-full rounded-lg" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-8 w-full rounded-lg" />
                <Skeleton className="h-8 w-full rounded-lg" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            </CardBody>
          </Card>
          <Card className="rounded-2xl">
            <CardBody className="p-6">
              <Skeleton className="h-12 w-32 mx-auto mb-6 rounded-lg" />
              <Skeleton className="h-64 w-full rounded-lg" />
              <div className="space-y-2 mt-4">
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

// Custom label renderer for pie chart
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="600"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
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

export const BusinessAndCostTab: React.FC = () => {
  const data = useDashboardStore((state) => state.data);
  const loading = useDashboardStore((state) => state.loading);

  // Show skeleton while loading
  if (loading) {
    return <BusinessAndCostSkeleton />;
  }

  // Get total cost and individual costs
  const totalCost = data?.currentPeriod?.metrics?.totalCost || 0;
  const costDistribution = data?.currentPeriod?.metrics?.costDistribution;

  // Get model distribution data
  const llmModelCostData =
    data?.currentPeriod?.metrics?.llmModelDistributionByCost;
  const llmModelTokenData =
    data?.currentPeriod?.metrics?.llmModelDistributionByTokens;

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
      {/* Business & Cost Metrics Section */}
      <div>
        <h2 className="text-xl font-semibold mb-6">
          Business & Cost Metrics Section:
        </h2>

        {/* Cost Overview - Side by side cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl border-0 bg-gradient-to-b w-full max-w-2xl">
            <CardBody className="p-6">
              {/* <h3 className="text-lg font-semibold mb-6 text-center">
                Total Cost Breakdown
              </h3> */}

              {/* Total Cost Summary */}
              <div className="pt-4">
                <div className="text-center">
                  <div className="text-s mb-2">
                    Total Cost
                  </div>
                  <div className="text-3xl font-bold">
                    {formatCurrency(totalCost)}
                  </div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
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
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Enhanced Legend with Stats */}
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

          {/* Top Expensive Accounts */}
          <TopExpensiveAccounts
            accounts={data?.currentPeriod?.metrics?.topExpensiveAccounts || []}
            loading={loading}
          />
        </div>
      </div>

      {/* Model Analytics Section */}
      <div>
        <h2 className="text-xl font-semibold mb-6">
          Model Performance Analytics:
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost by Model - Donut Chart */}
          <Card className="rounded-2xl border-0 bg-gradient-to-b">
            <CardBody className="p-6">
                              {/* Cost Summary */}
              <div className="pt-4">
                <div className="text-center">
                <div className="text-s mb-2">
                    Total LLM Cost
                  </div>
                  <div className="text-xl font-bold">
                    {formatCurrency(
                      costByModelData.reduce((sum, item) => sum + item.cost, 0)
                    )}
                  </div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
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
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Enhanced Legend with Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 mb-4">
                {costByModelData.map((entry, index) => {
                  const total = costByModelData.reduce(
                    (sum, item) => sum + item.cost,
                    0
                  );
                  const percentage =
                    total > 0
                      ? Math.round((entry.cost / total) * 100 * 10) / 10
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
                          {formatCurrency(entry.cost)}
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

          {/* Usage by Model (Tokens) - Bar Chart */}
          <Card className="rounded-2xl border-0 bg-gradient-to-b">
            <CardBody className="p-6">
              {/* Token Summary */}
              <div className="pt-4">
                <div className="text-center">
                <div className="text-s mb-2">
                    Total Tokens Used
                  </div>
                  <div className="text-xl font-bold">
                    {tokensByModelData
                      .reduce((sum, item) => sum + item.tokens, 0)
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

              {/* Enhanced Legend with Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 mb-4">
                {tokensByModelData.map((entry, index) => {
                  const total = tokensByModelData.reduce(
                    (sum, item) => sum + item.tokens,
                    0
                  );
                  const percentage =
                    total > 0
                      ? Math.round((entry.tokens / total) * 100 * 10) / 10
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
                          {entry.tokens.toLocaleString()}
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

      {/* Tools & Agents Analytics Section */}
      <div>
        <h2 className="text-xl font-semibold mb-6">
          Tools & Agents Usage Analytics:
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Agents Distribution by Amount - Donut Chart */}
          <Card className="rounded-2xl border-0 bg-gradient-to-b">
            <CardBody className="p-6">
              {/* Agents Usage Summary */}
              <div className="pt-4">
                <div className="text-center">
                  <div className="text-s mb-2">
                    Total Agents Usage
                  </div>
                  <div className="text-xl font-bold">
                    {data?.currentPeriod?.metrics?.agentsDistributionByAmount
                      ? Object.values(data.currentPeriod.metrics.agentsDistributionByAmount)
                          .reduce((sum, item) => sum + item.amount, 0)
                          .toLocaleString()
                      : '0'}
                  </div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {CHART_COLORS.primary.slice(0, 3).map((color, index) => (
                        <linearGradient
                          key={`agentsGradient${index}`}
                          id={`agentsGradient${index}`}
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
                            stopOpacity={0.3}
                          />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={data?.currentPeriod?.metrics?.agentsDistributionByAmount
                        ? Object.entries(data.currentPeriod.metrics.agentsDistributionByAmount).map(([agentName, agentData], index) => ({
                            name: agentName.replace(/_/g, ' ').replace('agent', 'Agent'),
                            amount: agentData.amount,
                            percentage: agentData.percentage,
                            fullName: agentName,
                            color: CHART_COLORS.primary[index % CHART_COLORS.primary.length],
                          }))
                        : []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="amount"
                      stroke="none"
                    >
                      {data?.currentPeriod?.metrics?.agentsDistributionByAmount &&
                        Object.entries(data.currentPeriod.metrics.agentsDistributionByAmount).map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`url(#agentsGradient${index})`}
                          />
                        ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                              <p className="font-semibold text-gray-900 dark:text-white">{payload[0].payload.name}</p>
                              <p style={{ color: payload[0].color }} className="text-sm">
                                {`${payload[0].value?.toLocaleString()} uses`}
                                {payload[0].payload.percentage &&
                                  ` (${payload[0].payload.percentage.toFixed(1)}%)`}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Enhanced Legend with Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 mb-4">
                {data?.currentPeriod?.metrics?.agentsDistributionByAmount &&
                  Object.entries(data.currentPeriod.metrics.agentsDistributionByAmount).map(([agentName, agentData], index) => {
                    const displayName = agentName.replace(/_/g, ' ').replace('agent', 'Agent');
                    const color = CHART_COLORS.primary[index % CHART_COLORS.primary.length];

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
                            {agentData.amount.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            ({agentData.percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardBody>
          </Card>

          {/* Tools Distribution by Amount - Bar Chart */}
          <Card className="rounded-2xl border-0 bg-gradient-to-b">
            <CardBody className="p-6">
              {/* Tools Usage Summary */}
              <div className="pt-4">
                <div className="text-center">
                  <div className="text-s mb-2">
                    Total Tools Usage
                  </div>
                  <div className="text-xl font-bold">
                    {data?.currentPeriod?.metrics?.toolsDistributionByAmount
                      ? Object.values(data.currentPeriod.metrics.toolsDistributionByAmount)
                          .reduce((sum, item) => sum + item.amount, 0)
                          .toLocaleString()
                      : '0'}
                  </div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data?.currentPeriod?.metrics?.toolsDistributionByAmount
                      ? Object.entries(data.currentPeriod.metrics.toolsDistributionByAmount).map(([toolName, data], index) => ({
                          name: toolName.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim(),
                          amount: data.amount,
                          percentage: data.percentage,
                          fullName: toolName,
                          color: CHART_COLORS.primary[index % CHART_COLORS.primary.length],
                        }))
                      : []}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 80,
                    }}
                  >
                    <defs>
                      {CHART_COLORS.primary.map((color, index) => (
                        <linearGradient
                          key={`toolsGradient${index}`}
                          id={`toolsGradient${index}`}
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
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                    />
                    <YAxis
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                              <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
                              <p style={{ color: payload[0].color }} className="text-sm">
                                {`${payload[0].value?.toLocaleString()} uses`}
                                {payload[0].payload.percentage &&
                                  ` (${payload[0].payload.percentage.toFixed(1)}%)`}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      {data?.currentPeriod?.metrics?.toolsDistributionByAmount &&
                        Object.entries(data.currentPeriod.metrics.toolsDistributionByAmount).map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`url(#toolsGradient${index % CHART_COLORS.primary.length})`}
                          />
                        ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Enhanced Legend with Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 mb-4">
                {data?.currentPeriod?.metrics?.toolsDistributionByAmount &&
                  Object.entries(data.currentPeriod.metrics.toolsDistributionByAmount).map(([toolName, toolData], index) => {
                    const displayName = toolName.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
                    const color = CHART_COLORS.primary[index % CHART_COLORS.primary.length];

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
                            {toolData.amount.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            ({toolData.percentage.toFixed(1)}%)
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
    </div>
  );
};
