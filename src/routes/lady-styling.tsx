import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

const title = "Lady Styling în Iași – Magnitude Dance";
const description =
  "Cursuri de Lady Styling în Iași: eleganță, feminitate și tehnică pentru dansurile latino.";

export const Route = createFileRoute("/lady-styling")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/lady-styling" },
    ],
    links: [{ rel: "canonical", href: "/lady-styling" }],
  }),
  component: () => <DanceStylePage slug="lady-styling" />,
});
