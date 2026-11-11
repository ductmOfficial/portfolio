export function TargetBadge({ label }: { label: string }) {
  return (
    <span className="inline-block border border-dashed border-accent px-1.5 py-0.5 align-middle font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
      {label}
    </span>
  );
}
