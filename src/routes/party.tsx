import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, MapPin } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { ImageOrPlaceholder } from "@/components/ImagePlaceholder";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { partyEventsQuery, formatTime, DAYS } from "@/lib/content";
import { useSettings } from "@/hooks/use-settings";

type PartyEvent = {
  id: string;
  title: string;
  description: string | null;
  day_of_week: number | null;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  image_url: string | null;
  entry_info: string | null;
};

const title = "Social Party – petreceri latino în Iași | Magnitude Dance";
const description =
  "Social Party Magnitude: petreceri de salsa, bachata și kizomba în Iași, în fiecare săptămână. Intrare, program și detalii.";

export const Route = createFileRoute("/party")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/party" },
    ],
    links: [{ rel: "canonical", href: "/party" }],
  }),
  component: PartyPage,
});

function PartyPage() {
  const { data } = useQuery(partyEventsQuery);
  const { get } = useSettings();
  const parties = (data ?? []) as PartyEvent[];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Social Party"
        title={get("party_title", "Social Party Magnitude")}
        description={get(
          "party_subtitle",
          "Muzică latino, ring plin și oameni faini. Vino să dansezi, indiferent de nivel.",
        )}
      >
        <WhatsAppButton
          variant="whatsapp"
          label="Detalii party"
          message="Bună! Aș dori detalii despre Social Party."
        />
      </PageHero>

      <section className="section-y bg-background">
        <div className="container-page">
          {parties.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
              [Detaliile petrecerilor vor fi actualizate.]
            </p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {parties.map((party) => (
                <article key={party.id} className="card-elevated overflow-hidden">
                  <div className="aspect-16/9">
                    <ImageOrPlaceholder
                      src={party.image_url}
                      alt={party.title}
                      label="[Fotografie party – de înlocuit]"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-xl font-bold">{party.title}</h2>
                    <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      {party.day_of_week && party.start_time && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-4" aria-hidden="true" />
                          {DAYS[party.day_of_week - 1]} {formatTime(party.start_time)}
                          {party.end_time ? ` – ${formatTime(party.end_time)}` : ""}
                        </span>
                      )}
                      {party.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-4" aria-hidden="true" />
                          {party.location}
                        </span>
                      )}
                    </p>
                    {party.description && (
                      <p className="mt-3 text-sm text-muted-foreground">{party.description}</p>
                    )}
                    {party.entry_info && (
                      <p className="mt-3 rounded-xl bg-secondary/70 p-3 text-sm">
                        {party.entry_info}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
