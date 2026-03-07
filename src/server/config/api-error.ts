// Structured error response shape returned by all API endpoints.
// Consumers can check `code` for programmatic error handling,
// and display `message` to the user.
export interface ApiErrorResponse {
  status: number;
  code: string;
  message: string;
}

export const createApiError = (status: number, code: string, message: string): ApiErrorResponse => ({
  status,
  code,
  message,
});

// Pre-built error factories for common HTTP error responses.
// Usage: throw API_ERRORS.notFound('User') → { status: 404, code: 'NOT_FOUND', message: 'User not found' }
export const API_ERRORS = {
  unauthorized: () => createApiError(401, 'UNAUTHORIZED', 'Authentication required'),
  forbidden: (message = 'Access denied') => createApiError(403, 'FORBIDDEN', message),
  notFound: (resource = 'Resource') => createApiError(404, 'NOT_FOUND', `${resource} not found`),
  validation: (message: string) => createApiError(422, 'VALIDATION_ERROR', message),
  internal: (message = 'An unexpected error occurred') => createApiError(500, 'INTERNAL_ERROR', message),
};
