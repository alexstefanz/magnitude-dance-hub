import { useQuery } from "@tanstack/react-query";
import { settingsQuery } from "@/lib/content";
import { DEFAULT_WHATSAPP, DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export function useSettings() {
  const { data } = useQuery(settingsQuery);
  const settings = data ?? {};
  const get = (key: string, fallback = "") => settings[key] || fallback;

  return {
    settings,
    get,
    whatsappNumber: get("whatsapp_stefan", DEFAULT_WHATSAPP),
    whatsappMessage: get("whatsapp_default_message", DEFAULT_WHATSAPP_MESSAGE),
    wa: (message?: string) =>
      whatsappLink(
        get("whatsapp_stefan", DEFAULT_WHATSAPP),
        message || get("whatsapp_default_message", DEFAULT_WHATSAPP_MESSAGE),
      ),
  };
}
