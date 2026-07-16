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
  ShieldCheck,
  Layers3,
  Rocket,
  Clock,
  Handshake,
} from "lucide-react";

import { OG_IMAGE, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aegis Power Integrations｜Engineering × AI × Digital Transformation" },
      { name: "description", content: "宏鼎集成股份有限公司 Aegis Power Integrations — enterprise engineering integration and AI systems partner for semiconductor, data center, manufacturing and enterprise customers in Taiwan and APAC." },
      { name: "keywords", content: "engineering integration, AI system integration, semiconductor engineering, data center, structured cabling, fiber optic, enterprise AI, workflow automation, 宏鼎集成, 工程集成, AI 系統整合, 半導體, 資料中心, 企業管理系統" },
      { property: "og:title", content: "Aegis Power Integrations｜Engineering × AI × Digital Transformation" },
      { property: "og:description", content: "Enterprise engineering and AI integration partner for semiconductor fabs, data centers, manufacturers and enterprise customers." },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "640" },
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

const metrics = [
  { value: "15+", label: "Years of Engineering Experience", sub: "能源、機電、弱電、資料中心" },
  { value: "200+", label: "Projects Delivered", sub: "工程整合與系統導入案場" },
  { value: "6", label: "Industries Served", sub: "半導體 · 資料中心 · 製造業" },
  { value: "24/7", label: "Enterprise Support", sub: "專案窗口與工程支援" },
];

const industries = [
  { icon: Cpu, en: "Semiconductor", zh: "半導體與科技廠", desc: "Fab 與供應鏈廠區的弱電、光纖、系統整合與 AI 導入。" },
  { icon: Server, en: "Data Centers", zh: "資料中心", desc: "資料中心基礎建設、佈線、機櫃與運維系統整合。" },
  { icon: Factory, en: "Manufacturing", zh: "製造業", desc: "工廠 IT/OT 整合、報價成本、業務與生產流程數位化。" },
  { icon: Building2, en: "Commercial Buildings", zh: "商辦與智慧建築", desc: "弱電、監控、門禁、網路與能源監測系統整合。" },
  { icon: Leaf, en: "Energy & ESG", zh: "能源與 ESG", desc: "太陽光電、儲能、機電工程與能源管理平台。" },
  { icon: BrainCircuit, en: "Enterprise AI", zh: "企業 AI", desc: "為企業建置可落地的 AI 工作流、代理人與知識庫。" },
];

const engineeringServices = [
  { icon: Cable, en: "Structured Cabling", zh: "結構化佈線", desc: "Cat 6A / Cat 8 與資料中心等級佈線設計與施作。" },
  { icon: Waypoints, en: "Fiber Optic Installation", zh: "光纖建置", desc: "單模／多模光纖佈設、熔接與測試，涵蓋園區與跨建物骨幹。" },
  { icon: Zap, en: "Electrical Integration", zh: "電氣整合", desc: "配電、UPS、機櫃供電、接地與電力品質整合。" },
  { icon: Wrench, en: "Mechanical Coordination", zh: "機電協調", desc: "空調、消防、機電與工地介面協調，確保多專業同步交付。" },
  { icon: ClipboardCheck, en: "Project Management", zh: "專案管理", desc: "從設計審查、排程、風險控管到驗收交付的全程專案管理。" },
  { icon: Recycle, en: "Decommission Services", zh: "設備退役與遷移", desc: "機房與廠區設備退役、資產盤點、資料清除與環境復原。" },
];

const aiServices = [
  { icon: Workflow, en: "Workflow Automation", zh: "流程自動化", desc: "以 n8n、API 與資料串接重構跨系統流程，減少人工重工。" },
  { icon: Bot, en: "AI Agent", zh: "AI 代理人", desc: "客服、內部知識、業務、報價場景的專屬 AI 助理與代理人。" },
  { icon: Users, en: "CRM", zh: "客戶關係管理", desc: "客戶、商機、拜訪紀錄與 AI 週報整合的業務管理系統。" },
  { icon: Database, en: "ERP", zh: "企業資源規劃", desc: "報價、成本、專案、採購與財務資料的模組化整合。" },
  { icon: LineChart, en: "Business Intelligence", zh: "商業智慧", desc: "跨部門營運儀表板、KPI 追蹤與 AI 洞察報表。" },
  { icon: Sparkles, en: "Enterprise AI", zh: "企業 AI 導入", desc: "從流程盤點、資料治理到 AI 落地的完整導入服務。" },
];

