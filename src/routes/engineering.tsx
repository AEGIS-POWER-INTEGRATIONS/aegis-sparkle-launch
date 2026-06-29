import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { ArrowRight, Cable, Camera, HardHat, Network, Radio, ServerCog } from "lucide-react";

export const Route = createFileRoute("/engineering")({
  head: () => ({
    meta: [
      { title: "工程集成服務｜宏鼎集成" },
      { name: "description", content: "宏鼎集成提供弱電與網路工程、光纖建置、資料中心基礎工程支援、監控與門禁系統與廠區資訊系統整合。" },
      { property: "og:title", content: "工程集成服務｜宏鼎集成" },
      { property: "og:description", content: "結合工程現場經驗與系統整合能力的工程服務團隊。" },
      { property: "og:url", content: "https://aegis-sparkle-launch.lovable.app/engineering" },
    ],
    links: [{ rel: "canonical", href: "https://aegis-sparkle-launch.lovable.app/engineering" }],
  }),
  component: Engineering,
});

const services = [
  { icon: Radio, t: "弱電與網路工程", d: "辦公室、廠區、營運據點的弱電佈線、網路建置與整體規劃。" },
  { icon: Cable, t: "光纖建置", d: "骨幹、樓層、跨棟光纖佈設與測試，符合企業營運品質要求。" },
  { icon: ServerCog, t: "資料中心基礎工程支援", d: "機房、機櫃、配電、線路與基礎設備建置支援。" },
  { icon: Camera, t: "監控與門禁系統", d: "IP 監控、門禁、人員管制與安全管理系統整合。" },
  { icon: Network, t: "廠區資訊系統整合", d: "跨系統、跨廠牌的設備與資訊整合，建立統一管理介面。" },
  { icon: HardHat, t: "專案協調與協力廠商整合", d: "由宏鼎統籌專案進度、規格與協力廠商，降低業主管理負擔。" },
];

function Engineering() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> Engineering Integration</span>
            <h1 className="mt-6 text-4xl md:text-5xl">工程集成服務</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              宏鼎集成以工程現場經驗為基礎，提供弱電、光纖、資料中心、監控與門禁等系統整合服務，協助企業建立穩定、安全、可長期維護的基礎建設。
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, t, d }) => (
              <div key={t} className="panel p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-ink-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x">
            <div className="panel p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl">服務流程</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-4">
                {[
                  ["01", "現場勘查", "了解現場條件、既有系統與業主需求。"],
                  ["02", "規劃與報價", "提出工程規劃、規格建議與透明報價。"],
                  ["03", "施工與整合", "依計畫進場施工並協調協力廠商。"],
                  ["04", "驗收與維運", "完工驗收並提供後續維護與優化建議。"],
                ].map(([n, t, d]) => (
                  <div key={n}>
                    <span className="num-badge">{n}</span>
                    <h3 className="mt-3 text-base font-semibold">{t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl">有工程整合需求嗎？</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                歡迎與宏鼎集成聯繫，由顧問依您的場域與規模提供初步建議。
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/demo" className="btn btn-primary">預約諮詢 <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/contact" className="btn btn-ghost">聯絡我們</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
