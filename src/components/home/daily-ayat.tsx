"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, RefreshCw } from "lucide-react";

const dailyAyahs = [
  {
    surah: "Al-Fath",
    ayah: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ إِنَّا فَتَحْنَا لَكَ فَتْحًا مُبِينًا",
    translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang. Sesungguhnya Kami telah memberi kepadamu kemenangan yang nyata.",
    reflection: "Setiap hari adalah kesempatan baru untuk meraih kemenangan dalam hidup."
  },
  {
    surah: "Al-Ankabut",
    ayah: 69,
    arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
    translation: "Dan orang-orang yang berjihad untuk (mencari keridaan) Kami, benar-benar akan Kami tunjukkan kepada mereka jalan-jalan Kami.",
    reflection: "Usaha dan dedikasi akan membawa kita pada jalan yang benar."
  },
  {
    surah: "At-Taubah",
    ayah: 51,
    arabic: "قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا",
    translation: "Katakanlah: 'Tidak akan menimpa kami kecuali apa yang telah ditetapkan Allah untuk kami.'",
    reflection: "Percayalah bahwa setiap yang terjadi adalah bagian dari rencana Allah."
  },
  {
    surah: "Al-Insyirah",
    ayah: 5,
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Karena sesungguhnya sesudah kesulitan itu ada kemudahan.",
    reflection: "Tidak ada kesulitan yang abadi, setiap ujian membawa kemudahan."
  },
];

export function DailyAyat() {
  const [currentAyah, setCurrentAyah] = useState(0);

  useEffect(() => {
    const day = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
    setCurrentAyah(day % dailyAyahs.length);
  }, []);

  const ayah = dailyAyahs[currentAyah];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border bg-gradient-to-br from-primary/5 via-gold/5 to-teal/5 p-6 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-teal/10 rounded-full -mr-16 -mt-16" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ayat Harian</p>
              <p className="text-sm font-semibold text-primary">QS. {ayah.surah}: {ayah.ayah}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <p className="font-arabic text-2xl text-primary leading-loose mb-4" dir="rtl">
          {ayah.arabic}
        </p>

        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-foreground">
            {ayah.translation}
          </p>
          <div className="p-3 bg-gold/10 rounded-lg border border-gold/20">
            <p className="text-xs text-muted-foreground mb-1">Renungan:</p>
            <p className="text-sm text-foreground italic">"{ayah.reflection}"</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
