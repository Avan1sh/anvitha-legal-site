import type { APIRoute } from 'astro';
import { indexingEnabled } from '../lib/indexing';

export const GET: APIRoute = ({ site }) => {
  const enabled = indexingEnabled(site);
  const rules = enabled
    ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site ?? new URL('http://localhost:4321')).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(rules, {
    headers: { 'content-type': 'text/plain; charset=utf-8' }
  });
};
