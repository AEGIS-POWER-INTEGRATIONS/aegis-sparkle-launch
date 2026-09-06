import { createFileRoute } from "@tanstack/react-router";

import { AiIntegration } from "./ai-integration";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/ai-integration")({
  head: () => ({
    meta: pageMeta({
      path: "/en/ai-integration",
      locale: "en_US",
      title: "Enterprise AI Advisory & Implementation | AEGIS POWER INTEGRATIONS",
      description: "AI readiness assessment, process optimisation, tool integration, training and hands-on adoption support for engineering firms, manufacturers and SMEs.",
    }),
    links: alternates("/en/ai-integration"),
  }),
  component: AiIntegration,
});
