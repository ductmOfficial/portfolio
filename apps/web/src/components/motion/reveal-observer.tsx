"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Entrance motion for content below the fold. Nothing is hidden by default: on mount, elements
 * that start outside the viewport get `data-pending` (hidden by CSS) and lose it as they scroll in.
 * Content already on screen is never hidden, so first paint and LCP do not wait for JavaScript,
 * and without JavaScript every element is simply visible.
 */
export function RevealObserver() {
  const pathname = usePathname();
  // Re-run on every client navigation: each page brings new elements to observe.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("js");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          delete (e.target as HTMLElement).dataset.pending;
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.dataset.pending = "";
      io.observe(el);
    });
    return () => {
      io.disconnect();
    };
  }, [pathname]);
  return null;
}
