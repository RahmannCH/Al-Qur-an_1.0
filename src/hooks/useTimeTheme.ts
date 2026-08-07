"use client";

import { useEffect, useState } from "react";
import { usePrayerStore } from "@/store/prayer-store";
import { getCurrentPrayerPeriod, applyTimeTheme, getTimeTheme, type PrayerPeriod } from "@/lib/time-theme";

export function useTimeTheme() {
  const { prayerSchedule } = usePrayerStore();
  const [period, setPeriod] = useState<PrayerPeriod>("isha");

  useEffect(() => {
    const updateTheme = () => {
      const newPeriod = getCurrentPrayerPeriod(prayerSchedule || undefined);
      setPeriod(newPeriod);
      applyTimeTheme(newPeriod);
    };

    updateTheme();
    const timer = setInterval(updateTheme, 60000);
    return () => clearInterval(timer);
  }, [prayerSchedule]);

  const theme = getTimeTheme(period);
  return { period, theme };
}
