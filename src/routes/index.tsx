import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { DanceStylesSection } from "@/components/sections/DanceStylesSection";
import { TodaySchedule } from "@/components/schedule/TodaySchedule";
import { WhyMagnitude } from "@/components/sections/WhyMagnitude";
import { InstructorsIntroSection } from "@/components/sections/InstructorsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ReviewSlider } from "@/components/sections/ReviewSlider";
import { UpcomingEventsSection } from "@/components/sections/EventsSection";
import { SocialSection } from "@/components/sections/SocialSection";

const title = "Magnitude Dance Iași – Cursuri de Salsa, Bachata și Kizomba";
const description =
  "Școala și comunitatea de dans latino din Iași: cursuri de salsa, bachata, kizomba, petreceri săptămânale și evenimente. Înscrie-te acum!";

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
      <DanceStylesSection />
      <TodaySchedule />
      <WhyMagnitude />
      <InstructorsIntroSection />
      <PricingSection />
      <ReviewSlider />
      <UpcomingEventsSection />
      <SocialSection />
    </SiteLayout>
  );
}
