import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Cpu, Factory, HardHat, Leaf, ServerCog, Sprout } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { INDUSTRIES } from "@/lib/industries";
import { L, useLang } from "@/lib/i18n";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  semiconductor: Cpu,
  "data-centers": ServerCog,
  "epc-engineering": HardHat,
  manufacturing: Factory,
  "commercial-buildings": Building2,
  "energy-esg": Leaf,
  "sme-digital": Sprout,
};

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "產業解決方案｜Industry Solutions｜AEGIS POWER INTEGRATIONS" },
      { name: "description", content: "為半導體、資料中心、EPC 統包、製造業、商業建築、能源與 ESG 及中小企業提供工程整合與 AI 導入解決方案。Industry solutions across semiconductor, data centers, EPC, manufacturing, commercial buildings, energy & ESG and SMEs." },
      { property: "og:title", content: "Industry Solutions | AEGIS POWER INTEGRATIONS" },
      { property: "og:description", content: "Engineering integration and AI solutions tailored by industry." },
      { property: "og:url", content: `${SITE_URL}/industries` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/industries` }],
  }),
  component: IndustriesHub,
});

function IndustriesHub() {
  const { isEn } = useLang();
  const tr = (b: { zh: string; en: string }) => (isEn ? b.en : b.zh);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="container-x py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
            <L zh="產業解決方案" en="Industry Solutions" />
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            <L zh="為每個產業量身打造的整合方案" en="Integrated solutions built for each industry" />
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            <L
              zh="AEGIS 結合工程整合與 AI 系統導入的雙重能力，為半導體、資料中心、EPC 統包、製造業、商業建築、能源與 ESG 以及中小企業提供可落地的解決方案。"
              en="AEGIS combines engineering integration with AI system implementation to deliver landable solutions for semiconductor, data centers, EPC, manufacturing, commercial buildings, energy & ESG and SMEs."
            />
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.slug] ?? Cpu;
            return (
              <Link
                key={ind.slug}
                to="/industries/$slug"
                params={{ slug: ind.slug }}
                className="group flex flex-col justify-between rounded-lg border border-border bg-card p-6 transition hover:border-foreground/40 hover:shadow-[var(--shadow-card)]"
              >
                <div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-surface text-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                    {tr(ind.name)}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {tr(ind.tagline)}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <L zh="了解更多" en="Learn more" />
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
