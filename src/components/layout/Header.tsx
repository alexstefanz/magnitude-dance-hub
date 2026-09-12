import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
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
  const [mobileOpen, setMobileOpen] = useState(false);
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
        "fixed inset-x-0 top-0 z-40 border-b border-white/10 text-ink-foreground backdrop-blur-md transition-colors duration-300",
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
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-ink-foreground hover:bg-white/10 xl:hidden"
                aria-label="Deschide meniul"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] border-white/10 bg-ink p-0 text-ink-foreground sm:max-w-sm"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Meniu de navigare</SheetTitle>
              </SheetHeader>

              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-between border-b border-white/10 px-5 md:h-20">
                  <span className="eyebrow text-accent">Meniu</span>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Închide meniul"
                      className="text-ink-foreground hover:bg-white/10"
                    >
                      <X className="size-5" />
                    </Button>
                  </SheetClose>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-6">
                  <SheetClose asChild>
                    <MobileLink to="/">Acasă</MobileLink>
                  </SheetClose>

                  <p className="mt-5 px-1 text-xs font-bold uppercase tracking-widest text-accent">
                    Cursuri
                  </p>
                  {COURSE_LINKS.map((item) => (
                    <SheetClose key={item.to} asChild>
                      <MobileLink to={item.to}>{item.label}</MobileLink>
                    </SheetClose>
                  ))}

                  <div className="mt-5 border-t border-white/10 pt-5">
                    {MAIN_LINKS.filter((l) => l.to !== "/").map((item) => (
                      <SheetClose key={item.to} asChild>
                        <MobileLink to={item.to}>{item.label}</MobileLink>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 p-5">
                  <WhatsAppButton className="w-full" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
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
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "block rounded-xl px-3 py-3 text-base font-medium text-ink-foreground/90 transition-colors hover:bg-white/10",
      )}
    >
      {children}
    </Link>
  );
}
