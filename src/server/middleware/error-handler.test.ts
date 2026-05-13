import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { globalErrorHandler } from './error-handler';
import type { ApiErrorResponse } from '../config/api-error';

const makeReq = (path: string, method = 'GET'): Partial<Request> =>
  ({ path, method }) as Partial<Request>;

const makeRes = () => {
  const res = {
    status: vi.fn(),
    json: vi.fn(),
    redirect: vi.fn(),
  };
  // Allow chaining: res.status(n).json(...)
  res.status.mockReturnValue(res);
  res.json.mockReturnValue(res);
  res.redirect.mockReturnValue(res);
  return res;
};

const makeNext = (): NextFunction => vi.fn() as NextFunction;

const makeErr = (overrides: Partial<ApiErrorResponse & Error> = {}): ApiErrorResponse & Error => ({
  status: 500,
  code: 'INTERNAL_ERROR',
  message: 'Something went wrong',
  name: 'Error',
  ...overrides,
} as ApiErrorResponse & Error);

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

describe('globalErrorHandler', () => {
  describe('API routes (/api/*)', () => {
    it('responds with JSON and the error status', () => {
      const err = makeErr({ status: 403, code: 'FORBIDDEN', message: 'Access denied' });
      const req = makeReq('/api/session');
      const res = makeRes();

      globalErrorHandler(err, req as Request, res as unknown as Response, makeNext());

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 403, code: 'FORBIDDEN', message: 'Access denied' })
      );
    });

    it('falls back to an INTERNAL_ERROR shape when code is absent', () => {
      const err = { status: 500, message: 'Oops', name: 'Error' } as ApiErrorResponse & Error;
      const req = makeReq('/api/key');
      const res = makeRes();

      globalErrorHandler(err, req as Request, res as unknown as Response, makeNext());

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ code: 'INTERNAL_ERROR' })
      );
    });
  });

  describe('Page routes (non-/api/*)', () => {
    it('redirects to the home route', () => {
      const err = makeErr({ status: 404 });
      const req = makeReq('/some-page');
      const res = makeRes();

      globalErrorHandler(err, req as Request, res as unknown as Response, makeNext());

      expect(res.redirect).toHaveBeenCalledWith('/');
      expect(res.json).not.toHaveBeenCalled();
    });

    it('sets the error status code on the redirect', () => {
      const err = makeErr({ status: 404 });
      const req = makeReq('/missing');
      const res = makeRes();

      globalErrorHandler(err, req as Request, res as unknown as Response, makeNext());

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
