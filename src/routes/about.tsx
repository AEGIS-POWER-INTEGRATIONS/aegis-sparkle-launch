import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import {
  ArrowRight,
  Cable,
  BrainCircuit,
  Boxes,
  AlertTriangle,
  Workflow,
  Database,
  Sparkles,
  Layers3,
  Factory,
  Cpu,
  Server,
  Building2,
  Briefcase,
  HardHat,
} from "lucide-react";

import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "宏鼎集成股份有限公司｜關於我們｜AEGIS POWER INTEGRATIONS" },
      { name: "description", content: "認識宏鼎集成股份有限公司（AEGIS POWER INTEGRATIONS）。我們以工程事業為核心,結合資料中心、弱電光纖、機電整合、AI 導入與企業流程數位化服務。" },
      { name: "keywords", content: "宏鼎集成, 宏鼎集成股份有限公司, Aegis Power Integrations, 公司簡介, 工程科技公司, 台灣系統整合商" },
      { property: "og:title", content: "宏鼎集成股份有限公司｜關於我們" },
      { property: "og:description", content: "宏鼎集成股份有限公司（AEGIS POWER INTEGRATIONS）— 工程整合、AI 系統整合與企業數位化的整合型夥伴。" },
      { property: "og:url", content: `${SITE_URL}/about` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],

  }),
  component: About,
});

type Bi = { zh: string; en: string };
type Item = { icon: React.ComponentType<{ className?: string }>; title: Bi; desc: Bi };

const problems: Item[] = [
  {
    icon: AlertTriangle,
    title: { zh: "工程現場與管理系統斷裂", en: "Disconnected field ops and management systems" },
    desc: { zh: "許多企業現場作業、報價、請款、進度與成本資料分散在 Excel、LINE、紙本與個人經驗中，難以即時掌握。", en: "Field operations, quotations, invoicing, progress and cost data scattered across Excel, LINE, paper and personal knowledge — hard to manage in real time." },
  },
  {
    icon: Layers3,
    title: { zh: "傳統 ERP 太重、導入太慢", en: "Traditional ERPs are too heavy and slow to deploy" },
    desc: { zh: "中小企業需要的是可以快速上線、逐步擴充、貼近實際流程的輕量化企業管理系統。", en: "SMBs need a lightweight system that goes live fast, scales gradually, and fits real workflows." },
  },
  {
    icon: Sparkles,
    title: { zh: "AI 工具多，但缺少導入方法", en: "Plenty of AI tools, but no adoption method" },
    desc: { zh: "企業真正需要的不是單一 AI 工具，而是把 AI 放進實際工作流程中，協助員工、主管與經營者提升效率。", en: "Enterprises need AI embedded into real workflows — supporting staff, managers and executives — not just standalone tools." },
  },
  {
    icon: Workflow,
    title: { zh: "工程與系統需要一起思考", en: "Engineering and systems must be planned together" },
    desc: { zh: "對工程公司與科技廠供應鏈而言，工程能力、資料能力與系統能力必須整合，才能支撐更高品質的服務交付。", en: "For engineering firms and tech supply chains, engineering, data and system capabilities must be integrated to sustain quality delivery." },
  },
];

const capabilities: Item[] = [
  {
    icon: Cable,
    title: { zh: "工程集成能力", en: "Engineering Integration" },
    desc: { zh: "弱電、網路、光纖、監控、門禁、資料中心與廠區系統整合，協助企業完成現場端基礎建置與工程協調。", en: "ELV, network, fiber, surveillance, access control, data center and facility integration — end-to-end field engineering." },
  },
  {
    icon: BrainCircuit,
    title: { zh: "AI 系統整合能力", en: "AI System Integration" },
    desc: { zh: "協助企業進行流程盤點、資料整理、AI 助理設計、自動化串接、管理儀表板與內部知識庫建置。", en: "Process discovery, data preparation, AI assistant design, automation, dashboards and internal knowledge bases." },
  },
  {
    icon: Boxes,
    title: { zh: "模組化企業系統能力", en: "Modular Enterprise Systems" },
    desc: { zh: "透過 Aegis Business Apps，協助企業快速建立報價、成本、CRM、業務管理、專案管理與營運儀表板。", en: "Through Aegis Business Apps: quotation, cost, CRM, sales, project management and operational dashboards." },
  },
];

