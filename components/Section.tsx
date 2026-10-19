import { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * The editorial grid used by every section: a hairline, a small label in the
 * left column, content in the right nine columns.
 */
export default function Section({
  id,
  label,
  title,
  titleId,
  children,
  className = "",
}: {
  id?: string;
  label: string;
  title?: ReactNode;
  titleId?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={titleId} className={`section-y ${className}`}>
      <div className="container-x">
        <div className="grid grid-cols-1 gap-y-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-x-10 lg:pt-10">
          <p className="t-small text-fg-subtle lg:col-span-3">{label}</p>
          <div className="lg:col-span-9">
            {title && (
              <Reveal>
                <h2 id={titleId} className="t-h2 max-w-[22ch] text-balance text-fg">
                  {title}
                </h2>
              </Reveal>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
