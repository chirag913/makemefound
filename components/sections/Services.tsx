import { ReactNode } from "react";
import SectionHeader from "../SectionHeader";
import Reveal from "../Reveal";
import BookCallButton from "../BookCallButton";
import MediaFrame, { Caption, Presenter } from "../media/MediaFrame";
import Timeline from "../media/Timeline";

type Service = {
  id: string;
  num: string;
  name: string;
  line: string;
  body: string;
  points: string[];
  cta: string;
  visual: ReactNode;
};

const SERVICES: Service[] = [
  {
    id: "long-form",
    num: "01",
    name: "Long-form YouTube Editing",
    line: "The video your expertise deserves.",
    body: "You record. We shape it into something people watch to the end — a clear story, a strong open, and no dead air between the ideas that matter.",
    points: ["Storytelling and pacing", "Hook refinement", "B-roll and visual support", "Captions, sound and finishing"],
    cta: "Ask about editing",
    visual: <LongFormVisual />,
  },
  {
    id: "short-form",
    num: "02",
    name: "Short-form Repurposing",
    line: "One recording. Many moments worth watching.",
    body: "Your long videos already contain your best shorts. We find the moments that stand on their own and rebuild them for vertical, sound-off viewing.",
    points: [
      "YouTube Shorts and vertical clips",
      "Strong opening moments",
      "Captions and platform-appropriate formatting",
      "Long recordings into multiple assets",
    ],
    cta: "Ask about shorts",
    visual: <ShortFormVisual />,
  },
  {
    id: "packaging",
    num: "03",
    name: "Content Packaging",
    line: "Earn the click before you earn the watch.",
    body: "A great video with the wrong title and thumbnail doesn’t get seen. We work on the packaging with you, from the topic itself to the frame people click.",
    points: ["Title brainstorming", "Thumbnail concepts and feedback", "Topic and format research", "Content performance review"],
    cta: "Ask about packaging",
    visual: <PackagingVisual />,
  },
];

