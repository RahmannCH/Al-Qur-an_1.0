"use client";

import { useState, useCallback } from "react";
import { SurahAudioPlayer } from "@/components/quran/surah-audio-player";
import { AyahList } from "@/components/quran/ayah-list";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import type { Verse, Chapter } from "@/types/quran";
import { sfx } from "@/lib/sfx";
import { getAudioUrl } from "@/lib/api";

import { TajweedLegendButton } from "@/components/quran/tajweed-legend";

interface SurahPageClientProps {
  verses: Verse[];
  chapter: Chapter;
}

export function SurahPageClient({ verses, chapter }: SurahPageClientProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [highlightedAyah, setHighlightedAyah] = useState<number | null>(null);

  const audioUrl = getAudioUrl(128, chapter.id);

  const handleAyahChange = useCallback((ayahNumber: number) => {
    setHighlightedAyah(ayahNumber);
    const element = document.getElementById(`verse-${ayahNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <>
      <div className="fixed bottom-28 right-4 z-40 md:bottom-6">
        {!showPlayer && (
          <Button
            onClick={() => {
              sfx.playTap();
              setShowPlayer(true);
            }}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xl hover:scale-105 transition-transform"
          >
            <Headphones className="h-6 w-6 text-white" />
          </Button>
        )}
      </div>

      <div className="fixed bottom-28 left-4 z-40 md:bottom-6">
        <TajweedLegendButton />
      </div>

      <AyahList verses={verses} chapter={chapter} highlightedAyah={highlightedAyah} />

      {showPlayer && (
        <SurahAudioPlayer
          surahId={chapter.id}
          surahName={chapter.name_simple}
          totalVerses={chapter.verses_count}
          audioUrl={audioUrl}
          onAyahChange={handleAyahChange}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  );
}
