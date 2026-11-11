import { useEffect, useRef } from "react";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/use-settings";

const FEED_SRC = "https://cdn.trustindex.io/loader-feed.js?66173d2857115114530616f72de";

export function SocialSection() {
  const { get } = useSettings();
  const url = get("instagram_url");
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    el.innerHTML = "";
    const s = document.createElement("script");
    s.src = FEED_SRC;
    s.defer = true;
    s.async = true;
    el.appendChild(s);
    return () => {
      el.innerHTML = "";
    };
  }, []);

  return (
    <section className="section-y bg-background" aria-labelledby="social-heading">
      <div className="container-page">
        <p className="text-center eyebrow">Social media</p>
        <h2 id="social-heading" className="text-center mt-2 text-3xl md:text-4xl">
          Urmărește Magnitude
        </h2>
        <p className="mt-3 mx-auto max-w-2xl text-center text-muted-foreground">
          Reels de la cursuri, petreceri și evenimente. Cele mai noi clipuri apar mereu pe Instagram.
        </p>

        {url && (
          <div className="mt-6 flex justify-center">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Instagram aria-hidden="true" />
                Instagram
              </a>
            </Button>
          </div>
        )}

        <div ref={feedRef} className="mt-8" />
      </div>
    </section>
  );
}
