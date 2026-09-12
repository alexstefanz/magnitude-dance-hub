import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";

const title = "Politica de Cookies – Magnitude Dance";
const description =
  "Ce cookie-uri folosim pe site-ul Magnitude Dance și cum îți poți gestiona preferințele.";

export const Route = createFileRoute("/politica-cookies")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/politica-cookies" },
    ],
    links: [{ rel: "canonical", href: "/politica-cookies" }],
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Legal" title="Politica de Cookies" />
      <section className="section-y bg-background">
        <div className="container-page max-w-3xl space-y-6 text-muted-foreground">
          <p>
            Folosim cookie-uri pentru funcționarea corectă a site-ului și, doar cu acordul tău,
            pentru statistici privind utilizarea site-ului.
          </p>

          <div className="space-y-2">
            <h2 className="font-display text-xl font-bold text-foreground">
              Cookie-uri necesare
            </h2>
            <p>
              Sunt esențiale pentru funcționarea site-ului: memorarea preferințelor tale privind
              cookie-urile și securitatea formularelor. Nu pot fi dezactivate.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-xl font-bold text-foreground">
              Cookie-uri de analiză
            </h2>
            <p>
              Ne ajută să înțelegem cum este folosit site-ul (Google Analytics). Se încarcă doar
              după ce îți exprimi acordul în bannerul de cookie-uri.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-xl font-bold text-foreground">
              Cookie-uri de marketing
            </h2>
            <p>
              Pot fi folosite pentru conținut încorporat din rețelele sociale. Se activează doar cu
              acordul tău.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-xl font-bold text-foreground">
              Cum îți schimbi preferințele
            </h2>
            <p>
              Poți modifica oricând opțiunile din bannerul de cookie-uri sau poți șterge
              cookie-urile din setările browserului tău.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
