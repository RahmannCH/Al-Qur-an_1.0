"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { useGamificationStore } from "@/store/gamification-store";
import { Lightbulb, RefreshCcw, GripVertical, Loader2 } from "lucide-react";

interface Puzzle {
  surah: string;
  words: string[];
  shuffled: string[];
  translation: string;
}

function calculateXpWithPenalty(baseXp: number, hintsUsed: number): number {
  if (hintsUsed === 0) return baseXp;
  if (hintsUsed === 1) return Math.ceil(baseXp * 0.5);
  return 3;
}

const cleanArabicText = (text: string) => {
  return text.trim();
};

export default function SambungAyatGame() {
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { addXp } = useGamificationStore();

  const fetchRandomAyah = useCallback(async () => {
    setLoading(true);
    try {
      const randomChapter = Math.floor(Math.random() * (114 - 78 + 1)) + 78;
      const chapterRes = await fetch(`https://api.quran.com/api/v4/chapters/${randomChapter}?language=id`);
      const chapterData = await chapterRes.json();
      const chapterName = chapterData.chapter.name_simple;
      const versesCount = chapterData.chapter.verses_count;
      const randomVerse = Math.floor(Math.random() * versesCount) + 1;

      const verseRes = await fetch(
        `https://api.quran.com/api/v4/verses/by_chapter/${randomChapter}?language=id&words=true&translations=33&page=1&per_page=1&verse_number=${randomVerse}`
      );
      const verseData = await verseRes.json();
      const verse = verseData.verses[0];

      let words = verse.words
        .map((w: any) => cleanArabicText(w.text_uthmani))
        .filter((w: string) => w !== "" && !w.match(/^[0-9]+$/) && !w.includes("۝"));

      if (words.length > 7) words = words.slice(0, Math.floor(Math.random() * 3) + 4);
      if (words.length < 2) throw new Error("Verse too short");

      const translation = verse.translations?.[0]?.text?.replace(/<[^>]*>/g, "") || "Terjemahan tidak tersedia";

      setCurrentPuzzle({
        surah: `${chapterName}: ${randomVerse}`,
        words: words,
        shuffled: [...words].sort(() => Math.random() - 0.5),
        translation: translation
      });

    } catch (e) {
      console.error("Failed to fetch ayah, retrying...", e);
      setTimeout(fetchRandomAyah, 1000);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomAyah();
  }, [fetchRandomAyah]);

  const handleDrop = (word: string) => {
    if (isComplete || userOrder.includes(word) || !currentPuzzle) return;
    const newOrder = [...userOrder, word];
    setUserOrder(newOrder);

    if (newOrder.length === currentPuzzle.words.length) {
      const correct = newOrder.every((w, i) => w === currentPuzzle.words[i]);
      setIsCorrect(correct);
      setIsComplete(true);
      if (correct) {
        const earnedXp = calculateXpWithPenalty(15, hintsUsed);
        addXp(earnedXp, "Sambung Ayat");
        if (navigator.vibrate) navigator.vibrate([50, 50, 100]);
      } else {
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      }
    }
  };

  const handleHint = () => {
    if (hintsUsed >= 1 || isComplete || !currentPuzzle) return;
    setHintsUsed(1);
    const nextCorrectWord = currentPuzzle.words[userOrder.length];
    if (nextCorrectWord && !userOrder.includes(nextCorrectWord)) handleDrop(nextCorrectWord);
  };

  const handleReset = () => {
    setUserOrder([]);
    setIsComplete(false);
    setIsCorrect(null);
    setHintsUsed(0);
    fetchRandomAyah();
  };

  if (loading || !currentPuzzle) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 flex flex-col items-center justify-center text-center">
        <BackButton />
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-display font-bold">Mencari Ayat...</h2>
        <p className="text-muted-foreground">Menjelajahi lautan Al-Qur'an</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <BackButton />
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GripVertical className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-display font-bold">Sambung Ayat</h1>
        </div>
        <p className="text-muted-foreground">Susun kata-kata dari kanan ke kiri</p>
      </div>

      <div className="bg-card border rounded-2xl p-6 mb-6 text-center shadow-sm">
        <p className="text-sm text-muted-foreground mb-2 font-semibold">Bantuan Terjemahan:</p>
        <p className="text-lg leading-relaxed">"{currentPuzzle.translation}"</p>
        <p className="text-xs font-bold text-primary mt-3 bg-primary/10 inline-block px-3 py-1 rounded-full">{currentPuzzle.surah}</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-bold text-muted-foreground">Susunan Ayat (Baca dari Kanan ➡️ Kiri):</p>
        </div>
        <div className="min-h-[100px] rounded-2xl border-2 border-dashed border-primary/30 p-5 flex flex-wrap gap-3 items-center justify-start bg-accent/20" dir="rtl">
          {userOrder.length === 0 ? (
            <p className="text-sm text-muted-foreground w-full text-center my-auto" dir="ltr">Tap kata di bawah untuk mulai menyusun</p>
          ) : (
            <AnimatePresence>
              {userOrder.map((word, idx) => (
                <motion.span
                  key={idx + word}
                  initial={{ opacity: 0, scale: 0.5, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className="bg-gradient-to-br from-primary to-teal text-white px-5 py-3 rounded-xl font-arabic text-2xl shadow-md"
                >
                  {word}
                </motion.span>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8" dir="rtl">
        {currentPuzzle.shuffled.map((word, idx) => {
          const used = userOrder.includes(word);
          return (
            <motion.button
              key={idx + word}
              whileHover={!used ? { scale: 1.05, y: -2 } : {}}
              whileTap={!used ? { scale: 0.95 } : {}}
              onClick={() => handleDrop(word)}
              disabled={used || isComplete}
              className={`px-6 py-4 rounded-xl font-arabic text-2xl transition-all shadow-sm border ${
                used ? "opacity-20 cursor-not-allowed bg-muted border-transparent" : "bg-card border-border hover:border-primary hover:shadow-md text-foreground"
              }`}
            >
              {word}
            </motion.button>
          );
        })}
      </div>

      {!isComplete && (
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 border-gold/30 text-gold hover:bg-gold/10 hover:text-gold" onClick={handleHint} disabled={hintsUsed >= 1}>
            <Lightbulb className="h-4 w-4 mr-2" />
            Bantu Kata Selanjutnya {hintsUsed > 0 && "(-50% XP)"}
          </Button>
          <Button variant="ghost" className="flex-1" onClick={handleReset}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      )}

      {isComplete && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-2xl text-center shadow-lg ${isCorrect ? "bg-gradient-to-br from-emerald/20 to-emerald/5 border border-emerald/30" : "bg-gradient-to-br from-destructive/20 to-destructive/5 border border-destructive/30"}`}>
          <p className={`text-4xl mb-4 font-bold ${isCorrect ? "text-emerald" : "text-destructive"}`}>
            {isCorrect ? "Masha Allah! Benar! 🎉" : "Kurang Tepat 😢"}
          </p>
          {!isCorrect && (
            <div className="mb-6 p-4 bg-background/50 rounded-xl">
              <p className="text-sm font-bold mb-2">Urutan yang benar:</p>
              <div className="flex flex-wrap gap-2 justify-center" dir="rtl">
                {currentPuzzle.words.map((w, i) => <span key={i} className="font-arabic text-xl text-emerald">{w}</span>)}
              </div>
            </div>
          )}
          <p className="font-bold text-lg mb-6">
            {isCorrect ? `Kamu mendapatkan +${calculateXpWithPenalty(15, hintsUsed)} XP` : "Terus semangat belajar, ayo coba lagi!"}
          </p>
          <Button onClick={handleReset} className="w-full h-14 text-lg bg-primary hover:scale-[1.02] transition-transform">
            Mainkan Ayat Lain
          </Button>
        </motion.div>
      )}
    </div>
  );
}
