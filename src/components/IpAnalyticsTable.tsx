import React, { useMemo, useState } from 'react';
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
  const [showTopThree, setShowTopThree] = useState(false);

  // Process log entries to create IP analytics data
  const ipAnalyticsData = useMemo(() => {
    const uniqueVisitors = processUniqueVisitors(logEntries);
    const data = uniqueVisitors.map((entry) => ({
      ip: entry.ip,
      totalRequests: entry.requestCount,
      uniquePaths: entry.visitedPaths,
      lastSeen: entry.lastVisitDate
    } as IpAnalyticsData));

    if (showTopThree) {
      return data
        .sort((a, b) => b.totalRequests - a.totalRequests)
        .slice(0, 3);
    }

    return data;
  }, [logEntries, showTopThree]);

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
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">IP Analytics</h2>
        <div className="flex gap-2">
          {showTopThree ? (
            <button
              onClick={() => setShowTopThree(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Show All IPs
            </button>
          ) : (
            <button
              onClick={() => setShowTopThree(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Show Top 3 Active IPs
            </button>
          )}
        </div>
      </div>
      <Table
        data={ipAnalyticsData}
        columns={columns}
        pageSize={showTopThree ? 3 : 20}
        filterableColumns={['ip']}
      />
    </div>
  );
};

export default IpAnalyticsTable; 