const steps: { n: string; title: Bi; desc: Bi }[] = [
  { n: "01", title: { zh: "流程訪談", en: "Process Interview" }, desc: { zh: "了解企業目前的作業方式、痛點與資料來源。", en: "Understand current workflows, pain points and data sources." } },
  { n: "02", title: { zh: "需求盤點", en: "Requirement Discovery" }, desc: { zh: "整理出可優先改善的流程，例如報價、成本、CRM、庫存、專案管理或週報。", en: "Identify priority workflows: quotation, cost, CRM, inventory, project management or weekly reports." } },
  { n: "03", title: { zh: "系統設計", en: "System Design" }, desc: { zh: "以模組化方式設計第一階段可落地功能，避免一次導入過度複雜。", en: "Design a modular phase-one that delivers value without over-engineering." } },
  { n: "04", title: { zh: "快速導入", en: "Rapid Rollout" }, desc: { zh: "協助企業將現有 Excel、表單、LINE 回報或內部資料逐步轉入系統。", en: "Migrate existing Excel, forms, LINE reports and internal data into the system." } },
  { n: "05", title: { zh: "AI 與自動化擴充", en: "AI & Automation Expansion" }, desc: { zh: "依照企業成熟度，逐步加入 AI 助理、自動報表、API 串接與決策儀表板。", en: "Progressively add AI assistants, automated reports, API integrations and decision dashboards." } },
];

const audiences: { icon: React.ComponentType<{ className?: string }>; label: Bi }[] = [
  { icon: HardHat, label: { zh: "工程公司", en: "Engineering firms" } },
  { icon: Factory, label: { zh: "製造業", en: "Manufacturers" } },
  { icon: Cpu, label: { zh: "半導體與科技廠供應鏈", en: "Semiconductor & tech supply chains" } },
  { icon: Server, label: { zh: "資料中心與弱電工程團隊", en: "Data center & ELV engineering teams" } },
  { icon: Briefcase, label: { zh: "會計師、顧問與企業服務通路", en: "Accountants, consultants & B2B channels" } },
  { icon: Building2, label: { zh: "想導入 AI 與輕量化企業管理系統的中小企業", en: "SMBs adopting AI and lightweight enterprise systems" } },
];

