import { createFileRoute, notFound } from "@tanstack/react-router";

import { CategoryPage } from "./knowledge.$category.index";
import { getCategory } from "@/lib/knowledge";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/knowledge/$category/")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex, follow" }] };
    }
    const c = loaderData.category;
    const path = `/en/knowledge/${c.slug}`;
    return {
      meta: pageMeta({
        path,
        locale: "en_US",
        title: `${c.name.en} | Knowledge Center | AEGIS POWER INTEGRATIONS`,
        description: c.description.en,
      }),
      links: alternates(path),
    };
  },
  component: CategoryPage,
});
