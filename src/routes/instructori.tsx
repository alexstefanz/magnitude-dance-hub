import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { InstructorCard, type Instructor } from "@/components/sections/InstructorsSection";
import { instructorsQuery } from "@/lib/content";
import { Skeleton } from "@/components/ui/skeleton";

const title = "Instructori de dans – Magnitude Dance Iași";
const description =
  "Cunoaște echipa Magnitude Dance: instructori de salsa, bachata și kizomba din Iași, cu experiență în competiții și show-uri.";

export const Route = createFileRoute("/instructori")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/instructori" },
    ],
    links: [{ rel: "canonical", href: "/instructori" }],
  }),
  component: InstructorsPage,
});

function InstructorsPage() {
  const { data, isLoading } = useQuery(instructorsQuery);
  const instructors = (data ?? []) as Instructor[];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Echipa"
        title="Instructorii Magnitude"
        description="Oameni pasionați de dans, care te ghidează pas cu pas. [Descrierile complete vor fi actualizate.]"
      />
      <section className="section-y bg-background">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[36rem] w-full rounded-2xl" />
            ))}
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} detailed />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
