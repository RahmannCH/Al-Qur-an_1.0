"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { useGamificationStore } from "@/store/gamification-store";
import { Lightbulb, RefreshCcw, Sparkles, Loader2 } from "lucide-react";

interface Root {
  root: string[];
  meanings: string[];
  hint: string;
}

const ARABIC_LETTERS = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"];

const ROOTS_DATA: Root[] = [
  { root: ["ع", "ل", "م"], meanings: ["Mengetahui", "Ilmu", "Mengajarkan"], hint: "Kata: Alim, Ilmu" },
  { root: ["ك", "ت", "ب"], meanings: ["Menulis", "Tulisan", "Kitab"], hint: "Kata: Kitab, Kata" },
  { root: ["ق", "ر", "أ"], meanings: ["Membaca", "Bacaan", "Quran"], hint: "Kata: Al-Quran" },
  { root: ["س", "م", "ع"], meanings: ["Mendengar", "Pendengaran"], hint: "Kata: Sami'" },
  { root: ["ب", "ص", "ر"], meanings: ["Melihat", "Penglihatan"], hint: "Kata: Bashir" },
  { root: ["خ", "ل", "ق"], meanings: ["Mencipta", "Ciptaan"], hint: "Kata: Khalq" },
  { root: ["ر", "ز", "ق"], meanings: ["Memberi rezeki"], hint: "Kata: Razaaq" },
  { root: ["ع", "ب", "د"], meanings: ["Menyembah"], hint: "Kata: Abid" },
  { root: ["خ", "ش", "ع"], meanings: ["Takut", "Khusyu"], hint: "Kata: Khosyu" },
  { root: ["ت", "ق", "ي"], meanings: ["Bertaqwa"], hint: "Kata: Taqwa" }
];

function calculateXpWithPenalty(baseXp: number, hintsUsed: number): number {
  if (hintsUsed === 0) return baseXp;
  if (hintsUsed === 1) return Math.ceil(baseXp * 0.5);
  return 3;
}

export default function HarfleGame() {
  const [targetRoot, setTargetRoot] = useState<Root>(() => ROOTS_DATA[Math.floor(Math.random() * ROOTS_DATA.length)]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedLetter, setRevealedLetter] = useState<number | null>(null);
  const { addXp } = useGamificationStore();

  const MAX_ATTEMPTS = 6;

  useEffect(() => {
    if (currentGuess.length === 3) {
      const guessStr = currentGuess.join("");
      if (!guesses.includes(guessStr)) {
        setGuesses([...guesses, guessStr]);
        const isCorrect = currentGuess.every((l, i) => l === targetRoot.root[i]);
        if (isCorrect) {
          setGameStatus("won");
          addXp(calculateXpWithPenalty(25, hintsUsed), "Harf-le");
          if (navigator.vibrate) navigator.vibrate([50, 50, 100]);
        } else if (guesses.length + 1 >= MAX_ATTEMPTS) {
          setGameStatus("lost");
        }
      }
      setCurrentGuess([]);
    }
  }, [currentGuess, guesses, targetRoot, hintsUsed, addXp]);

  const handleLetterClick = (letter: string) => {
    if (gameStatus !== "playing" || currentGuess.length >= 3) return;
    setCurrentGuess([...currentGuess, letter]);
  };

  const getLetterStatus = (letter: string, position: number) => {
    const isInTarget = targetRoot.root.includes(letter);
    const isCorrectPosition = targetRoot.root[position] === letter;
    if (isCorrectPosition) return "bg-emerald text-white";
    if (isInTarget) return "bg-gold text-white";
    return "bg-muted text-muted-foreground";
  };

  const handleHint = () => {
    if (hintsUsed >= 1 || gameStatus !== "playing" || revealedLetter !== null) return;
    setHintsUsed(1);
    
    // Auto reveal one correct letter
    const correctIdx = Math.floor(Math.random() * 3);
    const correctLetter = targetRoot.root[correctIdx];
    setCurrentGuess(prev => [...prev, correctLetter]);
    setRevealedLetter(correctIdx);
  };

  const handleReset = () => {
    setTargetRoot(ROOTS_DATA[Math.floor(Math.random() * ROOTS_DATA.length)]);
    setGuesses([]);
    setCurrentGuess([]);
    setGameStatus("playing");
    setHintsUsed(0);
    setRevealedLetter(null);
  };

  if (gameStatus !== "playing") {
    return (
      <div className="mx-auto max-w-md px-4 py-8">
        <BackButton />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-2xl text-center ${gameStatus === "won" ? "bg-gradient-to-br from-emerald/20 to-emerald/5 border border-emerald/30" : "bg-gradient-to-br from-destructive/20 to-destructive/5 border border-destructive/30"}`}>
          <p className={`text-4xl mb-4 font-bold ${gameStatus === "won" ? "text-emerald" : "text-destructive"}`}>
            {gameStatus === "won" ? "Hebat! Masha Allah! 🎉" : "Kurang Beruntung 😢"}
          </p>
          {gameStatus === "won" && <p className="text-lg mb-6">+{calculateXpWithPenalty(25, hintsUsed)} XP</p>}
          {gameStatus === "lost" && <p className="text-muted-foreground mb-6">Jawaban: {targetRoot.root.join(" ")} ({targetRoot.hint})</p>}
          <Button onClick={handleReset} className="w-full">
            Main Lagi
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <BackButton />
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-gold" />
          <h1 className="text-2xl font-display font-bold">Wordle Islami</h1>
        </div>
        <p className="text-muted-foreground">Tebak akar kata 3 huruf dari kanan ke kiri</p>
      </div>

      <div className="bg-card border rounded-2xl p-4 mb-6">
        <p className="text-sm text-muted-foreground text-center mb-2">Arti dari akar kata ini:</p>
        <p className="text-center font-medium">{targetRoot.meanings.join(" • ")}</p>
        <p className="text-xs text-gold mt-2 text-center font-semibold">{targetRoot.hint}</p>
      </div>

      <div className="grid grid-rows-6 gap-2 mb-6" dir="rtl">
        {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIdx) => {
          const guess = guesses[rowIdx];
          const isCurrent = rowIdx === guesses.length && gameStatus === "playing";
          
          return (
            <div key={rowIdx} className="grid grid-cols-3 gap-2" dir="rtl">
              {Array.from({ length: 3 }).map((_, colIdx) => {
                const letter = guess?.[colIdx] || (isCurrent ? currentGuess[colIdx] : "");
                return (
                  <motion.div
                    key={colIdx}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`h-16 w-full rounded-lg flex items-center justify-center font-arabic text-2xl font-bold ${
                      letter
                        ? revealedLetter === colIdx
                          ? "bg-gold text-white"
                          : getLetterStatus(letter, colIdx)
                        : "bg-muted"
                    }`}
                  >
                    {letter}
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {ARABIC_LETTERS.map((letter) => {
          const used = guesses.flat().includes(letter) || currentGuess.includes(letter);
          return (
            <Button
              key={letter}
              variant="outline"
              className="h-12 font-arabic text-lg"
              onClick={() => handleLetterClick(letter)}
              disabled={used}
            >
              {letter}
            </Button>
          );
        })}
      </div>

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
    </div>
  );
}
