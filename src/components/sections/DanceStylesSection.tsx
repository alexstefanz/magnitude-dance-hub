import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageOrPlaceholder } from "@/components/ImagePlaceholder";
import { danceStylesQuery } from "@/lib/content";
import { Skeleton } from "@/components/ui/skeleton";

export type DanceStyle = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  image_url: string | null;
};

export function DanceStyleCard({ style }: { style: DanceStyle }) {
  return (
    <article className="card-elevated group flex flex-col overflow-hidden">
      <div className="aspect-4/3 overflow-hidden">
        <ImageOrPlaceholder
          src={style.image_url}
          alt={`Curs de ${style.name} la Magnitude Dance Iași`}
          label="[Fotografie curs – de înlocuit]"
          imageClassName="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold">{style.name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">
          {style.short_description || "[Descriere – de completat]"}
        </p>
        <Button asChild variant="outline" className="mt-4 self-start">
          <Link to={`/${style.slug}`}>
            Descoperă cursul
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function DanceStylesSection() {
  const { data, isLoading } = useQuery(danceStylesQuery);
  const styles = (data ?? []) as DanceStyle[];

  return (
    <section className="section-y bg-secondary/40" aria-labelledby="styles-heading">
      <div className="container-page">
        <p className="eyebrow">Cursuri</p>
        <h2 id="styles-heading" className="mt-2 text-3xl md:text-4xl">
          Descoperă cursurile Magnitude
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Grupe pe niveluri, de la primii pași până la avansați. Alege stilul care te reprezintă și
          hai să dansăm.
        </p>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" />
            ))}
          {styles.map((style) => (
            <DanceStyleCard key={style.id} style={style} />
          ))}
        </div>
      </div>
    </section>
  );
}
