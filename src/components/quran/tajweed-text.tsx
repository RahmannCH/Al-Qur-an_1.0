"use client";

import { parseTajweed } from "@/lib/tajweed-parser";

interface TajweedTextProps {
  html: string;
  className?: string;
}

export function TajweedText({ html, className = "" }: TajweedTextProps) {
  const elements = parseTajweed(html);

  return (
    <span className={`font-arabic leading-loose ${className}`}>
      {elements}
    </span>
  );
}
