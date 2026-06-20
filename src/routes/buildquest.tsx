import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BqShell, BqNav, BqFooter } from "@/components/buildquest/shared";

export const Route = createFileRoute("/buildquest")({
  head: () => ({
    meta: [
      { title: "Aegis BuildQuest｜AI 工程管理修煉系統" },
      { name: "description", content: "Aegis BuildQuest 是專為工程主管、PM、工地主任、估價、品管與業務工程師打造的 AI 工程管理訓練平台。透過情境化關卡，提升進度、成本、品質、工安、包商、業主與文件七大管理能力。" },
      { property: "og:title", content: "Aegis BuildQuest｜AI 工程管理修煉系統" },
      { property: "og:description", content: "用 RPG 任務化體驗訓練工程管理判斷力。" },
    ],
  }),
  component: Layout,
});

function Layout() {
  return (
    <BqShell>
      <BqNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 min-h-[70vh]">
        <Outlet />
      </main>
      <BqFooter />
    </BqShell>
  );
}
