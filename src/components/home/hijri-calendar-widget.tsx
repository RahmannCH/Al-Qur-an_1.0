"use client";

import { motion } from "framer-motion";
import { Moon, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getPrayerTimes } from "@/lib/prayer-api";
import { sfx } from "@/lib/sfx";

// 18 Peristiwa & Hari Besar Penting Islam Sepanjang Tahun
const ISLAMIC_EVENTS = [
  { month: 1, day: 1, name: "Tahun Baru Hijriyah (1 Muharram)" },
  { month: 1, day: 9, name: "Puasa Tasu'a (9 Muharram)" },
  { month: 1, day: 10, name: "Hari Asyura (10 Muharram)" },
  { month: 3, day: 12, name: "Maulid Nabi Muhammad ﷺ (12 Rabi'ul Awwal)" },
  { month: 7, day: 27, name: "Isra' Mi'raj (27 Rajab)" },
  { month: 8, day: 1, name: "Awal Bulan Sya'ban (1 Sya'ban)" },
  { month: 8, day: 15, name: "Malam Nisfu Sya'ban (15 Sya'ban)" },
  { month: 9, day: 1, name: "Awal Puasa Ramadhan (1 Ramadhan)" },
  { month: 9, day: 17, name: "Nuzulul Qur'an (17 Ramadhan)" },
  { month: 9, day: 21, name: "10 Malam Terakhir / Lailatul Qadar" },
  { month: 10, day: 1, name: "Hari Raya Idul Fitri (1 Syawwal)" },
  { month: 10, day: 2, name: "Puasa Sunnah 6 Hari Syawwal" },
  { month: 11, day: 1, name: "Awal Bulan Haram Dzulqa'dah" },
  { month: 12, day: 1, name: "10 Hari Awal Dzulhijjah (Amal Terbaik)" },
  { month: 12, day: 8, name: "Hari Tarwiyah (8 Dzulhijjah)" },
  { month: 12, day: 9, name: "Hari Arafah & Puasa Arafah (9 Dzulhijjah)" },
  { month: 12, day: 10, name: "Hari Raya Idul Adha (10 Dzulhijjah)" },
  { month: 12, day: 11, name: "Hari Tasyrik (11-13 Dzulhijjah)" },
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

// Perkiraan akumulasi hari per bulan Hijriah
function getHijriDayOfYear(month: number, day: number): number {
  const monthDays = [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325];
  return (monthDays[month - 1] || 0) + day;
}

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
        defaultIdx = 0; // Wrap ke event pertama jika sudah di akhir tahun
      }
      setEventIndex(defaultIdx);
    });
  }, []);

  if (!prayerData || eventIndex === null) return null;

  const hijri = prayerData.date.hijri;
  const gregorian = prayerData.date.gregorian;
  const monthNum = typeof hijri.month.number === 'number' ? hijri.month.number : parseInt(hijri.month.number as string);
  const dayNum = parseInt(hijri.day);

  // Ejaan Indonesia untuk bulan aktif di kalender
  const hijriMonthName = HIJRI_MONTHS[monthNum - 1] || hijri.month.en;

  // Event yang sedang aktif di slider navigasi
  const activeEvent = ISLAMIC_EVENTS[eventIndex];
  const eventMonthName = HIJRI_MONTHS[activeEvent.month - 1];

  // Hitung selisih hari antara tanggal hari ini dengan event
  const currentDayOfYear = getHijriDayOfYear(monthNum, dayNum);
  const eventDayOfYear = getHijriDayOfYear(activeEvent.month, activeEvent.day);
  const diffDays = eventDayOfYear - currentDayOfYear;

  let relativeTimeLabel = "";
  let badgeColor = "bg-amber-500/20 text-amber-700 dark:text-amber-300";

  if (diffDays === 0) {
    relativeTimeLabel = "Hari ini";
    badgeColor = "bg-emerald-500 text-white animate-pulse";
  } else if (diffDays > 0) {
    relativeTimeLabel = `${diffDays} hari lagi`;
    badgeColor = "bg-primary/10 text-primary font-bold";
  } else {
    relativeTimeLabel = `${Math.abs(diffDays)} hari lalu`;
    badgeColor = "bg-muted text-muted-foreground";
  }

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

        {/* Upcoming Event Box with Navigation & Relative Countdown */}
        <div className="mt-5 p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500 shrink-0" />
              <p className="text-[9px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-widest">
                Hari Besar ({eventIndex + 1}/{ISLAMIC_EVENTS.length})
              </p>
            </div>
            
            {/* Navigasi Event Slider */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevEvent}
                disabled={eventIndex === 0}
                className="p-1 rounded bg-amber-500/10 hover:bg-amber-500/20 disabled:opacity-30 disabled:hover:bg-amber-500/10 transition-colors text-amber-700 dark:text-amber-500"
                title="Event Sebelumnya"
              >
                <ChevronLeft className="h-3 w-3" />
              </button>
              <button
                onClick={handleNextEvent}
                disabled={eventIndex === ISLAMIC_EVENTS.length - 1}
                className="p-1 rounded bg-amber-500/10 hover:bg-amber-500/20 disabled:opacity-30 disabled:hover:bg-amber-500/10 transition-colors text-amber-700 dark:text-amber-500"
                title="Event Selanjutnya"
              >
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-sm text-foreground leading-tight">{activeEvent.name}</p>
                <p className="text-[11px] text-muted-foreground font-semibold mt-0.5">
                  Tanggal {activeEvent.day} {eventMonthName}
                </p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 mt-0.5 ${badgeColor}`}>
                {relativeTimeLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
