"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { serif } from "./fonts";
import { BLUE, DOWNLOAD_URL, INK, useFig, usePrefersReducedMotion } from "./shared";

/* A tesseract is two cubes: the w=+1 shell projects larger, the w=-1
   shell nests inside it. The figure gives that structure a meaning —
   the outer shell is the instrument, the inner core is the Companion —
   and each shell carries its own vocabulary on its vertices. Every
   word glosses itself, and is explained further down the page. */
const SHELL_WORDS = [
  { vertex: 9, shell: "outer", word: "voice", gloss: "answers out loud" },
  { vertex: 12, shell: "outer", word: "dictation", gloss: "hears 99 languages" },
  { vertex: 14, shell: "outer", word: "screenshots", gloss: "sees what you show it" },
  { vertex: 1, shell: "inner", word: "beliefs", gloss: "what it holds true" },
  { vertex: 4, shell: "inner", word: "sleep pass", gloss: "the night's review" },
  { vertex: 6, shell: "inner", word: "veto", gloss: "your final word" },
] as const;

const VERTICES: number[][] = [];
for (let i = 0; i < 16; i++) {
  VERTICES.push([i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1, i & 8 ? 1 : -1]);
}

/* The two shells: vertices whose w coordinate is +1 form the outer
   cube, -1 the inner core. */
const OUTER = VERTICES.map((v, i) => (v[3] === 1 ? i : -1)).filter((i) => i >= 0);
const INNER = VERTICES.map((v, i) => (v[3] === -1 ? i : -1)).filter((i) => i >= 0);
const IS_OUTER = new Set(OUTER);

const EDGES: [number, number][] = [];
for (let i = 0; i < 16; i++) {
  for (let j = i + 1; j < 16; j++) {
    let diff = 0;
    for (let k = 0; k < 4; k++) if (VERTICES[i][k] !== VERTICES[j][k]) diff++;
    if (diff === 1) EDGES.push([i, j]);
  }
}

/* Vertex dot size. Read by the circles and, a hundred lines away, by the
   pill that has to clear one. */
const dotRadius = (i: number) => (IS_OUTER.has(i) ? 5 : 3.5);

/* Elements park off-panel until the first frame places them, so nothing
   flashes in the top-left corner between commit and the first rAF. */
const PARKED = -100;

/* The three stroke groups, in paint order: the struts between the shells
   first, then the instrument, then the core. Each is drawn as a single
   path, so a frame rewrites three `d` attributes rather than four
   coordinates on each of 32 lines. */
const STROKES = [
  {
    label: "struts",
    edges: EDGES.filter(([i, j]) => IS_OUTER.has(i) !== IS_OUTER.has(j)),
    stroke: INK,
    opacity: 0.14,
    delay: 0.75,
    duration: 1,
  },
  {
    label: "instrument",
    edges: EDGES.filter(([i, j]) => IS_OUTER.has(i) && IS_OUTER.has(j)),
    stroke: INK,
    opacity: 0.9,
    delay: 0.2,
    duration: 1.3,
  },
  {
    label: "companion",
    edges: EDGES.filter(([i, j]) => !IS_OUTER.has(i) && !IS_OUTER.has(j)),
    stroke: BLUE,
    opacity: 0.55,
    delay: 0.6,
    duration: 1.2,
  },
];

/* Each shell and the callout that names it. Everything that pairs a
   callout with a cube (the box, its leader line, its attach point) reads
   from this one table, so the pairing is never a matter of two lists
   happening to be in the same order. */
const SHELLS = [
  {
    idxs: OUTER,
    title: "Tesseract",
    gloss: "the instrument that sees the day",
    tone: "text-[var(--ink)]",
    place: "top-[12%]",
    delay: 1.4,
  },
  {
    idxs: INNER,
    title: "the Companion",
    gloss: "the mind that remembers it",
    tone: "text-[var(--blue)]",
    place: "bottom-[14%]",
    delay: 1.55,
  },
];

type Planes = { xy: number; zw: number; xz: number; yw: number };

function rotate4D(v: number[], a: Planes) {
  let [x, y, z, w] = v;
  for (const [p, q, ang] of [
    [0, 1, a.xy],
    [2, 3, a.zw],
    [0, 2, a.xz],
    [1, 3, a.yw],
  ] as const) {
    const c = Math.cos(ang);
    const s = Math.sin(ang);
    const np = [x, y, z, w][p] * c - [x, y, z, w][q] * s;
    const nq = [x, y, z, w][p] * s + [x, y, z, w][q] * c;
    if (p === 0) x = np;
    if (p === 1) y = np;
    if (p === 2) z = np;
    if (q === 1) y = nq;
    if (q === 2) z = nq;
    if (q === 3) w = nq;
  }
  return [x, y, z, w];
}

