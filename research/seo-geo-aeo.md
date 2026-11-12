# SEO local, otros buscadores y GEO/AEO — Limpiezas Mioara

> Investigación a 12 de noviembre de 2026. Fuentes al final de cada bloque.
> Todo lo que toca al copy son **propuestas** para que Ysst decida: el copy v1 está cerrado.
> Las instrucciones operativas para el agente que construya la web están en `docs/seo-instrucciones-build.md`.

---

## 1. Resumen ejecutivo

1. **La búsqueda más importante es la de marca, no la genérica.** El caso de uso real es: el anfitrión recibe un mensaje firmado por Mioara y la busca ("Mioara limpieza", "Limpiezas Mioara Cullera"). Ganar esa búsqueda con la web, el perfil de Google y 2–3 perfiles de terceros coherentes es barato y casi seguro. Las búsquedas genéricas ("limpieza apartamentos turísticos Cullera") son secundarias y la página de resultados la dominan marketplaces con páginas por pueblo (Cronoshare, Habitissimo).
2. **En lo local manda Google Business Profile (GBP)**, y el GBP depende del titular legal y de la verificación por vídeo. La web es la base, pero sin GBP verificado y con reseñas no habrá posición en el mapa.
3. **Una sola página por idioma es la decisión correcta para el lanzamiento.** Las páginas por pueblo sin contenido propio son el patrón que Google llama *doorway pages*. Solo tendría sentido abrir 2–3 páginas de zona (Cullera, costa de Sueca/El Perelló, València sur) más adelante y con contenido real: fotos, reseñas y logística propias de cada zona.
4. **URL propuesta:** castellano en la raíz (`/`) e inglés en `/en/`, con canonical propio en cada versión, hreflang recíproco y `x-default` apuntando a `/`. Decide Ysst.
5. **Schema.org:** `CleaningService` **no existe** en schema.org (comprobado en el vocabulario actual). Se usa `LocalBusiness` con `areaServed`, `Service` en la oferta y `Person` para Mioara, todo en un `@graph`. Sin dirección pública. Google ya no muestra resultados enriquecidos de FAQ (desde mayo de 2026), pero el marcado `FAQPage` sigue siendo válido y Google lo usa para entender la página.
6. **GEO/AEO:** según la guía oficial que Google publicó en mayo de 2026, optimizar para AI Overviews y el Modo IA "sigue siendo SEO": no hace falta llms.txt, ni "trocear" el contenido, ni marcado especial. Para ChatGPT, Copilot y Perplexity cuentan sobre todo tres cosas: no bloquear sus bots de búsqueda (OAI-SearchBot, PerplexityBot, Claude-SearchBot), estar bien indexado en **Bing** (ChatGPT busca sobre resultados de Bing) y tener menciones y reseñas coherentes en terceros.
7. **llms.txt:** hay pocas pruebas de que sirva. Según el estudio de Ahrefs, el 97 % de los archivos no recibe ni una petición, y ningún buscador grande ha confirmado que lo use. Es opcional y cuesta poco; decide Ysst.
8. **Bing importa más de lo que parece:** Bing Webmaster Tools tiene desde febrero de 2026 un informe de citas en Copilot. Bing Places se renovó en octubre de 2025 y permite importar el perfil de Google ya verificado. IndexNow notifica cambios a Bing, Yandex, Naver y otros buscadores, pero **no** a Google.
9. **Apple:** desde el 14 de abril de 2026 Apple Business sustituye a Apple Business Connect y está disponible en España. Hay que comprobar si admite negocios sin dirección pública.
10. **Medición:** con Search Console y Bing Webmaster Tools basta para empezar, sin cookies ni banner. Si se quiere contar los clics en WhatsApp, hay analítica sin cookies (Cloudflare Web Analytics, Plausible, Umami, Vercel Analytics). GA4 con Consent Mode es desproporcionado para una sola página. Decide Ysst, con la gestoría o un abogado para la parte legal.
11. **Volúmenes de búsqueda:** **no he podido verificar ninguna cifra**. No doy números. Las keywords de abajo son candidatas por intención y hay que validarlas con Google Keyword Planner y, tras el lanzamiento, con Search Console.

---

## 2. Accionables priorizados

Leyenda de **Momento**: *Antes* = antes de construir (decisiones o recursos), *Durante* = en la construcción, *Después* = tras publicar.
**Titular** = depende de que exista el titular legal (nombre y NIF).

