# Instrucciones SEO para construir la web (Astro + Tailwind)

> Para el agente que construya la web. Contexto y fuentes en `research/seo-geo-aeo.md`.
> Reglas: **no cambies el copy** (`copy/es.md` y `copy/en.md` son definitivos). **No tomes las decisiones marcadas como `PENDIENTE (Dn)`**: implementa la opción indicada como "por defecto" si se dice que la hay y deja un `TODO(Dn)` en el código; si no la hay, pregunta a Ysst.
> Versiones comprobadas el 12 de noviembre de 2026: `astro` 7.4.11, `@astrojs/sitemap` 3.7.4, `@tailwindcss/vite` 4.3.5, Node ≥ 22.12.

## 0. Placeholders

Todos los datos que aún no existen van con este formato y **no se pueden publicar** sin sustituirlos (la sección 13 incluye una comprobación con `grep`):

| Placeholder | Qué es | Depende de |
|---|---|---|
| `{{DOMINIO}}` | `limpiezasmioara.es` (pendiente de confirmar que está libre) | Ysst |
| `{{TELEFONO_E164}}` | Teléfono y WhatsApp en formato `+34XXXXXXXXX` | Ysst |
| `{{TELEFONO_WA}}` | El mismo número sin `+` ni espacios, para `wa.me` | Ysst |
| `{{TELEFONO_VISIBLE}}` | El mismo número con espacios, para mostrarlo (`+34 6XX XXX XXX`) | Ysst |
| `{{NIF}}` | NIF del titular | Titular legal |
| `{{NOMBRE_LEGAL}}` | Nombre y apellidos o razón social del titular | Titular legal |
| `{{URL_GBP}}` | URL pública del perfil de Google Business (enlace de "Compartir" o `https://www.google.com/maps?cid=...`) | GBP verificado |
| `{{URL_RESENA_GBP}}` | Enlace para pedir reseñas | GBP verificado |
| `{{SAMEAS_*}}` | URL de perfiles en terceros (Bing Places, Apple, Cronoshare, Habitissimo, redes sociales) | Después de crearlos |
| `{{INDEXNOW_KEY}}` | Clave de IndexNow (de 8 a 128 caracteres hexadecimales) | Generar al desplegar |
| `{{IDIOMAS_MIOARA}}` | Idiomas en que atiende Mioara (por ejemplo `["es"]` o `["es","en"]`) | PENDIENTE (D4) |

Mientras no existan, los elementos de schema con `{{SAMEAS_*}}`, `{{URL_GBP}}`, `{{NIF}}` o `{{NOMBRE_LEGAL}}` se **omiten**; no se publican vacíos ni con valores inventados.

---

## 1. URLs e i18n

**PENDIENTE (D1)**. Por defecto, opción 1: castellano en la raíz e inglés en `/en/`.

| Página | ES | EN |
|---|---|---|
| Inicio (one-page) | `/` | `/en/` |
| Aviso legal | `/aviso-legal/` | `/en/legal-notice/` (PENDIENTE: ¿hace falta en EN?) |
| Privacidad | `/privacidad/` | `/en/privacy/` |
| 404 | `/404.html` (Astro lo excluye del sitemap) | — |

- Barra final **siempre** (`/en/`, no `/en`). Hay que comprobar que el hosting redirige la variante sin barra con 301 o 308.
- Host único: `https://{{DOMINIO}}` sin `www` (o al revés, pero solo uno), con redirección 301 desde la otra variante.
- Nada de redirección automática por idioma ni por IP.
- Las secciones de la one-page llevan `id` estables para los enlaces de anclaje: `#servicios`, `#como-funciona`, `#garantia`, `#sobre-mi`, `#zonas`, `#preguntas`, `#contacto` (en EN: `#services`, `#how-it-works`, `#guarantee`, `#about`, `#areas`, `#faq`, `#contact`).

`astro.config.mjs` (base):