/* 4D to 3D to the panel. Returns [x, y, depth] per vertex in CSS pixels;
   depth decides which vocabulary pills are readable. */
function project(a: Planes, w: number, h: number) {
  const scale = Math.min(w, h) * 1.5;
  return VERTICES.map((v) => {
    const [x, y, z, ww] = rotate4D(v, a);
    const wp = 1 / (3 - ww);
    const x3 = x * wp;
    const y3 = y * wp;
    const z3 = z * wp;
    const zp = 1 / (3 - z3);
    return [w / 2 + x3 * zp * scale, h / 2 + y3 * zp * scale, z3];
  });
}

/* One subpath per edge. */
function pathFor(edges: [number, number][], p: number[][]) {
  let d = "";
  for (const [i, j] of edges) {
    d += `M${p[i][0].toFixed(1)} ${p[i][1].toFixed(1)}`;
    d += `L${p[j][0].toFixed(1)} ${p[j][1].toFixed(1)}`;
  }
  return d;
}

function nearest(idxs: number[], p: number[][], ax: number, ay: number) {
  return idxs.reduce((a, b) =>
    Math.hypot(p[a][0] - ax, p[a][1] - ay) < Math.hypot(p[b][0] - ax, p[b][1] - ay)
      ? a
      : b
  );
}

/** Collects a mapped list of elements into a ref array. */
const at =
  <T,>(refs: { current: (T | null)[] }, i: number) =>
  (el: T | null) => {
    refs.current[i] = el;
  };

