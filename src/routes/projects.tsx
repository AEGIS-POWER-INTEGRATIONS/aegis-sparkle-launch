import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { L, useLang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import {
  PUBLISHED_REAL_PROJECTS,
  OWNERSHIP_BADGE,
  OWNERSHIP_DISCLOSURE,
  type Bi,
} from "@/lib/real-projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "專案經驗｜宏鼎集成團隊實際參與的工程專案" },
      {
        name: "description",
        content:
          "宏鼎集成核心團隊實際參與的工程專案經驗，包含先進封裝廠外管線工程與大型資料中心光纖工程。以匿名案名呈現，不揭露客戶名稱。",
      },
      { property: "og:title", content: "專案經驗｜宏鼎集成" },
      {
        property: "og:description",
        content: "核心團隊實際參與的工程專案經驗，與產業情境示例清楚區分。",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/projects` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "專案經驗｜宏鼎集成" },
      {
        name: "twitter:description",
        content: "核心團隊實際參與的工程專案經驗，與產業情境示例清楚區分。",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/projects` }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { isEn } = useLang();
  const tr = (b: Bi) => (isEn ? b.en : b.zh);
  const projects = PUBLISHED_REAL_PROJECTS;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-x max-w-4xl">
            <Breadcrumbs
              items={[{ label: { zh: "專案經驗", en: "Project Experience" }, to: "/projects" }]}
            />
            <h1 className="mt-6 text-4xl md:text-5xl text-balance">
              <L zh="專案經驗" en="Project Experience" />
            </h1>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed text-pretty">
              <L
                zh="本頁列出核心團隊實際參與的工程專案。所有案例以匿名案名呈現，僅描述有依據的參與角色與施工範圍；期間、數量與金額等缺乏可公開資料者一律省略。"
                en="Projects our core team has actually worked on. Every case is presented anonymously and describes only the participation role and scope we can substantiate; duration, quantities and contract values are omitted where no releasable data exists."
              />
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              <L
                zh={
                  <>
                    產業情境示例（非實際客戶案例）另列於{" "}
                    <Link to="/insights" className="underline underline-offset-4">
                      應用情境與導入觀點
                    </Link>
                    。
                  </>
                }
                en={
                  <>
                    Illustrative industry scenarios (not client case studies) are kept separately under{" "}
                    <Link to="/insights" className="underline underline-offset-4">
                      Insights &amp; Scenarios
                    </Link>
                    .
                  </>
                }
              />
            </p>
          </div>
        </section>

        <section className="py-14 md:py-16">
          <div className="container-x max-w-4xl grid gap-6">
            {projects.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                <L
                  zh="目前尚無可公開的專案資料。"
                  en="No publicly releasable project records at this time."
                />
              </p>
            ) : (
              projects.map((p) => (
                <article key={p.slug} className="panel-lift p-8 md:p-10">
                  <span className="inline-flex items-center rounded-sm border border-border px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                    {tr(OWNERSHIP_BADGE[p.ownership])}
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold">{tr(p.industry)}</h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {tr(p.background)}
                  </p>

                  <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                        <L zh="施工範圍" en="Scope" />
                      </dt>
                      <dd className="mt-1 text-sm">{tr(p.scope)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                        <L zh="參與角色" en="Role" />
                      </dt>
                      <dd className="mt-1 text-sm">{tr(p.role)}</dd>
                    </div>
                  </dl>

                  {p.work.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold">
                        <L zh="工項內容" en="Work performed" />
                      </h3>
                      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                        {p.work.map((w) => (
                          <li key={w.en}>· {tr(w)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {p.deliverables.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold">
                        <L zh="交付成果" en="Deliverables" />
                      </h3>
                      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                        {p.deliverables.map((d) => (
                          <li key={d.en}>· {tr(d)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="mt-6 border-t border-border/60 pt-4 text-xs text-muted-foreground leading-relaxed">
                    {tr(OWNERSHIP_DISCLOSURE[p.ownership])} {tr(p.confidentiality)}
                  </p>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x max-w-4xl">
            <Link to="/contact" search={{ inquiry: "engineering" }} className="btn btn-primary">
              <L zh="洽詢工程合作" en="Discuss an Engineering Project" />{" "}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
