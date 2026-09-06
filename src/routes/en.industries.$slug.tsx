import { createFileRoute, notFound } from "@tanstack/react-router";

import { IndustryDetail, IndustryNotFound } from "./industries.$slug";
import { breadcrumbJsonLd } from "@/components/breadcrumbs";
import { getIndustry, type Industry } from "@/lib/industries";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/industries/$slug")({
  loader: ({ params }): { industry: Industry } => {
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Industry not found" }, { name: "robots", content: "noindex" }] };
    }
    const { industry } = loaderData;
    const path = `/en/industries/${industry.slug}`;
    return {
      meta: pageMeta({
        path,
        locale: "en_US",
        title: `${industry.name.en} | AEGIS POWER INTEGRATIONS`,
        description: industry.tagline.en,
      }),
      links: alternates(path),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/en" },
              { name: "Industry Solutions", path: "/en/industries" },
              { name: industry.name.en, path },
            ]),
          ),
        },
      ],
    };
  },
  component: IndustryDetail,
  notFoundComponent: IndustryNotFound,
});