function HypercubeFigure() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const leaderRefs = useRef<(SVGLineElement | null)[]>([]);
  const anchorRefs = useRef<(SVGCircleElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const widthsRef = useRef<(number | undefined)[]>([]);
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([]);
  /* Panel size and the leader attach points, both measured off the DOM
     and refreshed only when something actually resizes. The SVG carries
     no viewBox, so one user unit is one CSS pixel and the measured
     numbers drop straight in. */
  const sizeRef = useRef({ w: 0, h: 0 });
  const anchorsRef = useRef<number[][]>([]);
  /* Bumped by every measure, so the frame loop can tell "nothing moved"
     from "the callouts moved but the cube did not". */
  const measuredRef = useRef(0);
  /* Rotation stays in the xy/xz planes: those never touch a vertex's w,
     so the two cubes can never trade places and the inner core always
     stays the small one. zw/yw remain zero. */
  const anglesRef = useRef<Planes>({ xy: 0.4, zw: 0, xz: 0.15, yw: 0 });
  const velRef = useRef<Planes>({ xy: 0.06, zw: 0, xz: 0.04, yw: 0 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  /* The figure builds itself once on load: struts, shell, core, then the
     vertices and their labels. framer-motion normalizes pathLength (it
     writes pathLength="1" onto the element), so the draw stays correct
     even though the loop rewrites every `d` on the next frame. */
  const { draw, fade } = useFig({ onMount: true });

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  /* Measure the panel and the callout boxes, so each leader attaches at
     its box's right edge, vertically centered, with a consistent gap.
     The attach end of each leader never moves between measures, so it is
     written here rather than in the frame loop. */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const GAP = 10;
    const measure = () => {
      const srect = svg.getBoundingClientRect();
      sizeRef.current = { w: srect.width, h: srect.height };
      anchorsRef.current = calloutRefs.current.map((el, s) => {
        if (!el) return [0, 0];
        const r = el.getBoundingClientRect();
        const ax = r.right - srect.left + GAP;
        const ay = r.top - srect.top + r.height / 2;
        leaderRefs.current[s]?.setAttribute("x1", ax.toFixed(1));
        leaderRefs.current[s]?.setAttribute("y1", ay.toFixed(1));
        anchorRefs.current[s]?.setAttribute("cx", ax.toFixed(1));
        anchorRefs.current[s]?.setAttribute("cy", ay.toFixed(1));
        return [ax, ay];
      });
      measuredRef.current++;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(svg);
    calloutRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let raf = 0;
    let running = true;
    let lastT = performance.now();
    /* NaN never equals itself, so the first frame always draws. */
    let last = { xy: NaN, xz: NaN, w: NaN, h: NaN, measured: NaN };

    const frame = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;

      // physics: auto-rotation + inertia, frozen while dragging
      if (!dragRef.current && !reducedRef.current) {
        const v = velRef.current;
        v.xy += (0.06 - v.xy) * 0.01;
        v.xz += (0.04 - v.xz) * 0.01;
        anglesRef.current.xy += v.xy * dt;
        anglesRef.current.xz += v.xz * dt;
      }

      const { w, h } = sizeRef.current;
      if (!w || !h) return;

      /* Under reduced motion the angles hold still, so most frames would
         rewrite the same 47 attributes. Skip them. */
      const a = anglesRef.current;
      const now = { xy: a.xy, xz: a.xz, w, h, measured: measuredRef.current };
      if (
        now.xy === last.xy &&
        now.xz === last.xz &&
        now.w === last.w &&
        now.h === last.h &&
        now.measured === last.measured
      ) {
        return;
      }
      last = now;

      const p = project(a, w, h);

      // edges
      STROKES.forEach((s, i) => {
        pathRefs.current[i]?.setAttribute("d", pathFor(s.edges, p));
      });

      // vertices
      for (let i = 0; i < p.length; i++) {
        const dot = dotRefs.current[i];
        if (!dot) continue;
        dot.setAttribute("cx", p[i][0].toFixed(1));
        dot.setAttribute("cy", p[i][1].toFixed(1));
      }

      // leader lines: the attach end is already placed, so only the end
      // that chases the nearest vertex of its shell moves here
      SHELLS.forEach((s, i) => {
        const anchor = anchorsRef.current[i];
        const line = leaderRefs.current[i];
        if (!anchor || !line) return;
        const vi = nearest(s.idxs, p, anchor[0], anchor[1]);
        line.setAttribute("x2", p[vi][0].toFixed(1));
        line.setAttribute("y2", p[vi][1].toFixed(1));
      });

      // the vocabulary pills: visibility follows 3D depth (p[i][2]), not
      // the frozen w — front of the shape fades in, back fades out
      SHELL_WORDS.forEach((g, k) => {
        const el = labelRefs.current[k];
        if (!el) return;
        const pvx = p[g.vertex][0];
        const pvy = p[g.vertex][1];
        const zMax = g.shell === "outer" ? 0.7 : 0.35;
        const norm = p[g.vertex][2] / zMax;
        let alpha = Math.max(0, Math.min(1, (norm - 0.15) / 0.35));
        // never label a vertex that has drifted off the panel
        if (pvx < 0 || pvx > w) alpha = 0;
        // clamp by the pill's measured half-width so it is never clipped
        const half = (widthsRef.current[k] ??= el.offsetWidth / 2 + 8);
        const x = Math.max(half, Math.min(w - half, pvx));
        // keep pills clear of the fixed callouts on the right
        if (x > w * 0.72) alpha *= Math.max(0, 1 - (x - w * 0.72) / (w * 0.14));
        const below = pvy < h - 90;
        const y = below
          ? pvy + dotRadius(g.vertex) + 12
          : pvy - dotRadius(g.vertex) - 38;
        el.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px)`;
        el.style.opacity = String(alpha);
      });
    };

    const loop = (t: number) => {
      raf = 0;
      if (!running) return;
      frame(t);
      raf = requestAnimationFrame(loop);
    };
    /* rAF already pauses on a hidden tab, but not on a hero that has been
       scrolled past, and the rest of the page is long. */
    const start = () => {
      if (raf || !running) return;
      lastT = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([e]) =>
      e.isIntersecting ? start() : stop()
    );
    io.observe(svg);

    const onDown = (e: PointerEvent) => {
      dragRef.current = { x: e.clientX, y: e.clientY };
      svg.setPointerCapture(e.pointerId);
      svg.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      dragRef.current = { x: e.clientX, y: e.clientY };
      anglesRef.current.xy += dx * 0.008;
      anglesRef.current.xz += dy * 0.008;
      velRef.current.xy = dx * 0.25;
      velRef.current.xz = dy * 0.25;
    };
    const onUp = () => {
      dragRef.current = null;
      svg.style.cursor = "grab";
    };

    svg.addEventListener("pointerdown", onDown);
    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerup", onUp);
    svg.addEventListener("pointercancel", onUp);

    return () => {
      running = false;
      stop();
      io.disconnect();
      svg.removeEventListener("pointerdown", onDown);
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerup", onUp);
      svg.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full touch-none"
        style={{ cursor: "grab" }}
        aria-label="Two nested cubes with their vocabulary labeled: the instrument outside, the mind inside"
        role="img"
      >
        {/* strokes only paint where they are drawn, so an unpainted rect
            gives the drag gesture the whole panel to work with */}
        <rect width="100%" height="100%" fill="none" pointerEvents="all" />

        {STROKES.map((s, i) => (
          <motion.path
            key={s.label}
            ref={at(pathRefs, i)}
            fill="none"
            stroke={s.stroke}
            strokeOpacity={s.opacity}
            strokeWidth={1.6}
            strokeLinecap="round"
            {...draw(s.delay, s.duration)}
            /* the draw leaves a normalized dash on the path; once it is
               done, drop it so the per-frame `d` rewrite strokes plainly */
            onAnimationComplete={() => {
              const el = pathRefs.current[i];
              if (!el) return;
              el.removeAttribute("pathLength");
              el.removeAttribute("stroke-dasharray");
              el.removeAttribute("stroke-dashoffset");
            }}
          />
        ))}

        <motion.g {...fade(1.2)}>
          {VERTICES.map((_, i) => (
            <circle
              key={i}
              ref={at(dotRefs, i)}
              cx={PARKED}
              cy={PARKED}
              r={dotRadius(i)}
              fill={IS_OUTER.has(i) ? INK : BLUE}
              fillOpacity={IS_OUTER.has(i) ? 0.95 : 0.9}
            />
          ))}
        </motion.g>

        <motion.g {...fade(1.5)}>
          {SHELLS.map((s, i) => (
            <g key={s.title}>
              <line
                ref={at(leaderRefs, i)}
                x1={PARKED}
                y1={PARKED}
                x2={PARKED}
                y2={PARKED}
                stroke={INK}
                strokeOpacity={0.4}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <circle
                ref={at(anchorRefs, i)}
                cx={PARKED}
                cy={PARKED}
                r={2}
                fill={INK}
                fillOpacity={0.6}
              />
            </g>
          ))}
        </motion.g>
      </svg>

      {SHELLS.map((s, i) => (
        <motion.div
          key={s.title}
          ref={at(calloutRefs, i)}
          {...fade(s.delay)}
          className={`pointer-events-none absolute right-[16%] ${s.place} border border-[var(--ink)]/10 bg-[var(--paper)]/85 px-3 py-2 text-right backdrop-blur-sm`}
        >
          <p className={`font-mono text-[13px] font-medium ${s.tone}`}>{s.title}</p>
          <p className="mt-0.5 font-mono text-[11px] text-[var(--gray)]">{s.gloss}</p>
        </motion.div>
      ))}

      {/* the vocabulary pills need room — below sm the shells and
          callouts carry the figure on their own */}
      <motion.div
        {...fade(1.7)}
        className="pointer-events-none absolute inset-0 hidden sm:block"
      >
        {SHELL_WORDS.map((g, k) => (
          <div
            key={g.word}
            ref={at(labelRefs, k)}
            className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-[var(--ink)]/15 bg-[var(--paper)]/90 px-2.5 py-1 font-mono text-[12px] opacity-0 backdrop-blur-sm"
          >
            <span
              className={
                g.shell === "outer" ? "text-[var(--ink)]" : "text-[var(--blue)]"
              }
            >
              {g.word}
            </span>
            <span className="text-[var(--gray)]"> · {g.gloss}</span>
          </div>
        ))}
      </motion.div>
    </>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* figure */}
        <div className="relative order-2 h-[52vh] border-t border-[var(--ink)]/10 lg:order-1 lg:h-auto lg:border-t-0 lg:border-r">
          <HypercubeFigure />
          <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--ink)]/10 bg-[var(--paper)]/85 px-5 py-3 font-mono text-[11px] text-[var(--gray)] backdrop-blur-sm">
            fig. 01: a mind, projected
          </div>
        </div>

        {/* copy */}
        <div className="order-1 flex flex-col justify-center px-6 pb-10 pt-32 sm:px-12 lg:order-2 lg:px-16 lg:pt-24">
          {/* The copy rises on a CSS animation (.rise in custom.css), so
              it starts at first paint rather than after hydration: the
              lede is the page's largest paint. The spaces between the
              lines keep the words apart for crawlers that read the text
              without the layout. */}
          <h1 className="text-[clamp(2.8rem,5.5vw,5.4rem)] font-light leading-[0.98] tracking-[-0.03em]">
            <span className="rise block [--rise-delay:150ms]">The first AI</span>{" "}
            <span className={`rise block [--rise-delay:300ms] ${serif.className} italic`}>
              you can tell
            </span>{" "}
            <span className="rise block [--rise-delay:450ms]">everything.</span>
          </h1>

          <p className="rise mt-8 max-w-md text-base font-light leading-relaxed text-[var(--body)] [--rise-delay:600ms] [--rise-duration:700ms] [--rise-y:16px] sm:text-lg">
            Tesseract is a companion that lives on your Mac. Not a
            chatbot you visit, but a presence that spends the day with
            you: it notices your notifications, knows which app
            you&apos;re in, reads your calendar, and looks at whatever
            you show it. Each night it thinks over what the day meant
            and keeps what mattered, as beliefs you can read, question,
            and veto. And because all of it runs on your Mac&apos;s own
            chip, nothing you tell it ever leaves the machine.
          </p>

          <div className="rise mt-10 [--rise-delay:750ms] [--rise-duration:700ms] [--rise-y:16px]">
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-sm text-[var(--paper)] transition-colors hover:bg-[var(--blue)]"
            >
              Download for Mac
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
