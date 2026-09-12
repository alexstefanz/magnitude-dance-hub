import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

const title = "Cursuri de Bachata în Iași – Magnitude Dance";
const description =
  "Cursuri de bachata sensual și dominicană în Iași, pentru începători și avansați. Grupe noi în fiecare lună.";

export const Route = createFileRoute("/bachata")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/bachata" },
    ],
    links: [{ rel: "canonical", href: "/bachata" }],
  }),
  component: () => <DanceStylePage slug="bachata" />,
});
