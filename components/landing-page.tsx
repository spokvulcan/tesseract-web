"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import TesseractViz from "@/components/tesseract-viz";
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
  Sun,
  Moon,
  Server,
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
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */

function Nav({ setTheme }: { setTheme: (theme: string) => void }) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <nav
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-xl bg-[rgba(245,242,237,0.8)] dark:bg-[rgba(20,20,20,0.8)] border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        <Link href="/" className="flex items-center gap-2.5 px-3 py-1.5">
          <Image
            src="/icon-64x64.png"
            alt="Tesseract"
            width={22}
            height={22}
            className="rounded-sm"
          />
          <span className="font-display text-base tracking-tight">tesseract</span>
        </Link>

        <div
          className="w-px h-6 mx-1 bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.08)]"
        />

        <div className="flex items-center gap-1">
          {["Features", "Privacy", "Support"].map((item) => (
            <Link
              key={item}
              href={item === "Features" ? "#features" : item === "Privacy" ? "#privacy" : `/${item.toLowerCase()}`}
              className="px-4 py-2 text-sm rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              {item}
            </Link>
          ))}
        </div>

        <div
          className="w-px h-6 mx-1 bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.08)]"
        />

        <Button
          variant="outline"
          size="sm"
          className="rounded-full h-9 px-5 text-sm font-mono border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.12)] bg-transparent"
          asChild
        >
          <Link href="#download">Download</Link>
        </Button>

        <button
          onClick={() => setTheme(dark ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-muted transition-colors ml-1"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="px-8 lg:px-16 xl:px-24 py-20">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
        <div>
          <div className="font-display text-4xl tracking-tight mb-3">
            tesseract
          </div>
          <p className="text-muted-foreground text-lg max-w-xs">
            On-device AI for macOS. No cloud. No accounts. Just you.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-4 text-lg">
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
            Support
          </Link>
        </div>
      </div>

      <div className="mt-20 flex items-center justify-between text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Tesseract</span>
        <span className="font-mono">v1.0.0</span>
      </div>
    </footer>
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
/*  LANDING PAGE                                                       */
/* ------------------------------------------------------------------ */

export function LandingPage() {
  const { setTheme } = useTheme();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ScrollProgress />
      <Noise />

      <Nav setTheme={setTheme} />

      <main>
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
                  <div id="download" className="flex items-center gap-4 flex-wrap">
                    <Button
                      size="lg"
                      className="rounded-lg h-12 px-8 text-sm font-mono bg-[#111] dark:bg-[#f0f0f0] text-[#f5f2ed] dark:text-[#0a0a0a] hover:bg-[#333] dark:hover:bg-[#ddd]"
                      asChild
                    >
                      <a href="https://github.com/spokvulcan/tesseract/releases/latest/download/Tesseract.dmg" target="_blank" rel="noopener noreferrer">
                        Download for Mac
                      </a>
                    </Button>
                    <Link
                      href="#features"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                    >
                      Explore features
                      <ArrowDown className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right: tesseract */}
            <div className="flex-1 relative">
              <TesseractViz />
            </div>
          </div>
        </section>

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
      </main>

      <Footer />
    </div>
  );
}
