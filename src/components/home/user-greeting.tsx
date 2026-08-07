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
    <div>
      <h1 className="text-3xl font-display font-bold mb-1">
        Assalamu'alaikum{mounted && userName ? `, ${userName}` : ""}
      </h1>
      <p className="text-muted-foreground">Eksplorasi ilmu dan tingkatkan imanmu hari ini.</p>
    </div>
  );
}
