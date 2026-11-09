import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

// SEO title/description kept identical to the previous magnitudedance.ro page.
const title = 'Magnitude Dance | Cursuri Bachata Iași – Dans romantic & expresiv';
const description = 'Explorează bachata la Magnitude Dance Iași – un dans pasional din Republica Dominicană, cu mișcări fluide, conexiune emoțională și stil personalizat pentru toate nivelurile.';
const url = "https://zorila-alexandru.ro/bachata";
const image = "https://magnitudedance.ro/wp-content/uploads/2025/01/IMG_8712.jpg";

export const Route = createFileRoute("/bachata")({
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
  component: () => <DanceStylePage slug="bachata" />,
});
