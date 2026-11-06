import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageOrPlaceholder } from "@/components/ImagePlaceholder";
import { danceStylesQuery } from "@/lib/content";
import { stylePath } from "@/lib/routes";
import { Skeleton } from "@/components/ui/skeleton";
import salsaAsset from "@/assets/style-salsa-real.jpg.asset.json";
import bachataAsset from "@/assets/style-bachata-real.jpg.asset.json";
import kizombaAsset from "@/assets/style-kizomba-real.jpg.asset.json";
import weddingAsset from "@/assets/style-wedding-real.jpg.asset.json";
import ruedaAsset from "@/assets/style-rueda-real.jpg.asset.json";
import kidsAsset from "@/assets/style-kids-real.jpg.asset.json";
import ladyAsset from "@/assets/style-lady-real.jpg.asset.json";
import privateAsset from "@/assets/style-private.png.asset.json";

const STYLE_IMAGES: Record<string, string> = {
  salsa: salsaAsset.url,
  bachata: bachataAsset.url,
  kizomba: kizombaAsset.url,
  "dansul-mirilor": weddingAsset.url,
  "rueda-de-casino": ruedaAsset.url,
  "dans-modern-copii": kidsAsset.url,
  "lady-styling": ladyAsset.url,
  "sedinte-private": privateAsset.url,
};

const LOWER_FOCUS = new Set(["bachata", "kizomba", "rueda-de-casino", "sedinte-private"]);

export type DanceStyle = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  image_url: string | null;
  href?: "/contact";
};

export function DanceStyleCard({ style }: { style: DanceStyle }) {
  const href = style.href ?? stylePath(style.slug);
  return (
    <article className="card-elevated group flex w-full flex-col overflow-hidden">
      <div className="aspect-4/3 overflow-hidden">
        <ImageOrPlaceholder
          src={STYLE_IMAGES[style.slug] || style.image_url || null}
          alt={`Curs de ${style.name} la Magnitude Dance Iași`}
          label="[Fotografie curs – de înlocuit]"
          imageClassName={`transition-transform duration-500 group-hover:scale-105 ${
            LOWER_FOCUS.has(style.slug) ? "object-[center_15%]" : ""
          }`}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold">{style.name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">
          {style.short_description || "[Descriere – de completat]"}
        </p>
        {href && (
          <Button asChild variant="outline" className="mt-4 self-start">
            <Link to={href}>
              Descoperă cursul
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        )}
      </div>
    </article>
  );
}

export function DanceStylesSection() {
  const { data, isLoading } = useQuery(danceStylesQuery);
  const styles = data
    ? [
        ...(data as DanceStyle[]),
        {
          id: "sedinte-private",
          slug: "sedinte-private",
          name: "Ședințe private",
          short_description:
            "Lecții individuale sau în cuplu, adaptate ritmului și obiectivelor tale.",
          image_url: null,
          href: "/contact" as const,
        },
      ]
    : [];

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

        <div className="mt-9 flex flex-wrap justify-center gap-6">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-80 w-full rounded-2xl sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
              />
            ))}
          {styles.map((style) => (
            <div
              key={style.id}
              className="flex w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <DanceStyleCard style={style} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
