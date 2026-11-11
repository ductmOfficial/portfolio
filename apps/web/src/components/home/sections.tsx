import Link from "next/link";
import { formatRange } from "@/lib/format";
import type { PageContext as Ctx } from "@/lib/page";
import { tx } from "@/lib/text";
import { CountUp } from "../motion/count-up";
import { MoreLink } from "../more-link";
import { Container } from "../page-header";
import { ProjectCard } from "../project-card";
import { TargetBadge } from "../target-badge";

function SectionHead({
  n,
  kicker,
  title,
  aside,
}: {
  n: string;
  kicker: string;
  title: string;
  aside?: string;
}) {
  return (
    <div data-reveal="" className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-2.5">
        <p className="kicker">
          {n} · {kicker}
        </p>
        <h2 className="text-4xl font-semibold tracking-[-0.015em] sm:text-[44px]">{title}</h2>
      </div>
      {aside && <p className="text-[17px] text-muted">{aside}</p>}
    </div>
  );
}

const btn =
  "inline-flex min-h-12 items-center gap-2.5 border px-5.5 text-base font-medium no-underline motion-safe:transition-colors";

export function Hero({ cv, t, locale }: Ctx) {
  return (
    <section id="top" className="grid-paper border-b border-line">
      <Container className="flex flex-col gap-7 pt-24 pb-18">
        <p
          data-rise=""
          style={{ "--i": 0 } as React.CSSProperties}
          className="kicker flex items-center gap-2.5"
        >
          <span
            aria-hidden="true"
            data-pulse=""
            className="inline-block size-2 rounded-full bg-signal"
          />
          {t.hero.role} · {tx(cv.location, locale).split(",")[0]} · {tx(cv.availability, locale)}
        </p>
        <h1
          data-rise=""
          style={{ "--i": 1 } as React.CSSProperties}
          className="max-w-[18ch] text-[clamp(36px,6vw,80px)] leading-[1.02] font-semibold tracking-[-0.02em]"
        >
          {t.hero.title}
        </h1>
        <p
          data-rise=""
          style={{ "--i": 2 } as React.CSSProperties}
          className="max-w-[62ch] text-xl leading-relaxed text-muted"
        >
          {t.hero.lead}
        </p>
        <div
          data-rise=""
          style={{ "--i": 3 } as React.CSSProperties}
          className="flex flex-wrap gap-3 pt-2"
        >
          <a
            href="#cases"
            className={`${btn} border-btn bg-btn text-btn-ink hover:border-accent hover:bg-accent`}
          >
            {t.hero.primary}{" "}
            <span aria-hidden="true" className="nudge">
              →
            </span>
          </a>
          <Link href={`/${locale}/cv`} className={`${btn} border-line text-ink hover:border-ink`}>
            {t.hero.cv}
          </Link>
          <a href="#contact" className={`${btn} border-line text-ink hover:border-ink`}>
            {t.hero.contact}
          </a>
        </div>
      </Container>
    </section>
  );
}