```js
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://{{DOMINIO}}',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false }, // ES en la raíz (D1)
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  // fonts: [...]  ver la sección 7
});
```

---

## 2. Etiquetas `<head>` por idioma

Crea un componente `src/components/SeoHead.astro` que reciba `lang`, `title`, `description`, `path` y `alternates`, y construye **todas** las URL absolutas a partir de `Astro.site` (no de `Astro.url.pathname`, para no duplicar prefijos de idioma).

Title y description: **literales del copy** (`## SEO` de cada archivo).

### ES (`/`)

```html
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Limpieza de apartamentos turísticos en Cullera, la Ribera y València | Limpiezas Mioara</title>
  <meta name="description" content="Limpieza entre huéspedes para tu piso de Airbnb o Booking: cambio de ropa de cama, reposición y fotos al terminar. Cullera, Sueca, la Ribera y el sur de València. Escríbeme por WhatsApp.">
  <link rel="canonical" href="https://{{DOMINIO}}/">
  <link rel="alternate" hreflang="es" href="https://{{DOMINIO}}/">
  <link rel="alternate" hreflang="en" href="https://{{DOMINIO}}/en/">
  <link rel="alternate" hreflang="x-default" href="https://{{DOMINIO}}/">
  <meta name="robots" content="index, follow, max-image-preview:large">

  <!-- Open Graph (WhatsApp, Facebook y LinkedIn lo usan para la vista previa del enlace) -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Limpiezas Mioara">
  <meta property="og:locale" content="es_ES">
  <meta property="og:locale:alternate" content="en_GB">
  <meta property="og:url" content="https://{{DOMINIO}}/">
  <meta property="og:title" content="Limpieza de apartamentos turísticos en Cullera, la Ribera y València | Limpiezas Mioara">
  <meta property="og:description" content="(la misma meta description)">
  <meta property="og:image" content="https://{{DOMINIO}}/og/og-es.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="(descripción de la imagen; ver la sección 6)">

  <!-- X/Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="(igual que og:title)">
  <meta name="twitter:description" content="(igual que og:description)">
  <meta name="twitter:image" content="https://{{DOMINIO}}/og/og-es.jpg">

  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png"><!-- 180x180 -->
  <meta name="theme-color" content="(color de la marca, cuando esté decidido el diseño)">

  <script type="application/ld+json">/* sección 3 */</script>
</head>
```

### EN (`/en/`)

Igual, cambiando: `lang="en"`, title y description del `copy/en.md`, `canonical` → `https://{{DOMINIO}}/en/`, `og:url` → `/en/`, `og:locale` `en_GB` (el copy usa ortografía británica), `og:locale:alternate` `es_ES` y `og:image` → `/og/og-en.jpg`. **El bloque de hreflang es idéntico en las dos páginas** (recíproco, con autorreferencia y `x-default` → `/`).

### Reglas
- Un solo `<title>`, una sola `meta description` y un solo `canonical` por página.
- Canonical **autorreferente** en cada idioma; nunca de EN a ES.
- Las páginas legales llevan su propio canonical y su par de hreflang ES/EN (si existe la versión EN). **PENDIENTE (D11):** por defecto, indexables.
- Previews y staging: si la variable `PUBLIC_NOINDEX=true`, emitir `<meta name="robots" content="noindex, nofollow">`. En producción esa variable **no** debe existir. Además, comprobar el encabezado `X-Robots-Tag` que pone el hosting en las previews.
- Imágenes OG: 1200×630, JPG de menos de 300 KB, servidas desde `public/og/` (con URL estable, sin hash). Comprobar que la vista previa de WhatsApp las muestra.

---

## 3. JSON-LD (un `@graph` por página)

