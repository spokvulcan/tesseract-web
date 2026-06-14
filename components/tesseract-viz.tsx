"use client";

import { useEffect, useRef, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  4D → 3D → 2D Tesseract (hypercube) wireframe                     */
/* ------------------------------------------------------------------ */

// 16 vertices of a 4D hypercube: (±1, ±1, ±1, ±1)
const VERTICES = [
  [-1, -1, -1, -1],
  [1, -1, -1, -1],
  [1, 1, -1, -1],
  [-1, 1, -1, -1],
  [-1, 1, 1, -1],
  [1, 1, 1, -1],
  [1, -1, 1, -1],
  [-1, -1, 1, -1],
  [-1, -1, -1, 1],
  [1, -1, -1, 1],
  [1, 1, -1, 1],
  [-1, 1, -1, 1],
  [-1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, -1, 1, 1],
  [-1, -1, 1, 1],
];

// 32 edges: pairs of vertex indices that differ in exactly 1 coordinate
const EDGES: [number, number][] = [];
for (let i = 0; i < 16; i++) {
  for (let j = i + 1; j < 16; j++) {
    let diff = 0;
    for (let k = 0; k < 4; k++) {
      if (VERTICES[i][k] !== VERTICES[j][k]) diff++;
    }
    if (diff === 1) {
      EDGES.push([i, j]);
    }
  }
}

function rotate4D(
  v: number[],
  angles: { xy: number; zw: number; xz: number; yw: number }
) {
  let [x, y, z, w] = v;

  // XY rotation
  {
    const c = Math.cos(angles.xy);
    const s = Math.sin(angles.xy);
    [x, y] = [x * c - y * s, x * s + y * c];
  }
  // ZW rotation
  {
    const c = Math.cos(angles.zw);
    const s = Math.sin(angles.zw);
    [z, w] = [z * c - w * s, z * s + w * c];
  }
  // XZ rotation
  {
    const c = Math.cos(angles.xz);
    const s = Math.sin(angles.xz);
    [x, z] = [x * c - z * s, x * s + z * c];
  }
  // YW rotation
  {
    const c = Math.cos(angles.yw);
    const s = Math.sin(angles.yw);
    [y, w] = [y * c - w * s, y * s + w * c];
  }

  return [x, y, z, w];
}

function project4Dto2D(
  v: number[],
  distance4D: number,
  distance3D: number,
  width: number,
  height: number,
  scale: number
) {
  const [x, y, z, w] = v;

  // 4D → 3D perspective projection
  const wPerspective = 1 / (distance4D - w);
  const x3 = x * wPerspective;
  const y3 = y * wPerspective;
  const z3 = z * wPerspective;

  // 3D → 2D perspective projection
  const zPerspective = 1 / (distance3D - z3);
  const x2 = x3 * zPerspective;
  const y2 = y3 * zPerspective;

  return [
    width / 2 + x2 * scale,
    height / 2 + y2 * scale,
  ];
}

export default function TesseractViz({ dark = false }: { dark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const anglesRef = useRef({ xy: 0, zw: 0, xz: 0, yw: 0 });
  const sizeRef = useRef(0);
  const darkRef = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    sizeRef.current = width;

    ctx.clearRect(0, 0, width, height);

    const scale = Math.min(width, height) * 1.2;
    const dist4D = 3;
    const dist3D = 3;

    const isDark = darkRef.current;
    const r = isDark ? 240 : 17;
    const g = isDark ? 240 : 17;
    const b = isDark ? 240 : 17;

    const projected = VERTICES.map((v) => {
      const rotated = rotate4D(v, anglesRef.current);
      return project4Dto2D(rotated, dist4D, dist3D, width, height, scale);
    });

    const depths = VERTICES.map((v) => {
      const rotated = rotate4D(v, anglesRef.current);
      return rotated[3];
    });

    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    ctx.shadowBlur = 8;
    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${isDark ? 0.2 : 0.15})`;

    for (const [i, j] of EDGES) {
      const avgDepth = (depths[i] + depths[j]) / 2;
      const opacity = 0.7 + (avgDepth + 1) * 0.15;
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${opacity * (isDark ? 0.4 : 0.3)})`;
      ctx.beginPath();
      ctx.moveTo(projected[i][0], projected[i][1]);
      ctx.lineTo(projected[j][0], projected[j][1]);
      ctx.stroke();
    }

    for (let i = 0; i < projected.length; i++) {
      const depth = depths[i];
      const radius = 6 + (depth + 1) * 3;
      const opacity = 0.8 + (depth + 1) * 0.1;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${opacity * (isDark ? 0.5 : 0.4)})`;
      ctx.beginPath();
      ctx.arc(projected[i][0], projected[i][1], radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }, []);

  useEffect(() => {
    darkRef.current = dark;
  }, [dark]);

  useEffect(() => {
    let running = true;
    let lastTime = performance.now();

    const loop = (time: number) => {
      if (!running) return;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      anglesRef.current = {
        xy: anglesRef.current.xy + dt * 0.08,
        zw: anglesRef.current.zw + dt * 0.12,
        xz: anglesRef.current.xz + dt * 0.05,
        yw: anglesRef.current.yw + dt * 0.09,
      };

      draw();
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[65vw] h-[75vh] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
