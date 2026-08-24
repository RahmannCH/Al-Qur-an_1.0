"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePrayerStore, getWitaDate, getWitaTime } from "@/store/prayer-store";
import { useGamificationStore } from "@/store/gamification-store";
import { Check, Flame, Lock, CalendarCheck, X } from "lucide-react";
import { sfx } from "@/lib/sfx";

const prayers = ["Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];

const PRAYER_TO_SCHEDULE: Record<string, string> = {
  Subuh: "Fajr",
  Dzuhur: "Dhuhr",
  Ashar: "Asr",
  Maghrib: "Maghrib",
  Isya: "Isha",
};

const DAY_NAMES = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const DAY_SHORT = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

function shiftDateKey(key: string, deltaDays: number): string {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, m - 1, d + deltaDays);
  const yy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function PrayerStreak({ className = "" }: { className?: string }) {
  const { todayPrayers, togglePrayer, streak, history, prayerSchedule, checkAndResetDay } = usePrayerStore();
  const { addXp } = useGamificationStore();
  const [now, setNow] = useState(() => getWitaTime());

  // --- INITIALIZATION & TIME TICKER ---
  useEffect(() => {
    checkAndResetDay();
    const timer = setInterval(() => {
      setNow(getWitaTime());
    }, 30000);
    return () => clearInterval(timer);
  }, [checkAndResetDay]);

  // --- ACTIONS ---
  const handleToggle = (prayer: string) => {
    const wasChecked = todayPrayers.includes(prayer);
    togglePrayer(prayer);
    if (!wasChecked) {
      addXp(10, `Sholat ${prayer}`);
      sfx.playSuccess();
      if (navigator.vibrate) navigator.vibrate([50, 50]);
    }
  };

  const todayKey = getWitaDate();
  const nowMin = toMinutes(now);

  const isPrayerOpen = (prayer: string) => {
    const scheduleKey = PRAYER_TO_SCHEDULE[prayer];
    const scheduleTime = prayerSchedule?.[scheduleKey as keyof typeof prayerSchedule];
    if (!scheduleTime) return true;
    return nowMin >= toMinutes(scheduleTime);
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const key = shiftDateKey(todayKey, i - 6);
    const date = new Date(key + "T12:00:00");
    return {
      key,
      label: DAY_NAMES[date.getDay()],
      shortLabel: DAY_SHORT[date.getDay()],
      isToday: key === todayKey,
      prayers: history[key] || [],
    };
  });

  return (
    <div className={`rounded-3xl border bg-card p-6 md:p-8 ${className}`}>
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-1">Tracker Sholat</h2>
          <p className="text-sm text-muted-foreground">Checklist sholat harian & pantau konsistensi ibadahmu.</p>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 px-5 py-3 rounded-2xl shadow-sm w-fit">
          <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-md">
            <Flame className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Konsistensi</p>
            <p className="text-xl font-display font-bold text-amber-700 dark:text-amber-500">{streak} Hari Streak</p>
          </div>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* --- LEFT COLUMN: TODAY CHECKLIST --- */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b">
            <Check className="h-5 w-5 text-emerald-500" />
            <h3 className="font-display font-bold text-lg">Hari Ini</h3>
          </div>

          <div className="space-y-3">
            {prayers.map((prayer) => {
              const isChecked = todayPrayers.includes(prayer);
              const isOpen = isPrayerOpen(prayer);
              const scheduleKey = PRAYER_TO_SCHEDULE[prayer];
              const scheduleTime = prayerSchedule?.[scheduleKey as keyof typeof prayerSchedule];
              const locked = !isOpen && !isChecked;

              return (
                <motion.button
                  key={prayer}
                  onClick={() => isOpen && !isChecked && handleToggle(prayer)}
                  disabled={!isOpen || isChecked}
                  whileTap={isOpen && !isChecked ? { scale: 0.98 } : undefined}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all shadow-sm ${
                    isChecked
                      ? "bg-emerald-500 text-white shadow-emerald-500/20 border-emerald-600"
                      : locked
                      ? "bg-muted/30 border-dashed border-muted-foreground/30 opacity-60 cursor-not-allowed"
                      : "bg-card border hover:border-primary/50 hover:shadow-md cursor-pointer"
                  } border`}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors shadow-inner ${
                        isChecked ? "bg-white/20 text-white" : locked ? "bg-muted-foreground/10" : "bg-primary/10 text-primary"
                      }`}
                      animate={isChecked ? { scale: [1, 1.2, 1] } : {}}
                    >
                      {isChecked ? <Check className="h-5 w-5" /> : locked ? <Lock className="h-4 w-4 text-muted-foreground" /> : <div className="h-2 w-2 rounded-full bg-primary" />}
                    </motion.div>
                    
                    <div className="text-left">
                      <span className={`font-bold block ${isChecked ? "text-white" : "text-foreground"}`}>{prayer}</span>
                      {locked && scheduleTime ? (
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          Terkunci hingga {scheduleTime}
                        </span>
                      ) : (
                        <span className={`text-[10px] font-medium ${isChecked ? "text-emerald-100" : "text-muted-foreground"}`}>
                          {scheduleTime ? `Waktu: ${scheduleTime}` : "Menunggu sinkronisasi"}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 text-center">
            <p className="text-xs text-primary font-bold">
              Checklist otomatis terbuka sesuai waktu sholat daerahmu.
            </p>
          </div>
        </div>

        {/* --- RIGHT COLUMN: 7-DAY RECAP --- */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b">
            <CalendarCheck className="h-5 w-5 text-primary" />
            <h3 className="font-display font-bold text-lg">Rekap 7 Hari</h3>
          </div>

          <div className="space-y-2.5">
            {weekDays.map((day) => {
              const count = day.prayers.length;
              const complete = count === 5;
              return (
                <div
                  key={day.key}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    day.isToday ? "bg-primary/5 border-primary/30 shadow-sm" : "bg-card border-border/60"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-[90px]">
                    <span className={`text-xs font-bold ${day.isToday ? "text-primary" : "text-foreground"}`}>
                      {day.label}
                    </span>
                    {day.isToday && (
                      <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">
                        Hari ini
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {prayers.map((p) => {
                      const checked = day.prayers.includes(p);
                      return (
                        <span
                          key={p}
                          title={`${p}: ${checked ? "Selesai" : "Belum"}`}
                          className={`h-6 w-6 sm:h-7 sm:w-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                            checked
                              ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                              : day.isToday
                              ? "bg-muted/40 text-muted-foreground border border-dashed"
                              : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                          }`}
                        >
                          {checked ? <Check className="h-3.5 w-3.5" /> : !day.isToday && <X className="h-3 w-3" />}
                        </span>
                      );
                    })}
                  </div>

                  <span
                    className={`text-xs font-bold min-w-[32px] text-right ${
                      complete ? "text-emerald-500" : "text-muted-foreground"
                    }`}
                  >
                    {count}/5
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