export function StatusBoard({ cv, t, locale }: Ctx) {
  return (
    <section aria-label={t.a11y.board} className="bg-board">
      <Container>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {cv.metrics.map((m, i) => (
            <div key={m.id} className="flex flex-col-reverse gap-1.5 py-7 pr-6">
              <dt className="font-mono text-xs tracking-[0.08em] text-board-ink uppercase">
                {tx(m.label, locale)}
              </dt>
              <dd className="tabular font-mono text-[40px] leading-none font-medium text-board-fig">
                <CountUp metric={m} locale={locale} delay={i * 120} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function ExperienceRoute({ cv, t, locale }: Ctx) {
  const full = cv.experience.filter((e) => !e.compact);
  const early = cv.experience.filter((e) => e.compact);
  const first = early[0];
  const earlyStart = early.map((e) => e.start).sort()[0];
  const earlyEnd = early
    .map((e) => e.end ?? "9999-12")
    .sort()
    .at(-1);
  const stops = [
    ...(first && earlyStart && earlyEnd
      ? [
          {
            key: "early",
            dates: formatRange(earlyStart, earlyEnd, t.experience.present, locale),
            company: early.map((e) => e.company).join(" · "),
            place: `${first.country} · ${tx(first.city, locale)}`,
            role: first.title,
            line: t.experience.early,
            live: false,
          },
        ]
      : []),
    ...[...full].reverse().map((e) => ({
      key: e.id,
      dates: formatRange(e.start, e.end, t.experience.present, locale),
      company: e.company.replace(/ GmbH$/, ""),
      place: `${e.country} · ${tx(e.city, locale)}`,
      role: e.employment === "freelance" ? `${e.title} ${t.experience.freelance}` : e.title,
      line: tx(e.summary, locale),
      live: e.end === null,
    })),
  ];
  return (
    <section id="experience" className="border-b border-line">
      <Container className="flex flex-col gap-12 py-24">
        <SectionHead
          n="01"
          kicker={t.experience.kicker}
          title={t.experience.title}
          aside={t.experience.sub}
        />
        <ol
          data-route=""
          className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8 gap-y-12"
        >
          {stops.map((s, i) => (
            <li
              key={s.key}
              data-reveal=""
              style={{ "--i": i } as React.CSSProperties}
              className={`relative flex flex-col gap-2.5 pt-6 before:absolute before:inset-x-0 before:top-0 before:h-0.5 ${s.live ? "before:bg-signal" : "before:bg-line"}`}
            >
              <span
                aria-hidden="true"
                data-dot=""
                data-pulse={s.live ? "" : undefined}
                className={`absolute -top-1.5 left-0 z-10 size-3.5 rounded-full border-2 ${s.live ? "border-signal bg-signal" : "border-muted bg-bg"}`}
              />
              <span className="tabular font-mono text-[13px] text-muted">{s.dates}</span>
              <h3 className="text-[21px] font-semibold">{s.company}</h3>
              <span className="font-mono text-[13px] text-muted">{s.place}</span>
              <span className="text-[15px] font-medium">{s.role}</span>
              <p className="text-[15px] leading-relaxed text-muted">{s.line}</p>
              <span
                className={`self-start border px-2 py-0.5 font-mono text-xs font-medium tracking-wide uppercase ${
                  s.live ? "border-signal text-accent" : "border-line text-muted"
                }`}
              >
                {s.live ? t.experience.live : t.experience.done}
              </span>
            </li>
          ))}
        </ol>
        <MoreLink href={`/${locale}/experience`}>{t.experience.all}</MoreLink>
      </Container>
    </section>
  );
}

export function CaseStudies({ cv, t, locale }: Ctx) {
  return (
    <section id="cases" className="border-b border-line">
      <Container className="flex flex-col gap-12 py-24">
        <SectionHead n="02" kicker={t.cases.kicker} title={t.cases.title} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {cv.projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} t={t} locale={locale} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Skills({ cv, t, locale }: Ctx) {
  return (
    <section id="skills" className="border-b border-line">
      <Container className="flex flex-col gap-10 py-24">
        <SectionHead n="03" kicker={t.skills.kicker} title={t.skills.title} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-8 gap-y-10">
          {cv.skills.map((g, gi) => (
            <div
              key={g.id}
              data-reveal=""
              style={{ "--i": gi } as React.CSSProperties}
              className="flex flex-col gap-4"
            >
              <h3 className="kicker flex items-center gap-2 !text-ink">
                {tx(g.name, locale)}{" "}
                {g.status === "target" && <TargetBadge label={t.preview.badge} />}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <li
                    key={tx(i.name, "en")}
                    className={`border px-2.5 py-1 font-mono text-[13px] whitespace-nowrap ${
                      i.status === "target"
                        ? "border-dashed border-accent text-accent"
                        : "border-line text-ink"
                    }`}
                  >
                    {tx(i.name, locale)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <MoreLink href={`/${locale}/skills`}>{t.skills.all}</MoreLink>
      </Container>
    </section>
  );
}

export function Contact({ cv, t }: Ctx) {
  const email = cv.contacts.find((c) => c.kind === "email");
  const profiles = cv.contacts.filter((c) => c.kind === "linkedin" || c.kind === "github");
  return (
    <section id="contact" className="grid-paper">
      <Container className="flex flex-col gap-6 py-28">
        <p data-reveal="" className="kicker">
          04 · {t.contact.kicker}
        </p>
        <h2
          data-reveal=""
          style={{ "--i": 1 } as React.CSSProperties}
          className="text-[clamp(36px,5vw,64px)] font-semibold tracking-[-0.02em]"
        >
          {t.contact.title}
        </h2>
        <p
          data-reveal=""
          style={{ "--i": 2 } as React.CSSProperties}
          className="max-w-[56ch] text-[19px] text-muted"
        >
          {t.contact.text}
        </p>
        {email && (
          <a
            data-reveal=""
            style={{ "--i": 3 } as React.CSSProperties}
            href={email.href}
            className="font-mono text-[clamp(20px,3vw,32px)] font-medium break-all text-accent hover:text-ink"
          >
            {email.value}
          </a>
        )}
        <div
          data-reveal=""
          style={{ "--i": 4 } as React.CSSProperties}
          className="flex flex-wrap gap-3 pt-2"
        >
          {profiles.map((c) => (
            <a
              key={c.kind}
              href={c.href}
              rel="me"
              className={`${btn} border-line text-ink capitalize hover:border-ink`}
            >
              {c.kind === "linkedin" ? "LinkedIn" : "GitHub"}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
