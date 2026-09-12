import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

const title = "Cursuri de Kizomba în Iași – Magnitude Dance";
const description =
  "Cursuri de kizomba în Iași: conexiune, muzicalitate și mișcare fluidă, pentru toate nivelurile.";

export const Route = createFileRoute("/kizomba")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/kizomba" },
    ],
    links: [{ rel: "canonical", href: "/kizomba" }],
  }),
  component: () => <DanceStylePage slug="kizomba" />,
});
