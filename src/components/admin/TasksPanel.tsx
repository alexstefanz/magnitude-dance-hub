import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const TASK_CATEGORIES = [
  { value: "grafica", label: "Grafică" },
  { value: "website", label: "Website" },
  { value: "social_media", label: "Social Media" },
  { value: "cursuri", label: "Cursuri" },
  { value: "petreceri", label: "Petreceri" },
  { value: "evenimente", label: "Evenimente" },
];
const STATUSES = [
  { value: "de_facut", label: "De făcut" },
  { value: "in_lucru", label: "În lucru" },
  { value: "finalizat", label: "Finalizat" },
];
const catLabel = (v: string) => TASK_CATEGORIES.find((c) => c.value === v)?.label ?? v;

type Task = {
  id: string;
  title: string;
  notes: string | null;
  category: string;
  status: string;
  due_date: string | null;
  assignee: string | null;
};

const selectCls = "h-9 rounded-md border border-input bg-background px-2 text-sm";
const toKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function TasksPanel() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState("toate");
  const [form, setForm] = useState({ title: "", notes: "", category: "website", due_date: "", assignee: "" });
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["admin", "tasks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("admin_tasks").select("*").order("due_date", { ascending: true, nullsFirst: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as Task[];
    },
  });
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin", "tasks"] });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("admin_tasks").insert({
        title: form.title.trim(),
        notes: form.notes.trim() || null,
        category: form.category,
        due_date: form.due_date || null,
        assignee: form.assignee.trim() || null,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success("Sarcină adăugată.");
      setForm({ ...form, title: "", notes: "", due_date: "", assignee: "" });
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Task> }) => {
      const { error } = await supabase.from("admin_tasks").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: refresh,
    onError: (e: Error) => toast.error(e.message),
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("admin_tasks").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => { toast.success("Sarcină ștearsă."); refresh(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const tasks = query.data ?? [];
  const visible = tasks.filter(
    (t) => (filter === "toate" || t.category === filter) && (!selectedDay || t.due_date === selectedDay),
  );

  const days = useMemo(() => {
    const first = new Date(month);
    const offset = (first.getDay() + 6) % 7;
    const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
    return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }, [month]);
  const countByDay = useMemo(() => {
    const m = new Map<string, number>();
    tasks.forEach((t) => t.due_date && t.status !== "finalizat" && m.set(t.due_date, (m.get(t.due_date) ?? 0) + 1));
    return m;
  }, [tasks]);
  const today = toKey(new Date());

  if (query.isLoading) return <Skeleton className="h-64 w-full rounded-2xl" />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Organizare</h2>
        <p className="text-sm text-muted-foreground">Sarcinile echipei pentru grafică, website, social media, cursuri, petreceri și evenimente.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <form
            className="grid gap-3 rounded-2xl border border-border bg-card p-4 md:grid-cols-2"
            onSubmit={(e) => { e.preventDefault(); if (form.title.trim()) create.mutate(); }}
          >
            <Input className="md:col-span-2" placeholder="Ce trebuie făcut?" value={form.title} maxLength={200}
              onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <select className={selectCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {TASK_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <Input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} />
            <Input placeholder="Responsabil (ex: Ștefan)" value={form.assignee} maxLength={100}
              onChange={(e) => setForm({ ...form, assignee: e.target.value })} />
            <Textarea className="md:col-span-2" rows={2} placeholder="Notițe (opțional)" value={form.notes} maxLength={2000}
              onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <Button type="submit" className="md:col-span-2" disabled={create.isPending}>
              <Plus aria-hidden="true" /> Adaugă sarcină
            </Button>
          </form>

          <div className="flex flex-wrap gap-2">
            {[{ value: "toate", label: "Toate" }, ...TASK_CATEGORIES].map((c) => (
              <Button key={c.value} size="sm" variant={filter === c.value ? "default" : "outline"} onClick={() => setFilter(c.value)}>
                {c.label}
              </Button>
            ))}
            {selectedDay && (
              <Button size="sm" variant="secondary" onClick={() => setSelectedDay(null)}>Zi: {selectedDay} ✕</Button>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {STATUSES.map((s) => {
              const col = visible.filter((t) => t.status === s.value);
              return (
                <div key={s.value} className="rounded-2xl border border-border bg-card p-3">
                  <p className="mb-3 flex items-center justify-between font-semibold">
                    {s.label} <Badge variant="secondary">{col.length}</Badge>
                  </p>
                  <div className="space-y-2">
                    {col.length === 0 && <p className="text-sm text-muted-foreground">Nicio sarcină.</p>}
                    {col.map((t) => {
                      const overdue = t.due_date && t.due_date < today && t.status !== "finalizat";
                      return (
                        <div key={t.id} className="space-y-2 rounded-xl border border-border bg-background p-3">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`font-medium ${t.status === "finalizat" ? "line-through text-muted-foreground" : ""}`}>{t.title}</p>
                            <button type="button" aria-label="Șterge" className="text-muted-foreground hover:text-destructive"
                              onClick={() => confirm("Ștergi sarcina?") && remove.mutate(t.id)}>
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                          {t.notes && <p className="whitespace-pre-line text-xs text-muted-foreground">{t.notes}</p>}
                          <div className="flex flex-wrap gap-1 text-xs">
                            <Badge>{catLabel(t.category)}</Badge>
                            {t.due_date && <Badge variant={overdue ? "destructive" : "outline"}>{t.due_date}</Badge>}
                            {t.assignee && <Badge variant="outline">{t.assignee}</Badge>}
                          </div>
                          <select className={`${selectCls} h-8 w-full`} value={t.status}
                            onChange={(e) => update.mutate({ id: t.id, patch: { status: e.target.value } })}>
                            {STATUSES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <Button size="icon" variant="ghost" aria-label="Luna anterioară"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft /></Button>
            <p className="font-semibold capitalize">{month.toLocaleDateString("ro-RO", { month: "long", year: "numeric" })}</p>
            <Button size="icon" variant="ghost" aria-label="Luna următoare"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight /></Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {["L", "Ma", "Mi", "J", "V", "S", "D"].map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {days.map((d) => {
              const key = toKey(d);
              const count = countByDay.get(key) ?? 0;
              const inMonth = d.getMonth() === month.getMonth();
              return (
                <button key={key} type="button" onClick={() => setSelectedDay(selectedDay === key ? null : key)}
                  className={`relative aspect-square rounded-lg text-sm transition-colors ${
                    selectedDay === key ? "bg-primary text-primary-foreground"
                      : key === today ? "border border-primary" : "hover:bg-muted"
                  } ${inMonth ? "" : "opacity-40"}`}>
                  {d.getDate()}
                  {count > 0 && (
                    <span className="absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent" />
                  )}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Apasă pe o zi pentru a vedea sarcinile cu termen în acea zi.</p>
        </div>
      </div>
    </div>
  );
}
