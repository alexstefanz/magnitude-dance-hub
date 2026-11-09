import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageOrPlaceholder } from "@/components/ImagePlaceholder";
import { instructorsQuery } from "@/lib/content";
import stefanPhoto from "@/assets/instructor-stefan-cosmin.jpg.asset.json";
import stefPhoto from "@/assets/instructor-stef.jpg.asset.json";
import vladPhoto from "@/assets/instructor-vlad.jpg.asset.json";
import allePhoto from "@/assets/instructor-ale.jpg.asset.json";

const instructorPhotos: Record<string, string> = {
  "stefan-cosmin-ioneasa": stefanPhoto.url,
  stefania: stefPhoto.url,
  vlad: vladPhoto.url,
  alle: allePhoto.url,
};

export type Instructor = {
  id: string;
  slug: string;
  name: string;
  role_title: string | null;
  image_url: string | null;
  short_description: string | null;
  biography: string | null;
  dance_history: string | null;
  achievements: string | null;
  dance_meaning: string | null;
  styles: string[];
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
};

export function InstructorCard({
  instructor,
  detailed,
}: {
  instructor: Instructor;
  detailed?: boolean;
}) {
  return (
    <article className="card-elevated flex flex-col overflow-hidden">
      <div className="aspect-3/4 overflow-hidden">
        <ImageOrPlaceholder
          src={instructor.image_url || instructorPhotos[instructor.slug] || null}
          alt={`${instructor.name} – instructor Magnitude Dance`}
          label="[Fotografie instructor – de înlocuit]"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="font-display text-base font-bold sm:text-lg">{instructor.name}</h3>
        {instructor.role_title && (
          <p className="text-xs font-medium text-primary sm:text-sm">{instructor.role_title}</p>
        )}
        {instructor.styles.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {instructor.styles.map((style) => (
              <Badge key={style} variant="secondary">
                {style}
              </Badge>
            ))}
          </div>
        )}
        <p className="mt-3 text-sm text-muted-foreground">
          {instructor.short_description || "[Descriere instructor – de completat]"}
        </p>

        {detailed && (
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>{instructor.biography || "[Biografie – de completat]"}</p>
            {instructor.dance_history && (
              <p>
                <span className="font-semibold text-foreground">Parcurs în dans: </span>
                {instructor.dance_history}
              </p>
            )}
            {instructor.achievements && (
              <p>
                <span className="font-semibold text-foreground">Palmares: </span>
                {instructor.achievements}
              </p>
            )}
            {instructor.dance_meaning && (
              <p>
                <span className="font-semibold text-foreground">Ce reprezintă dansul: </span>
                {instructor.dance_meaning}
              </p>
            )}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          {instructor.instagram_url && (
            <SocialLink href={instructor.instagram_url} label={`Instagram ${instructor.name}`}>
              <Instagram className="size-4" />
            </SocialLink>
          )}
          {instructor.facebook_url && (
            <SocialLink href={instructor.facebook_url} label={`Facebook ${instructor.name}`}>
              <Facebook className="size-4" />
            </SocialLink>
          )}
          {instructor.tiktok_url && (
            <SocialLink href={instructor.tiktok_url} label={`TikTok ${instructor.name}`}>
              <Music2 className="size-4" />
            </SocialLink>
          )}
        </div>
      </div>
    </article>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </a>
  );
}

export function InstructorsIntroSection() {
  const { data } = useQuery(instructorsQuery);
  const instructors = ((data ?? []) as Instructor[]).slice(0, 4);

  return (
    <section className="section-y bg-background" aria-labelledby="team-heading">
      <div className="container-page">
        <div className="flex flex-col items-center gap-4 text-center">
          <div>
            <p className="eyebrow">Echipa</p>
            <h2 id="team-heading" className="mt-2 text-3xl md:text-4xl">
              Cunoaște echipa Magnitude
            </h2>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              Instructori care predau cu energie și răbdare, de la primul pas până la scenă.
              [Descrieri instructori – de completat]
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="hero">
              <Link to="/despre-noi">Despre noi</Link>
            </Button>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  );
}
