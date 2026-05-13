import { describe, it, expect } from 'vitest';
import { createApiError, API_ERRORS } from './api-error';

describe('createApiError', () => {
  it('returns an object with status, code, and message', () => {
    const error = createApiError(404, 'NOT_FOUND', 'Thing not found');
    expect(error).toEqual({ status: 404, code: 'NOT_FOUND', message: 'Thing not found' });
  });
});

describe('API_ERRORS', () => {
  describe('unauthorized', () => {
    it('returns 401 with UNAUTHORIZED code', () => {
      const err = API_ERRORS.unauthorized();
      expect(err.status).toBe(401);
      expect(err.code).toBe('UNAUTHORIZED');
      expect(err.message).toBeTruthy();
    });
  });

  describe('forbidden', () => {
    it('uses the default message when none is given', () => {
      const err = API_ERRORS.forbidden();
      expect(err.status).toBe(403);
      expect(err.code).toBe('FORBIDDEN');
      expect(err.message).toBe('Access denied');
    });

    it('uses the supplied custom message', () => {
      const err = API_ERRORS.forbidden('CSRF token validation failed');
      expect(err.message).toBe('CSRF token validation failed');
    });
  });

  describe('notFound', () => {
    it('interpolates the default resource name', () => {
      const err = API_ERRORS.notFound();
      expect(err.status).toBe(404);
      expect(err.message).toContain('Resource');
    });

    it('interpolates a custom resource name', () => {
      const err = API_ERRORS.notFound('User');
      expect(err.message).toBe('User not found');
    });
  });

  describe('validation', () => {
    it('returns 422 with VALIDATION_ERROR code', () => {
      const err = API_ERRORS.validation('Email is invalid');
      expect(err.status).toBe(422);
      expect(err.code).toBe('VALIDATION_ERROR');
      expect(err.message).toBe('Email is invalid');
    });
  });

  describe('internal', () => {
    it('returns 500 with INTERNAL_ERROR code', () => {
      const err = API_ERRORS.internal();
      expect(err.status).toBe(500);
      expect(err.code).toBe('INTERNAL_ERROR');
    });

    it('uses a custom message when provided', () => {
      const err = API_ERRORS.internal('Database unavailable');
      expect(err.message).toBe('Database unavailable');
    });
  });
});
