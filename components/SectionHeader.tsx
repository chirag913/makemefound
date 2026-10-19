import { ReactNode } from "react";
import Reveal from "./Reveal";

/** Sections open the same way: a hairline, an index, a label. */
export function SectionRule({ index, label, aside }: { index: string; label: string; aside?: string }) {
  return (
    <div className="flex items-center gap-4 border-t border-line pt-5">
      <span className="t-label text-accent">{index}</span>
      <span className="t-label text-fg-muted">{label}</span>
      {aside && <span className="t-label ml-auto hidden text-fg-faint sm:block">{aside}</span>}
    </div>
  );
}

export default function SectionHeader({
  index,
  label,
  aside,
  title,
  titleId,
  intro,
  className = "",
}: {
  index: string;
  label: string;
  aside?: string;
  title: ReactNode;
  titleId?: string;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <SectionRule index={index} label={label} aside={aside} />
      <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <h2 id={titleId} className="t-h2 text-balance text-fg">
            {title}
          </h2>
        </Reveal>
        {intro && (
          <Reveal delay={80} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="t-lead text-pretty text-fg-muted">{intro}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
