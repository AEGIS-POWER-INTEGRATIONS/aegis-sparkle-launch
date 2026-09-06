import { createFileRoute } from "@tanstack/react-router";

import { CompanyProfile } from "./company-profile";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/company-profile")({
  head: () => ({
    meta: pageMeta({
      path: "/en/company-profile",
      locale: "en_US",
      title: "Company Profile | AEGIS POWER INTEGRATIONS (Aegis Power Integrations Co., Ltd.)",
      description: "Registered company details, business scope, service capability and contact information for Aegis Power Integrations Co., Ltd., based in Taichung, Taiwan.",
    }),
    links: alternates("/en/company-profile"),
  }),
  component: CompanyProfile,
});
