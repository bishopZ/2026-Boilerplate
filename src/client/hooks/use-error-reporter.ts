import { useCallback } from 'react';
import { reportError } from '@/client/shared/error-reporting';

/**
 * React hook wrapper around reportError.
 * Returns a stable callback ref for use in components and effects.
 *
 * Usage:
 *   const reportError = useErrorReporter();
 *   reportError(error, { context: 'login' });
 */
export const useErrorReporter = () => {
  return useCallback((error: unknown, metadata?: Record<string, unknown>) => {
    reportError(error, metadata);
  }, []);
};
