import { useLocation } from 'react-router';
import { META } from '../../utilities/constants';

interface PageMetaProps {
  title: string;
  description: string;
}

const getCanonicalUrl = (pathname: string) => {
  if (typeof window === 'undefined') {
    return `${META.FALLBACK}${pathname}`;
  }

  return new URL(pathname, window.location.origin).toString();
};

export const PageMeta = ({ title, description }: PageMetaProps) => {
  const { pathname } = useLocation();
  const canonicalUrl = getCanonicalUrl(pathname);
  const imageAlt = `${title} Preview`;

  return (
    <>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content={META.AUTHOR} />
      <meta name="keywords" content={META.KEYWORDS} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={META.LANGUAGE} />
      <meta name="revisit-after" content={META.REVISIT_AFTER} />
      <meta name="generator" content={META.GENERATOR} />

      <meta property="og:type" content={META.OG_TYPE} />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={META.PREVIEW_IMAGE} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={META.LOCALE} />

      <meta name="twitter:card" content={META.TWITTER_CARD} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={META.PREVIEW_IMAGE} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content={META.TWITTER_SITE} />

      <meta name="theme-color" content={META.THEME_COLOR} />
      <meta name="mobile-web-app-capable" content={META.MOBILE_WEB_APP_CAPABLE} />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="apple-mobile-web-app-status-bar-style" content={META.APPLE_STATUS_BAR_STYLE} />
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
};
