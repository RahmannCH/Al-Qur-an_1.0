"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { getDailyAsmaulHusna, ASMAUL_HUSNA, AsmaulHusna } from "@/data/asmaul-husna";
import { sfx } from "@/lib/sfx";

export function AsmaulHusnaWidget() {
  const [current, setCurrent] = useState<AsmaulHusna>(getDailyAsmaulHusna());
  const [inputNumber, setInputNumber] = useState<string>(current.id.toString());
  const [isFlipped, setIsFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Trigger voice loading in Chrome
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Update input text when current changes
  useEffect(() => {
    setInputNumber(current.id.toString());
  }, [current]);

  if (!mounted) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playWoosh();
    setIsFlipped(false);
    const nextIdx = (ASMAUL_HUSNA.findIndex((a) => a.id === current.id) + 1) % ASMAUL_HUSNA.length;
    setCurrent(ASMAUL_HUSNA[nextIdx]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playWoosh();
    setIsFlipped(false);
    const currentIdx = ASMAUL_HUSNA.findIndex((a) => a.id === current.id);
    const prevIdx = (currentIdx - 1 + ASMAUL_HUSNA.length) % ASMAUL_HUSNA.length;
    setCurrent(ASMAUL_HUSNA[prevIdx]);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
    setInputNumber(val);

    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 1 && num <= 99) {
      const found = ASMAUL_HUSNA.find((a) => a.id === num);
      if (found) {
        setIsFlipped(false);
        setCurrent(found);
      }
    }
  };

  const handleSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playTap();
    if ("speechSynthesis" in window) {
      // Force resume on Chrome
      window.speechSynthesis.resume();
      window.speechSynthesis.cancel();
      
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find((v) => v.lang.startsWith("ar"));
      
      let utterance: SpeechSynthesisUtterance;
      if (arabicVoice) {
        // Logat Arab native
        utterance = new SpeechSynthesisUtterance(current.arabic);
        utterance.voice = arabicVoice;
        utterance.lang = "ar-SA";
        utterance.rate = 0.85;
      } else {
        // Fallback ejaan Latin jika voice pack Arab tidak tersedia di OS user
        utterance = new SpeechSynthesisUtterance(current.latin);
        utterance.lang = "id-ID";
        utterance.rate = 0.9;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className="group relative h-48 w-full cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => {
        setIsFlipped(!isFlipped);
        sfx.playTap();
      }}
    >
      <motion.div
        className="relative h-full w-full rounded-3xl border bg-card shadow-sm hover:shadow-md"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* SISI DEPAN (Front Side) */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-5 rounded-3xl bg-card"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500">
              <Sparkles className="h-4 w-4" /> Asmaul Husna
            </span>

            {/* Controls: Prev, Input Number, Next & Audio */}
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handlePrev}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                title="Nama Sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Number Input (Max 2 Digits: 1-99) */}
              <div className="flex items-center gap-1 bg-muted/60 px-2 py-0.5 rounded-lg border border-border">
                <span className="text-[10px] text-muted-foreground font-bold">#</span>
                <input
                  type="text"
                  value={inputNumber}
                  onChange={handleNumberChange}
                  className="w-6 bg-transparent text-center text-xs font-bold outline-none text-foreground"
                  maxLength={2}
                  title="Ketik nomor 1-99"
                />
              </div>

              <button
                onClick={handleNext}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                title="Nama Selanjutnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={handleSpeech}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors ml-0.5"
                title="Dengarkan Cara Baca"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="my-auto text-center">
            <h3 className="font-arabic text-4xl font-bold text-primary drop-shadow-sm">
              {current.arabic}
            </h3>
            <p className="mt-1 font-display text-lg font-bold">{current.latin}</p>
            <p className="text-xs text-muted-foreground font-medium">{current.meaning}</p>
          </div>

          <p className="text-center text-[10px] text-muted-foreground opacity-60 font-semibold">
            Ketuk kartu untuk melihat hikmah & makna &rarr;
          </p>
        </div>

        {/* SISI BELAKANG (Back Side - Flipped 180 deg) */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-5 bg-gradient-to-br from-amber-500/10 via-primary/5 to-teal-500/10 rounded-3xl border border-amber-500/20"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
            <span className="font-bold text-xs text-amber-600 dark:text-amber-400">
              #{current.id} {current.latin}
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full">
              {current.meaning}
            </span>
          </div>

          <p className="my-auto text-xs leading-relaxed text-foreground/90 font-medium italic text-center">
            &ldquo;{current.description}&rdquo;
          </p>

          <p className="text-center text-[10px] text-muted-foreground opacity-60 font-semibold">
            Ketuk kartu untuk kembali &larr;
          </p>
        </div>
      </motion.div>
    </div>
  );
}
