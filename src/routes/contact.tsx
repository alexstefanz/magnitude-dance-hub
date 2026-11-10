import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useSettings } from "@/hooks/use-settings";
import { telLink } from "@/lib/whatsapp";

// SEO title/description kept identical to the previous magnitudedance.ro page.
const title = "Magnitude Dance | Contact Magnitude Dance Iași – Înscrieri & Studio";
const description =
  "Ia legătura cu Magnitude Dance Iași – înscrieri cursuri de dans, programări private, adresa studioului (Aleea Vasile Petrescu 5), telefon și email.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { get } = useSettings();
  const mapEmbed = get("google_maps_embed_url");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Hai să vorbim"
        description="Scrie-ne pe WhatsApp pentru cel mai rapid răspuns sau completează formularul și te contactăm noi."
      >
        <WhatsAppButton variant="whatsapp" />
      </PageHero>

      <section className="section-y bg-background">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl">Date de contact</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="size-5 text-primary" aria-hidden="true" />
                <a href={telLink(get("phone"))} className="hover:text-primary">
                  {get("phone", "+40 758 515 946")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-primary" aria-hidden="true" />
                <a
                  href={`mailto:${get("email", "magnitudedance@gmail.com")}`}
                  className="hover:text-primary"
                >
                  {get("email", "magnitudedance@gmail.com")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 text-primary" aria-hidden="true" />
                <span>{get("address", "Aleea Vasile Petrescu 5, Iași")}</span>
              </li>
            </ul>
            {mapEmbed && (
              <iframe
                title="Harta locației Magnitude Dance"
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full rounded-2xl border border-border"
              />
            )}
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl">Formular de înscriere</h2>
            <p className="mt-3 text-muted-foreground">
              Completează datele și îți răspundem cu grupele disponibile.
            </p>
            <div className="mt-6">
              <RegistrationForm sourcePage="/contact" />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
