import { seoHead } from "@/config/seo";
import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

const image = "https://magnitudedance.ro/wp-content/uploads/2025/01/IMG_8797.jpg";

export const Route = createFileRoute("/kizomba")({
  head: () => ({
    ...seoHead("/kizomba/", image),
  }),
  component: () => <DanceStylePage slug="kizomba" />,
});
