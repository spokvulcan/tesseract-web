"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { serif } from "./fonts";
import { DOWNLOAD_URL, EASE, usePrefersReducedMotion } from "./shared";

/* Canvas pixels can't read CSS variables, so the drawing colors are
   mirrored here as RGB triplets, one set per theme. */
const CANVAS_COLORS = {
  light: { ink: [21, 21, 15], blue: [43, 79, 216] },
  dark: { ink: [242, 241, 235], blue: [139, 158, 255] },
};

/* A tesseract is two cubes: the w=+1 shell projects larger, the w=-1
   shell nests inside it. The figure gives that structure a meaning —
   the outer shell is the instrument, the inner core is the Companion —
   and each shell carries its own vocabulary on its vertices. Every
   word glosses itself, and is explained further down the page. */
const SHELL_WORDS = [
  { vertex: 9, shell: "outer", word: "voice", gloss: "answers in 123 ms" },
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

function HypercubeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const widthsRef = useRef<(number | undefined)[]>([]);
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([]);
  /* Leader attach points in canvas coordinates, measured from the actual
     callout boxes: right edge, exact vertical center, same gap for both. */
  const anchorsRef = useRef<number[][]>([]);
  /* Rotation stays in the xy/xz planes: those never touch a vertex's w,
     so the two cubes can never trade places and the inner core always
     stays the small one. zw/yw remain zero. */
  const anglesRef = useRef<Planes>({ xy: 0.4, zw: 0, xz: 0.15, yw: 0 });
  const velRef = useRef<Planes>({ xy: 0.06, zw: 0, xz: 0.04, yw: 0 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  const { resolvedTheme } = useTheme();
  const colorsRef = useRef(CANVAS_COLORS.light);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    colorsRef.current =
      resolvedTheme === "dark" ? CANVAS_COLORS.dark : CANVAS_COLORS.light;
  }, [resolvedTheme]);

  /* Measure the callout boxes so each leader attaches at the box's right
     edge, vertically centered, with a consistent gap. Re-measures on any
     layout change (resize, font swap). */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const GAP = 10;
    const measure = () => {
      const crect = canvas.getBoundingClientRect();
      anchorsRef.current = calloutRefs.current.map((el) => {
        if (!el) return [0, 0];
        const r = el.getBoundingClientRect();
        return [r.right - crect.left + GAP, r.top - crect.top + r.height / 2];
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(canvas);
    calloutRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let lastT = performance.now();

    const draw = (t: number) => {
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

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      ctx.clearRect(0, 0, w, h);

      const { ink, blue } = colorsRef.current;
      const rgba = (c: number[], a: number) =>
        `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

      const scale = Math.min(w, h) * 1.5;
      const projected = VERTICES.map((v) => {
        const [x, y, z, ww] = rotate4D(v, anglesRef.current);
        const wp = 1 / (3 - ww);
        const x3 = x * wp;
        const y3 = y * wp;
        const z3 = z * wp;
        const zp = 1 / (3 - z3);
        return [w / 2 + x3 * zp * scale, h / 2 + y3 * zp * scale, ww, z3];
      });

      // edges: outer shell in ink, inner core in blue, connectors faint
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      for (const [i, j] of EDGES) {
        ctx.strokeStyle =
          VERTICES[i][3] !== VERTICES[j][3]
            ? rgba(ink, 0.14)
            : IS_OUTER.has(i)
              ? rgba(ink, 0.9)
              : rgba(blue, 0.55);
        ctx.beginPath();
        ctx.moveTo(projected[i][0], projected[i][1]);
        ctx.lineTo(projected[j][0], projected[j][1]);
        ctx.stroke();
      }

      // vertices
      for (let i = 0; i < projected.length; i++) {
        const outer = IS_OUTER.has(i);
        ctx.fillStyle = outer ? rgba(ink, 0.95) : rgba(blue, 0.9);
        ctx.beginPath();
        ctx.arc(projected[i][0], projected[i][1], outer ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // leader lines: from each callout's measured attach point to the
      // nearest vertex of its shell
      const nearest = (idxs: number[], ax: number, ay: number) =>
        idxs.reduce((a, b) =>
          Math.hypot(projected[a][0] - ax, projected[a][1] - ay) <
          Math.hypot(projected[b][0] - ax, projected[b][1] - ay)
            ? a
            : b
        );
      const shells = [OUTER, INNER];
      ctx.lineWidth = 1;
      for (let s = 0; s < shells.length; s++) {
        const anchor = anchorsRef.current[s];
        if (!anchor) continue;
        const [ax, ay] = anchor;
        const vi = nearest(shells[s], ax, ay);
        ctx.strokeStyle = rgba(ink, 0.4);
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(projected[vi][0], projected[vi][1]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = rgba(ink, 0.6);
        ctx.beginPath();
        ctx.arc(ax, ay, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // the vocabulary pills: visibility follows 3D depth (projected[i][3]),
      // not the frozen w — front of the shape fades in, back fades out
      SHELL_WORDS.forEach((g, k) => {
        const el = labelRefs.current[k];
        if (!el) return;
        const pvx = projected[g.vertex][0];
        const pvy = projected[g.vertex][1];
        const zMax = g.shell === "outer" ? 0.7 : 0.35;
        const norm = projected[g.vertex][3] / zMax;
        let alpha = Math.max(0, Math.min(1, (norm - 0.15) / 0.35));
        // never label a vertex that has drifted off the panel
        if (pvx < 0 || pvx > w) alpha = 0;
        // clamp by the pill's measured half-width so it is never clipped
        const half = (widthsRef.current[k] ??= el.offsetWidth / 2 + 8);
        const x = Math.max(half, Math.min(w - half, pvx));
        // keep pills clear of the fixed callouts on the right
        if (x > w * 0.72) alpha *= Math.max(0, 1 - (x - w * 0.72) / (w * 0.14));
        const below = pvy < h - 90;
        const r = g.shell === "outer" ? 5 : 3.5;
        const y = below ? pvy + r + 12 : pvy - r - 38;
        el.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px)`;
        el.style.opacity = String(alpha);
      });
    };

    const loop = (t: number) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onDown = (e: PointerEvent) => {
      dragRef.current = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
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
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none"
        style={{ cursor: "grab" }}
        aria-label="Two nested cubes with their vocabulary labeled: the instrument outside, the mind inside"
        role="img"
      />
      <div
        ref={(el) => {
          calloutRefs.current[0] = el;
        }}
        className="pointer-events-none absolute right-[16%] top-[12%] border border-[var(--ink)]/10 bg-[var(--paper)]/85 px-3 py-2 text-right backdrop-blur-sm"
      >
        <p className="font-mono text-[13px] font-medium text-[var(--ink)]">Tesseract</p>
        <p className="mt-0.5 font-mono text-[11px] text-[var(--gray)]">
          the instrument that sees the day
        </p>
      </div>
      <div
        ref={(el) => {
          calloutRefs.current[1] = el;
        }}
        className="pointer-events-none absolute right-[16%] bottom-[14%] border border-[var(--ink)]/10 bg-[var(--paper)]/85 px-3 py-2 text-right backdrop-blur-sm"
      >
        <p className="font-mono text-[13px] font-medium text-[var(--blue)]">the Companion</p>
        <p className="mt-0.5 font-mono text-[11px] text-[var(--gray)]">
          the mind that remembers it
        </p>
      </div>
      {/* the vocabulary pills need room — below sm the shells and
          callouts carry the figure on their own */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {SHELL_WORDS.map((g, k) => (
          <div
            key={g.word}
            ref={(el) => {
              labelRefs.current[k] = el;
            }}
            className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-[var(--ink)]/15 bg-[var(--paper)]/90 px-2.5 py-1 font-mono text-[12px] opacity-0 backdrop-blur-sm"
          >
            <span
              className={
                g.shell === "outer" ? "text-[var(--ink)]" : "text-[var(--blue)]"
              }
            >
              {g.word}
            </span>
            <span className="text-[var(--gray)]"> — {g.gloss}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* figure */}
        <div className="relative order-2 h-[52vh] border-t border-[var(--ink)]/10 lg:order-1 lg:h-auto lg:border-t-0 lg:border-r">
          <HypercubeCanvas />
          <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--ink)]/10 bg-[var(--paper)]/85 px-5 py-3 font-mono text-[11px] text-[var(--gray)] backdrop-blur-sm">
            fig. 01: a mind, projected
          </div>
        </div>

        {/* copy */}
        <div className="order-1 flex flex-col justify-center px-6 pb-10 pt-32 sm:px-12 lg:order-2 lg:px-16 lg:pt-24">
          <h1 className="text-[clamp(2.8rem,5.5vw,5.4rem)] font-light leading-[0.98] tracking-[-0.03em]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              Tesseract —
            </motion.span>
            <motion.span
              className={`block ${serif.className} italic`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            >
              your AI Agent
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            >
              on your Mac.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 max-w-md text-base font-light leading-relaxed text-[var(--body)] sm:text-lg"
          >
            Tesseract is a native Mac app with local LLM inference and a
            local agent — the Companion — that lives the day beside you:
            it types what you say in 99 languages, answers out loud in 123
            milliseconds, and, with your permission, watches your screen.
            Each night it decides what the day meant and keeps it as
            beliefs you can read, trace, and veto. Nothing it learns ever
            leaves the machine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10"
          >
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-sm text-[var(--paper)] transition-colors hover:bg-[var(--blue)]"
            >
              Download for Mac
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
