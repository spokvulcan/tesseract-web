"use client";

import { motion } from "framer-motion";
import { INK, BLUE, GRAY, FAINT, MONO, useFig } from "@/components/landing/shared";
import { serif } from "@/components/landing/fonts";

/* ------------------------------------------------------------------ */
/*  Deterministic PRNG, same discipline as the survey's figures:      */
/*  identical render on server and client.                            */
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

function wavePoints(seed: number, x0: number, x1: number, mid: number, amp: number) {
  const rand = mulberry32(seed);
  const pts: string[] = [];
  for (let x = x0; x <= x1; x += 6) {
    const t = (x - x0) / (x1 - x0);
    const envelope = Math.sin(Math.PI * t) * 0.7 + 0.3;
    const y = mid + (rand() * 2 - 1) * amp * envelope;
    pts.push(`${pts.length === 0 ? "M" : "L"}${x},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

/* ------------------------------------------------------------------ */
/*  dictation · fig. 01: from breath to sentence. Speech becomes a    */
/*  rough transcript; the proofread pass stands between what was      */
/*  heard and what is typed.                                          */
/* ------------------------------------------------------------------ */

const DICTATION_WAVE = wavePoints(7, 48, 300, 96, 34);

export function DictationFigure() {
  const { draw, fade } = useFig();
  return (
    <svg
      viewBox="0 0 1000 220"
      className="h-auto w-full"
      role="img"
      aria-label="A spoken waveform becomes a rough transcript, passes through a small proofread model, and is typed into the frontmost app as a clean sentence"
    >
      {/* the speech */}
      <motion.text x={48} y={36} fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(0.2)}>
        you speak
      </motion.text>
      <motion.path d={DICTATION_WAVE} fill="none" stroke={INK} strokeOpacity={0.6} strokeWidth={1.2} {...draw(0.1)} />

      {/* what was heard */}
      <motion.path
        d="M300,96 C340,96 350,96 388,96"
        fill="none" stroke={GRAY} strokeOpacity={0.5} strokeDasharray="2 4"
        {...draw(0.5)}
      />
      <motion.g {...fade(0.7)}>
        <text x={470} y={90} textAnchor="middle" fill={GRAY} fontSize="12" fontFamily={MONO}>
          ill send the draft tonite
        </text>
        <text x={470} y={112} textAnchor="middle" fill={FAINT} fontSize="9" fontFamily={MONO}>
          heard · verbatim
        </text>
      </motion.g>

      {/* the proofread pass */}
      <motion.rect x={588} y={62} width={150} height={64} fill="none" stroke={BLUE} strokeOpacity={0.6} {...draw(0.9)} />
      <motion.g {...fade(1.1)}>
        <text x={663} y={90} textAnchor="middle" fill={BLUE} fontSize="10" fontFamily={MONO} letterSpacing="1">
          proofread pass
        </text>
        <text x={663} y={108} textAnchor="middle" fill={GRAY} fontSize="8.5" fontFamily={MONO}>
          a second, tiny model
        </text>
      </motion.g>
      <motion.path
        d="M552,96 L588,96"
        fill="none" stroke={GRAY} strokeOpacity={0.5} strokeDasharray="2 4"
        {...draw(0.9)}
      />

      {/* what is typed */}
      <motion.path d="M738,96 L774,96" fill="none" stroke={BLUE} strokeOpacity={0.7} {...draw(1.3)} />
      <motion.g {...fade(1.4)}>
        <text x={862} y={90} textAnchor="middle" fill={INK} fontSize="14" className={`${serif.className} italic`}>
          I&apos;ll send the draft tonight.
        </text>
        <text x={862} y={112} textAnchor="middle" fill={BLUE} fontSize="9" fontFamily={MONO}>
          typed into the app in front
        </text>
      </motion.g>

      {/* the held keys */}
      <motion.line x1={48} y1={172} x2={300} y2={172} stroke={BLUE} strokeWidth={1.6} {...draw(0.2)} />
      <motion.g {...fade(0.4)}>
        <text x={48} y={192} fill={BLUE} fontSize="10" fontFamily={MONO}>
          hold ⌥ space
        </text>
        <text x={300} y={192} textAnchor="middle" fill={GRAY} fontSize="10" fontFamily={MONO}>
          release
        </text>
      </motion.g>
      <motion.text x={952} y={192} textAnchor="end" fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(1.6)}>
        nothing left the Mac
      </motion.text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  voice · fig. 01: the read. The highlight walks the sentence as    */
/*  the voice speaks it; generation runs ahead of playback.           */
/* ------------------------------------------------------------------ */

const VOICE_WAVE_PLAYED = wavePoints(21, 48, 430, 150, 30);
const VOICE_WAVE_READY = wavePoints(22, 430, 720, 150, 30);

export function VoiceFigure() {
  const { draw, fade } = useFig();
  return (
    <svg
      viewBox="0 0 1000 220"
      className="h-auto w-full"
      role="img"
      aria-label="A sentence with one word highlighted, a waveform beneath it with a playhead, generated audio running ahead of playback, and the rest still to come"
    >
      {/* the sentence being read */}
      <motion.g {...fade(0.2)}>
        <text x={48} y={58} fill={INK} fontSize="19" className={`${serif.className} italic`}>
          The voice is <tspan fill={BLUE}>made</tspan> here, on this machine.
        </text>
      </motion.g>
      <motion.line x1={166} y1={68} x2={216} y2={68} stroke={BLUE} strokeWidth={1.6} {...draw(0.5)} />
      <motion.text x={166} y={86} fill={BLUE} fontSize="9" fontFamily={MONO} {...fade(0.6)}>
        the word being spoken
      </motion.text>

      {/* played audio */}
      <motion.path d={VOICE_WAVE_PLAYED} fill="none" stroke={BLUE} strokeWidth={1.4} {...draw(0.3)} />
      {/* generated, waiting to play */}
      <motion.path d={VOICE_WAVE_READY} fill="none" stroke={INK} strokeOpacity={0.4} strokeWidth={1.2} {...draw(0.7)} />
      {/* still to come */}
      <motion.line
        x1={726} y1={150} x2={952} y2={150}
        stroke={GRAY} strokeOpacity={0.5} strokeDasharray="1 5"
        {...draw(1.0)}
      />

      {/* playhead */}
      <motion.line x1={430} y1={112} x2={430} y2={186} stroke={BLUE} strokeWidth={1.2} {...draw(0.9)} />
      <motion.text x={430} y={204} textAnchor="middle" fill={BLUE} fontSize="10" fontFamily={MONO} {...fade(1.1)}>
        playing
      </motion.text>

      {/* generation frontier */}
      <motion.line
        x1={720} y1={118} x2={720} y2={182}
        stroke={INK} strokeOpacity={0.45} strokeDasharray="2 4"
        {...draw(1.2)}
      />
      <motion.text x={720} y={204} textAnchor="middle" fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(1.3)}>
        already generated
      </motion.text>
      <motion.text x={952} y={204} textAnchor="end" fill={FAINT} fontSize="10" fontFamily={MONO} {...fade(1.4)}>
        still to come
      </motion.text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  chat · fig. 01: continuity. A fact mentioned in March, carried    */
/*  as a belief, shaping an answer in July.                           */
/* ------------------------------------------------------------------ */

const RECALL_TICKS = [130, 210, 350, 470, 560, 680, 760];

export function RecallFigure() {
  const { draw, fade } = useFig();
  return (
    <svg
      viewBox="0 0 1000 250"
      className="h-auto w-full"
      role="img"
      aria-label="A timeline from March to July with conversation ticks; one remark in March arcs forward into an answer given today"
    >
      {/* the months */}
      <motion.line x1={48} y1={170} x2={952} y2={170} stroke={INK} strokeOpacity={0.5} strokeWidth={1.2} {...draw(0.1)} />
      {[
        [90, "mar"],
        [290, "apr"],
        [490, "may"],
        [690, "jun"],
        [890, "jul"],
      ].map(([x, m], i) => (
        <motion.g key={m} {...fade(0.3 + i * 0.06)}>
          <line x1={Number(x)} y1={170} x2={Number(x)} y2={180} stroke={INK} strokeOpacity={0.45} />
          <text x={Number(x)} y={198} textAnchor="middle" fill={GRAY} fontSize="10" fontFamily={MONO}>
            {m}
          </text>
        </motion.g>
      ))}

      {/* ordinary conversations, remembered or let go */}
      {RECALL_TICKS.map((x, i) => (
        <motion.line
          key={x}
          x1={x} y1={165} x2={x} y2={175}
          stroke={GRAY} strokeOpacity={0.6}
          {...fade(0.4 + i * 0.05)}
        />
      ))}

      {/* the remark */}
      <motion.circle cx={160} cy={170} r={4.5} fill={BLUE} {...fade(0.7)} />
      <motion.g {...fade(0.8)}>
        <text x={160} y={135} textAnchor="middle" fill={INK} fontSize="13" className={`${serif.className} italic`}>
          &ldquo;my rent is due on the 3rd&rdquo;
        </text>
        <text x={160} y={152} textAnchor="middle" fill={FAINT} fontSize="8.5" fontFamily={MONO}>
          said once, in march
        </text>
      </motion.g>

      {/* the carry */}
      <motion.path
        d="M160,166 C360,60 700,60 898,162"
        fill="none" stroke={BLUE} strokeOpacity={0.5} strokeDasharray="2 4"
        {...draw(1.0)}
      />
      <motion.text x={520} y={52} textAnchor="middle" fill={BLUE} fontSize="10" fontFamily={MONO} {...fade(1.3)}>
        carried as a belief, sources attached
      </motion.text>

      {/* the answer */}
      <motion.circle cx={900} cy={170} r={4.5} fill={BLUE} {...fade(1.5)} />
      <motion.g {...fade(1.6)}>
        <text x={900} y={224} textAnchor="end" fill={INK} fontSize="13" className={`${serif.className} italic`}>
          &ldquo;Tomorrow is the 3rd. Rent.&rdquo;
        </text>
        <text x={900} y={241} textAnchor="end" fill={BLUE} fontSize="8.5" fontFamily={MONO}>
          an answer in july, unprompted by you re-explaining
        </text>
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  appshot · fig. 01: from window to question. The frontmost window  */
/*  is captured whole, staged in the chat, and named.                 */
/* ------------------------------------------------------------------ */

export function AppshotFigure() {
  const { draw, fade } = useFig();
  return (
    <svg
      viewBox="0 0 1000 260"
      className="h-auto w-full"
      role="img"
      aria-label="A Slack window is captured by a double tap of the command key and lands in the chat composer as a named image beside a typed question"
    >
      {/* the window */}
      <motion.rect x={60} y={44} width={330} height={170} fill="none" stroke={INK} strokeOpacity={0.55} {...draw(0.1)} />
      <motion.line x1={60} y1={74} x2={390} y2={74} stroke={INK} strokeOpacity={0.35} {...draw(0.3)} />
      <motion.g {...fade(0.4)}>
        {[78, 92, 106].map((cx) => (
          <circle key={cx} cx={cx} cy={59} r={3.5} fill="none" stroke={GRAY} strokeOpacity={0.7} />
        ))}
        <text x={225} y={63} textAnchor="middle" fill={GRAY} fontSize="10" fontFamily={MONO}>
          Slack · #launch
        </text>
      </motion.g>
      {/* the draft inside the window */}
      <motion.g {...fade(0.5)}>
        {[
          [100, 190],
          [116, 260],
          [132, 220],
          [164, 150],
        ].map(([y, w]) => (
          <line key={y} x1={84} y1={y} x2={84 + Number(w)} y2={y} stroke={GRAY} strokeOpacity={0.45} strokeWidth={5} />
        ))}
      </motion.g>

      {/* the capture */}
      <motion.rect
        x={48} y={32} width={354} height={194}
        fill="none" stroke={BLUE} strokeOpacity={0.7} strokeDasharray="4 5"
        {...draw(0.7)}
      />
      <motion.text x={48} y={248} fill={BLUE} fontSize="10" fontFamily={MONO} {...fade(0.9)}>
        ⌘ ⌘ · the frontmost window, whole
      </motion.text>

      {/* the flight */}
      <motion.path
        d="M402,128 C470,128 480,128 540,128"
        fill="none" stroke={BLUE} strokeOpacity={0.5} strokeDasharray="2 4"
        {...draw(1.0)}
      />

      {/* the composer */}
      <motion.rect x={552} y={92} width={400} height={72} fill="none" stroke={INK} strokeOpacity={0.55} {...draw(1.1)} />
      <motion.rect x={568} y={108} width={168} height={40} fill="none" stroke={BLUE} strokeOpacity={0.7} {...draw(1.3)} />
      <motion.g {...fade(1.4)}>
        <text x={652} y={132} textAnchor="middle" fill={BLUE} fontSize="9.5" fontFamily={MONO}>
          Appshot of Slack
        </text>
        <text x={756} y={133} fill={INK} fontSize="13" className={`${serif.className} italic`}>
          tighten this reply
        </text>
      </motion.g>
      <motion.text x={952} y={188} textAnchor="end" fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(1.6)}>
        staged, named, waiting for your question
      </motion.text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  server · fig. 01: the cache. The prefix you already paid for      */
/*  stays paid for; only the new tokens are work.                     */
/* ------------------------------------------------------------------ */

export function CacheFigure() {
  const { draw, fade } = useFig();
  return (
    <svg
      viewBox="0 0 1000 250"
      className="h-auto w-full"
      role="img"
      aria-label="A request's context bar, most of it marked as reused prefix, a small tail as new tokens; below it RAM and SSD cache tiers exchanging prefixes at 0.87 gigabytes per second"
    >
      <motion.text x={48} y={26} fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(0.2)}>
        one request&apos;s context
      </motion.text>

      {/* the context bar */}
      <motion.rect x={48} y={40} width={640} height={26} fill={BLUE} fillOpacity={0.22} {...fade(0.4)} />
      <motion.rect x={48} y={40} width={904} height={26} fill="none" stroke={INK} strokeOpacity={0.5} {...draw(0.3)} />
      <motion.line x1={688} y1={40} x2={688} y2={66} stroke={INK} strokeOpacity={0.5} {...draw(0.5)} />
      <motion.g {...fade(0.6)}>
        <text x={368} y={57} textAnchor="middle" fill={BLUE} fontSize="10" fontFamily={MONO} letterSpacing="1">
          prefix · already computed, reused
        </text>
        <text x={820} y={57} textAnchor="middle" fill={GRAY} fontSize="10" fontFamily={MONO}>
          new tokens · the only work
        </text>
      </motion.g>

      {/* the reuse arrow */}
      <motion.path
        d="M368,110 C368,92 368,84 368,72"
        fill="none" stroke={BLUE} strokeOpacity={0.6} strokeDasharray="2 4"
        {...draw(0.8)}
      />

      {/* the tiers */}
      <motion.rect x={228} y={116} width={280} height={54} fill="none" stroke={BLUE} strokeOpacity={0.7} {...draw(0.9)} />
      <motion.g {...fade(1.0)}>
        <text x={368} y={140} textAnchor="middle" fill={BLUE} fontSize="10" fontFamily={MONO} letterSpacing="1">
          RAM · hot prefixes
        </text>
        <text x={368} y={158} textAnchor="middle" fill={GRAY} fontSize="8.5" fontFamily={MONO}>
          radix tree, shared across requests
        </text>
      </motion.g>

      <motion.rect x={228} y={196} width={280} height={44} fill="none" stroke={INK} strokeOpacity={0.45} {...draw(1.1)} />
      <motion.text x={368} y={222} textAnchor="middle" fill={GRAY} fontSize="10" fontFamily={MONO} {...fade(1.2)}>
        SSD · older prefixes
      </motion.text>

      {/* the elevator between tiers */}
      <motion.path d="M540,143 C600,143 600,218 540,218" fill="none" stroke={BLUE} strokeOpacity={0.5} {...draw(1.3)} />
      <motion.g {...fade(1.45)}>
        <text x={620} y={185} fill={INK} fontSize="12" fontWeight="600" fontFamily={MONO}>
          0.87 GB/s
        </text>
        <text x={620} y={202} fill={GRAY} fontSize="8.5" fontFamily={MONO}>
          rehydrating from disk
        </text>
      </motion.g>

      <motion.text x={952} y={222} textAnchor="end" fill={BLUE} fontSize="10" fontFamily={MONO} {...fade(1.6)}>
        reused context: ~50× cheaper than re-prefilling
      </motion.text>
    </svg>
  );
}
