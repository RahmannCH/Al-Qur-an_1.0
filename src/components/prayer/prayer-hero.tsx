"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getNextPrayer, formatTime } from "@/lib/prayer-api";
import type { PrayerTimesResponse } from "@/types/prayer";
import { Clock, Compass } from "lucide-react";

export function PrayerHero({ prayerTimes }: { prayerTimes: NonNullable<PrayerTimesResponse["data"]> }) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const nextPrayer = getNextPrayer(prayerTimes);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNextPrayer = getNextPrayer(prayerTimes);
      setSecondsLeft(newNextPrayer.secondsLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const prayerNames: Record<string, string> = {
    Fajr: "Subuh",
    Dhuhr: "Dzuhur",
    Asr: "Ashar",
    Maghrib: "Maghrib",
    Isha: "Isya",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-teal p-6 text-white shadow-xl"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5" />
            <p className="text-sm font-medium opacity-90">Sholat Selanjutnya</p>
          </div>
          <p className="text-3xl font-display font-bold mb-1">{prayerNames[nextPrayer.name] || nextPrayer.name}</p>
          <p className="text-sm opacity-90">Pukul {nextPrayer.time}</p>
        </div>
        <Compass className="h-12 w-12 opacity-80" />
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Time Left</span>
          <span className="font-medium">{formatTime(secondsLeft)}</span>
        </div>
        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${(secondsLeft / 86400) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      <div className="text-xs opacity-80">
        <p>Yogyakarta, Indonesia &middot; {prayerTimes.date.readable}</p>
      </div>
    </motion.div>
  );
}
