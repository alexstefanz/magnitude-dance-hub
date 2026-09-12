export const STYLE_PATHS = {
  salsa: "/salsa",
  bachata: "/bachata",
  kizomba: "/kizomba",
  "dansul-mirilor": "/dansul-mirilor",
  "rueda-de-casino": "/rueda-de-casino",
  "dans-modern-copii": "/dans-modern-copii",
  "lady-styling": "/lady-styling",
} as const;

export type StylePath = (typeof STYLE_PATHS)[keyof typeof STYLE_PATHS];

export function stylePath(slug: string): StylePath | null {
  return (STYLE_PATHS as Record<string, StylePath | undefined>)[slug] ?? null;
}
