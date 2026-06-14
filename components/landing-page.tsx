"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  SCROLL PROGRESS                                                    */
/* ------------------------------------------------------------------ */

function ScrollProgress({ dark }: { dark: boolean }) {
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
      className="scroll-progress"
      style={{
        transform: `scaleX(${progress})`,
        background: dark ? "#f0f0f0" : "#111",
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

function Nav({ dark, setDark }: { dark: boolean; setDark: (d: boolean) => void }) {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <nav
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-xl"
        style={{
          backgroundColor: dark ? "rgba(20,20,20,0.8)" : "rgba(245,242,237,0.8)",
          borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          boxShadow: dark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.08)",
        }}
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
          className="w-px h-6 mx-1"
          style={{ backgroundColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
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
          className="w-px h-6 mx-1"
          style={{ backgroundColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
        />

        <Button
          variant="outline"
          size="sm"
          className="rounded-full h-9 px-5 text-sm font-mono"
          style={{
            borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
            backgroundColor: "transparent",
          }}
          asChild
        >
          <Link href="#download">Download</Link>
        </Button>

        <button
          onClick={() => setDark(!dark)}
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

function Footer({ dark }: { dark: boolean }) {
  const borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const innerBorderColor = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <footer className="relative z-10 w-full border-t" style={{ borderColor }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          <div>
            <div className="font-display text-3xl tracking-tight mb-2">
              tesseract
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              On-device intelligence for macOS. No cloud. No accounts. Just you.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
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

        <div className="mt-16 pt-8 border-t flex items-center justify-between text-xs text-muted-foreground" style={{ borderColor: innerBorderColor }}>
          <span>© {new Date().getFullYear()} Tesseract</span>
          <span className="font-mono">v0.1.0</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURE CARD                                                       */
/* ------------------------------------------------------------------ */

function FeatureCard({
  number,
  title,
  description,
  tags,
  icon: Icon,
  delay = 0,
  dark,
}: {
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  delay?: number;
  dark: boolean;
}) {
  const borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const hoverBorderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  return (
    <Reveal delay={delay}>
      <div
        className="group relative border p-8 lg:p-10 hover:border transition-colors"
        style={{ borderColor, transition: "border-color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = hoverBorderColor)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = borderColor)}
      >
        <div className="flex items-start justify-between mb-8">
          <span className="font-mono text-xs text-muted-foreground">
            {number}
          </span>
          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>

        <h3 className="font-display text-2xl tracking-tight mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6 text-[15px]">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-2.5 py-1 border text-muted-foreground"
              style={{ borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
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
  const [dark, setDark] = useState(false);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden ${dark ? "dark bg-[#0a0a0a] text-[#f0f0f0]" : "bg-[#f5f2ed] text-[#111]"}`}>
      <ScrollProgress dark={dark} />
      <Noise />

      <Nav dark={dark} setDark={setDark} />

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
                    <span className="text-muted">Your machine.</span>
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-10">
                    Dictation, speech synthesis, image generation, and a local AI
                    agent — powered by open models, processed entirely on-device.
                    No cloud. No accounts. No telemetry.
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div id="download" className="flex items-center gap-5">
                    <Button
                      size="lg"
                      className="rounded-lg h-12 px-8 text-sm font-mono"
                      style={{
                        background: dark ? "#f0f0f0" : "#111",
                        color: dark ? "#0a0a0a" : "#f5f2ed",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = dark ? "#ddd" : "#333";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = dark ? "#f0f0f0" : "#111";
                      }}
                    >
                      Download on the Mac App Store
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
              <TesseractViz dark={dark} />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          className="max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-40"
        >
          <Reveal>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight mb-16 lg:mb-24 max-w-2xl">
              Everything runs on your Mac. Open-source models, optimized for
              Apple Silicon.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              number="01"
              title="Voice Dictation"
              description="Hold a hotkey, speak, release. Your voice is transcribed and typed directly into whatever app you're using — a text editor, a browser, a chat window."
              tags={["push-to-talk", "on-device", "global hotkey"]}
              icon={Mic}
              delay={0}
              dark={dark}
            />
            <FeatureCard
              number="02"
              title="Text-to-Speech"
              description="Hear any text read aloud with natural-sounding voice synthesis. Consistent quality across long-form content, generated in real time on your Mac."
              tags={["natural voice", "real-time", "offline"]}
              icon={Volume2}
              delay={0.08}
              dark={dark}
            />
            <FeatureCard
              number="03"
              title="AI Agent"
              description="A local AI agent that can read, write, and edit files on your Mac. Interact by voice or text. Extensible through packages — all running privately on-device."
              tags={["tool-calling", "sandboxed", "extensible"]}
              icon={Bot}
              delay={0}
              dark={dark}
            />
            <FeatureCard
              number="04"
              title="Image Generation"
              description="Create images from text descriptions using on-device diffusion models. No waiting for a server, no usage limits, no content filtering by a third party."
              tags={["text-to-image", "diffusion", "unlimited"]}
              icon={ImageIcon}
              delay={0.08}
              dark={dark}
            />
          </div>
        </section>

        {/* PRIVACY STATEMENT */}
        <section
          id="privacy"
          className="border-y"
          style={{ borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-40">
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] mb-8 max-w-4xl">
                Your data never
                <br />
                leaves your Mac.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-16">
                Every model runs locally on Apple Silicon. There are no servers
                to trust because there are no servers at all.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border" style={{ backgroundColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
              {[
                { icon: Cpu, label: "Local inference", desc: "All AI runs on Apple Silicon" },
                { icon: WifiOff, label: "Full offline", desc: "Works without internet after setup" },
                { icon: UserX, label: "No accounts", desc: "No sign-ups, no telemetry" },
                { icon: EyeOff, label: "No cloud", desc: "No servers, no API calls" },
                { icon: Eye, label: "Open models", desc: "Inspect and replace any model" },
                { icon: Lock, label: "Sandboxed", desc: "Your files stay under your control" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className={`p-6 lg:p-8 flex items-start gap-4 transition-colors ${dark ? "bg-[#0a0a0a] hover:bg-[#111]" : "bg-[#f5f2ed] hover:bg-[#f0ece6]"}`}>
                    <item.icon className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                    <div>
                      <div className="text-sm font-medium mb-0.5">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS + REQUIREMENTS */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
            <div className="lg:col-span-3">
              <Reveal delay={0.05}>
                <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-12">
                  How it works
                </h2>
              </Reveal>

              <div className="space-y-0">
                {[
                  {
                    step: "01",
                    title: "Download",
                    desc: "Get Tesseract Agent from the Mac App Store.",
                  },
                  {
                    step: "02",
                    title: "First Launch",
                    desc: "AI models download once on first launch. This is the only time the app needs the internet.",
                  },
                  {
                    step: "03",
                    title: "Grant Permissions",
                    desc: "Allow microphone access for dictation and accessibility access for global hotkeys.",
                  },
                  {
                    step: "04",
                    title: "Ready",
                    desc: "Everything runs on-device from that point forward. No internet needed.",
                  },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-6 py-6 border-b" style={{ borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                      <span className="font-mono text-xs text-muted-foreground pt-1">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <Reveal delay={0.05}>
                <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-12">
                  System
                </h2>
              </Reveal>

              <div className="space-y-0">
                {[
                  { label: "Operating system", value: "macOS 26 or later" },
                  { label: "Chip", value: "Apple Silicon (M1 or later)" },
                  { label: "Storage", value: "~8 GB for models" },
                  { label: "Internet", value: "One-time download only" },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="flex items-start justify-between py-5 border-b" style={{ borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                      <span className="text-sm text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-right">
                        {item.value}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="border-t" style={{ borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-40 text-center">
            <Reveal>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
                Ready to get started?
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10">
                Download Tesseract Agent from the Mac App Store and experience
                AI that truly belongs to you.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <Button
                size="lg"
                className="rounded-lg h-14 px-10 text-sm font-mono"
                style={{
                  background: dark ? "#f0f0f0" : "#111",
                  color: dark ? "#0a0a0a" : "#f5f2ed",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = dark ? "#ddd" : "#333";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = dark ? "#f0f0f0" : "#111";
                }}
              >
                Download on the Mac App Store
              </Button>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer dark={dark} />
    </div>
  );
}
