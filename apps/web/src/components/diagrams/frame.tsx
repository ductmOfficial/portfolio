/** Shared shell: a captioned figure whose SVG reads the theme tokens, so diagrams follow light/dark. */
export function DiagramFrame({
  label,
  caption,
  viewBox,
  children,
}: {
  label: string;
  caption?: string;
  viewBox: string;
  children: React.ReactNode;
}) {
  return (
    <figure data-reveal="" className="not-prose my-10 flex flex-col gap-3">
      {/* Scrolls sideways on narrow screens; focusable so keyboard users can scroll it too. */}
      {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/prefer-tag-over-role */}
      <div
        tabIndex={0}
        role="group"
        aria-label={label}
        className="grid-paper overflow-x-auto border border-line bg-surface p-4 sm:p-6"
      >
        {/* role="img" + aria-label is the recommended pattern for meaningful inline SVG. */}
        {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role */}
        <svg
          role="img"
          aria-label={label}
          viewBox={viewBox}
          className="h-auto w-full min-w-[560px] font-mono text-[13px]"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
            </marker>
          </defs>
          {children}
        </svg>
      </div>
      {caption && <figcaption className="text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

interface BoxProps {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  sub?: string;
  strong?: boolean;
}
export function Box({ x, y, w, h = 56, title, sub, strong }: BoxProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={strong ? "var(--ink)" : "var(--surface)"}
        stroke={strong ? "var(--ink)" : "var(--line)"}
        strokeWidth="1.5"
      />
      <text
        x={x + 14}
        y={y + (sub ? 24 : h / 2 + 5)}
        fill={strong ? "var(--bg)" : "var(--ink)"}
        fontWeight="500"
      >
        {title}
      </text>
      {sub && (
        <text x={x + 14} y={y + 43} fill={strong ? "var(--line)" : "var(--muted)"} fontSize="11.5">
          {sub}
        </text>
      )}
    </g>
  );
}

export function Arrow({ d, accent }: { d: string; accent?: boolean }) {
  return (
    <path
      data-draw=""
      pathLength={1}
      d={d}
      fill="none"
      stroke={accent ? "var(--signal)" : "var(--muted)"}
      strokeWidth="1.5"
      markerEnd="url(#arrow)"
    />
  );
}
