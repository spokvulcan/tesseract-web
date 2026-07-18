"use client";

import { motion } from "framer-motion";
import { INK, BLUE, GRAY, FAINT, MONO, useFig, useNow } from "./shared";

/* ------------------------------------------------------------------ */
/*  Deterministic PRNG: figures must render identically on server     */
/*  and client, so "randomness" is seeded and module-level.           */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/*  fig. 02: the filter. Everything is sensed, almost nothing is      */
/*  forwarded. Noise decays across a threshold; one signal continues. */
/* ------------------------------------------------------------------ */

const NOISE_POINTS: string = (() => {
  const rand = mulberry32(42);
  const pts: string[] = [];
  for (let x = 48; x <= 952; x += 7) {
    const t = (x - 48) / 904;
    const amp = 52 * Math.pow(1 - t, 1.6) + 2;
    const y = 100 + (rand() * 2 - 1) * amp;
    pts.push(`${pts.length === 0 ? "M" : "L"}${x},${y.toFixed(1)}`);
  }
  return pts.join(" ");
})();

export function NoiseFigure() {
  const { draw, fade } = useFig();
  return (
    <svg
      viewBox="0 0 1000 190"
      className="h-auto w-full"
      role="img"
      aria-label="A field of noise decaying across a threshold marked 'the Companion'; a single clean signal line continues past it"
    >
      <motion.text x={60} y={30} fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(0.2)}>
        noise
      </motion.text>

      {/* the noise field */}
      <motion.path
        d={NOISE_POINTS}
        fill="none"
        stroke={GRAY}
        strokeOpacity={0.55}
        strokeWidth={1}
        {...draw(0.1)}
      />

      {/* the threshold */}
      <motion.line
        x1={560} y1={36} x2={560} y2={164}
        stroke={BLUE} strokeWidth={1} strokeDasharray="2 4" strokeOpacity={0.6}
        {...draw(0.7)}
      />
      <motion.text
        x={560} y={28} textAnchor="middle"
        fill={BLUE} fontSize="10" fontFamily={MONO} letterSpacing="1"
        {...fade(0.9)}
      >
        the companion
      </motion.text>

      {/* the signal */}
      <motion.line
        x1={560} y1={100} x2={952} y2={100}
        stroke={BLUE} strokeWidth={1.8}
        {...draw(1.1)}
      />
      <motion.text
        x={940} y={86} textAnchor="end"
        fill={BLUE} fontSize="10" fontFamily={MONO} {...fade(1.4)}
      >
        signal
      </motion.text>

      {/* axis */}
      <motion.line
        x1={48} y1={170} x2={952} y2={170}
        stroke={INK} strokeOpacity={0.35}
        {...draw(0.1)}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  fig. 03: a day the Companion booked for itself. Three beats it    */
/*  chose, one keystone it kept, and a live "now" marker.             */
/* ------------------------------------------------------------------ */

const DAY_BEATS = [
  { t: 7 * 60 + 40, time: "07:40", label: "morning planning", hi: true },
  { t: 12 * 60 + 55, time: "12:55", label: "midday pulse", hi: false },
  { t: 21 * 60 + 20, time: "21:20", label: "evening journal", hi: true },
];
const KEYSTONE = { start: 15 * 60 + 5, end: 15 * 60 + 25, time: "15:05" };

export function DayFigure() {
  const now = useNow();
  const { draw, fade } = useFig();
  const minutes = now.getHours() * 60 + now.getMinutes();

  const X0 = 48;
  const X1 = 952;
  const AXIS = 172;
  const x = (t: number) => X0 + (t / 1440) * (X1 - X0);

  return (
    <svg
      viewBox="0 0 1000 236"
      className="h-auto w-full"
      role="img"
      aria-label="Timeline of a day the Companion booked for itself: morning planning at 07:40, midday pulse at 12:55, a kept keystone at 15:05, evening journal at 21:20"
    >
      {/* hour ticks */}
      {Array.from({ length: 9 }, (_, i) => i * 180).map((t) => (
        <g key={t}>
          <motion.line
            x1={x(t)} y1={AXIS} x2={x(t)} y2={AXIS + (t % 360 === 0 ? 10 : 6)}
            stroke={INK} strokeOpacity={t % 360 === 0 ? 0.5 : 0.25}
            {...fade(0.5)}
          />
          {t % 360 === 0 && (
            <motion.text
              x={x(t)} y={AXIS + 26} textAnchor="middle"
              fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(0.6)}
            >
              {String(t / 60).padStart(2, "0")}:00
            </motion.text>
          )}
        </g>
      ))}

      {/* axis */}
      <motion.line
        x1={X0} y1={AXIS} x2={X1} y2={AXIS}
        stroke={INK} strokeOpacity={0.6} strokeWidth={1.2}
        {...draw(0.1)}
      />

      {/* the keystone: a kept block of hard focus */}
      <motion.rect
        x={x(KEYSTONE.start)} y={AXIS - 3}
        width={x(KEYSTONE.end) - x(KEYSTONE.start)} height={6}
        fill={BLUE} {...fade(1.0)}
      />
      <motion.line
        x1={x(KEYSTONE.start + 10)} y1={AXIS - 3} x2={x(KEYSTONE.start + 10)} y2={88}
        stroke={BLUE} strokeOpacity={0.55} strokeDasharray="2 4"
        {...draw(1.0)}
      />
      <motion.g {...fade(1.1)}>
        <text
          x={x(KEYSTONE.start + 10)} y={58} textAnchor="middle"
          fill={INK} fontSize="12" fontWeight="600" fontFamily={MONO}
        >
          {KEYSTONE.time}
        </text>
        <text
          x={x(KEYSTONE.start + 10)} y={73} textAnchor="middle"
          fill={BLUE} fontSize="10" fontFamily={MONO}
        >
          keystone: the day&apos;s one win
        </text>
      </motion.g>

      {/* beats */}
      {DAY_BEATS.map((e, i) => {
        const ex = x(e.t);
        const stemTop = e.hi ? 104 : 130;
        return (
          <g key={e.time}>
            <motion.line
              x1={ex} y1={AXIS} x2={ex} y2={stemTop + 22}
              stroke={BLUE} strokeOpacity={0.55} strokeDasharray="2 4"
              {...draw(0.4 + i * 0.2)}
            />
            <motion.circle
              cx={ex} cy={AXIS} r={4.5} fill={BLUE}
              {...fade(0.5 + i * 0.2)}
            />
            <motion.g {...fade(0.6 + i * 0.2)}>
              <text
                x={ex} y={stemTop} textAnchor="middle"
                fill={INK} fontSize="12" fontWeight="600" fontFamily={MONO}
              >
                {e.time}
              </text>
              <text
                x={ex} y={stemTop + 15} textAnchor="middle"
                fill={BLUE} fontSize="10" fontFamily={MONO}
              >
                {e.label}
              </text>
            </motion.g>
          </g>
        );
      })}

      {/* now */}
      <motion.g {...fade(1.3)}>
        <line
          x1={x(minutes)} y1={44} x2={x(minutes)} y2={AXIS + 34}
          stroke={BLUE} strokeWidth={1} strokeDasharray="1 3" strokeOpacity={0.8}
        />
        <text
          x={Math.min(Math.max(x(minutes), X0 + 24), X1 - 24)}
          y={34}
          textAnchor="middle"
          fill={BLUE} fontSize="10" fontFamily={MONO} letterSpacing="1"
        >
          now {String(now.getHours()).padStart(2, "0")}:
          {String(now.getMinutes()).padStart(2, "0")}
        </text>
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  fig. 04: what mattered is decided in hindsight. The day's         */
/*  memories settle into beliefs overnight.                           */
/* ------------------------------------------------------------------ */

const EPISODES = [70, 120, 180, 235, 300, 355, 405, 470, 530, 585, 640, 700, 760, 815, 865, 920];
const BELIEFS = [200, 420, 640, 830];
const SETTLE: [number, number][] = [
  [180, 200], [235, 200], [405, 420], [470, 420],
  [585, 640], [700, 640], [815, 830], [865, 830],
];

export function MemoryFigure() {
  const { draw, fade } = useFig();
  return (
    <svg
      viewBox="0 0 1000 220"
      className="h-auto w-full"
      role="img"
      aria-label="Two lines: the day's memories below as an untouched record, beliefs above. Dashed curves show selected memories settling into beliefs overnight."
    >
      <motion.text x={48} y={28} fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(0.2)}>
        beliefs: what it holds true, and why
      </motion.text>

      {/* belief line */}
      <motion.line
        x1={48} y1={55} x2={952} y2={55}
        stroke={INK} strokeOpacity={0.5}
        {...draw(0.1)}
      />
      {BELIEFS.map((bx, i) => (
        <motion.circle key={bx} cx={bx} cy={55} r={4.5} fill={BLUE} {...fade(0.9 + i * 0.12)} />
      ))}
      <motion.text x={214} y={59} fill={GRAY} fontSize="9" fontFamily={MONO} {...fade(1.1)}>
        you told it
      </motion.text>
      <motion.text x={654} y={59} fill={GRAY} fontSize="9" fontFamily={MONO} {...fade(1.2)}>
        it concluded
      </motion.text>

      {/* the settling */}
      {SETTLE.map(([ex, bx], i) => (
        <motion.path
          key={`${ex}-${bx}`}
          d={`M${ex},168 Q${(ex + bx) / 2},${(168 + 55) / 2 - 18} ${bx},58`}
          fill="none"
          stroke={BLUE} strokeOpacity={0.45} strokeDasharray="2 4"
          {...draw(0.5 + i * 0.08)}
        />
      ))}

      {/* memory line */}
      <motion.line
        x1={48} y1={170} x2={952} y2={170}
        stroke={GRAY} strokeOpacity={0.5}
        {...draw(0.1)}
      />
      {EPISODES.map((ex, i) => (
        <motion.circle
          key={ex} cx={ex} cy={170} r={2.5}
          fill={GRAY} fillOpacity={0.55} {...fade(0.3 + i * 0.03)}
        />
      ))}
      <motion.text x={48} y={200} fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(0.2)}>
        memories: the record, never edited
      </motion.text>

      <motion.text x={952} y={115} textAnchor="end" fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(1.3)}>
        importance is decided overnight
      </motion.text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  fig. 05: how loud it is allowed to get. Five steps, quietest to   */
/*  loudest; the owner's veto above them all.                         */
/* ------------------------------------------------------------------ */

const RUNGS = [
  { name: "icon", sub: "the menu bar" },
  { name: "banner", sub: "a notification" },
  { name: "voice", sub: "a spoken line" },
  { name: "overlay", sub: "the full screen" },
  { name: "conversation", sub: "full attention" },
];

export function LadderFigure() {
  const { draw, fade } = useFig();
  const x = (i: number) => 140 + i * 180;
  const y = (i: number) => 164 - i * 26;

  const stair = RUNGS.map((_, i) => {
    if (i === 0) return `M${x(0)},${y(0)}`;
    return `L${x(i)},${y(i - 1)} L${x(i)},${y(i)}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 1000 230"
      className="h-auto w-full"
      role="img"
      aria-label="A five-step staircase from quietest to loudest: icon, banner, voice, overlay, conversation, with a horizontal line above labeled 'your veto'"
    >
      {/* the veto line */}
      <motion.line
        x1={60} y1={28} x2={940} y2={28}
        stroke={BLUE} strokeWidth={1.4}
        {...draw(0.1)}
      />
      <motion.text
        x={940} y={18} textAnchor="end"
        fill={BLUE} fontSize="10" fontFamily={MONO} {...fade(0.5)}
      >
        your veto: every step ends here
      </motion.text>

      {/* the staircase */}
      <motion.path
        d={stair}
        fill="none"
        stroke={INK} strokeOpacity={0.45}
        {...draw(0.4)}
      />

      {/* rungs */}
      {RUNGS.map((r, i) => (
        <g key={r.name}>
          <motion.circle cx={x(i)} cy={y(i)} r={4.5} fill={BLUE} {...fade(0.6 + i * 0.15)} />
          <motion.g {...fade(0.7 + i * 0.15)}>
            <text
              x={x(i)} y={200} textAnchor="middle"
              fill={INK} fontSize="11" fontWeight="600" fontFamily={MONO}
            >
              {r.name}
            </text>
            <text
              x={x(i)} y={214} textAnchor="middle"
              fill={GRAY} fontSize="9" fontFamily={MONO}
            >
              {r.sub}
            </text>
          </motion.g>
        </g>
      ))}

      <motion.text x={140} y={146} textAnchor="middle" fill={FAINT} fontSize="9" fontFamily={MONO} {...fade(1.2)}>
        quietest
      </motion.text>
      <motion.text x={860} y={42} textAnchor="middle" fill={FAINT} fontSize="9" fontFamily={MONO} {...fade(1.2)}>
        loudest
      </motion.text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  fig. 06: the event fold. Every signal becomes exactly one event;  */
/*  every event lands in one standing conversation.                   */
/* ------------------------------------------------------------------ */

const EVENT_TICKS = [90, 140, 210, 285, 340, 410, 470, 545, 600, 665, 720, 790, 850, 905];
const EVENT_LABELS: [number, string][] = [
  [90, "time to wake"],
  [410, "you switched apps"],
  [665, "battery"],
  [850, "calendar"],
];
const TURNS = [
  { x: 200, folds: [90, 140, 210, 285] },
  { x: 520, folds: [340, 410, 470, 545, 600] },
  { x: 830, folds: [665, 720, 790, 850, 905] },
];

export function FoldFigure() {
  const { draw, fade } = useFig();
  return (
    <svg
      viewBox="0 0 1000 240"
      className="h-auto w-full"
      role="img"
      aria-label="Events on an upper line fold down into one continuous lower line, a single standing conversation, ending in a nightly digest"
    >
      <motion.text x={48} y={16} fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(0.2)}>
        events: every signal, exactly once
      </motion.text>

      {/* event line */}
      <motion.line
        x1={48} y1={55} x2={952} y2={55}
        stroke={GRAY} strokeOpacity={0.5}
        {...draw(0.1)}
      />
      {EVENT_TICKS.map((ex, i) => (
        <motion.line
          key={ex}
          x1={ex} y1={49} x2={ex} y2={61}
          stroke={INK} strokeOpacity={0.5}
          {...fade(0.3 + i * 0.04)}
        />
      ))}
      {EVENT_LABELS.map(([ex, label], i) => (
        <motion.text
          key={label}
          x={ex} y={40} textAnchor="middle"
          fill={GRAY} fontSize="9" fontFamily={MONO} {...fade(0.5 + i * 0.1)}
        >
          {label}
        </motion.text>
      ))}

      {/* folds */}
      {TURNS.flatMap((turn, ti) =>
        turn.folds.map((ex, i) => (
          <motion.path
            key={`${ti}-${ex}`}
            d={`M${ex},58 Q${(ex + turn.x) / 2},${(58 + 130) / 2} ${turn.x},127`}
            fill="none"
            stroke={BLUE} strokeOpacity={0.4} strokeDasharray="2 4"
            {...draw(0.6 + ti * 0.3 + i * 0.06)}
          />
        ))
      )}

      {/* the standing conversation */}
      <motion.line
        x1={48} y1={130} x2={952} y2={130}
        stroke={BLUE} strokeWidth={1.6}
        {...draw(0.4)}
      />
      {TURNS.map((turn, i) => (
        <motion.circle key={turn.x} cx={turn.x} cy={130} r={5} fill={BLUE} {...fade(0.9 + i * 0.3)} />
      ))}
      <motion.text x={48} y={158} fill={BLUE} fontSize="10" fontFamily={MONO} {...fade(0.8)}>
        mission control: one standing conversation
      </motion.text>

      {/* the nightly digest */}
      <motion.circle cx={952} cy={130} r={4} fill={INK} {...fade(1.6)} />
      <motion.text x={952} y={158} textAnchor="end" fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(1.7)}>
        digest: written nightly by the Companion
      </motion.text>

      <motion.text x={48} y={196} fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(1.1)}>
        the next thought is built from everything before it
      </motion.text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  fig. 07: the merge. Two streams converge; neither is replaced.    */
/* ------------------------------------------------------------------ */

export function MergeFigure() {
  const { draw, fade } = useFig();
  return (
    <svg
      viewBox="0 0 1000 240"
      className="h-auto w-full"
      role="img"
      aria-label="Two curves labeled 'human intelligence' and 'artificial intelligence' converge into a single brighter line labeled 'one flow'"
    >
      <motion.text x={48} y={42} fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(0.3)}>
        artificial intelligence
      </motion.text>
      <motion.text x={48} y={200} fill={INK} fontSize="10" fontFamily={MONO} {...fade(0.3)}>
        human intelligence
      </motion.text>

      {/* machine stream */}
      <motion.path
        d="M48,60 C260,60 400,112 620,118"
        fill="none"
        stroke={GRAY} strokeOpacity={0.7} strokeWidth={1.4}
        {...draw(0.2)}
      />
      {/* human stream */}
      <motion.path
        d="M48,180 C260,180 380,124 620,118"
        fill="none"
        stroke={INK} strokeOpacity={0.8} strokeWidth={1.6}
        {...draw(0.35)}
      />

      {/* convergence */}
      <motion.circle cx={620} cy={118} r={5} fill={BLUE} {...fade(1.0)} />

      {/* one flow */}
      <motion.path
        d="M620,118 C760,114 860,96 952,92"
        fill="none"
        stroke={BLUE} strokeWidth={2.4}
        {...draw(1.1)}
      />
      <motion.text
        x={952} y={72} textAnchor="end"
        fill={BLUE} fontSize="10" fontFamily={MONO} letterSpacing="1" {...fade(1.5)}
      >
        one flow
      </motion.text>
    </svg>
  );
}
