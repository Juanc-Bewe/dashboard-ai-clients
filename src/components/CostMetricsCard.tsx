import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { DollarSign, TrendingUp, Users, PieChart } from 'lucide-react';
import { useConversationAnalyticsStore } from '../contexts/ConversationAnalyticsContext';

export const CostMetricsCard: React.FC = () => {
  const data = useConversationAnalyticsStore((state) => state.data);
  const loading = useConversationAnalyticsStore((state) => state.loading);

  if (loading) {
    return (
      <Card className="w-full">
        <CardBody className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            <span className="ml-2 text-foreground-600">Cargando métricas de costos...</span>
          </div>
        </CardBody>
      </Card>
    );
  }

  const costAnalytics = data?.currentPeriod?.metrics?.costAnalytics;

  if (!costAnalytics) {
    return (
      <Card className="w-full">
        <CardBody className="p-6">
          <p className="text-foreground-600 text-center">No hay datos de métricas de costos disponibles</p>
        </CardBody>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4
    }).format(amount);
  };

  const costDistribution = [
    {
      category: 'LLM',
      percentage: costAnalytics.costDistribution.llm.percentage,
      cost: costAnalytics.costDistribution.llm.cost,
      color: 'blue'
    },
    {
      category: 'Herramientas',
      percentage: costAnalytics.costDistribution.tools.percentage,
      cost: costAnalytics.costDistribution.tools.cost,
      color: 'green'
    },
    {
      category: 'Trazabilidad',
      percentage: costAnalytics.costDistribution.tracing.percentage,
      cost: costAnalytics.costDistribution.tracing.cost,
      color: 'purple'
    },
    {
      category: 'WhatsApp',
      percentage: costAnalytics.costDistribution.whatsapp.percentage,
      cost: costAnalytics.costDistribution.whatsapp.cost,
      color: 'orange'
    }
  ].filter(item => item.cost > 0);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 border-blue-200',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 border-green-200',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <Card className="w-full">
      <CardBody className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Métricas de Costos
          </h3>
          <p className="text-foreground-600 text-sm">
            Análisis de costos operativos de Linda IA
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-xl font-bold text-foreground">
              {formatCurrency(costAnalytics.totalCost)}
            </div>
            <div className="text-xs text-foreground-600">
              Costo Total
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-xl font-bold text-foreground">
              {formatCurrency(costAnalytics.averageTotalCostPerConversation)}
            </div>
            <div className="text-xs text-foreground-600">
              Promedio por Conversación
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-xl font-bold text-foreground">
              {costAnalytics.topExpensiveAccounts.length}
            </div>
            <div className="text-xs text-foreground-600">
              Cuentas Activas
            </div>
          </div>
        </div>

        {/* Cost Distribution */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Distribución de Costos
          </h4>
          
          <div className="space-y-3">
            {costDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${getColorClasses(item.color)}`} />
                  <span className="text-sm font-medium text-foreground">
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">
                    {formatCurrency(item.cost)}
                  </div>
                  <div className="text-xs text-foreground-600">
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
