import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import heroAsset from "@/assets/hero-network-fiber.webp.asset.json";
import engineeringFiberPanel from "@/assets/engineering-fiber-panel.webp.asset.json";
import engineeringServerRack from "@/assets/engineering-server-rack.webp.asset.json";
import engineeringSecurityCameras from "@/assets/engineering-security-cameras.webp.asset.json";
import engineeringFiberTech from "@/assets/engineering-fiber-technician.webp.asset.json";
import mockCostflow from "@/assets/mock-costflow.jpg";
import mockSalesops from "@/assets/mock-salesops.jpg";
import mockAilaunch from "@/assets/mock-ailaunch.jpg";
import {
  ArrowRight,
  Cpu,
  Server,
  Factory,
  Building2,
  Leaf,
  BrainCircuit,
  Cable,
  Waypoints,
  Zap,
  Wrench,
  ClipboardCheck,
  Recycle,
  Workflow,
  Bot,
  Users,
  Database,
  LineChart,
  Sparkles,
  FileSpreadsheet,
  MessagesSquare,
  Network,
  Layers3,
  Rocket,
  Clock,
  Handshake,
} from "lucide-react";

import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "宏鼎集成｜工程整合、AI 導入與企業數位轉型｜AEGIS POWER INTEGRATIONS" },
      { name: "description", content: "宏鼎集成股份有限公司（AEGIS POWER INTEGRATIONS）位於台中，提供資料中心、半導體與科技廠工程、弱電光纖、機電整合、AI 系統整合、企業管理系統及數位轉型服務。" },
      { name: "keywords", content: "宏鼎集成, 宏鼎集成股份有限公司, AEGIS POWER INTEGRATIONS, 工程整合, 工程集成, 資料中心工程, 弱電工程, 光纖工程, 機電工程, 半導體工程, AI 系統整合, 企業數位轉型, ERP 系統, CRM 系統, BI 商業智慧, 台中工程公司" },
      { property: "og:title", content: "宏鼎集成｜工程整合、AI 導入與企業數位轉型" },
      { property: "og:description", content: "宏鼎集成股份有限公司結合工程現場、資料中心、弱電光纖、企業系統與 AI 技術，協助企業提升工程執行及營運管理效率。" },
      { property: "og:site_name", content: "宏鼎集成｜AEGIS POWER INTEGRATIONS" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "640" },
      { name: "twitter:title", content: "宏鼎集成｜工程整合與 AI 系統整合" },
      { name: "twitter:description", content: "宏鼎集成股份有限公司提供資料中心、工程整合、AI 導入及企業數位轉型服務。" },
      { name: "twitter:image", content: OG_IMAGE },
    ],

    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "preload", as: "image", href: heroAsset.url, fetchpriority: "high" } as never,
    ],
  }),
  component: Home,
});

const heroBg = heroAsset.url;

type Bi = { zh: string; en: string };
type Card = { icon: React.ComponentType<{ className?: string }>; en: string; zh: string; desc: Bi };

const trustPillars: { label: Bi; sub: Bi }[] = [
  {
    label: { zh: "工程現場執行", en: "Engineering Site Execution" },
    sub: { zh: "以現場實務為核心的工程交付能力", en: "Field-first engineering delivery capability" },
  },
  {
    label: { zh: "專案管理與每日回報", en: "Project Management and Daily Reporting" },
    sub: { zh: "以透明度與可追溯性推進專案", en: "Delivered with transparency and traceability" },
  },
  {
    label: { zh: "跨工程與系統整合", en: "Cross-Disciplinary Engineering and System Integration" },
    sub: { zh: "整合機電、弱電、光纖、IT 與 OT", en: "MEP, ELV, fiber, IT and OT integration" },
  },
  {
    label: { zh: "台灣在地服務與長期支援", en: "Taiwan-Based Service and Ongoing Support" },
    sub: { zh: "支援安排依個別專案範圍為準", en: "Support arrangements subject to project scope" },
  },
];

