import { createFileRoute } from "@tanstack/react-router";

import { ProjectsPage } from "./projects";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/projects")({
  head: () => ({
    meta: pageMeta({
      path: "/en/projects",
      locale: "en_US",
      title: "Project Experience | AEGIS POWER INTEGRATIONS",
      description: "Anonymised engineering project experience: outdoor piping for advanced packaging facilities and fibre optic works for large-scale data centres in Taiwan.",
    }),
    links: alternates("/en/projects"),
  }),
  component: ProjectsPage,
});
