const CSRF_COOKIE_NAME = 'csrf-token';

/** Reads the CSRF token from the cookie set by the server. */
export const getCsrfToken = (): string => {
  const pattern = new RegExp(`(?:^|;\\s*)${CSRF_COOKIE_NAME}=([^;]*)`);
  const match = pattern.exec(document.cookie);
  return match ? match[1] : '';
};
