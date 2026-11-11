import Link from "next/link";

export const MoreLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="self-start text-[15px] font-medium text-accent hover:text-ink">
    {children}{" "}
    <span aria-hidden="true" className="nudge">
      →
    </span>
  </Link>
);
