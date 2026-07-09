"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import {
  InferenceServerVersionA,
  InferenceServerVersionB,
  InferenceServerVersionC,
  InferenceServerVersionD,
} from "@/components/inference-server-versions";

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
/*  INFERENCE SERVER — VERSION SELECTOR                                */
/* ------------------------------------------------------------------ */

function InferenceServerSection() {
  const [version, setVersion] = useState<"a" | "b" | "c" | "d">("a");

  useEffect(() => {
    const saved = localStorage.getItem("tesseract-version");
    if (saved === "b" || saved === "c" || saved === "d") {
      setVersion(saved);
    }
  }, []);

  const renderVersion = () => {
    switch (version) {
      case "a":
        return <InferenceServerVersionA />;
      case "b":
        return <InferenceServerVersionB />;
      case "c":
        return <InferenceServerVersionC />;
      case "d":
        return <InferenceServerVersionD />;
    }
  };

  return (
    <>
      {renderVersion()}

      {/* Version switcher */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-background/80 backdrop-blur-xl shadow-lg">
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
          Layout:
        </span>
        {(["a", "b", "c", "d"] as const).map((v) => (
          <button
            key={v}
            onClick={() => {
              setVersion(v);
              localStorage.setItem("tesseract-version", v);
            }}
            className={`w-6 h-6 rounded-full text-xs font-mono flex items-center justify-center transition-all ${
              version === v
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {v.toUpperCase()}
          </button>
        ))}
      </div>
    </>
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
