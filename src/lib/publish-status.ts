/**
 * Publish-status contract shared by Knowledge Articles, Prompts and AI Tips.
 *
 * - draft:     work in progress; never listed, never in sitemap, 404 on direct URL.
 * - review:    content drafted but pending human verification.
 * - published: cleared for production. Included in listings, related-content
 *              lookups, search and sitemap — BUT only if it also passes
 *              `isPublishable` (see below).
 *
 * Fail-closed rule: a record is publicly visible ONLY when ALL of the
 * following hold, evaluated by `isPublishable`:
 *   1. status === "published"
 *   2. validate(record).ok — every required field present
 *   3. publishedAt / updatedAt (when present) are valid ISO dates
 *   4. slug or id looks like a URL-safe token
 *
 * Even if someone incorrectly flips `status: "published"` on an incomplete
 * record, `isPublishable` still returns false, so the runtime does NOT
 * publish it. `scripts/content-check.ts` additionally FAILS the build so the
 * mistake is caught in CI, not at runtime.
 */
export type PublishStatus = "draft" | "review" | "published";

export const DEFAULT_STATUS: PublishStatus = "review";

export function resolveStatus(
  input: {
    status?: PublishStatus;
    /** Legacy flag on knowledge articles. */
    draft?: boolean;
  },
  /**
   * Fallback when the record carries no explicit status. Collections whose
   * records are all fully authored (prompts, AI tips) pass "published";
   * knowledge article stubs keep the conservative default.
   */
  fallback: PublishStatus = DEFAULT_STATUS,
): PublishStatus {
  if (input.status) return input.status;
  if (input.draft) return "draft";
  return fallback;
}

export function isPublished(
  input: { status?: PublishStatus; draft?: boolean },
  fallback: PublishStatus = DEFAULT_STATUS,
): boolean {
  return resolveStatus(input, fallback) === "published";
}

export type ValidationResult = {
  ok: boolean;
  missing: string[];
};

function need(record: Record<string, unknown>, field: string): string | null {
  const v = record[field];
  if (v == null) return field;
  if (typeof v === "string" && v.trim() === "") return field;
  if (Array.isArray(v) && v.length === 0) return field;
  if (typeof v === "object" && !Array.isArray(v)) {
    // Bilingual objects { zh, en } are required to have both strings non-empty.
    const rec = v as Record<string, unknown>;
    if ("zh" in rec || "en" in rec) {
      const zh = rec.zh, en = rec.en;
      if (typeof zh !== "string" || zh.trim() === "") return field;
      if (typeof en !== "string" || en.trim() === "") return field;
    }
  }
  return null;
}

export function validateFields(
  record: Record<string, unknown>,
  fields: readonly string[],
): ValidationResult {
  const missing = fields.map((f) => need(record, f)).filter((x): x is string => x !== null);
  return { ok: missing.length === 0, missing };
}

// ── Field validators ────────────────────────────────────────────────

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

/** ISO date like `2026-07-17` or full ISO datetime. */
export function isValidIsoDate(v: unknown): boolean {
  if (typeof v !== "string" || v.trim() === "") return false;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return false;
  // Accept only YYYY-MM-DD or full ISO with T.
  return /^\d{4}-\d{2}-\d{2}(T[\d:.\-Z+]+)?$/.test(v.trim());
}

export function isValidSlug(v: unknown): boolean {
  return typeof v === "string" && SLUG_RE.test(v);
}

// ── Fail-closed publish gate ────────────────────────────────────────

export type PublishableCheck<T> = {
  record: T;
  validate: (r: T) => ValidationResult;
  /** Which fields to check as ISO dates (when present on record). */
  dateFields?: readonly string[];
  /** Which field to check as URL-safe slug. */
  slugField?: string;
  /** Status assumed when the record has no explicit `status`. */
  defaultStatus?: PublishStatus;
};

export type PublishableError = {
  kind: "not-published" | "invalid" | "bad-date" | "bad-slug";
  field?: string;
  missing?: string[];
};

/**
 * Return the reasons a record CANNOT be published publicly. Empty array = OK.
 * This is the single gate used by every PUBLISHED_* list, getX() lookup,
 * category listing, related-content lookup and the sitemap.
 */
export function publishBlockers<T extends Record<string, unknown>>(
  args: PublishableCheck<T>,
): PublishableError[] {
  const errs: PublishableError[] = [];
  const r = args.record;
  if (!isPublished(r as { status?: PublishStatus; draft?: boolean }, args.defaultStatus)) {
    errs.push({ kind: "not-published" });
    return errs; // no need to run other checks
  }
  const v = args.validate(r);
  if (!v.ok) errs.push({ kind: "invalid", missing: v.missing });
  for (const f of args.dateFields ?? []) {
    const val = (r as Record<string, unknown>)[f];
    if (val != null && !isValidIsoDate(val)) errs.push({ kind: "bad-date", field: f });
  }
  if (args.slugField) {
    const s = (r as Record<string, unknown>)[args.slugField];
    if (!isValidSlug(s)) errs.push({ kind: "bad-slug", field: args.slugField });
  }
  return errs;
}

export function isPublishable<T extends Record<string, unknown>>(args: PublishableCheck<T>): boolean {
  return publishBlockers(args).length === 0;
}
