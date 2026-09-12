import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/hooks/use-settings";

const STORAGE_KEY = "magnitude-cookie-consent-v1";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

/** Loads GA4 only after analytics consent is given. */
function useAnalytics(consent: ConsentState | null) {
  const { get } = useSettings();
  const gaId = get("google_analytics_id");

  useEffect(() => {
    if (!gaId || !consent?.analytics) return;
    if (document.getElementById("ga4-script")) return;

    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    const gtag = (...args: unknown[]) => w.dataLayer!.push(args);
    gtag("js", new Date());
    gtag("config", gaId, { anonymize_ip: true });
  }, [gaId, consent?.analytics]);
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  useAnalytics(consent);

  const save = (state: ConsentState) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setConsent(state);
  };

  if (!ready || consent) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Setări cookies"
      className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-glow)] md:inset-x-auto md:left-5 md:max-w-md"
    >
      <h2 className="font-display text-lg font-bold">Cookies pe magnitudedance.ro</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Folosim cookies necesare pentru funcționarea site-ului. Cookies de analiză și marketing sunt
        activate doar cu acordul tău.{" "}
        <Link to="/politica-cookies" className="font-medium text-primary underline">
          Politica Cookies
        </Link>
      </p>

      {showSettings && (
        <div className="mt-4 space-y-3 rounded-xl bg-muted/60 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">Necesare</span>
            <span className="text-xs text-muted-foreground">Mereu active</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="c-analytics" className="text-sm font-medium">
              Analiză
            </label>
            <Switch id="c-analytics" checked={analytics} onCheckedChange={setAnalytics} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="c-marketing" className="text-sm font-medium">
              Marketing
            </label>
            <Switch id="c-marketing" checked={marketing} onCheckedChange={setMarketing} />
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={() => save({ necessary: true, analytics: true, marketing: true })}>
          Accept toate
        </Button>
        {showSettings ? (
          <Button variant="outline" onClick={() => save({ necessary: true, analytics, marketing })}>
            Salvează preferințele
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setShowSettings(true)}>
            Setări
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={() => save({ necessary: true, analytics: false, marketing: false })}
        >
          Doar necesare
        </Button>
      </div>
    </div>
  );
}