const products = [
  { name: "Aegis CostFlow", tagline: "Engineering Quotation & Cost Analytics", desc: "工程報價、材料、人工、外包與毛利一體化管理，內建 AI 成本提醒。", icon: FileSpreadsheet, image: mockCostflow, to: "/costflow" as const },
  { name: "Aegis SalesOps", tagline: "Sales Management & AI Weekly Reports", desc: "整合 CRM、拜訪紀錄、LINE 回報與 AI 週報，讓業務管理即時透明。", icon: MessagesSquare, image: mockSalesops, to: "/salesops" as const },
  { name: "Aegis AI Launch", tagline: "Enterprise AI Adoption Service", desc: "從流程盤點、資料整理、AI 助理設計到自動化串接的完整服務。", icon: Network, image: mockAilaunch, to: "/ai-launch" as const },
];

const whyUs = [
  { icon: Wrench, en: "Engineering Experience", zh: "工程實務經驗", desc: "核心團隊具備能源、機電、弱電、光纖、資料中心等現場工程經驗。" },
  { icon: ClipboardCheck, en: "Professional Project Management", zh: "專業專案管理", desc: "以國際標準專案管理方法交付，從設計審查到驗收全流程掌控。" },
  { icon: Layers3, en: "Enterprise Integration", zh: "企業級系統整合", desc: "跨工程、IT、OT 與企業應用系統的整合能力，一站式落地。" },
  { icon: Clock, en: "Fast Response", zh: "快速回應", desc: "專屬窗口、清晰 SLA 與工程備援機制，確保專案關鍵時刻不掉線。" },
  { icon: Rocket, en: "Scalable Solutions", zh: "可擴展方案", desc: "模組化架構讓系統與服務可隨企業成長逐步擴充。" },
];

const projects = [
  { industry: "Semiconductor", zh: "半導體晶圓廠", scope: "廠區弱電與光纖骨幹整合", outcome: "跨廠房光纖骨幹重建與監控系統整合交付。", image: engineeringFiberPanel.url },
  { industry: "Data Center", zh: "大型資料中心", scope: "結構化佈線與機櫃供電", outcome: "資料中心 Cat 6A 佈線、機櫃供電與冷通道協調交付。", image: engineeringServerRack.url },
  { industry: "Enterprise Campus", zh: "企業園區", scope: "監控門禁與網路整合", outcome: "多棟建物監控、門禁與網路骨幹整合，統一管理平台。", image: engineeringSecurityCameras.url },
  { industry: "Manufacturing", zh: "電子製造業", scope: "IT/OT 網路與 AI 導入", desc: "outcome", outcome: "產線網路重整並導入 AI 報表與週報系統，縮短決策時間。", image: engineeringFiberTech.url },
];

