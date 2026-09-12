import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";

const title = "Înscrieri active | Magnitude Dance Iași";
const description = "Formularul dedicat următoarei perioade de înscrieri Magnitude Dance.";

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

function ActiveEnrollmentPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Înscrieri" title="Înscrieri active" description="Formularul pentru următoarea perioadă de înscrieri va fi publicat aici." />
      <section className="section-y bg-background">
        <div className="container-page">
          <div className="min-h-56 border-y border-border" aria-label="Formular în pregătire" />
          <Button asChild variant="outline" className="mt-8">
            <Link to="/"><ArrowLeft aria-hidden="true" /> Înapoi la pagina principală</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}