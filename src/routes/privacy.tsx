import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { L } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "隱私權政策｜宏鼎集成股份有限公司｜Privacy Policy" },
      { name: "description", content: "宏鼎集成股份有限公司（AEGIS POWER INTEGRATIONS）個人資料蒐集、處理與利用告知；當事人權利與聯絡方式。" },
      { property: "og:title", content: "Privacy Policy | AEGIS POWER INTEGRATIONS" },
      { property: "og:url", content: `${SITE_URL}/privacy` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});

function Section({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-foreground text-lg font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground leading-relaxed text-sm">
        {children}
      </div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> Legal</span>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
              <L zh="隱私權政策與個資告知" en="Privacy Policy & Personal Data Notice" />
            </h1>
            <p className="mt-3 text-sm text-muted-foreground tracking-widest uppercase">
              <L zh="Privacy Policy" en="宏鼎集成股份有限公司" />
            </p>

            <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
              <L
                zh="本頁由宏鼎集成股份有限公司（AEGIS POWER INTEGRATIONS Co., Ltd.，以下簡稱「本公司」）維護，說明本公司於本網站及後續商業溝通中，蒐集、處理及利用您個人資料之基本原則。"
                en="This page is maintained by Aegis Power Integrations Co., Ltd. ('the Company') and describes how the Company collects, processes and uses your personal data on this website and in follow-up business communications."
              />
            </p>

            <Section title={<L zh="1. 蒐集目的" en="1. Purpose of Collection" />}>
              <p>
                <L
                  zh="本公司蒐集個人資料之特定目的包含：（1）契約、類契約或其他法律關係事務之處理；（2）行銷業務；（3）諮詢與客戶服務；（4）內部管理與教育訓練；（5）依法令或主管機關要求提出之資料。"
                  en="Purposes include: (1) handling contract, quasi-contract or other legal relations; (2) marketing; (3) consultation and customer service; (4) internal management and training; (5) responding to legal or regulatory requirements."
                />
              </p>
            </Section>

            <Section title={<L zh="2. 個人資料類別" en="2. Categories of Personal Data" />}>
              <p>
                <L
                  zh="姓名、公司名稱、職稱、聯絡電話、電子郵件、您所描述之需求內容，以及您主動提供的補充資訊。"
                  en="Name, company, job title, phone, email, the requirements you describe, and any supplemental information you volunteer."
                />
              </p>
            </Section>

            <Section title={<L zh="3. 利用期間、地區、對象與方式" en="3. Retention Period, Region, Recipients & Method" />}>
              <ul className="list-disc pl-5 space-y-1">
                <li><L zh="利用期間：至蒐集目的消失或您請求刪除為止。" en="Period: until the purpose ceases or you request deletion." /></li>
                <li><L zh="利用地區：中華民國（台灣）境內；如需跨境傳輸將另行說明。" en="Region: Taiwan (R.O.C.); cross-border transfers will be disclosed separately." /></li>
                <li><L zh="利用對象：本公司員工、依約提供服務之協力廠商、法律或主管機關要求之對象。" en="Recipients: Company staff, contracted service providers, and parties required by law or regulator." /></li>
                <li><L zh="利用方式：電子郵件、電話、線上會議、書面文件、雲端服務與必要之管理系統。" en="Method: email, phone, online meetings, printed documents, cloud services and necessary management systems." /></li>
              </ul>
            </Section>

            <Section title={<L zh="4. 當事人權利" en="4. Your Rights" />}>
              <p>
                <L
                  zh="依個人資料保護法，您得就本公司持有之個人資料，行使查詢、閱覽、製給複本、補充、更正、停止蒐集處理利用及請求刪除之權利。"
                  en="Under Taiwan's Personal Data Protection Act, you may request access, inspection, copies, correction, suspension of processing, and deletion of the personal data we hold."
                />
              </p>
            </Section>

            <Section title={<L zh="5. 拒絕提供資料之影響" en="5. Consequence of Withholding Data" />}>
              <p>
                <L
                  zh="若您未提供必要資料（如姓名、公司、聯絡方式與需求描述），本公司可能無法完成後續聯繫、需求評估或合作討論。"
                  en="If you decline to provide required data (such as name, company, contact details and inquiry description), we may be unable to complete follow-up, needs assessment or partnership discussions."
                />
              </p>
            </Section>

            <Section title={<L zh="6. 使用之第三方服務" en="6. Third-Party Services in Use" />}>
              <p>
                <L
                  zh="本網站可能使用以下類型之第三方服務：電子郵件寄送（Google Workspace 或同等服務）、網站分析（Google Analytics 等）、雲端表單與檔案託管、以及必要之網站部署與監控服務。實際使用之服務名稱得因技術調整而變動。"
                  en="The site may use: email delivery (Google Workspace or equivalent), analytics (e.g. Google Analytics), cloud forms and file hosting, and necessary deployment/monitoring services. Actual providers may change over time."
                />
              </p>
            </Section>

            <Section title={<L zh="7. Cookie" en="7. Cookies" />}>
              <p>
                <L
                  zh="本網站可能使用 Cookie 或類似技術，用於基本功能、統計分析與體驗優化。您可透過瀏覽器設定調整 Cookie 之使用方式。"
                  en="The site may use cookies or similar technologies for essential functionality, analytics and experience improvement. You can adjust cookie usage in your browser settings."
                />
              </p>
            </Section>

            <Section title={<L zh="8. 聯絡與權利行使方式" en="8. Contact & Exercising Your Rights" />}>
              <p>
                <L
                  zh={<>如需查詢、更正或刪除個人資料，或對本政策有任何疑問，請來信 <a href={`mailto:${SITE.emails.general}`} className="underline underline-offset-4">{SITE.emails.general}</a>，或撥打 {SITE.phoneDisplay}。本公司地址：{SITE.address.zh}。</>}
                  en={<>To exercise your rights or ask questions about this policy, contact <a href={`mailto:${SITE.emails.general}`} className="underline underline-offset-4">{SITE.emails.general}</a> or call {SITE.phoneDisplay}. Address: {SITE.address.en}.</>}
                />
              </p>
            </Section>

            <Section title={<L zh="9. 政策更新" en="9. Policy Updates" />}>
              <p>
                <L
                  zh="本政策得因法令、業務或技術變更調整，最新版本以本網站公告為準。"
                  en="This policy may be updated as laws, business or technology change; the version on this site prevails."
                />
              </p>
            </Section>

            <div className="mt-12 rounded-lg border border-border bg-surface/50 p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <L
                  zh="本頁內容為一般性網站告知架構，非正式法律意見；正式法律文字仍建議由專業法律顧問確認。"
                  en="This page provides a general-purpose privacy notice framework, not legal advice. Final legal wording should be reviewed by qualified counsel."
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