function About() {
  const { isEn } = useLang();
  const t = (b: Bi) => (isEn ? b.en : b.zh);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-24">
          <div className="container-x max-w-4xl">
            <span className="eyebrow"><span className="dot" /> <L zh="關於我們" en="About Us" /></span>
            <h1 className="mt-6 text-4xl md:text-5xl">
              <L zh="關於 AEGIS POWER INTEGRATIONS" en="About AEGIS POWER INTEGRATIONS" />
            </h1>
            <p className="mt-3 text-sm text-muted-foreground tracking-wider">
              宏鼎集成股份有限公司 · Aegis Power Integrations Co., Ltd.
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              <L
                zh="AEGIS POWER INTEGRATIONS 是一家結合工程集成、AI 系統整合與企業流程數位化的整合型公司。我們協助工程公司、製造業、科技廠供應鏈與中小企業，從現場工程、流程管理、資料整合到 AI 自動化，建立更有效率、更可管理、更可擴充的營運能力。"
                en="AEGIS POWER INTEGRATIONS combines engineering integration, AI system integration and enterprise process digitalization. We help engineering firms, manufacturers, tech supply chains and SMBs build more efficient, manageable and scalable operations — from field engineering to workflow management, data integration and AI automation."
              />
            </p>
          </div>
        </section>

        {/* Positioning */}
        <section className="pb-20">
          <div className="container-x">
            <div className="panel-lift p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-[1fr_2fr] items-start">
                <div>
                  <span className="tag">Positioning</span>
                  <h2 className="mt-4 text-2xl md:text-3xl leading-snug">
                    <L
                      zh={<>AI 時代的<br />工程與企業系統<br />整合夥伴</>}
                      en={<>Engineering & Enterprise<br />Integration Partner<br />for the AI Era</>}
                    />
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base">
                  <L
                    zh="我們相信，企業數位化不只是導入一套軟體，而是將實際營運流程、現場管理經驗、資料結構與決策需求重新整合。以工程現場與企業流程為基礎，結合 AI、自動化與模組化系統，協助企業用更務實的方式完成數位轉型。"
                    en="We believe digital transformation is more than deploying software — it is re-integrating real workflows, field management experience, data structure and decision needs. Grounded in engineering practice and enterprise workflows, we combine AI, automation and modular systems to help clients transform pragmatically."
                  />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> <L zh="我們解決的問題" en="Problems We Solve" /></span>
              <h2 className="mt-4 text-3xl md:text-4xl"><L zh="我們解決的問題" en="Problems We Solve" /></h2>
              <p className="mt-3 text-muted-foreground">
                <L
                  zh="從工程現場到企業管理，我們聚焦四個最常見、也最關鍵的營運斷點。"
                  en="From engineering sites to enterprise management, we focus on four of the most common and critical operational gaps."
                />
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {problems.map(({ icon: Icon, title, desc }, i) => (
                <div key={title.en} className="panel p-7">
                  <div className="flex items-start gap-4">
                    <div className="num-badge shrink-0">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-lg">{t(title)}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(desc)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core capabilities */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> <L zh="核心能力" en="Core Capabilities" /></span>
              <h2 className="mt-4 text-3xl md:text-4xl"><L zh="核心能力" en="Core Capabilities" /></h2>
              <p className="mt-3 text-muted-foreground">
                <L
                  zh="工程、AI 與企業系統三條主軸，貫穿我們所有服務。"
                  en="Engineering, AI and enterprise systems — three pillars behind every service we deliver."
                />
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {capabilities.map(({ icon: Icon, title, desc }) => (
                <div key={title.en} className="panel p-7">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-ink-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl">{t(title)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-3xl">
              <span className="eyebrow"><span className="dot" /> <L zh="導入方法" en="Methodology" /></span>
              <h2 className="mt-4 text-3xl md:text-4xl">
                <L zh="從單一流程開始，逐步建立企業數位營運系統" en="Start with one workflow, then build a full digital operations system" />
              </h2>
              <p className="mt-3 text-muted-foreground">
                <L
                  zh="我們以模組化方式分階段導入，降低風險、縮短上線時間，讓企業在每一步都能看見成效。"
                  en="Modular, phased delivery reduces risk, shortens time-to-value, and makes results visible at every step."
                />
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-5">
              {steps.map((s, i) => (
                <div key={s.n} className="relative panel p-6">
                  <div className="text-xs font-mono tracking-widest text-muted-foreground">STEP {s.n}</div>
                  <h3 className="mt-3 text-lg">{t(s.title)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(s.desc)}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 z-10 text-muted-foreground/50">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audiences */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> <L zh="服務對象" en="Who We Serve" /></span>
              <h2 className="mt-4 text-3xl md:text-4xl"><L zh="服務對象" en="Who We Serve" /></h2>
              <p className="mt-3 text-muted-foreground">
                <L
                  zh="從現場工程到企業總部，我們的服務涵蓋以下領域。"
                  en="From engineering sites to enterprise headquarters, our services cover:"
                />
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map(({ icon: Icon, label }) => (
                <div key={label.en} className="panel p-5 flex items-center gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 border border-border">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="text-[15px] font-medium">{t(label)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand spirit */}
        <section className="pb-20">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-14">
              <div className="grid gap-8 md:grid-cols-[1fr_2fr] items-start">
                <div>
                  <span className="tag">Brand</span>
                  <h2 className="mt-4 text-3xl md:text-4xl leading-tight">
                    <L zh={<>務實、整合、<br />可落地</>} en={<>Pragmatic,<br />Integrated,<br />Deployable</>} />
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    <L
                      zh="我們不追求華麗但難以落地的系統，而是重視企業真實流程、資料可用性、導入成本與後續擴充。我們希望成為企業在工程集成、AI 導入與營運系統升級上的長期合作夥伴。"
                      en="We don't chase flashy systems that never deploy. We care about real workflows, data usability, adoption cost and future expansion — aiming to be a long-term partner in engineering, AI adoption and operations upgrades."
                    />
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      { icon: Workflow, label: { zh: "貼近實際流程", en: "Real workflows" } },
                      { icon: Database, label: { zh: "資料可用、可治理", en: "Usable & governed data" } },
                      { icon: Sparkles, label: { zh: "可分階段擴充", en: "Phased expansion" } },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label.en} className="rounded-lg border border-border bg-surface/60 p-3 text-center">
                        <Icon className="h-4 w-4 mx-auto text-muted-foreground" />
                        <div className="mt-2 text-xs font-medium">{t(label)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl">
                <L zh="想讓企業流程開始系統化與 AI 化嗎？" en="Ready to systematize and AI-enable your operations?" />
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                <L
                  zh="從一個流程開始，我們協助你盤點、設計、導入，逐步建立企業自己的數位營運系統。"
                  en="Start with one workflow — we help you discover, design and deploy your own digital operations system, step by step."
                />
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/demo" className="btn btn-primary"><L zh="預約諮詢" en="Book Consultation" /> <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/contact" className="btn btn-ghost"><L zh="聯絡我們" en="Contact Us" /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
