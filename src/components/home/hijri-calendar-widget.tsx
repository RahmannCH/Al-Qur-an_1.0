"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Moon, Star } from "lucide-react";
import { usePrayerStore } from "@/store/prayer-store";
import { useEffect, useState } from "react";

import { getPrayerTimes } from "@/lib/prayer-api";

// Peristiwa penting Hijriyah
const ISLAMIC_EVENTS = [
  { month: 1, day: 1, name: "Tahun Baru Hijriyah" },
  { month: 1, day: 10, name: "Hari Asyura" },
  { month: 3, day: 12, name: "Maulid Nabi Muhammad ﷺ" },
  { month: 7, day: 27, name: "Isra' Mi'raj" },
  { month: 8, day: 15, name: "Nisfu Sya'ban" },
  { month: 9, day: 1, name: "Awal Ramadhan" },
  { month: 9, day: 17, name: "Nuzulul Qur'an" },
  { month: 10, day: 1, name: "Idul Fitri" },
  { month: 12, day: 9, name: "Hari Arafah" },
  { month: 12, day: 10, name: "Idul Adha" },
];

export function HijriCalendarWidget() {
  const [prayerData, setPrayerData] = useState<any>(null);

  useEffect(() => {
    getPrayerTimes().then(data => setPrayerData(data));
  }, []);

  if (!prayerData) return null;

  const hijri = prayerData.date.hijri;
  const gregorian = prayerData.date.gregorian;
  const monthNum = typeof hijri.month.number === 'number' ? hijri.month.number : parseInt(hijri.month.number as string);
  const dayNum = parseInt(hijri.day);

  // Cari event terdekat bulan ini atau bulan depan
  let upcomingEvent = ISLAMIC_EVENTS.find(e => e.month === monthNum && e.day >= dayNum) || 
                      ISLAMIC_EVENTS.find(e => e.month > monthNum) ||
                      ISLAMIC_EVENTS[0]; // Wrap to next year if none found

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-card p-6 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-8 rounded-bl-[100px] bg-gradient-to-br from-primary/10 to-teal/10 opacity-50" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <Moon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg leading-tight">Kalender Hijriyah</h3>
            <p className="text-xs text-muted-foreground">{gregorian.date.string}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/5 to-teal/5 rounded-2xl border mb-6 text-center">
          <div className="text-6xl font-display font-bold text-primary mb-2">
            {hijri.day}
          </div>
          <div className="text-xl font-bold">
            {hijri.month.en} {hijri.year}
          </div>
          <div className="text-sm font-medium text-muted-foreground mt-1">
            {hijri.date.string}
          </div>
        </div>

        <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Event Terdekat</p>
              <p className="font-medium">{upcomingEvent.name}</p>
              <p className="text-sm text-muted-foreground">
                {upcomingEvent.day} {ISLAMIC_EVENTS.find(e => e === upcomingEvent)?.month === monthNum ? hijri.month.en : 'Bulan ke-' + upcomingEvent.month}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
