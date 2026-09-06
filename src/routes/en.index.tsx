import { createFileRoute } from "@tanstack/react-router";

import { Home } from "./index";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: pageMeta({
      path: "/en",
      locale: "en_US",
      title: "Engineering & AI Systems Integration | AEGIS POWER INTEGRATIONS",
      description: "AEGIS POWER INTEGRATIONS delivers engineering integration, data centre infrastructure, structured cabling and enterprise AI advisory for organisations in Taiwan.",
    }),
    links: alternates("/en"),
  }),
  component: Home,
});
