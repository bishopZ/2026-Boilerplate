import type { Request, Response } from 'express';
import { getRequestId, log } from './logger';

type AuditFields = Record<string, unknown>;

/**
 * Emits a structured audit line (`audit.event`) for security-relevant HTTP actions.
 * Extend with domain events at controllers or services as needed.
 */
export const writeAuditEvent = (
  event: string,
  req: Request,
  res: Response,
  fields: AuditFields = {}
) => {
  log.info('audit.event', {
    ...fields,
    event,
    ip: req.ip ?? 'unknown-ip',
    method: req.method,
    path: req.path,
    requestId: getRequestId(req, res),
    userAgent: req.get('user-agent') ?? 'unknown-user-agent',
  });
};
