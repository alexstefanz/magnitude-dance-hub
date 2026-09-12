import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { ImageOrPlaceholder } from "@/components/ImagePlaceholder";
import { VideoModal } from "@/components/VideoModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { choreographiesQuery } from "@/lib/content";

type Choreography = {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  reel_url: string | null;
  category: string;
};

const title = "Coregrafii & Dansul Mirilor – Magnitude Dance Iași";
const description =
  "Coregrafii personalizate pentru nuntă, evenimente și show-uri, create de echipa Magnitude Dance din Iași.";

export const Route = createFileRoute("/coregrafii")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/coregrafii" },
    ],
    links: [{ rel: "canonical", href: "/coregrafii" }],
  }),
  component: ChoreographiesPage,
});

function ChoreographiesPage() {
  const { data } = useQuery(choreographiesQuery);
  const items = (data ?? []) as Choreography[];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Coregrafii"
        title="Coregrafii personalizate"
        description="Creăm coregrafii pentru nuntă, aniversări, evenimente corporate și show-uri. Spune-ne ce îți dorești și construim momentul împreună."
      >
        <WhatsAppButton
          variant="whatsapp"
          label="Cere o ofertă"
          message="Bună! Aș dori o ofertă pentru o coregrafie personalizată."
        />
      </PageHero>

      <section className="section-y bg-background">
        <div className="container-page">
          {items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
              [Galeria de coregrafii va fi adăugată ulterior.]
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article key={item.id} className="card-elevated overflow-hidden">
                  <div className="aspect-16/9">
                    <ImageOrPlaceholder
                      src={item.thumbnail_url}
                      alt={item.title}
                      label="[Fotografie coregrafie – de înlocuit]"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-display text-lg font-bold">{item.title}</h2>
                    {item.description && (
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    )}
                    {(item.video_url || item.reel_url) && (
                      <div className="mt-4">
                        <VideoModal url={(item.video_url || item.reel_url)!} title={item.title} />
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