**Importante:**
- `CleaningService` **no existe** en schema.org. Usa `LocalBusiness`.
- **Sin dirección postal** (negocio de área de servicio). **PENDIENTE (D3):** por defecto, sin `address`. No inventes direcciones para que el validador no dé avisos.
- Todo lo que vaya en el JSON-LD tiene que **verse en la página** con el mismo texto (sobre todo la FAQ). Si algo no se muestra (horario, teléfono), no se marca, salvo que Ysst decida mostrarlo.
- No pongas `AggregateRating` ni `Review` (serían reseñas sobre el propio negocio, que Google no admite).
- Mismos `@id` en las dos páginas para `#website`, `#business` y `#mioara`; los nodos `WebPage` y `FAQPage` son propios de cada idioma.
- Genera el JSON con `JSON.stringify` desde un objeto en TypeScript (`src/lib/schema.ts`). No lo escribas a mano en el HTML. Inserta con `<script type="application/ld+json" set:html={JSON.stringify(graph)} />`.

### Ejemplo completo (página ES)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://{{DOMINIO}}/#website",
      "url": "https://{{DOMINIO}}/",
      "name": "Limpiezas Mioara",
      "alternateName": "Mioara · Limpieza de apartamentos turísticos",
      "inLanguage": ["es", "en"],
      "publisher": { "@id": "https://{{DOMINIO}}/#business" }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://{{DOMINIO}}/#business",
      "name": "Limpiezas Mioara",
      "alternateName": "Mioara · Limpieza de apartamentos turísticos",
      "description": "Limpieza entre huéspedes de apartamentos turísticos (Airbnb, Booking) en Cullera, El Perelló, la Ribera, Horta Sud y el sur de València.",
      "url": "https://{{DOMINIO}}/",
      "telephone": "{{TELEFONO_E164}}",
      "image": "https://{{DOMINIO}}/og/og-es.jpg",
      "logo": "https://{{DOMINIO}}/logo.png",
      "founder": { "@id": "https://{{DOMINIO}}/#mioara" },
      "areaServed": [
        { "@type": "City", "name": "Cullera" },
        { "@type": "Place", "name": "El Perelló" },
        { "@type": "Place", "name": "El Palmar" },
        { "@type": "Place", "name": "El Saler" },
        { "@type": "City", "name": "Sueca" },
        { "@type": "City", "name": "Alzira" },
        { "@type": "City", "name": "Algemesí" },
        { "@type": "City", "name": "Almussafes" },
        { "@type": "City", "name": "Benifaió" },
        { "@type": "City", "name": "Sollana" },
        { "@type": "City", "name": "Alginet" },
        { "@type": "City", "name": "Silla" },
        { "@type": "City", "name": "Catarroja" },
        { "@type": "City", "name": "Albal" },
        { "@type": "City", "name": "Alfafar" },
        { "@type": "City", "name": "Picassent" },
        { "@type": "City", "name": "Torrent" },
        { "@type": "City", "name": "València" },
        { "@type": "AdministrativeArea", "name": "La Ribera" },
        { "@type": "AdministrativeArea", "name": "Horta Sud" }
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Limpieza entre huéspedes",
            "serviceType": "Limpieza de apartamentos turísticos",
            "description": "Limpieza completa, cambio de ropa de cama y toallas, reposición de básicos, revisión de daños y objetos olvidados, y fotos por WhatsApp al terminar."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Limpieza a fondo",
            "serviceType": "Limpieza a fondo de vivienda",
            "description": "Antes o después de la temporada, o por mudanza."
          }
        }
      ],
      "knowsLanguage": {{IDIOMAS_MIOARA}},
      "hasMap": "{{URL_GBP}}",
      "sameAs": ["{{URL_GBP}}", "{{SAMEAS_BING}}", "{{SAMEAS_APPLE}}", "{{SAMEAS_CRONOSHARE}}"],
      "legalName": "{{NOMBRE_LEGAL}}",
      "taxID": "{{NIF}}"
    },
    {
      "@type": "Person",
      "@id": "https://{{DOMINIO}}/#mioara",
      "name": "Mioara",
      "jobTitle": "Limpieza de apartamentos turísticos",
      "image": "https://{{DOMINIO}}/images/mioara.jpg",
      "worksFor": { "@id": "https://{{DOMINIO}}/#business" },
      "knowsLanguage": {{IDIOMAS_MIOARA}}
    },
    {
      "@type": "WebPage",
      "@id": "https://{{DOMINIO}}/#webpage",
      "url": "https://{{DOMINIO}}/",
      "name": "Limpieza de apartamentos turísticos en Cullera, la Ribera y València | Limpiezas Mioara",
      "inLanguage": "es",
      "isPartOf": { "@id": "https://{{DOMINIO}}/#website" },
      "about": { "@id": "https://{{DOMINIO}}/#business" },
      "primaryImageOfPage": "https://{{DOMINIO}}/og/og-es.jpg"
    },
    {
      "@type": "FAQPage",
      "@id": "https://{{DOMINIO}}/#faq",
      "inLanguage": "es",
      "isPartOf": { "@id": "https://{{DOMINIO}}/#webpage" },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto cuesta?",
          "acceptedAnswer": { "@type": "Answer", "text": "Depende del tamaño del piso y de cada cuánto haya salidas. Escríbeme por WhatsApp y te doy precio sin compromiso." }
        },
        {
          "@type": "Question",
          "name": "¿Recoges o entregas llaves?",
          "acceptedAnswer": { "@type": "Answer", "text": "No. Lo ideal es una caja de llaves o una cerradura con código, así puedo entrar cuando sale el huésped." }
        }
        // ... las 6 preguntas del copy, texto literal, generadas desde la misma fuente que el HTML
      ]
    }
  ]
}
```

(El comentario `// ...` es solo para este documento; el JSON real no lleva comentarios.)

