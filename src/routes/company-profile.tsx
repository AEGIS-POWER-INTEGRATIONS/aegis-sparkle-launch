import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { ArrowRight } from "lucide-react";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L, useLang } from "@/lib/i18n";
import { COMPANY_PROFILE, SITE } from "@/lib/site-config";

export const Route = createFileRoute("/company-profile")({
  head: () => ({
    meta: [
      { title: "宏鼎集成股份有限公司｜公司簡介與企業資訊" },
      {
        name: "description",
        content:
          "宏鼎集成股份有限公司（AEGIS POWER INTEGRATIONS｜Aegis Power Integrations Co., Ltd.）正式企業資訊：公司名稱、統一編號、成立時間、公司地址、聯絡電話、主要服務項目與服務區域。",
      },
      { property: "og:title", content: "宏鼎集成股份有限公司｜公司簡介與企業資訊" },
      {
        property: "og:description",
        content:
          "宏鼎集成股份有限公司正式企業資訊 — 公司名稱、統一編號、成立時間、聯絡方式、主要服務項目、服務區域、保險認證與合作夥伴資格。",
      },
      { property: "og:url", content: `${SITE_URL}/company-profile` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/company-profile` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE_URL}/company-profile`,
          name: "宏鼎集成股份有限公司｜公司簡介",
          about: { "@id": `${SITE_URL}/#organization` },
        }),
      },
    ],
  }),
  component: CompanyProfile,
});

type Bi = { zh: string; en: string };

function Pending() {
  return (
    <span className="text-muted-foreground italic">
      <L zh="資料待公司確認" en="Pending company confirmation" />
    </span>
  );
}

function Row({
  label,
  children,
}: {
  label: Bi;
  children: React.ReactNode;
}) {
  const { isEn } = useLang();
  return (
    <div className="grid gap-2 sm:grid-cols-[220px_1fr] py-4 border-b border-border/60 last:border-0">
      <div className="text-sm text-muted-foreground">{isEn ? label.en : label.zh}</div>
      <div className="text-sm text-foreground leading-relaxed">{children}</div>
    </div>
  );
}

function CompanyProfile() {
  const { isEn } = useLang();
  const tr = (b: Bi) => (isEn ? b.en : b.zh);
  const p = COMPANY_PROFILE;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-24">
          <div className="container-x max-w-4xl">
            <span className="eyebrow">
              <span className="dot" /> <L zh="公司簡介" en="Company Profile" />
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl">
              <L
                zh="宏鼎集成股份有限公司｜正式企業資訊"
                en="Aegis Power Integrations Co., Ltd. — Company Information"
              />
            </h1>
            <p className="mt-3 text-sm text-muted-foreground tracking-wider">
              AEGIS POWER INTEGRATIONS · Aegis Power Integrations Co., Ltd.
            </p>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              <L
                zh="本頁為宏鼎集成股份有限公司的正式企業資訊頁。尚未取得公司書面確認的欄位一律標示「資料待公司確認」，不會由網站前端自行填寫。"
                en="This is the formal company information page for Aegis Power Integrations Co., Ltd. Fields awaiting written confirmation from the company are labelled 'Pending company confirmation' — never populated on the front end."
              />
            </p>
          </div>
        </section>

        {/* Basic info */}
        <section className="pb-16">
          <div className="container-x max-w-4xl">
            <div className="panel-lift p-8 md:p-10">
              <h2 className="text-2xl font-semibold">
                <L zh="公司基本資料" en="Basic Information" />
              </h2>
              <div className="mt-4">
                <Row label={{ zh: "公司中文名稱", en: "Legal name (Chinese)" }}>
                  {p.legalNameZh}
                </Row>
                <Row label={{ zh: "公司英文名稱", en: "Legal name (English)" }}>
                  {p.legalNameEn}
                </Row>
                <Row label={{ zh: "統一編號", en: "Tax ID (統一編號)" }}>
                  {p.taxId ?? <Pending />}
                </Row>
                <Row label={{ zh: "成立時間", en: "Founded" }}>
                  {p.founded ?? <Pending />}
                </Row>
                <Row label={{ zh: "負責人", en: "Responsible person" }}>
                  {tr(p.responsiblePerson)}
                </Row>
                <Row label={{ zh: "公司地址", en: "Registered address" }}>
                  <div>{p.address.zh}</div>
                  <div className="text-muted-foreground text-xs mt-1">{p.address.en}</div>
                </Row>
                <Row label={{ zh: "聯絡電話", en: "Phone" }}>
                  <a href={`tel:${p.phone}`} className="hover:underline">
                    {SITE.phoneDisplay}
                  </a>
                </Row>
                <Row label={{ zh: "電子信箱", en: "Email" }}>
                  <div>
                    <a href={`mailto:${p.emails.general}`} className="hover:underline">
                      {p.emails.general}
                    </a>
                    <span className="text-muted-foreground ml-2 text-xs">
                      <L zh="一般洽詢" en="General" />
                    </span>
                  </div>
                  <div className="mt-1">
                    <a href={`mailto:${p.emails.sales}`} className="hover:underline">
                      {p.emails.sales}
                    </a>
                    <span className="text-muted-foreground ml-2 text-xs">
                      <L zh="業務與報價" en="Sales / RFQ" />
                    </span>
                  </div>
                </Row>
                <Row label={{ zh: "官方網站", en: "Website" }}>
                  <a href={p.website} className="hover:underline">
                    {p.website}
                  </a>
                </Row>
                <Row label={{ zh: "服務區域", en: "Service area" }}>
                  {tr(p.serviceArea)}
                </Row>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="pb-16">
          <div className="container-x max-w-4xl">
            <div className="panel p-8 md:p-10">
              <h2 className="text-2xl font-semibold">
                <L zh="主要服務項目" en="Primary Services" />
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.services.map((s) => (
                  <li key={s.en} className="border-l-2 border-primary pl-4 py-1 text-sm">
                    {tr(s)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Insurance / certs / partnerships — placeholders */}
        <section className="pb-16">
          <div className="container-x max-w-4xl grid gap-6 md:grid-cols-3">
            {[
              { label: { zh: "保險", en: "Insurance" }, items: p.insurance },
              { label: { zh: "認證與證照", en: "Certifications & Licences" }, items: p.certifications },
              { label: { zh: "合作與供應商資格", en: "Partnerships & Vendor Qualifications" }, items: p.partnerships },
            ].map((block) => (
              <div key={block.label.en} className="panel p-6">
                <h3 className="text-base font-semibold">
                  <L zh={block.label.zh} en={block.label.en} />
                </h3>
                <div className="mt-3 text-sm">
                  {block.items && block.items.length > 0 ? (
                    <ul className="space-y-2">
                      {block.items.map((it) => (
                        <li key={it.en} className="text-muted-foreground">
                          · {tr(it)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Pending />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="container-x max-w-4xl mt-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <L
                zh="本區塊之保險、認證及合作資格資料，須由宏鼎集成書面提供後方可上線；未確認之項目一律標示為「資料待公司確認」。"
                en="Insurance, certification and partnership entries appear only after written confirmation from Aegis Power Integrations. Unconfirmed items remain labelled 'Pending company confirmation'."
              />
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="container-x max-w-4xl flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">
              <L zh="聯絡宏鼎集成" en="Contact Us" /> <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="btn border border-border">
              <L zh="關於我們" en="About" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
