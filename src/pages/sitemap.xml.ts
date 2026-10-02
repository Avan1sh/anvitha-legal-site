import type { APIRoute } from 'astro';
import { pages, urlFor } from '../lib/site';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('http://localhost:4321');
  const urls = pages.flatMap((page) => [
    new URL(urlFor(page, 'en'), origin).href,
    new URL(urlFor(page, 'hi'), origin).href
  ]);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `<url><loc>${url}</loc></url>`),
    '</urlset>'
  ].join('\n');
  return new Response(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' }
  });
};
