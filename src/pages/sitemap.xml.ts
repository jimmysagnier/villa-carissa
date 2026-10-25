import type { APIRoute } from 'astro';

const paths = [
  '/',
  '/toutes-les-photos/',
  '/voyage-golfique-a-marrakech/',
  '/location-de-villa-a-marrakech/',
  '/contact/',
  '/mentions-legales/',
];

export const GET: APIRoute = ({ site }) => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `\n  <url><loc>${new URL(path, site).href}</loc></url>`).join('')}\n</urlset>\n`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
