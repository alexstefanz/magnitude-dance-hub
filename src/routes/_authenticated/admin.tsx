import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminCrud, type AdminField } from "@/components/admin/AdminCrud";
import {
  DAYS,
  FEEDBACK_STATUS_LABELS,
  REGISTRATION_STATUS_LABELS,
  formatTime,
} from "@/lib/content";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administrare – Magnitude Dance" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const DAY_OPTIONS = DAYS.map((label, index) => ({ value: String(index + 1), label }));

const SCHEDULE_FIELDS: AdminField[] = [
  { key: "style_label", label: "Denumire curs", type: "text", required: true },
  { key: "day_of_week", label: "Zi", type: "select", options: DAY_OPTIONS, required: true },
  { key: "start_time", label: "Ora de început", type: "time", required: true },
  { key: "end_time", label: "Ora de final", type: "time" },
  { key: "instructor_names", label: "Instructori", type: "text" },
  { key: "room", label: "Sala", type: "text" },
  { key: "level", label: "Nivel", type: "text" },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: Object.entries(REGISTRATION_STATUS_LABELS).length
      ? [
          { value: "activ", label: "Activ" },
          { value: "inscrieri_deschise", label: "Înscrieri deschise" },
          { value: "complet", label: "Complet" },
          { value: "anulat", label: "Anulat" },
        ]
      : [],
  },
  { key: "notes", label: "Observații", type: "textarea" },
  { key: "is_special", label: "Eveniment special (party)", type: "checkbox" },
  { key: "is_active", label: "Afișat pe site", type: "checkbox" },
  { key: "display_order", label: "Ordine", type: "number" },
];

const STYLE_FIELDS: AdminField[] = [
  { key: "name", label: "Nume", type: "text", required: true },
  { key: "slug", label: "Slug (URL)", type: "text", required: true },
  { key: "short_description", label: "Descriere scurtă", type: "textarea" },
  { key: "long_description", label: "Descriere detaliată", type: "textarea" },
  { key: "benefits", label: "Beneficii (câte unul pe linie)", type: "list" },
  { key: "learning_points", label: "Ce înveți (câte unul pe linie)", type: "list" },
  { key: "image_url", label: "Link imagine", type: "text" },
  { key: "hero_image_url", label: "Link imagine hero", type: "text" },
  { key: "reel_url", label: "Link reel/video", type: "text" },
  { key: "seo_title", label: "Titlu SEO", type: "text" },
  { key: "seo_description", label: "Descriere SEO", type: "textarea" },
  { key: "is_active", label: "Afișat pe site", type: "checkbox" },
  { key: "display_order", label: "Ordine", type: "number" },
];

const INSTRUCTOR_FIELDS: AdminField[] = [
  { key: "name", label: "Nume", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "role_title", label: "Rol", type: "text" },
  { key: "short_description", label: "Descriere scurtă", type: "textarea" },
  { key: "biography", label: "Biografie", type: "textarea" },
  { key: "dance_history", label: "Parcurs în dans", type: "textarea" },
  { key: "achievements", label: "Palmares", type: "textarea" },
  { key: "dance_meaning", label: "Ce reprezintă dansul", type: "textarea" },
  { key: "styles", label: "Stiluri (câte unul pe linie)", type: "list" },
  { key: "image_url", label: "Link fotografie", type: "text" },
  { key: "instagram_url", label: "Instagram", type: "text" },
  { key: "facebook_url", label: "Facebook", type: "text" },
  { key: "tiktok_url", label: "TikTok", type: "text" },
  { key: "is_active", label: "Afișat pe site", type: "checkbox" },
  { key: "display_order", label: "Ordine", type: "number" },
];

const PRICING_FIELDS: AdminField[] = [
  { key: "name", label: "Denumire", type: "text", required: true },
  {
    key: "category",
    label: "Categorie",
    type: "select",
    options: [
      { value: "grup", label: "Cursuri de grup" },
      { value: "privat", label: "Ședințe private" },
    ],
  },
  { key: "price", label: "Preț", type: "number", required: true },
  { key: "discounted_price", label: "Preț redus", type: "number" },
  { key: "price_unit", label: "Unitate (ex: lei/lună)", type: "text" },
  { key: "sessions_count", label: "Număr ședințe", type: "number" },
  { key: "description", label: "Descriere", type: "textarea" },
  { key: "eligibility_notes", label: "Condiții", type: "textarea" },
  { key: "is_featured", label: "Recomandat", type: "checkbox" },
  { key: "is_active", label: "Afișat pe site", type: "checkbox" },
  { key: "display_order", label: "Ordine", type: "number" },
];

