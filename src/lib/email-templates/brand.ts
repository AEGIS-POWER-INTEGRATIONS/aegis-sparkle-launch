export const BRAND = {
  name: "宏鼎集成 AEGIS POWER INTEGRATIONS",
  nameZh: "宏鼎集成",
  nameEn: "AEGIS POWER INTEGRATIONS",
  rootDomain: "aegispowerapi.com",
  senderDomain: "notify.aegispowerapi.com",
  logoUrl: "https://aegispowerapi.com/__l5e/assets-v1/ac05f61c-af8a-40fd-985b-4b747d757366/api-logo.png",
  colors: {
    primary: "#3B82F6",
    primaryDark: "#1D4ED8",
    foreground: "#111827",
    muted: "#4B5563",
    light: "#F3F4F6",
    border: "#E5E7EB",
    white: "#ffffff",
  },
} as const;

export const fontFamily =
  '"Noto Sans TC", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif';

export const styles = {
  main: {
    backgroundColor: BRAND.colors.white,
    fontFamily,
    color: BRAND.colors.foreground,
  },
  container: {
    padding: "32px 28px",
    maxWidth: "520px",
  },
  logo: {
    width: "48px",
    height: "48px",
    margin: "0 0 24px",
    display: "block",
  },
  brandRow: {
    margin: "0 0 28px",
  },
  brandName: {
    fontSize: "16px",
    fontWeight: "700" as const,
    color: BRAND.colors.foreground,
    margin: "0",
    lineHeight: "1.4",
  },
  brandTagline: {
    fontSize: "12px",
    color: BRAND.colors.muted,
    margin: "4px 0 0",
    lineHeight: "1.4",
  },
  h1: {
    fontSize: "22px",
    fontWeight: "700" as const,
    color: BRAND.colors.foreground,
    margin: "0 0 20px",
    lineHeight: "1.35",
  },
  text: {
    fontSize: "15px",
    color: BRAND.colors.foreground,
    lineHeight: "1.65",
    margin: "0 0 20px",
  },
  link: {
    color: BRAND.colors.primaryDark,
    textDecoration: "underline",
  },
  button: {
    backgroundColor: BRAND.colors.primary,
    color: BRAND.colors.white,
    fontSize: "15px",
    fontWeight: "600" as const,
    borderRadius: "8px",
    padding: "14px 28px",
    textDecoration: "none",
    display: "inline-block",
  },
  code: {
    fontFamily: '"JetBrains Mono", "Courier New", Courier, monospace',
    fontSize: "28px",
    fontWeight: "700" as const,
    color: BRAND.colors.foreground,
    letterSpacing: "4px",
    backgroundColor: BRAND.colors.light,
    borderRadius: "8px",
    padding: "16px 20px",
    margin: "0 0 24px",
    display: "inline-block",
  },
  footer: {
    fontSize: "13px",
    color: BRAND.colors.muted,
    margin: "32px 0 0",
    lineHeight: "1.5",
    borderTop: `1px solid ${BRAND.colors.border}`,
    paddingTop: "20px",
  },
  footerLink: {
    color: BRAND.colors.muted,
    textDecoration: "underline",
  },
} as const;
