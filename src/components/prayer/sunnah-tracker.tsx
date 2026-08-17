"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Heart, Award, Info } from "lucide-react";
import { useGamificationStore } from "@/store/gamification-store";
import { sfx } from "@/lib/sfx";

interface SunnahTrackerProps {
  hijriDate: {
    day: string;
    month: { en: string; number: number };
    year: string;
  };
  gregorianDate: {
    weekday: { en: string };
  };
}

export function SunnahTracker({ hijriDate, gregorianDate }: SunnahTrackerProps) {
  const { addXp } = useGamificationStore();
  const [completedDeeds, setCompletedDeeds] = useState<string[]>([]);

  // Deteksi Puasa Sunnah Terdekat
  const dayNum = parseInt(hijriDate.day);
  const weekday = gregorianDate.weekday.en.toLowerCase();
  
  let fastingRecommendation = { title: "Puasa Sunnah", desc: "Perbanyak amalan puasa sunnah.", type: "general" };

  // Cek Ayyamul Bidh (13, 14, 15 Hijriyah)
  if (dayNum >= 11 && dayNum <= 15) {
    if (dayNum >= 13 && dayNum <= 15) {
      fastingRecommendation = { title: "Puasa Ayyamul Bidh", desc: "Hari ini adalah jadwal puasa Ayyamul Bidh (13, 14, 15 Hijriyah).", type: "ayyamul-bidh" };
    } else {
      fastingRecommendation = { title: "Persiapan Ayyamul Bidh", desc: `Ayyamul Bidh sebentar lagi (mulai tanggal 13). Sekarang tanggal ${dayNum}.`, type: "ayyamul-bidh" };
    }
  } 
  // Cek Senin Kamis
  else if (weekday === "monday" || weekday === "thursday") {
    fastingRecommendation = { title: `Puasa Sunnah ${weekday === "monday" ? "Senin" : "Kamis"}`, desc: "Hari ini disunnahkan untuk berpuasa.", type: "senin-kamis" };
  } else if (weekday === "sunday" || weekday === "wednesday") {
    fastingRecommendation = { title: `Persiapan Puasa ${weekday === "sunday" ? "Senin" : "Kamis"}`, desc: "Besok disunnahkan untuk berpuasa sunnah.", type: "senin-kamis" };
  }

  const dailyDeeds = [
    { id: "rawatib", name: "Sholat Rawatib", desc: "Qobliyah & Ba'diyah", xp: 15 },
    { id: "dhuha", name: "Sholat Dhuha", desc: "Minimal 2 rakaat", xp: 15 },
    { id: "tahajud", name: "Sholat Tahajud", desc: "Di sepertiga malam", xp: 20 },
    { id: "sedekah", name: "Sedekah Harian", desc: "Meskipun hanya senyum", xp: 10 },
  ];

  // Tambahkan Al-Kahfi jika hari Jumat (Jumat hijriah masuk Kamis malam - Jumat sore)
  if (weekday === "friday" || weekday === "thursday") {
    dailyDeeds.push({ id: "alkahfi", name: "Baca Al-Kahfi", desc: "Sunnah di hari Jumat", xp: 25 });
  }

  const handleToggleDeed = (id: string, xp: number, name: string) => {
    if (completedDeeds.includes(id)) return; // Hanya bisa centang sekali per sesi browser

    sfx.playSuccess();
    setCompletedDeeds([...completedDeeds, id]);
    addXp(xp, `Amalan Sunnah: ${name}`);
  };

  return (
    <div className="rounded-3xl border bg-card p-6 md:p-8 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
          <Star className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold">Amalan Sunnah</h2>
          <p className="text-xs text-muted-foreground font-medium">Panen pahala dan Zad Points (ZP) ekstra</p>
        </div>
      </div>

      {/* Rekomendasi Puasa */}
      <div className={`p-5 rounded-2xl border mb-6 ${
        fastingRecommendation.type !== "general" 
          ? "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30" 
          : "bg-muted/30"
      }`}>
        <div className="flex items-start gap-3">
          <Info className={`h-5 w-5 shrink-0 mt-0.5 ${fastingRecommendation.type !== "general" ? "text-amber-600" : "text-muted-foreground"}`} />
          <div>
            <h4 className={`font-bold text-sm mb-1 ${fastingRecommendation.type !== "general" ? "text-amber-800 dark:text-amber-400" : "text-foreground"}`}>
              {fastingRecommendation.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{fastingRecommendation.desc}</p>
          </div>
        </div>
      </div>

      {/* Checklist Amalan */}
      <div className="space-y-3 flex-1">
        <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <Heart className="h-4 w-4 text-rose-500 fill-rose-500/20" /> Checklist Harian
        </h4>
        
        {dailyDeeds.map((deed, idx) => {
          const isCompleted = completedDeeds.includes(deed.id);
          
          return (
            <motion.button
              key={deed.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleToggleDeed(deed.id, deed.xp, deed.name)}
              disabled={isCompleted}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border text-left ${
                isCompleted 
                  ? "bg-emerald-500/10 border-emerald-500/30" 
                  : "bg-card hover:border-primary/40 hover:shadow-sm"
              }`}
            >
              <div>
                <p className={`font-bold text-sm ${isCompleted ? "text-emerald-700 dark:text-emerald-400" : "text-foreground"}`}>
                  {deed.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{deed.desc}</p>
              </div>

              <div className="flex items-center gap-3">
                {!isCompleted && (
                  <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 px-2 py-1 rounded-md flex items-center gap-1">
                    <Award className="h-3 w-3" /> +{deed.xp} ZP
                  </span>
                )}
                <div className={`h-6 w-6 rounded-full flex items-center justify-center border transition-colors ${
                  isCompleted ? "bg-emerald-500 border-emerald-600 text-white" : "border-muted-foreground/30 text-transparent"
                }`}>
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
