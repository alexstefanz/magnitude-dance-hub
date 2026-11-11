import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { DanceStylesSection } from "@/components/sections/DanceStylesSection";
import { WhyMagnitude } from "@/components/sections/WhyMagnitude";
import { InstructorsIntroSection } from "@/components/sections/InstructorsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ReviewSlider } from "@/components/sections/ReviewSlider";
import { UpcomingEventsSection } from "@/components/sections/EventsSection";
import { SocialSection } from "@/components/sections/SocialSection";

// SEO title/description kept identical to the previous magnitudedance.ro page.
const title = "Magnitude Dance Iași | Cursuri Salsa, Bachata, Kizomba & Petreceri";
const description =
  "Descoperă comunitatea Magnitude Dance din Iași – cursuri de salsa, bachata, kizomba pentru toate nivelurile, social party-uri, coregrafii și evenimente internationale. Energie, pasiune și vibe autentic!";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DanceSchool",
          name: "Magnitude Dance",
          description,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Aleea Vasile Petrescu 5",
            addressLocality: "Iași",
            addressCountry: "RO",
          },
          telephone: "+40758515946",
          email: "magnitudedance@gmail.com",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.7",
            reviewCount: "248",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <UpcomingEventsSection />
      <DanceStylesSection />
      <WhyMagnitude />
      <InstructorsIntroSection />
      <PricingSection />
      <ReviewSlider />
      <SocialSection />
    </SiteLayout>
  );
}
