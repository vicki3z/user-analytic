import React, { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { LogEntry } from '../utils/file-reader';
import { processUniqueVisitors } from '../utils/log-entry-processor';
import Table from './Table';

interface IpAnalyticsData {
  ip: string;
  totalRequests: number;
  uniquePaths: string[];
  lastSeen: string;
}

interface IpAnalyticsTableProps {
  logEntries: LogEntry[];
}

const IpAnalyticsTable: React.FC<IpAnalyticsTableProps> = ({ logEntries }) => {
  // Process log entries to create IP analytics data
  const ipAnalyticsData = useMemo(() => {
    const uniqueVisitors = processUniqueVisitors(logEntries);
    return uniqueVisitors.map((entry) => ({
        ip: entry.ip,
        totalRequests: entry.requestCount,
        uniquePaths: entry.visitedPaths,
        lastSeen: entry.lastVisitDate
      } as IpAnalyticsData)
    );
  }, [logEntries]);

  const columns = useMemo<ColumnDef<IpAnalyticsData>[]>(
    () => [
      {
        accessorKey: 'ip',
        header: 'IP Address',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'totalRequests',
        header: 'Total Requests',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'uniquePaths',
        header: 'Unique Paths',
        cell: (info) => {
          return <ul>
            {info.getValue<string[]>().map((url) => <li key={url}>{url}</li>)}
          </ul>
        },
      },
      {
        accessorKey: 'lastSeen',
        header: 'Last Seen',
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return (
    <Table
      data={ipAnalyticsData}
      columns={columns}
      pageSize={20}
      filterableColumns={['ip']}
    />
  );
};

export default IpAnalyticsTable; 