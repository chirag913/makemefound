import Button from "../Button";
import BookCallButton from "../BookCallButton";
import MediaFrame, { Caption, Presenter } from "../media/MediaFrame";
import Timeline from "../media/Timeline";
import Timecode from "../media/Timecode";
import Filmstrip from "../media/Filmstrip";
import WorkPlayer from "../media/WorkPlayer";
import { WORK } from "@/lib/portfolio";

const FEATURED = WORK.find((w) => w.featured) ?? WORK[0];

function Words({ text, from = 0, className = "" }: { text: string; from?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i, all) => (
        <span key={i}>
          <span className={`word ${className}`} style={{ animationDelay: `${(from + i) * 70}ms` }}>
            {w}
          </span>
          {i < all.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden" aria-labelledby="hero-title">
      <div aria-hidden="true" className="studio-light pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]" />

      <div className="container-x pt-14 sm:pt-20 lg:pt-28">
        <p className="t-label flex items-center gap-3 text-fg-muted">
          <span className="dot dot-accent" aria-hidden="true" />
          YouTube production studio for business creators
        </p>

        <h1 id="hero-title" className="t-display mt-8 max-w-[14ch] text-balance text-fg sm:mt-10 lg:max-w-none">
          <span className="lg:block"><Words text="You bring the expertise." /></span>{" "}
          <span className="lg:block"><Words text="We make the content" from={4} /></span>{" "}
          <span className="t-em text-accent-strong lg:block"><Words text="work harder." from={8} /></span>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <p className="t-lead max-w-[38rem] text-pretty text-fg-muted lg:col-span-7">
            We help business and educational YouTubers turn their ideas into compelling videos
            through editing, content packaging, and short-form repurposing.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <BookCallButton location="hero" />
            <Button as="a" href="#work" variant="secondary">
              See Our Work
            </Button>
          </div>
        </div>
      </div>

      {/* Montage: program monitor, vertical cut, timeline */}
      <div className="container-x mt-16 pb-16 sm:mt-20 lg:mt-24 lg:pb-20">
        <div className="relative">
          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            <figure className="group relative col-span-12 sm:col-span-9">
              <WorkPlayer item={FEATURED} priority />
              <figcaption className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-[var(--radius-xs)] bg-black/70 px-2.5 py-1.5 backdrop-blur-sm sm:left-4 sm:top-4">
                <span className="dot dot-accent" aria-hidden="true" />
                <span className="t-label text-fg">
                  In-house · {FEATURED.channel}
                  {FEATURED.views && <span className="text-fg-muted"> · {FEATURED.views} views</span>}
                </span>
              </figcaption>
            </figure>

            <div className="col-span-3 hidden sm:block">
              <MediaFrame aspect="auto" className="h-full" label="Short · sample" timecode={<Timecode start={0} />} light={{ x: "50%", y: "30%" }}>
                <Presenter className="h-[58%]" />
                <div className="absolute inset-x-2 top-[54%] text-center" aria-hidden="true">
                  <Caption className="text-[11px] lg:text-[13px]">
                    Stop explaining. <span className="text-accent-strong">Show it.</span>
                  </Caption>
                </div>
              </MediaFrame>
            </div>
          </div>

          <Timeline
            className="mt-3 sm:mt-4"
            markers={[
              { at: 3, label: "Hook" },
              { at: 18, label: "Context" },
              { at: 48, label: "Pattern interrupt" },
              { at: 70, label: "Chapter 3" },
              { at: 94, label: "CTA" },
            ]}
          />
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line sm:grid-cols-3">
          {[
            ["01", "Long-form editing", "Story, pacing, hooks, finish"],
            ["02", "Short-form repurposing", "Vertical clips from long recordings"],
            ["03", "Content packaging", "Titles, thumbnails, topic research"],
          ].map(([n, t, d]) => (
            <li key={t} className="flex items-baseline gap-4 bg-bg px-5 py-5">
              <span className="t-label text-accent">{n}</span>
              <span>
                <span className="block font-medium tracking-[-0.015em] text-fg">{t}</span>
                <span className="mt-0.5 block text-sm text-fg-subtle">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-20 lg:pb-28">
        <div className="container-x mb-5 flex items-center justify-between">
          <span className="t-label text-fg-subtle">Short-form · sample frames</span>
          <span className="t-label text-fg-faint">Hover to pause</span>
        </div>
        <Filmstrip />
      </div>
    </section>
  );
}
