import React, { useState } from "react";
import { Card, CardBody, Skeleton, Tooltip, Pagination } from "@heroui/react";
import { Info, Copy, Check } from "lucide-react";
import { useConversationDataStore } from "../contexts/ConversationDataContext";

interface AdoptionMetricCardProps {
  title: string;
  tooltip: string;
  count: number;
  percentage: number;
  totalAccounts: number;
  loading?: boolean;
  color?: string;
}

const AdoptionMetricCard: React.FC<AdoptionMetricCardProps> = ({
  title,
  tooltip,
  count,
  percentage,
  totalAccounts,
  loading = false,
  color = "#10b981",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(count.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardBody className="p-6">
          <Skeleton className="h-4 w-3/4 mb-4" />
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Skeleton className="w-32 h-32 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </CardBody>
      </Card>
    );
  }

  // Calculate the circumference for the circle - make it bigger
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="w-full group relative">
      <CardBody className="p-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 mb-6">
            <p className="text-sm font-medium text-center">{title}</p>
            <Tooltip content={tooltip} placement="top">
              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
            </Tooltip>
            <Tooltip
              content={copied ? "¡Copiado!" : "Copiar cantidad"}
              placement="top"
            >
              <button
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                )}
              </button>
            </Tooltip>
          </div>

          {/* Circular Progress - Made bigger */}
          <div className="relative mb-6">
            <svg
              className="w-48 h-48 transform -rotate-90"
              viewBox="0 0 192 192"
            >
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-200 dark:text-gray-700"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke={color}
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-lg font-medium" style={{ color }}>
                {percentage.toFixed(0)}%
              </div>
              <div className="text-4xl font-bold text-foreground">{count}</div>
            </div>
          </div>

          <div className="text-sm text-foreground-600 text-center">
            de {totalAccounts.toLocaleString()} cuentas
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export const UsabilityAndIndependenceTab: React.FC = () => {
  const data = useConversationDataStore((state) => state.data);
  const loading = useConversationDataStore((state) => state.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!data && !loading) {
    return (
      <Card className="w-full">
        <CardBody className="p-6">
          <p className="text-foreground-600 text-center">
            No hay datos de uso y adopción disponibles
          </p>
        </CardBody>
      </Card>
    );
  }

  const comparisonData = data?.comparison;
  const currentMetrics = data?.currentPeriod?.metrics;

  // Calculate metrics for "Cuentas con Igual o Más Conversaciones"
  const totalAccountsWithEqualOrMore =
    comparisonData?.totalAccountsWithEqualOrMore ?? 0;
  const totalCurrentAccounts = comparisonData?.totalCurrentAccounts ?? 1;
  const percentageEqualOrMore =
    totalCurrentAccounts > 0
      ? (totalAccountsWithEqualOrMore / totalCurrentAccounts) * 100
      : 0;

  // Calculate metrics for "Cuentas con Más de 50 Conversaciones"
  const accountsWithMoreFiftyConversations =
    currentMetrics?.accountAnalytics?.accountsWithMoreFiftyConversations ?? [];
  const totalAccountsWithMoreFifty = accountsWithMoreFiftyConversations.length;
  const totalAccountsWithConversations =
    currentMetrics?.volumeMetrics?.totalAccounts ?? 1;
  const percentageMoreFifty =
    totalAccountsWithConversations > 0
      ? (totalAccountsWithMoreFifty / totalAccountsWithConversations) * 100
      : 0;

  // Get top accounts by cost (ordered)
  const topExpensiveAccounts =
    currentMetrics?.costAnalytics?.topExpensiveAccounts ?? [];

  // Pagination calculations
  const totalPages = Math.ceil(topExpensiveAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAccounts = topExpensiveAccounts.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">
          Métricas de Uso y Adopción
        </h2>
        <Tooltip
          content="Indicadores que miden el nivel de adopción y uso del sistema por parte de las cuentas"
          placement="top"
        >
          <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
        </Tooltip>
      </div>

      {/* Adoption Metrics Cards - Larger and more prominent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdoptionMetricCard
          title="Cuentas con Igual o Más Conversaciones"
          tooltip="Cantidad y porcentaje de cuentas que mantuvieron o incrementaron su nivel de conversaciones vs el período anterior"
          count={totalAccountsWithEqualOrMore}
          percentage={percentageEqualOrMore}
          totalAccounts={totalCurrentAccounts}
          loading={loading}
          color="#10b981"
        />

        <AdoptionMetricCard
          title="Cuentas con Más de 50 Conversaciones"
          tooltip="Cantidad y porcentaje de cuentas que tuvieron más de 50 conversaciones en el período, sin importar si fueron útiles o no."
          count={totalAccountsWithMoreFifty}
          percentage={percentageMoreFifty}
          totalAccounts={totalAccountsWithConversations}
          loading={loading}
          color="#6366f1"
        />
      </div>

      {/* Top Active Accounts by Engagement */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          <h2 className="text-xl font-semibold text-foreground">
            Cuentas con mas uso/costo
          </h2>
          <Tooltip
            content="Cuentas ordenadas por nivel de uso/costo"
            placement="top"
          >
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
          </Tooltip>
        </div>

        <Card className="rounded-2xl border-0 bg-gradient-to-b">
          <CardBody className="p-6">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            ) : topExpensiveAccounts.length > 0 ? (
              <>
                <div className="space-y-3">
                  {paginatedAccounts.map((account, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold text-sm flex-shrink-0">
                          {startIndex + index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {account.accountName}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {account.sessionCount}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            sesiones
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <Pagination
                      total={totalPages}
                      page={currentPage}
                      onChange={setCurrentPage}
                      showControls
                      color="secondary"
                      size="lg"
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-foreground-600 text-center py-4">
                No hay datos de cuentas disponibles
              </p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
