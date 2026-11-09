import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

// SEO title/description kept identical to the previous magnitudedance.ro page.
const title = 'Magnitude Dance | Cursuri Kizomba Iași – Eleganță, senzualitate & conexiune';
const description = 'Cursuri de kizomba la Magnitude Dance Iași: dans fluid și intim din Angola, axat pe conexiune profundă, eleganță și atmosferă relaxantă în grupuri mici.';
const url = "https://zorila-alexandru.ro/kizomba";
const image = "https://magnitudedance.ro/wp-content/uploads/2025/01/IMG_8797.jpg";

export const Route = createFileRoute("/kizomba")({
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
  component: () => <DanceStylePage slug="kizomba" />,
});
