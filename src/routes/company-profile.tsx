import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Building2, MapPin, Mail, Phone, Globe, ArrowRight } from "lucide-react";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L } from "@/lib/i18n";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/company-profile")({
  head: () => ({
    meta: [
      { title: "宏鼎集成股份有限公司｜公司與服務介紹" },
      {
        name: "description",
        content:
          "宏鼎集成股份有限公司（AEGIS POWER INTEGRATIONS｜Aegis Power Integrations Co., Ltd.）位於台中市西區台灣大道二段2號20樓,提供工程整合、資料中心與弱電光纖工程、AI 系統整合與企業數位轉型服務。",
      },
      {
        name: "keywords",
        content:
          "宏鼎集成, 宏鼎集成股份有限公司, AEGIS POWER INTEGRATIONS, Aegis Power Integrations Co., Ltd., 台中工程公司, 工程整合, 資料中心, 弱電光纖, AI 系統整合, 企業數位轉型",
      },
      { property: "og:title", content: "宏鼎集成股份有限公司｜公司與服務介紹" },
      {
        property: "og:description",
        content:
          "宏鼎集成股份有限公司（AEGIS POWER INTEGRATIONS）— 工程整合、資料中心、AI 系統整合與企業數位轉型的整合型夥伴。",
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
          name: "宏鼎集成股份有限公司｜公司與服務介紹",
          about: { "@id": `${SITE_URL}/#organization` },
        }),
      },
    ],
  }),
  component: CompanyProfile,
});

function CompanyProfile() {
  const services = [
    { zh: "工程整合", en: "Engineering Integration" },
    { zh: "資料中心與弱電光纖工程", en: "Data Center & ELV / Fiber Engineering" },
    { zh: "機電整合工程", en: "Mechanical & Electrical Integration" },
    { zh: "AI 系統整合", en: "AI System Integration" },
    { zh: "企業數位轉型", en: "Enterprise Digital Transformation" },
    { zh: "企業管理系統導入（CostFlow / SalesOps / AI Launch）", en: "Enterprise Applications (CostFlow / SalesOps / AI Launch)" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20 md:py-24">
          <div className="container-x max-w-4xl">
            <span className="eyebrow">
              <span className="dot" /> <L zh="公司簡介" en="Company Profile" />
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl">
              宏鼎集成股份有限公司
            </h1>
            <p className="mt-3 text-sm text-muted-foreground tracking-wider">
              AEGIS POWER INTEGRATIONS · Aegis Power Integrations Co., Ltd.
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              <L
                zh="宏鼎集成股份有限公司（品牌名稱：宏鼎集成；英文名稱：AEGIS POWER INTEGRATIONS；英文公司全名：Aegis Power Integrations Co., Ltd.）是一家以工程事業為核心的整合型公司,結合資料中心與弱電光纖工程、機電整合、AI 系統整合及企業數位轉型服務,協助企業建立可落地的工程與數位化能力。"
                en="Aegis Power Integrations Co., Ltd. (brand: 宏鼎集成 / AEGIS POWER INTEGRATIONS) is an engineering-first integration company. We combine data center and ELV / fiber engineering, mechanical & electrical integration, AI system integration and enterprise digital transformation to help clients build practical, deployable engineering and digital capabilities."
              />
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="container-x max-w-4xl">
            <div className="panel-lift p-8 md:p-10">
              <h2 className="text-2xl font-semibold">
                <L zh="公司基本資料" en="Company Information" />
              </h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 text-sm">
                <li className="flex gap-3">
                  <Building2 className="h-5 w-5 mt-0.5 shrink-0 text-foreground/70" />
                  <div>
                    <div className="text-muted-foreground">
                      <L zh="公司名稱" en="Legal Name" />
                    </div>
                    <div className="font-medium text-foreground">宏鼎集成股份有限公司</div>
                    <div className="text-muted-foreground">Aegis Power Integrations Co., Ltd.</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Globe className="h-5 w-5 mt-0.5 shrink-0 text-foreground/70" />
                  <div>
                    <div className="text-muted-foreground">
                      <L zh="品牌名稱" en="Brand" />
                    </div>
                    <div className="font-medium text-foreground">宏鼎集成 / AEGIS POWER INTEGRATIONS</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-foreground/70" />
                  <div>
                    <div className="text-muted-foreground">
                      <L zh="公司地址" en="Address" />
                    </div>
                    <div className="font-medium text-foreground">台中市西區台灣大道二段2號20樓</div>
                    <div className="text-muted-foreground">
                      20F., No. 2, Sec. 2, Taiwan Blvd., West Dist., Taichung City, Taiwan
                    </div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 mt-0.5 shrink-0 text-foreground/70" />
                  <div>
                    <div className="text-muted-foreground">
                      <L zh="聯絡電話" en="Phone" />
                    </div>
                    <a href={`tel:${SITE.phone}`} className="font-medium text-foreground hover:underline">
                      {SITE.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 mt-0.5 shrink-0 text-foreground/70" />
                  <div>
                    <div className="text-muted-foreground">
                      <L zh="一般洽詢" en="General" />
                    </div>
                    <a href="mailto:johnny@aegispowerapi.com" className="font-medium text-foreground hover:underline">
                      johnny@aegispowerapi.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 mt-0.5 shrink-0 text-foreground/70" />
                  <div>
                    <div className="text-muted-foreground">
                      <L zh="業務與報價" en="Sales & RFQ" />
                    </div>
                    <a href="mailto:sales@aegispowerapi.com" className="font-medium text-foreground hover:underline">
                      sales@aegispowerapi.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-3 sm:col-span-2">
                  <Globe className="h-5 w-5 mt-0.5 shrink-0 text-foreground/70" />
                  <div>
                    <div className="text-muted-foreground">
                      <L zh="官方網站" en="Website" />
                    </div>
                    <a href="https://aegispowerapi.com/" className="font-medium text-foreground hover:underline">
                      https://aegispowerapi.com/
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-x max-w-4xl">
            <h2 className="text-2xl font-semibold">
              <L zh="服務項目" en="Services" />
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.en} className="border-l-2 border-primary pl-4 py-1">
                  <L zh={s.zh} en={s.en} />
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                <L zh="聯絡宏鼎集成" en="Contact Us" /> <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="btn border border-border">
                <L zh="關於我們" en="About" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
