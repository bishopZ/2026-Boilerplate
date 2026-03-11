import type { RequestHandler } from 'express';
import { getRequestId, logInfo } from '../utilities/logger';

export const requestLogger: RequestHandler = (req, res, next) => {
  const start = performance.now();

  res.on('finish', () => {
    const durationMs = Math.round(performance.now() - start);
    logInfo('http.request.completed', {
      durationMs,
      method: req.method,
      path: req.path,
      requestId: getRequestId(req, res),
      statusCode: res.statusCode,
    });
  });

  next();
};
