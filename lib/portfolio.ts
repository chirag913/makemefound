/**
 * Work shown on the site. Only real, published videos go here.
 *
 * Current entries come from channels we run ourselves (OWN_CHANNELS in lib/site.ts).
 * To add client work you have permission to share, add an entry with a `youtubeId`
 * (embed loads only on click) or a self-hosted `videoSrc` + `poster` in /public/work.
 * `views` are public YouTube counts as of VIEWS_CHECKED — refresh or remove them.
 */

export type WorkItem = {
  id: string;
  title: string;
  channel: string;
  format: string;
  duration: string;
  views?: string;
  youtubeId?: string;
  videoSrc?: string;
  poster?: string;
};

export const VIEWS_CHECKED = "October 2026";

export const WORK: WorkItem[] = [
  {
    id: "beyond-propeller",
    title: "This Propeller will Change Aviation Forever!",
    channel: "The Beyond",
    format: "Science explainer",
    duration: "7:25",
    views: "2.1M",
    youtubeId: "rLnkwe-nr5w",
  },
  {
    id: "suspect-dying",
    title: "When Cops Realize The Suspect is Dying",
    channel: "Suspect Stories",
    format: "Narrative breakdown",
    duration: "27:31",
    views: "471K",
    youtubeId: "BnHAdL92oE4",
  },
  {
    id: "beyond-voyager",
    title: "Unknown Force Detected: Voyager 1 Terrifying Encounter",
    channel: "The Beyond",
    format: "Space documentary",
    duration: "11:34",
    views: "410K",
    youtubeId: "mibNC1BJ-50",
  },
  {
    id: "beyond-silent-propeller",
    title: "Who WINS the SILENT Propeller WAR?",
    channel: "The Beyond",
    format: "Comparison explainer",
    duration: "6:44",
    views: "192K",
    youtubeId: "r4uyaJq9zlE",
  },
];
