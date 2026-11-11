import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Check } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ImageOrPlaceholder } from "@/components/ImagePlaceholder";
import { ScheduleCard, type ScheduleEntry } from "@/components/schedule/ScheduleCard";
import { InstructorCard, type Instructor } from "@/components/sections/InstructorsSection";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { PricingSection } from "@/components/sections/PricingSection";
import { VideoModal } from "@/components/VideoModal";
import { COURSE_CONTENT } from "@/lib/course-content";
import { danceStylesQuery, instructorsQuery, scheduleQuery, DAYS } from "@/lib/content";

type Style = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  long_description: string | null;
  benefits: string[];
  learning_points: string[];
  image_url: string | null;
  hero_image_url: string | null;
  reel_url: string | null;
};

const LOCAL_H1: Record<string, string> = {
  "dansul-mirilor": "Dansul Mirilor în Iași",
  "rueda-de-casino": "Rueda de Casino în Iași",
  "dans-modern-copii": "Dans Modern Copii în Iași",
  "lady-styling": "Lady Styling în Iași",
};

export function DanceStylePage({ slug }: { slug: string }) {
  const { data: styles } = useQuery(danceStylesQuery);
  const { data: schedule } = useQuery(scheduleQuery);
  const { data: instructors } = useQuery(instructorsQuery);

  const style = (styles as Style[] | undefined)?.find((s) => s.slug === slug);
  const entries = ((schedule ?? []) as ScheduleEntry[]).filter(
    (entry) => style && entry.dance_style_id === style.id,
  );
  const styleInstructors = ((instructors ?? []) as Instructor[]).filter((instructor) =>
    style ? (instructor.styles ?? []).includes(style.name) : false,
  );

  const title = style?.name ?? "Curs de dans";
  const content = COURSE_CONTENT[slug];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Curs de dans"
        title={content?.heading ?? LOCAL_H1[slug] ?? title}
        description={content?.intro ?? style?.short_description ?? "[Descriere curs – de completat]"}
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

      {content ? (
        <>
          <section className="section-y bg-background" aria-labelledby="course-why">
            <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={content.image}
                  alt={`Curs de ${title} la Magnitude Dance Iași`}
                  className="aspect-4/5 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-6 text-center md:text-left">
                <h2 id="course-why" className="text-3xl md:text-4xl">{content.whyTitle}</h2>
                <ul className="space-y-4">
                  {content.why.map((p) => (
                    <li key={p.title} className="rounded-2xl border border-border bg-card p-5">
                      <h3 className="font-display text-lg font-bold">{p.title}</h3>
                      <p className="mt-1 text-muted-foreground">{p.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="section-y bg-secondary/40" aria-labelledby="course-learn">
            <div className="container-page">
              <h2 id="course-learn" className="text-center text-3xl md:text-4xl">{content.learnTitle}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{content.learnIntro}</p>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {content.learn.map((p) => (
                  <div key={p.title} className="rounded-2xl border border-border bg-card p-6 text-center">
                    <Check className="mx-auto size-6 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
                    <p className="mt-1 text-muted-foreground">{p.text}</p>
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-12 max-w-2xl text-center">
                <h3 className="text-2xl md:text-3xl">{content.closingTitle}</h3>
                <p className="mt-3 text-muted-foreground">{content.closing}</p>
              </div>
            </div>
          </section>
        </>
      ) : (
      <section className="section-y bg-background">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-2xl">
            <ImageOrPlaceholder
              src={style?.hero_image_url ?? style?.image_url ?? null}
              alt={`Curs de ${title} la Magnitude Dance Iași`}
              label="[Fotografie curs – de înlocuit]"
              className="aspect-4/3"
            />
            {style?.reel_url && (
              <div className="mt-4">
                <VideoModal url={style.reel_url} title={`Reel ${title}`} />
              </div>
            )}
          </div>
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl">Despre cursul de {title}</h2>
            <p className="text-muted-foreground">
              {style?.long_description ?? "[Descriere detaliată – de completat]"}
            </p>
            {style?.benefits && style.benefits.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-bold">Beneficii</h3>
                <ul className="mt-2 space-y-2">
                  {style.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2 text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {style?.learning_points && style.learning_points.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-bold">Ce înveți</h3>
                <ul className="mt-2 space-y-2">
                  {style.learning_points.map((point) => (
                    <li key={point} className="flex gap-2 text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
      )}

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
            <ul className="mt-8 space-y-4">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <p className="mb-1 text-sm font-semibold text-muted-foreground">
                    {DAYS[entry.day_of_week - 1] ?? ""}
                  </p>
                  <ScheduleCard entry={entry} />
                </li>
              ))}
            </ul>
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
            <RegistrationForm defaultCourse={style?.name ?? ""} sourcePage={`/${slug}`} />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
