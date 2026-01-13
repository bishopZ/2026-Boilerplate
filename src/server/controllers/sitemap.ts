import type { Request, Response } from 'express';

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getSitemap = (req: Request, res: Response): void => {
  const { protocol } = req;
  const host = req.get('host');
  const baseUrl = `${protocol}://${host ?? ''}`;
  const currentDate = formatDate(new Date());

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  res.set('Content-Type', 'application/xml');
  res.send(sitemap);
};
