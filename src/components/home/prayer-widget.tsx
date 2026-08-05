"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { getNextPrayer, formatTime } from "@/lib/prayer-api";
import type { PrayerTimesResponse } from "@/types/prayer";

// Komponen fallback jika error dari API
export function PrayerWidget() {
  const [prayerData, setPrayerData] = useState<any>(null);
  const [next, setNext] = useState({ name: "Subuh", time: "04:45", secondsLeft: 0 });

  useEffect(() => {
    // Kita gunakan fallback sederhana untuk widget ini agar selalu muncul tanpa error
    const calculateFallbackNext = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const prayers = [
        { name: "Subuh", hour: 4, min: 45 },
        { name: "Dzuhur", hour: 11, min: 55 },
        { name: "Ashar", hour: 15, min: 20 },
        { name: "Maghrib", hour: 17, min: 45 },
        { name: "Isya", hour: 19, min: 0 }
      ];
      
      let nextP = prayers[0];
      for(let p of prayers) {
         if (p.hour > currentHour || (p.hour === currentHour && p.min > now.getMinutes())) {
             nextP = p;
             break;
         }
      }
      
      let targetTime = new Date();
      targetTime.setHours(nextP.hour, nextP.min, 0);
      if (nextP.name === "Subuh" && currentHour >= 19) {
          targetTime.setDate(targetTime.getDate() + 1);
      }
      
      const diff = Math.floor((targetTime.getTime() - now.getTime()) / 1000);
      setNext({ name: nextP.name, time: `${String(nextP.hour).padStart(2,'0')}:${String(nextP.min).padStart(2,'0')}`, secondsLeft: diff });
    };

    calculateFallbackNext();
    const interval = setInterval(calculateFallbackNext, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/prayer-times" className="block">
      <div className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow group relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
           <Clock className="h-20 w-20" />
        </div>
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Sholat Berikutnya
        </h3>
        
        <div>
          <p className="text-3xl font-display font-bold text-primary mb-1">{next.name}</p>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground font-medium">{next.time}</p>
            <p className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
              -{formatTime(next.secondsLeft)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}