const industries: Card[] = [
  { icon: Cpu, en: "Semiconductor", zh: "半導體與科技廠", desc: { zh: "Fab 與供應鏈廠區的弱電、光纖、系統整合與 AI 導入。", en: "ELV, fiber, system integration and AI adoption for fabs and their supply chains." } },
  { icon: Server, en: "Data Centers", zh: "資料中心", desc: { zh: "資料中心基礎建設、佈線、機櫃與運維系統整合。", en: "Data center infrastructure, cabling, racks and operations system integration." } },
  { icon: Factory, en: "Manufacturing", zh: "製造業", desc: { zh: "工廠 IT/OT 整合、報價成本、業務與生產流程數位化。", en: "IT/OT integration, quotation, cost and sales/production workflow digitalization." } },
  { icon: Building2, en: "Commercial Buildings", zh: "商辦與智慧建築", desc: { zh: "弱電、監控、門禁、網路與能源監測系統整合。", en: "ELV, surveillance, access control, network and energy monitoring integration." } },
  { icon: Leaf, en: "Energy & ESG", zh: "能源與 ESG", desc: { zh: "太陽光電、儲能、機電工程與能源管理平台。", en: "Solar PV, energy storage, MEP engineering and energy management platforms." } },
  { icon: BrainCircuit, en: "Enterprise AI", zh: "企業 AI", desc: { zh: "為企業建置可落地的 AI 工作流、代理人與知識庫。", en: "Production-ready AI workflows, agents and knowledge bases for enterprises." } },
];

const engineeringServices: Card[] = [
  { icon: Cable, en: "Structured Cabling", zh: "結構化佈線", desc: { zh: "Cat 6A / Cat 8 與資料中心等級佈線設計與施作。", en: "Cat 6A / Cat 8 and data-center grade cabling design and installation." } },
  { icon: Waypoints, en: "Fiber Optic Installation", zh: "光纖建置", desc: { zh: "單模／多模光纖佈設、熔接與測試，涵蓋園區與跨建物骨幹。", en: "Single-mode / multi-mode fiber deployment, splicing and testing across campus backbones." } },
  { icon: Zap, en: "Electrical Integration", zh: "電氣整合", desc: { zh: "配電、UPS、機櫃供電、接地與電力品質整合。", en: "Power distribution, UPS, rack power, grounding and power quality integration." } },
  { icon: Wrench, en: "Mechanical Coordination", zh: "機電協調", desc: { zh: "空調、消防、機電與工地介面協調，確保多專業同步交付。", en: "HVAC, fire, MEP and site interface coordination for synchronized delivery." } },
  { icon: ClipboardCheck, en: "Project Management", zh: "專案管理", desc: { zh: "從設計審查、排程、風險控管到驗收交付的全程專案管理。", en: "Full lifecycle project management from design review to acceptance handover." } },
  { icon: Recycle, en: "Decommission Services", zh: "設備退役與遷移", desc: { zh: "機房與廠區設備退役、資產盤點、資料清除與環境復原。", en: "Facility decommission, asset inventory, data sanitization and site restoration." } },
];

const aiServices: Card[] = [
  { icon: Workflow, en: "Workflow Automation", zh: "流程自動化", desc: { zh: "以 n8n、API 與資料串接重構跨系統流程，減少人工重工。", en: "Rebuild cross-system workflows with n8n, APIs and data integration to eliminate manual rework." } },
  { icon: Bot, en: "AI Agent", zh: "AI 代理人", desc: { zh: "客服、內部知識、業務、報價場景的專屬 AI 助理與代理人。", en: "Dedicated AI assistants and agents for support, internal knowledge, sales and quotation workflows." } },
  { icon: Users, en: "CRM", zh: "客戶關係管理", desc: { zh: "客戶、商機、拜訪紀錄與 AI 週報整合的業務管理系統。", en: "Sales management combining customers, opportunities, visit logs and AI weekly reports." } },
  { icon: Database, en: "ERP", zh: "企業資源規劃", desc: { zh: "報價、成本、專案、採購與財務資料的模組化整合。", en: "Modular integration of quotation, cost, project, procurement and finance data." } },
  { icon: LineChart, en: "Business Intelligence", zh: "商業智慧", desc: { zh: "跨部門營運儀表板、KPI 追蹤與 AI 洞察報表。", en: "Cross-department operational dashboards, KPI tracking and AI-driven insight reports." } },
  { icon: Sparkles, en: "Enterprise AI", zh: "企業 AI 導入", desc: { zh: "從流程盤點、資料治理到 AI 落地的完整導入服務。", en: "End-to-end AI adoption from process discovery and data governance to production rollout." } },
];

