import { L } from "@/lib/i18n";

/**
 * Standard site-wide image source classification. Every non-decorative image
 * on the site should render one of these labels next to (or over) the asset.
 *
 *   aegis-project    - Work directly undertaken by 宏鼎集成
 *   core-team        - Core-team prior participation (NOT AEGIS-contracted)
 *   scenario         - Generic stock / lifestyle imagery ("服務情境示意")
 *   concept-ui       - AI-generated interface mock ("介面概念示意")
 */
export type ImageSource = "aegis-project" | "core-team" | "scenario" | "concept-ui";

const LABELS: Record<ImageSource, { zh: string; en: string }> = {
  "aegis-project": { zh: "宏鼎集成專案", en: "AEGIS project" },
  "core-team": { zh: "核心團隊過往參與經驗", en: "Core team prior experience" },
  scenario: { zh: "服務情境示意", en: "Service concept image" },
  "concept-ui": { zh: "介面概念示意", en: "Interface concept" },
};

export function ImageCaption({
  source,
  className = "",
}: {
  source: ImageSource;
  className?: string;
}) {
  const label = LABELS[source];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/90 backdrop-blur px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted-foreground ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      <L zh={label.zh} en={label.en} />
    </span>
  );
}
