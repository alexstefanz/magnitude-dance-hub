import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { EventCard, useEventBuckets } from "@/components/sections/EventsSection";
import { Skeleton } from "@/components/ui/skeleton";
import { EventsLegend, EventsTimeline } from "@/components/sections/EventsTimeline";

const title = "Evenimente de dans în Iași – Magnitude Dance";
const description =
  "Petreceri latino, workshop-uri, congrese și show-uri organizate de Magnitude Dance în Iași. Vezi evenimentele viitoare.";

export const Route = createFileRoute("/evenimente")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/evenimente" },
    ],
    links: [{ rel: "canonical", href: "/evenimente" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { upcoming, past, isLoading } = useEventBuckets();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Evenimente"
        title="Evenimente Magnitude"
        description="Petreceri, workshop-uri și show-uri. Locul unde comunitatea se întâlnește pe ringul de dans."
      />

      <section className="section-y bg-background" aria-labelledby="upcoming">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="upcoming" className="text-3xl md:text-4xl">
              Evenimente viitoare
            </h2>
            <EventsLegend />
          </div>
          <EventsTimeline />
          {isLoading && <Skeleton className="mt-6 h-72 w-full rounded-2xl" />}
          {!isLoading && upcoming.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="section-y bg-secondary/40" aria-labelledby="past">
          <div className="container-page">
            <h2 id="past" className="text-3xl md:text-4xl">
              Evenimente trecute
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.slice(0, 9).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
