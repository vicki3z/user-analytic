import { LogEntry } from './file-reader';

// Array of valid log entries for testing
export const validLogEntries: LogEntry[] = [
  {
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
  },
  {
    ip: '168.41.191.40',
    identity: '-',
    authUser: '-',
    timestamp: '09/Jul/2018:10:11:30 +0200',
    method: 'GET',
    path: 'http://example.net/faq/',
    protocol: 'HTTP/1.1',
    statusCode: 200,
    responseSize: 3574,
    userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
  },
  {
    ip: '168.41.191.40',
    identity: '-',
    authUser: '-',
    timestamp: '11/Jul/2018:17:41:30 +0200',
    method: 'GET',
    path: '/this/page/does/not/exist/',
    protocol: 'HTTP/1.1',
    statusCode: 404,
    responseSize: 3574,
    userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
  }
];

// Array of log entries with admin users (should be filtered out)
export const adminLogEntries: LogEntry[] = [
  {
    ip: '50.112.00.11',
    identity: '-',
    authUser: 'admin',
    timestamp: '11/Jul/2018:17:31:05 +0200',
    method: 'GET',
    path: '/hosting/',
    protocol: 'HTTP/1.1',
    statusCode: 200,
    responseSize: 3574,
    userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6'
  },
  {
    ip: '50.112.00.11',
    identity: '-',
    authUser: 'admin',
    timestamp: '11/Jul/2018:17:31:56 +0200',
    method: 'GET',
    path: '/asset.js',
    protocol: 'HTTP/1.1',
    statusCode: 200,
    responseSize: 3574,
    userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6'
  }
];


export const validLogEntriesWithAdmin: LogEntry[] = [
  ...validLogEntries,
  ...adminLogEntries
]


// Array of log entries with error status codes
export const validLogEntriesWithErrorStatusCodes: LogEntry[] = [
  {
    ip: '72.44.32.11',
    identity: '-',
    authUser: '-',
    timestamp: '11/Jul/2018:17:42:07 +0200',
    method: 'GET',
    path: '/to-an-error',
    protocol: 'HTTP/1.1',
    statusCode: 500,
    responseSize: 3574,
    userAgent: 'Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0'
  },
  {
    ip: '168.41.191.41',
    identity: '-',
    authUser: '-',
    timestamp: '11/Jul/2018:17:41:30 +0200',
    method: 'GET',
    path: '/this/page/does/not/exist/',
    protocol: 'HTTP/1.1',
    statusCode: 404,
    responseSize: 3574,
    userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
  }
];

// Array of log entries with redirect status codes
export const validLogEntriesWithRedirectStatusCodes: LogEntry[] = [
  {
    ip: '168.41.191.43',
    identity: '-',
    authUser: '-',
    timestamp: '11/Jul/2018:17:43:40 +0200',
    method: 'GET',
    path: '/moved-permanently',
    protocol: 'HTTP/1.1',
    statusCode: 301,
    responseSize: 3574,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) RockMelt/0.9.58.494 Chrome/11.0.696.71 Safari/534.24'
  },
  {
    ip: '168.41.191.43',
    identity: '-',
    authUser: '-',
    timestamp: '11/Jul/2018:17:44:40 +0200',
    method: 'GET',
    path: '/temp-redirect',
    protocol: 'HTTP/1.1',
    statusCode: 307,
    responseSize: 3574,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) RockMelt/0.9.58.494 Chrome/11.0.696.71 Safari/534.24'
  }
];