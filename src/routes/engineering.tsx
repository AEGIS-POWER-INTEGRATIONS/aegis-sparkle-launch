import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import heroEngAsset from "@/assets/engineering-fiber-technician.webp.asset.json";
import serverRackAsset from "@/assets/engineering-server-rack.webp.asset.json";
import fiberPanelAsset from "@/assets/engineering-fiber-panel.webp.asset.json";
import camerasAsset from "@/assets/engineering-security-cameras.webp.asset.json";
const bannerEngineering = heroEngAsset.url;
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
          <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow"><span className="dot" /> 工程集成</span>
              <h1 className="mt-6 text-4xl md:text-5xl">工程集成服務</h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                宏鼎集成以工程現場經驗為基礎，提供弱電、光纖、資料中心、監控與門禁等系統整合服務，協助企業建立穩定、安全、可長期維護的基礎建設。
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift">
                <img
                  src={bannerEngineering}
                  alt="光纖與弱電工程施工情境"
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

        {/* 工程現場視覺 */}
        <section className="pb-24">
          <div className="container-x grid gap-5 md:grid-cols-3">
            {[
              { src: serverRackAsset.url, alt: "資料中心機櫃與網路設備", label: "資料中心 / 機房基礎建置" },
              { src: fiberPanelAsset.url, alt: "光纖配線與網路基礎設施", label: "光纖配線 / 弱電整合" },
              { src: camerasAsset.url, alt: "監控與門禁系統整合", label: "監控 / 門禁 / 廠區安全" },
            ].map((it) => (
              <figure key={it.label} className="panel overflow-hidden">
                <div className="relative aspect-[4/3] bg-ink overflow-hidden">
                  <img src={it.src} alt={it.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                </div>
                <figcaption className="p-5 text-sm font-semibold">{it.label}</figcaption>
              </figure>
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

        {/* 適合場域 */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 適合場域</span>
              <h2 className="mt-4 text-3xl md:text-4xl">適合場域</h2>
              <p className="mt-3 text-muted-foreground">
                從辦公室到廠區、資料中心與營運據點，宏鼎集成的工程能力可彈性配合不同產業與規模。
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "辦公室與企業總部",
                "工廠與廠區",
                "資料中心",
                "科技廠供應鏈",
                "倉儲與營運據點",
                "需要弱電、光纖、監控、門禁與資訊整合的企業",
              ].map((s) => (
                <div key={s} className="panel p-5 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                  <span className="text-[15px] font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 服務特色 */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 服務特色</span>
              <h2 className="mt-4 text-3xl md:text-4xl">服務特色</h2>
              <p className="mt-3 text-muted-foreground">
                務實的工程思維，搭配宏鼎集成的系統與 AI 能力，讓工程不只完工，也能延伸到後續管理。
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {[
                { t: "以現場需求為基礎，不做過度包裝", d: "從業主實際使用情境與既有條件出發，提出可落地、可維運的工程規劃。" },
                { t: "可協調工程、系統與協力廠商", d: "由宏鼎統籌整體進度與規格，降低業主與多家廠商溝通的負擔。" },
                { t: "重視規劃、施工、驗收與後續維運", d: "從前期規劃到驗收與後續維護，建立可長期合作的工程交付品質。" },
                { t: "可結合 AI 系統與企業管理平台", d: "工程資料可進一步串接 Aegis Business Apps 與 AI 系統，讓現場與管理流程連動。" },
              ].map((f, i) => (
                <div key={f.t} className="panel p-7 flex gap-5">
                  <div className="num-badge shrink-0">0{i + 1}</div>
                  <div>
                    <h3 className="text-lg">{f.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
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
