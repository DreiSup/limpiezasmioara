# Mioara: landing de limpieza de apartamentos turísticos (instrucciones para Claude Code)

## Encargo
Implementa en **Astro + Tailwind (v4)** la landing que está en `referencia.html`, de forma que sea igual píxel a píxel. Ese archivo es la **fuente de verdad visual y de copy**: ábrelo en el navegador y compáralo con el resultado a 390 px y a 1280 px.

## Reglas que no se negocian
1. **El copy manda.** No cambies, acortes ni reordenes ningún texto. No añadas textos de marketing, cifras, testimonios, sellos ni secciones. Respeta el orden de las secciones y la jerarquía: un solo H1 y un H2 por sección.
2. **HTML estático con el mínimo JS.** Todas las animaciones son CSS: no metas librerías, carruseles ni JS de animación. Las FAQ usan `<details>` nativo.
3. **Mobile-first.** Breakpoints: base <768, `md` ≥768 y `lg` ≥1024. Por debajo de lg hay una barra fija abajo con el botón de WhatsApp; en lg desaparece y el botón pasa a la cabecera fija.
4. **Accesibilidad AA.** Cuerpo de 17 px o más, zonas táctiles de 44 px o más, foco visible, SVG decorativos con `aria-hidden` y `prefers-reduced-motion` respetado.
5. **Nada de Airbnb**: ni su logo, ni su coral, ni su estética.

## Estructura propuesta
```
src/
  layouts/Base.astro        <html lang>, fuentes, meta, <link rel="alternate" hreflang>
  i18n/es.ts · en.ts        TODO el copy sale de aquí (ES = texto de referencia.html; EN pendiente)
  styles/global.css         tokens @theme, grano de papel, keyframes y reglas de movimiento
  components/
    Header · LangSwitch · WhatsAppButton (solid | light, idle shine)
    Hero · Polaroid · Tape · Twinkle · Wave · HandCircle · Checkbox
    Services · Steps · Guarantee · About · Zones · Faq · Contact · Footer · StickyBar
  pages/index.astro · en/index.astro
  pages/aviso-legal.astro · politica-de-privacidad.astro (+ versiones en/)
```
Anclas: `#servicios #como-funciona #garantia #sobre-mi #zonas #preguntas #contacto`, cada una con `aria-labelledby` → su H2.

## Tokens (Tailwind v4 `@theme`)
```css
@theme {
  --color-paper:#F6F1E6; --color-card:#FFFDF8; --color-ink:#22262E; --color-ink-2:#3C424C;
  --color-muted:#565C66; --color-pen:#2445A0; --color-marker:#EFE86A; --color-rule:#D8CDB6;
  --color-line:#C9BB9A; --color-tape:rgb(214 198 156 / .72); --color-tint:rgb(214 198 156 / .22);
  --font-serif:"Young Serif",Georgia,serif; --font-sans:"Figtree",system-ui,sans-serif;
  --font-hand:"Kalam","Segoe Print",cursive;
  --ease-paper:cubic-bezier(.22,1,.36,1);
}
```
- **Fondo:** paper con grano `radial-gradient(rgb(34 38 46/.04) 1px,transparent 1.3px)` de 5×5 px.
- **Contenedor:** max 1160 px, con padding lateral de 20 px (40 px desde md).
- **Padding de sección:** 44 / 72 / 104 px.
- **Tipografía:**
  - H1: 35 / 48 / 60 px.
  - H2: 30 / 36 / 42 px. Excepciones: la garantía va a 28 / 36 / 40 px y «¿Hablamos?» a 46 / 46 / 72 px.
  - Cuerpo: 17 px, y 18 px desde md.
  - Notas a mano: Kalam 19–20 px con rotate(-1°).
- **Contraste sobre paper:** ink 13,5:1 · pen 7,7:1 · muted 6:1. El blanco sobre pen da 8,6:1. El amarillo marker se usa **solo como fondo de texto**.

## Movimiento (todo dentro de `@media (prefers-reduced-motion: no-preference)`)
| Animación | Dónde | Cómo |
|---|---|---|
| fadeUp | H1, subtítulo, CTA | al cargar · .9s · ease-paper · retardos 0/.15/.3s |
| markIn | «la Ribera, Cullera y València» | background-size 0→100 % · 1.1s · retardo .55s |
| drop | polaroid del hero | 1.3s, desde -30px y rotate(-7°) |
| rise | bloques `.reveal` | `animation-timeline: view()` · entry 0–60 % |
| draw | ticks, círculos, «gratis», olas, subrayado | stroke-dashoffset 1→0 (`pathLength="1"`) · entry 20 % → cover 40 % |
| markS | «soy constante y que confían en mí.» | rotulador al hacer scroll |
| twinkle | destellos | bucle 3.8s |
| shine / idle | botones | franja de luz en hover; en la barra fija, cada 8 s |
| FAQ | `details` | `::details-content` block-size 0→auto + `interpolate-size: allow-keywords` · el «+» rota 45° |

Las animaciones de scroll también van dentro de `@supports (animation-timeline: view())`. El estado sin animar es siempre el final y visible.

Copia **literalmente** de `referencia.html` los paths SVG a mano: casillas, tick, círculos de números, óvalo de «gratis», olas, iconos de zona (ola, naranja, huerta y torre) y el polígono `clip-path` del papel rasgado.

## Fotos (`astro:assets` `<Picture>`, AVIF + WebP + JPG)
- **Hero** (cama hecha con toallas): 4:3, 1200×900 (@2x 2400×1800). Lleva `loading="eager"` y `fetchpriority="high"`.
- **Retrato de Mioara:** 4:5, 1080×1350 (@2x 2160×2700). Carga lazy.

Hasta tener las fotos, mantén los marcadores con borde discontinuo.

## Placeholders que hay que rellenar (búscalos en el código)
- `https://wa.me/34XXXXXXXXX`: número real (preguntar si quiere mensaje predefinido).
- `[NOMBRE DEL NEGOCIO]`: va en el pie y en `<title>`.
- Copy en inglés para `/en/` (mismo layout; los textos pueden ser más largos).
- Textos de Aviso legal y Política de privacidad.
- Meta description, imagen OG y favicon.

## Criterios de aceptación
- [ ] A 390 px y 1280 px coincide visualmente con `referencia.html`.
- [ ] Todo el texto es idéntico a la referencia (haz un diff del texto visible).
- [ ] Lighthouse móvil: Accesibilidad 100 y Rendimiento ≥95. Sin JS de cliente salvo el que añada Astro por defecto (debe ser 0 KB).
- [ ] Con «reducir movimiento» activado no se anima nada y todo es visible.
- [ ] La barra fija respeta `env(safe-area-inset-bottom)` y no tapa el pie.
