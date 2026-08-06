"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { useGamificationStore } from "@/store/gamification-store";
import { Zap, Target, Timer } from "lucide-react";

// Mock Data Tajwid (Hardcoded for instant load)
const TAJWID_ROUNDS = [
  {
    targetRule: "Qalqalah",
    description: "Pantulan huruf (ق، ط، ب، ج، د) berharakat sukun",
    words: [
      { text: "أَحَدٌ", isTarget: true }, // Dal
      { text: "اللَّهُ", isTarget: false },
      { text: "خَلَقَ", isTarget: true }, // Qaf
      { text: "النَّاسِ", isTarget: false },
      { text: "يَلِدْ", isTarget: true }, // Dal
    ]
  },
  {
    targetRule: "Idgham Bighunnah",
    description: "Nun mati/tanwin bertemu (ي ن م و)",
    words: [
      { text: "مِنْ وَرَائِهِمْ", isTarget: true },
      { text: "رَسُولٌ", isTarget: false },
      { text: "لَهَبٍ وَتَبَّ", isTarget: true },
      { text: "الْحَمْدُ", isTarget: false },
    ]
  },
  {
    targetRule: "Ikhfa",
    description: "Nun mati/tanwin bertemu huruf Ikhfa (disamarkan)",
    words: [
      { text: "عِنْدَ", isTarget: true },
      { text: "غَاسِقٍ إِذَا", isTarget: false },
      { text: "مِنْ شَرِّ", isTarget: true },
      { text: "سَلَامٌ", isTarget: false },
    ]
  }
];

