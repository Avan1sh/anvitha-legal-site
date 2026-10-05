import type { APIRoute } from 'astro';
import { practicePath, workAreas } from '../lib/navigation';
import { pages, urlFor } from '../lib/site';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('http://localhost:4321');
  const pageUrls = pages.flatMap((page) => [
    new URL(urlFor(page, 'en'), origin).href,
    new URL(urlFor(page, 'hi'), origin).href
  ]);
  const areaUrls = workAreas.flatMap((area) => {
    const path = practicePath(area.group, area.slug);
    return [new URL(path, origin).href, new URL(`/hi${path}`, origin).href];
  });
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...pageUrls, ...areaUrls].map((url) => `<url><loc>${url}</loc></url>`),
    '</urlset>'
  ].join('\n');
  return new Response(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' }
  });
};
