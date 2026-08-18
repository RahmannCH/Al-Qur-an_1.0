"use client";

import { useMemo } from "react";
import { parseTajweed } from "@/lib/tajweed-parser";

interface TajweedTextProps {
  html: string;
  className?: string;
  fontSize?: number;
}

export function TajweedText({ html, className = "", fontSize }: TajweedTextProps) {
  const elements = useMemo(() => parseTajweed(html), [html]);

  return (
    <span 
      className={`font-arabic leading-[2.5] select-text ${className}`}
      dir="rtl"
      style={fontSize ? { fontSize: `${fontSize}px` } : undefined}
    >
      {elements}
    </span>
  );
}
