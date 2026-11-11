import { Arrow, Box, DiagramFrame } from "./frame";

/** BBX Intra: one route map feeds routing, navigation and access checks; the warehouse in the URL picks the API host. */
export function TenantRouting({ label, caption }: { label: string; caption?: string }) {
  return (
    <DiagramFrame label={label} caption={caption} viewBox="0 0 860 330">
      <Box x={20} y={30} w={230} title="/:warehouse/…" sub="URL · brand · session" />
      <Box x={20} y={140} w={230} title="Route map" sub="single source" strong />
      <Box x={315} y={30} w={230} title="API host resolver" sub="per warehouse, at runtime" />
      <Box x={315} y={140} w={230} title="Router (v7)" sub="warehouse-aware" />
      <Box x={315} y={250} w={230} title="Navigation" sub="derived menu" />
      <Box x={610} y={140} w={230} title="Access control" sub="route + component level" />
      <Arrow d="M250 58 H310" accent />
      <Arrow d="M250 168 H310" />
      <Arrow d="M135 196 V278 H310" />
      <Arrow d="M545 168 H605" />
      <Arrow d="M545 278 H725 V200" />
    </DiagramFrame>
  );
}
