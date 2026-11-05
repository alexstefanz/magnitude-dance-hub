type TimelineItem = {
  start: string; // YYYY-MM-DD
  end?: string;
  label: string;
  day: string;
  title: string;
  note?: string;
  kind: "party" | "curs" | "special";
};

const ITEMS: TimelineItem[] = [
  { start: "2026-11-07", end: "2026-11-08", label: "7–8 nov", day: "sâmbătă–duminică", title: "Salsa Family", kind: "special" },
  { start: "2026-11-07", label: "7 nov", day: "sâmbătă", title: "Social Party: Dresscode Autumn Shades", kind: "party" },
  { start: "2026-11-09", label: "9 nov", day: "luni", title: "Start Curs: Kizomba Începători", kind: "curs" },
  { start: "2026-11-14", label: "14 nov", day: "sâmbătă", title: "Social Party", kind: "party" },
  { start: "2026-11-21", label: "21 nov", day: "sâmbătă", title: "Social Party", kind: "party" },
  { start: "2026-11-23", label: "23 nov", day: "luni", title: "Start Curs Salsa & Bachata Începători", note: "Program: 19:00 – 21:00", kind: "curs" },
  { start: "2026-11-27", end: "2026-11-30", label: "27–30 nov", day: "vineri–luni", title: "Magnitude Merge la Munte", kind: "special" },
  { start: "2026-12-05", label: "5 dec", day: "sâmbătă", title: "Social Party", kind: "party" },
  { start: "2026-12-06", label: "6 dec", day: "duminică", title: "Practică Asistată", kind: "special" },
  { start: "2026-12-12", label: "12 dec", day: "sâmbătă", title: "Social Party", kind: "party" },
  { start: "2026-12-19", label: "19 dec", day: "sâmbătă", title: "Christmas Party Edition", kind: "party" },
  { start: "2026-12-31", label: "31 dec", day: "joi", title: "Revelion", kind: "special" },
];

const KIND_STYLE: Record<TimelineItem["kind"], { dot: string; tag: string; name: string }> = {
  party: { dot: "bg-primary", tag: "bg-primary text-primary-foreground", name: "Party" },
  curs: { dot: "bg-accent", tag: "bg-accent text-accent-foreground", name: "Curs nou" },
  special: { dot: "bg-destructive", tag: "bg-destructive text-destructive-foreground", name: "Eveniment" },
};

const MONTHS: Record<string, string> = { "11": "Noiembrie 2026", "12": "Decembrie 2026" };

export function EventsTimeline() {
  const today = new Date().toISOString().slice(0, 10);
  const visible = ITEMS.filter((i) => (i.end ?? i.start) >= today);
  if (visible.length === 0) return null;

  const groups = visible.reduce<Record<string, TimelineItem[]>>((acc, i) => {
    const m = i.start.slice(5, 7);
    (acc[m] ??= []).push(i);
    return acc;
  }, {});

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-2">
      {Object.entries(groups).map(([month, items]) => (
        <div key={month}>
          <h3 className="font-display text-2xl font-bold">{MONTHS[month] ?? month}</h3>
          <ol className="relative mt-6 border-l-2 border-border pl-6">
            {items.map((item) => {
              const s = KIND_STYLE[item.kind];
              return (
                <li key={item.start + item.title} className="relative mb-6 last:mb-0">
                  <span
                    className={`absolute -left-[33px] top-3 size-4 rounded-full ring-4 ring-background ${s.dot}`}
                    aria-hidden="true"
                  />
                  <div className="card-elevated flex items-stretch overflow-hidden">
                    <div className={`flex w-28 shrink-0 flex-col items-center justify-center px-2 py-3 text-center ${s.tag}`}>
                      <span className="font-display text-lg font-bold leading-tight">{item.label}</span>
                      <span className="text-xs opacity-90">{item.day}</span>
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-4">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {s.name}
                      </span>
                      <p className="font-display text-base font-bold md:text-lg">{item.title}</p>
                      {item.note && <p className="text-sm text-muted-foreground">{item.note}</p>}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