export default function TajwidNinjaGame() {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per round
  const [gameState, setGameState] = useState<"menu" | "playing" | "round_end" | "game_over">("menu");
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [roundScore, setRoundScore] = useState(0);
  
  const { addXp } = useGamificationStore();

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "playing" && timeLeft === 0) {
      handleRoundEnd();
    }
  }, [timeLeft, gameState]);

  const handleWordClick = (idx: number, isTarget: boolean) => {
    if (selectedWords.includes(idx)) return;
    
    setSelectedWords([...selectedWords, idx]);
    if (isTarget) {
      setRoundScore(r => r + 10);
      setScore(s => s + 10);
      if (navigator.vibrate) navigator.vibrate(50);
    } else {
      setTimeLeft(t => Math.max(0, t - 3)); // 3 seconds penalty
      if (navigator.vibrate) navigator.vibrate([50, 50]);
    }

    // Check if all targets found
    const allTargets = TAJWID_ROUNDS[currentRound].words.reduce((acc, w) => w.isTarget ? acc + 1 : acc, 0);
    const foundTargets = TAJWID_ROUNDS[currentRound].words.filter((w, i) => w.isTarget && [...selectedWords, idx].includes(i)).length;
    
    if (foundTargets === allTargets) {
      setTimeout(handleRoundEnd, 500);
    }
  };

  const handleRoundEnd = () => {
    setGameState("round_end");
  };

  const nextRound = () => {
    if (currentRound < TAJWID_ROUNDS.length - 1) {
      setCurrentRound(c => c + 1);
      setSelectedWords([]);
      setRoundScore(0);
      setTimeLeft(15);
      setGameState("playing");
    } else {
      setGameState("game_over");
      if (score > 0) addXp(score, "Tajwid Ninja");
    }
  };

  const resetGame = () => {
    setCurrentRound(0);
    setScore(0);
    setSelectedWords([]);
    setRoundScore(0);
    setTimeLeft(15);
    setGameState("menu");
  };

  if (gameState === "menu") {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <BackButton />
        <div className="mb-8">
          <Zap className="h-16 w-16 text-rose-500 mx-auto mb-4" />
          <h1 className="text-4xl font-display font-bold mb-2">Tajwid Ninja</h1>
          <p className="text-muted-foreground">Latih insting dan kecepatanmu mendeteksi hukum tajwid!</p>
        </div>
        
        <div className="bg-card border rounded-3xl p-6 text-left mb-8 shadow-sm">
          <h3 className="font-bold mb-2">Cara Bermain:</h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
            <li>Kamu punya <span className="font-bold text-primary">15 detik</span> per ronde.</li>
            <li>Klik/Tap semua kata yang mengandung hukum Tajwid yang diminta.</li>
            <li>Tap benar: +10 Poin.</li>
            <li>Tap salah: Penalti waktu -3 detik.</li>
          </ul>
        </div>
        
        <Button onClick={() => setGameState("playing")} className="w-full h-14 text-lg bg-rose-600 hover:bg-rose-700">
          Mulai Latihan
        </Button>
      </div>
    );
  }

  const roundData = TAJWID_ROUNDS[currentRound];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <BackButton />
      
      <div className="flex justify-between items-center mb-8">
        <div className="bg-rose-500/10 text-rose-500 px-4 py-2 rounded-xl font-bold font-mono text-xl flex items-center gap-2">
          <Timer className="h-5 w-5" /> 00:{timeLeft.toString().padStart(2, '0')}
        </div>
        <div className="bg-gold/10 text-gold px-4 py-2 rounded-xl font-bold text-lg">
          Skor: {score}
        </div>
      </div>

      {gameState === "playing" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="bg-card border-2 border-primary/20 rounded-3xl p-8 mb-8 shadow-md">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Cari Hukum Tajwid:</p>
            <h2 className="text-3xl font-display font-bold text-primary mb-2 flex justify-center items-center gap-2">
              <Target className="h-6 w-6" /> {roundData.targetRule}
            </h2>
            <p className="text-muted-foreground text-sm">{roundData.description}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4" dir="rtl">
            {roundData.words.map((word, idx) => {
              const isSelected = selectedWords.includes(idx);
              let btnClass = "bg-card border-2 border-border text-foreground";
              
              if (isSelected) {
                if (word.isTarget) btnClass = "bg-emerald text-white border-emerald shadow-lg shadow-emerald/20";
                else btnClass = "bg-destructive text-white border-destructive shadow-lg shadow-destructive/20 animate-shake";
              }

              return (
                <motion.button
                  key={idx}
                  whileHover={!isSelected ? { scale: 1.05 } : {}}
                  whileTap={!isSelected ? { scale: 0.95 } : {}}
                  onClick={() => handleWordClick(idx, word.isTarget)}
                  disabled={isSelected}
                  className={`px-8 py-5 rounded-2xl font-arabic text-3xl transition-all ${btnClass}`}
                >
                  {word.text}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {gameState === "round_end" && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card border rounded-3xl p-8 text-center mt-12 shadow-xl">
          <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold mb-2">Waktu Habis!</h2>
          <p className="text-lg text-muted-foreground mb-6">Poin Ronde Ini: <span className="font-bold text-primary">+{roundScore}</span></p>
          <Button onClick={nextRound} className="w-full h-14 text-lg bg-primary">
            {currentRound < TAJWID_ROUNDS.length - 1 ? "Ronde Selanjutnya" : "Lihat Hasil Akhir"}
          </Button>
        </motion.div>
      )}

      {gameState === "game_over" && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border rounded-3xl p-10 text-center mt-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl -mr-20 -mt-20" />
          <h2 className="text-4xl font-display font-bold mb-4 relative z-10">Latihan Selesai!</h2>
          <p className="text-lg text-slate-300 mb-8 relative z-10">Total Kecepatan & Akurasi menghasilkan:</p>
          <p className="text-6xl font-black text-gold mb-8 relative z-10 drop-shadow-lg">{score} XP</p>
          <Button onClick={resetGame} variant="secondary" className="w-full h-14 text-lg relative z-10 text-slate-900">
            Ulangi Latihan
          </Button>
        </motion.div>
      )}
    </div>
  );
}
