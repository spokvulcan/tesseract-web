"use client";

import { useId, useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { INK, BLUE, GRAY, PAPER, MONO, VIEWPORT, useFig } from "./shared";

/* Product vignettes for the survey's feature blocks. Each one is a
   small window drawn in SVG, showing the feature in the act: text
   typing itself, a window landing in the chat, pills fanning out.
   They follow the paper's palette through CSS variables and go still
   under reduced motion. Nothing here is a screenshot; every scene is
   drawn, like the app's own onboarding diagrams. */

const W = 480;

/** Width of mono text at a given font size (Space Mono is 0.6 em wide). */
const monoWidth = (text: string, fontSize: number) => text.length * fontSize * 0.6;

/* ------------------------------------------------------------------ */
/*  Shared parts: window chrome, a frame around a scene, keycaps,     */
/*  the chat composer, a staged thumbnail, and self-typing text.      */
/* ------------------------------------------------------------------ */

function WindowChrome({
  x = 0,
  y = 0,
  w = W,
  h,
  title,
  r = 4,
  strokeOpacity = 0.2,
}: {
  x?: number;
  y?: number;
  w?: number;
  h: number;
  title: string;
  r?: number;
  strokeOpacity?: number;
}) {
  const bar = y + 30;
  return (
    <g>
      <rect
        x={x + 0.5}
        y={y + 0.5}
        width={w - 1}
        height={h - 1}
        rx={10}
        fill={PAPER}
        stroke={INK}
        strokeOpacity={strokeOpacity}
      />
      <line x1={x} y1={bar} x2={x + w} y2={bar} stroke={INK} strokeOpacity={0.12} />
      {[16, 30, 44].map((cx) => (
        <circle key={cx} cx={x + cx} cy={y + 15} r={r} fill="none" stroke={INK} strokeOpacity={0.3} />
      ))}
      <text x={x + 60} y={y + 19} fill={GRAY} fontSize="10" fontFamily={MONO}>
        {title}
      </text>
    </g>
  );
}

function Frame({
  title,
  h = 300,
  label,
  children,
}: {
  title: string;
  h?: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <svg viewBox={`0 0 ${W} ${h}`} className="h-auto w-full" role="img" aria-label={label}>
      <WindowChrome h={h} title={title} />
      {children}
    </svg>
  );
}

function Keycap({ x, y, label, w = 26 }: { x: number; y: number; label: string; w?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={22} rx={4} fill={BLUE} fillOpacity={0.14} stroke={BLUE} strokeOpacity={0.8} />
      <text x={x + w / 2} y={y + 15} textAnchor="middle" fill={BLUE} fontSize="10" fontFamily={MONO}>
        {label}
      </text>
    </g>
  );
}

/** The chat composer: a rounded field across the bottom of a scene. */
function Composer({ y, h, rx = 10 }: { y: number; h: number; rx?: number }) {
  return <rect x={24} y={y} width={432} height={h} rx={rx} fill="none" stroke={INK} strokeOpacity={0.2} />;
}

/** A staged image inside the composer: a small window with text lines. */
function Thumb({ x, y, w, h, lines }: { x: number; y: number; w: number; h: number; lines: number[] }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={INK} fillOpacity={0.06} stroke={INK} strokeOpacity={0.35} />
      {lines.map((lw, i) => (
        <rect key={i} x={x + 8} y={y + 10 + i * 8} width={lw} height={2.5} rx={1} fill={INK} fillOpacity={0.25} />
      ))}
    </g>
  );
}

/** Text that types itself: a clip rectangle grows across its children.
    The observed element is a rendered group, not the clip path, so the
    reveal fires on scroll like every other figure. */
function Typed({
  x, y, w, h, delay, duration, children,
}: {
  x: number; y: number; w: number; h: number; delay: number; duration: number; children: ReactNode;
}) {
  const id = useId();
  const { reduced } = useFig();
  return (
    <motion.g initial="hidden" whileInView="shown" viewport={VIEWPORT}>
      <clipPath id={id}>
        <motion.rect
          x={x}
          y={y}
          height={h}
          variants={{ hidden: { width: reduced ? w : 0 }, shown: { width: w } }}
          transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: "linear" }}
        />
      </clipPath>
      <g clipPath={`url(#${id})`}>{children}</g>
    </motion.g>
  );
}

/* ------------------------------------------------------------------ */
/*  dictation: hold the keys, speak, and the sentence lands in a      */
/*  text field of some other app.                                     */
/* ------------------------------------------------------------------ */

