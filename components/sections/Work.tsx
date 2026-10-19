import Section from "../Section";
import Reveal from "../Reveal";
import WorkPlayer from "../media/WorkPlayer";
import { WORK, VIEWS_CHECKED } from "@/lib/portfolio";
import { OWN_CHANNELS } from "@/lib/site";

export default function Work() {
  const [feature, ...rest] = WORK;
  return (
    <Section id="work" label="Our work" titleId="work-title" title="Recent videos from the channels we run.">
      <Reveal delay={80}>
        <p className="t-lead mt-6 max-w-[40rem] text-fg-muted">
          We test formats on our own channels first —{" "}
          {OWN_CHANNELS.map((c, i) => (
            <span key={c.handle}>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-underline rounded-sm text-fg focus-ring">
                {c.name}
              </a>
              {i < OWN_CHANNELS.length - 1 ? " and " : ""}
            </span>
          ))}
          . Client work is shown here once it&apos;s cleared to share.
        </p>
      </Reveal>

      <div className="mt-14 lg:mt-20">
        <Reveal>
          <WorkCard item={feature} large />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <WorkCard item={item} />
            </Reveal>
          ))}
        </div>
        <p className="t-small mt-14 text-fg-subtle">
          View counts are public YouTube figures as of {VIEWS_CHECKED}. Videos play from YouTube.
        </p>
      </div>
    </Section>
  );
}

function WorkCard({ item, large = false }: { item: (typeof WORK)[number]; large?: boolean }) {
  return (
    <article>
      <WorkPlayer item={item} priority={large} />
      <div className={`mt-5 flex flex-col gap-1 ${large ? "sm:flex-row sm:items-baseline sm:justify-between sm:gap-8" : ""}`}>
        <h3 className={`text-pretty font-medium tracking-[-0.02em] text-fg ${large ? "text-xl sm:text-2xl" : "text-[1.0625rem]"}`}>{item.title}</h3>
        <p className="t-small flex-none text-fg-subtle">
          {item.channel} · {item.format}
          {item.views && <> · {item.views} views</>}
        </p>
      </div>
    </article>
  );
}
