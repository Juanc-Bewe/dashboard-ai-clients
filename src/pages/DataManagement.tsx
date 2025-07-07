import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Card,
  CardBody,
  Pagination,
} from "@heroui/react";
import { Search, Download, RefreshCw } from "lucide-react";

// Simple data interface
interface DataRecord {
  id: string;
  accountName: string;
  conversationId: string;
  timestamp: string;
  status: "active" | "completed" | "failed";
  cost: number;
  messages: number;
}

// Sample data
const sampleData: DataRecord[] = [
  {
    id: "1",
    accountName: "Client Alpha",
    conversationId: "CONV001",
    timestamp: "2024-01-15T10:30:00Z",
    status: "completed",
    cost: 2.45,
    messages: 8,
  },
  {
    id: "2",
    accountName: "Client Beta",
    conversationId: "CONV002",
    timestamp: "2024-01-15T11:15:00Z",
    status: "active",
    cost: 1.23,
    messages: 5,
  },
  {
    id: "3",
    accountName: "Client Gamma",
    conversationId: "CONV003",
    timestamp: "2024-01-15T12:00:00Z",
    status: "failed",
    cost: 0.89,
    messages: 3,
  },
];

const statusColorMap = {
  active: "primary",
  completed: "success",
  failed: "danger",
} as const;

export const DataManagement: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Simple filtering
  const filteredItems = sampleData.filter(
    (item) =>
      item.accountName.toLowerCase().includes(filterValue.toLowerCase()) ||
      item.conversationId.toLowerCase().includes(filterValue.toLowerCase())
  );

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-foreground">Data Management</h1>
        <p className="mt-2 text-foreground-600">
          Manage and explore your conversation data
        </p>
      </div>

      {/* Simple Controls */}
      <div className="flex justify-between gap-3 items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by account name or conversation ID..."
          startContent={<Search size={18} />}
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={setFilterValue}
        />
        <div className="flex gap-2">
          <Button
            color="primary"
            variant="flat"
            startContent={<Download size={16} />}
          >
            Export
          </Button>
          <Button
            color="secondary"
            variant="flat"
            startContent={<RefreshCw size={16} />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Simple Table */}
      <Card>
        <CardBody>
          <Table aria-label="Data management table">
            <TableHeader>
              <TableColumn>ACCOUNT</TableColumn>
              <TableColumn>CONVERSATION</TableColumn>
              <TableColumn>TIMESTAMP</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>COST</TableColumn>
              <TableColumn>MESSAGES</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.accountName}</TableCell>
                  <TableCell>{item.conversationId}</TableCell>
                  <TableCell>{formatDate(item.timestamp)}</TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={statusColorMap[item.status]}
                      size="sm"
                      variant="flat"
                    >
                      {item.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{formatCurrency(item.cost)}</TableCell>
                  <TableCell>{item.messages}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Simple Pagination */}
          {pages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                showControls
                color="primary"
                page={page}
                total={pages}
                onChange={setPage}
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
