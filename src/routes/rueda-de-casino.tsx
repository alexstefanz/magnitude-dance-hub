import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

const title = "Rueda de Casino în Iași – Magnitude Dance";
const description =
  "Rueda de Casino la Magnitude Dance Iași: dans în grup, figuri la comandă și multă distracție.";

export const Route = createFileRoute("/rueda-de-casino")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/rueda-de-casino" },
    ],
    links: [{ rel: "canonical", href: "/rueda-de-casino" }],
  }),
  component: () => <DanceStylePage slug="rueda-de-casino" />,
});