| # | Prioridad | Acción | Por qué | Esfuerzo | Momento | Titular |
|---|---|---|---|---|---|---|
| 1 | P0 | Fijar **un único nombre de entidad** y usarlo igual en la web, el GBP, Bing, Apple, WhatsApp Business y los directorios (propuesta: "Limpiezas Mioara"; el descriptor va aparte) | Coherencia de entidad para Google y los LLM. Las directrices de GBP prohíben meter palabras clave en el nombre si no es el nombre real del negocio | Bajo | Antes | Parcial (el nombre legal puede diferir) |
| 2 | P0 | Fijar **un único teléfono** (el de WhatsApp) como teléfono público en todas partes | La coherencia del NAP (nombre, dirección y teléfono) es una de las señales de cita más citadas en SEO local | Bajo | Antes | No |
| 3 | P0 | Estructura de URL: `/` (ES) y `/en/` (EN), canonical propio, hreflang `es`, `en` y `x-default` | Google necesita una URL por idioma; el hreflang tiene que ser recíproco | Bajo | Durante | No |
| 4 | P0 | HTML estático e indexable: un H1, H2 por sección, title y meta description por idioma, todo el texto en el HTML (no en imágenes ni en JS) | Requisito para aparecer en Google y en las funciones de IA, según la guía de Google | Bajo | Durante | No |
| 5 | P0 | JSON-LD `@graph`: `WebSite`, `LocalBusiness` (sin dirección, con `areaServed`), `Person` (Mioara), `WebPage` y `FAQPage` por idioma | Desambigua la entidad y conecta la web con el GBP mediante `sameAs` y `hasMap` | Medio | Durante (los datos legales, después) | Sí (`legalName`, `taxID`) |
| 6 | P0 | `robots.txt` abierto con el sitemap; `@astrojs/sitemap` con i18n; las previews del hosting con `noindex` | Indexación limpia y sin duplicados de `*.vercel.app`, `*.netlify.app` o `*.pages.dev` | Bajo | Durante | No |
| 7 | P0 | Crear y verificar el **GBP** como negocio de área de servicio (sin dirección pública), con las áreas validadas y el enlace a la web | Es la principal fuente de visibilidad en el mapa y en las búsquedas de marca | Medio-alto (verificación por vídeo) | Después | **Sí** |
| 8 | P0 | Search Console (propiedad de dominio por DNS) y envío de `sitemap-index.xml` | Indexación, consultas reales y errores; desde 2026 tiene un informe de impresiones en IA | Bajo | Después | No (sí la publicación) |
| 9 | P0 | Conseguir las **primeras reseñas reales** en el GBP de los primeros anfitriones (sin incentivos ni filtros) | Las reseñas pesan en el mapa y, según la encuesta de Whitespark de 2026, son el segundo factor en visibilidad en IA | Continuo | Después | Sí |
| 10 | P1 | Bing Webmaster Tools (importar desde Search Console) y su informe de rendimiento en IA | ChatGPT y Copilot se apoyan en el índice de Bing | Bajo | Después | No |
| 11 | P1 | Política de bots de IA en `robots.txt`: permitir los bots de **búsqueda** (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot, Googlebot) y comprobar que el hosting o CDN no los bloquea por defecto (Cloudflare) | Si se bloquean, la web no sale en las respuestas de ChatGPT, Claude o Perplexity | Bajo | Durante | No |
| 12 | P1 | Presupuesto de rendimiento: 0 KB de JS de framework, imágenes con `astro:assets`, fuentes autoalojadas; LCP < 2,5 s, CLS < 0,1 e INP < 200 ms | Core Web Vitals y experiencia en el móvil (la visita típica son 30 segundos desde el móvil) | Medio | Durante | No |
| 13 | P1 | Bing Places (importar el GBP verificado) y Apple Business (comprobar si admite negocios sin dirección pública) | Bing Places alimenta a Bing y Copilot, y por vía indirecta a ChatGPT; Apple Business, a Apple Maps y Siri | Bajo | Después | Sí (vía GBP) |
| 14 | P1 | Citas coherentes: perfil de WhatsApp Business, Cronoshare, Habitissimo, Páginas Amarillas, QDQ y, si Ysst quiere, Facebook o Instagram | Menciones en terceros para Google y los LLM; Cronoshare y Habitissimo además pueden traer clientes | Medio | Después | Sí (algunos piden datos fiscales) |
| 15 | P1 | Elegir el sistema de medición (ver §8) y reflejarlo en la política de privacidad | Condiciona si hace falta banner y el texto legal | Bajo | Antes de publicar | **Sí** (la política de privacidad necesita el titular) |
| 16 | P1 | Fotos reales de Mioara y de trabajos hechos (con permiso del anfitrión) | Confianza, GBP (las fotos ayudan a verificar y a convertir) y señales de experiencia (E-E-A-T) | Medio | Antes | No |
| 17 | P2 | IndexNow (archivo de clave y envío tras cada despliegue) | Indexación casi inmediata en Bing, Yandex y otros; no afecta a Google | Bajo | Durante y después | No |
| 18 | P2 | Propuestas de copy para Ysst (ver §4.4): longitud del title y la meta, mencionar "Airbnb/Booking" en el texto, "changeover" en EN, 2–3 FAQ adicionales | Encaje con las búsquedas y la extracción de respuestas | Bajo | Antes | No |
| 19 | P2 | Enlaces locales realistas: portafolio de Ysst, gestores de viviendas turísticas con los que se colabore, asociaciones de propietarios o gestores de la Comunitat Valenciana (si tienen directorio de proveedores) | Autoridad local sin comprar enlaces | Medio, continuo | Después | No |
| 20 | P2 | Revisar cada mes a mano la página de resultados de marca y las respuestas de ChatGPT, Perplexity y Gemini a 3–4 preguntas fijas | No hay herramientas fiables y gratuitas para medir la visibilidad en LLM | Bajo | Después | No |
| 21 | P3 | `llms.txt` breve y factual (opcional) | No hay pruebas de efecto; cuesta 10 minutos | Muy bajo | Durante | No |
| 22 | P3 | Páginas de zona (2–3 como máximo) **solo** cuando haya contenido real por zona | Pueden captar búsquedas tipo "pueblo + servicio"; si son plantillas, hay riesgo de *doorway pages* | Alto | Después (más de 3–6 meses) | No |

---

## 3. Keywords locales (sin volúmenes verificados)

