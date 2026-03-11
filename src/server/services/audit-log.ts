import type { Request, Response } from 'express';
import { getRequestId, logInfo } from '../utilities/logger';

type AuditFields = Record<string, unknown>;

export const writeAuditEvent = (
  event: string,
  req: Request,
  res: Response,
  fields: AuditFields = {}
) => {
  logInfo('audit.event', {
    ...fields,
    event,
    ip: req.ip ?? 'unknown-ip',
    method: req.method,
    path: req.path,
    requestId: getRequestId(req, res),
    userAgent: req.get('user-agent') ?? 'unknown-user-agent',
  });
};
