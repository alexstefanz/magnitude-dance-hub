import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { WhyMagnitude } from "@/components/sections/WhyMagnitude";
import { InstructorsIntroSection } from "@/components/sections/InstructorsSection";
import { ReviewSlider } from "@/components/sections/ReviewSlider";
import { ImageOrPlaceholder } from "@/components/ImagePlaceholder";

const title = "Despre noi – Magnitude Dance Iași";
const description =
  "Magnitude Dance este comunitatea de dans latino din Iași: cursuri, petreceri, evenimente și oameni care trăiesc dansul. We are emotion in motion.";

export const Route = createFileRoute("/despre-noi")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/despre-noi" },
    ],
    links: [{ rel: "canonical", href: "/despre-noi" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Despre noi"
        title="We are emotion in motion"
        description="Magnitude Dance este mai mult decât o școală de dans: este locul unde înveți, socializezi și te bucuri de fiecare pas."
      />

      <section className="section-y bg-background">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-2xl">
            <ImageOrPlaceholder
              src={null}
              alt="Comunitatea Magnitude Dance din Iași"
              label="[Fotografie echipă – de înlocuit]"
              className="aspect-4/3"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl">Povestea noastră</h2>
            <p className="text-muted-foreground">
              [Textul complet despre istoria școlii va fi actualizat.] Am pornit din dorința de a
              aduce dansul latino mai aproape de oamenii din Iași și am construit, pas cu pas, o
              comunitate care se întâlnește la cursuri, la petreceri și la evenimente.
            </p>
            <p className="text-muted-foreground">
              La Magnitude înveți în grupe pe niveluri, cu instructori care explică pe înțelesul
              tuturor. Nu ai nevoie de partener sau de experiență – doar de chef de dans.
            </p>
          </div>
        </div>
      </section>

      <WhyMagnitude />
      <InstructorsIntroSection />
      <ReviewSlider />
    </SiteLayout>
  );
}
