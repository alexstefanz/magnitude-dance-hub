import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduleCard, type ScheduleEntry } from "@/components/schedule/ScheduleCard";
import { DAYS, currentDayOfWeek, scheduleQuery } from "@/lib/content";
import { Skeleton } from "@/components/ui/skeleton";

export function TodaySchedule() {
  const { data, isLoading } = useQuery(scheduleQuery);
  const today = currentDayOfWeek();
  const entries = ((data ?? []) as ScheduleEntry[]).filter((e) => e.day_of_week === today);

  return (
    <section className="section-y bg-background" aria-labelledby="today-heading">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{DAYS[today - 1]}</p>
            <h2 id="today-heading" className="mt-2 text-3xl md:text-4xl">
              Astăzi la Magnitude
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/orar">
              <CalendarDays aria-hidden="true" />
              Vezi orarul complet
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-3">
          {isLoading && (
            <>
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
            </>
          )}
          {!isLoading && entries.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
              <p className="font-display text-lg font-bold">
                Astăzi este liber. Ne vedem la următorul curs!
              </p>
              <Button asChild className="mt-4" variant="hero">
                <Link to="/orar">Vezi orarul complet</Link>
              </Button>
            </div>
          )}
          {entries.map((entry) => (
            <ScheduleCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
