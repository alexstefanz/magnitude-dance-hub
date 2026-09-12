import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

const title = "Dans modern pentru copii în Iași – Magnitude Dance";
const description =
  "Cursuri de dans modern pentru copii în Iași: coordonare, ritm, încredere în sine și multă bucurie.";

export const Route = createFileRoute("/dans-modern-copii")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/dans-modern-copii" },
    ],
    links: [{ rel: "canonical", href: "/dans-modern-copii" }],
  }),
  component: () => <DanceStylePage slug="dans-modern-copii" />,
});
