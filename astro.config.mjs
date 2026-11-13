// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO(dominio): confirmar que limpiezasmioara.es está libre. Este es el ÚNICO sitio
// donde aparece el dominio: canonical, hreflang, og:url, sitemap, robots.txt y JSON-LD
// se derivan de `site` (Astro.site).
const SITE = 'https://limpiezasmioara.es';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false }, // ES en la raíz, EN en /en/ (D1)
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en' } },
    }),
  ],
  // Fuentes autoalojadas (API de fuentes de Astro + archivos de los paquetes @fontsource,
  // subconjunto latin). Se copian al build y se sirven desde el propio dominio:
  // ninguna petición a Google ni en el build ni en tiempo de ejecución.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Figtree',
      cssVariable: '--font-figtree',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [400, 500, 600, 700].map((weight) => ({
          weight,
          style: 'normal',
          display: 'swap',
          src: [`@fontsource/figtree/files/figtree-latin-${weight}-normal.woff2`],
        })),
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Young Serif',
      cssVariable: '--font-young-serif',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            display: 'swap',
            src: ['@fontsource/young-serif/files/young-serif-latin-400-normal.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Kalam',
      cssVariable: '--font-kalam',
      fallbacks: ['Segoe Print', 'cursive'],
      options: {
        variants: [400, 700].map((weight) => ({
          weight,
          style: 'normal',
          display: 'swap',
          src: [`@fontsource/kalam/files/kalam-latin-${weight}-normal.woff2`],
        })),
      },
    },
  ],
  vite: { plugins: [tailwindcss()] },
});
