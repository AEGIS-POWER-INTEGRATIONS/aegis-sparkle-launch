import { createFileRoute } from "@tanstack/react-router";

import { Engineering } from "./engineering";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/engineering")({
  head: () => ({
    meta: pageMeta({
      path: "/en/engineering",
      locale: "en_US",
      title: "Engineering Integration Services | AEGIS POWER INTEGRATIONS",
      description: "Structured cabling, fibre optic backbone, data centre build-out, security and low-voltage systems, delivered with documented engineering practice.",
    }),
    links: alternates("/en/engineering"),
  }),
  component: Engineering,
});
