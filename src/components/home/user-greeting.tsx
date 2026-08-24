"use client";

import { useSettingsStore } from "@/store/settings-store";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const MOTIVATION_QUOTES = [
  "Awali hari dengan membaca ayat suci dan doa.",
  "Setiap ayat yang dibaca adalah satu kebaikan berlipat sepuluh.",
  "Istiqamah dalam amalan kecil lebih dicintai Allah daripada banyak tapi terputus.",
  "Jadikan Al-Qur'an sebagai penyejuk hati dan penerang langkahmu.",
  "Luangkan waktu untuk bekal akhirat, jangan tunggu waktu luang."
];

export function UserGreeting() {
  const { userName } = useSettingsStore();
  const [mounted, setMounted] = useState(false);
  const [timeGreeting, setTimeGreeting] = useState("Selamat Datang");
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) {
      setTimeGreeting("Selamat Pagi");
    } else if (hour >= 11 && hour < 15) {
      setTimeGreeting("Selamat Siang");
    } else if (hour >= 15 && hour < 18) {
      setTimeGreeting("Selamat Sore");
    } else {
      setTimeGreeting("Selamat Malam");
    }
    
    // Pilih quote harian deterministik
    const day = new Date().getDate();
    setQuoteIndex(day % MOTIVATION_QUOTES.length);
  }, []);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
          {timeGreeting}
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
        Assalamu&apos;alaikum{mounted && userName ? `, ${userName}` : ""}
      </h1>
      <p className="text-xs md:text-sm text-muted-foreground font-medium flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
        <span>{MOTIVATION_QUOTES[quoteIndex]}</span>
      </p>
    </div>
  );
}
