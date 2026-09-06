import { createFileRoute } from "@tanstack/react-router";

import { PromptsIndex } from "./knowledge.prompts.index";
import { PUBLISHED_PROMPTS } from "@/lib/prompts";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/knowledge/prompts/")({
  head: () => {
    const empty = PUBLISHED_PROMPTS.length === 0;
    const meta = pageMeta({
      path: "/en/knowledge/prompts",
      locale: "en_US",
      title: "AEGIS Business AI Prompt Library | AEGIS POWER INTEGRATIONS",
      description:
        "AEGIS Business AI Prompt Library: practical, ready-to-use prompts for website build, system planning, and enterprise management, helping companies collaborate with AI more efficiently.",
    });
    if (empty) meta.push({ name: "robots", content: "noindex, follow" });
    return {
      meta,
      links: alternates("/en/knowledge/prompts"),
    };
  },
  component: PromptsIndex,
});
