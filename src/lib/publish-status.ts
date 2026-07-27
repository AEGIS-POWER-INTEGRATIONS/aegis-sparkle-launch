/**
 * Publish-status contract shared by Knowledge Articles, Prompts and AI Tips.
 *
 * - draft:     work in progress; never listed, never in sitemap, 404 on direct URL.
 * - review:    content drafted but pending human verification (facts, versions,
 *              official sources). Same behaviour as draft on the public site
 *              — kept as a separate state so editors can distinguish
 *              "not started" from "waiting for QA".
 * - published: cleared for production. Included in listings, related-content
 *              lookups, search and sitemap.
 *
 * Rule: only `published` items reach the public surface. Direct visits to a
 * non-published slug MUST return HTTP 404 (throw `notFound()` in the loader),
 * never a "coming soon" placeholder or an empty 200.
 */
export type PublishStatus = "draft" | "review" | "published";

/**
 * Default status for legacy records that don't yet declare a `status` field.
 * We default to `review`, NOT `published` — nothing gets promoted implicitly.
 * (Instructions: 「不要自動把既有草稿改成 published」.)
 */
export const DEFAULT_STATUS: PublishStatus = "review";

export function resolveStatus(input: {
  status?: PublishStatus;
  /** Legacy flag on knowledge articles. */
  draft?: boolean;
}): PublishStatus {
  if (input.status) return input.status;
  if (input.draft) return "draft";
  return DEFAULT_STATUS;
}

export function isPublished(input: { status?: PublishStatus; draft?: boolean }): boolean {
  return resolveStatus(input) === "published";
}

/**
 * Result of a completeness check. `missing` lists field names that a record
 * must supply before it can be promoted to `published`. Empty means the
 * record satisfies the schema (it does NOT mean the content has been
 * human-reviewed — that decision stays with an editor).
 */
export type ValidationResult = {
  ok: boolean;
  missing: string[];
};

function need(record: Record<string, unknown>, field: string): string | null {
  const v = record[field];
  if (v == null) return field;
  if (typeof v === "string" && v.trim() === "") return field;
  if (Array.isArray(v) && v.length === 0) return field;
  return null;
}

export function validateFields(
  record: Record<string, unknown>,
  fields: readonly string[],
): ValidationResult {
  const missing = fields.map((f) => need(record, f)).filter((x): x is string => x !== null);
  return { ok: missing.length === 0, missing };
}
