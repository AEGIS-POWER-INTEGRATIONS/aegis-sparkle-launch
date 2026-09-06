import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * The prompt library and AI tips are currently published in Traditional
 * Chinese only. Rather than serve a Chinese body under an English URL,
 * /en visitors are sent to the Chinese page until translations exist.
 */
export const Route = createFileRoute("/en/knowledge/prompts/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/knowledge/prompts/$slug", params: { slug: params.slug } });
  },
  component: () => null,
});
