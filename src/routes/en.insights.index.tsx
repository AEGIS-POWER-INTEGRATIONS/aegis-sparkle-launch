import { createFileRoute } from "@tanstack/react-router";

import { InsightsHub } from "./insights.index";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/insights/")({
  head: () => ({
    meta: pageMeta({
      path: "/en/insights",
      locale: "en_US",
      title: "Insights & Scenario Studies | AEGIS POWER INTEGRATIONS",
      description: "Engineering and AI adoption insights organised by industry and challenge, with scenario studies drawn from field practice.",
    }),
    links: alternates("/en/insights"),
  }),
  component: InsightsHub,
});
