import { useQuery } from "@tanstack/react-query";
import { CalendarCheck, Check, Star } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Badge } from "@/components/ui/badge";
import { pricingQuery } from "@/lib/content";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type PricingPackage = {
  id: string;
  name: string;
  category: string;
  price: number;
  discounted_price: number | null;
  price_unit: string;
  sessions_count: number | null;
  description: string | null;
  eligibility_notes: string | null;
  is_featured: boolean;
};

const CATEGORY_LABELS: Record<string, string> = {
  grup: "Cursuri de grup",
  privat: "Ședințe private",
};

export function PricingCard({ pkg }: { pkg: PricingPackage }) {
  const finalPrice = pkg.discounted_price ?? pkg.price;
  return (
    <article
      className={cn(
        "card-elevated flex flex-col p-6",
        pkg.is_featured && "border-primary/40 ring-2 ring-primary/25",
      )}
    >
      {pkg.is_featured && (
        <Badge className="mb-3 w-fit gap-1">
          <Star className="size-3" aria-hidden="true" /> Recomandat
        </Badge>
      )}
      <h3 className="font-display text-lg font-bold">{pkg.name}</h3>
      <p className="mt-3 font-display text-3xl font-extrabold text-primary">
        {Number(finalPrice)} <span className="text-base font-semibold">{pkg.price_unit}</span>
        {pkg.discounted_price && (
          <span className="ml-2 align-middle text-sm font-medium text-muted-foreground line-through">
            {Number(pkg.price)} {pkg.price_unit}
          </span>
        )}
      </p>
      {pkg.sessions_count ? (
        <p className="mt-1 text-sm text-muted-foreground">
          {pkg.sessions_count === 1 ? "1 ședință" : `${pkg.sessions_count} ședințe`}
        </p>
      ) : null}
      {pkg.description && <p className="mt-4 text-sm text-muted-foreground">{pkg.description}</p>}
      {pkg.eligibility_notes && (
        <p className="mt-3 flex gap-2 rounded-xl bg-secondary/70 p-3 text-xs text-secondary-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          {pkg.eligibility_notes}
        </p>
      )}
      <div className="mt-5">
        <WhatsAppButton
          className="w-full border-primary/40 bg-transparent text-primary shadow-none hover:bg-primary/10"
          size="default"
          variant="outline"
          label="Rezervă locul"
          message={`Bună! Aș dori detalii despre abonamentul „${pkg.name}” de la Magnitude Dance.`}
        />
      </div>
    </article>
  );
}

export function PricingSection({ compactCategory }: { compactCategory?: string }) {
  const { data, isLoading } = useQuery(pricingQuery);
  const packages = ((data ?? []) as PricingPackage[]).filter(
    (p) => !compactCategory || p.category === compactCategory,
  );
  const categories = Array.from(new Set(packages.map((p) => p.category)));

  return (
    <section className="section-y bg-background" aria-labelledby="pricing-heading">
      <div className="container-page">
        <p className="eyebrow">Prețuri</p>
        <h2 id="pricing-heading" className="mt-2 text-3xl md:text-4xl">
          Abonamente &amp; Prețuri
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Alege varianta care ți se potrivește. Pentru orice întrebare, scrie-ne pe WhatsApp – îți
          răspundem repede.
        </p>

        {isLoading && <Skeleton className="mt-8 h-64 w-full rounded-2xl" />}

        {categories.map((category) => (
          <div key={category} className="mt-10">
            <h3 className="font-display text-xl font-bold">
              {CATEGORY_LABELS[category] ?? category}
            </h3>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {packages
                .filter((p) => p.category === category)
                .map((pkg) => (
                  <PricingCard key={pkg.id} pkg={pkg} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
