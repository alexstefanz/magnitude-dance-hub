export const DEFAULT_WHATSAPP = "+40758515946";
export const DEFAULT_WHATSAPP_MESSAGE =
  "Bună! Aș dori mai multe informații despre cursurile Magnitude Dance.";

/** Builds a wa.me link from a (possibly formatted) phone number. */
export function whatsappLink(phone?: string | null, message?: string | null) {
  const digits = (phone || DEFAULT_WHATSAPP).replace(/[^\d]/g, "");
  const text = encodeURIComponent(message || DEFAULT_WHATSAPP_MESSAGE);
  return `https://wa.me/${digits}?text=${text}`;
}

export function telLink(phone?: string | null) {
  return `tel:${(phone || DEFAULT_WHATSAPP).replace(/\s/g, "")}`;
}
