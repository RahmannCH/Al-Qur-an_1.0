"use client";

import React, { createContext, useContext, useState } from "react";

interface LayoutContextType {
  hasActiveFloatingBar: boolean;
  setHasActiveFloatingBar: (active: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  hasActiveFloatingBar: false,
  setHasActiveFloatingBar: () => {},
});

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [hasActiveFloatingBar, setHasActiveFloatingBar] = useState(false);

  return (
    <LayoutContext.Provider value={{ hasActiveFloatingBar, setHasActiveFloatingBar }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutState() {
  return useContext(LayoutContext);
}
