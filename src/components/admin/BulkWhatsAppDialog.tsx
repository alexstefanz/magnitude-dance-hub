import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { sendBulkWhatsApp } from "@/lib/bulk-whatsapp.functions";

const TEMPLATES = {
  confirmare_start_curs: {
    label: "Start curs",
    text: (n: string, c: string, d: string, t: string) =>
      `Bună, ${n}! Îți mulțumim pentru înscrierea la cursul de ${c} de la Magnitude Dance. Prima ședință va avea loc pe data de ${d}, la ora ${t}, la studioul nostru din Iași. Te așteptăm cu drag! Dacă ai întrebări, ne poți răspunde direct la acest mesaj.`,
  },
  reprogramare_curs: {
    label: "Reprogramare",
    text: (n: string, c: string, d: string, t: string) =>
      `Bună, ${n}! Te anunțăm că începerea cursului de ${c} de la Magnitude Dance a fost reprogramată pentru data de ${d}, la ora ${t}. Ne cerem scuze pentru inconveniente și te așteptăm cu drag! Pentru orice detalii, ne poți răspunde direct la acest mesaj.`,
  },
} as const;
type Key = keyof typeof TEMPLATES;

export function BulkWhatsAppDialog({ ids, defaultCourse, onDone }: { ids: string[]; defaultCourse: string; onDone: () => void }) {
  const send = useServerFn(sendBulkWhatsApp);
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState<Key>("confirmare_start_curs");
  const [course, setCourse] = useState(defaultCourse);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [busy, setBusy] = useState(false);

  const fmtDate = date ? new Date(date + "T12:00").toLocaleDateString("ro-RO", { day: "numeric", month: "long" }) : "";
  const input = "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm";

  async function submit() {
    if (!course || !date || !time) return toast.error("Completează cursul, data și ora.");
    setBusy(true);
    try {
      const r = await send({ data: { template, course, date: fmtDate, time, registrationIds: ids } });
      if (r.sent) toast.success(`${r.sent} mesaje trimise.`);
      if (r.failed.length) toast.error(`${r.failed.length} netrimise: ${r.failed.map((f) => `${f.name} (${f.reason})`).join(", ")}`);
      setOpen(false);
      onDone();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o) setCourse(defaultCourse); }}>
      <DialogTrigger asChild>
        <Button disabled={ids.length === 0} className="gap-2">
          <MessageCircle className="h-4 w-4" /> Trimite WhatsApp ({ids.length})
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Mesaj WhatsApp către {ids.length} cursanți</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(TEMPLATES) as Key[]).map((k) => (
              <Button key={k} type="button" variant={template === k ? "default" : "outline"} onClick={() => setTemplate(k)}>
                {TEMPLATES[k].label}
              </Button>
            ))}
          </div>
          <label className="block text-sm font-medium">Curs
            <input className={input} value={course} onChange={(e) => setCourse(e.target.value)} />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm font-medium">Data
              <input type="date" className={input} value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label className="block text-sm font-medium">Ora
              <input type="time" className={input} value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
          </div>
          <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            {TEMPLATES[template].text("{Prenume}", course || "…", fmtDate || "…", time || "…")}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit} disabled={busy}>{busy ? "Se trimite…" : "Trimite"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
