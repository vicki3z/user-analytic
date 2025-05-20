import React, { useState } from 'react';
import { LogEntry } from '../utils/file-reader';
import IpAnalyticsTable from './IpAnalyticsTable';
import MostVisitedPaths from './MostVisitedPaths';

interface AnalyticsTabsProps {
  logEntries: LogEntry[];
}

type TabType = 'ip' | 'paths';

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ logEntries }) => {
  const [activeTab, setActiveTab] = useState<TabType>('ip');

  const tabs = [
    { id: 'ip', label: 'IP Analytics' },
    { id: 'paths', label: 'Most Visited Paths' },
  ] as const;

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'ip' && <IpAnalyticsTable logEntries={logEntries} />}
        {activeTab === 'paths' && <MostVisitedPaths logEntries={logEntries} />}
      </div>
    </div>
  );
};

export default AnalyticsTabs; 