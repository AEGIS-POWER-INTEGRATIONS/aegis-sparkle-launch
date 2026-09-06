/**
 * Locale views for the Knowledge Center data (prompt library + AI tips).
 *
 * The Traditional Chinese records in `prompts.ts` / `ai-tips.ts` remain the
 * source of truth. English overlays live in `prompts.en.ts` / `ai-tips.en.ts`
 * and are merged on top when the visitor is browsing `/en/*`.
 */
import { useLang } from "@/lib/i18n";
import {
  AI_TIP_AUDIENCE_LABEL,
  AI_TIP_CATEGORY_LABEL,
  type AiTip,
} from "@/lib/ai-tips";
import {
  AI_TIPS_EN,
  AI_TIP_AUDIENCE_LABEL_EN,
  AI_TIP_CATEGORY_LABEL_EN,
} from "@/lib/ai-tips.en";
import {
  PROMPT_AUDIENCE_LABEL,
  PROMPT_CATEGORY_LABEL,
  PROMPT_DIFFICULTY_LABEL,
  type Prompt,
} from "@/lib/prompts";
import {
  PROMPTS_EN,
  PROMPT_AUDIENCE_LABEL_EN,
  PROMPT_CATEGORY_LABEL_EN,
  PROMPT_DIFFICULTY_LABEL_EN,
} from "@/lib/prompts.en";

export function localizeTip(tip: AiTip, isEn: boolean): AiTip {
  if (!isEn) return tip;
  const en = AI_TIPS_EN[tip.slug];
  return en ? { ...tip, ...en } : tip;
}

export function localizePrompt(prompt: Prompt, isEn: boolean): Prompt {
  if (!isEn) return prompt;
  const en = PROMPTS_EN[prompt.slug];
  return en ? { ...prompt, ...en } : prompt;
}

export function useTipLocale() {
  const { isEn } = useLang();
  return {
    isEn,
    tip: (t: AiTip) => localizeTip(t, isEn),
    tips: (list: AiTip[]) => list.map((t) => localizeTip(t, isEn)),
    catLabel: (k: string) =>
      (isEn ? AI_TIP_CATEGORY_LABEL_EN : AI_TIP_CATEGORY_LABEL)[
        k as keyof typeof AI_TIP_CATEGORY_LABEL
      ] as string,
    audLabel: (k: string) =>
      (isEn ? AI_TIP_AUDIENCE_LABEL_EN : AI_TIP_AUDIENCE_LABEL)[
        k as keyof typeof AI_TIP_AUDIENCE_LABEL
      ] as string,
  };
}

export function usePromptLocale() {
  const { isEn } = useLang();
  return {
    isEn,
    prompt: (p: Prompt) => localizePrompt(p, isEn),
    prompts: (list: Prompt[]) => list.map((p) => localizePrompt(p, isEn)),
    catLabel: (k: string) =>
      (isEn ? PROMPT_CATEGORY_LABEL_EN : PROMPT_CATEGORY_LABEL)[
        k as keyof typeof PROMPT_CATEGORY_LABEL
      ] as string,
    diffLabel: (k: string) =>
      (isEn ? PROMPT_DIFFICULTY_LABEL_EN : PROMPT_DIFFICULTY_LABEL)[
        k as keyof typeof PROMPT_DIFFICULTY_LABEL
      ] as string,
    audLabel: (k: string) =>
      (isEn ? PROMPT_AUDIENCE_LABEL_EN : PROMPT_AUDIENCE_LABEL)[
        k as keyof typeof PROMPT_AUDIENCE_LABEL
      ] as string,
  };
}
