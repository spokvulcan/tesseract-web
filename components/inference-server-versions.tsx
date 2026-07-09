"use client";

import { useRef, useState, useEffect } from "react";
import { Reveal } from "@/components/ui/reveal";
import {
  Plug, Zap, Layers, Code2, Terminal, Server, ArrowRight,
  Cpu, Network, Globe, Key,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  VERSION A — Terminal / IDE Mockup                                  */
/*  Feels like a code editor window with syntax-highlighted endpoints  */
/* ------------------------------------------------------------------ */

function InferenceServerVersionA() {
  const tools = ["OpenCode", "Aider", "Continue", "Claude Code", "Cursor"];
  const codeLines = [
    { type: "comment", text: "// Point your OpenAI-compatible client here" },
    { type: "key", text: "BASE_URL" },
    { type: "operator", text: "=" },
    { type: "string", text: '"http://localhost:6399"' },
    { type: "blank" },
    { type: "key", text: "API_KEY" },
    { type: "operator", text: "=" },
    { type: "string", text: '"tesseract-local"' },
    { type: "blank" },
    { type: "comment", text: "// Example: streaming chat completion" },
    { type: "punctuation", text: "fetch(" },
    { type: "string", text: '"/v1/chat/completions"' },
    { type: "punctuation", text: ", {" },
    { type: "indent" },
    { type: "key", text: "model" },
    { type: "operator", text: ": " },
    { type: "string", text: '"mlx-community/Llama-3.2-3B-Instruct"' },
    { type: "punctuation", text: ", " },
    { type: "key", text: "messages" },
    { type: "operator", text: ": [" },
    { type: "indent" },
    { type: "punctuation", text: "{ role: " },
    { type: "string", text: '"user"' },
    { type: "punctuation", text: ", " },
    { type: "key", text: "content" },
    { type: "operator", text: ": " },
    { type: "string", text: '"Hello"' },
    { type: "punctuation", text: "}]" },
    { type: "punctuation", text: "}" },
    { type: "punctuation", text: ")" },
  ];

  const lineColors: Record<string, string> = {
    comment: "text-muted-foreground/60",
    key: "text-blue-500 dark:text-blue-400",
    operator: "text-muted-foreground",
    string: "text-green-600 dark:text-green-400",
    punctuation: "text-muted-foreground",
  };

  return (
    <section className="bg-background dark:bg-[#0a0a0a] py-32 lg:py-48">
      <div className="px-8 lg:px-16 xl:px-24 max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-8 text-foreground">
              One endpoint.
              <br />
              Every agent.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              An OpenAI-compatible server running locally on your Mac. Drop it
              into any coding agent and get instant, fully offline inference
              with tiered RAM and SSD prefix caching.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Terminal mockup */}
          <div className="rounded-lg overflow-hidden border border-border bg-[#1a1a1a] dark:bg-[#111] shadow-2xl max-w-3xl mx-auto mb-20">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] dark:bg-[#1a1a1a] border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-muted-foreground">
                config — tesseract
              </span>
            </div>
            {/* Code */}
            <div className="p-6 font-mono text-sm leading-relaxed">
              {codeLines.map((line, i) => (
                <div key={i} className="flex">
                  {line.type !== "blank" && (
                    <>
                      <span className="text-muted-foreground/30 select-none w-8 text-right mr-6 shrink-0">
                        {i + 1}
                      </span>
                      <span className={lineColors[line.type]}>
                        {"  ".repeat(line.type === "indent" ? 1 : 0)}
                        {line.text}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {[
              { icon: Plug, title: "OpenAI Compatible", desc: "Works with any OpenAI SDK or compatible client" },
              { icon: Zap, title: "Prefix Caching", desc: "Tiered RAM and SSD caching skips prefill for repeated prompts" },
              { icon: Layers, title: "MLX Powered", desc: "Same model drives the agent and the server" },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-lg border border-border p-6 lg:p-8 text-center"
              >
                <f.icon className="w-6 h-6 text-muted-foreground mx-auto mb-5" />
                <h3 className="font-display text-xl tracking-tight mb-3 text-foreground">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="font-mono text-xs px-4 py-2 text-muted-foreground bg-secondary rounded-md border border-border/50"
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  VERSION B — Bento Grid                                              */
/*  Asymmetric bento-box layout with large visual blocks               */
/* ------------------------------------------------------------------ */

function InferenceServerVersionB() {
  return (
    <section className="bg-background dark:bg-[#0a0a0a] py-32 lg:py-48">
      <div className="px-8 lg:px-16 xl:px-24 max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-20">
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-foreground">
              Local inference,<br />
              zero compromises.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
            {/* Large block — endpoint */}
            <div className="md:col-span-2 md:row-span-2 rounded-xl border border-border bg-secondary/50 p-8 lg:p-10 flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Terminal className="w-5 h-5 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">API</span>
                </div>
                <code className="font-mono text-2xl lg:text-3xl tracking-tight text-foreground">
                  /v1/chat/completions
                </code>
              </div>
              <div className="mt-8">
                <p className="text-muted-foreground leading-relaxed">
                  Streaming and non-streaming completions. Honors request.model.
                  Drop in your favorite OpenAI-compatible client.
                </p>
              </div>
            </div>

            {/* Models block */}
            <div className="md:col-span-2 rounded-xl border border-border bg-secondary/50 p-8 lg:p-10 flex flex-col justify-between min-h-[130px]">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Model Registry</span>
              </div>
              <code className="font-mono text-lg text-foreground">
                /v1/models
              </code>
              <p className="text-muted-foreground text-sm mt-2">Lists all downloaded agent models</p>
            </div>

            {/* Health */}
            <div className="md:col-span-1 rounded-xl border border-border bg-secondary/50 p-6 flex flex-col justify-between min-h-[130px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Health</span>
              </div>
              <code className="font-mono text-lg text-foreground">
                /health
              </code>
            </div>

            {/* Feature: Prefix caching */}
            <div className="md:col-span-1 rounded-xl border border-border bg-secondary/50 p-6 flex flex-col justify-between min-h-[130px]">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Speed</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tiered RAM &amp; SSD prefix caching. Repeated prompts skip prefill entirely.
              </p>
            </div>

            {/* Feature: MLX */}
            <div className="md:col-span-2 rounded-xl border border-border bg-secondary/50 p-8 lg:p-10 min-h-[130px]">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Engine</span>
              </div>
              <p className="text-lg text-foreground leading-relaxed">
                Apple's MLX framework. The same model powers both the agent and the server — no cloud, no API calls.
              </p>
            </div>

            {/* Feature: Compatible tools */}
            <div className="md:col-span-2 rounded-xl border border-border bg-secondary/50 p-8 lg:p-10 min-h-[130px]">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Compatible</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["OpenCode", "Aider", "Continue", "Claude Code", "Cursor"].map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-xs px-3 py-1.5 text-muted-foreground bg-background rounded-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  VERSION C — Split with animated connection lines                    */
/*  Left: headline + CTA, Right: server visualization with flowing     */
/*  connection lines to tool icons                                      */
/* ------------------------------------------------------------------ */

function InferenceServerVersionC() {
  const tools = [
    { name: "OpenCode", icon: Code2 },
    { name: "Aider", icon: Code2 },
    { name: "Continue", icon: Code2 },
    { name: "Claude Code", icon: Code2 },
    { name: "Cursor", icon: Code2 },
  ];

  return (
    <section className="bg-background dark:bg-[#0a0a0a] py-32 lg:py-48">
      <div className="px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Text */}
            <div>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-8 text-foreground">
                Your models.
                <br />
                Your endpoint.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                Tesseract ships an OpenAI-compatible inference server powered by
                Apple's MLX. Point any coding agent at localhost and get fully
                local, fully private inference with tiered prefix caching.
              </p>

              <div className="space-y-5 mb-12">
                {[
                  { icon: Plug, text: "OpenAI SDK compatible — works with any OpenAI client" },
                  { icon: Zap, text: "Prefix caching — RAM + SSD tiering skips prefill" },
                  { icon: Layers, text: "MLX native — same model, agent and server" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <item.icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-base text-muted-foreground leading-relaxed">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/spokvulcan/tesseract/releases/latest/download/Tesseract.dmg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-8 text-sm font-mono rounded-lg bg-[#111] dark:bg-[#f0f0f0] text-[#f5f2ed] dark:text-[#0a0a0a] hover:bg-[#333] dark:hover:bg-[#ddd] transition-all"
                >
                  Download
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Server visualization */}
            <div className="relative flex items-center justify-center min-h-[420px]">
              {/* Central server node */}
              <div className="relative z-10 w-28 h-28 rounded-2xl border border-border bg-secondary flex items-center justify-center">
                <Server className="w-10 h-10 text-foreground" />
              </div>

              {/* Orbiting tool nodes */}
              {tools.map((tool, i) => {
                const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
                const radiusX = 200;
                const radiusY = 140;
                const x = Math.cos(angle) * radiusX;
                const y = Math.sin(angle) * radiusY;

                return (
                  <div
                    key={tool.name}
                    className="absolute"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <div className="w-16 h-16 rounded-xl border border-border bg-secondary flex items-center justify-center">
                      <tool.icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                      {tool.name}
                    </span>
                  </div>
                );
              })}

              {/* Connection lines (SVG) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 320"
                fill="none"
              >
                {tools.map((tool, i) => {
                  const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
                  const x = 200 + Math.cos(angle) * 200;
                  const y = 160 + Math.sin(angle) * 140;
                  return (
                    <line
                      key={tool.name}
                      x1="200"
                      y1="160"
                      x2={x}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-border"
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  VERSION D — Bento + Server Illustration                            */
/*  Asymmetric bento grid where the hero card contains an animated     */
/*  server network visualization with orbiting client nodes            */
/*  Other bento cards provide more detail about features and endpoints */
/* ------------------------------------------------------------------ */

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
  const iconOffset = 36; // px from element center to icon center
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
      {/* CSS animations */}
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

      {/* Outer decorative ring */}
      <div className="absolute w-[280px] h-[280px] rounded-full border border-border/30 network-rotate" />

      {/* Inner decorative ring */}
      <div className="absolute w-[200px] h-[200px] rounded-full border border-border/20 network-rotate-reverse" />

      {/* Connection lines SVG */}
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

      {/* Central server */}
      <div className="relative z-10 w-20 h-20 rounded-2xl border border-border/60 bg-background flex items-center justify-center server-pulse">
        <Server className="w-8 h-8 text-foreground" />
      </div>

      {/* Client nodes — pixel-positioned to match SVG */}
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

function InferenceServerVersionD() {
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
          {/* Bento grid */}
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

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export { InferenceServerVersionA, InferenceServerVersionB, InferenceServerVersionC, InferenceServerVersionD };