**Aviso:** no he podido verificar volúmenes de búsqueda; no tengo acceso a Keyword Planner ni a datos de Search Console de este dominio, que aún no existe. Esto es una lista de candidatas por intención. Cómo validarla: (1) Google Keyword Planner con una cuenta de Ads sin campañas activas, segmentando la provincia de Valencia; (2) tras el lanzamiento, el informe *Rendimiento > Consultas* de Search Console y el de Bing Webmaster Tools.

Lo que sí he podido observar: en la búsqueda "limpieza apartamentos turísticos Cullera" aparecen sobre todo Cronoshare (con páginas por pueblo, por ejemplo `/servicios/limpieza-apartamentos-turisticos/valencia/...`) y Habitissimo, además de anuncios de Airbnb. Hay demanda real en la zona: un anuncio de julio de 2026 en Cronoshare busca empresa o autónomo para 10 apartamentos turísticos en Cullera. Al competir con marketplaces, el mapa (GBP) y la marca pesan más que el orgánico genérico.

| Grupo | Ejemplos ES | Ejemplos EN | Intención | Dónde se trabaja |
|---|---|---|---|---|
| Marca (la más importante) | "Limpiezas Mioara", "Mioara limpieza", "Mioara limpieza Cullera" | "Mioara cleaning" | Navegacional y verificación de confianza | Title, H1, schema, GBP, perfiles de terceros |
| Servicio + zona prioritaria | "limpieza apartamentos turísticos Cullera", "limpieza pisos turísticos Cullera", "limpieza Airbnb Cullera", "limpieza apartamentos El Perelló", "limpieza apartamentos turísticos Sueca" | "Airbnb cleaning Cullera", "holiday rental cleaning Cullera" | Transaccional local | GBP (áreas y servicios), texto de "Zonas", title y H1 |
| Servicio + València | "limpieza apartamentos turísticos Valencia", "limpieza pisos turísticos Valencia", "limpieza viviendas turísticas Valencia", "limpieza Airbnb Valencia" | "Airbnb cleaning Valencia", "holiday rental cleaning Valencia", "turnover cleaning Valencia", "changeover cleaning Valencia" | Transaccional, mucha competencia | GBP y web; difícil en orgánico |
| Servicio genérico | "limpieza entre huéspedes", "limpieza check out apartamento", "limpiadora apartamentos turísticos", "limpieza a fondo fin de temporada" | "turnover cleaning", "Airbnb cleaner", "end of season deep clean" | Informativa y transaccional | Servicios y FAQ |
| Ribera y Horta Sud | "limpieza apartamentos turísticos Alzira", "… Algemesí", "… Silla" | — | Transaccional local, probablemente con poco volumen | Mención en "Zonas" y áreas del GBP |

Notas:
- **"Valencia" y "València":** el copy usa "València". Mucha gente escribe "valencia" sin tilde y en castellano. Google suele tratar como equivalentes las variantes con y sin diacrítico, pero no siempre. *Propuesta:* que aparezca una vez la forma "Valencia" de manera natural (por ejemplo, en el bloque de zonas o en una FAQ).
- **"changeover"** es el término británico habitual para la limpieza entre huéspedes, y muchos propietarios extranjeros de la costa son británicos. El copy EN usa "turnover", que es más americano. *Propuesta:* añadir "changeover" una vez en el texto EN.
- **Valenciano** ("neteja apartaments turístics"): probablemente con poco volumen; no recomiendo una versión en valenciano en la v1.
- **"Airbnb" en el texto:** la marca no lo usa, y está bien. En el texto descriptivo sí se puede usar, y el copy ya lo hace en la meta description. *Propuesta:* que aparezca también en el cuerpo visible, por ejemplo en el subtítulo de servicios o en una FAQ ("¿Trabajas con pisos de Airbnb y Booking?").

