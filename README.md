# Limpiezas Mioara · web

Web de una página (ES en `/`, EN en `/en/`) hecha con Astro 7 + Tailwind v4. HTML estático, 0 KB de JS de cliente.

## Arrancar

```bash
npm install
npm run dev       # desarrollo en http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/
```

Requiere Node ≥ 22.12.

## Dónde está cada cosa

- Copy: `src/i18n/es.ts` y `src/i18n/en.ts` (todo el texto, también el title, la meta description y el mensaje de WhatsApp).
- Componentes: `src/components/` · estilos y animaciones: `src/styles/global.css`.
- JSON-LD: `src/lib/schema.ts` (se genera desde el mismo copy que la FAQ visible).
- Referencia de diseño: `design/referencia.html`.

## Placeholders pendientes (busca `TODO` en el código)

| Qué | Dónde | Cómo cambiarlo |
|---|---|---|
| Número de WhatsApp (`34XXXXXXXXX`) | `src/config.ts` → `WHATSAPP_NUMBER` | Pon el número sin `+` ni espacios. Todos los enlaces wa.me salen de ahí. |
| Dominio | `astro.config.mjs` → `SITE` | Canonical, hreflang, sitemap, robots.txt y JSON-LD se derivan de ahí. |
| Fotos (hero y retrato) | `src/assets/` | Sustituye `cama-hecha-toallas.webp` (4:3) o `mioara-retrato.jpg` (4:5) por otra foto con el mismo nombre y proporción. Astro genera AVIF/WebP/JPG en varios tamaños. Alt en `src/i18n/`. |
| Aviso legal y Política de privacidad | Enlaces en `src/i18n/*.ts` (`footer.legal`) | Las páginas no existen todavía: crear `src/pages/aviso-legal.astro`, `politica-de-privacidad.astro` y sus versiones en `src/pages/en/` cuando haya titular (nombre y NIF). |
| Campos del JSON-LD | `src/lib/schema.ts` (TODO al principio) | Añadir teléfono, imagen/logo, `hasMap`/`sameAs` (Google Business), `legalName`/`taxID`, foto de Mioara y `knowsLanguage` cuando existan. |
| Imagen OG | `src/components/SeoHead.astro` | Añadir `public/og/og-es.jpg` y `og-en.jpg` (1200×630) y las etiquetas `og:image`/`twitter:image`. |
| Favicon | `public/favicon.svg` (provisional) | Sustituir por el definitivo y añadir `favicon.ico` y `apple-touch-icon.png`. |
| Política de bots de IA (D5) | `src/pages/robots.txt.ts` | Ahora permite todo (variante A). |

Previews/staging: con `PUBLIC_NOINDEX=true` la página sale con `noindex, nofollow`. No definir esa variable en producción.

**No publicar** hasta resolver el titular legal (aviso legal y NIF).
