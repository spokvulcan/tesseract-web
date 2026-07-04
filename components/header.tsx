"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [version, setVersion] = useState<string>("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    fetch("/version.json")
      .then((res) => res.json())
      .then((data) => setVersion(data.version))
      .catch(() => setVersion(""));
  }, []);

  const dark = resolvedTheme === "dark";

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
        <nav
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-xl bg-[rgba(245,242,237,0.8)] dark:bg-[rgba(20,20,20,0.8)] border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <Link href="/" className="flex items-center gap-2.5 px-3 py-1.5">
            <Image
              src="/icon-64x64.png"
              alt="Tesseract"
              width={32}
              height={32}
              className="rounded-sm"
            />
            <span className="font-display text-base tracking-tight">Tesseract</span>
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
            <Link href="/#download">Download</Link>
          </Button>

          <button
            onClick={() => setTheme(dark ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors ml-1"
            aria-label="Toggle theme"
          >
            {mounted ? (dark ? <span className="text-muted-foreground hover:text-foreground transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span> : <span className="text-muted-foreground hover:text-foreground transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg></span>) : <span className="text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg></span>}
          </button>

          <Link
            href="https://github.com/spokvulcan/tesseract"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-muted transition-colors ml-1"
            aria-label="GitHub repository"
          >
            <Github className="w-4 h-4" />
          </Link>
        </nav>
      </div>
    </>
  );
}

export function Footer() {
  const [version, setVersion] = useState<string>("");

  useEffect(() => {
    fetch("/version.json")
      .then((res) => res.json())
      .then((data) => setVersion(data.version))
      .catch(() => setVersion(""));
  }, []);

  return (
    <footer className="px-8 lg:px-16 xl:px-24 py-20 border-t border-border">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
        <div>
          <div className="font-display text-4xl tracking-tight mb-3">
            Tesseract
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
          <Link
            href="https://github.com/spokvulcan/tesseract"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" />
            GitHub
          </Link>
        </div>
      </div>

      <div className="mt-20 flex items-center justify-between text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Tesseract</span>
        <span className="font-mono">{version ? `v${version}` : ""}</span>
      </div>
    </footer>
  );
}
