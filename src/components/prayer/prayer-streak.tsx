"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePrayerStore, getWitaDate, getWitaTime } from "@/store/prayer-store";
import { useGamificationStore } from "@/store/gamification-store";
import { Check, Flame, Lock, CalendarCheck } from "lucide-react";

const prayers = ["Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];

const PRAYER_TO_SCHEDULE: Record<string, string> = {
  Subuh: "Fajr",
  Dzuhur: "Dhuhr",
  Ashar: "Asr",
  Maghrib: "Maghrib",
  Isya: "Isha",
};

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

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
  const { todayPrayers, togglePrayer, streak, history, prayerSchedule } = usePrayerStore();
  const { addXp } = useGamificationStore();
  const [now, setNow] = useState(() => getWitaTime());

  // Perbarui waktu setiap 30 detik agar status kunci otomatis ter-update
  useEffect(() => {
    const timer = setInterval(() => setNow(getWitaTime()), 30000);
    return () => clearInterval(timer);
  }, []);

  const handleToggle = (prayer: string) => {
    const wasChecked = todayPrayers.includes(prayer);
    togglePrayer(prayer);
    if (!wasChecked) {
      addXp(10, `Sholat ${prayer}`);
    }
  };

  const todayKey = getWitaDate();
  const nowMin = toMinutes(now);

  const isPrayerOpen = (prayer: string) => {
    const scheduleKey = PRAYER_TO_SCHEDULE[prayer];
    const scheduleTime = prayerSchedule?.[scheduleKey as keyof typeof prayerSchedule];
    if (!scheduleTime) return true; // jadwal belum tersedia → izinkan centang
    return nowMin >= toMinutes(scheduleTime);
  };

  // Rekap 7 hari terakhir (WITA)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const key = shiftDateKey(todayKey, i - 6);
    const date = new Date(key + "T12:00:00");
    return {
      key,
      label: DAY_NAMES[date.getDay()],
      isToday: key === todayKey,
      prayers: history[key] || [],
    };
  });

  return (
    <div className={`rounded-3xl border bg-card p-6 md:p-8 ${className}`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold">Tracker Sholat</h2>
        <div className="flex items-center gap-2 bg-gradient-to-r from-gold/20 to-gold/10 px-4 py-2 rounded-full">
          <Flame className="h-5 w-5 text-gold" />
          <span className="text-sm md:text-base font-bold text-gold">{streak} Hari Streak</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Kolom Checklist */}
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
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                isChecked
                  ? "bg-gradient-to-r from-emerald/20 to-emerald/10 border-emerald/30"
                  : locked
                  ? "bg-muted/20 border-dashed opacity-60 cursor-not-allowed"
                  : "bg-muted/30 hover:bg-muted/50 cursor-pointer"
              } border`}
            >
              <div className="flex items-center gap-3">
                <span className="font-medium">{prayer}</span>
                {locked && scheduleTime && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                    <Lock className="h-3 w-3" />
                    Buka {scheduleTime}
                  </span>
                )}
              </div>
              <motion.div
                className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors ${
                  isChecked ? "bg-emerald text-white" : locked ? "bg-muted" : "bg-primary/15"
                }`}
                animate={isChecked ? { scale: [1, 1.2, 1] } : {}}
              >
                {isChecked && <Check className="h-4 w-4" />}
              </motion.div>
            </motion.button>
          );
        })}

        {/* Info Box di bawah checklist */}
        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <p className="text-sm text-foreground/80 font-medium text-center">
            Checklist sholat harian untuk mendapat streak bonus XP!
          </p>
        </div>
      </div>

      {/* Kolom Kanan: Rekap Mingguan */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CalendarCheck className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-base uppercase tracking-wider text-muted-foreground">
            Rekap 7 Hari
          </h3>
        </div>
        <div className="space-y-2">
          {weekDays.map((day) => {
            const count = day.prayers.length;
            const complete = count === 5;
            return (
              <div
                key={day.key}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border ${
                  day.isToday ? "bg-primary/5 border-primary/20" : "bg-muted/10 border-muted/20"
                }`}
              >
                <div className="flex items-center gap-2 w-20">
                  <span className={`text-xs font-bold ${day.isToday ? "text-primary" : "text-muted-foreground"}`}>
                    {day.label}
                  </span>
                  {day.isToday && (
                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">
                      Hari ini
                    </span>
                  )}
                </div>
                <div className="flex gap-1.5">
                  {prayers.map((p) => {
                    const checked = day.prayers.includes(p);
                    return (
                      <span
                        key={p}
                        className={`h-5 w-5 rounded-full flex items-center justify-center ${
                          checked ? "bg-emerald text-white" : "bg-muted/40"
                        }`}
                      >
                        {checked && <Check className="h-3 w-3" />}
                      </span>
                    );
                  })}
                </div>
                <span
                  className={`text-xs font-bold w-8 text-right ${
                    complete ? "text-emerald" : "text-muted-foreground"
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
