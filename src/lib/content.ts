import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SettingsMap = Record<string, string>;

export const DAYS = [
  "Luni",
  "Marți",
  "Miercuri",
  "Joi",
  "Vineri",
  "Sâmbătă",
  "Duminică",
] as const;

/** Current weekday (1 = Luni ... 7 = Duminică) in Europe/Bucharest. */
export function currentDayOfWeek(now: Date = new Date()): number {
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Bucharest",
    weekday: "short",
  }).format(now);
  const map: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };
  return map[label] ?? 1;
}

export function formatTime(value?: string | null) {
  if (!value) return "";
  return value.slice(0, 5);
}

export const STATUS_LABELS: Record<string, string> = {
  activ: "Activ",
  inscrieri_deschise: "Înscrieri deschise",
  complet: "Complet",
  anulat: "Anulat",
};

export const REGISTRATION_STATUS_LABELS: Record<string, string> = {
  nou: "Nou",
  contactat: "Contactat",
  inscris: "Înscris",
  nu_raspunde: "Nu răspunde",
  inchis: "Închis",
};

export const FEEDBACK_STATUS_LABELS: Record<string, string> = {
  nou: "Nou",
  verificat: "Verificat",
  aprobat_testimonial: "Aprobat testimonial",
  arhivat: "Arhivat",
};

function unwrap<T>(result: { data: T | null; error: { message: string } | null }): T {
  if (result.error) throw new Error(result.error.message);
  return (result.data ?? []) as T;
}

export const settingsQuery = queryOptions({
  queryKey: ["site_settings"],
  staleTime: 5 * 60 * 1000,
  queryFn: async (): Promise<SettingsMap> => {
    const { data, error } = await supabase.from("site_settings").select("key,value");
    if (error) throw new Error(error.message);
    const map: SettingsMap = {};
    for (const row of data ?? []) map[row.key] = row.value ?? "";
    return map;
  },
});

export const danceStylesQuery = queryOptions({
  queryKey: ["dance_styles"],
  queryFn: async () =>
    unwrap(
      await supabase
        .from("dance_styles")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),
    ),
});

export const instructorsQuery = queryOptions({
  queryKey: ["instructors"],
  queryFn: async () =>
    unwrap(
      await supabase
        .from("instructors")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),
    ),
});

export const scheduleQuery = queryOptions({
  queryKey: ["schedule_entries"],
  queryFn: async () =>
    unwrap(
      await supabase
        .from("schedule_entries")
        .select("*")
        .eq("is_active", true)
        .order("day_of_week")
        .order("start_time"),
    ),
});

export const pricingQuery = queryOptions({
  queryKey: ["pricing_packages"],
  queryFn: async () =>
    unwrap(
      await supabase
        .from("pricing_packages")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),
    ),
});

export const eventsQuery = queryOptions({
  queryKey: ["events"],
  queryFn: async () =>
    unwrap(
      await supabase.from("events").select("*").eq("is_active", true).order("start_date"),
    ),
});

export const partyEventsQuery = queryOptions({
  queryKey: ["party_events"],
  queryFn: async () =>
    unwrap(
      await supabase
        .from("party_events")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),
    ),
});

export const choreographiesQuery = queryOptions({
  queryKey: ["choreographies"],
  queryFn: async () =>
    unwrap(
      await supabase
        .from("choreographies")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),
    ),
});

export const whyMagnitudeQuery = queryOptions({
  queryKey: ["why_magnitude_items"],
  queryFn: async () =>
    unwrap(
      await supabase
        .from("why_magnitude_items")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),
    ),
});

export const campaignsQuery = queryOptions({
  queryKey: ["enrollment_campaigns"],
  queryFn: async () =>
    unwrap(
      await supabase
        .from("enrollment_campaigns")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),
    ),
});

export const reviewsQuery = queryOptions({
  queryKey: ["reviews"],
  queryFn: async () =>
    unwrap(
      await supabase.from("reviews").select("*").eq("is_active", true).order("display_order"),
    ),
});
