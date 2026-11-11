import { DiagramFrame } from "./frame";

interface Bar {
  label: string;
  kb: number;
}

/** Horizontal bars to scale, with the measured numbers printed: the chart is never the only carrier of the data. */
export function BundleChart({
  label,
  caption,
  bars,
  locale,
  unit = "kB",
}: {
  label: string;
  caption?: string;
  bars: Bar[];
  locale: string;
  unit?: string;
}) {
  const max = Math.max(...bars.map((b) => b.kb));
  const fmt = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const width = 520;
  return (
    <DiagramFrame
      label={label}
      caption={caption}
      viewBox={`0 0 860 ${String(40 + bars.length * 70)}`}
    >
      {bars.map((b, i) => {
        const y = 24 + i * 70;
        const w = (b.kb / max) * width;
        return (
          <g key={b.label}>
            <text x={0} y={y + 22} fill="var(--ink)">
              {b.label}
            </text>
            <rect
              data-bar=""
              style={{ "--bar": i } as React.CSSProperties}
              x={200}
              y={y}
              width={w}
              height={34}
              fill={i === bars.length - 1 ? "var(--signal)" : "var(--muted)"}
            />
            <text x={210 + w} y={y + 22} fill="var(--ink)" fontWeight="500">
              {fmt.format(b.kb)} {unit}
            </text>
          </g>
        );
      })}
    </DiagramFrame>
  );
}
