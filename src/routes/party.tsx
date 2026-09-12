import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, ExternalLink, MapPin } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { ImageOrPlaceholder } from "@/components/ImagePlaceholder";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { partyEventsQuery, scheduleQuery, formatTime, DAYS } from "@/lib/content";
import type { ScheduleEntry } from "@/components/schedule/ScheduleCard";
import { useSettings } from "@/hooks/use-settings";

type PartyEvent = {
  id: string;
  title: string;
  short_description: string | null;
  party_date: string | null;
  image_url: string | null;
  facebook_album_url: string | null;
  external_url: string | null;
};

const title = "Social Party – petreceri latino în Iași | Magnitude Dance";
const description =
  "Social Party Magnitude: petreceri de salsa, bachata și kizomba în Iași, în fiecare săptămână. Program, locație și galerie foto.";

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
  const { data: schedule } = useQuery(scheduleQuery);
  const { get } = useSettings();
  const parties = (data ?? []) as PartyEvent[];
  const partyEntries = ((schedule ?? []) as ScheduleEntry[]).filter((entry) => entry.is_special);

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

      <section className="section-y bg-background" aria-labelledby="party-program">
        <div className="container-page">
          <p className="eyebrow">Program</p>
          <h2 id="party-program" className="mt-2 text-3xl md:text-4xl">
            Când dansăm
          </h2>
          {partyEntries.length === 0 ? (
            <p className="mt-6 text-muted-foreground">
              {get("party_schedule_note", "[Programul petrecerilor va fi actualizat.]")}
            </p>
          ) : (
            <ul className="mt-6 space-y-3">
              {partyEntries.map((entry) => (
                <li
                  key={entry.id}
                  className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-border bg-card p-5"
                >
                  <span className="font-display text-lg font-bold text-primary">
                    {DAYS[entry.day_of_week - 1]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="size-4" aria-hidden="true" />
                    {formatTime(entry.start_time)}
                    {entry.end_time ? ` – ${formatTime(entry.end_time)}` : ""}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-4" aria-hidden="true" />
                    {entry.room}
                  </span>
                  <span className="font-medium">{entry.style_label}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-6 max-w-2xl text-muted-foreground">
            {get("address", "Aleea Vasile Petrescu 5, Iași")} – intrarea și detaliile actualizate le
            anunțăm mereu pe rețelele sociale.
          </p>
        </div>
      </section>

      <section className="section-y bg-secondary/40" aria-labelledby="party-gallery">
        <div className="container-page">
          <p className="eyebrow">Galerie</p>
          <h2 id="party-gallery" className="mt-2 text-3xl md:text-4xl">
            Petrecerile noastre
          </h2>
          {parties.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
              [Galeria petrecerilor va fi adăugată ulterior.]
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {parties.map((party) => {
                const link = party.facebook_album_url || party.external_url;
                return (
                  <article key={party.id} className="card-elevated overflow-hidden">
                    <div className="aspect-16/9">
                      <ImageOrPlaceholder
                        src={party.image_url}
                        alt={party.title}
                        label="[Fotografie party – de înlocuit]"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold">{party.title}</h3>
                      {party.short_description && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {party.short_description}
                        </p>
                      )}
                      {link && (
                        <Button asChild variant="outline" className="mt-4">
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            Vezi album
                            <ExternalLink aria-hidden="true" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
