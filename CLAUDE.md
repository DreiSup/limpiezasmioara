# Mioara · Limpieza de apartamentos turísticos — Contexto del proyecto

## Qué es
Web de una sola página para el servicio de limpieza de apartamentos turísticos (Airbnb y similares) que ofrece Mioara, madre de Ysst, en la Ribera (Valencia). Además del código, el proyecto incluye el copy y el perfil de Google Business.

* Dueño del proyecto: Ysst (desarrollador web freelance, Valencia).
* Quién presta el servicio: Mioara.

## Reglas de trabajo con Ysst
* Responde en castellano, de forma corta, táctica y concreta, sin relleno.
* Antes de implementar cualquier funcionalidad nueva, explica qué hace y para qué sirve.
* No tomes decisiones de arquitectura ni de diseño por tu cuenta. Propón opciones y espera a que Ysst las confirme.
* Trabaja por fases y no pases a la siguiente sin su OK.

## Objetivo de la web
La web no capta anfitriones por sí sola; en la zona se consigue limpieza por recomendación o por mensaje directo. Tiene dos trabajos:

1. Dar confianza: el anfitrión que recibe un mensaje de Mioara la busca y encuentra algo serio.
2. Dar visibilidad local: perfil de Google Business y SEO local (por ejemplo, "limpieza apartamentos turísticos Cullera").

Llamada a la acción principal: WhatsApp. Sin formulario complejo.

## Decisiones ya tomadas
* Marca: "Mioara · Limpieza de apartamentos turísticos". Nombre corto: "Limpiezas Mioara".
* Dominio: `limpiezasmioara.es` (Ysst está comprobando si está libre).
* No usar "Airbnb" en la marca ni en el dominio por riesgo de marca registrada. Sí se puede usar en los textos para describir el servicio.
* Sin precios en la web. El precio se habla por WhatsApp.
* Tono: castellano, tuteo, cercano. Los mensajes van firmados por Mioara.
* Formato: una sola página.

## Oferta (limpieza entre huéspedes)
Incluye:
* Limpieza completa de la vivienda.
* Cambio de ropa de cama y toallas.
* Reposición de básicos (papel, jabón, café…).
* Fotos o aviso por WhatsApp al terminar.
* Revisión de daños y objetos olvidados.
* Limpiezas a fondo puntuales (temporada, mudanza).

No incluye recogida ni entrega de llaves.
Garantía: si algo no queda bien, se repite sin coste.
Productos: los pone el anfitrión, o Mioara con suplemento.

## Mioara (para la sección "Sobre mí")
* Más de 10 años de experiencia en limpieza.
* Más de 10 años con contrato fijo en la misma casa o empresa (estabilidad y confianza).

## Disponibilidad y capacidad
* Entre semana: de 15:30 a 20:00.
* Fines de semana: por la mañana.
* Capacidad inicial: 2 viviendas por semana.
* Logística: el tiempo de trayecto limita más que los km. Hay que agrupar las limpiezas por zona y día.

## Zona: 25 km de radio desde Almussafes
* Ribera: Benifaió, Sollana, Alginet, Algemesí, Sueca, Polinyà de Xúquer, Albalat de la Ribera, Alzira, Carlet, Guadassuar, L'Alcúdia, Benimodo, Riola, Fortaleny, Corbera, Llaurí, Favara.
* Costa: Cullera, El Perelló, El Palmar, El Saler, El Perellonet.
* Horta Sud: Picassent, Silla, Alcàsser, Beniparrell, Albal, Catarroja, Massanassa, Alfafar, Sedaví, Benetússer, Paiporta, Picanya, Torrent, Alaquàs, Aldaia, Xirivella.
* València ciudad: barrios del sur.

Las zonas con más pisos turísticos (donde está el dinero) son Cullera, El Perelló/Sueca costa y València.

En la web: bloque "Zonas" agrupado por comarca, nombrando los pueblos clave. No listar 40 pueblos (penaliza el SEO).

En Google Business: 18 áreas de servicio. Esta es una propuesta pendiente de que Ysst la valide: València, Cullera, Sueca, El Perelló, El Saler, El Palmar, Alzira, Algemesí, Silla, Catarroja, Albal, Alfafar, Torrent, Picassent, Benifaió, Almussafes, Sollana, Alginet.

## Bloqueante legal (resolver antes de publicar)
* Titular: todavía no está decidido. Ysst piensa dar de alta a Mioara como autónoma cuando haya suficientes clientes recurrentes.
* Por qué bloquea:
  * El aviso legal de la web (LSSI) exige el nombre y el NIF del titular.
  * Google Business puede pedir pruebas del negocio al verificar.
  * Muchos anfitriones necesitan factura.
* Enfoque acordado como opción: construirlo todo ahora y publicar web y Google cuando haya titular. Ysst consultará con una gestoría.

## Contexto comercial
Ysst capta anfitriones escribiéndoles por mensajería de Airbnb con el método "Do you know" de Hormozi: pregunta si conocen a alguien que necesite limpieza, usa bullets, no da precio y va rotando versiones del mensaje. Los mensajes van firmados por Mioara. La web tiene que reforzar ese mensaje cuando el anfitrión la busque.

## Fases
1. Base: nombre, oferta y zona. ✅ Hecho, salvo validar las 18 áreas y resolver el titular.
2. Copy ✅ Hecho (v1 en `copy/`), sin pregunta de factura por ahora (decisión de Ysst); aviso legal pendiente del titular. Secciones:
   * Hero con titular y WhatsApp.
   * Servicios.
   * Cómo funciona.
   * Garantía.
   * Sobre Mioara.
   * Zonas.
   * Preguntas frecuentes.
   * Contacto.
3. Diseño ✅ Elegido: dirección A «Cuaderno cercano». Referencia visual en `design/referencia.html` e instrucciones en `design/HANDOFF.md`.
4. Construcción ✅ v1 hecha (Astro 7 + Tailwind 4, `/` y `/en/`, Lighthouse 100). Pendientes: WhatsApp, dominio, páginas legales, favicon, campos JSON-LD; ver `README.md`.
5. Google Business: negocio de área de servicio sin dirección pública, categorías, fotos, verificación (normalmente por vídeo) y primeras reseñas.

## Pendiente de decidir (consultar a Ysst)
* ~~Stack~~ → Decidido: **Astro + Tailwind** (estático, i18n ES/EN).
* Hosting y despliegue.
* Número de WhatsApp (mensaje prellenado ya decidido, en `src/config.ts`).
* ~~Fotos~~ → Decidido: fotos reales en `src/assets/` (hero: cama hecha; retrato de Mioara en terraza, Ysst lo da por bueno).
* Medición: Consent Mode, GTM o nada en la v1.
* ~~Idiomas~~ → Decidido: castellano e inglés. Copy en `copy/es.md` y `copy/en.md`.
* Titular legal y fecha de publicación.

## Documentos del proyecto
* `copy/es.md`, `copy/en.md`: copy v1 de la web.
* `design/prompt-claude-design.md`: prompt para generar propuestas de diseño.
* `research/captacion-leads.md`: canales de captación y accionables.
* `research/seo-geo-aeo.md`: investigación SEO/GEO/AEO y decisiones pendientes.
* `research/facturacion.md`: opciones legales para facturar (recomendación provisional: Mioara autónoma; validar con gestoría).
* `research/informe-seo.html`: informe SEO visual (HTML autocontenido).
* `design/referencia.html`, `design/HANDOFF.md`: diseño elegido (fuente de verdad visual) e instrucciones de implementación.
* `docs/seo-instrucciones-build.md`: instrucciones SEO obligatorias para el agente que construya la web en Astro.