Notas del ejemplo:
- `areaServed` = exactamente los lugares que nombra el bloque "Zonas" del copy (más "La Ribera" y "Horta Sud" como comarcas). No añadas los 40 pueblos.
- **Mientras no existan**, quita `hasMap`, las entradas vacías de `sameAs`, `legalName` y `taxID`. Si `sameAs` se queda vacío, quítalo también.
- `knowsLanguage`: **PENDIENTE (D4)**. Si no está decidido, omítelo.
- `telephone`: el copy no muestra el número en texto (solo el botón de WhatsApp). **PENDIENTE:** proponer a Ysst mostrar `{{TELEFONO_VISIBLE}}` en el pie, porque refuerza la coherencia del NAP. Si no lo acepta, se puede mantener `telephone`, ya que el número sale en el enlace de `wa.me`, pero hay que avisarle.
- Horario: el copy no lo muestra. **No** añadas `openingHoursSpecification` salvo que Ysst decida mostrarlo; tiene que coincidir con el del GBP.
- `logo.png`: cuadrado y de al menos 112×112 px, cuando exista el logo.
- **EN:** los mismos nodos `WebSite`, `LocalBusiness` y `Person`, con `description` y `name` de los servicios en inglés (traducción fiel del copy EN), más `WebPage` `https://{{DOMINIO}}/en/#webpage` (`inLanguage: "en"`) y `FAQPage` `https://{{DOMINIO}}/en/#faq` con las preguntas del copy EN.
- Páginas legales: solo `WebPage` (con `isPartOf` → `#website`), sin `FAQPage`.

---

## 4. Jerarquía de encabezados (por idioma)

| Nivel | Contenido (literal del copy) |
|---|---|
| H1 (uno solo) | Hero: "Limpieza de apartamentos turísticos en la Ribera, Cullera y València" / "Holiday rental cleaning in Cullera, la Ribera and Valencia" |
| H2 | Qué hago en cada limpieza · Así trabajamos · Si algo no queda bien, lo repito gratis · Soy Mioara · Dónde trabajo · Preguntas frecuentes · ¿Hablamos? |
| H3 | Cada servicio (opcional), cada paso de "Cómo funciona" (opcional), cada **pregunta** de la FAQ (obligatorio) y cada grupo de zonas (Costa, Ribera, Horta Sud, València) |

