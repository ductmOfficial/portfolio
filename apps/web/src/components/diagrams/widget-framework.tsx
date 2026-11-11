import { Arrow, Box, DiagramFrame } from "./frame";

/** Heureka LOS: one widget pipeline, configured per site and per user, rendered in three dashboard modes. */
export function WidgetFramework({ label, caption }: { label: string; caption?: string }) {
  return (
    <DiagramFrame label={label} caption={caption} viewBox="0 0 860 300">
      <Box x={20} y={20} w={200} title="Site config" sub="KPIs · targets · layout" />
      <Box x={20} y={120} w={200} title="User settings" sub="saved per user" />
      <Box x={20} y={220} w={200} title="Date range" sub="filters" />
      <Box
        x={300}
        y={120}
        w={240}
        title="Widget framework"
        sub="aggregate · sanity check · export"
        strong
      />
      <Box x={620} y={20} w={220} title="Real-time" sub="shop-floor slideshow" />
      <Box x={620} y={120} w={220} title="Daily" sub="operations" />
      <Box x={620} y={220} w={220} title="Analysis" sub="trends" />
      <Arrow d="M220 48 H260 V140 H295" />
      <Arrow d="M220 148 H295" />
      <Arrow d="M220 248 H260 V156 H295" />
      <Arrow d="M540 140 H580 V48 H615" accent />
      <Arrow d="M540 148 H615" accent />
      <Arrow d="M540 156 H580 V248 H615" accent />
    </DiagramFrame>
  );
}
