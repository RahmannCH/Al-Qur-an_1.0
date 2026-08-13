"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, RefreshCcw, Search, Loader2, Play, Pause, Mic, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getChapters, getVerses } from "@/lib/api";
import { Chapter, Verse } from "@/types/quran";
import { sfx } from "@/lib/sfx";
import { useGamificationStore } from "@/store/gamification-store";

export default function MemorizePracticePage() {
  const { addXp } = useGamificationStore();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Chapter | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Practice State
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [mode, setMode] = useState<"read" | "hide" | "test">("read");

  useEffect(() => {
    getChapters().then((data) => {
      setChapters(data);
      setLoading(false);
    });
  }, []);

  const handleSelectSurah = async (chapter: Chapter) => {
    setLoading(true);
    try {
      const response = await getVerses(chapter.id, 1, 286); // Ambil semua ayat
      setVerses(response.verses);
      setSelectedSurah(chapter);
      setIsPracticing(true);
      setCurrentVerseIndex(0);
      setMode("read");
      sfx.playTap();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChapters = chapters.filter(c => 
    c.name_simple.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.translated_name.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentVerse = verses[currentVerseIndex];

  const handleNext = () => {
    if (currentVerseIndex < verses.length - 1) {
      setCurrentVerseIndex(prev => prev + 1);
      setMode("read");
      setShowHint(false);
      sfx.playWoosh();
    } else {
      // Selesai hafalan surah ini
      addXp(verses.length * 5, `Selesai latihan hafal Surah ${selectedSurah?.name_simple}`);
      sfx.playSuccess();
      setIsPracticing(false);
    }
  };

  const handlePrev = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(prev => prev - 1);
      setMode("read");
      setShowHint(false);
      sfx.playTap();
    }
  };

  if (loading && !chapters.length) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isPracticing) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
        <BackButton />
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold">Latihan Hafalan</h1>
          </div>
          <p className="text-muted-foreground">Pilih surah yang ingin Anda hafal. Sistem akan membantu menguji hafalan Anda per ayat.</p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Cari surah (ex: Al-Mulk)..." 
            className="pl-10 h-12 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 pb-4">
          {filteredChapters.map(chapter => (
            <motion.button
              key={chapter.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleSelectSurah(chapter)}
              className="w-full p-4 flex items-center justify-between bg-card border rounded-2xl hover:border-primary/50 hover:bg-accent transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary font-bold text-sm">
                  {chapter.id}
                </div>
                <div>
                  <h3 className="font-bold text-base">{chapter.name_simple}</h3>
                  <p className="text-xs text-muted-foreground">{chapter.verses_count} Ayat</p>
                </div>
              </div>
              <p className="font-arabic text-xl">{chapter.name_arabic}</p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => setIsPracticing(false)} className="rounded-xl">
          <XCircle className="h-5 w-5 mr-2" /> Batal
        </Button>
        <div className="text-center">
          <h2 className="font-display font-bold text-lg">{selectedSurah?.name_simple}</h2>
          <p className="text-xs text-muted-foreground">Ayat {currentVerseIndex + 1} dari {selectedSurah?.verses_count}</p>
        </div>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-8">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentVerseIndex + 1) / verses.length) * 100}%` }}
        />
      </div>

      {/* Modes */}
      <div className="flex p-1 bg-muted rounded-xl mb-8">
        <button
          onClick={() => { setMode("read"); sfx.playTap(); }}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === "read" ? "bg-background shadow text-primary" : "text-muted-foreground"}`}
        >
          📖 Baca
        </button>
        <button
          onClick={() => { setMode("hide"); sfx.playTap(); }}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === "hide" ? "bg-background shadow text-primary" : "text-muted-foreground"}`}
        >
          🙈 Sembunyi
        </button>
        <button
          onClick={() => { setMode("test"); sfx.playTap(); }}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === "test" ? "bg-background shadow text-primary" : "text-muted-foreground"}`}
        >
          🎯 Uji
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode + currentVerseIndex + (showHint ? "hint" : "")}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="min-h-[300px] flex flex-col items-center justify-center p-8 bg-card border rounded-3xl shadow-lg relative"
        >
          {mode === "read" && (
            <>
              <p className="font-arabic text-4xl leading-loose text-center mb-6" dir="rtl">
                {currentVerse?.text_uthmani}
              </p>
              <p className="text-center text-muted-foreground">
                {currentVerse?.translations?.[0]?.text?.replace(/<[^>]*>/g, "")}
              </p>
            </>
          )}

          {mode === "hide" && (
            <>
              {showHint ? (
                <p className="font-arabic text-4xl leading-loose text-center mb-6 text-primary" dir="rtl">
                  {currentVerse?.text_uthmani}
                </p>
              ) : (
                <div className="py-12 flex flex-col items-center">
                  <Brain className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-xl font-bold text-muted-foreground">Coba lafalkan dari ingatan...</p>
                </div>
              )}
              <Button 
                variant="outline" 
                onClick={() => { setShowHint(!showHint); sfx.playTap(); }}
                className="mt-4 rounded-xl"
              >
                {showHint ? "Sembunyikan Ayat" : "Tampilkan Ayat (Hint)"}
              </Button>
            </>
          )}

          {mode === "test" && (
            <>
              <p className="text-center text-muted-foreground mb-8">
                Lafalkan ayat ini dan cek kebenarannya:
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg"
                  className="rounded-xl h-16 px-8 gap-3 bg-rose-500 hover:bg-rose-600"
                  onClick={() => { setShowHint(true); sfx.playTap(); }}
                >
                  <XCircle className="h-5 w-5" /> Lupa
                </Button>
                <Button 
                  size="lg"
                  className="rounded-xl h-16 px-8 gap-3 bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => { handleNext(); }}
                >
                  <CheckCircle2 className="h-5 w-5" /> Hafal
                </Button>
              </div>

              {showHint && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 p-6 bg-muted/50 rounded-2xl w-full border text-center">
                  <p className="font-arabic text-2xl leading-loose" dir="rtl">
                    {currentVerse?.text_uthmani}
                  </p>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-8">
        <Button variant="outline" onClick={handlePrev} disabled={currentVerseIndex === 0} className="rounded-xl px-6">
          Sebelumnya
        </Button>
        <Button onClick={handleNext} className="rounded-xl px-6">
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
