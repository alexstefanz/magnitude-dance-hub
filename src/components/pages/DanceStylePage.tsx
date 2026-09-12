import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ImageOrPlaceholder } from "@/components/ImagePlaceholder";
import { ScheduleCard, type ScheduleEntry } from "@/components/schedule/ScheduleCard";
import { InstructorCard, type Instructor } from "@/components/sections/InstructorsSection";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { PricingSection } from "@/components/sections/PricingSection";
import { danceStylesQuery, instructorsQuery, scheduleQuery, DAYS } from "@/lib/content";

type Style = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  long_description: string | null;
  benefits: string | null;
  target_audience: string | null;
  image_url: string | null;
  video_url: string | null;
};

export function DanceStylePage({ slug }: { slug: string }) {
  const { data: styles } = useQuery(danceStylesQuery);
  const { data: schedule } = useQuery(scheduleQuery);
  const { data: instructors } = useQuery(instructorsQuery);

  const style = ((styles ?? []) as Style[]).find((s) => s.slug === slug);
  const entries = ((schedule ?? []) as ScheduleEntry[]).filter(
    (entry) => entry.dance_style_id === style?.id,
  );
  const styleInstructors = ((instructors ?? []) as Instructor[]).filter((instructor) =>
    style ? instructor.styles?.includes(style.name) : false,
  );

  const title = style?.name ?? "Curs de dans";

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Curs de dans"
        title={title}
        description={style?.short_description ?? "[Descriere curs – de completat]"}
      >
        <WhatsAppButton
          variant="whatsapp"
          message={`Bună! Aș dori detalii despre cursul de ${title} la Magnitude Dance.`}
        />
        <Button asChild size="lg" variant="outlineLight">
          <Link to="/orar">
            <CalendarDays aria-hidden="true" />
            Vezi orarul complet
          </Link>
        </Button>
      </PageHero>

      <section className="section-y bg-background">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-2xl">
            <ImageOrPlaceholder
              src={style?.image_url ?? null}
              alt={`Curs de ${title} la Magnitude Dance Iași`}
              label="[Fotografie curs – de înlocuit]"
              className="aspect-4/3"
            />
          </div>
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl">Despre cursul de {title}</h2>
            <p className="text-muted-foreground">
              {style?.long_description ?? "[Descriere detaliată – de completat]"}
            </p>
            {style?.benefits && (
              <div>
                <h3 className="font-display text-lg font-bold">Beneficii</h3>
                <p className="mt-2 text-muted-foreground">{style.benefits}</p>
              </div>
            )}
            {style?.target_audience && (
              <div>
                <h3 className="font-display text-lg font-bold">Pentru cine este</h3>
                <p className="mt-2 text-muted-foreground">{style.target_audience}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/40" aria-labelledby="style-schedule">
        <div className="container-page">
          <p className="eyebrow">Orar</p>
          <h2 id="style-schedule" className="mt-2 text-3xl md:text-4xl">
            Când avem cursuri de {title}
          </h2>
          {entries.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
              Grupele noi se formează constant. Scrie-ne pe WhatsApp pentru următoarea grupă de{" "}
              {title}.
            </p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <ScheduleCard
                  key={entry.id}
                  entry={entry}
                  dayLabel={DAYS[(entry.day_of_week ?? 1) - 1]}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {styleInstructors.length > 0 && (
        <section className="section-y bg-background" aria-labelledby="style-instructors">
          <div className="container-page">
            <p className="eyebrow">Instructori</p>
            <h2 id="style-instructors" className="mt-2 text-3xl md:text-4xl">
              Cine predă {title}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {styleInstructors.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>
          </div>
        </section>
      )}

      <PricingSection />

      <section className="section-y bg-secondary/40" aria-labelledby="style-form">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">Înscriere</p>
          <h2 id="style-form" className="mt-2 text-3xl md:text-4xl">
            Înscrie-te la {title}
          </h2>
          <p className="mt-3 text-muted-foreground">
            Completează formularul și te contactăm cu detaliile grupei potrivite pentru tine.
          </p>
          <div className="mt-8">
            <RegistrationForm defaultCourse={style?.name} sourcePage={`/${slug}`} />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