function Home() {
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
                Engineering × AI × <br />
                <span className="text-[oklch(0.85_0.12_235)]">Digital Transformation</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                Enterprise-grade engineering integration and AI systems for semiconductor fabs, data centers, manufacturers and enterprise customers.
                宏鼎集成 — 工程集成、AI 系統整合與企業數位轉型的落地夥伴。
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-primary">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/engineering"
                  className="btn border border-white/30 bg-white/5 text-white hover:bg-white/10"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust metrics */}
        <section className="border-b border-border bg-background">
          <div className="container-x py-14 md:py-16">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label} className="border-l-2 border-primary pl-5">
                  <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{m.value}</div>
                  <div className="mt-3 text-sm font-semibold text-foreground">{m.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-24 md:py-28">
          <div className="container-x">
            <SectionHeader eyebrow="Industries" title="Industries We Serve" subtitle="服務產業" desc="從半導體與資料中心的工程現場，到製造業與商辦企業的 AI 系統整合，宏鼎集成為多元產業提供落地服務。" />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map(({ icon: Icon, en, zh, desc }) => (
                <div key={en} className="panel p-7 hover:border-primary/40 hover:shadow-lift transition-all">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded bg-ink text-ink-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg">{en}</h3>
                  <div className="text-xs text-muted-foreground tracking-widest mt-0.5 uppercase">{zh}</div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engineering Services */}
        <section className="py-24 md:py-28 bg-surface/40 border-y border-border">
          <div className="container-x">
            <SectionHeader eyebrow="Engineering" title="Engineering Services" subtitle="工程集成服務" desc="從佈線、光纖、電氣、機電協調到專案管理與設備退役，覆蓋工程集成完整生命週期。" />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {engineeringServices.map(({ icon: Icon, en, zh, desc }, i) => (
                <div key={en} className="panel p-7 group">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded bg-ink text-ink-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground tracking-widest">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg">{en}</h3>
                  <div className="text-xs text-muted-foreground tracking-widest mt-0.5 uppercase">{zh}</div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/engineering" className="btn btn-ghost">
                View Engineering Capabilities <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* AI Integration */}
        <section className="py-24 md:py-28">
          <div className="container-x">
            <SectionHeader eyebrow="AI Integration" title="AI System Integration" subtitle="AI 系統整合" desc="以流程盤點為起點，將自動化、AI 代理、CRM、ERP、BI 與企業 AI 導入串接為可落地的營運能力。" />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {aiServices.map(({ icon: Icon, en, zh, desc }) => (
                <div key={en} className="panel p-7">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded bg-primary/10 text-primary border border-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg">{en}</h3>
                  <div className="text-xs text-muted-foreground tracking-widest mt-0.5 uppercase">{zh}</div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/ai-integration" className="btn btn-ghost">
                Explore AI Integration <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Business Applications */}
        <section className="py-24 md:py-28 bg-surface/40 border-y border-border">
          <div className="container-x">
            <SectionHeader eyebrow="Products" title="Business Applications" subtitle="Aegis 企業應用" desc="宏鼎集成旗下模組化企業應用系列，協助企業從報價、業務到 AI 導入逐步建立自己的數位營運。" />
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {products.map(({ name, tagline, desc, icon: Icon, image, to }) => (
                <Link key={name} to={to} className="panel-lift flex flex-col group overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-ink">
                    <img
                      src={image}
                      alt={`${name} — ${tagline}`}
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
                    <div className="mt-1 text-sm font-medium text-foreground">{tagline}</div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>
                    <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
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
            <SectionHeader eyebrow="Why Aegis" title="Why Choose Us" subtitle="為什麼選擇宏鼎" desc="工程實務、專案管理、企業整合、快速回應與可擴展方案，五大優勢構成宏鼎集成的核心價值。" />
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
                    <h3 className="text-lg">{en}</h3>
                    <div className="text-xs text-muted-foreground tracking-widest mt-0.5 uppercase">{zh}</div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Experience */}
        <section className="py-24 md:py-28 bg-surface/40 border-y border-border">
          <div className="container-x">
            <SectionHeader eyebrow="Experience" title="Project Experience" subtitle="專案經驗" desc="以下為宏鼎集成團隊參與的代表性專案類型，客戶名稱依合約保密。" />
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {projects.map((p) => (
                <div key={p.industry + p.scope} className="panel overflow-hidden flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden bg-ink">
                    <img
                      src={p.image}
                      alt={`${p.industry} project`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-sm bg-white/95 px-2.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-foreground">
                      {p.industry}
                    </div>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="text-xs font-semibold tracking-widest text-primary uppercase">{p.zh}</div>
                    <h3 className="mt-2 text-lg">{p.scope}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              * Client names are confidential and shown as industry categories only.
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
                  <Handshake className="h-4 w-4" /> Let's Build Together
                </div>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">
                  Ready to integrate engineering and AI at enterprise scale?
                </h2>
                <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
                  預約與宏鼎集成的初步諮詢，我們將協助評估工程範圍、系統整合與 AI 導入路徑。
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn bg-white text-ink border-white hover:bg-white/90">
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/demo" className="btn border border-white/30 bg-white/5 text-white hover:bg-white/10">
                    Book a Consultation
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
  title,
  subtitle,
  desc,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  desc: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="eyebrow">
        <span className="dot" /> {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      <div className="mt-2 text-sm font-medium text-muted-foreground tracking-widest uppercase">{subtitle}</div>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

// silence unused import warnings for icons kept intentionally
void ShieldCheck;
