"use client";

import { useLayoutEffect, useRef } from "react";
import type { Locale } from "@/content/schema";
import { formatMetric } from "@/lib/format";

interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  unit?: string;
}

const DURATION = 1400;
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/**
 * Counts from 0 to the metric when it scrolls into view. The server renders the final value
 * (no-JS and crawlers see real numbers); screen readers always get the final value, never the ticking one.
 * Frames are written straight to the DOM node: a state update per frame would re-render for nothing.
 */
export function CountUp({
  metric,
  locale,
  delay = 0,
}: {
  metric: Metric;
  locale: Locale;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = formatMetric(metric, locale);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.ready = "";
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Math.abs(metric.value);
    const sign = metric.value < 0 ? -1 : 1;
    const show = (n: number) => {
      el.textContent = formatMetric({ ...metric, value: sign * n }, locale);
    };
    show(0);

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now() + delay;
        const tick = (now: number) => {
          const t = Math.min(1, Math.max(0, (now - start) / DURATION));
          show(Math.round(target * easeOut(t)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = final;
    };
  }, [metric, locale, delay, final]);

  return (
    <>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true" data-countup="">
        {final}
      </span>
    </>
  );
}
