import { useMemo, useState } from "react";
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
  const [instructor, setInstructor] = useState(ALL);
  const [level, setLevel] = useState(ALL);
  const [room, setRoom] = useState(ALL);

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
      instructors: uniq(base.map((e) => e.instructor_names)),
      levels: uniq(base.map((e) => e.level)),
      rooms: uniq(base.map((e) => e.room)),
    };
  }, [base]);

  const filtered = base.filter(
    (e) =>
      e.day_of_week === day &&
      (style === ALL || e.style_label === style) &&
      (instructor === ALL || e.instructor_names === instructor) &&
      (level === ALL || e.level === level) &&
      (room === ALL || e.room === room),
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Zilele săptămânii"
        className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2"
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
                "shrink-0 snap-start rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                active
                  ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
        <FilterSelect
          id="filter-style"
          label="Stil"
          value={style}
          onChange={setStyle}
          options={options.styles}
        />
        <FilterSelect
          id="filter-instructor"
          label="Instructor"
          value={instructor}
          onChange={setInstructor}
          options={options.instructors}
        />
        <FilterSelect
          id="filter-level"
          label="Nivel"
          value={level}
          onChange={setLevel}
          options={options.levels}
        />
        <FilterSelect
          id="filter-room"
          label="Sală"
          value={room}
          onChange={setRoom}
          options={options.rooms}
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
