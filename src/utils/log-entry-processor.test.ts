import { describe, it, expect } from 'vitest';
import { processMostVisitedPaths, processUniqueVisitors } from './log-entry-processor';
import { validLogEntries, validLogEntriesWithAdmin, adminLogEntries } from './test-data';

describe('Log Entry Processor', () => {
  describe('Unique Visitors', () => {
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

  describe('Most Visited Paths', () => {
    it('should process most visited paths correctly', () => {
      const mostVisitedPaths = processMostVisitedPaths(validLogEntries);
      expect(mostVisitedPaths).toHaveLength(3);
      
      // TODO: Add more tests
      // - Check that the most visited paths are correct
      // - Check that the request count is correct
      // - Check that the last visit date is correct
      // - Check that the last visit ip is correct
    })
    it.todo('should process most visited paths with normalised path without domain name')
    it.todo('should NOT process most visited paths with status code other than 200')
    it.todo('should NOT process most visited paths with auth user other than "-"')
  })
})
