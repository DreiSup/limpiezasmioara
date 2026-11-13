import { es, type Dict } from './es';
import { en } from './en';

export type Lang = 'es' | 'en';
export const dicts: Record<Lang, Dict> = { es, en };
export type { Dict };

/** Alternates hreflang (idénticos en todas las páginas): es, en y x-default → ES. */
export const alternates = [
  { hreflang: 'es', path: '/' },
  { hreflang: 'en', path: '/en/' },
  { hreflang: 'x-default', path: '/' },
] as const;
