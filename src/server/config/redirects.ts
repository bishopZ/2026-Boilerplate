export type RedirectStatusCode = 301 | 302 | 307 | 308;

interface RedirectRule {
  from: string;
  to: string;
  status: RedirectStatusCode;
}

const normalizeRoutePath = (routePath: string): string => {
  if (routePath === '/') {
    return routePath;
  }
  return routePath.replace(/\/+$/, '');
};

const REDIRECT_RULES: readonly RedirectRule[] = [
  {
    from: '/privacy',
    to: '/policies',
    status: 301,
  },
  {
    from: '/terms',
    to: '/policies',
    status: 301,
  },
];

const REDIRECT_LOOKUP = new Map(
  REDIRECT_RULES.map((rule) => [normalizeRoutePath(rule.from), rule])
);

export const getRedirectRule = (requestPath: string): RedirectRule | undefined => {
  return REDIRECT_LOOKUP.get(normalizeRoutePath(requestPath));
};

export const REDIRECT_CONFIGURATION_PATH = 'src/server/config/redirects.ts';
