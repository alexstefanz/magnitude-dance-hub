/** Normalize a Romanian-style phone number to WhatsApp digits (e.g. 0740123456 -> 40740123456). Returns null if invalid. */
export function normalizePhoneRO(raw: string): string | null {
  let d = (raw || "").replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("0") && d.length === 10) d = "4" + d;
  else if (d.startsWith("7") && d.length === 9) d = "40" + d;
  return d.length >= 10 && d.length <= 15 ? d : null;
}
