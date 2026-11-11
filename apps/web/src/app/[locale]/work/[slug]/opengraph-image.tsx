import { cv } from "@/content/cv";
import { selectCv } from "@/content/select";
import { getMessages, isLocale } from "@/i18n";
import { cvMode } from "@/lib/mode";
import { ogSize, renderOg } from "@/lib/og";
import { tx } from "@/lib/text";

export { generateStaticParams } from "./page";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study by Duc Tran";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = isLocale(locale) ? locale : "en";
  const t = getMessages(l);
  const p = selectCv(cv, cvMode).projects.find((x) => x.id === slug);
  if (!p) throw new Error(`Unknown case study: ${slug}`);
  // "−549 kB entry chunk" → value "−549 kB", label "entry chunk"; non-numeric metrics are left out.
  const match = p.metric ? /^([−~\d][^\s]*(?:\s(?:kB|MB))?)\s+(.+)$/.exec(tx(p.metric, l)) : null;
  const measured = match?.[1] && match[2] ? { value: match[1], label: match[2] } : null;
  return renderOg({
    kicker: `${t.cases.title} · ${tx(p.kicker, l)}`,
    title: p.title ? tx(p.title, l) : p.name,
    footer: [
      ...(measured ? [measured] : []),
      { value: p.stack.slice(0, measured ? 2 : 3).join(" · "), label: t.work.stack },
    ],
  });
}
