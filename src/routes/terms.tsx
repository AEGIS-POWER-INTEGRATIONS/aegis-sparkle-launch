import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { L } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "使用條款｜AEGIS POWER INTEGRATIONS｜Terms of Service" },
      { name: "description", content: "AEGIS POWER INTEGRATIONS 宏鼎集成股份有限公司 網站使用條款。Terms of service for AEGIS POWER INTEGRATIONS Co., Ltd." },
      { property: "og:title", content: "Terms of Service | AEGIS POWER INTEGRATIONS" },
      { property: "og:url", content: `${SITE_URL}/terms` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> Legal</span>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
              <L zh="使用條款" en="Terms of Service" />
            </h1>
            <p className="mt-3 text-sm text-muted-foreground tracking-widest uppercase">
              <L zh="Terms of Service" en="使用條款" />
            </p>

            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed text-sm">
              <p>
                <L
                  zh="本頁由 AEGIS POWER INTEGRATIONS Co., Ltd. 宏鼎集成股份有限公司（以下簡稱「本公司」）維護，規範您使用本網站及線上資訊的相關條件。"
                  en="This page is maintained by AEGIS POWER INTEGRATIONS Co., Ltd. (hereinafter 'the Company') and governs your use of this website and its online information."
                />
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">
                <L zh="1. 網站內容" en="1. Website Content" />
              </h2>
              <p>
                <L
                  zh="本網站所刊載之公司介紹、服務內容、產品功能與案例說明僅供參考，實際服務範圍、規格與商業條件以雙方合約為準。"
                  en="Company information, services, product features and case descriptions on this site are for reference only. The actual scope, specifications and commercial terms are governed by the executed contract."
                />
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">
                <L zh="2. 智慧財產權" en="2. Intellectual Property" />
              </h2>
              <p>
                <L
                  zh="本網站所有內容包含文字、圖片、標誌、Logo 與品牌名稱，均為本公司或授權人之財產，未經授權不得複製、修改、傳播或用於商業用途。"
                  en="All content on this site — including text, images, marks, logos and brand names — is the property of the Company or its licensors and may not be reproduced, modified, distributed or used commercially without authorization."
                />
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">
                <L zh="3. 第三方連結" en="3. Third-Party Links" />
              </h2>
              <p>
                <L
                  zh="本網站可能包含指向第三方網站之連結，本公司不對其內容、隱私政策或運作方式負責。"
                  en="This site may contain links to third-party websites. The Company is not responsible for their content, privacy policies or practices."
                />
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">
                <L zh="4. 責任限制" en="4. Limitation of Liability" />
              </h2>
              <p>
                <L
                  zh="本公司對於使用本網站所產生之任何直接或間接損失不負賠償責任，但因本公司故意或重大過失所致者，不在此限。"
                  en="The Company is not liable for any direct or indirect damages arising from use of this website, except where caused by the Company's willful misconduct or gross negligence."
                />
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">
                <L zh="5. 準據法" en="5. Governing Law" />
              </h2>
              <p>
                <L
                  zh="本條款以中華民國法律為準據法，因本條款所生之爭議，雙方合意以台灣台中地方法院為第一審管轄法院。"
                  en="These terms are governed by the laws of the Republic of China (Taiwan). The Taiwan Taichung District Court has exclusive jurisdiction as the court of first instance for any dispute arising from these terms."
                />
              </p>

              <p className="text-xs mt-10">
                <L
                  zh="本條款為一般性說明，最終法律版本以本公司公告或雙方合約為準。"
                  en="These terms are a general summary; the final legal version follows the Company's announcements or executed contracts."
                />
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