- El logo o nombre de la cabecera **no** es un encabezado (`<a>` con texto o `<p>`).
- No saltes niveles (de H2 a H4) ni uses encabezados para dar estilo.
- FAQ: se puede usar `<details><summary><h3>…</h3></summary><p>…</p></details>`. El HTML permite un encabezado dentro de `summary`, y el contenido plegado sigue estando en el HTML, así que se indexa. Alternativa: todo desplegado.
- Zonas: lista HTML (`<ul>`) con los pueblos en texto, nunca en una imagen o un mapa sin texto.
- Usa HTML semántico: `<header>`, `<nav>` (si hay menú), `<main>`, `<section aria-labelledby="...">` y `<footer>`.

### Pie (NAP)
Nombre ("Limpiezas Mioara"), zona de servicio en texto ("Cullera, la Ribera, Horta Sud y el sur de València"), WhatsApp (y `{{TELEFONO_VISIBLE}}` si Ysst lo aprueba), enlaces a Aviso legal y Privacidad, y selector de idioma. Cuando exista el GBP: enlace "Ver reseñas en Google" → `{{URL_GBP}}` (PENDIENTE: es texto nuevo, requiere el OK de Ysst).

---

## 5. Enlaces y CTA

- WhatsApp: `https://wa.me/{{TELEFONO_WA}}?text=` + `encodeURIComponent(mensaje prellenado del copy, en el idioma de la página)`. Texto del enlace: el del copy ("Escríbeme por WhatsApp"). Si el botón fijo del móvil es solo un icono, ponle `aria-label` con ese mismo texto.
- `rel="noopener"` en enlaces externos; nada de `nofollow` en los enlaces a perfiles propios (GBP, etc.).
- Selector de idioma: `<a href="/en/" hreflang="en" lang="en">English</a>` / `<a href="/" hreflang="es" lang="es">Español</a>`. Enlace normal, sin JS. Si se está en `/aviso-legal/`, el selector lleva a su equivalente EN.
- Enlaces internos con barra final y sin dominio (`/en/`, `/aviso-legal/`).

---

## 6. Imágenes y `alt`

- Todas las imágenes del contenido con `astro:assets` (`<Image>` o `<Picture>`) desde `src/assets/`: genera AVIF o WebP, `width` y `height` (sin CLS) y `srcset`.
- La imagen del hero, si la hay (el elemento LCP), lleva la prop `priority` (añade `loading="eager"`, `decoding="sync"` y `fetchpriority="high"`). El resto, en carga diferida (por defecto).
- Peso orientativo: LCP de menos de unos 120 KB en el móvil; resto de menos de unos 80 KB cada una.
- Nombre de archivo descriptivo en kebab-case: `mioara-limpieza-apartamentos-turisticos.jpg`, `cama-hecha-apartamento-cullera.jpg` (solo si de verdad es de Cullera).
- `alt` descriptivo, en el idioma de la página y sin relleno de palabras clave. Ejemplos:
  - Retrato: ES "Mioara, de Limpiezas Mioara, en un apartamento recién limpiado" / EN "Mioara from Limpiezas Mioara in a freshly cleaned apartment" (ajústalo a lo que muestre la foto real).
  - Detalle de cama: "Cama hecha con sábanas blancas y toallas dobladas" / "Freshly made bed with white linen and folded towels".
  - Imágenes decorativas: `alt=""`.
- Mientras no haya fotos reales (PENDIENTE), nada de imágenes de stock que se hagan pasar por trabajos de Mioara.
- Para la URL absoluta de una imagen en el JSON-LD: o bien un archivo estable en `public/images/`, o bien `getImage()` y `new URL(img.src, Astro.site)`.

---

## 7. Rendimiento

Presupuesto (página ES, móvil, primera carga):

