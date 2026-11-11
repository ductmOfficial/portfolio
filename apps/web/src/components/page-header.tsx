export function PageHeader({
  kicker,
  title,
  intro,
  children,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="grid-paper border-b border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-6 pt-20 pb-14">
        {kicker && (
          <p data-rise="" className="kicker">
            {kicker}
          </p>
        )}
        <h1
          data-rise=""
          style={{ "--i": 1 } as React.CSSProperties}
          className="max-w-[22ch] text-[clamp(36px,5vw,64px)] leading-[1.05] font-semibold tracking-[-0.02em]"
        >
          {title}
        </h1>
        {intro && (
          <p
            data-rise=""
            style={{ "--i": 2 } as React.CSSProperties}
            className="max-w-[62ch] text-lg leading-relaxed text-muted"
          >
            {intro}
          </p>
        )}
        {children != null && (
          <div
            data-rise=""
            style={{ "--i": 3 } as React.CSSProperties}
            className="flex flex-col gap-5"
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`mx-auto max-w-[1200px] px-6 ${className}`}>{children}</div>;
