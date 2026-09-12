import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/magnitude-logo-white.png.asset.json";

export const COURSE_LINKS = [
  { label: "Salsa", to: "/salsa" },
  { label: "Bachata", to: "/bachata" },
  { label: "Kizomba", to: "/kizomba" },
  { label: "Dansul Mirilor", to: "/dansul-mirilor" },
  { label: "Rueda de Casino", to: "/rueda-de-casino" },
  { label: "Dans Modern Copii", to: "/dans-modern-copii" },
  { label: "Lady Styling", to: "/lady-styling" },
] as const;

export const MAIN_LINKS = [
  { label: "Acasă", to: "/" },
  { label: "Orar", to: "/orar" },
  { label: "Evenimente", to: "/evenimente" },
  { label: "Party", to: "/party" },
  { label: "Despre Noi", to: "/despre-noi" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/10 text-ink-foreground backdrop-blur-md transition-colors duration-300",
        scrolled ? "bg-ink/95 shadow-[var(--shadow-glow)]" : "bg-ink/20",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex items-center gap-2" aria-label="Magnitude Dance – acasă">
          <img src={logoAsset.url} alt="Magnitude Dance" className="h-10 w-auto md:h-12" />
        </Link>

        <nav aria-label="Navigație principală" className="hidden items-center gap-1 xl:flex">
          <NavItem to="/">Acasă</NavItem>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCoursesOpen((v) => !v)}
              onBlur={() => window.setTimeout(() => setCoursesOpen(false), 120)}
              aria-expanded={coursesOpen}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-foreground/85 transition-colors hover:bg-white/10 hover:text-ink-foreground"
            >
              Cursuri <ChevronDown className="size-4" aria-hidden="true" />
            </button>
            {coursesOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-ink-soft p-1 shadow-[var(--shadow-glow)]">
                {COURSE_LINKS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block rounded-lg px-3 py-2 text-sm text-ink-foreground/85 transition-colors hover:bg-white/10 hover:text-ink-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {MAIN_LINKS.filter((l) => l.to !== "/").map((item) => (
            <NavItem key={item.to} to={item.to}>
              {item.label}
            </NavItem>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton className="hidden md:inline-flex" size="default" />
          <Button
            variant="ghost"
            size="icon"
            className="text-ink-foreground hover:bg-white/10 xl:hidden"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Menu className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink xl:hidden">
          <div className="container-page max-h-[75vh] overflow-y-auto py-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="eyebrow text-accent">Meniu</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Închide meniul"
                className="text-ink-foreground hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <MobileLink to="/" onClick={() => setOpen(false)}>
              Acasă
            </MobileLink>
            <p className="mt-3 px-1 text-xs font-bold uppercase tracking-widest text-accent">
              Cursuri
            </p>
            {COURSE_LINKS.map((item) => (
              <MobileLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
                {item.label}
              </MobileLink>
            ))}
            <div className="mt-3 border-t border-white/10 pt-3">
              {MAIN_LINKS.filter((l) => l.to !== "/").map((item) => (
                <MobileLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
                  {item.label}
                </MobileLink>
              ))}
            </div>
            <WhatsAppButton className="mt-4 w-full" />
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-lg px-3 py-2 text-sm font-medium text-ink-foreground/85 transition-colors hover:bg-white/10 hover:text-ink-foreground"
      activeProps={{ className: "bg-white/10 text-ink-foreground" }}
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "block rounded-xl px-3 py-3 text-base font-medium text-ink-foreground/90 transition-colors hover:bg-white/10",
      )}
    >
      {children}
    </Link>
  );
}
