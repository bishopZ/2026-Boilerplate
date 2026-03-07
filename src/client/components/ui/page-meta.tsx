import { useLocation } from 'react-router';
import {
  SITE_PREVIEW_IMAGE_URL,
  SITE_FALLBACK_CANONICAL_HOST,
  SITE_META_AUTHOR,
  SITE_META_KEYWORDS,
  SITE_META_LANGUAGE,
  SITE_META_REVISIT_AFTER,
  SITE_META_GENERATOR,
  SITE_META_OG_TYPE,
  SITE_META_LOCALE,
  SITE_META_TWITTER_CARD,
  SITE_META_TWITTER_SITE,
  SITE_META_THEME_COLOR,
  SITE_META_MOBILE_WEB_APP_CAPABLE,
  SITE_META_APPLE_STATUS_BAR_STYLE,
} from '../../shared/constants';

interface PageMetaProps {
  title: string;
  description: string;
}

const getCanonicalUrl = (pathname: string) => {
  if (typeof window === 'undefined') {
    return `${SITE_FALLBACK_CANONICAL_HOST}${pathname}`;
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
      <meta name="author" content={SITE_META_AUTHOR} />
      <meta name="keywords" content={SITE_META_KEYWORDS} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={SITE_META_LANGUAGE} />
      <meta name="revisit-after" content={SITE_META_REVISIT_AFTER} />
      <meta name="generator" content={SITE_META_GENERATOR} />

      <meta property="og:type" content={SITE_META_OG_TYPE} />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={SITE_PREVIEW_IMAGE_URL} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={SITE_META_LOCALE} />

      <meta name="twitter:card" content={SITE_META_TWITTER_CARD} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE_PREVIEW_IMAGE_URL} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content={SITE_META_TWITTER_SITE} />

      <meta name="theme-color" content={SITE_META_THEME_COLOR} />
      <meta name="mobile-web-app-capable" content={SITE_META_MOBILE_WEB_APP_CAPABLE} />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="apple-mobile-web-app-status-bar-style" content={SITE_META_APPLE_STATUS_BAR_STYLE} />
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
};
