"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { useGamificationStore } from "@/store/gamification-store";
import { Lightbulb, RefreshCcw, Sparkles } from "lucide-react";

const roots = [
  { root: ["ع", "ل", "م"], meanings: ["Mengetahui", "Ilmu", "Mengajarkan"], hint: "Kata: Alim, Ilmu" },
  { root: ["ك", "ت", "ب"], meanings: ["Menulis", "Tulisan", "Kitab"], hint: "Kata: Kitab, Kata" },
  { root: ["ق", "ر", "أ"], meanings: ["Membaca", "Bacaan", "Quran"], hint: "Kata: Al-Quran" },
  { root: ["س", "م", "ع"], meanings: ["Mendengar", "Pendengaran"], hint: "Kata: Sami'" },
  { root: ["ب", "ص", "ر"], meanings: ["Melihat", "Penglihatan"], hint: "Kata: Bashir" }
];

const ARABIC_LETTERS = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"];

function calculateXpWithPenalty(baseXp: number, hintsUsed: number): number {
  if (hintsUsed === 0) return baseXp;
  if (hintsUsed === 1) return Math.ceil(baseXp * 0.5);
  return 3;
}

export default function HarfleGame() {
  const [targetRoot, setTargetRoot] = useState(() => roots[Math.floor(Math.random() * roots.length)]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [hintsUsed, setHintsUsed] = useState(0);
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
          const earnedXp = calculateXpWithPenalty(25, hintsUsed);
          addXp(earnedXp, "Harf-le");
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
    if (hintsUsed >= 1 || gameStatus !== "playing") return;
    setHintsUsed(1);
  };

  const handleReset = () => {
    setTargetRoot(roots[Math.floor(Math.random() * roots.length)]);
    setGuesses([]);
    setCurrentGuess([]);
    setGameStatus("playing");
    setHintsUsed(0);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <BackButton />

      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-gold" />
          <h1 className="text-2xl font-display font-bold">Harf-le</h1>
        </div>
        <p className="text-muted-foreground">Tebak akar kata 3 huruf dalam 6 kesempatan</p>
      </div>

      <div className="bg-card border rounded-2xl p-4 mb-6">
        <p className="text-sm text-muted-foreground text-center mb-2">Arti dari akar kata ini:</p>
        <p className="text-center font-medium">{targetRoot.meanings.join(" • ")}</p>
      </div>

      <div className="grid grid-rows-6 gap-2 mb-6">
        {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIdx) => {
          const guess = guesses[rowIdx];
          const isCurrent = rowIdx === guesses.length && gameStatus === "playing";
          
          return (
            <div key={rowIdx} className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, colIdx) => {
                const letter = guess?.[colIdx] || (isCurrent ? currentGuess[colIdx] : "");
                const isRevealed = guess && guesses[rowIdx];
                
                return (
                  <motion.div
                    key={colIdx}
                    initial={isRevealed ? { scale: 0.8, opacity: 0 } : {}}
                    animate={isRevealed ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: isRevealed ? colIdx * 0.1 : 0 }}
                    className={`h-16 w-full rounded-lg flex items-center justify-center font-arabic text-2xl font-bold ${
                      isRevealed
                        ? getLetterStatus(guess[colIdx], colIdx)
                        : letter
                        ? "bg-primary text-primary-foreground"
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

      {gameStatus === "playing" && (
        <>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {ARABIC_LETTERS.slice(0, 14).map((letter) => {
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

          <div className="grid grid-cols-7 gap-2 mb-6">
            {ARABIC_LETTERS.slice(14).map((letter) => {
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
          </div>
        </>
      )}

      {gameStatus !== "playing" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl text-center ${gameStatus === "won" ? "bg-emerald/10 border border-emerald/30" : "bg-destructive/10 border border-destructive/30"}`}
        >
          <p className={`text-3xl mb-3 ${gameStatus === "won" ? "text-emerald" : "text-destructive"}`}>
            {gameStatus === "won" ? "🎉 Hebat!" : "😢 Kurang Beruntung"}
          </p>
          {gameStatus === "won" && (
            <p className="text-muted-foreground mb-2">
              +{calculateXpWithPenalty(25, hintsUsed)} XP
            </p>
          )}
          {gameStatus === "lost" && (
            <p className="text-muted-foreground mb-2">
              Jawaban: {targetRoot.root.join(" ")} ({targetRoot.hint})
            </p>
          )}
          <Button onClick={handleReset} className="w-full mt-4">
            Main Lagi
          </Button>
        </motion.div>
      )}
    </div>
  );
}
