import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Music2, Phone } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { COURSE_LINKS } from "@/components/layout/Header";
import { telLink } from "@/lib/whatsapp";

const QUICK_LINKS = [
  { label: "Acasă", to: "/" },
  { label: "Despre noi", to: "/despre-noi" },
  { label: "Instructori", to: "/instructori" },
  { label: "Orar", to: "/orar" },
  { label: "Prețuri", to: "/orar" },
  { label: "Evenimente", to: "/evenimente" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  const { get } = useSettings();
  const year = new Date().getFullYear();
  const mapEmbed = get("google_maps_embed_url");

  return (
    <footer className="surface-ink">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-extrabold">
            MAGNITUDE<span className="text-accent"> DANCE</span>
          </p>
          <p className="mt-3 text-sm text-ink-foreground/75">
            Comunitatea de dans latino din Iași: cursuri de salsa, bachata și kizomba, petreceri
            săptămânale, evenimente și oameni care se bucură împreună de dans.
          </p>
          <p className="mt-4 font-display text-accent">We are emotion in motion</p>
        </div>

        <nav aria-label="Link-uri rapide">
          <h2 className="font-display text-base font-bold uppercase tracking-wide">Link-uri rapide</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-ink-foreground/75 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Cursuri de dans">
          <h2 className="font-display text-base font-bold uppercase tracking-wide">Cursuri de dans</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {COURSE_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-ink-foreground/75 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-base font-bold uppercase tracking-wide">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-foreground/80">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-accent" aria-hidden="true" />
              <a href={telLink(get("phone"))} className="hover:text-accent">
                {get("phone", "+40 758 515 946")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-accent" aria-hidden="true" />
              <a href={`mailto:${get("email", "magnitudedance@gmail.com")}`} className="hover:text-accent">
                {get("email", "magnitudedance@gmail.com")}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 text-accent" aria-hidden="true" />
              <span>{get("address", "Aleea Vasile Petrescu 5, Iași")}</span>
            </li>
          </ul>

          <div className="mt-5 flex gap-3">
            {get("facebook_url") && (
              <SocialIcon href={get("facebook_url")} label="Facebook">
                <Facebook className="size-5" />
              </SocialIcon>
            )}
            {get("instagram_url") && (
              <SocialIcon href={get("instagram_url")} label="Instagram">
                <Instagram className="size-5" />
              </SocialIcon>
            )}
            {get("tiktok_url") && (
              <SocialIcon href={get("tiktok_url")} label="TikTok">
                <Music2 className="size-5" />
              </SocialIcon>
            )}
          </div>
        </div>
      </div>

      {mapEmbed && (
        <div className="container-page pb-10">
          <iframe
            title="Locația Magnitude Dance"
            src={mapEmbed}
            loading="lazy"
            className="h-64 w-full rounded-2xl border border-white/10"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-ink-foreground/70 md:flex-row md:items-center md:justify-between">
          <p>Copyright Magnitude Dance – {year}. Toate drepturile rezervate.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/politica-confidentialitate" className="hover:text-accent">
              Politica de Confidențialitate
            </Link>
            <Link to="/politica-cookies" className="hover:text-accent">
              Politica Cookies
            </Link>
            <Link to="/feedback" className="hover:text-accent">
              Formular Feedback
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-white/15 text-ink-foreground/85 transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}
