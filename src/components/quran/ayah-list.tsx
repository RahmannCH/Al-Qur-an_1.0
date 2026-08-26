"use client";

import { useSettingsStore } from "@/store/settings-store";
import { useGamificationStore } from "@/store/gamification-store";
import { useAnalyticsStore } from "@/store/analytics-store";
import { useEffect, useRef } from "react";
import type { Verse, Chapter } from "@/types/quran";
import { AyahCard } from "./ayah-card";

interface AyahListProps {
  verses: Verse[];
  chapter: Chapter;
  highlightedAyah?: number | null;
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  onPlayAyah?: (ayahNumber: number) => void;
  searchQuery?: string;
}

export function AyahList({
  verses,
  chapter,
  highlightedAyah,
  visibleCount,
  setVisibleCount,
  onPlayAyah,
  searchQuery = "",
}: AyahListProps) {
  const { fontSize, showTranslation } = useSettingsStore();
  const { setLastRead } = useSettingsStore();
  const { addXp, incrementRead } = useGamificationStore();
  const readAyahs = useRef(new Set<number>());

  // Intersection Observer untuk Infinite Scroll & Gamification
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const verseNum = Number(entry.target.getAttribute("data-verse"));
            
            // Gamification & Last Read tracking
            if (verseNum) {
              setLastRead({
                verseKey: `${chapter.id}:${verseNum}`,
                surahId: chapter.id,
                surahName: chapter.name_simple,
                verseNumber: verseNum,
                timestamp: Date.now(),
              });
              
              if (!readAyahs.current.has(verseNum)) {
                readAyahs.current.add(verseNum);
                incrementRead();
                useAnalyticsStore.getState().logReading(1, 0.5);
                if (readAyahs.current.size % 5 === 0) {
                  addXp(5, "Membaca 5 ayat");
                }
              }
            }

            // Infinite Scroll Trigger (Jika mendekati ayat terakhir yg dirender)
            if (entry.target.id === "infinite-trigger" || verseNum === visibleCount - 2) {
              setVisibleCount((prev) => Math.min(prev + 20, verses.length));
            }
          }
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    const elements = document.querySelectorAll("[data-verse], #infinite-trigger");
    elements.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, [chapter, setLastRead, addXp, incrementRead, visibleCount, verses.length, setVisibleCount]);

  const visibleVerses = verses.slice(0, visibleCount);

  return (
    <div className="space-y-4 pb-32">
      {visibleVerses.map((verse) => {
        const isHighlighted = highlightedAyah === verse.verse_number;
        return (
          <div 
            key={verse.id} 
            className={`transition-all duration-700 rounded-2xl ${
              isHighlighted ? "ring-2 ring-primary ring-offset-4 ring-offset-background scale-[1.02]" : ""
            }`}
          >
            <AyahCard
              verse={verse}
              chapter={chapter}
              fontSize={fontSize}
              showTranslation={showTranslation}
              isPlayable={true}
              onPlay={() => onPlayAyah?.(verse.verse_number)}
              searchQuery={searchQuery}
            />
          </div>
        );
      })}
      {visibleCount < verses.length && (
        <div id="infinite-trigger" className="h-20 w-full flex items-center justify-center text-muted-foreground animate-pulse">
          Memuat ayat selanjutnya...
        </div>
      )}
    </div>
  );
}
