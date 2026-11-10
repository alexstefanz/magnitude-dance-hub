import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { WhatsAppFloating } from "@/components/WhatsAppButton";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloating />
      <CookieConsent />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="surface-ink">
      <div className="container-page pt-28 pb-14 md:pt-32 md:pb-16">
        {eyebrow && <p className="eyebrow text-accent">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl leading-tight md:text-6xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-ink-foreground/80 md:text-lg">{description}</p>
        )}
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
