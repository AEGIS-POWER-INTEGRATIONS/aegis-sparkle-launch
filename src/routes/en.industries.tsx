import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/en/industries")({
  component: () => <Outlet />,
});
