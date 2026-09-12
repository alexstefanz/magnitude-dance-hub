import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

const title = "Dansul Mirilor – coregrafie personalizată în Iași | Magnitude Dance";
const description =
  "Pregătim dansul mirilor în Iași: coregrafie personalizată, ședințe private și acompaniere până în ziua nunții.";

export const Route = createFileRoute("/dansul-mirilor")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/dansul-mirilor" },
    ],
    links: [{ rel: "canonical", href: "/dansul-mirilor" }],
  }),
  component: () => <DanceStylePage slug="dansul-mirilor" />,
});
