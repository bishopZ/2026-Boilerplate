import { useCallback } from 'react';

/**
 * Hook for centralized error reporting.
 *
 * Wraps console.error by default. Replace the implementation with
 * Sentry, Datadog, or any other error tracking service without
 * changing the call sites.
 *
 * Usage:
 *   const reportError = useErrorReporter();
 *   reportError(error, { context: 'login' });
 */
export const useErrorReporter = () => {
  const reportError = useCallback((error: unknown, metadata?: Record<string, unknown>) => {
    const message = error instanceof Error ? error.message : String(error);

    console.error('[ErrorReporter]', message, metadata ?? '');

    // Replace with your error tracking service:
    // Sentry.captureException(error, { extra: metadata });
    // datadogRum.addError(error, metadata);
  }, []);

  return reportError;
};
