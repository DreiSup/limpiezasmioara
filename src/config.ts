// Configuración central del sitio.

// TODO(WhatsApp): sustituir por el número real de Mioara, en formato internacional
// sin "+" ni espacios (ej.: 34612345678). Todos los enlaces wa.me salen de aquí.
export const WHATSAPP_NUMBER = '34XXXXXXXXX';

/** Enlace wa.me con el mensaje prellenado del idioma, codificado para URL. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
