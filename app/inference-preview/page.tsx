"use client";

import { InferenceServerVersionA, InferenceServerVersionB, InferenceServerVersionC, InferenceServerVersionD } from "@/components/inference-server-versions";
import { Navigation } from "@/components/navigation";
import { Check } from "lucide-react";

const versions = [
  {
    id: "a" as const,
    name: "Terminal",
    tagline: "IDE mockup with syntax-highlighted code and a terminal window aesthetic",
    component: <InferenceServerVersionA />,
  },
  {
    id: "b" as const,
    name: "Bento",
    tagline: "Asymmetric bento-grid with varied block sizes and muted backgrounds",
    component: <InferenceServerVersionB />,
  },
  {
    id: "c" as const,
    name: "Split + Orbit",
    tagline: "Two-column split with a central server node and orbiting tool icons",
    component: <InferenceServerVersionC />,
  },
  {
    id: "d" as const,
    name: "Bento + Illustration",
    tagline: "Bento grid with a hero card containing a server visualization and orbiting clients",
    component: <InferenceServerVersionD />,
  },
];

export default function InferencePreview() {
  return (
    <Navigation>
      <div className="px-8 lg:px-16 xl:px-24 py-32 lg:py-48">
        <div className="max-w-4xl mx-auto mb-24">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-6 text-foreground">
            Inference Server<br />Section — 4 Versions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Four radically different layouts for the Tesseract inference server
            section. Pick the one that fits the site's personality best.
          </p>
        </div>

        {versions.map((v, vi) => (
          <div key={v.id} className="mb-32">
            {/* Version label */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Version {String.fromCharCode(65 + vi)}
              </span>
              <div className="h-px flex-1 bg-border" />
              <span className="font-display text-2xl tracking-tight text-foreground">
                {v.name}
              </span>
              <span className="font-mono text-xs text-muted-foreground max-w-xs text-right">
                {v.tagline}
              </span>
            </div>

            {/* Preview */}
            <div className="border border-border rounded-xl overflow-hidden">
              {v.component}
            </div>

            {/* Pick button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => {
                  localStorage.setItem("tesseract-version", v.id);
                  window.location.href = "/";
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-mono rounded-lg bg-[#111] dark:bg-[#f0f0f0] text-[#f5f2ed] dark:text-[#0a0a0a] hover:bg-[#333] dark:hover:bg-[#ddd] transition-all"
              >
                <Check className="w-4 h-4" />
                Pick This Version
              </button>
            </div>
          </div>
        ))}
      </div>
    </Navigation>
  );
}
