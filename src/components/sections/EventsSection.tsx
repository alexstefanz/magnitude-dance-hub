import { useQuery } from "@tanstack/react-query";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageOrPlaceholder } from "@/components/ImagePlaceholder";
import { eventsQuery } from "@/lib/content";

export type EventItem = {
  id: string;
  title: string;
  image_url: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  short_description: string | null;
  event_type: string | null;
  facebook_event_url: string | null;
  external_url: string | null;
  registration_url: string | null;
  is_featured: boolean;
};

export function formatEventDate(value: string) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Bucharest",
  }).format(new Date(value));
}

export function EventCard({ event }: { event: EventItem }) {
  const link = event.registration_url || event.facebook_event_url || event.external_url;
  return (
    <article className="card-elevated flex flex-col overflow-hidden">
      <div className="aspect-16/9 overflow-hidden">
        <ImageOrPlaceholder
          src={event.image_url}
          alt={event.title}
          label="[Fotografie eveniment – de înlocuit]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {event.event_type && <Badge variant="secondary">{event.event_type}</Badge>}
          {event.is_featured && <Badge>Recomandat</Badge>}
        </div>
        <h3 className="mt-3 font-display text-lg font-bold">{event.title}</h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-4" aria-hidden="true" />
            {formatEventDate(event.start_date)}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-4" aria-hidden="true" />
              {event.location}
            </span>
          )}
        </p>
        {event.short_description && (
          <p className="mt-3 flex-1 text-sm text-muted-foreground">{event.short_description}</p>
        )}
        {link && (
          <Button asChild variant="outline" className="mt-4 self-start">
            <a href={link} target="_blank" rel="noopener noreferrer">
              Detalii
              <ExternalLink aria-hidden="true" />
            </a>
          </Button>
        )}
      </div>
    </article>
  );
}

export function useEventBuckets() {
  const { data, isLoading } = useQuery(eventsQuery);
  const events = (data ?? []) as EventItem[];
  const now = Date.now();
  const upcoming = events
    .filter((e) => new Date(e.end_date ?? e.start_date).getTime() >= now)
    .sort((a, b) => +new Date(a.start_date) - +new Date(b.start_date));
  const past = events
    .filter((e) => new Date(e.end_date ?? e.start_date).getTime() < now)
    .sort((a, b) => +new Date(b.start_date) - +new Date(a.start_date));
  return { upcoming, past, isLoading };
}

export function UpcomingEventsSection() {
  const { upcoming } = useEventBuckets();

  return (
    <section className="section-y bg-secondary/40" aria-labelledby="events-heading">
      <div className="container-page">
        <p className="eyebrow">Evenimente</p>
        <h2 id="events-heading" className="mt-2 text-3xl md:text-4xl">
          Evenimente viitoare
        </h2>
        {upcoming.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
            Momentan nu avem evenimente programate. Revino curând – pregătim mereu ceva.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
