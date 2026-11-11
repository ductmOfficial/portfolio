"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales, type Locale } from "@/i18n";

export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(en|de|vi)(?=\/|$)/, "");
  return (
    <nav aria-label={label} className="flex">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          lang={l}
          aria-current={l === current ? "page" : undefined}
          title={localeNames[l]}
          className={`inline-flex size-11 items-center justify-center border font-mono text-[13px] font-medium uppercase -ml-px first:ml-0 ${
            l === current
              ? "relative z-10 border-ink bg-ink text-bg"
              : "border-line text-muted hover:text-ink"
          }`}
        >
          {l}
          <span className="sr-only"> · {localeNames[l]}</span>
        </Link>
      ))}
    </nav>
  );
}
