import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/layout/SiteLayout";
import { useSettings } from "@/hooks/use-settings";

const title = "Politica de Confidențialitate – Magnitude Dance";
const description =
  "Cum colectăm, folosim și protejăm datele personale ale cursanților Magnitude Dance, conform GDPR.";

export const Route = createFileRoute("/politica-confidentialitate")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/politica-confidentialitate" },
    ],
    links: [{ rel: "canonical", href: "/politica-confidentialitate" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { get } = useSettings();
  const email = get("email", "magnitudedance@gmail.com");

  return (
    <SiteLayout>
      <PageHero eyebrow="Legal" title="Politica de Confidențialitate" />
      <section className="section-y bg-background">
        <div className="container-page max-w-3xl space-y-6 text-muted-foreground">
          <p>
            Magnitude Dance prelucrează datele personale în conformitate cu Regulamentul (UE)
            2016/679 (GDPR). Această pagină explică ce date colectăm și în ce scop.
          </p>

          <Section title="Ce date colectăm">
            <ul className="list-disc space-y-1 pl-5">
              <li>Date de identificare și contact: nume, prenume, telefon, email.</li>
              <li>Informații despre cursul dorit și mesajul transmis prin formular.</li>
              <li>Feedback trimis voluntar prin formularul de feedback.</li>
              <li>Date tehnice minime necesare pentru protecția împotriva spamului.</li>
            </ul>
          </Section>

          <Section title="În ce scop folosim datele">
            <ul className="list-disc space-y-1 pl-5">
              <li>Pentru a te contacta cu privire la înscrierea la cursuri.</li>
              <li>Pentru organizarea grupelor și comunicarea informațiilor despre cursuri.</li>
              <li>Pentru îmbunătățirea serviciilor, pe baza feedback-ului primit.</li>
            </ul>
          </Section>

          <Section title="Temeiul legal">
            <p>
              Prelucrarea se face pe baza consimțământului tău, exprimat prin bifarea acordului în
              formular, și a interesului legitim de a răspunde solicitărilor primite.
            </p>
          </Section>

          <Section title="Cât păstrăm datele">
            <p>
              Păstrăm datele atât timp cât este necesar pentru scopul menționat sau până în momentul
              în care îți retragi consimțământul.
            </p>
          </Section>

          <Section title="Drepturile tale">
            <ul className="list-disc space-y-1 pl-5">
              <li>Dreptul de acces la datele tale.</li>
              <li>Dreptul la rectificare sau ștergere.</li>
              <li>Dreptul la restricționarea prelucrării și la opoziție.</li>
              <li>Dreptul de a retrage consimțământul în orice moment.</li>
              <li>Dreptul de a depune o plângere la ANSPDCP.</li>
            </ul>
          </Section>

          <Section title="Cum ne contactezi">
            <p>
              Pentru orice solicitare privind datele tale, scrie-ne la{" "}
              <a href={`mailto:${email}`} className="font-medium text-primary underline">
                {email}
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ title: heading, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="font-display text-xl font-bold text-foreground">{heading}</h2>
      {children}
    </div>
  );
}
