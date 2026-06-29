import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { ArrowRight, Building2, Layers, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "聯絡我們｜宏鼎集成股份有限公司" },
      { name: "description", content: "聯絡宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd.，預約工程集成、AI 系統整合與企業管理系統的初步諮詢。" },
      { property: "og:title", content: "聯絡我們｜宏鼎集成" },
      { property: "og:description", content: "預約工程集成、AI 系統整合與企業管理系統諮詢。" },
      { property: "og:url", content: "https://aegis-sparkle-launch.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://aegis-sparkle-launch.lovable.app/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> Contact</span>
            <h1 className="mt-6 text-4xl md:text-5xl">聯絡我們</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              無論您是想評估工程整合、導入 AI 系統，或是希望以模組化方式建立企業管理系統，歡迎與宏鼎集成聯繫，我們將安排顧問與您進行初步諮詢。
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="panel p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Building2 className="h-4 w-4" /> 公司名稱</div>
                <div className="mt-1 text-lg font-semibold">宏鼎集成股份有限公司</div>
                <div className="text-sm text-muted-foreground">Aegis Power Integrations Co., Ltd.</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Layers className="h-4 w-4" /> 服務範圍</div>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>· 工程集成（弱電、光纖、資料中心、監控與門禁）</li>
                  <li>· AI 系統整合（流程盤點、AI 助理、自動化串接）</li>
                  <li>· 企業管理系統導入（Aegis Business Apps 產品線）</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="h-4 w-4" /> 聯絡方式</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  請透過「預約諮詢」表單留下您的聯絡方式與需求，顧問會在 1 個工作日內回覆。
                </p>
              </div>
            </div>

            <div className="panel-lift p-8 flex flex-col">
              <h2 className="text-2xl">預約諮詢</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                提供您的公司、聯絡方式與想了解的服務，我們會由對應顧問與您聯繫，提供初步建議與後續規劃。
              </p>
              <div className="mt-auto pt-8 flex flex-wrap gap-3">
                <Link to="/demo" className="btn btn-primary">前往預約諮詢表單 <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/pricing" className="btn btn-ghost">查看價格方案</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
