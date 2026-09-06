import { createFileRoute } from "@tanstack/react-router";

import { IndustriesHub } from "./industries.index";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/industries/")({
  head: () => ({
    meta: pageMeta({
      path: "/en/industries",
      locale: "en_US",
      title: "Industry Solutions | AEGIS POWER INTEGRATIONS",
      description: "Engineering and AI integration solutions for data centres, semiconductor, EPC contractors, manufacturing, commercial buildings, energy & ESG and SMEs.",
    }),
    links: alternates("/en/industries"),
  }),
  component: IndustriesHub,
});
