import { LogEntry } from "@/utils/file-reader";

interface VisitorInfo {
  ip: string;
  requestCount: number;
  visitedPaths: string[];
  lastVisitDate: string;
}

interface MostVisitedPath {
  path: string;
  requestCount: number;
  lastVisitDate: string;
  lastVisitIp: string;
}

const formatTimestamp = (timestamp: string): string => {
  // Parse the timestamp from format "11/Jul/2018:17:31:05 +0200"
  const [dateTimePart, timezone] = timestamp.split(' ');
  const firstColonIndex = dateTimePart.indexOf(':');
  const datePart = dateTimePart.substring(0, firstColonIndex);
  const timePart = dateTimePart.substring(firstColonIndex + 1);
  const [day, month, year] = datePart.split('/');
  
  // Convert month name to number (0-based)
  const monthMap: { [key: string]: string } = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  };

  // Create a valid ISO string that can be parsed by Date
  const isoString = `${year}-${monthMap[month]}-${day.padStart(2, '0')}T${timePart}`;
  const date = new Date(isoString);
  console.log('date', date)
  console.log('isoString', isoString)
  console.log('timestamp', timestamp)
  
  // TODO: This seems to be returning an incorrect time which differs from log entries
  // Might be something to do with the timezone
  return date.toISOString()
};

export const processUniqueVisitors = (logEntries: LogEntry[]): VisitorInfo[] => {
  const visitorMap = new Map<string, VisitorInfo>();

  logEntries
    .filter(entry => entry.authUser === '-')
    .forEach(entry => {
      if (!visitorMap.has(entry.ip)) {
        visitorMap.set(entry.ip, {
          ip: entry.ip,
          requestCount: 0,
          visitedPaths: [],
          lastVisitDate: formatTimestamp(entry.timestamp)
        });
      }

      const visitor = visitorMap.get(entry.ip)!;
      visitor.requestCount++;
      
      // Add path if not already in the list
      // Normalise path to remove domain name
      const normalisedPath = entry.path.replace(/(https?:\/\/)?(www\.)?example\.net/, '');
      if (!visitor.visitedPaths.includes(normalisedPath)) {
        visitor.visitedPaths.push(normalisedPath);
      }

      // Update last visit date if this entry is more recent
      const currentTimestamp = formatTimestamp(entry.timestamp);
      if (currentTimestamp > visitor.lastVisitDate) {
        visitor.lastVisitDate = currentTimestamp;
      }
    });

  return Array.from(visitorMap.values());
}

export const processMostVisitedPaths = (logEntries: LogEntry[], limit: number = 3): MostVisitedPath[] => {
  const pathMap = new Map<string, MostVisitedPath>();

  logEntries
    .filter(entry => entry.authUser === '-' && entry.statusCode === 200)
    .forEach(entry => {
      // Normalise path to remove domain name
      const normalisedPath = entry.path.replace(/(https?:\/\/)?(www\.)?example\.net/, '');

      if (!pathMap.has(normalisedPath)) {
        pathMap.set(normalisedPath, {
          path: normalisedPath,
          requestCount: 0,
          lastVisitDate: formatTimestamp(entry.timestamp),
          lastVisitIp: entry.ip
        });
      }

      const path = pathMap.get(normalisedPath)!;
      path.requestCount++;  

      if (path.lastVisitDate < formatTimestamp(entry.timestamp)) {
        path.lastVisitDate = formatTimestamp(entry.timestamp);
        path.lastVisitIp = entry.ip;
      }
    })

  return Array.from(pathMap.values()).sort((a, b) => b.requestCount - a.requestCount).slice(0, limit);
}