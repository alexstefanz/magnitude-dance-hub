import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ScheduleCard, type ScheduleEntry } from "@/components/schedule/ScheduleCard";
import { DAYS, currentDayOfWeek, scheduleQuery } from "@/lib/content";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const ALL = "toate";

export function FullSchedule({ styleFilter }: { styleFilter?: string }) {
  const { data, isLoading } = useQuery(scheduleQuery);
  const entries = (data ?? []) as ScheduleEntry[];
  const [day, setDay] = useState<number>(currentDayOfWeek());
  const [style, setStyle] = useState(ALL);
  const [level, setLevel] = useState(ALL);
  const [showFilters, setShowFilters] = useState(false);
  const today = currentDayOfWeek();
  const activeFilters = [style, level].filter((v) => v !== ALL).length;

  const base = useMemo(
    () =>
      styleFilter
        ? entries.filter((e) =>
            e.style_label.toLowerCase().includes(styleFilter.toLowerCase()),
          )
        : entries,
    [entries, styleFilter],
  );

  const options = useMemo(() => {
    const uniq = (values: (string | null)[]) =>
      Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort();
    return {
      styles: uniq(base.map((e) => e.style_label)),
      levels: uniq(base.map((e) => e.level)),
    };
  }, [base]);

  const filtered = base.filter(
    (e) =>
      e.day_of_week === day &&
      (style === ALL || e.style_label === style) &&
      (level === ALL || e.level === level),
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Zilele săptămânii"
        className="grid grid-cols-7 gap-1 sm:flex sm:flex-wrap sm:gap-2"
      >
        {DAYS.map((label, index) => {
          const value = index + 1;
          const active = value === day;
          return (
            <button
              key={label}
              role="tab"
              aria-selected={active}
              onClick={() => setDay(value)}
              className={cn(
                "relative min-w-0 rounded-xl px-1 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm",
                active
                  ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70",
              )}
            >
              <span className="sm:hidden">{label.slice(0, 2)}</span>
              <span className="hidden sm:inline">{label}</span>
              {value === today && (
                <span className={cn("absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full", active ? "bg-primary-foreground" : "bg-primary")} aria-label="Azi" />
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setShowFilters((v) => !v)}
        aria-expanded={showFilters}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold sm:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filtrează{activeFilters > 0 ? ` (${activeFilters})` : ""}
      </button>

      <div className={cn("mt-4 gap-3 rounded-2xl border border-border bg-card p-4 sm:mt-6 sm:grid sm:grid-cols-2", showFilters ? "grid" : "hidden")}>
        <FilterSelect
          id="filter-style"
          label="Stil"
          value={style}
          onChange={setStyle}
          options={options.styles}
        />
        <FilterSelect
          id="filter-level"
          label="Nivel"
          value={level}
          onChange={setLevel}
          options={options.levels}
        />
      </div>

      <div className="mt-6 grid gap-3">
        {isLoading && <Skeleton className="h-24 w-full rounded-2xl" />}
        {!isLoading && filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
            Nu există cursuri pentru filtrele selectate.
          </p>
        )}
        {filtered.map((entry) => (
          <ScheduleCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Toate" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>Toate</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
