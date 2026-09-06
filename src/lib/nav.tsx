import { Link as RouterLink } from "@tanstack/react-router";
import { forwardRef } from "react";

import { useLang } from "@/lib/i18n";
import { withLocale } from "@/lib/locale";

// Loose props: `to` is written as a plain zh path and rewritten per locale.
type Props = Record<string, unknown> & { to?: string };

/**
 * Locale-aware <Link>. Internal links written as `/about` automatically stay
 * inside the current language (`/en/about` while browsing English).
 * Use this everywhere instead of importing Link from @tanstack/react-router.
 */
export const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
  props,
  ref,
) {
  const { lang } = useLang();
  const { to, ...rest } = props;
  const target = typeof to === "string" ? withLocale(to, lang) : to;
  const Any = RouterLink as unknown as React.ComponentType<Record<string, unknown>>;
  return <Any ref={ref} {...rest} to={target} />;
});
