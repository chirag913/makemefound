/**
 * Portfolio entries.
 *
 * Real entries come from the channels we run ourselves (see OWN_CHANNELS in
 * lib/site.ts) and are labelled "In-house". Entries with `sample: true` are
 * labelled placeholders for formats we don't have public footage of yet.
 * To publish more real work, set `sample: false` and add one media source:
 *
 *   youtubeId: "dQw4w9WgXcQ"        // loads a YouTube embed only after a click
 *   videoSrc:  "/work/clip.mp4"     // self-hosted, muted preview, click for sound
 *   poster:    "/work/clip.jpg"     // still shown before playback (recommended)
 *
 * Put self-hosted files in /public/work. Only publish work you have
 * permission to share. `views` are public YouTube counts captured on the date in
 * VIEWS_CHECKED — refresh or remove them; never add numbers you can't verify.
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
  /** Shown large at the top of the grid. */
  featured?: boolean;
  /** Which of our channels this ran on (in-house work). */
  channel?: string;
  /** Public YouTube view count, as shown on YouTube on VIEWS_CHECKED. */
  views?: string;
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

export const VIEWS_CHECKED = "October 2026";

export const WORK: WorkItem[] = [
  {
    id: "beyond-propeller",
    category: "long-form",
    title: "This Propeller will Change Aviation Forever!",
    format: "Long-form · science explainer",
    duration: "7:25",
    note: "A technical idea explained in under eight minutes. Our most-watched upload on The Beyond.",
    aspect: "16/9",
    sample: false,
    featured: true,
    channel: "The Beyond",
    views: "2.1M",
    youtubeId: "rLnkwe-nr5w",
  },
  {
    id: "beyond-voyager",
    category: "long-form",
    title: "Unknown Force Detected: Voyager 1 Terrifying Encounter",
    format: "Long-form · space documentary",
    duration: "11:34",
    note: "An eleven-minute space story on The Beyond.",
    aspect: "16/9",
    sample: false,
    channel: "The Beyond",
    views: "410K",
    youtubeId: "mibNC1BJ-50",
  },
  {
    id: "suspect-dying",
    category: "long-form",
    title: "When Cops Realize The Suspect is Dying",
    format: "Long-form · narrative breakdown",
    duration: "27:31",
    note: "A 27-minute narrative breakdown on Suspect Stories.",
    aspect: "16/9",
    sample: false,
    channel: "Suspect Stories",
    views: "471K",
    youtubeId: "BnHAdL92oE4",
  },
  {
    id: "beyond-silent-propeller",
    category: "long-form",
    title: "Who WINS the SILENT Propeller WAR?",
    format: "Long-form · comparison explainer",
    duration: "6:44",
    note: "A head-to-head comparison explainer on The Beyond.",
    aspect: "16/9",
    sample: false,
    channel: "The Beyond",
    views: "192K",
    youtubeId: "r4uyaJq9zlE",
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