const EVENT_FIELDS: AdminField[] = [
  { key: "title", label: "Titlu", type: "text", required: true },
  { key: "short_description", label: "Descriere", type: "textarea" },
  { key: "start_date", label: "Data de început", type: "date", required: true },
  { key: "end_date", label: "Data de final", type: "date" },
  { key: "location", label: "Locație", type: "text" },
  { key: "event_type", label: "Tip eveniment", type: "text" },
  { key: "image_url", label: "Link imagine", type: "text" },
  { key: "facebook_event_url", label: "Link Facebook", type: "text" },
  { key: "registration_url", label: "Link înscriere", type: "text" },
  { key: "external_url", label: "Alt link", type: "text" },
  { key: "is_featured", label: "Recomandat", type: "checkbox" },
  { key: "is_active", label: "Afișat pe site", type: "checkbox" },
];

const PARTY_FIELDS: AdminField[] = [
  { key: "title", label: "Titlu", type: "text", required: true },
  { key: "short_description", label: "Descriere", type: "textarea" },
  { key: "party_date", label: "Data", type: "date" },
  { key: "image_url", label: "Link imagine", type: "text" },
  { key: "facebook_album_url", label: "Album Facebook", type: "text" },
  { key: "external_url", label: "Alt link", type: "text" },
  { key: "is_active", label: "Afișat pe site", type: "checkbox" },
  { key: "display_order", label: "Ordine", type: "number" },
];

const CHOREO_FIELDS: AdminField[] = [
  { key: "title", label: "Titlu", type: "text", required: true },
  { key: "description", label: "Descriere", type: "textarea" },
  { key: "category", label: "Categorie", type: "text" },
  { key: "thumbnail_url", label: "Link imagine", type: "text" },
  { key: "video_url", label: "Link video", type: "text" },
  { key: "reel_url", label: "Link reel", type: "text" },
  { key: "is_active", label: "Afișat pe site", type: "checkbox" },
  { key: "display_order", label: "Ordine", type: "number" },
];

const CAMPAIGN_FIELDS: AdminField[] = [
  { key: "title", label: "Titlu campanie", type: "text", required: true },
  { key: "style_label", label: "Stil", type: "text" },
  { key: "cta_label", label: "Text buton", type: "text" },
  { key: "whatsapp_message", label: "Mesaj WhatsApp", type: "textarea" },
  { key: "is_active", label: "Activ", type: "checkbox" },
  { key: "display_order", label: "Ordine", type: "number" },
];

const WHY_FIELDS: AdminField[] = [
  { key: "title", label: "Titlu", type: "text", required: true },
  { key: "description", label: "Descriere", type: "textarea" },
  { key: "icon", label: "Iconiță", type: "text", helper: "users, party-popper, trending-up, heart, graduation-cap, sparkles" },
  { key: "image_url", label: "Link imagine", type: "text" },
  { key: "reel_url", label: "Link reel", type: "text" },
  { key: "video_url", label: "Link video", type: "text" },
  { key: "is_active", label: "Afișat pe site", type: "checkbox" },
  { key: "display_order", label: "Ordine", type: "number" },
];

