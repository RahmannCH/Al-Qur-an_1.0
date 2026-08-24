"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Disc3, ArrowRight } from "lucide-react";
import { useSettingsStore } from "@/store/settings-store";
import { sfx } from "@/lib/sfx";
import Link from "next/link";

const pad3 = (num: number) => num.toString().padStart(3, "0");

export function MiniMurottalWidget() {
  const lastRead = useSettingsStore((s) => s.lastRead);

  const surahId = lastRead ? lastRead.surahId : 1;
  const surahName = lastRead ? lastRead.surahName : "Al-Fatiha";
  const verseNumber = lastRead ? lastRead.verseNumber : 1;

  // Direct stable MP3 ayah link from Quran.com
  const audioUrl = `https://verses.quran.com/Alafasy/mp3/${pad3(surahId)}${pad3(verseNumber)}.mp3`;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
        audio.load();
      }
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        sfx.playTap();
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border bg-card p-5 shadow-sm hover:shadow-md transition-all group"
    >
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
        preload="none"
      />

      <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-gradient-to-br from-primary/10 to-teal/10 blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <button
            onClick={togglePlay}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all shadow-md ${
              isPlaying
                ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-amber-500/20 scale-105"
                : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
            }`}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Disc3 className={`h-3.5 w-3.5 ${isPlaying ? "animate-spin text-amber-500" : "text-muted-foreground"}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {isPlaying ? "Sedang Memutar" : "Lanjutkan Audio"}
              </span>
            </div>
            <h4 className="font-display font-bold text-base leading-tight">
              {surahName}
            </h4>
            <p className="text-xs text-muted-foreground font-medium">
              Ayat {verseNumber} &middot; Murottal Ayat
            </p>
          </div>
        </div>

        <Link
          href={`/surah/${surahId}#verse-${verseNumber}`}
          onClick={() => sfx.playWoosh()}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all shrink-0"
          title="Buka Surah"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
