import { describe, it, expect } from 'vitest';
import { validateLogFile } from './file-validator';
import { type LogEntry } from './file-reader';

describe('Log File Validator', () => {
  const validLogLine = '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"';
  const validLogLineWithUrl = '168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"';
  const validLogLineWith404 = '168.41.191.41 - - [11/Jul/2018:17:41:30 +0200] "GET /this/page/does/not/exist/ HTTP/1.1" 404 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"';
  const validLogLineWithAuthUser = '50.112.00.11 - admin [11/Jul/2018:17:31:05 +0200] "GET /hosting/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6"';

  describe('Valid log lines', () => {
    it('should validate a standard log line', () => {
      const result = validateLogFile(validLogLine, 1);
      expect(result.isValid).toBe(true);
      expect(result.entry).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should parse all fields correctly', () => {
      const result = validateLogFile(validLogLine, 1);
      const expectedEntry: LogEntry = {
        ip: '177.71.128.21',
        identity: '-',
        authUser: '-',
        timestamp: '10/Jul/2018:22:21:28 +0200',
        method: 'GET',
        path: '/intranet-analytics/',
        protocol: 'HTTP/1.1',
        statusCode: 200,
        responseSize: 3574,
        userAgent: 'Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7'
      };
      expect(result.entry).toEqual(expectedEntry);
    });

    it('should handle URLs in the path', () => {
      const result = validateLogFile(validLogLineWithUrl, 1);
      expect(result.isValid).toBe(true);
      expect(result.entry?.path).toBe('http://example.net/faq/');
    });

    it('should handle 404 status codes', () => {
      const result = validateLogFile(validLogLineWith404, 1);
      expect(result.isValid).toBe(true);
      expect(result.entry?.statusCode).toBe(404);
    });

    it('should handle auth user', () => {
      const result = validateLogFile(validLogLineWithAuthUser, 1);
      expect(result.isValid).toBe(true);
      expect(result.entry?.authUser).toBe('admin');
    });
  });

  describe('Invalid log lines', () => {
    it('should reject invalid IP addresses', () => {
      const invalidIp = '256.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0"';
      const result = validateLogFile(invalidIp, 1);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid IP address');
    });

    it('should reject invalid timestamps', () => {
      const invalidTimestamp = '177.71.128.21 - - [invalid-timestamp] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0"';
      const result = validateLogFile(invalidTimestamp, 1);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid timestamp format');
    });

    it('should reject invalid status codes', () => {
      const invalidStatusCode = '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 999 3574 "-" "Mozilla/5.0"';
      const result = validateLogFile(invalidStatusCode, 1);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid status code');
    });

    it('should reject malformed log lines', () => {
      const malformedLog = 'This is not a valid log line';
      const result = validateLogFile(malformedLog, 1);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid log format');
    });
  });
}); 