import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { INDUSTRIES, getIndustry } from "@/lib/industries";
import { L, useLang } from "@/lib/i18n";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Industry not found" }, { name: "robots", content: "noindex" }] };
    }
    const { industry } = loaderData;
    const title = `${industry.name.zh}｜${industry.name.en}｜AEGIS POWER INTEGRATIONS`;
    return {
      meta: [
        { title },
        { name: "description", content: `${industry.tagline.zh} ${industry.tagline.en}` },
        { property: "og:title", content: `${industry.name.en} | AEGIS POWER INTEGRATIONS` },
        { property: "og:description", content: industry.tagline.en },
        { property: "og:url", content: `${SITE_URL}/industries/${industry.slug}` },
        { property: "og:type", content: "website" },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/industries/${industry.slug}` }],
    };
  },
  component: IndustryDetail,
  notFoundComponent: IndustryNotFound,
});

function IndustryNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="container-x py-24 text-center">
        <h1 className="text-3xl font-semibold text-foreground">
          <L zh="找不到此產業頁面" en="Industry not found" />
        </h1>
        <Link to="/industries" className="btn btn-outline mt-6">
          <L zh="返回產業解決方案" en="Back to Industry Solutions" />
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function IndustryDetail() {
  const { industry } = Route.useLoaderData();
  const { isEn } = useLang();
  const tr = (b: { zh: string; en: string }) => (isEn ? b.en : b.zh);

  const others = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="border-b border-border bg-surface/50">
          <div className="container-x py-20 md:py-24">
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              <L zh="產業解決方案" en="Industry Solutions" /> ·{" "}
              <Link to="/industries" className="hover:text-foreground">
                <L zh="全部產業" en="All industries" />
              </Link>
            </div>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              {tr(industry.name)}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {tr(industry.tagline)}
            </p>
            <p className="mt-6 text-base text-foreground/80 max-w-3xl leading-relaxed">
              {tr(industry.hero)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                <L zh="聯絡我們" en="Contact Us" />
              </Link>
              <Link to="/demo" className="btn btn-outline">
                <L zh="預約諮詢" en="Book Consultation" />
              </Link>
            </div>
          </div>
        </section>

        {/* Challenges + Pain points */}
        <Section
          title={{ zh: "產業挑戰", en: "Industry Challenges" }}
          items={industry.challenges}
        />
        <Section
          title={{ zh: "典型流程痛點", en: "Typical Workflow Pain Points" }}
          items={industry.painPoints}
          alt
        />

        {/* Opportunities */}
        <section className="border-t border-border">
          <div className="container-x py-20 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                <L zh="AI 導入機會" en="AI Opportunities" />
              </h2>
              <ul className="mt-6 space-y-3">
                {industry.aiOpportunities.map((o, i) => (
                  <li key={i} className="flex gap-3 text-foreground/90">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-foreground" />
                    <span>{tr(o)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                <L zh="工程整合機會" en="Engineering Integration Opportunities" />
              </h2>
              <ul className="mt-6 space-y-3">
                {industry.engineeringOpportunities.map((o, i) => (
                  <li key={i} className="flex gap-3 text-foreground/90">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-foreground" />
                    <span>{tr(o)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="border-t border-border bg-surface/50">
          <div className="container-x py-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              <L zh="建議導入路徑" en="Recommended Implementation Roadmap" />
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {industry.roadmap.map((r, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-6">
                  <div className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{tr(r.phase)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tr(r.detail)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="border-t border-border">
          <div className="container-x py-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              <L zh="相關 AEGIS 服務" en="Related AEGIS Services" />
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {industry.relatedServices.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="group flex items-center justify-between rounded-lg border border-border bg-card p-6 hover:border-foreground/40 transition"
                >
                  <span className="font-medium text-foreground">{tr(s.label)}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-foreground text-background">
          <div className="container-x py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                <L zh="準備好開始了嗎？" en="Ready to get started?" />
              </h2>
              <p className="mt-2 text-background/80 max-w-2xl">
                <L
                  zh="與 AEGIS 團隊討論貴公司的工程與 AI 導入需求，我們會提供務實可行的下一步。"
                  en="Talk to the AEGIS team about your engineering and AI needs — we'll propose a pragmatic next step."
                />
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/contact" className="btn btn-primary bg-background text-foreground hover:bg-background/90">
                <L zh="聯絡我們" en="Contact Us" />
              </Link>
              <Link to="/demo" className="btn btn-outline border-background/40 text-background hover:bg-background/10">
                <L zh="預約諮詢" en="Book Consultation" />
              </Link>
            </div>
          </div>
        </section>

        {/* Other industries */}
        <section className="border-t border-border">
          <div className="container-x py-20">
            <h2 className="text-2xl font-semibold text-foreground tracking-tight">
              <L zh="探索其他產業" en="Explore other industries" />
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to="/industries/$slug"
                  params={{ slug: o.slug }}
                  className="group rounded-lg border border-border bg-card p-6 hover:border-foreground/40 transition"
                >
                  <div className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                    <L zh="產業" en="Industry" />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{tr(o.name)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {tr(o.tagline)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({
  title,
  items,
  alt,
}: {
  title: { zh: string; en: string };
  items: { zh: string; en: string }[];
  alt?: boolean;
}) {
  const { isEn } = useLang();
  const tr = (b: { zh: string; en: string }) => (isEn ? b.en : b.zh);
  return (
    <section className={`border-t border-border ${alt ? "bg-surface/50" : ""}`}>
      <div className="container-x py-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
          {tr(title)}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((it, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6">
              <p className="text-foreground/90 leading-relaxed">{tr(it)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
