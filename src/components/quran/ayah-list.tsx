"use client";

import { useSettingsStore } from "@/store/settings-store";
import { useGamificationStore } from "@/store/gamification-store";
import { useEffect, useRef } from "react";
import type { Verse, Chapter } from "@/types/quran";
import { AyahCard } from "./ayah-card";

export function AyahList({ verses, chapter }: { verses: Verse[]; chapter: Chapter }) {
  const { fontSize, showTranslation } = useSettingsStore();
  const { setLastRead } = useSettingsStore();
  const { addXp, incrementRead } = useGamificationStore();
  const readAyahs = useRef(new Set<number>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const verseNum = Number(entry.target.getAttribute("data-verse"));
            if (verseNum) {
              setLastRead({
                verseKey: `${chapter.id}:${verseNum}`,
                surahId: chapter.id,
                surahName: chapter.name_simple,
                verseNumber: verseNum,
                timestamp: Date.now(),
              });
              
              // Gamification: 1 XP per ayah dibaca (max 1x per visit)
              if (!readAyahs.current.has(verseNum)) {
                readAyahs.current.add(verseNum);
                incrementRead();
                if (readAyahs.current.size % 5 === 0) {
                  addXp(5, "Membaca 5 ayat");
                }
              }
            }
          }
        }
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll("[data-verse]");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapter, setLastRead, addXp, incrementRead]);

  return (
    <div className="space-y-4">
      {verses.map((verse) => (
        <AyahCard
          key={verse.id}
          verse={verse}
          chapter={chapter}
          fontSize={fontSize}
          showTranslation={showTranslation}
        />
      ))}
    </div>
  );
}
