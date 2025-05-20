import { describe, it, expect } from 'vitest';
import { processUniqueVisitors } from './log-entry-processor';
import { validLogEntries, validLogEntriesWithAdmin, adminLogEntries } from './test-data';

describe('Log Entry Processor', () => {
  it('should process unique visitors correctly', () => {
    const uniqueVisitors = processUniqueVisitors(validLogEntries);
    expect(uniqueVisitors).toHaveLength(2);
    expect(uniqueVisitors[0].ip).toBe('177.71.128.21');
    expect(uniqueVisitors[0].requestCount).toBe(1);

    expect(uniqueVisitors[1].ip).toBe('168.41.191.40');
    expect(uniqueVisitors[1].requestCount).toBe(2);
    expect(uniqueVisitors[1].visitedPaths).toEqual(['http://example.net/faq/', '/this/page/does/not/exist/']);

    // Failing due to date time formatter doesn't using the correct timezone?
    expect(uniqueVisitors[1].lastVisitDate).toBe('2018-07-11T17:41:30.000Z');
  })

  it('should process unique visitors correctly and filter out admin users', () => {
    const uniqueVisitors = processUniqueVisitors(validLogEntriesWithAdmin);
    expect(uniqueVisitors).toHaveLength(2);
    expect(uniqueVisitors[0].ip).toBe('177.71.128.21');
    expect(uniqueVisitors[0].requestCount).toBe(1);

    expect(uniqueVisitors[1].ip).toBe('168.41.191.40');
    expect(uniqueVisitors[1].requestCount).toBe(2);
    expect(uniqueVisitors[1].visitedPaths).toEqual(['http://example.net/faq/', '/this/page/does/not/exist/']);

    // Failing due to date time formatter doesn't using the correct timezone?
    expect(uniqueVisitors[1].lastVisitDate).toBe('2018-07-11T17:41:30.000Z');
  })

  it('should not return any unique visitors if log entries only contain admin users', () => {
    const uniqueVisitors = processUniqueVisitors(adminLogEntries);
    expect(uniqueVisitors).toHaveLength(0);
  })
})
