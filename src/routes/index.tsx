import { seoHead, SEO } from "@/config/seo";
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

const description = SEO["/"].description;

export const Route = createFileRoute("/")({
  head: () => ({
    ...seoHead("/"),
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
