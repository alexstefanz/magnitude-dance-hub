import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

const title = "Cursuri de Salsa în Iași – Magnitude Dance";
const description =
  "Cursuri de salsa pentru începători și avansați în Iași. Grupe pe niveluri, instructori experimentați și petreceri săptămânale.";

export const Route = createFileRoute("/salsa")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/salsa" },
    ],
    links: [{ rel: "canonical", href: "/salsa" }],
  }),
  component: () => <DanceStylePage slug="salsa" />,
});
