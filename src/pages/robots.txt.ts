// robots.txt generado en el build a partir de `site` (astro.config.mjs).
// TODO(D5): política de bots de IA pendiente de Ysst. Por defecto, variante A (permitir todo).
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
