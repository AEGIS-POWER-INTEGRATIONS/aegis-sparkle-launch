import { createFileRoute } from "@tanstack/react-router";

import { KnowledgeIndex } from "./knowledge.index";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/knowledge/")({
  head: () => ({
    meta: pageMeta({
      path: "/en/knowledge",
      locale: "en_US",
      title: "Knowledge Center | AEGIS POWER INTEGRATIONS",
      description: "Practical resources on AI integration, engineering management, manufacturing digitalisation and data centre engineering.",
    }),
    links: alternates("/en/knowledge"),
  }),
  component: KnowledgeIndex,
});
