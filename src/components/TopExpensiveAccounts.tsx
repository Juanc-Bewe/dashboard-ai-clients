import React, { useState, useMemo } from "react";
import { Card, CardBody, Button, Skeleton } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency } from "../utils/currencyHelpers";
import type { TopExpensiveAccount } from "../types/dashboard";

interface TopExpensiveAccountsProps {
  accounts: TopExpensiveAccount[];
  loading?: boolean;
}

const TopExpensiveAccountsSkeleton: React.FC = () => {
  return (
    <Card className="rounded-2xl border-0 bg-gradient-to-b w-full max-w-2xl">
      <CardBody className="p-6">
        <div className="pt-4">
          <div className="text-center">
            <Skeleton className="h-4 w-48 mx-auto mb-2 rounded-lg" />
            <Skeleton className="h-8 w-32 mx-auto mb-6 rounded-lg" />
          </div>
        </div>
        
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-40 rounded-lg" />
                  <Skeleton className="h-3 w-24 rounded-lg" />
                </div>
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-4 w-16 rounded-lg" />
                <Skeleton className="h-3 w-12 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center items-center gap-2 mt-4">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-4 w-16 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </CardBody>
    </Card>
  );
};

export const TopExpensiveAccounts: React.FC<TopExpensiveAccountsProps> = ({
  accounts,
  loading = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination
  const { totalPages, paginatedAccounts, startIndex, endIndex } = useMemo(() => {
    const total = Math.ceil(accounts.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = accounts.slice(start, end);
    
    return {
      totalPages: total,
      paginatedAccounts: paginated,
      startIndex: start,
      endIndex: Math.min(end, accounts.length),
    };
  }, [accounts, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Show skeleton while loading
  if (loading) {
    return <TopExpensiveAccountsSkeleton />;
  }

  // Return empty state if no accounts
  if (!accounts || accounts.length === 0) {
    return (
      <Card className="rounded-2xl border-0 bg-gradient-to-b w-full max-w-2xl">
        <CardBody className="p-6">
          <div className="pt-4">
            <div className="text-center">
              <div className="text-sm mb-2">Top Expensive Accounts</div>
              <div className="text-2xl font-bold">No Data</div>
            </div>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No account usage data available
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-0 bg-gradient-to-b w-full max-w-2xl">
      <CardBody className="p-6">
        {/* Header */}
        <div className="pt-4">
          <div className="text-center">
            <div className="text-sm mb-2">Top Expensive Accounts</div>
            <div className="text-2xl font-bold">{accounts.length} Accounts</div>
          </div>
        </div>

        {/* Accounts List */}
        <div className="space-y-3 mt-6">
          {paginatedAccounts.map((account, index) => {
            const actualIndex = startIndex + index + 1;
            return (
              <div
                key={account.accountId}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Ranking Badge */}
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {actualIndex}
                  </div>
                  
                  {/* Account Info */}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {account.accountName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {account.sessionCount} conversation{account.sessionCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* Cost Info */}
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {formatCurrency(account.totalCost)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatCurrency(account.totalCost / account.sessionCount)}/conversation
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              onPress={handlePrevious}
              isDisabled={currentPage === 1}
              className="min-w-8 h-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                  <Button
                    key={page}
                    size="sm"
                    variant={currentPage === page ? "solid" : "flat"}
                    onPress={() => handlePageChange(page)}
                    className="min-w-8 h-8 text-xs"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              isIconOnly
              size="sm"
              variant="flat"
              onPress={handleNext}
              isDisabled={currentPage === totalPages}
              className="min-w-8 h-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          Showing {startIndex + 1}-{endIndex} of {accounts.length} accounts
        </div>
      </CardBody>
    </Card>
  );
}; 