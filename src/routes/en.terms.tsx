import { createFileRoute } from "@tanstack/react-router";

import { TermsPage } from "./terms";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/terms")({
  head: () => ({
    meta: pageMeta({
      path: "/en/terms",
      locale: "en_US",
      title: "Terms of Use | AEGIS POWER INTEGRATIONS",
      description: "Terms governing the use of the AEGIS POWER INTEGRATIONS website, its content and its enquiry forms.",
    }),
    links: alternates("/en/terms"),
  }),
  component: TermsPage,
});
