import { createFileRoute } from "@tanstack/react-router";

import { Contact } from "./contact";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/contact")({
  head: () => ({
    meta: pageMeta({
      path: "/en/contact",
      locale: "en_US",
      title: "Contact Us | AEGIS POWER INTEGRATIONS",
      description: "Send an enquiry about engineering integration, data centre works or enterprise AI adoption. Based in Taichung, Taiwan, serving clients nationwide.",
    }),
    links: alternates("/en/contact"),
  }),
  component: Contact,
});
