"use client";

import { motion } from "framer-motion";
import { Moon, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getPrayerTimes } from "@/lib/prayer-api";
import { sfx } from "@/lib/sfx";

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

const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi'ul Awwal",
  "Rabi'ul Akhir",
  "Jumadil Ula",
  "Jumadil Akhir",
  "Rajab",
  "Sya'ban",
  "Ramadhan",
  "Syawwal",
  "Dzulqa'dah",
  "Dzulhijjah"
];

export function HijriCalendarWidget() {
  const [prayerData, setPrayerData] = useState<any>(null);
  const [eventIndex, setEventIndex] = useState<number | null>(null);

  useEffect(() => {
    getPrayerTimes().then(data => {
      setPrayerData(data);
      
      const hijri = data.date.hijri;
      const monthNum = typeof hijri.month.number === 'number' ? hijri.month.number : parseInt(hijri.month.number as string);
      const dayNum = parseInt(hijri.day);

      // Temukan index event terdekat bulan ini atau bulan depan sebagai default
      let defaultIdx = ISLAMIC_EVENTS.findIndex(e => e.month === monthNum && e.day >= dayNum);
      if (defaultIdx === -1) {
        defaultIdx = ISLAMIC_EVENTS.findIndex(e => e.month > monthNum);
      }
      if (defaultIdx === -1) {
        defaultIdx = 0; // Wrap ke event pertama
      }
      setEventIndex(defaultIdx);
    });
  }, []);

  if (!prayerData || eventIndex === null) return null;

  const hijri = prayerData.date.hijri;
  const gregorian = prayerData.date.gregorian;
  const monthNum = typeof hijri.month.number === 'number' ? hijri.month.number : parseInt(hijri.month.number as string);

  // Ejaan Indonesia untuk bulan aktif di kalender
  const hijriMonthName = HIJRI_MONTHS[monthNum - 1] || hijri.month.en;

  // Event yang sedang aktif di slider navigasi
  const activeEvent = ISLAMIC_EVENTS[eventIndex];
  const eventMonthName = HIJRI_MONTHS[activeEvent.month - 1];

  const handleNextEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (eventIndex < ISLAMIC_EVENTS.length - 1) {
      setEventIndex(prev => prev! + 1);
      sfx.playTap();
    }
  };

  const handlePrevEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (eventIndex > 0) {
      setEventIndex(prev => prev! - 1);
      sfx.playTap();
    }
  };

  return (
    <div className="rounded-3xl border bg-card p-6 overflow-hidden relative h-full flex flex-col justify-between shadow-sm">
      <div className="absolute top-0 right-0 p-8 rounded-bl-[100px] bg-gradient-to-br from-primary/10 to-teal/10 opacity-50" />
      
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
            <Moon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg leading-tight">Kalender Hijriyah</h3>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{gregorian.date.string}</p>
          </div>
        </div>

        {/* Calendar Tear-Off Sheet Design */}
        <div className="my-auto flex flex-col items-center justify-center p-4 bg-muted/30 rounded-2xl border text-center relative overflow-hidden">
          {/* Top red header representing a real calendar binding */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 to-red-600" />
          
          <div className="text-6xl font-display font-bold text-primary mb-1 mt-2 tracking-tighter">
            {hijri.day}
          </div>
          <div className="text-lg font-bold text-foreground">
            {hijriMonthName} {hijri.year}
          </div>
          <div className="text-xs font-semibold text-muted-foreground mt-0.5">
            {hijri.date.string}
          </div>
        </div>

        {/* Upcoming Event Box with Navigation */}
        <div className="mt-5 p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500 shrink-0 animate-pulse" />
              <p className="text-[9px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-widest">Hari Besar Tahun Ini</p>
            </div>
            
            {/* Navigasi Event */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevEvent}
                disabled={eventIndex === 0}
                className="p-1 rounded bg-amber-500/10 hover:bg-amber-500/20 disabled:opacity-30 disabled:hover:bg-amber-500/10 transition-colors text-amber-700 dark:text-amber-500"
              >
                <ChevronLeft className="h-3 w-3" />
              </button>
              <button
                onClick={handleNextEvent}
                disabled={eventIndex === ISLAMIC_EVENTS.length - 1}
                className="p-1 rounded bg-amber-500/10 hover:bg-amber-500/20 disabled:opacity-30 disabled:hover:bg-amber-500/10 transition-colors text-amber-700 dark:text-amber-500"
              >
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden min-h-[44px]">
            <p className="font-bold text-sm text-foreground truncate">{activeEvent.name}</p>
            <p className="text-[11px] text-muted-foreground font-semibold mt-0.5">
              Tanggal {activeEvent.day} {eventMonthName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
