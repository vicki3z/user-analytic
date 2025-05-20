import React, { useState, useCallback } from 'react';
import { LogEntry, readLogFile } from '../utils/file-reader';

interface FileUploadProps {
  onFileSelect: (file: File, logEntries: LogEntry[], errors: string[]) => void;
  acceptedFileTypes?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect, 
  acceptedFileTypes = '.log,.txt' 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetState = () => {
    setSelectedFile(null);
    setError(null);
  };

  const validateAndProcessFile = async (file: File) => {
    try {
      setIsValidating(true);
      setError(null);
      setSelectedFile(file);
      const { logEntries, errors } = await readLogFile(file);
      
      onFileSelect(file, logEntries, errors);
      
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to process the file. Please try again.';
      setError(errorMessage);
    } finally {
      setIsValidating(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndProcessFile(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  }, [onFileSelect]);

  return (
    <div className="w-full max-w-[600px]">
      <div 
        className={`
          w-full min-h-[200px]
          border-2 border-dashed rounded-lg
          flex items-center justify-center
          bg-gray-50 transition-all duration-300
          cursor-pointer relative
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : error 
              ? 'border-red-500 hover:border-red-600 hover:bg-red-50'
              : 'border-gray-300 hover:border-gray-600 hover:bg-gray-100'
          }
          ${isValidating ? 'opacity-50 cursor-wait' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center p-8 text-center">
          {error ? (
            <svg 
              className="w-12 h-12 text-red-500 mb-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          ) : (
            <svg 
              className="w-12 h-12 text-gray-600 mb-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          )}
          <h3 className={`text-xl mb-2 ${error ? 'text-red-600' : 'text-gray-800'}`}>
            {isValidating 
              ? 'Validating file...' 
              : error
                ? 'Invalid file format'
                : selectedFile 
                  ? selectedFile.name 
                  : 'Drag and drop your log file here'
            }
          </h3>
          <p className={`text-sm ${error ? 'text-red-500' : 'text-gray-600'}`}>
            {isValidating 
              ? 'Please wait...' 
              : error
                ? 'Please upload a valid log file'
                : 'or click to browse files'
            }
          </p>
          
          <input
            type="file"
            accept={acceptedFileTypes}
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isValidating}
          />
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 max-w-md">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload; 