import { useQuery } from "@tanstack/react-query";
import {
  GraduationCap,
  Heart,
  PartyPopper,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { VideoModal } from "@/components/VideoModal";
import { whyMagnitudeQuery } from "@/lib/content";
import { Skeleton } from "@/components/ui/skeleton";

const ICONS: Record<string, LucideIcon> = {
  users: Users,
  "party-popper": PartyPopper,
  "trending-up": TrendingUp,
  heart: Heart,
  "graduation-cap": GraduationCap,
  sparkles: Sparkles,
};

export type WhyItem = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  reel_url: string | null;
  video_url: string | null;
};

export function WhyMagnitudeCard({ item }: { item: WhyItem }) {
  const Icon = ICONS[item.icon ?? ""] ?? Sparkles;
  const video = item.reel_url || item.video_url;

  return (
    <article className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 text-center sm:text-left">
      <span className="mx-auto sm:mx-0 flex size-12 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
      <p className="mt-2 text-sm text-ink-foreground/75">{item.description}</p>
      {video && (
        <div className="mt-4">
          <VideoModal url={video} title={item.title} />
        </div>
      )}
    </article>
  );
}

export function WhyMagnitude() {
  const { data, isLoading } = useQuery(whyMagnitudeQuery);
  const items = (data ?? []) as WhyItem[];

  return (
    <section className="surface-ink section-y" aria-labelledby="why-heading">
      <div className="container-page">
        <p className="text-center eyebrow text-accent">Comunitate</p>
        <h2 id="why-heading" className="text-center mt-2 text-3xl md:text-4xl">
          De ce Magnitude?
        </h2>
        <p className="mt-3 mx-auto max-w-2xl text-center text-ink-foreground/75">
          Nu suntem doar o școală de dans. Suntem o comunitate: dansăm, socializăm, ieșim împreună,
          urcăm pe scenă și ne distrăm.
        </p>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-52 w-full rounded-2xl bg-white/10" />
            ))}
          {items.map((item) => (
            <WhyMagnitudeCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
