import Link from "next/link";
import type { Locale, Messages } from "@/i18n";
import type { Project } from "@/content/schema";
import { tx } from "@/lib/text";
import { TargetBadge } from "./target-badge";

/** Case-study card: the whole card is one link target via the heading link's stretched hit area. */
export function ProjectCard({
  p,
  t,
  locale,
  index = 0,
}: {
  p: Project;
  t: Messages;
  locale: Locale;
  index?: number;
}) {
  const href = p.caseStudy ? `/${locale}/work/${p.id}` : (p.repo ?? p.url);
  // The wrapper carries the entrance motion so the card's own hover lift keeps its own timing.
  return (
    <div data-reveal="" style={{ "--i": index } as React.CSSProperties} className="flex">
      <article className="group lift relative flex w-full flex-col gap-3.5 border border-line bg-surface p-7 focus-within:border-ink hover:border-ink">
        <div aria-hidden="true" className="grid-paper flex h-40 items-end border border-line p-3.5">
          <span className="font-mono text-xs text-muted">{p.stack.join(" · ")}</span>
        </div>
        <p className="kicker flex items-center gap-2">
          {tx(p.kicker, locale)} {p.status === "target" && <TargetBadge label={t.preview.badge} />}
        </p>
        <h3 className="text-[23px] leading-tight font-semibold">
          {href ? (
            <Link
              href={href}
              className="text-ink no-underline after:absolute after:inset-0 after:content-['']"
            >
              {p.title ? tx(p.title, locale) : p.name}
            </Link>
          ) : p.title ? (
            tx(p.title, locale)
          ) : (
            p.name
          )}
        </h3>
        <p className="flex-1 text-[15px] leading-relaxed text-muted">{tx(p.description, locale)}</p>
        {p.metric && (
          <span className="tabular font-mono text-[15px] font-medium text-accent">
            {tx(p.metric, locale)}
          </span>
        )}
        {p.caseStudy && (
          <span aria-hidden="true" className="text-[15px] font-medium text-accent">
            {t.cases.read} <span className="nudge">→</span>
          </span>
        )}
      </article>
    </div>
  );
}
