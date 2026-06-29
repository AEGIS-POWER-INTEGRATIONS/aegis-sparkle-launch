import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { ArrowRight, Building2, Compass, Layers, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "關於宏鼎｜宏鼎集成股份有限公司" },
      { name: "description", content: "宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd. 結合工程集成、AI 系統開發與企業流程數位化，協助企業建立更有效率的營運能力。" },
      { property: "og:title", content: "關於宏鼎｜宏鼎集成股份有限公司" },
      { property: "og:description", content: "工程集成、AI 系統開發、企業流程數位化的整合型公司。" },
      { property: "og:url", content: "https://aegis-sparkle-launch.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://aegis-sparkle-launch.lovable.app/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> About</span>
            <h1 className="mt-6 text-4xl md:text-5xl">關於宏鼎集成</h1>
            <p className="mt-3 text-sm text-muted-foreground tracking-wider">
              Aegis Power Integrations Co., Ltd.
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              宏鼎集成股份有限公司是一家結合工程集成、AI 系統開發與企業流程數位化的整合型公司。
              我們服務工程公司、製造業、科技廠供應鏈與中小企業，協助企業從現場工程、流程管理、資料整合到 AI 自動化，建立更有效率的營運能力。
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-x grid gap-5 md:grid-cols-2">
            {[
              { icon: Compass, t: "品牌定位", d: "AI 時代的工程與企業系統整合夥伴，協助企業從流程走向系統，再走向智慧化。" },
              { icon: Layers, t: "服務範疇", d: "工程集成服務、AI 系統整合，以及 Aegis Business Apps 模組化企業系統。" },
              { icon: Building2, t: "服務對象", d: "工程公司、製造業、半導體與科技廠供應鏈、資料中心與中小企業。" },
              { icon: ShieldCheck, t: "服務承諾", d: "以模組化方式分階段導入，降低企業導入成本與時間，並維持資料治理規範。" },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="panel p-7">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="mt-4 text-xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl">想進一步認識宏鼎集成？</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                我們提供初步諮詢，協助盤點目前流程瓶頸，並提出可行的數位化建議。
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
