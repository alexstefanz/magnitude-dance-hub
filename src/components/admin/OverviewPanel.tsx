import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, CalendarDays, Inbox, ListTodo, Music, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { formatTime, REGISTRATION_STATUS_LABELS } from "@/lib/content";

type Props = { onNavigate: (section: string) => void };

export function OverviewPanel({ onNavigate }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const jsDay = new Date().getDay();
  const dow = jsDay === 0 ? 7 : jsDay;

  const q = useQuery({
    queryKey: ["admin", "overview", today],
    queryFn: async () => {
      const [regs, tasks, sched, styles, prices] = await Promise.all([
        supabase.from("registrations").select("id,first_name,last_name,selected_course,status,created_at").order("created_at", { ascending: false }).limit(50),
        supabase.from("admin_tasks").select("id,title,status,due_date,start_date,category").neq("status", "finalizat"),
        supabase.from("schedule_entries").select("id,style_label,level,start_time,room,instructor_names").eq("day_of_week", dow).eq("is_active", true).order("start_time"),
        supabase.from("dance_styles").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("pricing_packages").select("id", { count: "exact", head: true }).eq("is_active", true),
      ]);
      return {
        regs: regs.data ?? [],
        tasks: tasks.data ?? [],
        sched: sched.data ?? [],
        styles: styles.count ?? 0,
        prices: prices.count ?? 0,
      };
    },
  });

  if (q.isLoading || !q.data) return <Skeleton className="h-96 w-full rounded-2xl" />;
  const { regs, tasks, sched, styles, prices } = q.data;
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  const newRegs = regs.filter((r) => r.status === "nou" || r.status === "noua").length;
  const weekRegs = regs.filter((r) => r.created_at >= weekAgo).length;
  const overdue = tasks.filter((t) => t.due_date && t.due_date < today);
  const soon = tasks.filter((t) => t.due_date && t.due_date >= today && t.due_date <= new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10));
  const upcoming = tasks.filter((t) => t.start_date && t.start_date >= today).sort((a, b) => String(a.start_date).localeCompare(String(b.start_date))).slice(0, 4);

  const stats = [
    { label: "Înscrieri noi", value: newRegs, hint: `${weekRegs} în ultimele 7 zile`, icon: Inbox, to: "inscrieri" },
    { label: "Sarcini deschise", value: tasks.length, hint: `${overdue.length} depășite`, icon: ListTodo, to: "organizare", alert: overdue.length > 0 },
    { label: "Cursuri azi", value: sched.length, hint: "din orar", icon: CalendarDays, to: "orar" },
    { label: "Cursuri active", value: styles, hint: `${prices} abonamente`, icon: Music, to: "cursuri" },
  ];

  const card = "rounded-xl border border-border bg-card p-5";
  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Panou principal</h2>
        <p className="text-sm text-muted-foreground">Privire de ansamblu asupra activității de azi.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <button key={s.label} type="button" onClick={() => onNavigate(s.to)} className={`${card} text-left transition-colors hover:border-primary`}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`size-4 ${s.alert ? "text-destructive" : "text-primary"}`} aria-hidden="true" />
            </div>
            <p className="mt-2 font-display text-3xl font-bold">{s.value}</p>
            <p className={`text-xs ${s.alert ? "text-destructive" : "text-muted-foreground"}`}>{s.hint}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className={card}>
          <Header title="Înscrieri recente" onClick={() => onNavigate("inscrieri")} />
          <ul className="space-y-2">
            {regs.slice(0, 5).map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-2 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{r.last_name} {r.first_name}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.selected_course || "—"} · {new Date(r.created_at).toLocaleDateString("ro-RO")}</p>
                </div>
                <Badge variant="outline">{(REGISTRATION_STATUS_LABELS as Record<string, string>)[r.status] ?? r.status}</Badge>
              </li>
            ))}
            {regs.length === 0 && <Empty text="Nu există înscrieri." />}
          </ul>
        </div>

        <div className={card}>
          <Header title="Sarcini urgente" onClick={() => onNavigate("organizare")} />
          <ul className="space-y-2">
            {[...overdue, ...soon].slice(0, 6).map((t) => {
              const late = t.due_date! < today;
              return (
                <li key={t.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className="flex min-w-0 items-center gap-2">
                    {late && <AlertTriangle className="size-4 shrink-0 text-destructive" aria-hidden="true" />}
                    <span className="truncate">{t.title}</span>
                  </span>
                  <Badge variant={late ? "destructive" : "secondary"}>{t.due_date}</Badge>
                </li>
              );
            })}
            {overdue.length + soon.length === 0 && <Empty text="Nicio sarcină urgentă." />}
          </ul>
        </div>

        <div className={card}>
          <Header title="Cursurile de azi" onClick={() => onNavigate("orar")} />
          <ul className="space-y-2">
            {sched.map((s) => (
              <li key={s.id} className="flex items-center gap-3 text-sm">
                <span className="w-12 shrink-0 font-display font-bold text-primary">{formatTime(String(s.start_time))}</span>
                <span className="min-w-0 flex-1 truncate">{s.style_label}{s.level ? ` - ${s.level}` : ""}</span>
                <span className="hidden truncate text-xs text-muted-foreground sm:block">{s.instructor_names} · {s.room}</span>
              </li>
            ))}
            {sched.length === 0 && <Empty text="Nu sunt cursuri azi." />}
          </ul>
        </div>

        <div className={card}>
          <Header title="Evenimente care urmează" onClick={() => onNavigate("organizare")} />
          <ul className="space-y-2">
            {upcoming.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate">{t.title}</span>
                <Badge variant="outline">Start: {t.start_date}</Badge>
              </li>
            ))}
            {upcoming.length === 0 && <Empty text="Niciun eveniment planificat." />}
          </ul>
          <button type="button" onClick={() => onNavigate("preturi")} className="mt-4 flex items-center gap-2 text-xs text-muted-foreground hover:text-primary">
            <Tag className="size-3" aria-hidden="true" /> {prices} abonamente active pe site
          </button>
        </div>
      </div>
    </section>
  );
}

function Header({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="font-display font-bold">{title}</h3>
      <button type="button" onClick={onClick} className="text-xs text-primary hover:underline">Vezi tot</button>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <li className="text-sm text-muted-foreground">{text}</li>;
}
