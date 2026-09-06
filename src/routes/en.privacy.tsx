import { createFileRoute } from "@tanstack/react-router";

import { PrivacyPage } from "./privacy";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/privacy")({
  head: () => ({
    meta: pageMeta({
      path: "/en/privacy",
      locale: "en_US",
      title: "Privacy Policy | AEGIS POWER INTEGRATIONS",
      description: "How Aegis Power Integrations Co., Ltd. collects, uses, stores and protects personal data submitted through this website.",
    }),
    links: alternates("/en/privacy"),
  }),
  component: PrivacyPage,
});
