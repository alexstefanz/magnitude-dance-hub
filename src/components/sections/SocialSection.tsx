import { Facebook, Instagram, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/use-settings";

export function SocialSection() {
  const { get } = useSettings();
  const links = [
    { label: "Instagram", url: get("instagram_url"), icon: Instagram },
    { label: "TikTok", url: get("tiktok_url"), icon: Music2 },
    { label: "Facebook", url: get("facebook_url"), icon: Facebook },
  ];

  return (
    <section className="section-y bg-background" aria-labelledby="social-heading">
      <div className="container-page">
        <p className="eyebrow">Social media</p>
        <h2 id="social-heading" className="mt-2 text-3xl md:text-4xl">
          Urmărește Magnitude
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Reels de la cursuri, petreceri și evenimente. Cele mai noi clipuri apar mereu pe rețelele
          noastre.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {links.map(({ label, url, icon: Icon }) =>
            url ? (
              <Button key={label} asChild variant="outline">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Icon aria-hidden="true" />
                  {label}
                </a>
              </Button>
            ) : (
              <Button key={label} variant="outline" disabled>
                <Icon aria-hidden="true" />
                {label} – link în curând
              </Button>
            ),
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 p-4 text-center text-xs text-muted-foreground"
            >
              [Reel – va fi adăugat ulterior]
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
