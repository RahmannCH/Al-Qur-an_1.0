"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, RefreshCw, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";

export function DailyAyat() {
  const [ayahData, setAyahData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(false);

  const fetchRandomDailyAyah = useCallback(async () => {
    setLoading(true);
    setIsRotating(true);
    try {
      // Pick random chapter from short surahs for reflection (e.g., Juz 28-30 or specific reflection surahs)
      const reflectionSurahs = [2, 3, 18, 20, 24, 36, 49, 55, 56, 67, 78, 87, 89, 93, 94];
      const randomChapter = reflectionSurahs[Math.floor(Math.random() * reflectionSurahs.length)];
      
      const chapterRes = await fetch(`https://api.quran.com/api/v4/chapters/${randomChapter}?language=id`);
      const chapterData = await chapterRes.json();
      const chapterName = chapterData.chapter.name_simple;
      const versesCount = chapterData.chapter.verses_count;

      const randomVerse = Math.floor(Math.random() * versesCount) + 1;

      const verseRes = await fetch(
        `https://api.quran.com/api/v4/verses/by_chapter/${randomChapter}?language=id&fields=text_uthmani&translations=33&page=1&per_page=1&verse_number=${randomVerse}`
      );
      const verseData = await verseRes.json();
      const verse = verseData.verses[0];

      // Simplified reflection generator based on text
      const translation = verse.translations?.[0]?.text?.replace(/<[^>]*>/g, "") || "";
      const reflectionText = "Jadikanlah ayat ini sebagai pedoman dan renungan untuk memperbaiki diri pada hari ini.";

      setAyahData({
        surahId: randomChapter,
        surahName: chapterName,
        verseNumber: randomVerse,
        arabic: verse.text_uthmani,
        translation: translation,
        reflection: reflectionText
      });
    } catch (error) {
      console.error("Gagal memuat ayat harian", error);
    } finally {
      setLoading(false);
      setTimeout(() => setIsRotating(false), 500); // Stop animation smoothly
    }
  }, []);

  useEffect(() => {
    fetchRandomDailyAyah();
  }, [fetchRandomDailyAyah]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-gradient-to-br from-primary/5 via-gold/5 to-teal/5 p-6 md:p-8 overflow-hidden relative shadow-sm"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-teal/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl shadow-inner">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Inspirasi Ayat</p>
              {ayahData && (
                <Link href={`/surah/${ayahData.surahId}#verse-${ayahData.verseNumber}`} className="text-sm font-bold text-primary hover:underline">
                  QS. {ayahData.surahName}: {ayahData.verseNumber}
                </Link>
              )}
            </div>
          </div>
          <button 
            onClick={fetchRandomDailyAyah} 
            disabled={loading}
            className="p-2.5 bg-card border shadow-sm hover:bg-accent hover:text-primary rounded-xl transition-all outline-none"
            aria-label="Refresh Ayat"
          >
            <RefreshCw className={`h-5 w-5 text-muted-foreground ${isRotating ? 'animate-spin text-primary' : ''}`} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {loading || !ayahData ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12 flex flex-col items-center justify-center space-y-4">
               <Loader2 className="h-8 w-8 animate-spin text-gold" />
               <p className="text-muted-foreground text-sm font-medium">Mencari inspirasi ayat untukmu...</p>
            </motion.div>
          ) : (
            <motion.div key="content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <p className="font-arabic text-3xl text-primary leading-loose mb-6" dir="rtl">
                {ayahData.arabic}
              </p>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-foreground/90 font-medium">
                  "{ayahData.translation}"
                </p>
                <div className="p-4 bg-gold/10 rounded-2xl border border-gold/20 flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gold/80 mb-1 uppercase tracking-wider">Renungan</p>
                    <p className="text-sm text-foreground/80 font-medium">{ayahData.reflection}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
