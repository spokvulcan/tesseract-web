/** Every capability claim carries exactly one status (see CONTEXT.md). */
export type Status = "shipped" | "alpha" | "planned";

/** The chip wording for each status, where a longer form is wanted. */
export const STATUS_NOTE: Record<Status, string> = {
  shipped: "shipped",
  alpha: "alpha · in active development",
  planned: "planned",
};

/** The series: every capability paper, in reading order. The landing
    page is the survey; these are the papers it surveys. The headline is
    the paper's title claim, plain words then the italic turn; the page
    and its share image both set it from here. */
export const PAPERS = [
  {
    no: "01", slug: "companion", name: "the companion", status: "alpha",
    headline: ["An entity,", "not a feature."],
  },
  {
    no: "02", slug: "dictation", name: "dictation", status: "shipped",
    headline: ["Any text field", "becomes a microphone."],
  },
  {
    no: "03", slug: "voice", name: "voice", status: "shipped",
    headline: ["It reads to you, in a voice", "made on your Mac."],
  },
  {
    no: "04", slug: "chat", name: "chat", status: "shipped",
    headline: ["It remembers what you", "told it in March."],
  },
  {
    no: "05", slug: "appshot", name: "appshot", status: "shipped",
    headline: ["Press both command keys, and it", "sees your window."],
  },
  {
    no: "06", slug: "server", name: "the server", status: "shipped",
    headline: ["Your tools will think", "it is the cloud."],
  },
] as const satisfies readonly {
  no: string;
  slug: string;
  name: string;
  status: Status;
  headline: readonly [string, string];
}[];

export type Paper = (typeof PAPERS)[number];

export function paperBySlug(slug: Paper["slug"]): Paper {
  return PAPERS.find((p) => p.slug === slug)!;
}

export function paperAfter(slug: Paper["slug"]): Paper {
  const i = PAPERS.findIndex((p) => p.slug === slug);
  return PAPERS[(i + 1) % PAPERS.length];
}
