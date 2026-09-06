import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/lib/nav";
import { ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { L, useLang } from "@/lib/i18n";
import { SITE_URL, alternates } from "@/lib/seo";
import {
  PUBLISHED_REAL_PROJECTS,
  OWNERSHIP_BADGE,
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
    links: alternates(`${SITE_URL}/projects`),
  }),
  component: ProjectsPage,
});

export function ProjectsPage() {
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
              items={[{ label: isEn ? "Project Experience" : "專案經驗" }]}
            />

            <h1 className="mt-6 text-4xl md:text-5xl text-balance">
              <L zh="專案經驗" en="Project Experience" />
            </h1>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed text-pretty">
              <L
                zh="以下為核心團隊過往參與的工程經驗，呈現實際施工範圍、現場協作與交付紀錄。"
                en="The following describes engineering work our core team has previously taken part in — actual scope, on-site coordination and delivery records."
              />
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              <L
                zh="本頁為核心團隊成員過往參與經驗，並非宏鼎集成股份有限公司直接承攬實績；案例以匿名方式呈現。"
                en="This page describes prior participation by core team members, not projects contracted directly by Aegis Power Integrations Co., Ltd.; cases are presented anonymously."
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

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
                        <L zh="專案背景" en="Background" />
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed">{tr(p.background)}</p>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
                        <L zh="參與範圍" en="Participation scope" />
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed">{tr(p.scope)}</p>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {tr(p.role)}
                      </p>
                    </div>
                  </div>

                  {p.work.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold">
                        <L zh="現場工作" en="On-site work" />
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
                        <L zh="交付紀錄" en="Delivery records" />
                      </h3>
                      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                        {p.deliverables.map((d) => (
                          <li key={d.en}>· {tr(d)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

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
