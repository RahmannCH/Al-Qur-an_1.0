"use client";

import { motion } from "framer-motion";
import type { PrayerTimesResponse } from "@/types/prayer";
import { Clock } from "lucide-react";

// Menghilangkan duplikasi terbenam/maghrib yang membingungkan.
// Menyajikan urutan logis dari Imsak hingga Qiyamul Lail (Tengah Malam).
const prayerNames = [
  { key: "Imsak", name: "Imsak", icon: "🍵", isFard: false, desc: "Batas akhir sahur" },
  { key: "Fajr", name: "Subuh", icon: "🌅", isFard: true },
  { key: "Sunrise", name: "Terbit / Syuruq", icon: "☀️", isFard: false, desc: "Batas akhir sholat Subuh" },
  { key: "Dhuhr", name: "Dzuhur", icon: "🌞", isFard: true },
  { key: "Asr", name: "Ashar", icon: "🌤️", isFard: true },
  { key: "Maghrib", name: "Maghrib", icon: "🌆", isFard: true, desc: "Awal waktu buka puasa" },
  { key: "Isha", name: "Isya", icon: "🌙", isFard: true },
  { key: "Midnight", name: "Tengah Malam", icon: "🌌", isFard: false, desc: "Waktu utama Sholat Tahajud" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function PrayerList({ prayerTimes }: { prayerTimes: NonNullable<PrayerTimesResponse["data"]> }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="rounded-3xl border bg-card p-6 md:p-8 flex flex-col h-full shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold">Waktu Sholat & Momen</h2>
          <p className="text-xs text-muted-foreground font-medium">Jadwal ibadah harian terpercaya</p>
        </div>
      </div>
      
      <div className="space-y-2 flex-1">
        {prayerNames.map((prayer) => {
          const time = prayerTimes.timings[prayer.key as keyof typeof prayerTimes.timings];
          if (!time) return null;

          return (
            <motion.div
              key={prayer.key}
              variants={item}
              className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                prayer.isFard 
                  ? "bg-card border hover:border-primary/50 hover:shadow-md" 
                  : "bg-muted/30 border border-transparent hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${
                  prayer.isFard ? "bg-primary/10" : "bg-background shadow-sm"
                }`}>
                  {prayer.icon}
                </div>
                <div>
                  <span className={`font-bold block ${prayer.isFard ? "text-base text-foreground" : "text-sm text-muted-foreground"}`}>
                    {prayer.name}
                  </span>
                  {prayer.desc && (
                    <span className="text-[10px] text-muted-foreground/70 font-semibold uppercase tracking-wider">
                      {prayer.desc}
                    </span>
                  )}
                </div>
              </div>
              <span className={`font-display font-bold ${prayer.isFard ? "text-lg text-primary" : "text-base text-muted-foreground"}`}>
                {time}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
