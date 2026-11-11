"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  return (
    <nav aria-label={label} className="flex flex-1 flex-wrap gap-x-6">
      {links.map((l) => {
        const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`inline-block border-b-2 py-3 text-[15px] no-underline hover:text-accent ${
              active ? "border-signal text-ink" : "border-transparent text-ink"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