const WAVE = [6, 14, 22, 12, 28, 18, 8, 24, 30, 16, 10, 26, 20, 12, 30, 22, 8, 18, 26, 14, 10, 20, 12, 6];

export function DictationVignette() {
  const { reduced, fade } = useFig();
  const waveRef = useRef<SVGGElement>(null);
  const waveIn = useInView(waveRef, VIEWPORT);
  const waveClass = reduced ? "wave wave-still" : waveIn ? "wave wave-on" : "wave";
  return (
    <Frame title="Notes" label="A text field in another app filling with a dictated sentence while option and space are held and a waveform pulses">
      <rect x={24} y={50} width={432} height={140} rx={6} fill="none" stroke={INK} strokeOpacity={0.2} />
      <Typed x={40} y={60} w={400} h={70} delay={0.9} duration={1.8}>
        <text x={40} y={86} fill={INK} fontSize="15" fontWeight="300">
          Move the review to tomorrow morning,
        </text>
        <text x={40} y={110} fill={INK} fontSize="15" fontWeight="300">
          and ask Ana whether the draft is ready.
        </text>
      </Typed>
      <motion.rect x={331} y={97} width={1.5} height={16} fill={BLUE} {...fade(2.7, 0.3)} />

      <motion.g {...fade(0.2)}>
        <Keycap x={24} y={228} label="⌥" />
        <Keycap x={56} y={228} label="space" w={56} />
        <text x={24} y={268} fill={GRAY} fontSize="9" fontFamily={MONO} letterSpacing="1">
          hold · speak · release
        </text>
      </motion.g>

      <g ref={waveRef} className={waveClass}>
        {WAVE.map((h, i) => (
          <rect
            key={i}
            x={150 + i * 8}
            y={239 - h / 2}
            width={3}
            height={h}
            rx={1.5}
            fill={BLUE}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </g>

      <motion.g {...fade(3.0)}>
        <text x={456} y={243} textAnchor="end" fill={BLUE} fontSize="10" fontFamily={MONO}>
          proofread ✓
        </text>
        <text x={456} y={268} textAnchor="end" fill={GRAY} fontSize="9" fontFamily={MONO} letterSpacing="1">
          on this mac
        </text>
      </motion.g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/*  chat: a question, a streamed answer, and the memory it came from. */
/* ------------------------------------------------------------------ */

export function ChatVignette() {
  const { fade } = useFig();
  return (
    <Frame title="Tesseract" label="A chat window: a question about a launch date, an answer that streams in, and a memory card citing two earlier conversations">
      <motion.g {...fade(0.2)}>
        <rect x={188} y={46} width={268} height={34} rx={8} fill={INK} fillOpacity={0.06} />
        <text x={204} y={68} fill={INK} fontSize="13" fontWeight="300">
          When did I say the launch moves?
        </text>
      </motion.g>

      <Typed x={24} y={94} w={420} h={56} delay={0.9} duration={1.6}>
        <text x={24} y={118} fill={INK} fontSize="13" fontWeight="300">
          To the 14th. You decided that on Tuesday,
        </text>
        <text x={24} y={138} fill={INK} fontSize="13" fontWeight="300">
          right after the call with Ana.
        </text>
      </Typed>

      <motion.g {...fade(2.4)}>
        <rect x={24} y={158} width={318} height={70} rx={6} fill="none" stroke={BLUE} strokeOpacity={0.5} strokeDasharray="3 3" />
        <text x={38} y={178} fill={BLUE} fontSize="10" fontFamily={MONO}>
          from memory · 2 sources
        </text>
        <text x={38} y={198} fill={GRAY} fontSize="10" fontFamily={MONO}>
          “let’s push launch to the 14th” · tue 09:15
        </text>
        <text x={38} y={214} fill={GRAY} fontSize="10" fontFamily={MONO}>
          “Ana is fine with the 14th” · tue 09:41
        </text>
      </motion.g>

      <motion.g {...fade(0.4)}>
        <Composer y={246} h={34} rx={17} />
        <text x={42} y={267} fill={GRAY} fontSize="12" fontWeight="300">
          Type, talk, or drop an image
        </text>
        <circle cx={436} cy={263} r={7} fill="none" stroke={INK} strokeOpacity={0.4} />
        <rect x={434} y={258} width={4} height={7} rx={2} fill={INK} fillOpacity={0.5} />
      </motion.g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/*  appshot: both command keys, and the frontmost window drops into   */
/*  the chat, named after the app it came from.                       */
/* ------------------------------------------------------------------ */

const MAIL_LINES: [number, number][] = [
  [92, 220], [108, 240], [124, 180], [140, 232], [156, 150], [172, 200],
];

export function AppshotVignette() {
  const { anim, fade } = useFig();
  return (
    <Frame title="Tesseract" label="A mail window lifts off the desk and lands in the chat composer as a small labeled thumbnail while both command keys are pressed">
      {/* the window being captured: it sinks away once the shot is taken */}
      <motion.g {...anim({ y: 0, opacity: 1 }, { y: 36, opacity: 0 }, { delay: 1.3, duration: 0.7, rest: { y: 0, opacity: 1 } })}>
        <WindowChrome x={40} y={48} w={272} h={150} title="Mail · Re: contract" r={3} strokeOpacity={0.3} />
        {MAIL_LINES.map(([y, lw]) => (
          <rect key={y} x={56} y={y} width={lw} height={6} rx={3} fill={INK} fillOpacity={0.12} />
        ))}
      </motion.g>

      <motion.g {...fade(0.2)}>
        <Keycap x={356} y={48} label="⌘" w={40} />
        <Keycap x={404} y={48} label="⌘" w={40} />
        <text x={444} y={92} textAnchor="end" fill={GRAY} fontSize="9" fontFamily={MONO} letterSpacing="1">
          both, together
        </text>
      </motion.g>

      {/* the composer it lands in */}
      <motion.g {...fade(0.3)}>
        <Composer y={216} h={64} />
      </motion.g>
      <motion.g {...anim({ opacity: 0, y: -14 }, { opacity: 1, y: 0 }, { delay: 1.8 })}>
        <Thumb x={36} y={226} w={64} h={44} lines={[40, 48, 30, 44]} />
        <text x={112} y={246} fill={INK} fontSize="11" fontFamily={MONO}>
          Mail · Re: contract
        </text>
        <text x={112} y={264} fill={GRAY} fontSize="12" fontWeight="300">
          What is he actually asking for here?
        </text>
      </motion.g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/*  skills: the ✦ button above the composer fans out into pills,     */
/*  most used nearest. Your own skills sit in a folder beside them.   */
/* ------------------------------------------------------------------ */

const PILLS = (() => {
  const names = ["explain", "proofread", "reply", "summarize", "translate"];
  let cursor = W - 24 - 40;
  return names.map((name) => {
    const w = monoWidth(name, 10) + 22;
    cursor -= w + 8;
    return { name, x: cursor, w };
  });
})();

const SKILL_FILES = ["proofread", "reply", "summarize", "explain", "translate"];

export function SkillsVignette() {
  const { anim, fade } = useFig();
  return (
    <Frame title="Tesseract" label="Five skill pills fan out to the left of a sparkle button above the chat composer, with explain highlighted; a folder listing shows a user's own skill file beside the built-in ones">
      <motion.g {...fade(0.2)}>
        <text x={24} y={62} fill={GRAY} fontSize="9" fontFamily={MONO} letterSpacing="1">
          skills/
        </text>
        {SKILL_FILES.map((f, i) => (
          <text key={f} x={40} y={82 + i * 16} fill={GRAY} fontSize="10" fontFamily={MONO}>
            {f}/SKILL.md
          </text>
        ))}
        <text x={40} y={82 + SKILL_FILES.length * 16} fill={BLUE} fontSize="10" fontFamily={MONO}>
          my-standup/SKILL.md
        </text>
        <text x={190} y={162} fill={BLUE} fontSize="9" fontFamily={MONO} letterSpacing="1">
          ← yours
        </text>
      </motion.g>

      {/* the ✦ button */}
      <motion.g {...fade(0.4)}>
        <circle cx={W - 40} cy={198} r={16} fill={PAPER} stroke={INK} strokeOpacity={0.3} />
        <text x={W - 40} y={203} textAnchor="middle" fill={BLUE} fontSize="14">
          ✦
        </text>
      </motion.g>

      {PILLS.map(({ name, x, w }, i) => {
        const hi = i === 0;
        return (
          <motion.g key={name} {...anim({ opacity: 0, x: 18 }, { opacity: 1, x: 0 }, { delay: 0.8 + i * 0.12, duration: 0.5 })}>
            <rect
              x={x}
              y={186}
              width={w}
              height={24}
              rx={12}
              fill={hi ? BLUE : PAPER}
              fillOpacity={hi ? 0.14 : 1}
              stroke={hi ? BLUE : INK}
              strokeOpacity={hi ? 0.8 : 0.3}
            />
            <text x={x + w / 2} y={202} textAnchor="middle" fill={hi ? BLUE : INK} fontSize="10" fontFamily={MONO}>
              {name}
            </text>
          </motion.g>
        );
      })}

      <motion.g {...fade(0.3)}>
        <Composer y={224} h={56} />
        <Thumb x={36} y={234} w={48} h={36} lines={[30, 34, 22]} />
        <text x={96} y={250} fill={INK} fontSize="11" fontFamily={MONO}>
          Terminal · build.log
        </text>
        <text x={96} y={267} fill={GRAY} fontSize="12" fontWeight="300">
          tap explain, and it does
        </text>
      </motion.g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/*  voice: a selection read aloud, the highlight sweeping the lines   */
/*  as they are spoken, in a voice you described in a sentence.       */
/* ------------------------------------------------------------------ */

const READ_LINES = [
  "The committee met on Thursday and agreed",
  "to move the whole schedule by one week,",
  "which gives the design team room to breathe.",
];
const READ_SPEED = 0.13 / 7.2; // seconds per pixel, so each line takes as long as its words
const READ_SWEEP = (() => {
  let start = 0.6;
  return READ_LINES.map((line) => {
    const width = monoWidth(line, 12);
    const duration = width * READ_SPEED;
    const delay = start;
    start += duration;
    return { width, delay, duration };
  });
})();

export function VoiceVignette() {
  const { anim, fade, draw } = useFig();
  return (
    <Frame title="Safari · article" label="Three lines of an article with a highlight sweeping across them as they are read aloud; a field below describes the voice as a warm, friendly narrator; a transport bar shows playback">
      {READ_LINES.map((line, li) => {
        const y = 70 + li * 22;
        const { width: lw, delay, duration } = READ_SWEEP[li];
        return (
          <g key={li}>
            <motion.rect
              x={39}
              y={y - 12}
              height={16}
              rx={2}
              fill={BLUE}
              fillOpacity={0.18}
              {...anim({ width: 0 }, { width: lw + 2 }, { delay, duration, ease: "linear" })}
            />
            <text x={40} y={y} fill={INK} fontSize="12" fontFamily={MONO}>
              {line}
            </text>
          </g>
        );
      })}

      <motion.g {...fade(0.2)}>
        <Keycap x={372} y={148} label="fn" w={32} />
        <Keycap x={410} y={148} label="space" w={46} />
      </motion.g>

      <motion.g {...fade(0.3)}>
        <text x={24} y={158} fill={GRAY} fontSize="9" fontFamily={MONO} letterSpacing="1">
          voice
        </text>
        <rect x={24} y={166} width={300} height={30} rx={6} fill="none" stroke={INK} strokeOpacity={0.2} />
        <text x={36} y={185} fill={INK} fontSize="12" fontWeight="300">
          a warm, friendly narrator, unhurried
        </text>
      </motion.g>

      <motion.g {...fade(0.4)}>
        <Composer y={228} h={44} rx={22} />
        <path d="M46 242 L58 250 L46 258 Z" fill={INK} fillOpacity={0.7} />
        <line x1={76} y1={250} x2={400} y2={250} stroke={INK} strokeOpacity={0.15} strokeWidth={2} strokeLinecap="round" />
        <text x={440} y={254} textAnchor="end" fill={GRAY} fontSize="10" fontFamily={MONO}>
          0:14
        </text>
      </motion.g>
      <motion.line
        x1={76} y1={250} x2={400} y2={250}
        stroke={BLUE} strokeWidth={2} strokeLinecap="round"
        {...draw(0.6, 3.6)}
      />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/*  the server: one terminal, one local address, every harness.       */
/* ------------------------------------------------------------------ */

const TERMINAL: [string, string][] = [
  ["$ curl -s http://127.0.0.1:8321/v1/models", INK],
  ['{ "data": [ { "id": "qwen3.6-27b" } ] }', GRAY],
  ["", GRAY],
  ["$ pi           → 127.0.0.1:8321", INK],
  ["$ claude       → 127.0.0.1:8321", INK],
  ["$ opencode     → 127.0.0.1:8321", INK],
];

export function ServerVignette() {
  const { fade } = useFig();
  return (
    <Frame title="terminal" h={200} label="A terminal listing the local models endpoint answering on port 8321, then three coding harnesses pointed at the same local address">
      {TERMINAL.map(([line, color], i) => (
        <motion.text key={i} x={24} y={62 + i * 20} fill={color} fontSize="11" fontFamily={MONO} {...fade(0.2 + i * 0.25)}>
          {line}
        </motion.text>
      ))}
      <motion.text x={456} y={182} textAnchor="end" fill={BLUE} fontSize="9" fontFamily={MONO} letterSpacing="1" {...fade(1.9)}>
        never leaves localhost
      </motion.text>
    </Frame>
  );
}
