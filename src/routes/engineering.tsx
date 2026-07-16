import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import heroEngAsset from "@/assets/engineering-fiber-technician.webp.asset.json";
import serverRackAsset from "@/assets/engineering-server-rack.webp.asset.json";
import fiberPanelAsset from "@/assets/engineering-fiber-panel.webp.asset.json";
import camerasAsset from "@/assets/engineering-security-cameras.webp.asset.json";
const bannerEngineering = heroEngAsset.url;
import { ArrowRight, Cable, Camera, HardHat, Network, Radio, ServerCog } from "lucide-react";

import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L, useLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/engineering")({
  head: () => ({
    meta: [
      { title: "工程集成服務｜AEGIS POWER INTEGRATIONS｜Engineering Services" },
      { name: "description", content: "提供弱電與網路工程、光纖建置、資料中心基礎工程支援、監控與門禁系統與廠區資訊系統整合，服務台灣工程公司、製造業與科技廠供應鏈。Structured cabling, fiber, data center engineering, surveillance and facility integration." },
      { property: "og:title", content: "Engineering Services | AEGIS POWER INTEGRATIONS" },
      { property: "og:description", content: "Engineering integration, ELV, fiber, data center support and facility system integration." },
      { property: "og:url", content: `${SITE_URL}/engineering` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/engineering` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Engineering Integration",
          provider: {
            "@type": "Organization",
            name: "AEGIS POWER INTEGRATIONS",
            alternateName: "宏鼎集成股份有限公司",
            url: `${SITE_URL}/`,
          },
          areaServed: "TW",
          description: "Structured cabling, fiber, electrical integration, MEP coordination, data-center engineering support and access/surveillance system integration.",
        }),
      },
    ],
  }),
  component: Engineering,
});

type Bi = { zh: string; en: string };

const services: { icon: React.ComponentType<{ className?: string }>; t: Bi; d: Bi }[] = [
  { icon: Radio, t: { zh: "弱電與網路工程", en: "ELV & Network Engineering" }, d: { zh: "辦公室、廠區、營運據點的弱電佈線、網路建置與整體規劃。", en: "ELV cabling, networking and overall planning for offices, plants and operational sites." } },
  { icon: Cable, t: { zh: "光纖建置", en: "Fiber Optic Installation" }, d: { zh: "骨幹、樓層、跨棟光纖佈設與測試，符合企業營運品質要求。", en: "Backbone, floor and cross-building fiber deployment and testing to enterprise quality standards." } },
  { icon: ServerCog, t: { zh: "資料中心基礎工程支援", en: "Data Center Engineering" }, d: { zh: "機房、機櫃、配電、線路與基礎設備建置支援。", en: "Server rooms, racks, power distribution, cabling and infrastructure deployment support." } },
  { icon: Camera, t: { zh: "監控與門禁系統", en: "Surveillance & Access Control" }, d: { zh: "IP 監控、門禁、人員管制與安全管理系統整合。", en: "IP surveillance, access control, personnel management and security system integration." } },
  { icon: Network, t: { zh: "廠區資訊系統整合", en: "Facility System Integration" }, d: { zh: "跨系統、跨廠牌的設備與資訊整合，建立統一管理介面。", en: "Cross-system, multi-vendor device and data integration under a unified management interface." } },
  { icon: HardHat, t: { zh: "專案協調與協力廠商整合", en: "Project Coordination" }, d: { zh: "由 AEGIS 統籌專案進度、規格與協力廠商，降低業主管理負擔。", en: "AEGIS coordinates schedule, specs and subcontractors — reducing the owner's management overhead." } },
];

const suitableSites: Bi[] = [
  { zh: "辦公室與企業總部", en: "Offices & enterprise HQ" },
  { zh: "工廠與廠區", en: "Factories & industrial sites" },
  { zh: "資料中心", en: "Data centers" },
  { zh: "科技廠供應鏈", en: "Tech supply chains" },
  { zh: "倉儲與營運據點", en: "Warehouses & operational sites" },
  { zh: "需要弱電、光纖、監控、門禁與資訊整合的企業", en: "Any company needing ELV, fiber, surveillance, access control or IT integration" },
];

const features: { t: Bi; d: Bi }[] = [
  { t: { zh: "以現場需求為基礎，不做過度包裝", en: "Grounded in site realities, not over-engineered" }, d: { zh: "從業主實際使用情境與既有條件出發，提出可落地、可維運的工程規劃。", en: "Plans built from real usage and existing conditions — deployable and maintainable." } },
  { t: { zh: "可協調工程、系統與協力廠商", en: "Full-scope coordination of engineering, systems and subcontractors" }, d: { zh: "由 AEGIS 統籌整體進度與規格，降低業主與多家廠商溝通的負擔。", en: "AEGIS owns overall schedule and specifications, easing multi-vendor coordination for the client." } },
  { t: { zh: "重視規劃、施工、驗收與後續維運", en: "Planning, execution, acceptance and long-term ops" }, d: { zh: "從前期規劃到驗收與後續維護，建立可長期合作的工程交付品質。", en: "From planning through acceptance and operations — sustained delivery quality for long-term partnership." } },
  { t: { zh: "可結合 AI 系統與企業管理平台", en: "Combinable with AI systems and enterprise platforms" }, d: { zh: "工程資料可進一步串接 Aegis Business Apps 與 AI 系統，讓現場與管理流程連動。", en: "Engineering data can flow into Aegis Business Apps and AI systems, linking site operations with management." } },
];

function Engineering() {
  const { isEn } = useLang();
  const t = useT();
  const tr = (b: Bi) => (isEn ? b.en : b.zh);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow"><span className="dot" /> <L zh="工程集成" en="Engineering" /></span>
              <h1 className="mt-6 text-4xl md:text-5xl"><L zh="工程集成服務" en="Engineering Services" /></h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                <L
                  zh="我們以工程現場經驗為基礎，提供弱電、光纖、資料中心、監控與門禁等系統整合服務，協助企業建立穩定、安全、可長期維護的基礎建設。"
                  en="Grounded in field experience, we deliver ELV, fiber, data center, surveillance and access control integration — building stable, secure and sustainable infrastructure."
                />
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift">
                <img
                  src={bannerEngineering}
                  alt={t({ zh: "光纖與弱電工程施工情境", en: "Fiber and ELV engineering installation" })}
                  width={1600}
                  height={912}
                  className="w-full h-auto object-cover aspect-[16/10]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, t: ttl, d }) => (
              <div key={ttl.en} className="panel p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-ink-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold">{tr(ttl)}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tr(d)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Site visuals */}
        <section className="pb-24">
          <div className="container-x grid gap-5 md:grid-cols-3">
            {[
              { src: serverRackAsset.url, alt: { zh: "資料中心機櫃與網路設備", en: "Data center racks and network equipment" }, label: { zh: "資料中心 / 機房基礎建置", en: "Data Center / Server Room" } },
              { src: fiberPanelAsset.url, alt: { zh: "光纖配線與網路基礎設施", en: "Fiber distribution and network infrastructure" }, label: { zh: "光纖配線 / 弱電整合", en: "Fiber / ELV Integration" } },
              { src: camerasAsset.url, alt: { zh: "監控與門禁系統整合", en: "Surveillance and access control integration" }, label: { zh: "監控 / 門禁 / 廠區安全", en: "Surveillance / Access / Site Safety" } },
            ].map((it) => (
              <figure key={it.label.en} className="panel overflow-hidden">
                <div className="relative aspect-[4/3] bg-ink overflow-hidden">
                  <img src={it.src} alt={tr(it.alt)} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                </div>
                <figcaption className="p-5 text-sm font-semibold">{tr(it.label)}</figcaption>
              </figure>
            ))}
          </div>
        </section>


        <section className="pb-24">
          <div className="container-x">
            <div className="panel p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl"><L zh="服務流程" en="Service Process" /></h2>
              <div className="mt-6 grid gap-5 md:grid-cols-4">
                {[
                  { n: "01", t: { zh: "現場勘查", en: "Site Survey" }, d: { zh: "了解現場條件、既有系統與業主需求。", en: "Assess site conditions, existing systems and client needs." } },
                  { n: "02", t: { zh: "規劃與報價", en: "Planning & Quotation" }, d: { zh: "提出工程規劃、規格建議與透明報價。", en: "Deliver an engineering plan, spec recommendations and transparent pricing." } },
                  { n: "03", t: { zh: "施工與整合", en: "Execution & Integration" }, d: { zh: "依計畫進場施工並協調協力廠商。", en: "On-site execution with coordinated subcontractor management." } },
                  { n: "04", t: { zh: "驗收與維運", en: "Acceptance & Ops" }, d: { zh: "完工驗收並提供後續維護與優化建議。", en: "Acceptance handover with follow-up maintenance and optimization advice." } },
                ].map((s) => (
                  <div key={s.n}>
                    <span className="num-badge">{s.n}</span>
                    <h3 className="mt-3 text-base font-semibold">{tr(s.t)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{tr(s.d)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Suitable sites */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> <L zh="適合場域" en="Where We Work" /></span>
              <h2 className="mt-4 text-3xl md:text-4xl"><L zh="適合場域" en="Where We Work" /></h2>
              <p className="mt-3 text-muted-foreground">
                <L
                  zh="從辦公室到廠區、資料中心與營運據點，我們的工程能力可彈性配合不同產業與規模。"
                  en="From offices to plants, data centers and operational sites — our engineering scales across industries and sizes."
                />
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {suitableSites.map((s) => (
                <div key={s.en} className="panel p-5 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                  <span className="text-[15px] font-medium">{tr(s)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> <L zh="服務特色" en="What Sets Us Apart" /></span>
              <h2 className="mt-4 text-3xl md:text-4xl"><L zh="服務特色" en="What Sets Us Apart" /></h2>
              <p className="mt-3 text-muted-foreground">
                <L
                  zh="務實的工程思維，搭配 AEGIS 的系統與 AI 能力，讓工程不只完工，也能延伸到後續管理。"
                  en="Pragmatic engineering combined with our system and AI capabilities — projects don't just finish, they extend into ongoing operations."
                />
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {features.map((f, i) => (
                <div key={f.t.en} className="panel p-7 flex gap-5">
                  <div className="num-badge shrink-0">0{i + 1}</div>
                  <div>
                    <h3 className="text-lg">{tr(f.t)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tr(f.d)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl">
                <L zh="有工程整合需求嗎？" en="Have an engineering integration need?" />
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                <L
                  zh="歡迎與我們聯繫，由顧問依您的場域與規模提供初步建議。"
                  en="Get in touch — our consultants will give an initial assessment based on your site and scale."
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
