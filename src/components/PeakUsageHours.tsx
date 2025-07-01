import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { DashboardData } from '../types/dashboard';

interface PeakUsageHoursProps {
  data: DashboardData | null;
}

export const PeakUsageHours: React.FC<PeakUsageHoursProps> = ({ data }) => {
  // Prepare data for peak usage hours chart
  const peakUsageHoursData = React.useMemo(() => {
    if (!data?.currentPeriod?.metrics?.peakUsageHours) return [];
    
    const hours = data.currentPeriod.metrics.peakUsageHours;
    
    return Array.from({ length: 24 }, (_, index) => {
      const hour = index.toString();
      const count = hours[hour] || 0;
      
      // Format hour for display (12-hour format with AM/PM)
      const displayHour = index === 0 ? '12 AM' : 
                         index < 12 ? `${index} AM` : 
                         index === 12 ? '12 PM' : 
                         `${index - 12} PM`;
      
      return {
        hour: displayHour,
        hourNum: index,
        conversations: count,
        // Add color intensity based on conversation count
        intensity: count
      };
    });
  }, [data?.currentPeriod?.metrics?.peakUsageHours]);

  return (
    <Card className="rounded-2xl">
      <CardBody className="p-4">
        <h3 className="text-lg font-semibold mb-3">
          Activity Pattern
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%" className="overflow-hidden">
            <AreaChart data={peakUsageHoursData} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id="conversationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.7}/>
              <XAxis
                dataKey="hour"
                angle={-45}
                textAnchor="end"
                height={50}
                interval={0}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toString()}
                label={{ value: 'Conversations', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  border: 'none',
                  borderRadius: '12px',
                  backgroundColor: '#374151',
                  color: 'white',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                labelFormatter={(label) => `Time: ${label}`}
                formatter={(value, name) => [`${value} conversations`, 'Peak Usage']}
              />
              <Area
                type="monotone"
                dataKey="conversations"
                stroke="#6366f1"
                strokeWidth={3}
                fill="url(#conversationsGradient)"
                name="Conversations"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Usage Insights */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Peak Hour</p>
              <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                {peakUsageHoursData.length > 0 
                  ? peakUsageHoursData.reduce((max, current) => 
                      current.conversations > max.conversations ? current : max
                    ).hour
                  : 'N/A'
                }
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Peak Conversations</p>
              <p className="text-base font-semibold text-purple-600 dark:text-purple-400">
                {peakUsageHoursData.length > 0 
                  ? Math.max(...peakUsageHoursData.map(d => d.conversations)).toLocaleString()
                  : '0'
                }
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Quietest Hour</p>
              <p className="text-base font-semibold text-green-600 dark:text-green-400">
                {peakUsageHoursData.length > 0 
                  ? peakUsageHoursData.reduce((min, current) => 
                      current.conversations < min.conversations ? current : min
                    ).hour
                  : 'N/A'
                }
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}; 