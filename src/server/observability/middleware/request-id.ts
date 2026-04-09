import crypto from 'crypto';
import type { RequestHandler } from 'express';
import { REQUEST_ID_HEADER } from '../config';

export const attachRequestId: RequestHandler = (req, res, next) => {
  const incomingId = req.header(REQUEST_ID_HEADER);
  const requestId = incomingId && incomingId.trim().length > 0
    ? incomingId
    : crypto.randomUUID();

  res.setHeader(REQUEST_ID_HEADER, requestId);
  next();
};
