/**
 * Centralized error reporting.
 *
 * All client-side error logging flows through this function.
 * Replace the implementation with Sentry, Datadog, or any other
 * error tracking service without changing call sites.
 *
 * Works in any context — React components, Redux thunks, utilities.
 */
export const reportError = (error: unknown, metadata?: Record<string, unknown>) => {
  const message = error instanceof Error ? error.message : String(error);

  console.error('[Error]', message, metadata ?? '');  

  // Replace with your error tracking service:
  // Sentry.captureException(error, { extra: metadata });
  // datadogRum.addError(error, metadata);
};
