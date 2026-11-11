import Image, { type StaticImageData } from "next/image";

export function Figure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string | StaticImageData;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure data-reveal="" className="not-prose my-10 flex flex-col gap-3">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 860px, 100vw"
        className="h-auto w-full border border-line"
      />
      {caption && <figcaption className="text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}
