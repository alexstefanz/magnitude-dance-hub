import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { FullSchedule } from "@/components/schedule/FullSchedule";
import { PricingSection } from "@/components/sections/PricingSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const title = "Orar cursuri de dans – Magnitude Dance Iași";
const description =
  "Orarul complet al cursurilor de salsa, bachata, kizomba și lady styling la Magnitude Dance Iași, plus prețurile abonamentelor.";

export const Route = createFileRoute("/orar")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/orar" },
    ],
    links: [{ rel: "canonical", href: "/orar" }],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Orar"
        title="Orarul cursurilor"
        description="Alege ziua și stilul care ți se potrivesc. Grupele noi se formează constant – scrie-ne dacă nu găsești un interval potrivit."
      >
        <WhatsAppButton variant="whatsapp" label="Întreabă despre grupe" />
      </PageHero>
      <section className="section-y bg-background">
        <div className="container-page">
          <FullSchedule />
        </div>
      </section>
      <PricingSection />
    </SiteLayout>
  );
}
