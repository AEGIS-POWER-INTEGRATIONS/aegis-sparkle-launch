import { createFileRoute } from "@tanstack/react-router";

import { KnowledgeLayout } from "./knowledge";

export const Route = createFileRoute("/en/knowledge")({
  component: KnowledgeLayout,
});
