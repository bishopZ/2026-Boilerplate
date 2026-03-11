import type { Request, Response } from 'express';
import { REQUEST_ID_HEADER } from '../config/logging';

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  timestamp: string;
  event: string;
  [key: string]: unknown;
}

const writeLog = (entry: LogEntry) => {
  const line = `${JSON.stringify(entry)}\n`;

  if (entry.level === 'error') {
    process.stderr.write(line);
    return;
  }

  process.stdout.write(line);
};

export const logInfo = (event: string, fields: Record<string, unknown> = {}) => {
  writeLog({
    level: 'info',
    timestamp: new Date().toISOString(),
    event,
    ...fields,
  });
};

export const logWarn = (event: string, fields: Record<string, unknown> = {}) => {
  writeLog({
    level: 'warn',
    timestamp: new Date().toISOString(),
    event,
    ...fields,
  });
};

export const logError = (event: string, fields: Record<string, unknown> = {}) => {
  writeLog({
    level: 'error',
    timestamp: new Date().toISOString(),
    event,
    ...fields,
  });
};

export const getRequestId = (req: Request, res: Response): string => {
  const responseHeader = res.getHeader(REQUEST_ID_HEADER);
  if (typeof responseHeader === 'string') {
    return responseHeader;
  }

  const requestHeader = req.header(REQUEST_ID_HEADER);
  return requestHeader ?? 'unknown-request-id';
};
