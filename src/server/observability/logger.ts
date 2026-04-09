import type { Request, Response } from 'express';
import { REQUEST_ID_HEADER } from './config';

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  timestamp: string;
  event: string;
  [key: string]: unknown;
}

const writeLine = (entry: LogEntry) => {
  const line = `${JSON.stringify(entry)}\n`;
  if (entry.level === 'error') {
    process.stderr.write(line);
    return;
  }
  process.stdout.write(line);
};

const emit = (level: LogLevel, event: string, fields: Record<string, unknown>) => {
  writeLine({
    level,
    timestamp: new Date().toISOString(),
    event,
    ...fields,
  });
};

/**
 * Structured JSON logs (one object per line). Use `event` names as stable machine identifiers.
 */
export const log = {
  info: (event: string, fields: Record<string, unknown> = {}) => {
    emit('info', event, fields);
  },
  warn: (event: string, fields: Record<string, unknown> = {}) => {
    emit('warn', event, fields);
  },
  error: (event: string, fields: Record<string, unknown> = {}) => {
    emit('error', event, fields);
  },
};

/** Reads the request ID from the response (preferred) or incoming request header. */
export const getRequestId = (req: Request, res: Response): string => {
  const responseHeader = res.getHeader(REQUEST_ID_HEADER);
  if (typeof responseHeader === 'string') {
    return responseHeader;
  }

  const requestHeader = req.header(REQUEST_ID_HEADER);
  return requestHeader ?? 'unknown-request-id';
};
