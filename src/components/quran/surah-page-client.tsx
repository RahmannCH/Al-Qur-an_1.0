"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { AyahList } from "@/components/quran/ayah-list";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import type { Verse, Chapter } from "@/types/quran";
import { sfx } from "@/lib/sfx";
import { useLayoutState } from "@/components/layout/layout-context";

// --- DYNAMIC IMPORTS ---
const SurahAudioPlayer = dynamic(
  () => import("@/components/quran/surah-audio-player").then((mod) => mod.SurahAudioPlayer),
  {
    ssr: false,
    loading: () => null,
  }
);

const TajweedLegendButton = dynamic(
  () => import("@/components/quran/tajweed-legend").then((mod) => mod.TajweedLegendButton),
  {
    ssr: false,
  }
);

interface SurahPageClientProps {
  verses: Verse[];
  chapter: Chapter;
}

export function SurahPageClient({ verses, chapter }: SurahPageClientProps) {
  const { setHasActiveFloatingBar } = useLayoutState();
  const [showPlayer, setShowPlayer] = useState(false);
  const [highlightedAyah, setHighlightedAyah] = useState<number | null>(null);
  const [initialAyah, setInitialAyah] = useState(1);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    setHasActiveFloatingBar(showPlayer);
    return () => setHasActiveFloatingBar(false);
  }, [showPlayer, setHasActiveFloatingBar]);

  const handleAyahChange = useCallback((ayahNumber: number) => {
    setHighlightedAyah(ayahNumber);
    
    // Auto-expand list jika player melompat ke ayat di luar jangkauan render saat ini
    if (ayahNumber >= visibleCount) {
      setVisibleCount(prev => Math.min(Math.max(prev, ayahNumber + 5), verses.length));
    }

    // Beri sedikit delay agar React sempat me-render elemen baru (jika terjadi expand)
    setTimeout(() => {
      const element = document.getElementById(`verse-${ayahNumber}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  }, [visibleCount, verses.length]);

  const handlePlayAyah = useCallback((ayahNumber: number) => {
    sfx.playTap();
    setInitialAyah(ayahNumber);
    setShowPlayer(true);
    handleAyahChange(ayahNumber);
  }, [handleAyahChange]);

  return (
    <>
      <div className="fixed bottom-28 right-4 z-40 md:bottom-6">
        {!showPlayer && (
          <Button
            onClick={() => {
              sfx.playTap();
              setInitialAyah(1);
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

      <AyahList 
        verses={verses} 
        chapter={chapter} 
        highlightedAyah={highlightedAyah}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        onPlayAyah={handlePlayAyah}
      />

      {showPlayer && (
        <SurahAudioPlayer
          surahId={chapter.id}
          surahName={chapter.name_simple}
          totalVerses={chapter.verses_count}
          initialAyah={initialAyah}
          onAyahChange={handleAyahChange}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  );
}
