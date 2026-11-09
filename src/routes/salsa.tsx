import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

// SEO title/description kept identical to the previous magnitudedance.ro page.
const title = 'Cursuri Salsa Iași | Începători, Intermediari & Avansați';
const description = 'Înscrie‑te la cursurile de salsa la Magnitude Dance Iași: învață pași de bază și tehnici avansate, dezvoltă-ți coordonarea și bucură‑te de energia ritmurilor afro‑caraibiene';
const url = "https://zorila-alexandru.ro/salsa";
const image = "https://magnitudedance.ro/wp-content/uploads/2025/01/IMG_8821.jpg";

export const Route = createFileRoute("/salsa")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: () => <DanceStylePage slug="salsa" />,
});
