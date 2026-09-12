import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { campaignsQuery } from "@/lib/content";
import { useSettings } from "@/hooks/use-settings";

type Campaign = {
  id: string;
  title: string;
  style_label: string | null;
  whatsapp_message: string | null;
  cta_label: string;
};

export function HeroSection() {
  const { get } = useSettings();
  const { data } = useQuery(campaignsQuery);
  const campaigns = (data ?? []) as Campaign[];
  const videoUrl = get("hero_video_url");

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
            preload="none"
            poster="/hero-poster.jpg"
            aria-hidden="true"
          />
        ) : (
          <div className="size-full bg-[image:var(--gradient-ink)]" aria-hidden="true" />
        )}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.5_0.24_305/0.45),transparent_60%),linear-gradient(to_top,oklch(0.14_0.02_300/0.95),oklch(0.14_0.02_300/0.6))]"
          aria-hidden="true"
        />
      </div>

      <div className="container-page flex min-h-[78vh] flex-col justify-center py-20 md:min-h-[86vh]">
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
            <Link to="/orar">
              <CalendarDays aria-hidden="true" />
              Vezi Orarul
            </Link>
          </Button>
        </div>

        {campaigns.length > 0 && (
          <div className="mt-10 max-w-2xl rounded-2xl border border-accent/40 bg-white/5 p-5 backdrop-blur-sm">
            <p className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-accent">
              <Sparkles className="size-4" aria-hidden="true" />
              Înscrieri active
            </p>
            <ul className="mt-3 space-y-3">
              {campaigns.map((campaign) => (
                <li key={campaign.id} className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-medium">{campaign.title}</span>
                  <WhatsAppButton
                    size="sm"
                    variant="gold"
                    label={campaign.cta_label || "Înscrie-te prin WhatsApp"}
                    message={
                      campaign.whatsapp_message ||
                      `Bună! Aș dori să mă înscriu la „${campaign.title}”.`
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
