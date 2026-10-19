import Section from "../Section";
import Reveal from "../Reveal";
import WorkPlayer from "../media/WorkPlayer";
import HeroReel from "../media/HeroReel";
import { WORK, VIEWS_CHECKED } from "@/lib/portfolio";
import { OWN_CHANNELS } from "@/lib/site";

/**
 * Content production — offered when it supports a client's growth strategy.
 * Everything shown here comes from our own channels and is labelled as such.
 */
export default function Work() {
  return (
    <Section id="content" label="Content production" titleId="content-title" title="When content is part of the growth plan, we make it too.">
      <Reveal delay={80}>
        <p className="t-lead mt-6 max-w-[42rem] text-fg-muted">
          Video can support acquisition — explaining an offer, building trust before a sales call, or
          giving outreach something worth sharing. We produce it ourselves: editing, packaging and
          short-form cuts.
        </p>
      </Reveal>

      <Reveal className="mt-14 lg:mt-16">
        <HeroReel />
        <p className="t-small mt-4 text-fg-subtle">Our showreel — edited and sound-designed in-house.</p>
      </Reveal>

      <div className="mt-20">
        <div className="flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-lg font-medium tracking-[-0.02em] text-fg">From our own YouTube channels</h3>
          <p className="t-small text-fg-subtle">
            {OWN_CHANNELS.map((c, i) => (
              <span key={c.handle}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-underline rounded-sm text-fg-muted hover:text-fg focus-ring">
                  {c.name}
                </a>
                {i < OWN_CHANNELS.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {WORK.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 4) * 70}>
              <article>
                <WorkPlayer item={item} />
                <h4 className="mt-4 text-pretty text-[0.975rem] font-medium tracking-[-0.015em] text-fg">{item.title}</h4>
                <p className="t-small mt-1 text-fg-subtle">
                  {item.channel}
                  {item.views && <> · {item.views} views</>}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="t-small mt-12 max-w-[42rem] text-fg-subtle">
          These are results from channels we own and run, not client results. View counts are public
          YouTube figures as of {VIEWS_CHECKED}.
        </p>
      </div>
    </Section>
  );
}
