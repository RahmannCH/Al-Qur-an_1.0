"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { useGamificationStore } from "@/store/gamification-store";
import { Lightbulb, RefreshCcw, GripVertical } from "lucide-react";

const puzzleData = [
  {
    surah: "Al-Ikhlas: 1",
    words: ["قُلْ", "هُوَ", "اللَّهُ", "أَحَدٌ"],
    translation: "Katakanlah: Dia-lah Allah, Yang Maha Esa"
  },
  {
    surah: "Al-Ikhlas: 2",
    words: ["اللَّهُ", "الصَّمَدُ"],
    translation: "Allah tempat bergantung"
  },
  {
    surah: "Al-Falaq: 1",
    words: ["قُلْ", "أَعُوذُ", "بِرَبِّ", "الْفَلَقِ"],
    translation: "Katakanlah: Aku berlindung kepada Rabb yang menguasai subuh"
  }
];

function calculateXpWithPenalty(baseXp: number, hintsUsed: number): number {
  if (hintsUsed === 0) return baseXp;
  if (hintsUsed === 1) return Math.ceil(baseXp * 0.5);
  return 3;
}

export default function SambungAyatGame() {
  const [currentPuzzle, setCurrentPuzzle] = useState(() => {
    const idx = Math.floor(Math.random() * puzzleData.length);
    const puzzle = puzzleData[idx];
    return {
      ...puzzle,
      shuffled: [...puzzle.words].sort(() => Math.random() - 0.5)
    };
  });
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { addXp } = useGamificationStore();

  const handleDrop = (word: string) => {
    if (isComplete || userOrder.includes(word)) return;
    const newOrder = [...userOrder, word];
    setUserOrder(newOrder);

    if (newOrder.length === currentPuzzle.words.length) {
      const correct = newOrder.every((w, i) => w === currentPuzzle.words[i]);
      setIsCorrect(correct);
      setIsComplete(true);
      if (correct) {
        const earnedXp = calculateXpWithPenalty(15, hintsUsed);
        addXp(earnedXp, "Sambung Ayat");
        if (navigator.vibrate) navigator.vibrate(100);
      }
    }
  };

  const handleHint = () => {
    if (hintsUsed >= 1 || isComplete) return;
    setHintsUsed(1);
    const firstWord = currentPuzzle.words[0];
    if (!userOrder.includes(firstWord)) {
      setUserOrder([firstWord]);
    }
  };

  const handleReset = () => {
    const idx = Math.floor(Math.random() * puzzleData.length);
    const puzzle = puzzleData[idx];
    setCurrentPuzzle({
      ...puzzle,
      shuffled: [...puzzle.words].sort(() => Math.random() - 0.5)
    });
    setUserOrder([]);
    setIsComplete(false);
    setIsCorrect(null);
    setHintsUsed(0);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <BackButton />

      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GripVertical className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-display font-bold">Sambung Ayat</h1>
        </div>
        <p className="text-muted-foreground">Susun kata-kata ayat dengan urutan yang benar</p>
      </div>

      <div className="bg-card border rounded-2xl p-6 mb-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">Terjemahan:</p>
        <p className="text-lg">{currentPuzzle.translation}</p>
        <p className="text-xs text-muted-foreground mt-3">{currentPuzzle.surah}</p>
      </div>

      <div className="mb-8">
        <p className="text-sm font-medium text-muted-foreground mb-3">Urutan Kamu:</p>
        <div className="min-h-[80px] rounded-xl border-2 border-dashed border-primary/30 p-4 flex flex-wrap gap-2 items-center justify-center">
          {userOrder.length === 0 ? (
            <p className="text-sm text-muted-foreground">Tap kata di bawah untuk menyusun</p>
          ) : (
            userOrder.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-arabic text-xl"
                dir="rtl"
              >
                {word}
              </motion.span>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {currentPuzzle.shuffled.map((word, idx) => {
          const used = userOrder.includes(word);
          return (
            <motion.button
              key={idx}
              whileHover={!used ? { scale: 1.05 } : {}}
              whileTap={!used ? { scale: 0.95 } : {}}
              onClick={() => handleDrop(word)}
              disabled={used || isComplete}
              className={`px-5 py-3 rounded-xl font-arabic text-xl transition-all ${
                used
                  ? "opacity-30 cursor-not-allowed"
                  : "bg-accent hover:bg-primary hover:text-primary-foreground shadow-sm"
              }`}
              dir="rtl"
            >
              {word}
            </motion.button>
          );
        })}
      </div>

      {!isComplete && (
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleHint} disabled={hintsUsed >= 1}>
            <Lightbulb className="h-4 w-4 mr-2" />
            Hint {hintsUsed > 0 && "(-50% XP)"}
          </Button>
          <Button variant="ghost" className="flex-1" onClick={handleReset}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      )}

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl text-center ${isCorrect ? "bg-emerald/10 border border-emerald/30" : "bg-destructive/10 border border-destructive/30"}`}
        >
          <p className={`text-3xl mb-3 ${isCorrect ? "text-emerald" : "text-destructive"}`}>
            {isCorrect ? "🎉 Benar!" : "❌ Kurang Tepat"}
          </p>
          <p className="text-muted-foreground mb-4">
            {isCorrect
              ? `+${calculateXpWithPenalty(15, hintsUsed)} XP`
              : "Coba lagi!"}
          </p>
          <Button onClick={handleReset} className="w-full">
            Main Lagi
          </Button>
        </motion.div>
      )}
    </div>
  );
}
