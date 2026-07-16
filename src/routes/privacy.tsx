import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { L } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "隱私權政策｜AEGIS POWER INTEGRATIONS｜Privacy Policy" },
      { name: "description", content: "AEGIS POWER INTEGRATIONS 宏鼎集成股份有限公司 個人資料與隱私權保護政策。Privacy policy for AEGIS POWER INTEGRATIONS Co., Ltd." },
      { property: "og:title", content: "Privacy Policy | AEGIS POWER INTEGRATIONS" },
      { property: "og:url", content: `${SITE_URL}/privacy` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> Legal</span>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
              <L zh="隱私權政策" en="Privacy Policy" />
            </h1>
            <p className="mt-3 text-sm text-muted-foreground tracking-widest uppercase">
              <L zh="Privacy Policy" en="隱私權政策" />
            </p>

            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed text-sm">
              <p>
                <L
                  zh="本頁由宏鼎集成股份有限公司 AEGIS POWER INTEGRATIONS Co., Ltd.（以下簡稱「本公司」）維護，說明本網站及本公司於商業合作中處理個人資料之基本原則。"
                  en="This page is maintained by AEGIS POWER INTEGRATIONS Co., Ltd. (hereinafter 'the Company') and describes how the Company processes personal data on this website and in commercial engagements."
                />
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">
                <L zh="1. 蒐集之個人資料" en="1. Personal Data We Collect" />
              </h2>
              <p>
                <L
                  zh="當您透過本網站聯絡我們或預約諮詢時，本公司可能蒐集姓名、公司名稱、職稱、電話、Email 及您所描述之需求。"
                  en="When you contact us or book a consultation through this website, we may collect your name, company, job title, phone, email and the requirements you describe."
                />
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">
                <L zh="2. 資料使用目的" en="2. Purpose of Use" />
              </h2>
              <p>
                <L
                  zh="所蒐集之資料僅用於回應您的諮詢、規劃合作方案、後續服務追蹤與必要之商業往來，不會於未經同意下轉售或提供給第三方。"
                  en="Data collected is used solely to respond to your inquiry, plan cooperation, provide follow-up service and conduct necessary business communications. It will not be sold or transferred to third parties without consent."
                />
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">
                <L zh="3. 資料保存與保護" en="3. Retention & Protection" />
              </h2>
              <p>
                <L
                  zh="本公司採取合理之管理與技術措施保護您的個人資料，防止未經授權之存取、修改或洩漏。"
                  en="The Company applies reasonable administrative and technical measures to protect personal data against unauthorized access, alteration or disclosure."
                />
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">
                <L zh="4. Cookie 與網站分析" en="4. Cookies & Analytics" />
              </h2>
              <p>
                <L
                  zh="本網站可能使用 Cookie 或第三方分析工具（例如 Google Analytics）以了解網站使用狀況並優化服務體驗。"
                  en="This website may use cookies and third-party analytics (e.g. Google Analytics) to understand usage and improve the service experience."
                />
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">
                <L zh="5. 使用者權利" en="5. Your Rights" />
              </h2>
              <p>
                <L
                  zh="您可隨時來信要求查詢、更正或刪除本公司所持有之個人資料，請寄至 johnny@aegispowerapi.com。"
                  en="You may request access, correction or deletion of personal data we hold by emailing johnny@aegispowerapi.com."
                />
              </p>

              <h2 className="text-foreground text-lg font-semibold mt-8">
                <L zh="6. 政策更新" en="6. Policy Updates" />
              </h2>
              <p>
                <L
                  zh="本政策得因法令、業務或技術變更調整，最新版本以本網站公告為準。"
                  en="This policy may be updated to reflect legal, business or technical changes. The latest version on this website prevails."
                />
              </p>

              <p className="text-xs mt-10">
                <L
                  zh="本政策為一般性說明，最終法律版本以本公司公告或雙方合約為準。"
                  en="This policy is a general summary; the final legal version follows the Company's announcements or executed contracts."
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
