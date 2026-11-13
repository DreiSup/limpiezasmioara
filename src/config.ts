// Configuración central del sitio.

// Número de WhatsApp de Mioara, en formato internacional sin "+" ni espacios.
// Todos los enlaces wa.me salen de aquí.
export const WHATSAPP_NUMBER = '34642824775';

/** Enlace wa.me con el mensaje prellenado del idioma, codificado para URL. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
