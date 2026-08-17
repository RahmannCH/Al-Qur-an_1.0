"use client";

import { useSettingsStore } from "@/store/settings-store";
import { useEffect, useState } from "react";

export function UserGreeting() {
  const { userName } = useSettingsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-1">
      <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
        Assalamu&apos;alaikum{mounted && userName ? `, ${userName}` : ""}
      </h1>
      <p className="text-sm text-muted-foreground font-medium">
        Eksplorasi ilmu, kelola target ibadah, dan tingkatkan imanmu hari ini.
      </p>
    </div>
  );
}
