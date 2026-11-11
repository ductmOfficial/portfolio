import { cv } from "@/content/cv";
import { selectCv } from "@/content/select";
import { getMessages, isLocale, locales } from "@/i18n";
import { formatMetric } from "@/lib/format";
import { cvMode } from "@/lib/mode";
import { ogSize, renderOg } from "@/lib/og";
import { tx } from "@/lib/text";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Duc Tran, Senior Front-end Engineer";

/** Site-wide share card; nested pages inherit it unless they define their own. */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "en";
  const t = getMessages(l);
  const view = selectCv(cv, cvMode);
  return renderOg({
    kicker: t.hero.role,
    title: t.hero.title,
    footer: view.metrics.map((m) => ({ value: formatMetric(m, l), label: tx(m.label, l) })),
  });
}
