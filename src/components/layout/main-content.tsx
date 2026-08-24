"use client";

import React from "react";
import { useLayoutState } from "./layout-context";

export function MainContent({ children }: { children: React.ReactNode }) {
  const { hasActiveFloatingBar } = useLayoutState();

  return (
    <main className={`flex-1 transition-all duration-300 ${hasActiveFloatingBar ? "pb-36 md:pb-28" : "pb-12"}`}>
      {children}
    </main>
  );
}
