"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { HeroButtons } from "@/components/hero-buttons";
import TesseractViz from "@/components/tesseract-viz";
import { Navigation } from "@/components/navigation";
import {
  Mic,
  Volume2,
  Bot,
  Image as ImageIcon,
  ArrowDown,
  Cpu,
  WifiOff,
  UserX,
  EyeOff,
  Eye,
  Lock,
  Server,
  Zap,
  Layers,
  Plug,
  Terminal,
  Network,
  Globe,
  Key,
  Code2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  SCROLL PROGRESS                                                    */
/* ------------------------------------------------------------------ */

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? el.scrollTop / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="scroll-progress bg-[#111] dark:bg-[#f0f0f0]"
      style={{
        transform: `scaleX(${progress})`,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  NOISE OVERLAY                                                      */
/* ------------------------------------------------------------------ */

function Noise() {
  return (
    <svg className="noise" aria-hidden="true">
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURE CARD                                                       */
/* ------------------------------------------------------------------ */

function FeatureCard({
  title,
  description,
  tags,
  icon: Icon,
  delay = 0,
}: {
  title: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group">
        <Icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors mb-6" />

        <h3 className="font-display text-3xl tracking-tight mb-4">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-3 py-1.5 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  INFERENCE SERVER                                                    */
/* ------------------------------------------------------------------ */

function InferenceServerSection() {
  return (
    <section className="bg-background dark:bg-[#0a0a0a] py-32 lg:py-48">
      <div className="px-8 lg:px-16 xl:px-24 max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-16">
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-foreground">
              Your models.
              <br />
              Your endpoint.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
            {/* HERO CARD — Server network visualization (2x2) */}
            <div className="md:col-span-2 md:row-span-2 rounded-2xl border border-border bg-secondary/30 p-8 lg:p-10 min-h-[400px] flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Inference Server
                </span>
              </div>
              <ServerNetwork />
            </div>

            {/* Main endpoint */}
            <div className="md:col-span-2 rounded-2xl border border-border bg-secondary/30 p-8 lg:p-10 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Primary Endpoint</span>
              </div>
              <div>
                <code className="font-mono text-xl tracking-tight text-foreground">
                  /v1/chat/completions
                </code>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                  Streaming &amp; non-streaming completions. Honors request.model.
                  Point any OpenAI SDK at localhost and go.
                </p>
              </div>
            </div>

            {/* Endpoint: models */}
            <div className="md:col-span-1 rounded-2xl border border-border bg-secondary/30 p-6 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center gap-3 mb-4">
                <Network className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Registry</span>
              </div>
              <div>
                <code className="font-mono text-lg text-foreground">/v1/models</code>
                <p className="text-muted-foreground text-xs mt-2">Lists downloaded agent models</p>
              </div>
            </div>

            {/* Endpoint: health */}
            <div className="md:col-span-1 rounded-2xl border border-border bg-secondary/30 p-6 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Health</span>
              </div>
              <div>
                <code className="font-mono text-lg text-foreground">/health</code>
                <p className="text-muted-foreground text-xs mt-2">Server health check</p>
              </div>
            </div>

            {/* Feature: Prefix caching */}
            <div className="md:col-span-1 rounded-2xl border border-border bg-secondary/30 p-6 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Speed</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tiered RAM &amp; SSD prefix caching. Repeated prompts skip prefill entirely — lightning fast responses.
              </p>
            </div>

            {/* Feature: MLX */}
            <div className="md:col-span-1 rounded-2xl border border-border bg-secondary/30 p-6 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Engine</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Apple's MLX framework. Same model drives both the agent and the server — zero cloud dependency.
              </p>
            </div>

            {/* Feature: Privacy */}
            <div className="md:col-span-1 rounded-2xl border border-border bg-secondary/30 p-6 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Privacy</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No accounts. No telemetry. No API calls. Your data never leaves your Mac.
              </p>
            </div>

            {/* Feature: Offline */}
            <div className="md:col-span-1 rounded-2xl border border-border bg-secondary/30 p-6 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Offline</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full offline operation after initial model download. Works without internet.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Animated server network visualization */
function ServerNetwork() {
  const clients = [
    { name: "OpenCode", desc: "Tool-calling IDE" },
    { name: "Aider", desc: "Git-aware pair programming" },
    { name: "Continue", desc: "VS Code & JetBrains" },
    { name: "Claude Code", desc: "CLI agent" },
    { name: "Cursor", desc: "AI-first editor" },
  ];

  const radius = 130;
  const iconOffset = 36;
  const containerRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCenter({ x: rect.width / 2, y: rect.height / 2 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full h-full" style={{ minHeight: 320 }}>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.06), 0 0 40px rgba(255,255,255,0.03); }
          50% { box-shadow: 0 0 30px rgba(255,255,255,0.12), 0 0 60px rgba(255,255,255,0.06); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -24; }
        }
        .server-pulse {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .network-rotate {
          animation: rotate-slow 60s linear infinite;
        }
        .network-rotate-reverse {
          animation: rotate-slow 80s linear infinite reverse;
        }
        .dash-flow {
          animation: dash-flow 2s linear infinite;
        }
      `}</style>

      <div className="absolute w-[280px] h-[280px] rounded-full border border-border/30 network-rotate" />
      <div className="absolute w-[200px] h-[200px] rounded-full border border-border/20 network-rotate-reverse" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${center.x * 2} ${center.y * 2}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {clients.map((_, i) => {
          const angle = (i / clients.length) * Math.PI * 2 - Math.PI / 2;
          const x = center.x + Math.cos(angle) * radius;
          const y = center.y + Math.sin(angle) * radius - iconOffset;
          return (
            <line
              key={i}
              x1={center.x}
              y1={center.y}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-muted-foreground/25 dash-flow"
              strokeDasharray="4 8"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          );
        })}
      </svg>

      <div className="relative z-10 w-20 h-20 rounded-2xl border border-border/60 bg-background flex items-center justify-center server-pulse">
        <Server className="w-8 h-8 text-foreground" />
      </div>

      {clients.map((client, i) => {
        const angle = (i / clients.length) * Math.PI * 2 - Math.PI / 2;
        const x = center.x + Math.cos(angle) * radius;
        const y = center.y + Math.sin(angle) * radius;

        return (
          <div
            key={client.name}
            className="absolute flex flex-col items-center"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-12 h-12 rounded-xl border border-border/60 bg-background flex items-center justify-center">
              <Code2 className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="mt-3 text-center">
              <span className="block font-mono text-[10px] text-foreground tracking-tight">
                {client.name}
              </span>
              <span className="block font-mono text-[9px] text-muted-foreground/60 mt-0.5">
                {client.desc}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BANNER — continuous scrolling ticker                              */
/* ------------------------------------------------------------------ */

function BuiltWithBanner() {
  const message =
    "Built entirely with Tesseract — the local inference server · Powered by the Qwen 3.6 model family (35B-A3B, 27B, and specialized post-training variants) · Every line of code proves it works.";

  return (
    <section className="relative overflow-hidden py-5 lg:py-6 bg-[#111] dark:bg-[#f0f0f0]">
      <div className="flex items-center gap-4">
        {/* Left accent dot */}
        <div
          className="shrink-0 w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: "rgba(245, 242, 237, 0.6)",
          }}
        />
        {/* Scrolling text */}
        <div className="flex-1 overflow-hidden">
          <div className="ticker-strip">
            <span className="ticker-text text-[#f5f2ed] dark:text-[#0a0a0a] text-lg">
              {message}
            </span>
            <span
              className="ticker-text text-[#f5f2ed] dark:text-[#0a0a0a] text-lg"
              aria-hidden="true"
            >
              {message}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  LANDING PAGE                                                       */
/* ------------------------------------------------------------------ */

export function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ScrollProgress />
      <Noise />

      <Navigation>
        {/* HERO — split layout, no divider */}
        <section className="relative min-h-[92vh] overflow-hidden">
          <div className="flex min-h-[92vh]">
            {/* Left: text */}
            <div className="flex-1 flex items-end pb-20 px-8 lg:px-16 xl:px-24">
              <div className="max-w-2xl">
                <Reveal delay={0.1}>
                  <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.85] tracking-tighter mb-8">
                    Your
                    <br />
                    intelligence.
                    <br />
                    <span className="dark:text-white/60 text-neutral-500">Your machine.</span>
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-10">
                    Dictation, speech synthesis, a local AI agent that remembers
                    you, and an OpenAI-compatible inference server — powered by
                    MLX, processed entirely on-device.
                    No cloud. No accounts. No telemetry.
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <HeroButtons />
                </Reveal>
              </div>
            </div>

            {/* Right: tesseract */}
            <div className="flex-1 relative">
              <TesseractViz />
            </div>
          </div>
        </section>

        {/* BANNER */}
        <BuiltWithBanner />

        {/* INFERENCE SERVER */}
        <InferenceServerSection />

        {/* FEATURES */}
        <section id="features" className="px-8 lg:px-16 xl:px-24 py-32 lg:py-48">
          <Reveal>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-20 lg:mb-32 max-w-3xl">
              Everything runs
              <br />
              on your Mac.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-24">
            <FeatureCard
              title="Voice Dictation"
              description="Hold a hotkey, speak, release. Whisper transcribes your voice into any app — a text editor, a browser, a chat window — fully offline on Apple Silicon."
              tags={["push-to-talk", "whisper", "global hotkey"]}
              icon={Mic}
              delay={0}
            />
            <FeatureCard
              title="Text-to-Speech"
              description="Hear any text read aloud with natural long-form voice synthesis. State-of-the-art quality, generated in real time on your Mac."
              tags={["natural voice", "real-time", "offline"]}
              icon={Volume2}
              delay={0.08}
            />
            <FeatureCard
              title="AI Agent"
              description="A tool-calling assistant that remembers you across conversations. Interact by voice or text, attach images and screenshots, set reminders, goals, and habits."
              tags={["tool-calling", "memory", "multimodal"]}
              icon={Bot}
              delay={0}
            />
            <FeatureCard
              title="Inference Server"
              description="OpenAI-compatible /v1/chat/completions endpoint with tiered RAM and SSD prefix caching. Plug any coding-agent harness into a fully local backend."
              tags={["openai-compatible", "prefix caching", "local backend"]}
              icon={Server}
              delay={0.08}
            />
          </div>
        </section>

        {/* PRIVACY STATEMENT */}
        <section id="privacy" className="px-8 lg:px-16 xl:px-24 py-32 lg:py-48">
          <Reveal delay={0.05}>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-10 max-w-4xl">
              Your data never
              <br />
              leaves your Mac.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mb-20">
              Every model runs locally on Apple Silicon. There are no servers
              to trust because there are no servers at all.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              { icon: Cpu, label: "Local inference", desc: "All AI runs on Apple Silicon" },
              { icon: WifiOff, label: "Full offline", desc: "Works without internet after setup" },
              { icon: UserX, label: "No accounts", desc: "No sign-ups, no telemetry" },
              { icon: EyeOff, label: "No cloud", desc: "No servers, no API calls" },
              { icon: Eye, label: "MLX-powered", desc: "Open models via Apple's MLX framework" },
              { icon: Lock, label: "Sandboxed", desc: "Your files stay under your control" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group">
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors mb-5" />
                  <div className="text-lg font-medium mb-2">{item.label}</div>
                  <div className="text-muted-foreground leading-relaxed">{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS + REQUIREMENTS */}
        <section className="px-8 lg:px-16 xl:px-24 py-32 lg:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 lg:gap-40">
            <div>
              <Reveal delay={0.05}>
                <h2 className="font-display text-5xl sm:text-6xl tracking-tighter mb-16">
                  How it works
                </h2>
              </Reveal>

              <div className="space-y-10">
                {[
                  {
                    title: "Download",
                    desc: "Grab the signed DMG from GitHub, drag it to Applications, and follow onboarding.",
                  },
                  {
                    title: "First Launch",
                    desc: "AI models download once on first launch via MLX. This is the only time the app needs the internet.",
                  },
                  {
                    title: "Grant Permissions",
                    desc: "Allow microphone access for dictation and accessibility access for global hotkeys.",
                  },
                  {
                    title: "Ready",
                    desc: "Everything runs on-device from that point forward. No internet needed.",
                  },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div>
                      <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal delay={0.05}>
                <h2 className="font-display text-5xl sm:text-6xl tracking-tighter mb-16">
                  System
                </h2>
              </Reveal>

              <div className="space-y-8">
                {[
                  { label: "Operating system", value: "macOS 26 or later" },
                  { label: "Chip", value: "Apple Silicon (M1 or later)" },
                  { label: "Storage", value: "Several GB for models" },
                  { label: "Internet", value: "One-time download only" },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {item.label}
                      </div>
                      <div className="text-xl">
                        {item.value}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-8 lg:px-16 xl:px-24 py-32 lg:py-48 text-center">
          <Reveal>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-10">
              Ready to get started?
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-14">
              Download Tesseract and experience AI that truly belongs to you.
              Signed DMG, available now.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <Button
              size="lg"
              className="rounded-lg h-14 px-10 text-base font-mono bg-[#111] dark:bg-[#f0f0f0] text-[#f5f2ed] dark:text-[#0a0a0a] hover:bg-[#333] dark:hover:bg-[#ddd]"
              asChild
            >
              <a href="https://github.com/spokvulcan/tesseract/releases/latest/download/Tesseract.dmg" target="_blank" rel="noopener noreferrer">
                Download for Mac
              </a>
            </Button>
          </Reveal>
        </section>
      </Navigation>
    </div>
  );
}
