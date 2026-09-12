import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useSettings } from "@/hooks/use-settings";
import heroImage from "@/assets/hero-dance.jpg";
import heroVideoAsset from "@/assets/7-years-video-website.mp4.asset.json";
import { currentDayOfWeek, DAYS, formatTime, scheduleQuery } from "@/lib/content";
import type { ScheduleEntry } from "@/components/schedule/ScheduleCard";

export function HeroSection() {
  const { get } = useSettings();
  const { data: scheduleData } = useQuery(scheduleQuery);
  const today = currentDayOfWeek();
  const todayEntries = ((scheduleData ?? []) as ScheduleEntry[])
    .filter((entry) => entry.day_of_week === today)
    .slice(0, 3);
  const videoUrl = get("hero_video_url", heroVideoAsset.url);

  return (
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <div className="absolute inset-0 -z-10">
        {videoUrl ? (
          <video
            className="size-full object-cover"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <img
            src={heroImage}
            alt=""
            width={1920}
            height={1280}
            className="size-full object-cover"
            aria-hidden="true"
          />
        )}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.5_0.24_305/0.45),transparent_60%),linear-gradient(to_top,oklch(0.14_0.02_300/0.95),oklch(0.14_0.02_300/0.6))]"
          aria-hidden="true"
        />
      </div>

      <div className="container-page grid min-h-[100svh] items-end gap-10 pb-14 pt-32 md:pb-20 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <p className="eyebrow text-accent">Școală &amp; comunitate de dans în Iași</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] md:text-7xl">
            {get("hero_title", "Magnitude Dance")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-foreground/85">
            {get(
              "hero_subtitle",
              "Comunitatea de dans latino din Iași – salsa, bachata, kizomba, petreceri și oameni faini.",
            )}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton variant="whatsapp" />
            <Button asChild size="lg" variant="outlineLight">
              <Link to="/inscrieri-active">
                <Sparkles aria-hidden="true" />
                Înscrieri active
              </Link>
            </Button>
          </div>
        </div>

        <aside className="rounded-2xl border border-white/15 bg-ink/55 p-5 backdrop-blur-md" aria-label="Orarul de astăzi">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow text-accent">{DAYS[today - 1]}</p>
              <h2 className="mt-1 text-xl">Astăzi la Magnitude</h2>
            </div>
            <Clock className="size-5 text-accent" aria-hidden="true" />
          </div>
          <div className="mt-4 divide-y divide-white/10">
            {todayEntries.length === 0 ? (
              <p className="py-4 text-sm text-ink-foreground/70">Nu sunt cursuri programate astăzi.</p>
            ) : (
              todayEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{entry.style_label}</p>
                    <p className="text-xs text-ink-foreground/65">{entry.room}</p>
                  </div>
                  <span className="shrink-0 font-display font-bold text-accent">
                    {formatTime(entry.start_time)}
                  </span>
                </div>
              ))
            )}
          </div>
          <Button asChild variant="ghost" className="mt-2 w-full justify-between text-ink-foreground hover:bg-white/10 hover:text-accent">
            <Link to="/orar">
              Orarul complet <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </aside>
      </div>
    </section>
  );
}
