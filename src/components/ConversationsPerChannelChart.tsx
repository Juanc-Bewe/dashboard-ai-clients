import React from "react";
import { Skeleton } from "@heroui/react";
import { MessageCircle, Phone } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import type { ChannelDistribution } from "../types/conversation-analytics";

interface ConversationsPerChannelChartProps {
  data: ChannelDistribution;
  loading: boolean;
}

export const ConversationsPerChannelChart: React.FC<ConversationsPerChannelChartProps> = ({
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


  console.log("data from conversations per channel chart", data);

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
