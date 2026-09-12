import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { FeedbackForm } from "@/components/forms/FeedbackForm";

const title = "Formular de feedback – Magnitude Dance Iași";
const description =
  "Spune-ne părerea ta despre cursurile Magnitude Dance din Iași. Feedback-ul tău ne ajută să devenim mai buni.";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/feedback" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/feedback" }],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Feedback"
        title="Părerea ta contează"
        description="Poți completa formularul anonim sau cu numele tău. Citim fiecare mesaj."
      />
      <section className="section-y bg-background">
        <div className="container-page max-w-3xl">
          <FeedbackForm />
        </div>
      </section>
    </SiteLayout>
  );
}