| Recurso | Límite |
|---|---|
| JS de cliente | **0 KB** de framework. Islas de Astro: ninguna. Si hiciera falta algún script (por ejemplo, la analítica de la opción 1), menos de 5 KB, `defer` y de terceros solo si se ha aprobado |
| CSS | Tailwind v4 purgado; menos de unos 20 KB comprimido |
| Fuentes | Como mucho 2 familias y 3 archivos `woff2`, autoalojadas |
| Peso total transferido | Menos de unos 500 KB |
| Lighthouse (móvil) | Rendimiento ≥ 95, Accesibilidad ≥ 95, Buenas prácticas ≥ 95, SEO = 100 |
| Core Web Vitals (laboratorio) | LCP < 2,5 s, CLS < 0,1, TBT < 200 ms (el TBT sustituye en laboratorio al INP) |

Fuentes con la API de fuentes de Astro 7 (configuración `fonts`, componente `<Font>` de `astro:assets`):

```js
// astro.config.mjs
fonts: [
  {
    provider: fontProviders.google(), // las descarga en el build y las sirve desde el propio dominio
    name: '(familia elegida en el diseño)',
    cssVariable: '--font-sans',
    weights: [400, 700],
    subsets: ['latin'],
    fallbacks: ['system-ui', 'sans-serif'],
  },
],
```

```astro
---
import { Font } from 'astro:assets';
---
<Font cssVariable="--font-sans" preload />
```

- **Ninguna petición en tiempo de ejecución a `fonts.googleapis.com` ni a `fonts.gstatic.com`** (envía la IP del visitante a Google; hay jurisprudencia europea en contra). Compruébalo en `dist/` (sección 13).
- Precarga solo la fuente del texto principal y el peso que se use por encima del pliegue.
- Sin carruseles, sin librerías de animación y sin vídeo de fondo.
- `build.inlineStylesheets: 'auto'` (por defecto) para que el CSS pequeño vaya en línea.

---

## 8. Sitemap

- `@astrojs/sitemap` con la configuración de la sección 1. Genera `dist/sitemap-index.xml` y `dist/sitemap-0.xml`.
- La raíz y `/en/` deben salir como alternates `xhtml:link` entre sí. Las páginas legales con slugs distintos (`/aviso-legal/` frente a `/en/legal-notice/`) **no** se emparejan en el sitemap; su hreflang va en el `<head>`, y con eso basta.
- La 404 queda excluida automáticamente.
- Añade en el `<head>` `<link rel="sitemap" href="/sitemap-index.xml">` (opcional).

---

## 9. robots.txt

`public/robots.txt`. **PENDIENTE (D5).** Por defecto, la variante A.

**Variante A (permitir todo):**

```txt
User-agent: *
Allow: /

Sitemap: https://{{DOMINIO}}/sitemap-index.xml
```

**Variante B (permitir buscadores y bots de búsqueda de IA, bloquear entrenamiento):**

```txt
User-agent: *
Allow: /

# Entrenamiento de modelos (no afecta a su aparición en buscadores)
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

Sitemap: https://{{DOMINIO}}/sitemap-index.xml
```

En cualquier variante **no se pueden bloquear**: `Googlebot`, `Bingbot`, `OAI-SearchBot`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Applebot`, `DuckDuckBot`.
No uses `anthropic-ai` ni `Claude-Web` (están obsoletos).
Si el hosting o el DNS es **Cloudflare**: desactiva o revisa el bloqueo de bots de IA y el "robots.txt gestionado", que si no **sobrescriben** esta política.

---

## 10. llms.txt (opcional)

**PENDIENTE (D6).** No hay pruebas de que lo usen los buscadores grandes. Si Ysst dice que sí, crea `public/llms.txt` con datos que **ya** estén en la web (sin texto nuevo de marketing):

```markdown
# Limpiezas Mioara