const products = [
  { name: "Aegis CostFlow", tagline: { zh: "工程報價與成本分析", en: "Engineering Quotation & Cost Analytics" }, desc: { zh: "工程報價、材料、人工、外包與毛利一體化管理，內建 AI 成本提醒。", en: "Unified management of quotations, materials, labor, subcontracts and margin with AI cost alerts." }, icon: FileSpreadsheet, image: mockCostflow, to: "/costflow" as const },
  { name: "Aegis SalesOps", tagline: { zh: "業務管理與 AI 週報", en: "Sales Management & AI Weekly Reports" }, desc: { zh: "整合 CRM、拜訪紀錄、LINE 回報與 AI 週報，讓業務管理即時透明。", en: "CRM, visit logs, LINE reports and AI weekly summaries for real-time sales visibility." }, icon: MessagesSquare, image: mockSalesops, to: "/salesops" as const },
  { name: "Aegis AI Launch", tagline: { zh: "企業 AI 導入服務", en: "Enterprise AI Adoption Service" }, desc: { zh: "從流程盤點、資料整理、AI 助理設計到自動化串接的完整服務。", en: "End-to-end service from process discovery and data prep to AI assistant design and automation." }, icon: Network, image: mockAilaunch, to: "/ai-launch" as const },
];

const whyUs: Card[] = [
  { icon: Wrench, en: "Engineering Experience", zh: "工程實務經驗", desc: { zh: "核心團隊具備能源、機電、弱電、光纖、資料中心等現場工程經驗。", en: "Core team with hands-on experience in energy, MEP, ELV, fiber and data center engineering." } },
  { icon: ClipboardCheck, en: "Professional Project Management", zh: "專業專案管理", desc: { zh: "以標準化的專案管理流程，進行範圍、進度、風險與驗收管理。", en: "Standardized project management covering scope, schedule, risk and acceptance." } },
  { icon: Layers3, en: "Enterprise Integration", zh: "企業級系統整合", desc: { zh: "跨工程、IT、OT 與企業應用系統的整合能力，一站式落地。", en: "One-stop integration across engineering, IT, OT and enterprise applications." } },
  { icon: Clock, en: "Responsive Support", zh: "回應與支援", desc: { zh: "依專案需求設置溝通窗口、回應機制與必要支援安排。", en: "Communication channels, response mechanisms and support arrangements set per project needs." } },
  { icon: Rocket, en: "Scalable Solutions", zh: "可擴展方案", desc: { zh: "模組化架構讓系統與服務可隨企業成長逐步擴充。", en: "Modular architecture that scales systems and services as your business grows." } },
];

const projects = [
  { industry: { zh: "半導體", en: "Semiconductor" }, zh: "半導體晶圓廠", scopeEn: "Campus ELV & fiber backbone integration", scope: "廠區弱電與光纖骨幹整合", outcome: { zh: "跨廠房光纖骨幹重建與監控系統整合交付。", en: "Cross-facility fiber backbone rebuild and surveillance system integration delivered." }, image: engineeringFiberPanel.url },
  { industry: { zh: "資料中心", en: "Data Center" }, zh: "大型資料中心", scopeEn: "Structured cabling & rack power", scope: "結構化佈線與機櫃供電", outcome: { zh: "資料中心 Cat 6A 佈線、機櫃供電與冷通道協調交付。", en: "Data-center Cat 6A cabling, rack power and cold-aisle coordination delivered." }, image: engineeringServerRack.url },
  { industry: { zh: "企業園區", en: "Enterprise Campus" }, zh: "企業園區", scopeEn: "Surveillance, access control & network", scope: "監控門禁與網路整合", outcome: { zh: "多棟建物監控、門禁與網路骨幹整合，統一管理平台。", en: "Multi-building surveillance, access control and network backbone unified into one platform." }, image: engineeringSecurityCameras.url },
  { industry: { zh: "製造業", en: "Manufacturing" }, zh: "電子製造業", scopeEn: "IT/OT network & AI adoption", scope: "IT/OT 網路與 AI 導入", outcome: { zh: "產線網路重整並導入 AI 報表與週報系統，縮短決策時間。", en: "Production-line network overhaul with AI reporting and weekly-report system to speed decisions." }, image: engineeringFiberTech.url },
];

