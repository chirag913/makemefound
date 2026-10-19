/**
 * Portfolio entries.
 *
 * Every entry below is a SAMPLE SLOT — a labelled placeholder that shows the
 * format we produce, not client work. To publish real work, set `sample: false`
 * and add one media source:
 *
 *   youtubeId: "dQw4w9WgXcQ"        // loads a YouTube embed only after a click
 *   videoSrc:  "/work/clip.mp4"     // self-hosted, muted preview, click for sound
 *   poster:    "/work/clip.jpg"     // still shown before playback (recommended)
 *
 * Put self-hosted files in /public/work. Only publish work you have
 * permission to share, and never add view counts or results you can't verify.
 */

export type WorkCategory = "long-form" | "short-form" | "before-after" | "motion" | "breakdown";

export type WorkItem = {
  id: string;
  category: WorkCategory;
  title: string;
  format: string;
  duration: string;
  note: string;
  /** On-screen caption for the sample slot (ignored once real media is added). */
  caption?: string;
  aspect: "16/9" | "9/16";
  sample: boolean;
  youtubeId?: string;
  videoSrc?: string;
  poster?: string;
};

export const WORK_CATEGORIES: { id: WorkCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "long-form", label: "Long-form" },
  { id: "short-form", label: "Shorts" },
  { id: "before-after", label: "Before & after" },
  { id: "motion", label: "Motion graphics" },
  { id: "breakdown", label: "Edit breakdowns" },
];

export const WORK: WorkItem[] = [
  {
    id: "lf-explainer",
    category: "long-form",
    title: "Founder explainer",
    format: "Long-form · talking head + B-roll",
    duration: "12:40",
    note: "Hook rebuilt from the strongest line in the recording, chapters, and supporting visuals for every claim.",
    caption: "Here’s what nobody tells you about *pricing*",
    aspect: "16/9",
    sample: true,
  },
  {
    id: "lf-tutorial",
    category: "long-form",
    title: "Software walkthrough",
    format: "Long-form · screen recording",
    duration: "18:05",
    note: "Zooms, cursor highlights and callouts so viewers never lose their place on screen.",
    caption: "Click *here* — not where you’d expect",
    aspect: "16/9",
    sample: true,
  },
  {
    id: "sf-hook",
    category: "short-form",
    title: "Opening-line short",
    format: "Short · 9:16",
    duration: "0:38",
    note: "Starts on the payoff. Captions styled for silent viewing.",
    caption: "Start with the *payoff*",
    aspect: "9/16",
    sample: true,
  },
  {
    id: "sf-clip",
    category: "short-form",
    title: "Podcast moment",
    format: "Short · two-speaker",
    duration: "0:52",
    note: "Speaker-tracked reframe from a horizontal recording.",
    caption: "That’s the *real* reason",
    aspect: "9/16",
    sample: true,
  },
  {
    id: "sf-tip",
    category: "short-form",
    title: "Quick-tip short",
    format: "Short · single idea",
    duration: "0:29",
    note: "One idea, one visual, done in under thirty seconds.",
    caption: "Do this *before* you hire",
    aspect: "9/16",
    sample: true,
  },
  {
    id: "sf-demo",
    category: "short-form",
    title: "Screen-demo short",
    format: "Short · product demo",
    duration: "0:45",
    note: "Vertical crop with zoom-ins on the detail that matters.",
    caption: "Watch the *dashboard*",
    aspect: "9/16",
    sample: true,
  },
  {
    id: "mg-lower-thirds",
    category: "motion",
    title: "Channel graphics kit",
    format: "Motion · titles, lower thirds, callouts",
    duration: "Kit",
    note: "A consistent visual language so every upload looks like the same channel.",
    aspect: "16/9",
    sample: true,
  },
  {
    id: "bd-pacing",
    category: "breakdown",
    title: "Pacing breakdown",
    format: "Breakdown · annotated timeline",
    duration: "6:20",
    note: "Where we cut, why, and what changed between the raw recording and the final edit.",
    aspect: "16/9",
    sample: true,
  },
];
