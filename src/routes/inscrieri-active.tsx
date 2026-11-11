import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, GraduationCap, Users } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import kizombaPoster from "@/assets/inscrieri-kizomba.png.asset.json";
import salsaBachataPoster from "@/assets/inscrieri-salsa-bachata.png.asset.json";

const title = "Înscrieri active | Magnitude Dance Iași";
const description =
  "Înscrie-te la cursurile noi Magnitude Dance Iași: Kizomba Începători din 16 noiembrie și Salsa & Bachata Începători din 23 noiembrie.";

export const Route = createFileRoute("/inscrieri-active")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/inscrieri-active" }],
  }),
  component: ActiveEnrollmentPage,
});

const COURSES = [
  {
    id: "Kizomba",
    slug: "kizomba-incepatori",
    name: "Kizomba",
    image: kizombaPoster.url,
    level: "Începător",
    start: "16 Noiembrie",
    schedule: "Luni și Miercuri de la 21:00",
    instructors: "Ștefan & Alle",
  },
  {
    id: "Salsa",
    slug: "salsa-bachata-incepatori",
    name: "Salsa & Bachata",
    image: salsaBachataPoster.url,
    level: "Începător",
    start: "23 Noiembrie",
    schedule: "Luni și Miercuri, 19:00 – 21:00",
    instructors: "Ștefan & Alle",
  },
];

function ActiveEnrollmentPage() {
  const [course, setCourse] = useState<string | undefined>(undefined);

  function choose(id: string) {
    setCourse(id);
    requestAnimationFrame(() =>
      document.getElementById("formular")?.scrollIntoView({ behavior: "smooth" }),
    );
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Înscrieri"
        title="Înscrieri active"
        description="Cursurile noi pentru care ne poți trimite înscrierea chiar acum."
      />
      <section className="section-y bg-background">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {COURSES.map((c) => (
              <article key={c.name} className="card-elevated flex flex-col overflow-hidden rounded-xl">
                <img
                  src={c.image}
                  alt={`Afiș înscrieri curs ${c.name} – nivel ${c.level}`}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h2 className="text-center font-display text-2xl font-bold md:text-left">
                    {c.name} - {c.level}
                  </h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" /> Start: <strong className="text-foreground">{c.start}</strong></li>
                    <li className="flex items-center gap-2"><Clock className="size-4 text-primary" /> {c.schedule}</li>
                    <li className="flex items-center gap-2"><GraduationCap className="size-4 text-primary" /> Nivel: {c.level}</li>
                    <li className="flex items-center gap-2"><Users className="size-4 text-primary" /> Instructori: {c.instructors}</li>
                  </ul>
                  <div className="mt-auto flex flex-col gap-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/inscrieri/$slug" params={{ slug: c.slug }}>Vezi detalii curs</Link>
                    </Button>
                    <Button className="w-full" onClick={() => choose(c.id)}>
                      Înscrie-te la curs
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div id="formular" className="mx-auto mt-16 max-w-3xl scroll-mt-28">
            <h2 className="mb-6 text-center font-display text-3xl font-bold">Formular de înscriere</h2>
            <RegistrationForm key={course ?? "none"} defaultCourse={course} sourcePage="/inscrieri-active" />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
