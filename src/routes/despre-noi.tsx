import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { WhyMagnitude } from "@/components/sections/WhyMagnitude";
import { InstructorsIntroSection } from "@/components/sections/InstructorsSection";
import { ReviewSlider } from "@/components/sections/ReviewSlider";
import cosminPhoto from "@/assets/cosmin-despre.png";

const title = "Despre Magnitude Dance | Povestea & Viziunea noastră";
const description =
  "Cunoaște echipa Magnitude Dance: Ștefan Cosmin Ioneasa și instructorii noștri pasionați. Află cum a început aventura dansului și cum construim o comunitate bazată pe energie, evoluție și socializare.";

export const Route = createFileRoute("/despre-noi")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        description="Magnitude Dance este comunitatea unde energia și buna dispoziție alimentează pasiunea."
      />

      <section className="section-y bg-background">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl">
            <img
              src={cosminPhoto}
              alt="Ștefan Cosmin Ioneasa, fondatorul Magnitude Dance"
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl">Povestea noastră</h2>
            <p className="text-muted-foreground">
              Simplu spus, sunt un cetățean român, mândru de originile sale de pe plaiuri ieșene.
              Răspund cu implicare și entuziasm la numele complet de Ștefan Cosmin Ioneasa.
            </p>
            <p className="text-muted-foreground">
              Virusarea mea cu pasiunea pentru actul cultural-artistic al dansului a avut loc
              undeva în jurul vârstei de 5 ani, pe vremea când încă nu eram capabil să îmi asum
              anumite dorințe bine conturate și conștientizate în adevăratul sens al cuvântului.
              Asta pentru că la vârsta aceea, mintea îți zboară mai mult la joacă decât la pasiuni
              care să necesite devotament și muncă intensă.
            </p>
            <p className="text-muted-foreground">
              Magnitude Dance este comunitatea unde energia și buna dispoziție alimentează
              pasiunea, iar curajul de a depăși limite este cultivat prin exercițiu constant.
              Împreună, învățăm pas cu pas să ne exprimăm personalitatea cu atitudine și
              dezinvoltură, pășim în afara granițelor rutinei zilnice și ne colorăm viețile
              transpunând în dans trăirile noastre cele mai intense.
            </p>
            <p className="font-semibold text-primary">We are emotion in motion!</p>
          </div>
        </div>
      </section>

      <WhyMagnitude />
      <InstructorsIntroSection />
      <ReviewSlider />
    </SiteLayout>
  );
}
