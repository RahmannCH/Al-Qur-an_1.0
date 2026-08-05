"use client";

import { motion } from "framer-motion";
import type { PrayerTimesResponse } from "@/types/prayer";

const prayerNames = [
  { key: "Fajr", name: "Subuh", icon: "🌅" },
  { key: "Dhuhr", name: "Dzuhur", icon: "☀️" },
  { key: "Asr", name: "Ashar", icon: "🌤️" },
  { key: "Maghrib", name: "Maghrib", icon: "🌇" },
  { key: "Isha", name: "Isya", icon: "🌙" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function PrayerList({ prayerTimes }: { prayerTimes: NonNullable<PrayerTimesResponse["data"]> }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="rounded-xl border bg-card p-6"
    >
      <h2 className="text-xl font-display font-bold mb-4">Waktu Sholat Hari Ini</h2>
      <div className="space-y-3">
        {prayerNames.map((prayer) => {
          const time = prayerTimes.timings[prayer.key as keyof typeof prayerTimes.timings];
          return (
            <motion.div
              key={prayer.key}
              variants={item}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{prayer.icon}</span>
                <span className="font-medium">{prayer.name}</span>
              </div>
              <span className="text-lg font-bold text-primary">{time}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
