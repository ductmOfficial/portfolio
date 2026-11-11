import { Arrow, Box, DiagramFrame } from "./frame";

/** CineScope: the Worker serves the SPA and proxies TMDB, so the API token never ships to the browser. */
export function WorkerProxy({ label, caption }: { label: string; caption?: string }) {
  return (
    <DiagramFrame label={label} caption={caption} viewBox="0 0 860 220">
      <Box x={20} y={20} w={230} title="Browser (SPA)" sub="React 19 · TanStack Query" />
      <Box x={20} y={130} w={230} title="localStorage" sub="library · ratings · lists" />
      <Box
        x={315}
        y={20}
        w={230}
        title="Cloudflare Worker"
        sub="static assets · SEO · proxy"
        strong
      />
      <Box x={610} y={20} w={230} title="TMDB API" sub="token held server-side" />
      <Arrow d="M250 48 H310" accent />
      <Arrow d="M545 48 H605" accent />
      <Arrow d="M135 76 V125" />
    </DiagramFrame>
  );
}
