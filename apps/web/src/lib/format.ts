import type { Locale } from "@/content/schema";

const intlLocale: Record<Locale, string> = { en: "en-US", de: "de-DE", vi: "vi-VN" };

export const formatNumber = (n: number, locale: Locale) =>
  new Intl.NumberFormat(intlLocale[locale]).format(Math.abs(n));

/** "Feb 2026" · "Feb. 2026" · "02/2026" */
export function formatMonth(month: string, locale: Locale) {
  const [y, m] = month.split("-").map(Number) as [number, number];
  if (locale === "vi") return `${String(m).padStart(2, "0")}/${String(y)}`;
  return new Intl.DateTimeFormat(intlLocale[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, 1)));
}

export const formatRange = (start: string, end: string | null, present: string, locale: Locale) =>
  `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : present}`;

export function formatMetric(
  m: { value: number; prefix?: string; suffix?: string; unit?: string },
  locale: Locale,
) {
  const sign = m.value < 0 ? "−" : "";
  return `${sign}${m.prefix ?? ""}${formatNumber(m.value, locale)}${m.suffix ?? ""}${m.unit ? ` ${m.unit}` : ""}`;
}
