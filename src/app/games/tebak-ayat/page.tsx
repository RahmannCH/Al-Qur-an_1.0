"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { useGamificationStore } from "@/store/gamification-store";
import { CheckCircle2, XCircle } from "lucide-react";

// Mock data (in real app, fetch from Quran API based on Juz 30)
const questions = [
  {
    translation: "Katakanlah: Dia-lah Allah, Yang Maha Esa",
    options: ["قُلْ هُوَ اللَّهُ أَحَدٌ", "اللَّهُ الصَّمَدُ", "لَمْ يَلِدْ وَلَمْ يُولَدْ", "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"],
    answer: 0,
    surah: "Al-Ikhlas: 1"
  },
  {
    translation: "Dari kejahatan bisikan syaitan yang biasa bersembunyi",
    options: ["مِن شَرِّ مَا خَلَقَ", "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "مِنَ الْجِنَّةِ وَالنَّاسِ"],
    answer: 1,
    surah: "An-Nas: 4"
  },
  {
    translation: "Dan dari kejahatan malam apabila telah gelap gulita",
    options: ["مِن شَرِّ مَا خَلَقَ", "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"],
    answer: 1,
    surah: "Al-Falaq: 3"
  }
];

export default function TebakAyatGame() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const { addXp } = useGamificationStore();

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);

    if (idx === questions[currentQ].answer) {
      setScore(s => s + 1);
      if (navigator.vibrate) navigator.vibrate(50);
    } else {
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
      const earnedXp = score * 20;
      if (earnedXp > 0) addXp(earnedXp, "Tebak Ayat");
    }
  };

  const q = questions[currentQ];

  if (isGameOver) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <BackButton />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card border rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-display font-bold mb-4">Kuis Selesai!</h2>
          <p className="text-6xl mb-6">{score === questions.length ? "🏆" : "🌟"}</p>
          <p className="text-xl mb-2">Skor Kamu: <span className="font-bold text-primary">{score} / {questions.length}</span></p>
          <p className="text-muted-foreground mb-8">Mendapatkan +{score * 20} XP</p>
          <Button onClick={() => window.location.reload()} className="w-full h-12 bg-primary">Main Lagi</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <BackButton />
      
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-display font-bold">Tebak Ayat</h1>
          <p className="text-muted-foreground">Soal {currentQ + 1} dari {questions.length}</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-1 rounded-full font-bold">
          Skor: {score}
        </div>
      </div>

      <div className="bg-card border rounded-2xl p-6 shadow-sm mb-6">
        <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Terjemahan:</p>
        <p className="text-xl leading-relaxed">{q.translation}</p>
      </div>

      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          let stateClass = "border-border bg-card hover:bg-accent hover:border-primary/30";
          if (isAnswered) {
            if (idx === q.answer) stateClass = "border-emerald bg-emerald/10 text-emerald";
            else if (idx === selected) stateClass = "border-destructive bg-destructive/10 text-destructive";
            else stateClass = "border-border bg-card opacity-50";
          }

          return (
            <motion.button
              key={idx}
              whileHover={!isAnswered ? { scale: 1.01 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full text-right p-5 rounded-xl border-2 transition-all font-arabic text-2xl leading-loose ${stateClass}`}
              dir="rtl"
            >
              <div className="flex items-center justify-between flex-row-reverse">
                <span>{opt}</span>
                {isAnswered && idx === q.answer && <CheckCircle2 className="h-6 w-6 text-emerald" />}
                {isAnswered && idx === selected && idx !== q.answer && <XCircle className="h-6 w-6 text-destructive" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="bg-muted p-4 rounded-xl mb-4 text-center">
              <p className="font-semibold">{q.surah}</p>
            </div>
            <Button onClick={handleNext} className="w-full h-14 text-lg bg-primary">
              {currentQ < questions.length - 1 ? "Lanjut Soal Berikutnya" : "Lihat Hasil"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
