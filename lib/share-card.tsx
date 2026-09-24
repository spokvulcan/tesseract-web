import { ImageResponse } from "next/og";
import { STATUS_NOTE, paperBySlug, type Paper } from "@/components/papers/list";

/* ------------------------------------------------------------------ */
/*  The share card: the picture a link to the site shows on X,        */
/*  iMessage, Slack. Drawn at build time from the page's own words,   */
/*  in the paper's type and its light palette.                        */
/* ------------------------------------------------------------------ */

export const CARD_SIZE = { width: 1200, height: 630 };

const PAPER_TONE = "#f7f6f2";
const INK = "#15150f";
const GRAY = "#83817a";
const BLUE = "#2b4fd8";
const HAIR = "rgba(21, 21, 15, 0.12)";

/* The mark, as app/icon.svg draws it on light paper. */
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<mask id="f"><rect width="64" height="64" fill="#fff"/><g stroke="#000" stroke-width="1.2">
<path d="M32 1L32 14"/><path d="M58.9 16.5L47.6 23"/><path d="M58.9 47.5L47.6 41"/>
<path d="M32 63L32 50"/><path d="M5.1 47.5L16.4 41"/><path d="M5.1 16.5L16.4 23"/></g></mask>
<mask id="c"><rect width="64" height="64" fill="#fff"/><g stroke="#000" stroke-width="1.2">
<path d="M32 32L20.3 25.3"/><path d="M32 32L43.7 25.3"/><path d="M32 32L32 45.5"/></g></mask>
<path mask="url(#f)" fill-rule="evenodd" fill="${INK}" d="M32 1L58.9 16.5L58.9 47.5L32 63L5.1 47.5L5.1 16.5L32 1Z M32 14L47.6 23L47.6 41L32 50L16.4 41L16.4 23L32 14Z"/>
<path mask="url(#c)" fill="${BLUE}" d="M32 18.5L43.7 25.3L43.7 38.8L32 45.5L20.3 38.8L20.3 25.3L32 18.5Z"/>
</svg>`;
const MARK = `data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString("base64")}`;

type Segment = { text: string; italic?: boolean };

/* Google Fonts serves a TTF, which the card renderer needs (it cannot
   read woff2), to a client that does not look like a browser, cut down
   to the characters asked for. */
async function googleFont(family: string, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`no TTF for ${family}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

/* The site's fonts, or none: a card set in the renderer's default face
   beats a build that fails because Google Fonts did not answer. */
async function cardFonts(plain: string, italic: string, mono: string) {
  try {
    const [light, bold, serif, monoFace] = await Promise.all([
      googleFont("Space+Grotesk:wght@300", plain),
      googleFont("Space+Grotesk:wght@700", "Tesseract"),
      googleFont("Instrument+Serif:ital@1", italic),
      googleFont("Space+Mono", mono),
    ]);
    return [
      { name: "Grotesk", data: light, weight: 300 as const, style: "normal" as const },
      { name: "Grotesk", data: bold, weight: 700 as const, style: "normal" as const },
      { name: "Serif", data: serif, weight: 400 as const, style: "italic" as const },
      { name: "Mono", data: monoFace, weight: 400 as const, style: "normal" as const },
    ];
  } catch {
    return undefined;
  }
}

const ITALIC = { fontFamily: "Serif", fontStyle: "italic" as const, fontWeight: 400 };

async function card({
  label,
  headline,
  stacked = false,
  foot,
  chip,
}: {
  /** The mono line top right. */
  label: string;
  headline: Segment[];
  /** One segment per line, as the hero sets it, instead of wrapping. */
  stacked?: boolean;
  /** The mono line bottom left. */
  foot: string;
  /** Bottom right, boxed in blue like the site's status chips. */
  chip: string;
}) {
  const plain = headline.filter((s) => !s.italic).map((s) => s.text).join(" ");
  const italic = headline.filter((s) => s.italic).map((s) => s.text).join(" ");
  const fonts = await cardFonts(plain, italic, label + foot + chip);

  /* Unstacked, every word is its own box so the line can wrap between
     the plain words and the italic turn. */
  const words = stacked
    ? headline.map((s) => (
        <span key={s.text} style={s.italic ? ITALIC : undefined}>
          {s.text}
        </span>
      ))
    : headline.flatMap((s) =>
        s.text.split(" ").map((w, i) => (
          <span key={`${s.text}-${i}`} style={{ marginRight: 22, ...(s.italic ? ITALIC : {}) }}>
            {w}
          </span>
        ))
      );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px 56px",
          background: PAPER_TONE,
          color: INK,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- the card renderer only knows plain img */}
            <img src={MARK} width={60} height={60} alt="" />
            <span style={{ marginLeft: 18, fontFamily: "Grotesk", fontWeight: 700, fontSize: 34, letterSpacing: -0.7 }}>
              Tesseract
            </span>
          </div>
          <span style={{ fontFamily: "Mono", fontSize: 18, letterSpacing: 5, color: BLUE }}>{label}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: stacked ? "column" : "row",
            flexWrap: stacked ? "nowrap" : "wrap",
            fontFamily: "Grotesk",
            fontWeight: 300,
            fontSize: stacked ? 100 : 84,
            lineHeight: 1.02,
            letterSpacing: stacked ? -3 : -2.5,
          }}
        >
          {words}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${HAIR}`,
            paddingTop: 22,
            fontFamily: "Mono",
            fontSize: 18,
            color: GRAY,
          }}
        >
          <span>{foot}</span>
          <span style={{ border: `1px solid ${BLUE}`, color: BLUE, padding: "6px 14px", letterSpacing: 4 }}>
            {chip}
          </span>
        </div>
      </div>
    ),
    { ...CARD_SIZE, fonts }
  );
}

export const HOME_CARD_ALT = "Tesseract: the first AI you can tell everything.";

/** The survey's card: the hero's headline, three lines as on the page.
    The fine-print pages wear it too, from image files of their own,
    since a page's openGraph metadata hides the root's card from it. */
export function homeCard() {
  return card({
    label: "PRIVATE AI FOR YOUR MAC",
    headline: [
      { text: "The first AI" },
      { text: "you can tell", italic: true },
      { text: "everything." },
    ],
    stacked: true,
    foot: "thetesseract.app",
    chip: "RUNS ENTIRELY ON YOUR MAC",
  });
}

export function paperCardAlt(slug: Paper["slug"]) {
  const p = paperBySlug(slug);
  return `Tesseract, paper no. ${p.no}, ${p.name}: ${p.headline[0]} ${p.headline[1]}`;
}

/** A paper's card: its number, its title claim, its status. */
export function paperCard(slug: Paper["slug"]) {
  const p = paperBySlug(slug);
  return card({
    label: `PAPER NO. ${p.no} · ${p.name.toUpperCase()}`,
    headline: [{ text: p.headline[0] }, { text: p.headline[1], italic: true }],
    foot: `thetesseract.app/${p.slug}`,
    chip: STATUS_NOTE[p.status].toUpperCase(),
  });
}
