import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import heroMain from "@/assets/hero-main.jpg";
import bannerEngineering from "@/assets/banner-engineering.jpg";
import bannerAi from "@/assets/banner-ai.jpg";
import bannerApps from "@/assets/banner-apps.jpg";
import mockCostflow from "@/assets/mock-costflow.jpg";
import mockSalesops from "@/assets/mock-salesops.jpg";
import mockAilaunch from "@/assets/mock-ailaunch.jpg";
import {
  ArrowRight,
  Cable,
  BrainCircuit,
  Boxes,
  Workflow,
  Layers3,
  Sparkles,
  FileSpreadsheet,
  MessagesSquare,
  Network,
  HardHat,
  Factory,
  Cpu,
  Server,
  Briefcase,
  Building2,
  ShieldCheck,
  Wrench,
  GitBranch,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "宏鼎集成｜AI 時代的工程與企業系統整合夥伴" },
      { name: "description", content: "宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd. 提供工程集成、AI 系統整合與 Aegis Business Apps 模組化企業系統，協助工程公司、製造業、科技廠供應鏈與中小企業建立可落地的數位化營運能力。" },
      { property: "og:title", content: "宏鼎集成｜AI 時代的工程與企業系統整合夥伴" },
      { property: "og:description", content: "結合工程現場經驗、企業流程系統與 AI 自動化技術，從報價、成本、專案管理到營運決策一站式整合。" },
      { property: "og:url", content: "https://aegis-sparkle-launch.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://aegis-sparkle-launch.lovable.app/" }],
  }),
  component: Home,
});

const heroServices = [
  { icon: Cable, title: "工程集成服務", desc: "半導體與科技廠供應鏈、資料中心、弱電、光纖、監控、門禁與廠區系統整合。", to: "/engineering" as const },
  { icon: BrainCircuit, title: "AI 系統整合", desc: "協助企業進行流程盤點、資料整理、AI 助理設計、自動化串接與管理儀表板建置。", to: "/ai-integration" as const },
  { icon: Boxes, title: "Aegis Business Apps", desc: "宏鼎集成旗下模組化企業系統產品線，協助企業快速建立報價、成本、CRM、業務管理與營運儀表板。", to: "/costflow" as const },
];

const painPoints = [
  { icon: FileSpreadsheet, title: "報價與成本分散", desc: "報價、材料、人工、外包、毛利資料分散在 Excel、LINE 與個人經驗中，難以即時掌握。" },
  { icon: Workflow, title: "工程現場與管理系統斷線", desc: "現場進度、請款、成本、人力與客戶需求沒有被整合，導致管理者難以追蹤。" },
  { icon: Layers3, title: "傳統系統太重、導入太慢", desc: "中小企業需要的是可以快速上線、逐步擴充、貼近實際流程的輕量化企業管理系統。" },
  { icon: Sparkles, title: "AI 工具很多，但沒有進入流程", desc: "企業真正需要的不是單一 AI 工具，而是把 AI 放進報價、業務、專案、週報與決策流程中。" },
];

const capabilities = [
  { icon: Cable, title: "工程集成服務", image: bannerEngineering, items: ["弱電與網路工程", "光纖建置", "監控與門禁系統", "資料中心基礎工程支援", "廠區資訊系統整合", "工程專案協調與協力廠商整合"] },
  { icon: BrainCircuit, title: "AI 系統整合", image: bannerAi, items: ["企業流程訪談與盤點", "AI 助理與內部知識庫", "LINE / Google Workspace / API / n8n 串接", "自動化週報與管理儀表板", "客製化企業系統開發"] },
  { icon: Boxes, title: "Aegis Business Apps", image: bannerApps, items: ["Aegis CostFlow：工程報價與成本分析平台", "Aegis SalesOps：業務管理與 AI 週報系統", "Aegis AI Launch：企業 AI 導入與流程自動化服務", "可依產業需求擴充模組"] },
];

const products = [
  { name: "Aegis CostFlow", tagline: "工程報價與成本分析平台", desc: "協助工程公司整理材料、人工、外包、報價版本、專案毛利與 AI 成本提醒，降低 Excel 重工，提高報價速度與成本掌握度。", icon: FileSpreadsheet, image: mockCostflow, to: "/costflow" as const },
  { name: "Aegis SalesOps", tagline: "業務管理與 AI 週報系統", desc: "整合客戶拜訪、LINE 回報、語音日誌、CRM、主管週報與客戶進度追蹤，讓業務管理更即時、更透明。", icon: MessagesSquare, image: mockSalesops, to: "/salesops" as const },
  { name: "Aegis AI Launch", tagline: "企業 AI 導入與流程自動化服務", desc: "協助企業從流程盤點、資料整理、AI 助理設計到自動化串接，真正把 AI 導入日常工作。", icon: Network, image: mockAilaunch, to: "/ai-launch" as const },
];

const audiences = [
  { icon: HardHat, label: "工程公司" },
  { icon: Factory, label: "製造業" },
  { icon: Cpu, label: "半導體與科技廠供應鏈" },
  { icon: Server, label: "資料中心與弱電工程團隊" },
  { icon: Briefcase, label: "會計師、顧問與企業服務通路" },
  { icon: Building2, label: "想導入 AI 與輕量化企業管理系統的中小企業" },
];

