import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, GraduationCap, Users, Wallet, ArrowLeft, MapPin, Check } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { findActiveCourse } from "@/lib/active-courses";

const BASE = "https://zorila-alexandru.ro";

export const Route = createFileRoute("/inscrieri/$slug")({
  loader: ({ params }) => {
    const course = findActiveCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ params, loaderData }) => {
    const c = loaderData?.course;
    const url = `${BASE}/inscrieri/${params.slug}`;
    if (!c) return { meta: [{ title: "Curs indisponibil | Magnitude Dance" }, { name: "robots", content: "noindex" }] };
    const image = `${BASE}${c.image}`;
    return {
      meta: [
        { title: c.title },
        { name: "description", content: c.description },
        { property: "og:title", content: c.title },
        { property: "og:description", content: c.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-page section-y pt-32 text-center">
        <h1 className="text-3xl">Cursul nu mai este disponibil</h1>
        <Button asChild className="mt-6"><Link to="/inscrieri-active">Vezi înscrierile active</Link></Button>
      </div>
    </SiteLayout>
  ),
  component: CoursePage,
});

function CoursePage() {
  const { course: c } = Route.useLoaderData();
  const facts = [
    { icon: CalendarDays, label: "Start", value: c.start },
    { icon: Clock, label: "Program", value: c.schedule },
    { icon: Wallet, label: "Cost", value: c.price },
    { icon: GraduationCap, label: "Nivel", value: c.level },
    { icon: Users, label: "Instructori", value: c.instructors },
    ...(c.location ? [{ icon: MapPin, label: "Locație", value: c.location }] : []),
  ];
  return (
    <SiteLayout>
      <section className="section-y bg-background pt-28 md:pt-32">
        <div className="container-page">
          <Link to="/inscrieri-active" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="size-4" /> Toate înscrierile active
          </Link>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <img src={c.image} alt={`Afiș înscrieri curs ${c.name} – nivel ${c.level}`} className="w-full rounded-2xl object-cover shadow-lg" />
            <div className="space-y-6 text-center md:text-left">
              <p className="eyebrow">Înscrieri deschise</p>
              <h1 className="text-3xl md:text-5xl">Curs {c.name} Iași – {c.level}</h1>
              <p className="font-display text-xl font-bold">{c.headline}</p>
              {c.paragraphs.map((p) => (
                <p key={p} className="text-muted-foreground">{p}</p>
              ))}
              <ul className="grid gap-3 rounded-2xl border border-border bg-card p-5 text-left sm:grid-cols-2">
                {facts.map((f) => (
                  <li key={f.label} className="flex items-start gap-3">
                    <f.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <span><span className="block text-xs text-muted-foreground">{f.label}</span><strong>{f.value}</strong></span>
                  </li>
                ))}
              </ul>
              {c.format && (
                <ul className="space-y-2 text-left">
                  {c.format.map((f) => (
                    <li key={f} className="flex items-center gap-2"><Check className="size-4 text-primary" aria-hidden="true" />{f}</li>
                  ))}
                </ul>
              )}
              {c.offers && (
                <div className="rounded-2xl border-2 border-primary bg-card p-5 text-left">
                  <p className="font-display text-lg font-bold text-primary">{c.offerTitle}</p>
                  <ul className="mt-3 space-y-3">
                    {c.offers.map((o) => (
                      <li key={o.price}>
                        <span className="mr-2 text-muted-foreground line-through">{o.old}</span>
                        <strong className="text-xl">{o.price}</strong>
                        {o.note && <span className="block text-sm text-muted-foreground">{o.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg"><a href="#formular">Înscrie-te acum</a></Button>
                <WhatsAppButton variant="whatsapp" message={`Bună! Aș dori detalii despre cursul de ${c.name} ${c.level} care începe pe ${c.start}.`} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {c.sections && (
        <section className="section-y bg-background pt-0">
          <div className="container-page grid gap-6 md:grid-cols-3">
            {c.sections.map((x) => (
              <div key={x.title} className="rounded-2xl border border-border bg-card p-6 text-center md:text-left">
                <h2 className="mb-3 text-xl">{x.title}</h2>
                <p className="text-muted-foreground">{x.text}</p>
              </div>
            ))}
          </div>
          {c.closing && <p className="container-page mt-8 text-center font-display text-lg font-bold">{c.closing}</p>}
        </section>
      )}
      <section id="formular" className="section-y scroll-mt-28 bg-secondary/40">
        <div className="container-page max-w-3xl">
          <h2 className="mb-6 text-center text-3xl md:text-4xl">Formular de înscriere – {c.name}</h2>
          <RegistrationForm defaultCourse={c.formCourse} sourcePage={`/inscrieri/${c.slug}`} />
        </div>
      </section>
    </SiteLayout>
  );
}
