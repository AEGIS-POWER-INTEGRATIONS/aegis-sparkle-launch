import { createFileRoute } from "@tanstack/react-router";

import { Pricing } from "./pricing";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/pricing")({
  head: () => ({
    meta: pageMeta({
      path: "/en/pricing",
      locale: "en_US",
      title: "Ways to Work With Us | AEGIS POWER INTEGRATIONS",
      description: "Quotation-based collaboration models for engineering integration and enterprise AI advisory, scoped to each project after an initial consultation.",
    }),
    links: alternates("/en/pricing"),
  }),
  component: Pricing,
});
