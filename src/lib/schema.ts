// JSON-LD (@graph) generado desde el mismo copy que el HTML (src/i18n).
//
// TODO(schema): añadir cuando existan datos reales (no publicar vacíos ni inventados):
//   - LocalBusiness.telephone ("+34…", el mismo número de WhatsApp; ver src/config.ts)
//   - LocalBusiness.image y logo (logo cuadrado ≥112×112 px) y WebPage.primaryImageOfPage (imagen OG)
//   - LocalBusiness.hasMap y sameAs (URL del perfil de Google Business, Bing Places, Apple, etc.)
//   - LocalBusiness.legalName y taxID (titular legal y NIF)
//   - Person.image (foto real de Mioara)
//   - knowsLanguage (PENDIENTE D4) y address (PENDIENTE D3; por defecto, sin dirección)
import type { Dict } from '../i18n';

const AREAS: Array<[type: string, name: string]> = [
  ['City', 'Cullera'],
  ['Place', 'El Perelló'],
  ['Place', 'El Palmar'],
  ['Place', 'El Saler'],
  ['City', 'Sueca'],
  ['City', 'Alzira'],
  ['City', 'Algemesí'],
  ['City', 'Almussafes'],
  ['City', 'Benifaió'],
  ['City', 'Sollana'],
  ['City', 'Alginet'],
  ['City', 'Silla'],
  ['City', 'Catarroja'],
  ['City', 'Albal'],
  ['City', 'Alfafar'],
  ['City', 'Picassent'],
  ['City', 'Torrent'],
  ['City', 'València'],
  ['AdministrativeArea', 'La Ribera'],
  ['AdministrativeArea', 'Horta Sud'],
];

export function buildSchema(t: Dict, site: URL) {
  const abs = (path: string) => new URL(path, site).href;
  const home = abs('/');
  const page = abs(t.path);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${home}#website`,
        url: home,
        name: 'Limpiezas Mioara',
        alternateName: 'Mioara · Limpieza de apartamentos turísticos',
        inLanguage: ['es', 'en'],
        publisher: { '@id': `${home}#business` },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${home}#business`,
        name: 'Limpiezas Mioara',
        alternateName: 'Mioara · Limpieza de apartamentos turísticos',
        description: t.schema.businessDescription,
        url: home,
        founder: { '@id': `${home}#mioara` },
        areaServed: AREAS.map(([type, name]) => ({ '@type': type, name })),
        makesOffer: t.schema.services.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', ...s },
        })),
      },
      {
        '@type': 'Person',
        '@id': `${home}#mioara`,
        name: 'Mioara',
        jobTitle: t.schema.jobTitle,
        worksFor: { '@id': `${home}#business` },
      },
      {
        '@type': 'WebPage',
        '@id': `${page}#webpage`,
        url: page,
        name: t.seo.title,
        inLanguage: t.lang,
        isPartOf: { '@id': `${home}#website` },
        about: { '@id': `${home}#business` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${page}#faq`,
        inLanguage: t.lang,
        isPartOf: { '@id': `${page}#webpage` },
        mainEntity: t.faq.items.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };
}
