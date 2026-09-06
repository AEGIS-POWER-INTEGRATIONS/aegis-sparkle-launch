import { createFileRoute } from "@tanstack/react-router";

import { Pricing } from "./pricing";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/pricing")({
  head: () => ({
    meta: pageMeta({
      path: "/en/pricing",
      locale: "en_US",
      title: "Engineering Projects & AI Advisory Engagement | AEGIS POWER INTEGRATIONS",
      description: "Engineering project quotation and enterprise AI advisory engagement: engineering is quoted from site conditions and work scope; AI advisory covers diagnosis, monthly advisory, PoC and enterprise integration.",
    }),
    links: alternates("/en/pricing"),
  }),
  component: Pricing,
});