function Home() {
  const { isEn } = useLang();
  const t = (b: Bi) => (isEn ? b.en : b.zh);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 -z-10">
            <img
              src={heroBg}
              alt=""
              aria-hidden="true"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.16_0.06_258/0.94)] via-[oklch(0.18_0.06_258/0.88)] to-[oklch(0.22_0.07_258/0.7)]" />
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
                maskImage: "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 80%)",
              }}
            />
          </div>

          <div className="container-x pt-24 pb-24 md:pt-32 md:pb-32 text-ink-foreground">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/80">
                <span className="h-1.5 w-1.5 rounded-sm bg-white/80" />
                Aegis Power Integrations
              </span>
              <h1 className="mt-6 text-[2.4rem] leading-[1.12] md:text-[3.4rem] xl:text-[4rem] xl:leading-[1.08] font-bold tracking-[-0.02em] text-white">
                {isEn ? (
                  <>
                    Engineering × AI × <br />
                    <span className="text-[oklch(0.85_0.12_235)]">Digital Transformation</span>
                  </>
                ) : (
                  <>
                    宏鼎集成｜工程整合 × AI 導入 × <br />
                    <span className="text-[oklch(0.85_0.12_235)]">企業數位轉型</span>
                  </>
                )}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                <L
                  zh="宏鼎集成股份有限公司（AEGIS POWER INTEGRATIONS）專注於工程整合、資料中心與產業應用，並結合 AI、流程自動化及企業系統，協助客戶提升專案執行效率與營運管理能力。"
                  en="Aegis Power Integrations Co., Ltd. delivers enterprise-grade engineering integration and AI systems for semiconductor fabs, data centers, manufacturers and enterprise customers across Taiwan and APAC."
                />
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-primary">
                  <L zh="聯絡我們" en="Contact Us" /> <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/engineering"
                  className="btn border border-white/30 bg-white/5 text-white hover:bg-white/10"
                >
                  <L zh="了解服務" en="View Services" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust pillars — qualitative capabilities (no unverified metrics) */}
        <section className="border-b border-border bg-background">
          <div className="container-x py-14 md:py-16">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trustPillars.map((m) => (
                <div key={m.label.en} className="border-l-2 border-primary pl-5">
                  <div className="text-base md:text-lg font-semibold tracking-tight text-foreground leading-snug">{t(m.label)}</div>
                  <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(m.sub)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-24 md:py-28">
          <div className="container-x">
            <SectionHeader
              eyebrow="Industries"
              titleZh="服務產業"
              titleEn="Industries We Serve"
              descZh="從半導體與資料中心的工程現場，到製造業與商辦企業的 AI 系統整合，AEGIS POWER INTEGRATIONS 為多元產業提供落地服務。"
              descEn="From semiconductor and data center engineering to AI system integration for manufacturers and enterprises — we serve a wide range of industries."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map(({ icon: Icon, en, zh, desc }) => (
                <div key={en} className="panel p-7 hover:border-primary/40 hover:shadow-lift transition-all">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded bg-ink text-ink-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg">{isEn ? en : zh}</h3>
                  <div className="text-xs text-muted-foreground tracking-widest mt-0.5 uppercase">
                    {isEn ? zh : en}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engineering Services */}
        <section className="py-24 md:py-28 bg-surface/40 border-y border-border">
          <div className="container-x">
            <SectionHeader
              eyebrow="Engineering"
              titleZh="工程集成服務"
              titleEn="Engineering Services"
              descZh="從佈線、光纖、電氣、機電協調到專案管理與設備退役，覆蓋工程集成完整生命週期。"
              descEn="From cabling and fiber to electrical, MEP coordination, project management and decommissioning — the full engineering integration lifecycle."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {engineeringServices.map(({ icon: Icon, en, zh, desc }, i) => (
                <div key={en} className="panel p-7 group">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded bg-ink text-ink-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground tracking-widest">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg">{isEn ? en : zh}</h3>
                  <div className="text-xs text-muted-foreground tracking-widest mt-0.5 uppercase">
                    {isEn ? zh : en}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(desc)}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/engineering" className="btn btn-ghost">
                <L zh="查看工程服務" en="View Engineering Capabilities" /> <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* AI Integration */}
        <section className="py-24 md:py-28">
          <div className="container-x">
            <SectionHeader
              eyebrow="AI Integration"
              titleZh="AI 系統整合"
              titleEn="AI System Integration"
              descZh="以流程盤點為起點，將自動化、AI 代理、CRM、ERP、BI 與企業 AI 導入串接為可落地的營運能力。"
              descEn="Starting from process discovery, we integrate automation, AI agents, CRM, ERP, BI and enterprise AI into deployable operational capability."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {aiServices.map(({ icon: Icon, en, zh, desc }) => (
                <div key={en} className="panel p-7">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded bg-primary/10 text-primary border border-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg">{isEn ? en : zh}</h3>
                  <div className="text-xs text-muted-foreground tracking-widest mt-0.5 uppercase">
                    {isEn ? zh : en}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(desc)}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/ai-integration" className="btn btn-ghost">
                <L zh="了解 AI 系統整合" en="Explore AI Integration" /> <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Business Applications */}
        <section className="py-24 md:py-28 bg-surface/40 border-y border-border">
          <div className="container-x">
            <SectionHeader
              eyebrow="Products"
              titleZh="Aegis 企業應用"
              titleEn="Business Applications"
              descZh="AEGIS POWER INTEGRATIONS 旗下模組化企業應用系列，協助企業從報價、業務到 AI 導入逐步建立自己的數位營運。"
              descEn="Our modular enterprise application suite helps companies build their own digital operations — from quotation and sales to AI adoption."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {products.map(({ name, tagline, desc, icon: Icon, image, to }) => (
                <Link key={name} to={to} className="panel-lift flex flex-col group overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-ink">
                    <img
                      src={image}
                      alt={`${name} — ${t(tagline)}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded bg-ink text-ink-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="tag">Product</span>
                    </div>
                    <h3 className="mt-5 text-xl">{name}</h3>
                    <div className="mt-1 text-sm font-medium text-foreground">{t(tagline)}</div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{t(desc)}</p>
                    <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      <L zh="了解更多" en="Learn more" /> <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 md:py-28">
          <div className="container-x">
            <SectionHeader
              eyebrow="Why Aegis"
              titleZh="為什麼選擇我們"
              titleEn="Why Choose Us"
              descZh="工程實務、專案管理、企業整合、快速回應與可擴展方案，五大優勢構成 AEGIS POWER INTEGRATIONS 的核心價值。"
              descEn="Engineering experience, project management, enterprise integration, fast response and scalable solutions — five core strengths that define our value."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {whyUs.map(({ icon: Icon, en, zh, desc }, i) => (
                <div key={en} className="panel p-7 flex gap-5">
                  <div className="shrink-0">
                    <div className="text-xs font-mono tracking-widest text-muted-foreground">0{i + 1}</div>
                    <div className="mt-2 inline-flex h-11 w-11 items-center justify-center rounded bg-ink text-ink-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg">{isEn ? en : zh}</h3>
                    <div className="text-xs text-muted-foreground tracking-widest mt-0.5 uppercase">
                      {isEn ? zh : en}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Experience */}
        <section className="py-24 md:py-28 bg-surface/40 border-y border-border">
          <div className="container-x">
            <SectionHeader
              eyebrow="Experience"
              titleZh="專案經驗"
              titleEn="Project Experience"
              descZh="以下為核心團隊曾參與或目前可提供的專案類型，實際承攬主體、執行範圍及合作內容依個別專案為準。"
              descEn="The following are project categories the core team has participated in or can currently provide. Actual contracting entity, execution scope and cooperation terms are subject to each individual project."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {projects.map((p) => (
                <div key={p.scope} className="panel overflow-hidden flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden bg-ink">
                    <img
                      src={p.image}
                      alt={`${t(p.industry)} project`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-sm bg-white/95 px-2.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-foreground">
                      {t(p.industry)}
                    </div>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="text-xs font-semibold tracking-widest text-primary uppercase">{p.zh}</div>
                    <h3 className="mt-2 text-lg">{isEn ? p.scopeEn : p.scope}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(p.outcome)}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              <L
                zh="* 客戶名稱依合約保密，僅以產業類別呈現。"
                en="* Client names are confidential and shown as industry categories only."
              />
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-28">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-lg border border-border bg-ink text-ink-foreground p-10 md:p-16">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                  maskImage: "radial-gradient(ellipse 80% 60% at 30% 40%, black 30%, transparent 80%)",
                }}
              />
              <div className="relative max-w-3xl">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70">
                  <Handshake className="h-4 w-4" /> <L zh="讓我們一起打造" en="Let's Build Together" />
                </div>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">
                  <L
                    zh="準備以企業規模整合工程與 AI？"
                    en="Ready to integrate engineering and AI at enterprise scale?"
                  />
                </h2>
                <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
                  <L
                    zh="預約與 AEGIS POWER INTEGRATIONS 的初步諮詢，我們將協助評估工程範圍、系統整合與 AI 導入路徑。"
                    en="Book an initial consultation and we will help assess your engineering scope, system integration and AI adoption roadmap."
                  />
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn bg-white text-ink border-white hover:bg-white/90">
                    <L zh="聯絡我們" en="Contact Us" /> <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/demo" className="btn border border-white/30 bg-white/5 text-white hover:bg-white/10">
                    <L zh="預約諮詢" en="Book a Consultation" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  titleZh,
  titleEn,
  descZh,
  descEn,
}: {
  eyebrow: string;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
}) {
  const { isEn } = useLang();
  return (
    <div className="max-w-2xl">
      <span className="eyebrow">
        <span className="dot" /> {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight">
        {isEn ? titleEn : titleZh}
      </h2>
      <div className="mt-2 text-sm font-medium text-muted-foreground tracking-widest uppercase">
        {isEn ? titleZh : titleEn}
      </div>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">
        {isEn ? descEn : descZh}
      </p>
    </div>
  );
}