const REVIEW_FIELDS: AdminField[] = [
  { key: "reviewer_name", label: "Nume", type: "text", required: true },
  { key: "rating", label: "Rating (1-5)", type: "number", required: true },
  { key: "review_text", label: "Text recenzie", type: "textarea" },
  { key: "review_date", label: "Data", type: "date" },
  { key: "is_active", label: "Afișat pe site", type: "checkbox" },
  { key: "display_order", label: "Ordine", type: "number" },
];

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const roleQuery = useQuery({
    queryKey: ["is_admin"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id ?? "";
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      if (error) throw new Error(error.message);
      return {
        userId,
        isAdmin: (data ?? []).some((row) => row.role === "admin"),
      };
    },
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (roleQuery.isLoading) {
    return (
      <div className="container-page py-16">
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!roleQuery.data?.isAdmin) {
    return (
      <div className="container-page flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <ShieldAlert className="size-12 text-destructive" aria-hidden="true" />
        <h1 className="text-2xl">Acces restricționat</h1>
        <p className="max-w-md text-muted-foreground">
          Contul tău nu are drepturi de administrare. Contactează administratorul site-ului.
        </p>
        <Button variant="outline" onClick={signOut}>
          <LogOut aria-hidden="true" />
          Deconectare
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-card">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="font-display text-lg font-extrabold">
              MAGNITUDE<span className="text-primary"> DANCE</span>
            </p>
            <p className="text-sm text-muted-foreground">Panou de administrare</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut aria-hidden="true" />
            Deconectare
          </Button>
        </div>
      </header>

      <main className="container-page py-8">
        <Tabs defaultValue="inscrieri">
          <TabsList className="flex h-auto flex-wrap justify-start gap-1">
            <TabsTrigger value="inscrieri">Înscrieri</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="orar">Orar</TabsTrigger>
            <TabsTrigger value="cursuri">Cursuri</TabsTrigger>
            <TabsTrigger value="instructori">Instructori</TabsTrigger>
            <TabsTrigger value="preturi">Prețuri</TabsTrigger>
            <TabsTrigger value="evenimente">Evenimente</TabsTrigger>
            <TabsTrigger value="party">Party</TabsTrigger>
            <TabsTrigger value="coregrafii">Coregrafii</TabsTrigger>
            <TabsTrigger value="campanii">Campanii</TabsTrigger>
            <TabsTrigger value="beneficii">De ce Magnitude</TabsTrigger>
            <TabsTrigger value="recenzii">Recenzii</TabsTrigger>
            <TabsTrigger value="setari">Setări</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="inscrieri">
              <RegistrationsPanel />
            </TabsContent>
            <TabsContent value="feedback">
              <FeedbackPanel />
            </TabsContent>
            <TabsContent value="orar">
              <AdminCrud
                table="schedule_entries"
                title="Orar cursuri"
                fields={SCHEDULE_FIELDS}
                orderBy="day_of_week"
                summary={(row) =>
                  `${DAYS[Number(row["day_of_week"]) - 1] ?? ""} ${formatTime(
                    String(row["start_time"] ?? ""),
                  )} – ${String(row["style_label"] ?? "")} (${String(row["room"] ?? "")})`
                }
              />
            </TabsContent>
            <TabsContent value="cursuri">
              <AdminCrud
                table="dance_styles"
                title="Cursuri de dans"
                fields={STYLE_FIELDS}
                summary={(row) => `${String(row["name"])} – /${String(row["slug"])}`}
              />
            </TabsContent>
            <TabsContent value="instructori">
              <AdminCrud
                table="instructors"
                title="Instructori"
                fields={INSTRUCTOR_FIELDS}
                summary={(row) => `${String(row["name"])} – ${String(row["role_title"] ?? "")}`}
              />
            </TabsContent>
            <TabsContent value="preturi">
              <AdminCrud
                table="pricing_packages"
                title="Abonamente"
                fields={PRICING_FIELDS}
                summary={(row) =>
                  `${String(row["name"])} – ${String(row["price"])} ${String(row["price_unit"] ?? "")}`
                }
              />
            </TabsContent>
            <TabsContent value="evenimente">
              <AdminCrud
                table="events"
                title="Evenimente"
                fields={EVENT_FIELDS}
                orderBy="start_date"
                summary={(row) => `${String(row["title"])} – ${String(row["start_date"] ?? "")}`}
              />
            </TabsContent>
            <TabsContent value="party">
              <AdminCrud
                table="party_events"
                title="Party"
                fields={PARTY_FIELDS}
                summary={(row) => `${String(row["title"])} – ${String(row["party_date"] ?? "")}`}
              />
            </TabsContent>
            <TabsContent value="coregrafii">
              <AdminCrud
                table="choreographies"
                title="Coregrafii"
                fields={CHOREO_FIELDS}
                summary={(row) => `${String(row["title"])} – ${String(row["category"] ?? "")}`}
              />
            </TabsContent>
            <TabsContent value="campanii">
              <AdminCrud
                table="enrollment_campaigns"
                title="Campanii de înscriere"
                fields={CAMPAIGN_FIELDS}
                summary={(row) => String(row["title"])}
              />
            </TabsContent>
            <TabsContent value="beneficii">
              <AdminCrud
                table="why_magnitude_items"
                title="De ce Magnitude"
                fields={WHY_FIELDS}
                summary={(row) => String(row["title"])}
              />
            </TabsContent>
            <TabsContent value="recenzii">
              <AdminCrud
                table="reviews"
                title="Recenzii"
                fields={REVIEW_FIELDS}
                summary={(row) =>
                  `${String(row["reviewer_name"])} – ${String(row["rating"])}/5`
                }
              />
            </TabsContent>
            <TabsContent value="setari">
              <SettingsPanel />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}

type Registration = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  who_am_i: string | null;
  selected_course: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

function RegistrationsPanel() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin", "registrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as Registration[];
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("registrations").update({ status }).eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      toast.success("Status actualizat.");
      await queryClient.invalidateQueries({ queryKey: ["admin", "registrations"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (query.isLoading) return <Skeleton className="h-64 w-full rounded-2xl" />;
  const rows = query.data ?? [];

  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl font-bold">Înscrieri ({rows.length})</h2>
      <ul className="space-y-3">
        {rows.map((row) => (
          <li key={row.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display font-bold">
                  {row.last_name} {row.first_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  <a href={`tel:${row.phone}`} className="hover:text-primary">
                    {row.phone}
                  </a>{" "}
                  ·{" "}
                  <a href={`mailto:${row.email}`} className="hover:text-primary">
                    {row.email}
                  </a>
                </p>
                {row.selected_course && (
                  <Badge variant="secondary" className="mt-2">
                    {row.selected_course}
                  </Badge>
                )}
                {row.message && <p className="mt-2 text-sm text-muted-foreground">{row.message}</p>}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-muted-foreground">
                  {new Date(row.created_at).toLocaleString("ro-RO")}
                </span>
                <select
                  value={row.status}
                  onChange={(event) => update.mutate({ id: row.id, status: event.target.value })}
                  aria-label={`Status pentru ${row.first_name}`}
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
                >
                  {Object.entries(REGISTRATION_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </li>
        ))}
        {rows.length === 0 && (
          <li className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
            Nu există înscrieri momentan.
          </li>
        )}
      </ul>
    </section>
  );
}

type FeedbackRow = {
  id: string;
  name: string | null;
  email: string | null;
  instructor_label: string | null;
  course_label: string | null;
  rating: number;
  message: string;
  allow_testimonial: boolean;
  status: string;
  created_at: string;
};

function FeedbackPanel() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin", "feedback"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as FeedbackRow[];
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("feedback").update({ status }).eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      toast.success("Status actualizat.");
      await queryClient.invalidateQueries({ queryKey: ["admin", "feedback"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (query.isLoading) return <Skeleton className="h-64 w-full rounded-2xl" />;
  const rows = query.data ?? [];

  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl font-bold">Feedback ({rows.length})</h2>
      <ul className="space-y-3">
        {rows.map((row) => (
          <li key={row.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-display font-bold">{row.name || "Anonim"}</p>
                <p className="text-sm text-muted-foreground">
                  {row.rating}/5
                  {row.instructor_label ? ` · ${row.instructor_label}` : ""}
                  {row.course_label ? ` · ${row.course_label}` : ""}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{row.message}</p>
                {row.allow_testimonial && (
                  <Badge className="mt-2">Acord publicare testimonial</Badge>
                )}
              </div>
              <select
                value={row.status}
                onChange={(event) => update.mutate({ id: row.id, status: event.target.value })}
                aria-label="Status feedback"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
              >
                {Object.entries(FEEDBACK_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </li>
        ))}
        {rows.length === 0 && (
          <li className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
            Nu există feedback momentan.
          </li>
        )}
      </ul>
    </section>
  );
}

type Setting = { key: string; value: string | null; label: string | null };

function SettingsPanel() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin", "site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").order("key");
      if (error) throw new Error(error.message);
      return (data ?? []) as Setting[];
    },
  });

  const update = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase.from("site_settings").update({ value }).eq("key", key);
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      toast.success("Setare salvată.");
      await queryClient.invalidateQueries();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (query.isLoading) return <Skeleton className="h-64 w-full rounded-2xl" />;

  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl font-bold">Setări site</h2>
      <ul className="space-y-3">
        {(query.data ?? []).map((setting) => (
          <li key={setting.key} className="rounded-xl border border-border bg-card p-4">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                update.mutate({ key: setting.key, value: String(form.get("value") ?? "") });
              }}
              className="flex flex-wrap items-end gap-3"
            >
              <div className="min-w-64 flex-1">
                <label
                  htmlFor={`setting-${setting.key}`}
                  className="text-sm font-medium text-foreground"
                >
                  {setting.label || setting.key}
                </label>
                <input
                  id={`setting-${setting.key}`}
                  name="value"
                  defaultValue={setting.value ?? ""}
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
                />
              </div>
              <Button type="submit" variant="outline">
                Salvează
              </Button>
            </form>
          </li>
        ))}
      </ul>
    </section>
  );
}