Fuentes: [Cronoshare Cullera](https://www.cronoshare.com/servicios/empresas-limpieza/valencia/cullera), [Anuncio Cronoshare Cullera (2026)](https://www.cronoshare.com/limpieza-vivienda-turistica-5-habitaciones-cullera-tarea-4463432-web), [Habitissimo](https://www.habitissimo.es/presupuestos/limpieza-apartamentos-turisticos).

---

## 4. SEO en Google (detalle)

### 4.1 Una página o páginas por zona o idioma

| Opción | Pros | Contras y riesgos |
|---|---|---|
| **A. Una página por idioma** (`/` y `/en/`) — *recomendada para la v1* | Coincide con la decisión ya tomada; todo el contenido y los enlaces se concentran en una URL; nada de contenido duplicado; mínimo mantenimiento | Es difícil posicionar en orgánico para muchos pueblos a la vez; para eso está el GBP |
| B. Una página por idioma + 2–3 páginas de zona con contenido real (más adelante) | Pueden captar "Cullera + servicio"; el GBP puede enlazar a la de su zona principal | Cada página necesita contenido único (fotos de pisos de esa zona, reseñas de anfitriones de allí, logística, barrios o urbanizaciones). Si solo cambia el nombre del pueblo, entra en la política de *doorway abuse* de Google |
| C. Páginas por pueblo en plantilla (20–40) | — | **Desaconsejada.** Es el patrón típico de doorway y de *scaled content abuse*. Google ha seguido actualizando sus políticas de spam en 2025–2026 |

**Idioma:** una URL por idioma es imprescindible para el hreflang (el hreflang anota URLs, no secciones). No sirve de nada servir dos idiomas en la misma URL con JS.

Fuentes: [Políticas de spam de Google](https://developers.google.com/search/docs/essentials/spam-policies), [Search Engine Land: páginas de ubicación y actualización de spam](https://searchengineland.com/location-pages-google-october-spam-update-390016), [Whitespark: páginas de área de servicio](https://whitespark.ca/?p=9352).

### 4.2 Estructura de URL e i18n — **decisión de Ysst**

| Opción | Detalle | Valoración |
|---|---|---|
| **1. ES en la raíz, EN en `/en/`** (`prefixDefaultLocale: false`, que es el valor por defecto en Astro 7) | `x-default` → `/`. Sin redirecciones. | **Recomendada**: más simple; la raíz es la página principal y la que enlaza el GBP |
| 2. `/es/` y `/en/`, con `/` redirigiendo | `x-default` → `/` o `/es/` | Añade una redirección y hace falta decidir qué pasa en `/`. Sin beneficio SEO para un sitio con dos idiomas |
| 3. Detección automática de idioma con redirección | — | **Desaconsejada**: Googlebot rastrea casi siempre sin `Accept-Language` y puede no ver la versión EN |

El hreflang usa solo el idioma (`es`, `en`), sin región: los anfitriones angloparlantes de la zona vienen de varios países.

### 4.3 On-page

- **Title y meta por idioma** (los del copy). Google suele cortar los title en torno a 600 px (unos 55–65 caracteres) y las descripciones en unos 150–160 caracteres en el móvil, y a menudo las reescribe.
- **Encabezados:** un único H1 (el del hero), un H2 por sección y H3 para cada pregunta frecuente y cada servicio. El copy ya cumple esta estructura.
- **NAP en la página:** nombre, teléfono y zona de servicio en el pie, idénticos a los del GBP. Sin dirección.
- **Enlace al GBP** desde la web (por ejemplo, "Ver reseñas en Google") cuando exista.
- **Imágenes:** `alt` descriptivo y sin relleno de palabras clave, nombre de archivo descriptivo y dimensiones explícitas.
- **Reseñas:** **no** marcar con `AggregateRating` reseñas propias en el schema (Google no muestra estrellas para reseñas sobre el propio negocio publicadas en su web). Si se muestran reseñas, que sean reales, con permiso y sin marcado.

### 4.4 Propuestas de copy (Ysst decide; no aplicar sin su OK)

1. **Title ES** (unos 88 caracteres; se cortará): mantenerlo tal cual (Google lo cortará o lo reescribirá) o acortarlo. Alternativa: "Limpieza de apartamentos turísticos en Cullera y València | Limpiezas Mioara" (unos 75) o "Limpieza de pisos turísticos · Cullera, Ribera, València | Mioara".
2. **Meta description ES** (unos 240 caracteres): lo importante ya está en los primeros 150, así que se puede dejar. Si se quiere evitar el corte, quitar "para tu piso de" y la última frase.
3. **Title EN** (unos 78 caracteres): margen aceptable.
4. **Nuevas FAQ posibles** (útiles para la extracción de respuestas por los LLM y para búsquedas con forma de pregunta): "¿Trabajas con pisos de Airbnb y Booking?", "¿Limpias el mismo día de la salida del huésped?", "¿En qué zonas trabajas?" (con respuesta textual que nombre Cullera, El Perelló, Sueca, la Ribera y València sur), "¿Haces factura?" (Ysst decidió no incluirla por ahora; queda pendiente del titular).
5. **Datos verificables en el texto:** "más de 10 años" ya está. Los LLM y las personas valoran datos concretos (zona exacta, qué incluye, plazo de envío de fotos). No inventar cifras.

### 4.5 Core Web Vitals

Umbrales "buenos" (percentil 75 de usuarios reales): **LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1**. Con Astro estático, sin JS de framework, con imágenes optimizadas y fuentes autoalojadas, se cumplen sin esfuerzo especial. Una web nueva con poco tráfico no tendrá datos de usuarios reales (CrUX) durante meses; mientras tanto se mide en laboratorio con Lighthouse o PageSpeed Insights.

### 4.6 Sitemap, robots y canonical

- `@astrojs/sitemap` 3.7.x con la opción `i18n` genera `sitemap-index.xml` y `sitemap-0.xml` con alternates `xhtml:link` entre `/` y `/en/`. He revisado el código: trata las URL sin prefijo como del idioma por defecto. No emite `x-default`; ese va en el `<head>`.
- Canonical autorreferente en cada idioma (ES → `/`, EN → `/en/`), siempre con URL absoluta, el mismo host y la misma barra final.
- `robots.txt` con `Allow` general y la línea `Sitemap:`.

### 4.7 Search Console

- Propiedad de **dominio** (registro TXT en el DNS): cubre http, https, www y no-www.
- Enviar `https://limpiezasmioara.es/sitemap-index.xml`.
- Inspección de URL de `/` y `/en/` y solicitud de indexación.
- Desde junio de 2026 Search Console tiene informes de impresiones en IA generativa (AI Overviews y Modo IA, agrupados). Su despliegue por países varía, así que hay que comprobar si aparece en la propiedad.

Fuentes: [PPC Land: informes de IA en Search Console](https://ppc.land/google-finally-gives-search-console-its-own-generative-ai-visibility-reports/), [Semrush](https://www.semrush.com/blog/google-adds-ai-performance-reports/).

### 4.8 Google Business Profile (enlazado con la web)

- **Tipo:** negocio de área de servicio **sin dirección pública**. La dirección se da para verificar, pero no se muestra.
- **Verificación:** en 2026 suele ser por vídeo continuo (sin cortes, menos de unos 3 minutos) que muestre la zona, pruebas de que el negocio existe (material, vehículo si lo hay, herramientas) y acceso. Las guías de terceros dicen que pueden pedir pruebas del negocio; de ahí la dependencia del titular legal. No cambiar nombre, categoría ni áreas mientras se verifica.
- **Nombre:** el nombre real del negocio. "Mioara · Limpieza de apartamentos turísticos" puede entenderse como relleno de palabras clave si no es el nombre que se usa en el mundo real (facturas, tarjetas). *Propuesta:* "Limpiezas Mioara" en el GBP y el descriptor en la descripción. **Decide Ysst.**
- **Categoría principal:** comprobar en la interfaz las opciones disponibles en España (algo del tipo "Servicio de limpieza de casas" o "Servicio de limpieza"). No la doy por cerrada sin verlo en el panel.
- **Áreas de servicio:** máximo 20; la propuesta de 18 está pendiente de validar.
- **Enlace a la web:** a `/` (la página ES). Opcionalmente con parámetros UTM, que solo tienen sentido si hay analítica.
- **Coherencia:** el mismo nombre, teléfono, horario y descripción que en la web y el schema.
- **Después:** fotos reales, servicios y reseñas pedidas a cada anfitrión satisfecho (enlace directo de reseña).

Fuentes: [Wiremo: checklist de verificación por vídeo 2026](https://wiremo.co/blog/google-business-profile-video-verification/), [Boomcycle 2026](https://boomcycle.com/blog/google-business-profile-verification-expert-tips-2026/), [Sterling Sky: página de destino del GBP](https://www.sterlingsky.ca/google-business-profile-landing-pages/), [BirdEye: directrices de GBP](https://birdeye.com/blog/google-business-profile-guidelines-2025). *Aviso: son fuentes secundarias; contrastar con la ayuda oficial de Google Business Profile al crear el perfil.*

### 4.9 Citas NAP y backlinks locales realistas

Citas (con nombre y teléfono idénticos y sin dirección):
- **Imprescindibles:** GBP, Bing Places, Apple Business y perfil de WhatsApp Business (con web, horario y descripción).
- **Del sector, que además traen clientes:** Cronoshare y Habitissimo (en los dos hay anfitriones de Cullera pidiendo limpieza).
- **Directorios generalistas españoles:** Páginas Amarillas y QDQ.
- **Opcionales:** Facebook o Instagram del negocio (sirven como `sameAs` y como prueba social) y Foursquare (hay proveedores que dicen que alimenta a ChatGPT, pero **no está verificado**).

Enlaces y menciones realistas:
- Portafolio de Ysst ("proyecto: Limpiezas Mioara"), con un enlace natural.
- Gestores de viviendas turísticas o *property managers* de Cullera y Sueca con los que se colabore (una página de "colaboradores" o "proveedores").
- Asociaciones de propietarios o gestores de viviendas turísticas de la Comunitat Valenciana: comprobar cuáles existen y si tienen directorio de proveedores.
- Grupos de anfitriones (Facebook o foros): sirven para menciones, no para enlaces. Sin spam.
- **No** comprar enlaces ni usar paquetes de "350 citas": riesgo y nulo valor.

Fuentes: [SE Ranking: directorios locales 2025](https://seranking.com/es/blog/directorios-locales/), [Ahrefs: citas locales](https://ahrefs.com/blog/es/local-citations), [Whitespark: sitios de reseñas y ChatGPT](https://whitespark.ca/blog/want-to-rank-in-chatgpt-focus-on-these-review-sites-new-research/).

### 4.10 Schema.org

- **`CleaningService` no existe** en schema.org; lo he comprobado en el vocabulario actual (paquete `schema-dts` 2.1.0, que se genera a partir de schema.org). Los tipos cercanos (`DryCleaningOrLaundry`, `HomeAndConstructionBusiness`) no encajan. Se usa **`LocalBusiness`** y el servicio se describe con `Service` y `serviceType`.
- **Dirección:** la documentación de Google para el resultado de "negocio local" exige `address`. Sin dirección, ese resultado concreto no aplica (y no hay nada que perder: es un tipo que no genera fragmentos visibles en un negocio de área de servicio). **No inventar dirección.** Opciones: (a) sin `address`; (b) `PostalAddress` solo con `addressLocality`, `addressRegion` y `addressCountry`, sin calle. **Decide Ysst** (la b revela el municipio de origen).
- **FAQPage:** Google dejó de mostrar el resultado enriquecido de FAQ en mayo de 2026, pero el tipo sigue siendo válido y Google dice que lo usa para entender la página. Merece la pena marcarlo **solo** si el texto marcado coincide exactamente con el visible.
- **Organization:** `LocalBusiness` ya es un subtipo de `Organization`, así que no hace falta un nodo aparte.
- **Person (Mioara):** refuerza la entidad "persona real". Tiene implicaciones de privacidad (foto, apellido): decide Ysst.

Fuentes: [Google Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), [schema.org/LocalBusiness](https://schema.org/LocalBusiness), [Search Engine Journal: Google retira los resultados enriquecidos de FAQ](https://www.searchenginejournal.com/google-drops-faq-rich-results/574429/), [jsonld.com: fin del resultado enriquecido de FAQ](https://jsonld.com/google-faq-rich-results-deprecated/), [TechWyse](https://www.techwyse.com/news/ai-search/google-faq-rich-results-deprecated-2026).

---

## 5. Otros buscadores

| Plataforma | Estado en 2025–2026 | Acción |
|---|---|---|
| **Bing Webmaster Tools** | Gratis; importa sitios desde Search Console. Desde febrero de 2026 tiene el informe **AI Performance** (citas en Copilot y en los resúmenes de IA de Bing, páginas citadas y consultas que originan la cita; sin datos de clics). No cubre ChatGPT. | Alta tras publicar; enviar el sitemap |
| **Bing Places** | Renovado el 3 de octubre de 2025 (`bing.com/forbusiness`). Lo más rápido: **importar el GBP ya verificado**. Admite ocultar la dirección. | Tras verificar el GBP |
| **IndexNow** | Protocolo que comparten Bing, Yandex, Naver, Seznam (las fuentes no coinciden) y Yep. **Google no participa.** Una sola llamada avisa a todos. | Archivo de clave + envío tras cada despliegue |
| **Apple Business** | Sustituye a Business Connect desde el 14 de abril de 2026 y está disponible en España (Apple Maps, Siri, Wallet, Mail). | Crear la ficha; **comprobar si admite negocios de área de servicio sin dirección** (Business Connect estaba pensado para ubicaciones físicas) |
| **DuckDuckGo** | Usa sobre todo resultados de Bing y, para mapas y direcciones, Apple Maps. | Nada específico: se cubre con Bing y Apple |
| **Ecosia, Yahoo, etc.** | Se apoyan en Bing (Ecosia, en parte también en Google). | Cubierto por Bing |

Fuentes: [Search Engine Land: informe AI Performance de Bing](https://searchengineland.com/bing-webmaster-tools-testing-new-ai-performance-report-468039), [Search Influence: 20.000 citas en Copilot](https://www.searchinfluence.com/blog/bing-ai-performance-report-copilot-citations/), [PPC Land: Bing Places migra a bing.com](https://ppc.land/bing-places-for-business-migrates-to-bing-com-domain-with-import-tools/), [Search Engine World: nuevo Bing Places](https://www.searchengineworld.com/microsoft-introduces-the-new-bing-places-for-business), [Whitespark: guía de Bing Places](https://whitespark.ca/guides/the-ultimate-guide-to-your-bing-places-listing/), [IndexNow (Wikipedia)](https://en.wikipedia.org/wiki/IndexNow), [indexnow.org](https://www.indexnow.org/), [Apple Newsroom: Apple Business (marzo de 2026)](https://www.apple.com/pt/newsroom/2026/03/introducing-apple-business), [Soy de Mac: Apple Business llega a España](https://en.soydemac.com/Apple-Business-arrives-in-Spain-as-a-unified-platform-for-companies/), [Artículo14](https://www.articulo14.es/sociedad/apple-business-llega-a-espana-como-funciona-y-que-servicios-ofrece-20260325.html).

---

## 6. GEO/AEO para LLM: lo demostrado frente a lo especulativo

### 6.1 Demostrado o documentado por la propia plataforma

| Hecho | Implicación | Fuente |
|---|---|---|
| Google (guía del 15 de mayo de 2026): optimizar para AI Overviews y el Modo IA "sigue siendo SEO". Hay que estar indexado y poder mostrarse con fragmento. **No** hacen falta llms.txt, reescribir para IA, "trocear" contenido ni marcado especial. Las menciones inauténticas no ayudan. | El SEO básico de §4 es también el GEO para Google | [Blog de Google Search Central (mayo de 2026)](https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing), [Funciones de IA y tu web](https://developers.google.com/search/docs/appearance/ai-features), [Search Engine Journal](https://www.searchenginejournal.com/googles-new-ai-search-guide-calls-aeo-and-geo-still-seo/), [Semrush](https://www.semrush.com/blog/google-publishes-generative-ai-search-guide/) |
| El Modo IA de Google está disponible en España y en castellano desde octubre de 2025 | Las respuestas de IA también afectan a esta zona | [Xataka](https://www.xataka.com/robotica-e-ia/google-lanza-espana-su-modo-ia-ello-nueva-forma-realizar-busquedas-web-asi-puedes-activarlo), [Genbeta](https://www.genbeta.com/buscadores/nuevo-modo-ia-google-llega-a-espana-mayor-cambio-historia-buscador-llega-hoy) |
| `Google-Extended` controla el entrenamiento y el *grounding* de Gemini; **no** afecta a la Búsqueda ni a AI Overviews | Bloquearlo no saca la web de AI Overviews; permitirlo tampoco la mete | [PPC Land: Google-Extended](https://ppc.land/google-extended/), [Marie Haynes](https://www.mariehaynes.com/should-you-use-google-extended-in-robots-txt/) |
| OpenAI: **OAI-SearchBot** decide la inclusión en la búsqueda de ChatGPT, **GPTBot** sirve para entrenamiento y **ChatGPT-User** hace las visitas que inician los usuarios (ya no se compromete a respetar `robots.txt`) | Hay que permitir OAI-SearchBot; GPTBot, a elección | [OpenAI: crawlers](https://developers.openai.com/api/docs/bots.md) |
| Anthropic: **ClaudeBot** (entrenamiento), **Claude-SearchBot** (índice de búsqueda) y **Claude-User** (visitas de usuarios); los tokens antiguos `anthropic-ai` y `Claude-Web` ya no se usan | Permitir Claude-SearchBot y Claude-User | [Anthropic: crawlers](https://support.claude.com/en/articles/8896518-anthropic-crawlers), [PPC Land](https://ppc.land/anthropic-clarifies-what-its-three-web-crawlers-do-and-how-to-block-them/) |
| Perplexity: **PerplexityBot** (índice; Perplexity dice que no lo usa para entrenar) y **Perplexity-User** (visitas de usuarios; en general no respeta `robots.txt`) | Permitir PerplexityBot | [Perplexity: crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers.md) |
| Cloudflare bloquea los bots de IA **por defecto** en las zonas nuevas desde julio de 2025 | Si el DNS o el hosting pasa por Cloudflare, hay que revisar la configuración de bots de IA y el robots.txt gestionado | [Search Engine Land](https://searchengineland.com/cloudflare-to-block-ai-crawlers-by-default-with-new-pay-per-crawl-initiative-457708), [The Register](https://www.theregister.com/2025/07/01/cloudflare_creates_ai_crawler_toll/) |
| Bing Webmaster Tools mide las citas en Copilot | Primera medición oficial de GEO (solo en el ecosistema Microsoft) | Ver §5 |

### 6.2 Bien observado pero no oficial

- **ChatGPT busca sobre resultados de Bing** en las consultas locales: según el análisis de Search Engine Land, toma 20–30 resultados de Bing y los reordena. Ese análisis también dice que **no** lee directamente los datos de Bing Places; su influencia sería indirecta. Conclusión práctica: Bing Webmaster Tools y Bing Places están justificados. [Search Engine Land](https://searchengineland.com/how-does-chatgpt-conduct-local-searches-454894), [Local Falcon](https://www.localfalcon.com/blog/chatgpt-local-search-data-sources-where-does-business-info-come-from).
- **La propia web del negocio es la fuente que más citan los LLM** en consultas de negocios locales, según el estudio de Insites sobre 10.000 negocios. [Insites](https://insites.com/blog/what-ai-uses-to-choose-local-businesses-and-what-it-ignores/).
- **Reseñas y citas en terceros:** en la encuesta de Whitespark de 2026 (47 expertos; es opinión, no medición), la visibilidad en IA depende sobre todo de las señales on-page (unos 24 %), las reseñas (unos 16 %) y las citas (unos 13 %). El GBP pesa menos ahí que en el mapa. [Whitespark](https://whitespark.ca/local-search-ranking-factors/), [Reputation.com](https://reputation.com/resources/articles/whitespark-2026-three-insights-every-brand-should-know).
- **Encuesta BrightLocal 2026:** el uso de IA generativa como fuente de recomendaciones locales pasó del 6 % al 45 % (Google sigue en el 71 %). Es una encuesta a consumidores (EE. UU. y Reino Unido), no datos de España. [DesignRush sobre BrightLocal](https://news.designrush.com/ai-local-business-discovery-website-strategy).

### 6.3 Especulativo o sin pruebas

| Táctica | Estado | Recomendación |
|---|---|---|
| **llms.txt** | Adopción en torno al 8–10 % de los dominios grandes. Según Ahrefs, el 97 % de los archivos no recibió **ninguna** petición en mayo de 2026. Google dice explícitamente que no hace falta. Ninguna plataforma grande ha confirmado que lo use. Los pocos estudios con efecto positivo son muestras de 10 sitios. | Opcional (P3). Si se pone, que sea breve y factual, sin esperar efecto |
| Contenido en pregunta-respuesta para "ser citado" | Es plausible: las FAQ dan frases autocontenidas fáciles de extraer. Las pruebas son débiles y vienen de proveedores. | La web ya tiene FAQ. Mantener respuestas directas en la primera frase |
| Schema "para LLM" | Google: sin marcado especial. Para otras plataformas no hay pruebas sólidas de efecto. | Marcar por SEO clásico y coherencia de entidad, no por GEO |
| Foursquare como fuente principal de ChatGPT | Afirmaciones de proveedores sin confirmar por OpenAI | Opcional y barato; no prioritario |
| "Trocear" contenido o reescribirlo para IA | Google lo desaconseja | No hacer |

Fuentes llms.txt: [PPC Land sobre Ahrefs](https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/), [SEOmator: censo de 100.000 dominios](https://seomator.com/blog/llms-txt-adoption), [Optimizely](https://www.optimizely.com/field-notes/articles/does-llms-txt-work/), [Search Engine Journal: Google dice que llms.txt es especulativo](https://www.searchenginejournal.com/google-says-llms-txt-is-purely-speculative-for-now/575026/).

### 6.4 Qué hacer en la práctica (GEO)

1. Hacer bien el SEO de §4 (es la base de Google AI).
2. `robots.txt` que **permita** los bots de búsqueda de IA; el entrenamiento, a decisión de Ysst (ver §9).
3. Bing Webmaster Tools + Bing Places + IndexNow.
4. Entidad coherente: el mismo nombre, descripción, teléfono, zona y persona (Mioara) en la web, el schema, el GBP, Bing, Apple y los directorios; `sameAs` enlazando todo.
5. Reseñas reales en el GBP y menciones en Cronoshare y Habitissimo.
6. Revisión manual mensual: preguntar a ChatGPT, Perplexity, Gemini y Copilot "limpieza de apartamentos turísticos en Cullera", "¿quién es Limpiezas Mioara?" y "Airbnb cleaning Cullera", y anotar si aparece y con qué datos.

---

## 7. Hosting (efectos en SEO; la elección es de Ysst)

Vercel, Netlify y Cloudflare Pages sirven HTML estático por CDN con HTTPS; en SEO son equivalentes. Diferencias que conviene comprobar:
- **Previews y subdominio por defecto** (`*.vercel.app`, `*.netlify.app`, `*.pages.dev`): comprobar que llevan `X-Robots-Tag: noindex` o que redirigen al dominio. El canonical absoluto protege en cualquier caso.
- **Cloudflare:** revisar la configuración de bots de IA, que bloquea por defecto, y la opción de "robots.txt gestionado", que puede añadir reglas de bloqueo de bots de IA y "Content Signals".
- **Barra final:** cada plataforma la gestiona a su manera; hay que fijar una forma (con barra) y comprobar con `curl -I` que la otra redirige con 301 o 308.

---

## 8. Medición compatible con el RGPD (opciones; decide Ysst)

| Opción | Qué mide | Cookies o banner | Notas |
|---|---|---|---|
| **0. Solo Search Console + Bing Webmaster Tools** | Impresiones, clics, consultas, indexación, citas en Copilot | Ninguna en la web | Cero impacto en rendimiento; no mide los clics en WhatsApp |
| **1. Analítica sin cookies** (Cloudflare Web Analytics gratis; Plausible de pago y alojado en la UE; Umami en la nube o autoalojado; Vercel Web Analytics) | Visitas, procedencia; Plausible y Umami permiten **eventos** (clic en WhatsApp) | No usan cookies ni almacenamiento local, por lo que normalmente quedan fuera del art. 22.2 de la LSSI; siguen tratando datos (IP), así que hay que mencionarlos en la política de privacidad y revisar el contrato de encargo de tratamiento y las transferencias internacionales | Validar con la gestoría o un abogado. Cloudflare Web Analytics no tiene eventos personalizados |
| **2. GA4 + Consent Mode v2 + plataforma de consentimiento (CMP)** | Lo más completo | Banner obligatorio (la AEPD exige consentimiento para la analítica salvo las excepciones de su guía de medición de audiencia) | Más JS, peor INP y LCP, y más texto legal. Desproporcionado para una sola página |

Una medición complementaria y gratuita: el **mensaje prellenado de WhatsApp** ya dice "he visto tu web", así que cada conversación que llega desde la web se identifica sola. *Propuesta:* usar un texto prellenado distinto en el GBP y en la web para distinguir la procedencia.

Fuentes: [AEPD: guía sobre cookies de medición de audiencia (PDF)](https://www.aepd.es/guias/guia-cookies-analiticas-externas.pdf), [iubenda: resumen de la guía de la AEPD](https://www.iubenda.com/es/blog/understanding-the-spanish-dpa-guide-on-audience-measurement-cookies/), [Finreg360](https://finreg360.com/alerta/la-aepd-publica-la-guia-uso-de-cookies-para-herramientas-de-medicion-de-audiencias/). *No he podido confirmar ninguna actualización de la AEPD de 2025 o 2026 sobre este punto.*

---

## 9. Decisiones pendientes de Ysst

| # | Decisión | Opciones | Recomendación |
|---|---|---|---|
| D1 | Estructura de URL | (1) ES en `/` y EN en `/en/`; (2) `/es/` y `/en/` | (1) |
| D2 | Nombre en el GBP y como entidad | "Limpiezas Mioara" / "Mioara · Limpieza de apartamentos turísticos" | "Limpiezas Mioara" en el GBP; la forma larga, como `alternateName` |
| D3 | Dirección en el schema | Sin `address` / solo municipio, provincia y país | Sin `address`, salvo que se quiera reforzar Almussafes |
| D4 | Datos de Mioara | Solo nombre o nombre y apellido; foto real o no; idiomas que habla (¿atiende en inglés?) | Nombre y foto real si es posible; el idioma de atención en EN, a confirmar |
| D5 | Política de bots de IA | (a) permitir todos; (b) permitir búsqueda y bloquear entrenamiento (GPTBot, ClaudeBot, Google-Extended, CCBot) | (a) o (b): ambas mantienen la visibilidad en los buscadores de IA. Para un negocio local, (a) no tiene coste real |
| D6 | llms.txt | Sí (breve) / no | Indiferente; sí, si se quiere tenerlo cubierto |
| D7 | Medición | 0 / 1 / 2 (§8) | 0 en la v1; 1 (con eventos) si se quiere contar los clics en WhatsApp |
| D8 | Hosting | Vercel / Netlify / Cloudflare Pages | Neutral en SEO; con Cloudflare, revisar el bloqueo de bots de IA |
| D9 | Páginas de zona | No / 2–3 más adelante con contenido real | No en la v1 |
| D10 | Propuestas de copy (§4.4) | Aceptar, rechazar o ajustar cada una | — |
| D11 | Páginas legales indexables | Indexables / `noindex` | Indexables (el aviso legal con titular y NIF también da confianza) |
| D12 | Redes sociales del negocio | Ninguna / Instagram / Facebook | Opcional; sirven como `sameAs` y prueba social si se mantienen vivas |
| D13 | Titular legal y fecha de publicación | — | Bloquea el GBP, el aviso legal, la política de privacidad, `legalName` y `taxID` |
