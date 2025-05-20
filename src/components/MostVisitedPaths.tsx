import React, { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { LogEntry } from '../utils/file-reader';
import { processMostVisitedPaths } from '../utils/log-entry-processor';
import Table from './Table';

interface MostVisitedPath {
  path: string;
  requestCount: number;
  lastVisitDate: string;
  lastVisitIp: string;
}

interface MostVisitedPathsProps {
  logEntries: LogEntry[];
  limit?: number;
}

const MostVisitedPaths: React.FC<MostVisitedPathsProps> = ({ logEntries, limit = 3 }) => {
  const mostVisitedPaths = useMemo(() => processMostVisitedPaths(logEntries, limit), [logEntries, limit]);

  const columns = useMemo<ColumnDef<MostVisitedPath>[]>(
    () => [
      {
        accessorKey: 'path',
        header: 'Path',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'requestCount',
        header: 'Total Requests',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'lastVisitDate',
        header: 'Last Visit',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'lastVisitIp',
        header: 'Last Visitor IP',
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Most Visited Paths</h2>
      <Table
        data={mostVisitedPaths}
        columns={columns}
        pageSize={limit}
      />
    </div>
  );
};

export default MostVisitedPaths; 