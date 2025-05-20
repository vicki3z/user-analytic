import { validateLogFile } from "@/utils/file-validator";

export interface LogEntry {
  ip: string;
  identity: string;
  authUser: string;
  timestamp: string;
  method: string;
  path: string;
  protocol: string;
  statusCode: number;
  responseSize: number;
  userAgent: string;
}

const readLine = (lineContent: string, lineNumber: number): { isValid: boolean; error?: string, entry?: LogEntry } => {
  const result = validateLogFile(lineContent, lineNumber);
  return {
    isValid: result.isValid,  
    error: result.error,
    entry: result.entry as LogEntry
  };
}

export const readLogFile = async (file: File) => {
  const logEntries: LogEntry[] = [];
  const errors: string[] = [];
  const content: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });

  // Split content into lines and process each line
  const lines = content.split('\n').filter(line => line.trim());
  
  lines.forEach((line, index) => {
    const { isValid, error, entry } = readLine(line, index + 1);
    if (isValid && entry) {
      logEntries.push(entry);
    } else if (error) {
      errors.push(error);
    }
  });

  return { logEntries, errors } ;
}; 