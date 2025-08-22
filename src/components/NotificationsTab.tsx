import React from "react";
import {
  Card,
  CardBody,
  Skeleton,
  Tooltip as HeroTooltip,
} from "@heroui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useNotificationsDataStore,
  useNotificationsAutoSync,
} from "../contexts/NotificationsDataContext";

// Professional color palette
const CHART_COLORS = {
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  primary: "#8B5CF6",
};

const NotificationsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Summary Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="h-20">
            <CardBody>
              <Skeleton className="h-full w-full" />
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Performance Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-48">
          <CardBody>
            <Skeleton className="h-full w-full" />
          </CardBody>
        </Card>
        <Card className="h-48">
          <CardBody>
            <Skeleton className="h-full w-full" />
          </CardBody>
        </Card>
      </div>

      {/* Chart Skeleton */}
      <Card className="h-96">
        <CardBody>
          <Skeleton className="h-full w-full" />
        </CardBody>
      </Card>
    </div>
  );
};

export const NotificationsTab: React.FC = () => {
  // Get data from notifications store
  const { data: analytics, loading, error } = useNotificationsDataStore();

  // Auto-sync with filter changes (this handles both initial fetch and filter changes)
  useNotificationsAutoSync();

  if (loading) {
    return <NotificationsSkeleton />;
  }

  if (error || !analytics) {
    return (
      <Card className="h-32">
        <CardBody className="flex items-center justify-center">
          <p className="text-danger">
            Error: {error || "No hay datos disponibles"}
          </p>
        </CardBody>
      </Card>
    );
  }

  // Prepare data for time distribution chart
  const timeDistributionData = Object.entries(
    analytics.timeToOpenDistribution
  ).map(([timeRange, data]) => ({
    timeRange,
    count: data.count,
    percentage: data.percentage,
  }));

  const ratesData = [
    {
      name: "Tasa de Entrega",
      value: analytics.deliveryRate,
      color: CHART_COLORS.success,
      tooltip:
        "Porcentaje de emails que fueron entregados exitosamente a los destinatarios",
    },
    {
      name: "Tasa de Apertura",
      value: analytics.openRate,
      color: CHART_COLORS.info,
      tooltip:
        "Porcentaje de emails entregados que fueron abiertos por los destinatarios",
    },
    {
      name: "Tasa de Clics",
      value: analytics.clickRate,
      color: CHART_COLORS.warning,
      tooltip:
        "Porcentaje de emails abiertos en los que se hizo clic en algún enlace",
    },
    {
      name: "Tasa de Procesamiento",
      value: analytics.processedRate,
      color: CHART_COLORS.primary,
      tooltip:
        "Porcentaje de emails que fueron procesados correctamente por el sistema",
    },
    {
      name: "Tasa de Rebote",
      value: analytics.bouncedRate,
      color: CHART_COLORS.danger,
      tooltip:
        "Porcentaje de emails que no pudieron ser entregados (rebotaron)",
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-divider rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} ({entry.payload.percentage}%)
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Email Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody className="p-4 text-center">
            <HeroTooltip
              content="Número total de emails procesados en el período seleccionado"
              placement="top"
            >
              <div className="cursor-help">
                <div className="text-xl font-bold text-primary">
                  {analytics.totalEmails.toLocaleString()}
                </div>
                <p className="text-sm text-default-500">Total de Emails</p>
              </div>
            </HeroTooltip>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4 text-center">
            <HeroTooltip
              content="Número de emails que fueron entregados exitosamente"
              placement="top"
            >
              <div className="cursor-help">
                <div className="text-xl font-bold text-success">
                  {analytics.stateDistribution.delivered.count.toLocaleString()}
                </div>
                <p className="text-sm text-default-500">Entregados</p>
              </div>
            </HeroTooltip>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4 text-center">
            <HeroTooltip
              content="Número de emails que fueron abiertos por los destinatarios"
              placement="top"
            >
              <div className="cursor-help">
                <div className="text-xl font-bold text-info">
                  {analytics.stateDistribution.open.count.toLocaleString()}
                </div>
                <p className="text-sm text-default-500">Abiertos</p>
              </div>
            </HeroTooltip>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4 text-center">
            <HeroTooltip
              content="Número de emails en los que se hizo clic en algún enlace"
              placement="top"
            >
              <div className="cursor-help">
                <div className="text-xl font-bold text-warning">
                  {analytics.stateDistribution.click.count.toLocaleString()}
                </div>
                <p className="text-sm text-default-500">Clics</p>
              </div>
            </HeroTooltip>
          </CardBody>
        </Card>
      </div>

      {/* Performance Rates & Time to Open Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Tasas de Rendimiento
              </h3>
              <p className="text-sm text-default-500">
                Indicadores clave de rendimiento
              </p>
            </div>
            <div className="space-y-3">
              {ratesData.map((rate, index) => (
                <div key={index} className="flex items-center justify-between">
                  <HeroTooltip content={rate.tooltip} placement="left">
                    <span className="text-sm text-default-600 cursor-help">
                      {rate.name}
                    </span>
                  </HeroTooltip>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-default-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${rate.value}%`,
                          backgroundColor: rate.color,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-12 text-right">
                      {rate.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Análisis de Tiempo de Apertura
              </h3>
              <p className="text-sm text-default-500">
                Tiempos promedio y mediano de respuesta
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <HeroTooltip
                content="Tiempo promedio que tardan los usuarios en abrir los emails"
                placement="top"
              >
                <div className="text-center p-4 bg-default-50 rounded-lg cursor-help">
                  <p className="text-xl font-bold text-info">
                    {analytics.averageTimeToOpen}h
                  </p>
                  <p className="text-sm text-default-500">Tiempo Promedio</p>
                </div>
              </HeroTooltip>
              <HeroTooltip
                content="Tiempo mediano que tardan los usuarios en abrir los emails (50% de los usuarios abren antes de este tiempo)"
                placement="top"
              >
                <div className="text-center p-4 bg-default-50 rounded-lg cursor-help">
                  <p className="text-xl font-bold text-success">
                    {analytics.medianTimeToOpen}h
                  </p>
                  <p className="text-sm text-default-500">Tiempo Mediano</p>
                </div>
              </HeroTooltip>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Time to Open Distribution Chart */}
      <Card>
        <CardBody className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Distribución de Tiempo de Apertura
            </h3>
            <p className="text-sm text-default-500">
              Cuándo abren los usuarios los emails
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <HeroTooltip
              content="Número total de emails que han sido abiertos"
              placement="top"
            >
              <div className="text-center cursor-help">
                <div className="text-xl font-bold text-info">
                  {Object.values(analytics.timeToOpenDistribution)
                    .reduce((sum, item) => sum + item.count, 0)
                    .toLocaleString()}
                </div>
                <p className="text-sm text-default-500">Total de Aperturas</p>
              </div>
            </HeroTooltip>
            <HeroTooltip
              content="Porcentaje general de emails que fueron abiertos del total enviado"
              placement="top"
            >
              <div className="text-center cursor-help">
                <div className="text-xl font-bold text-success">
                  {analytics.openRate}%
                </div>
                <p className="text-sm text-default-500">
                  Tasa General de Apertura
                </p>
              </div>
            </HeroTooltip>
          </div>

          {/* Area Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timeDistributionData}
                margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
              >
                <defs>
                  <linearGradient
                    id="timeDistributionGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  opacity={0.7}
                />
                <XAxis
                  dataKey="timeRange"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#timeDistributionGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
