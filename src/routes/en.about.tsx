import { createFileRoute } from "@tanstack/react-router";

import { About } from "./about";
import { SITE_URL, alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/about")({
  head: () => ({
    meta: pageMeta({
      path: "/en/about",
      locale: "en_US",
      title: "About Us | AEGIS POWER INTEGRATIONS (Aegis Power Integrations Co., Ltd.)",
      description:
        "AEGIS POWER INTEGRATIONS combines field engineering integration, AI system integration and enterprise process digitalisation for engineering firms, manufacturers, tech supply chains and SMEs in Taiwan.",
    }),
    links: alternates(`${SITE_URL}/en/about`),
  }),
  component: About,
});
