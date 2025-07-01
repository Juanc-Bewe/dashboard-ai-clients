import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { DashboardData } from '../types/dashboard';

interface DailyConversationAnalyticsProps {
  data: DashboardData | null;
}

export const DailyConversationAnalytics: React.FC<DailyConversationAnalyticsProps> = ({ data }) => {
  // Prepare data for conversations over time chart
  const conversationsChartData = React.useMemo(() => {
    if (!data?.currentPeriod?.dailyMetrics) return [];
    
    return data.currentPeriod.dailyMetrics.map(metric => {
      const totalConversations = metric.totalConversations || 0;
      const conversationsWithIdentification = metric.conversationsWithIdentification || 0;
      const conversationsWithoutIdentification = totalConversations - conversationsWithIdentification;
      const identificationRate = totalConversations > 0 ? (conversationsWithIdentification / totalConversations) * 100 : 0;
      
      return {
        date: new Date(metric.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: metric.date,
        totalConversations,
        conversationsWithIdentification,
        conversationsWithoutIdentification,
        identificationRate: Math.round(identificationRate * 10) / 10 // Round to 1 decimal
      };
    });
  }, [data?.currentPeriod?.dailyMetrics]);

  return (
    <Card className="rounded-2xl lg:col-span-2">
      <CardBody className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Daily Conversation Analytics
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%" className="overflow-hidden">
            <AreaChart data={conversationsChartData} margin={{ top: 20, right: 30, left:0, bottom: 30 }}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="identifiedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.7} />
              <XAxis
                dataKey="date"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  border: 'none',
                  borderRadius: '12px',
                  backgroundColor: '#1f2937',
                  color: 'white',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  padding: '12px'
                }}
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value, name) => {
                  if (name === 'Total Conversations') {
                    return [`${value} total`, 'Total Conversations'];
                  }
                  if (name === 'With Identification') {
                    return [`${value} identified`, 'With Identification'];
                  }
                  return [value, name];
                }}
              />
              {/* Total conversations area */}
              <Area
                type="monotone"
                dataKey="totalConversations"
                stackId="1"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#totalGradient)"
                name="Total Conversations"
              />
              {/* Identified conversations area (stacked on top) */}
              <Area
                type="monotone"
                dataKey="conversationsWithIdentification"
                stackId="2"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#identifiedGradient)"
                name="With Identification"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Analytics Insights */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Period</p>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {conversationsChartData.reduce((sum, day) => sum + day.totalConversations, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Best Day</p>
              <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                {conversationsChartData.length > 0 
                  ? conversationsChartData.reduce((max, current) => 
                      current.totalConversations > max.totalConversations ? current : max
                    ).date
                  : 'N/A'
                }
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Identification</p>
              <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                {conversationsChartData.length > 0 
                  ? Math.round(conversationsChartData.reduce((sum, day) => sum + day.identificationRate, 0) / conversationsChartData.length)
                  : 0
                }%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Daily Average</p>
              <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                {conversationsChartData.length > 0 
                  ? Math.round(conversationsChartData.reduce((sum, day) => sum + day.totalConversations, 0) / conversationsChartData.length)
                  : 0
                }
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}; 