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

/* The mind's vocabulary lives on the vertices. Every word here is
   explained somewhere further down the page. */
const WORDS = [
  "memories",
  "beliefs",
  "wakes",
  "keystone",
  "recall",
  "voice",
  "dictation",
  "mission control",
  "screenshots",
  "flight recorder",
  "standing instructions",
  "quiet hours",
  "promises",
  "sleep pass",
  "digest",
  "owner's veto",
];

const VERTICES: number[][] = [];
for (let i = 0; i < 16; i++) {
  VERTICES.push([i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1, i & 8 ? 1 : -1]);
}

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
  const anglesRef = useRef<Planes>({ xy: 0.4, zw: 0.9, xz: 0.15, yw: 0.6 });
  const velRef = useRef<Planes>({ xy: 0.06, zw: 0.1, xz: 0.04, yw: 0.07 });
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
        v.zw += (0.1 - v.zw) * 0.01;
        v.xz += (0.04 - v.xz) * 0.01;
        v.yw += (0.07 - v.yw) * 0.01;
        anglesRef.current.xy += v.xy * dt;
        anglesRef.current.zw += v.zw * dt;
        anglesRef.current.xz += v.xz * dt;
        anglesRef.current.yw += v.yw * dt;
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

      const scale = Math.min(w, h) * 1.5;
      const projected = VERTICES.map((v) => {
        const [x, y, z, ww] = rotate4D(v, anglesRef.current);
        const wp = 1 / (3 - ww);
        const x3 = x * wp;
        const y3 = y * wp;
        const z3 = z * wp;
        const zp = 1 / (3 - z3);
        return [w / 2 + x3 * zp * scale, h / 2 + y3 * zp * scale, ww];
      });

      // edges
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      for (const [i, j] of EDGES) {
        const depth = (projected[i][2] + projected[j][2]) / 2;
        const o = 0.35 + ((depth + 1) / 2) * 0.6;
        ctx.strokeStyle = `rgba(${ink[0]}, ${ink[1]}, ${ink[2]}, ${o})`;
        ctx.beginPath();
        ctx.moveTo(projected[i][0], projected[i][1]);
        ctx.lineTo(projected[j][0], projected[j][1]);
        ctx.stroke();
      }

      // vertices + words
      ctx.font = "500 11px var(--font-mono), ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < projected.length; i++) {
        const depth = projected[i][2];
        const o = 0.08 + ((depth + 1) / 2) * 0.92;
        const r = 2.5 + ((depth + 1) / 2) * 3;
        ctx.fillStyle = `rgba(${ink[0]}, ${ink[1]}, ${ink[2]}, ${o})`;
        ctx.beginPath();
        ctx.arc(projected[i][0], projected[i][1], r, 0, Math.PI * 2);
        ctx.fill();
        if (o > 0.62) {
          const px = projected[i][0];
          const py = projected[i][1];
          // keep labels off the edges: a clipped word is worse than none
          if (px > 56 && px < w - 56 && py > 36 && py < h - 64) {
            ctx.fillStyle = `rgba(${blue[0]}, ${blue[1]}, ${blue[2]}, ${o * 0.85})`;
            ctx.fillText(WORDS[i], px, py + r + 13);
          }
        }
      }
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
      anglesRef.current.zw += dx * 0.008;
      anglesRef.current.xy += dy * 0.008;
      velRef.current.zw = dx * 0.25;
      velRef.current.xy = dy * 0.25;
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full touch-none"
      style={{ cursor: "grab" }}
      aria-label="A four-dimensional shape that you can drag to turn"
      role="img"
    />
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
            a four-dimensional shape, drawn flat
          </div>
          <span className="absolute left-5 top-24 font-mono text-[11px] text-[var(--gray)] lg:top-28">
            fig. 01: a mind, projected
          </span>
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
              A mind that
            </motion.span>
            <motion.span
              className={`block ${serif.className} italic`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            >
              happens to live
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            >
              in your Mac.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 max-w-md text-base font-light leading-relaxed text-[var(--body)] sm:text-lg"
          >
            Tesseract is a personal intelligence that runs entirely on your
            Mac. The Companion is the mind on top of it: it watches the day
            with you, filters the noise, and keeps only the signal. It is
            experimental, and it is getting better every week.
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
