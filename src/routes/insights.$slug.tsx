import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { INSIGHTS, CATEGORY_LABEL, getInsight } from "@/lib/insights";
import { L, useLang } from "@/lib/i18n";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const insight = getInsight(params.slug);
    if (!insight) throw notFound();
    return { insight };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    }
    const { insight } = loaderData;
    const title = `${insight.title.zh}｜${insight.title.en}｜AEGIS POWER INTEGRATIONS`;
    return {
      meta: [
        { title },
        { name: "description", content: `${insight.summary.zh} ${insight.summary.en}` },
        { property: "og:title", content: `${insight.title.en} | AEGIS POWER INTEGRATIONS` },
        { property: "og:description", content: insight.summary.en },
        { property: "og:url", content: `${SITE_URL}/insights/${insight.slug}` },
        { property: "og:type", content: "article" },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/insights/${insight.slug}` }],
    };
  },
  component: InsightDetail,
  notFoundComponent: InsightNotFound,
});

function InsightNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="container-x py-24 text-center">
        <h1 className="text-3xl font-semibold text-foreground">
          <L zh="找不到此文章" en="Article not found" />
        </h1>
        <Link to="/insights" className="btn btn-outline mt-6">
          <L zh="返回洞見與案例" en="Back to Insights" />
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function InsightDetail() {
  const { insight } = Route.useLoaderData();
  const { isEn } = useLang();
  const tr = (b: { zh: string; en: string }) => (isEn ? b.en : b.zh);

  const related = INSIGHTS.filter((i) => i.slug !== insight.slug && i.category === insight.category).slice(0, 3);
  const isCase = insight.category === "case-study";

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        {/* Header */}
        <section className="border-b border-border bg-surface/50">
          <div className="container-x py-20 md:py-24 max-w-4xl">
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              <Link to="/insights" className="hover:text-foreground">
                <L zh="洞見與案例" en="Insights" />
              </Link>{" "}
              · {tr(CATEGORY_LABEL[insight.category])}
              {insight.industryTag && <> · {tr(insight.industryTag)}</>}
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              {tr(insight.title)}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {tr(insight.summary)}
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              {insight.readMinutes} <L zh="分鐘閱讀" en="min read" />
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="border-b border-border">
          <div className="container-x py-16 max-w-4xl">
            {isCase ? (
              <div className="space-y-12">
                <CaseBlock label={{ zh: "產業", en: "Industry" }} content={insight.industryTag} tr={tr} />
                <CaseBlock label={{ zh: "挑戰", en: "Challenge" }} content={insight.challenge} tr={tr} />
                <CaseBlock label={{ zh: "解決方案", en: "Solution" }} content={insight.solution} tr={tr} />
                {insight.implementation && (
                  <ListBlock
                    label={{ zh: "導入方式", en: "Implementation" }}
                    items={insight.implementation}
                    tr={tr}
                  />
                )}
                {insight.outcome && (
                  <ListBlock
                    label={{ zh: "業務成效", en: "Business Outcome" }}
                    items={insight.outcome}
                    tr={tr}
                  />
                )}
                {insight.relatedServices && insight.relatedServices.length > 0 && (
                  <div>
                    <SectionLabel label={{ zh: "相關服務", en: "Related Services" }} />
                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      {insight.relatedServices.map((s) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          className="group flex items-center justify-between rounded-lg border border-border bg-card p-5 hover:border-foreground/40 transition"
                        >
                          <span className="font-medium text-foreground">{tr(s.label)}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-10">
                {insight.sections?.map((s, i) => (
                  <div key={i}>
                    <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                      {tr(s.heading)}
                    </h2>
                    <p className="mt-4 text-foreground/85 leading-relaxed">{tr(s.body)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-border bg-foreground text-background">
          <div className="container-x py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                <L zh="想討論類似的挑戰嗎？" en="Facing a similar challenge?" />
              </h2>
              <p className="mt-2 text-background/80 max-w-2xl">
                <L
                  zh="AEGIS 團隊可以協助貴公司從最有價值的流程開始，制定務實的導入路徑。"
                  en="The AEGIS team can help you start from the highest-value workflow with a pragmatic roadmap."
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

        {/* Related */}
        {related.length > 0 && (
          <section className="border-b border-border">
            <div className="container-x py-16">
              <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                <L zh="延伸閱讀" en="Related reading" />
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/insights/$slug"
                    params={{ slug: r.slug }}
                    className="group rounded-lg border border-border bg-card p-6 hover:border-foreground/40 transition"
                  >
                    <div className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                      {tr(CATEGORY_LABEL[r.category])}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-foreground leading-snug">
                      {tr(r.title)}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function SectionLabel({ label }: { label: { zh: string; en: string } }) {
  const { isEn } = useLang();
  return (
    <div className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
      {isEn ? label.en : label.zh}
    </div>
  );
}

function CaseBlock({
  label,
  content,
  tr,
}: {
  label: { zh: string; en: string };
  content?: { zh: string; en: string };
  tr: (b: { zh: string; en: string }) => string;
}) {
  if (!content) return null;
  return (
    <div>
      <SectionLabel label={label} />
      <p className="mt-3 text-foreground/85 leading-relaxed">{tr(content)}</p>
    </div>
  );
}

function ListBlock({
  label,
  items,
  tr,
}: {
  label: { zh: string; en: string };
  items: { zh: string; en: string }[];
  tr: (b: { zh: string; en: string }) => string;
}) {
  return (
    <div>
      <SectionLabel label={label} />
      <ul className="mt-4 space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3 text-foreground/90">
            <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-foreground" />
            <span>{tr(it)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
