import { Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { STATUS_LABELS, formatTime } from "@/lib/content";
import { cn } from "@/lib/utils";

export type ScheduleEntry = {
  id: string;
  dance_style_id: string | null;
  day_of_week: number;
  start_time: string;
  end_time: string | null;
  style_label: string;
  instructor_names: string | null;
  room: string;
  level: string | null;
  status: string;
  is_special: boolean;
  notes: string | null;
};

export function ScheduleCard({ entry, dark }: { entry: ScheduleEntry; dark?: boolean }) {
  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-2xl border p-4 transition-all duration-200 sm:flex-row sm:items-center sm:gap-5",
        dark
          ? "border-white/10 bg-white/5 hover:border-accent/60"
          : "border-border bg-card shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]",
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-2 font-display text-lg font-bold",
          entry.is_special ? "text-accent" : "text-primary",
          dark && !entry.is_special && "text-accent",
        )}
      >
        <Clock className="size-4" aria-hidden="true" />
        {formatTime(entry.start_time)}
        {entry.end_time && (
          <span className="text-sm font-medium opacity-70">– {formatTime(entry.end_time)}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-base font-bold md:text-lg">
          {entry.style_label}
          {entry.level ? ` - ${entry.level}` : ""}
        </h3>
        <p
          className={cn(
            "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm",
            dark ? "text-ink-foreground/70" : "text-muted-foreground",
          )}
        >
          {entry.instructor_names && (
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5" aria-hidden="true" />
              {entry.instructor_names}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden="true" />
            {entry.room}
          </span>
        </p>
        {entry.notes && (
          <p className={cn("mt-2 text-sm", dark ? "text-ink-foreground/70" : "text-muted-foreground")}>
            {entry.notes}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {entry.level && (
          <Badge variant="secondary" className="uppercase">
            {entry.level}
          </Badge>
        )}
        {entry.status !== "activ" && (
          <Badge variant={entry.status === "anulat" ? "destructive" : "default"}>
            {STATUS_LABELS[entry.status] ?? entry.status}
          </Badge>
        )}
      </div>
    </article>
  );
}
