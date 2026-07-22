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
  { icon: Server, en: "Data Centers", zh: "資料中心與機房", desc: { zh: "資料中心與機房基礎工程、佈線、機櫃、監控與運維系統整合。", en: "Data-center and server-room infrastructure, cabling, racks, monitoring and operations integration." } },
  { icon: Wrench, en: "Engineering & EPC", zh: "工程與 EPC", desc: { zh: "光纖弱電、機電協調、工程進度與品質管理，支援 EPC 統包與跨承包商整合。", en: "Fiber & ELV, MEP coordination, schedule and quality management for EPC and multi-contractor integration." } },
  { icon: Factory, en: "Manufacturing", zh: "製造業", desc: { zh: "工廠 IT/OT 整合、報價成本、業務與生產流程數位化改善。", en: "IT/OT integration, quotation and cost workflows, sales and production digitalization." } },
  { icon: Leaf, en: "Energy & Environment", zh: "能源與環保", desc: { zh: "太陽光電、儲能、能源計量、ESG 資料與能源管理平台。", en: "Solar PV, storage, metering, ESG data and energy-management platforms." } },
  { icon: BrainCircuit, en: "SMEs Digital Transformation", zh: "中小企業數位轉型", desc: { zh: "以務實節奏協助中小企業從關鍵流程開始建立可持續的數位能力。", en: "A pragmatic pace of digital adoption for SMEs, starting from critical workflows." } },
  { icon: Building2, en: "Commercial Buildings & Others", zh: "商業建築及其他產業", desc: { zh: "商辦、園區、商業空間的弱電、監控、網路與能源監測整合。", en: "ELV, surveillance, networking and energy monitoring for offices, campuses and commercial spaces." } },
  { icon: Cpu, en: "Semiconductor Supply Chain", zh: "半導體供應鏈", desc: { zh: "以光纖弱電、廠區網路、工程進度回報、供應商資料整合的角色參與，不承接晶圓廠自動化整體專案。", en: "Participating at the fiber/ELV, site-network, engineering-progress and supplier-data layer — not end-to-end fab automation." } },
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
  { name: "Aegis CostFlow", tagline: { zh: "工程報價與成本分析應用模組", en: "Engineering Quotation & Cost Analytics Module" }, desc: { zh: "把工程報價、材料、人工與外包成本整合為可追蹤的資料流，內建 AI 成本提醒。實際功能與費用需經需求訪談確認。", en: "Turns quotation, materials, labor and subcontract costs into a trackable data flow with AI cost alerts. Final scope and cost confirmed after discovery." }, icon: FileSpreadsheet, image: mockCostflow, to: "/costflow" as const },
  { name: "Aegis SalesOps", tagline: { zh: "業務、現場回報與管理資訊整合模組", en: "Sales, Field-Report & Management Info Module" }, desc: { zh: "整合業務拜訪、LINE 回報、CRM 與 AI 週報，讓現場資訊即時進入管理視野。實際功能與費用需經需求訪談確認。", en: "Unifies sales visits, LINE reports, CRM and AI weekly summaries. Final scope and cost confirmed after discovery." }, icon: MessagesSquare, image: mockSalesops, to: "/salesops" as const },
  { name: "Aegis AI Launch", tagline: { zh: "企業 AI 導入啟動服務", en: "Enterprise AI Adoption Kickoff" }, desc: { zh: "從流程盤點、資料整理、AI 助理設計到自動化串接的 PoC 導入啟動服務。實際範圍需經需求訪談確認。", en: "PoC kickoff service spanning process discovery, data prep, AI-assistant design and automation. Scope confirmed after discovery." }, icon: Network, image: mockAilaunch, to: "/ai-launch" as const },
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
              <h1 className="mt-6 text-[2.2rem] leading-[1.15] md:text-[3.2rem] xl:text-[3.9rem] xl:leading-[1.08] font-bold tracking-[-0.02em] text-white">
                {isEn ? (
                  <>
                    From the engineering floor to enterprise AI,
                    <br />
                    <span className="text-[oklch(0.85_0.12_235)]">integrating your workflow end to end</span>
                  </>
                ) : (
                  <>
                    從工程現場到企業 AI 導入，
                    <br />
                    <span className="text-[oklch(0.85_0.12_235)]">協助企業把流程真正整合起來</span>
                  </>
                )}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                <L
                  zh="宏鼎集成提供資料中心、光纖弱電、工程管理與企業 AI 導入顧問服務，從需求盤點、流程改善到實際落地，陪伴企業逐步完成轉型。"
                  en="Aegis Power Integrations delivers data-center, fiber and ELV engineering, project management and enterprise AI advisory — from discovery and process improvement to on-the-ground rollout, walking alongside your team through the transformation."
                />
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
                <L
                  zh="工程整合是我們的第一主軸，企業 AI 顧問是第二主軸。我們不是純軟體開發公司，也不是低價 SaaS 工具商。"
                  en="Engineering integration is our first pillar; enterprise AI advisory is our second. We are not a pure software vendor or a low-cost SaaS tool reseller."
                />
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-primary">
                  <L zh="洽詢工程合作" en="Discuss Engineering Partnership" /> <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="btn border border-white/30 bg-white/5 text-white hover:bg-white/10"
                >
                  <L zh="預約 AI 流程健檢" en="Book AI Workflow Check-up" />
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

        {/* Engineering Services — flagship (60% of business) */}
        <section className="py-24 md:py-28">
          <div className="container-x">
            <SectionHeader
              eyebrow="Engineering · Core Service"
              titleZh="工程集成服務（主力業務）"
              titleEn="Engineering Integration (Flagship)"
              descZh="工程整合與專案執行是宏鼎集成的核心業務，涵蓋弱電、光纖、資料中心、機電協調、監控門禁與廠區資訊整合，從現場勘查、規劃、施工到驗收與後續維運全程負責。"
              descEn="Engineering integration and project execution are our core business — from ELV, fiber, data centers and MEP coordination to surveillance, access control and facility integration, delivered end-to-end from site survey to acceptance and operations."
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
              <Link to="/engineering" className="btn btn-primary">
                <L zh="查看工程服務" en="View Engineering Capabilities" /> <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* AI Advisory (second pillar) — placed right after Engineering */}
        <section className="py-24 md:py-28 bg-surface/40 border-y border-border">
          <div className="container-x">
            <SectionHeader
              eyebrow="AI Advisory · Second Pillar"
              titleZh="企業 AI 顧問與導入服務"
              titleEn="Enterprise AI Advisory & Implementation"
              descZh="以顧問先行、導入陪跑的方式，協助企業盤點問題、選擇工具、串接既有系統與 AI 模型，並以教育訓練與陪跑，讓 AI 真正落到日常工作。我們不會要求客戶全面更換既有系統。"
              descEn="Advisory-first, coaching-alongside — we help you audit problems, select tools, integrate existing systems and AI models, and land AI into daily work through training and hands-on coaching. We do not push wholesale system replacement."
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
                <L zh="了解企業 AI 顧問服務" en="Explore AI Advisory" /> <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-24 md:py-28">
          <div className="container-x">
            <SectionHeader
              eyebrow="Industries"
              titleZh="主要服務產業"
              titleEn="Industries We Serve"
              descZh="以資料中心與工程現場為核心，延伸至製造業、能源與 ESG、中小企業數位轉型、商業建築等產業。半導體以供應鏈工程與資料流角色參與，不承接晶圓廠自動化整體專案。"
              descEn="Anchored on data centers and engineering delivery, extending to manufacturing, energy & ESG, SME digital transformation and commercial buildings. In semiconductor we work at the supply-chain engineering and data layer, not end-to-end fab automation."
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



        {/* Business Applications */}
        <section className="py-24 md:py-28 bg-surface/40 border-y border-border">
          <div className="container-x">
            <SectionHeader
              eyebrow="AI Application Modules · PoC"
              titleZh="AI 應用模組與 PoC 方案"
              titleEn="AI Application Modules & PoC Programs"
              descZh="Aegis CostFlow、SalesOps 與 AI Launch 是我們在企業端常用的 AI 應用模組與 PoC 導入方案，並非已成熟的 SaaS 產品線。實際功能、資料需求與費用皆需經需求訪談後確認。"
              descEn="CostFlow, SalesOps and AI Launch are the AI application modules and PoC programs we typically deploy — not a packaged SaaS product line. Actual scope, data requirements and cost are confirmed after discovery."
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

        {/* Engagement Process */}
        <section className="py-24 md:py-28">
          <div className="container-x">
            <SectionHeader
              eyebrow="Process"
              titleZh="合作流程"
              titleEn="Engagement Process"
              descZh="從初步需求訪談到導入陪跑，我們以顧問先行、逐步落地的節奏推進，實際範圍與費用皆以書面報價為準。"
              descEn="From initial needs discovery to hands-on adoption, we move at an advisory-first, stepwise pace — actual scope and pricing are confirmed in writing."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "01", t: { zh: "需求訪談", en: "Needs Discovery" }, d: { zh: "訪談現場與管理層，釐清問題、目標與導入節奏。", en: "Interview field and management to clarify problems, goals and pace." } },
                { n: "02", t: { zh: "診斷與建議", en: "Diagnosis & Advice" }, d: { zh: "提供書面問題清單與可行導入方向，判斷應調整流程、串接工具或引入合作廠商。", en: "Deliver written problem list and viable directions — adjust workflow, integrate or bring in partners." } },
                { n: "03", t: { zh: "PoC 或工程執行", en: "PoC or Engineering" }, d: { zh: "依方向啟動 PoC 導入專案或工程整合執行，逐步驗證與交付。", en: "Kick off a PoC or engineering execution based on the chosen direction." } },
                { n: "04", t: { zh: "導入陪跑", en: "Adoption Coaching" }, d: { zh: "以教育訓練、月度顧問與後續維運，讓成果真正嵌入日常營運。", en: "Training, monthly advisory and ongoing operations so results actually stick." } },
              ].map((s) => (
                <div key={s.n} className="panel p-7">
                  <span className="num-badge">{s.n}</span>
                  <h3 className="mt-4 text-lg font-semibold">{t(s.t)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(s.d)}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              <L
                zh="※ 宏鼎集成依企業現況、資料完整度、使用人數、串接範圍及導入目標提供正式報價，不以未訪談前的固定價格取代需求評估。"
                en="※ Formal quotes reflect your current state, data readiness, user count, integration scope and adoption goals — we do not substitute list prices for real scoping."
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
                  <Link to="/engineering" className="btn border border-white/30 bg-white/5 text-white hover:bg-white/10">
                    <L zh="工程整合服務" en="Engineering Services" />
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
