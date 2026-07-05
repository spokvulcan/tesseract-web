"use client";

import { Navigation } from "@/components/navigation";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <Navigation>
      <div className="max-w-3xl mx-auto">
        {children}
      </div>
    </Navigation>
  );
}

