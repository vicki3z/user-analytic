import { type LogEntry } from "@/utils/file-reader";

export const validateLogFile = (content: string, lineNumber: number): { isValid: boolean; error?: string, entry?: LogEntry } => {  
  // Updated regular expression to capture identity and authUser
  const logPattern = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+([^\s]+)\s+([^\s]+)\s+\[([^\]]+)\]\s+"(GET|POST|PUT|DELETE|HEAD|OPTIONS|PATCH)\s+([^\s]+)\s+([^"]+)"\s+(\d{3})\s+(\d+)\s+"([^"]*)"\s+"([^"]*)"$/;
    
  const match = content.match(logPattern);
    
  if (!match) {
    // For debugging
    console.log('No match found for line:', content);
    return { isValid: false, error: `Invalid log format at line ${lineNumber}: ${content}` };
  }

  try {
    const [, ip, identity, authUser, timestamp, method, path, protocol, statusCode, responseSize, referer, userAgent] = match;
      
    // Validate IP address format
    const ipParts = ip.split('.');
    if (ipParts.length !== 4 || ipParts.some(part => parseInt(part) > 255)) {
      return { isValid: false, error: `Invalid IP address at line ${lineNumber}: ${ip}` };
    }

    // Validate timestamp format
    if (!/^\d{2}\/[A-Za-z]{3}\/\d{4}:\d{2}:\d{2}:\d{2}\s+\+\d{4}$/.test(timestamp)) {
      return { isValid: false, error: `Invalid timestamp format at line ${lineNumber}: ${timestamp}` };
    }

    // Validate status code
    const statusCodeNum = parseInt(statusCode, 10);
    if (statusCodeNum < 100 || statusCodeNum > 599) {
      return { isValid: false, error: `Invalid status code at line ${lineNumber}: ${statusCode}` };
    }

    return { 
      isValid: true, 
      entry: { 
        ip, 
        identity, 
        authUser,
        timestamp, 
        method, 
        path, 
        protocol, 
        statusCode: statusCodeNum, 
        responseSize: parseInt(responseSize, 10), 
        userAgent 
      } 
    };
  } catch (error) {
    return { isValid: false, error: `Error parsing line ${lineNumber}: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
};

