/** The series: every capability paper, in reading order. The landing
    page is the survey; these are the papers it surveys. */
export const PAPERS = [
  { no: "01", slug: "companion", name: "the companion", status: "evolving" },
  { no: "02", slug: "dictation", name: "dictation", status: "shipped" },
  { no: "03", slug: "voice", name: "voice", status: "shipped" },
  { no: "04", slug: "chat", name: "chat", status: "shipped" },
  { no: "05", slug: "appshot", name: "appshot", status: "shipped" },
  { no: "06", slug: "server", name: "the server", status: "shipped" },
] as const;

export type Paper = (typeof PAPERS)[number];

export function paperAfter(slug: Paper["slug"]): Paper {
  const i = PAPERS.findIndex((p) => p.slug === slug);
  return PAPERS[(i + 1) % PAPERS.length];
}
