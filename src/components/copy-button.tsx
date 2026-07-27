import { useCallback, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

type Props = {
  /** The exact text to place on the clipboard. Never include page chrome. */
  text: string;
  /** aria-label; required for accessibility. */
  ariaLabel: string;
  /** Visible label when idle. Defaults to 「複製提示詞」. */
  label?: string;
  /** Visible label after a successful copy. Defaults to 「已複製」. */
  successLabel?: string;
  /** Success toast text. Defaults to 「已複製提示詞」. */
  successToast?: string;
  /** Error toast text. Defaults to a clear error with fallback instruction. */
  errorToast?: string;
  className?: string;
};

/**
 * Reusable copy-to-clipboard button.
 *
 * - Copies only the `text` prop — never the surrounding page content.
 * - Prefers the async Clipboard API; falls back to a hidden textarea +
 *   `document.execCommand('copy')` when the API is unavailable (older
 *   browsers, insecure contexts).
 * - Debounces rapid clicks so a user can't spam toasts.
 * - Keyboard accessible (native <button>, Enter/Space trigger).
 * - Requires an explicit `ariaLabel` so screen-reader labels stay meaningful.
 */
export function CopyButton({
  text,
  ariaLabel,
  label = "複製提示詞",
  successLabel = "已複製",
  successToast = "已複製提示詞",
  errorToast = "複製失敗，請手動選取文字後複製。",
  className,
}: Props) {
  const [copied, setCopied] = useState(false);
  const lockedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doCopy = useCallback(async () => {
    if (lockedRef.current) return;
    lockedRef.current = true;

    let ok = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        ok = true;
      } else if (typeof document !== "undefined") {
        // Fallback for browsers without async Clipboard API or non-secure contexts.
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        ta.style.pointerEvents = "none";
        document.body.appendChild(ta);
        ta.select();
        try {
          ok = document.execCommand("copy");
        } finally {
          document.body.removeChild(ta);
        }
      }
    } catch {
      ok = false;
    }

    if (ok) {
      setCopied(true);
      toast.success(successToast);
    } else {
      toast.error(errorToast);
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCopied(false);
      lockedRef.current = false;
    }, 2000);
  }, [text, successToast, errorToast]);

  return (
    <button
      type="button"
      onClick={doCopy}
      aria-label={ariaLabel}
      className={
        className ??
        "inline-flex items-center gap-1.5 rounded-sm border border-border/80 px-3 py-1.5 text-xs font-medium hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
      }
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
      <span>{copied ? successLabel : label}</span>
    </button>
  );
}
