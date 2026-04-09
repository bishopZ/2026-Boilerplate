import type { RequestHandler } from 'express';
import { getRequestId, log } from '../logger';

export const requestLogger: RequestHandler = (req, res, next) => {
  const start = performance.now();

  res.on('finish', () => {
    const durationMs = Math.round(performance.now() - start);
    log.info('http.request.completed', {
      durationMs,
      method: req.method,
      path: req.path,
      requestId: getRequestId(req, res),
      statusCode: res.statusCode,
    });
  });

  next();
};