export default function Services() {
  return (
    <section id="services" className="section-y border-t border-line" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHeader
          index="01"
          label="Services"
          aside="Book one or combine them"
          titleId="services-title"
          title={
            <>
              Three ways we help your videos <span className="t-em text-accent-strong">land.</span>
            </>
          }
          intro="Pick the help you need. Some creators want full edits; others just need shorts or a second opinion on packaging. We’ll scope what fits your channel."
        />

        <div className="mt-16 space-y-4 lg:mt-24">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id}>
              <article
                id={`service-${s.id}`}
                aria-labelledby={`service-${s.id}-title`}
                className="panel grid scroll-mt-24 grid-cols-1 gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12"
              >
                <div className={`flex flex-col lg:col-span-5 ${i % 2 === 1 ? "lg:order-last" : ""}`}>
                  <span className="t-label text-accent">{s.num} / 03</span>
                  <h3
                    id={`service-${s.id}-title`}
                    className="mt-5 text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-fg"
                  >
                    {s.name}
                  </h3>
                  <p className="t-lead mt-4 text-fg">{s.line}</p>
                  <p className="t-body mt-4 text-fg-muted">{s.body}</p>

                  <ul className="mt-8 border-t border-line">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 border-b border-line py-3 text-[0.95rem] text-fg-muted">
                        <span className="h-1.5 w-1.5 flex-none rotate-45 bg-accent" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 lg:mt-auto lg:pt-10">
                    <BookCallButton location={`service_${s.id}`} label={s.cta} variant="secondary" />
                  </div>
                </div>

                <div className="lg:col-span-7 lg:self-center">{s.visual}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Visuals — each service gets its own medium: timeline, vertical cuts, a board
   ---------------------------------------------------------------------------- */

function LongFormVisual() {
  return (
    <div className="space-y-3">
      <MediaFrame timecode="00:00:00:00" label="Sample frame" guides light={{ x: "40%", y: "38%" }}>
        <Presenter className="left-[40%] h-[78%]" />
        <div className="absolute inset-x-0 bottom-[24%] text-center sm:bottom-[14%]" aria-hidden="true">
          <Caption className="text-sm sm:text-base">
            I made this mistake for <span className="text-accent-strong">three years</span>
          </Caption>
        </div>
        <span className="t-label absolute right-3 top-10 rounded-[var(--radius-xs)] bg-accent px-2 py-1 text-bg sm:right-4 sm:top-12" aria-hidden="true">
          Hook · 0:00
        </span>
      </MediaFrame>
      <Timeline
        animate={false}
        markers={[
          { at: 2, label: "Hook" },
          { at: 22, label: "Setup" },
          { at: 52, label: "Re-hook" },
          { at: 90, label: "Payoff" },
        ]}
      />
    </div>
  );
}

function ShortFormVisual() {
  const clips = [
    { tc: "03:12 → 0:41", cap: <>The <span className="text-accent-strong">one</span> metric I check daily</>, light: "30%" },
    { tc: "07:48 → 0:33", cap: <>Why your pricing page <span className="text-accent-strong">leaks</span></>, light: "40%" },
    { tc: "11:05 → 0:52", cap: <>Do this <span className="text-accent-strong">before</span> you hire</>, light: "35%" },
  ];
  return (
    <div>
      {/* Source recording */}
      <div className="frame p-3 sm:p-4" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="t-label text-fg-subtle">Source · 1 long recording</span>
          <span className="t-code text-fg-faint">14:20</span>
        </div>
        <div className="relative mt-3 h-8 rounded-[3px] bg-[#1f1f26]">
          {[20, 52, 76].map((l, i) => (
            <span key={i} className="absolute inset-y-0 rounded-[3px] border border-accent-line bg-accent-soft" style={{ left: `${l}%`, width: "6%" }} />
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-4">
        {clips.map((c, i) => (
          <MediaFrame key={i} aspect="9/16" label={null} timecode={c.tc.split(" → ")[1]} light={{ x: "50%", y: c.light }}>
            <Presenter className="h-[56%]" />
            <div className="absolute inset-x-1.5 top-[50%] text-center sm:inset-x-3" aria-hidden="true">
              <Caption className="text-[9px] sm:text-[12px]">{c.cap}</Caption>
            </div>
            <span className="t-code absolute bottom-2 left-2 text-[9px] text-fg-faint sm:bottom-3 sm:left-3 sm:text-[11px]" aria-hidden="true">
              from {c.tc.split(" → ")[0]}
            </span>
          </MediaFrame>
        ))}
      </div>
      <p className="t-label mt-4 text-fg-subtle">Sample frames · one recording, three vertical cuts</p>
    </div>
  );
}

function PackagingVisual() {
  const titles = [
    { t: "I Priced My SaaS Wrong for 3 Years", note: "Specific + personal", pick: true },
    { t: "The Pricing Mistake Most Founders Make", note: "Broad, clear promise" },
    { t: "How to Price a SaaS Product", note: "Search-friendly, low curiosity" },
  ];
  const thumbs = [
    { name: "A", idea: "Face + 3 words", pick: true },
    { name: "B", idea: "Before / after numbers" },
    { name: "C", idea: "Object close-up" },
  ];
  return (
    <div className="frame p-4 sm:p-6" aria-label="Sample packaging board">
      <div className="flex items-center justify-between">
        <span className="t-label text-fg-subtle">Packaging board · sample topic</span>
        <span className="t-label text-fg-faint">Draft</span>
      </div>

      <p className="t-label mt-6 text-fg-muted">Title options</p>
      <ul className="mt-3 divide-y divide-line rounded-[var(--radius-sm)] border border-line">
        {titles.map((x) => (
          <li key={x.t} className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${x.pick ? "bg-accent-soft" : ""}`}>
            <span className={`text-[0.95rem] font-medium tracking-[-0.015em] ${x.pick ? "text-fg" : "text-fg-muted"}`}>{x.t}</span>
            <span className={`t-code flex-none text-[11px] ${x.pick ? "text-accent-strong" : "text-fg-subtle"}`}>{x.note}</span>
          </li>
        ))}
      </ul>

      <p className="t-label mt-6 text-fg-muted">Thumbnail concepts</p>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
        {thumbs.map((th) => (
          <div key={th.name}>
            <div
              className={`relative overflow-hidden rounded-[var(--radius-sm)] border ${th.pick ? "border-accent" : "border-line-strong"}`}
              style={{ aspectRatio: "16/9" }}
            >
              <div className="footage" />
              {th.name === "A" && (
                <>
                  <Presenter className="left-[30%] h-[85%]" />
                  <span className="absolute right-[8%] top-[22%] text-[10px] font-bold leading-none text-fg sm:text-base">
                    3 YEARS
                    <br />
                    WRONG
                  </span>
                </>
              )}
              {th.name === "B" && (
                <span className="absolute inset-0 flex items-center justify-center gap-2 text-[10px] font-bold text-fg sm:gap-3 sm:text-base">
                  <span className="text-fg-subtle line-through">$9</span>→<span className="text-accent-strong">$49</span>
                </span>
              )}
              {th.name === "C" && <span className="absolute left-1/2 top-1/2 h-1/2 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-[3px] border border-line-hover bg-white/[0.05]" />}
            </div>
            <span className={`t-code mt-1.5 block text-[10px] sm:text-[11px] ${th.pick ? "text-accent-strong" : "text-fg-subtle"}`}>
              {th.name} · {th.idea}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
