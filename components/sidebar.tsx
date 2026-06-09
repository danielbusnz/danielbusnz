"use client";

import { useState } from "react";

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Show posts"
        className="fixed left-3 top-4 z-10 font-mono text-sm text-ctp-overlay1 hover:text-ctp-text"
      >
        ›
      </button>
    );
  }

  return (
    <aside className="w-full overflow-y-auto px-6 py-6 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:bg-ctp-mantle lg:px-4 lg:py-8">
      <div className="mb-2 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Hide posts"
          className="font-mono text-sm text-ctp-overlay1 hover:text-ctp-text"
        >
          ‹
        </button>
      </div>
      {children}
    </aside>
  );
}
