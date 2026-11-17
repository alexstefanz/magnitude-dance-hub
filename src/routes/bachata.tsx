import { seoHead } from "@/config/seo";
import { createFileRoute } from "@tanstack/react-router";
import { DanceStylePage } from "@/components/pages/DanceStylePage";

const image = "https://magnitudedance.ro/wp-content/uploads/2025/01/IMG_8712.jpg";

export const Route = createFileRoute("/bachata")({
  head: () => ({
    ...seoHead("/bachata/", image),
  }),
  component: () => <DanceStylePage slug="bachata" />,
});