const whyUs = [
  { icon: Wrench, title: "懂工程現場，不只是寫系統", desc: "團隊長期接觸弱電、光纖、監控與資料中心專案，理解現場的真實作業節奏。" },
  { icon: ShieldCheck, title: "懂中小企業流程，不做過度複雜的系統", desc: "聚焦最關鍵的報價、成本、業務與專案流程，先解決真正會痛的問題。" },
  { icon: GitBranch, title: "顧問、工程、系統、AI 一站式整合", desc: "從流程盤點、工程協調到系統與 AI 導入，由同一團隊負責，降低溝通成本。" },
  { icon: Layers3, title: "以模組化方式導入，降低成本與時間", desc: "分階段上線，先讓核心流程跑起來，再依企業成熟度擴充模組。" },
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-surface/30">
          <div className="container-x py-16 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <span className="eyebrow"><span className="dot" /> Aegis Power Integrations Co., Ltd.</span>
                <div className="mt-5 text-sm md:text-base font-semibold tracking-wide text-foreground/80">
                  宏鼎集成股份有限公司
                </div>
                <h1 className="mt-3 text-4xl md:text-5xl xl:text-6xl leading-[1.1]">
                  宏鼎集成
                  <span className="text-muted-foreground"> ｜ </span>
                  <br className="hidden md:block" />
                  AI 時代的
                  <span className="relative inline-block">
                    <span className="relative z-10">工程與企業系統</span>
                    <span className="absolute inset-x-0 -bottom-1 h-3 -z-0 bg-gold/70 rounded-sm" />
                  </span>
                  整合夥伴
                </h1>
                <p className="mt-7 text-lg text-muted-foreground leading-relaxed">
                  結合工程現場經驗、企業流程系統與 AI 自動化技術，協助工程公司、製造業、科技廠供應鏈與中小企業，
                  從現場工程、報價成本、專案管理到營運決策，建立可落地、可管理、可擴充的數位化能力。
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/demo" className="btn btn-primary">預約諮詢 <ArrowRight className="h-4 w-4" /></Link>
                  <Link to="/costflow" className="btn btn-ghost">了解 Aegis 產品線</Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl" />
                <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift">
                  <img
                    src={heroMain}
                    alt="工程集成、AI 系統整合與企業管理 Dashboard 視覺"
                    width={1600}
                    height={1200}
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {heroServices.map(({ icon: Icon, title, desc, to }) => (
                <Link key={title} to={to} className="panel p-7 hover:shadow-lift transition-shadow group">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-ink-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
                    了解更多 <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pain points */}
        <section className="py-20 bg-surface/40 border-y border-border">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> Challenges</span>
              <h2 className="mt-4 text-3xl md:text-4xl">我們協助企業解決營運流程斷裂的問題</h2>
              <p className="mt-3 text-muted-foreground">
                從報價、成本到 AI 導入，宏鼎集成聚焦中小企業與工程公司最常見的四個營運斷點。
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {painPoints.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="panel p-7">
                  <div className="flex items-start gap-4">
                    <div className="num-badge shrink-0">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-lg">{title}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> Capabilities</span>
              <h2 className="mt-4 text-3xl md:text-4xl">三大服務能力</h2>
              <p className="mt-3 text-muted-foreground">
                工程集成、AI 系統整合與模組化企業系統，三條主軸覆蓋企業數位化的核心需求。
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {capabilities.map(({ icon: Icon, title, image, items }) => (
                <div key={title} className="panel flex flex-col overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-ink">
                    <img src={image} alt={`${title} 視覺`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute left-5 bottom-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-ink-foreground shadow-lift">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="text-xl">{title}</h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                      {items.map((it) => (
                        <li key={it} className="flex gap-2 leading-relaxed">
                          <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-20 bg-surface/40 border-y border-border">
          <div className="container-x">
            <div className="max-w-3xl">
              <span className="eyebrow"><span className="dot" /> Products</span>
              <h2 className="mt-4 text-3xl md:text-4xl">宏鼎集成旗下 Aegis Business Apps 產品線</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                從工程報價、業務管理到企業 AI 導入，協助企業以模組化方式逐步建立自己的數位營運系統。
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {products.map(({ name, tagline, desc, icon: Icon, image, to }) => (
                <Link key={name} to={to} className="panel-lift flex flex-col group overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-ink">
                    <img src={image} alt={`${name} 產品介面示意`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold text-gold-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="tag">Product</span>
                    </div>
                    <h3 className="mt-5 text-xl">{name}</h3>
                    <div className="mt-1 text-sm font-medium text-foreground">{tagline}</div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>
                    <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                      產品詳情 <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Audiences */}
        <section className="py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> Who we serve</span>
              <h2 className="mt-4 text-3xl md:text-4xl">適合合作的企業</h2>
              <p className="mt-3 text-muted-foreground">
                從現場工程到企業總部，宏鼎集成的服務涵蓋以下領域。
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map(({ icon: Icon, label }) => (
                <div key={label} className="panel p-5 flex items-center gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 border border-border">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="text-[15px] font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-20 bg-surface/40 border-y border-border">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> Why us</span>
              <h2 className="mt-4 text-3xl md:text-4xl">為什麼選擇宏鼎集成</h2>
              <p className="mt-3 text-muted-foreground">
                結合工程實務、系統開發與 AI 導入經驗，提供務實、可落地的整合服務。
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {whyUs.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="panel p-7 flex gap-5">
                  <div className="shrink-0">
                    <div className="text-xs font-mono tracking-widest text-muted-foreground">0{i + 1}</div>
                    <div className="mt-2 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-ink-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-14 text-center">
              <h2 className="text-2xl md:text-3xl">想讓你的工程、業務與營運流程開始系統化與 AI 化嗎？</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                從一個流程開始，宏鼎集成協助你盤點、設計、導入，逐步建立企業自己的數位營運系統。
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/demo" className="btn btn-primary">預約初步諮詢 <ArrowRight className="h-4 w-4" /></Link>
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
