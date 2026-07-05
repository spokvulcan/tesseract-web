"use client";

import { Navigation } from "@/components/navigation";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <Navigation>
      <div className="pt-36 pb-20 px-8 lg:px-16 xl:px-24">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>
    </Navigation>
  );
}

