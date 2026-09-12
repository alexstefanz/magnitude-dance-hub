import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { reviewsQuery } from "@/lib/content";
import { useSettings } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";

type Review = {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string | null;
  avatar_url: string | null;
  review_date: string | null;
};

export function ReviewSlider() {
  const { data } = useQuery(reviewsQuery);
  const { get } = useSettings();
  const reviews = (data ?? []) as Review[];
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: true });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  const scrollTo = useCallback((index: number) => embla?.scrollTo(index), [embla]);

  if (reviews.length === 0) return null;

  return (
    <section className="section-y bg-secondary/40" aria-labelledby="reviews-heading">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Recenzii Google</p>
            <h2 id="reviews-heading" className="mt-2 text-3xl md:text-4xl">
              Ce spun cursanții?
            </h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-display text-2xl font-bold text-foreground">
                {get("google_reviews_rating", "4.7")}
              </span>
              <Stars value={5} />
              <span>{get("google_reviews_count", "248")} recenzii</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Recenzia anterioară"
              onClick={() => embla?.scrollPrev()}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Recenzia următoare"
              onClick={() => embla?.scrollNext()}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="card-elevated min-w-0 shrink-0 basis-full p-6 sm:basis-1/2 lg:basis-1/3"
              >
                <Stars value={review.rating} />
                <p className="mt-4 text-sm text-muted-foreground">{review.review_text}</p>
                <p className="mt-5 font-display font-bold">{review.reviewer_name}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              onClick={() => scrollTo(index)}
              aria-label={`Mergi la recenzia ${index + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                selected === index ? "w-8 bg-primary" : "w-2 bg-border",
              )}
            />
          ))}
        </div>

        {get("google_review_url") && (
          <div className="mt-8 text-center">
            <Button asChild variant="gold">
              <a href={get("google_review_url")} target="_blank" rel="noopener noreferrer">
                Lasă un review pe Google
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} din 5 stele`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("size-4", i < value ? "fill-accent text-accent" : "text-border")}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