> Mioara · Limpieza de apartamentos turísticos. Limpieza entre huéspedes de pisos turísticos (Airbnb, Booking) en Cullera, El Perelló, la Ribera, Horta Sud y el sur de València. Contacto por WhatsApp. Sin precios publicados.

- [Web en castellano](https://{{DOMINIO}}/): servicios, cómo funciona, garantía, zonas y preguntas frecuentes
- [Website in English](https://{{DOMINIO}}/en/): services, how it works, guarantee, areas and FAQ
```

---

## 11. IndexNow

1. Genera `{{INDEXNOW_KEY}}` (por ejemplo, `openssl rand -hex 16`) y crea `public/{{INDEXNOW_KEY}}.txt` con la clave como único contenido.
2. **Después de cada despliegue a producción** (no durante el build, porque las URL aún no estarían publicadas), ejecuta `scripts/indexnow.mjs`:

```js
// scripts/indexnow.mjs — node scripts/indexnow.mjs
const host = '{{DOMINIO}}';
const key = '{{INDEXNOW_KEY}}';
const urlList = [
  `https://${host}/`,
  `https://${host}/en/`,
  `https://${host}/aviso-legal/`,
  `https://${host}/privacidad/`,
];
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(res.status); // 200 o 202 = correcto
```

Alternativa (PENDIENTE de Ysst): la integración de la comunidad `astro-indexnow` (2.3.x, compatible con Astro 7). La envía durante el build, así que solo conviene si el build y el despliegue son atómicos en CI. IndexNow **no** avisa a Google.

---

## 12. Accesibilidad que afecta al SEO

- `<html lang>` correcto en cada página; `lang` en los fragmentos en otro idioma (el selector de idioma).
- Enlace "Saltar al contenido" (`#main`), foco visible y navegación completa con teclado.
- Contraste AA (4,5:1 en el texto normal), cuerpo de 16 px o más y zonas táctiles de 44 px o más (el botón de WhatsApp fijo no debe tapar contenido ni el pie).
- Texto real, nunca en imágenes; textos de enlace descriptivos (nada de "pincha aquí").
- `prefers-reduced-motion` respetado.
- Nada de contenido que dependa de JS para mostrarse.

---

## 13. Checklist final de verificación

Marca cada punto antes de entregar. **Los que dependen de producción se hacen tras publicar.**

### Build y HTML
- [ ] `npx astro check` sin errores; `npm run build` sin avisos de i18n ni de sitemap.
- [ ] `grep -rn "{{" dist/` → **0 resultados** antes de publicar (ningún placeholder sin sustituir). Mientras siga habiendo placeholders legales, la web **no se publica**.
- [ ] Cada HTML de `dist/` tiene exactamente un `<h1>`: `grep -c "<h1" dist/index.html dist/en/index.html`.
- [ ] Cada página tiene un `<title>`, una `meta description` y un `canonical` absoluto con barra final.
- [ ] hreflang: `/` y `/en/` tienen **el mismo** bloque `es`, `en` y `x-default`, recíproco y autorreferente.
- [ ] Ningún `noindex` en producción: `grep -rn "noindex" dist/` → 0 (salvo en la 404, si se ha puesto ahí a propósito).
- [ ] El JSON-LD se parsea: extraer cada bloque `application/ld+json` y pasarlo por `JSON.parse` (script de Node o `jq`).
- [ ] El texto de la FAQ en el JSON-LD es **idéntico** al visible (se genera desde la misma fuente).
- [ ] No hay referencias a `fonts.googleapis.com` ni a `fonts.gstatic.com`: `grep -rn "fonts.g" dist/` → 0.
- [ ] JS: `find dist -name "*.js" | xargs du -ch` → 0 (o dentro del presupuesto aprobado).
- [ ] `dist/robots.txt`, `dist/sitemap-index.xml` y `dist/sitemap-0.xml` existen; el sitemap contiene `/` y `/en/` con `xhtml:link`.
- [ ] HTML válido: [W3C Nu HTML Checker](https://validator.w3.org/nu/).

### Validadores
- [ ] [Schema Markup Validator](https://validator.schema.org/): 0 errores en ES y EN.
- [ ] [Rich Results Test de Google](https://search.google.com/test/rich-results): sin errores de sintaxis. *Es normal* que "Negocio local" pida `address`: **no se añade una dirección para contentarlo**. La FAQ ya no aparece como resultado enriquecido (retirada en mayo de 2026); eso no es un error.
- [ ] Lighthouse o [PageSpeed Insights](https://pagespeed.web.dev/) en móvil: se cumple el presupuesto de la sección 7.
- [ ] Accesibilidad: axe DevTools o [WAVE](https://wave.webaim.org/) sin errores.
- [ ] Vista previa de enlaces: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/), [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) y una prueba real enviando el enlace por WhatsApp (ES y EN).
- [ ] hreflang: comprobar con una herramienta de pruebas de hreflang (por ejemplo, la de Merkle o el informe de Ahrefs Webmaster Tools) o a mano con `curl`.

### Producción (tras publicar; depende del titular legal)
- [ ] `curl -sI http://{{DOMINIO}}/en` → 301 o 308 hacia `https://{{DOMINIO}}/en/`; `www` → apex (o al revés), en un solo salto.
- [ ] El subdominio del hosting (`*.vercel.app`, `*.netlify.app` o `*.pages.dev`) y las previews devuelven `X-Robots-Tag: noindex` o redirigen.
- [ ] `https://{{DOMINIO}}/robots.txt` es el nuestro (no lo ha reescrito Cloudflare u otro CDN).
- [ ] Search Console: propiedad de dominio verificada por DNS, sitemap enviado, inspección de `/` y `/en/` con "La URL está en Google" o con la indexación solicitada; revisión del informe de robots.txt.
- [ ] Bing Webmaster Tools: sitio importado desde Search Console, sitemap enviado, Site Scan sin errores graves.
- [ ] IndexNow: `scripts/indexnow.mjs` devuelve 200 o 202, y la clave es accesible en `https://{{DOMINIO}}/{{INDEXNOW_KEY}}.txt`.
- [ ] GBP verificado → sustituir `{{URL_GBP}}`, añadir `hasMap` y `sameAs`, volver a desplegar y volver a pasar los validadores.
- [ ] Coherencia del NAP: el nombre, el teléfono y la zona son idénticos en la web, el JSON-LD, el GBP, Bing Places, Apple Business y WhatsApp Business.

---

## 14. Decisiones pendientes de Ysst (no las tomes tú)

| Id | Decisión | Por defecto mientras tanto |
|---|---|---|
| D1 | Estructura de URL (`/` + `/en/` o `/es/` + `/en/`) | `/` + `/en/` |
| D3 | `address` en el schema (ninguna o solo el municipio) | Sin `address` |
| D4 | Apellido y foto real de Mioara; idiomas en que atiende (`knowsLanguage`) | Solo "Mioara"; omitir `knowsLanguage` |
| D5 | Política de bots de IA (variante A o B de `robots.txt`) | A |
| D6 | `llms.txt` sí o no | No crearlo |
| D7 | Medición (ninguna, sin cookies o GA4 con Consent Mode) | Ninguna; no añadir scripts |
| D8 | Hosting | — (no desplegar) |
| D11 | Páginas legales indexables y versión EN de los textos legales | Indexables; preguntar por la EN |
| — | Mostrar el teléfono en texto en el pie y el enlace "Ver reseñas en Google" (texto nuevo) | No añadirlos |
| — | Mostrar el horario (y marcarlo en el schema) | No mostrarlo ni marcarlo |
| — | Propuestas de copy SEO (`research/seo-geo-aeo.md` §4.4) | No aplicarlas |
| D13 | Titular legal (NIF y nombre) y fecha de publicación | Construir todo; **no publicar** |
