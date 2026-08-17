"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, MapPin, Loader2, Compass, ArrowRight } from "lucide-react";
import { formatTime } from "@/lib/prayer-api";
import { usePrayerStore } from "@/store/prayer-store";
import { sfx } from "@/lib/sfx";

export function PrayerWidget() {
  const { prayerSchedule, locationName, fetchAndSyncLocation } = usePrayerStore();
  const [next, setNext] = useState({ name: "Menghitung...", time: "--:--", secondsLeft: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchAndSyncLocation(); // Trigger background GPS fetch when home is opened
  }, [fetchAndSyncLocation]);

  useEffect(() => {
    if (!prayerSchedule) return;

    const calculateNext = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMin = now.getMinutes();
      const currentTotalMins = currentHour * 60 + currentMin;

      const prayers = [
        { name: "Subuh", key: "Fajr" },
        { name: "Dzuhur", key: "Dhuhr" },
        { name: "Ashar", key: "Asr" },
        { name: "Maghrib", key: "Maghrib" },
        { name: "Isya", key: "Isha" }
      ];

      let nextP = prayers[0];
      let nextTimeStr = prayerSchedule.Fajr;

      for (let p of prayers) {
        const timeStr = prayerSchedule[p.key as keyof typeof prayerSchedule] as string;
        if (!timeStr) continue;
        
        const [h, m] = timeStr.split(":").map(Number);
        if (h * 60 + m > currentTotalMins) {
          nextP = p;
          nextTimeStr = timeStr;
          break;
        }
      }

      let targetTime = new Date();
      const [tH, tM] = nextTimeStr.split(":").map(Number);
      targetTime.setHours(tH, tM, 0);

      // Jika lewat isya, target subuh besok
      if (nextP.name === "Subuh" && currentTotalMins >= 19 * 60) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const diff = Math.floor((targetTime.getTime() - now.getTime()) / 1000);
      setNext({ name: nextP.name, time: nextTimeStr, secondsLeft: diff });
    };

    calculateNext();
    const interval = setInterval(calculateNext, 1000);
    return () => clearInterval(interval);
  }, [prayerSchedule]);

  if (!mounted) return null;

  return (
    <Link href="/prayer-times" className="block">
      <div className="rounded-3xl border bg-card p-6 hover:shadow-lg transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
           <Clock className="h-32 w-32 -mr-10 -mt-10" />
        </div>
        
        <h3 className="font-display font-bold mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" /> Sholat Berikutnya
          </span>
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1 max-w-[120px] truncate">
            <MapPin className="h-3 w-3 shrink-0" /> {locationName.split(",")[0]}
          </span>
        </h3>
        
        {!prayerSchedule ? (
           <div className="flex items-center gap-3 text-muted-foreground animate-pulse mt-6">
             <Loader2 className="h-5 w-5 animate-spin" /> Menyelaraskan waktu...
           </div>
        ) : (
          <div className="mt-2">
            <p className="text-4xl font-display font-bold text-primary mb-2 tracking-tight">{next.name}</p>
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground font-bold text-lg">{next.time}</p>
              <p className="text-sm bg-gradient-to-r from-primary to-teal text-white px-3 py-1.5 rounded-full font-bold shadow-md">
                -{formatTime(next.secondsLeft)}
              </p>
            </div>

            {/* Slot Kecil: Navigasi Ringkas ke Kompas Kiblat */}
            <div className="pt-3 border-t flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
              <span className="flex items-center gap-1.5">
                <Compass className="h-4 w-4 text-emerald-500" /> Bingung arah kiblat?
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-primary">
                Cek Kompas <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}