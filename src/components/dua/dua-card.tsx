"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Bookmark, ChevronDown, ChevronUp, Volume2 } from "lucide-react";
import { useBookmarkStore } from "@/store/bookmark-store";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { sfx } from "@/lib/sfx";

interface Dua {
  id: number;
  name_id: string;
  name_ar: string;
  arabic_text: string;
  transliteration: string;
  translation_id: string;
  source: string;
}

export function DuaCard({ dua }: { dua: Dua }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();
  const bookmarked = isBookmarked(`dua-${dua.id}`);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playTap();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.resume();
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(dua.arabic_text);
      utterance.lang = "ar-SA";
      utterance.rate = 0.8;
      const voices = window.speechSynthesis.getVoices();
      const arVoice = voices.find((v) => v.lang.startsWith("ar"));
      if (arVoice) utterance.voice = arVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(`dua-${dua.id}`);
    } else {
      addBookmark({
        verseKey: `dua-${dua.id}`,
        surahName: dua.name_id,
        text: dua.arabic_text,
        timestamp: Date.now(),
      });
    }
  };

  const copyDua = () => {
    navigator.clipboard.writeText(
      `${dua.name_id}\n\n${dua.arabic_text}\n\n${dua.transliteration}\n\n${dua.translation_id}\n\n— ${dua.source}`
    );
  };

  return (
    <motion.div
      className="rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5"
      layout
    >
      <div
        className="p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display font-semibold text-lg">{dua.name_id}</h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>
        
        <p className="font-arabic text-xl text-primary leading-loose" dir="rtl">
          {dua.arabic_text}
        </p>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Separator />
            <div className="p-5 space-y-3">
              <p className="text-xs md:text-sm font-medium leading-relaxed italic text-emerald-600/90 dark:text-emerald-400/90">{dua.transliteration}</p>
              <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">{dua.translation_id}</p>
              <p className="text-[11px] font-semibold text-muted-foreground/80">{dua.source}</p>

              <div className="flex items-center gap-2 pt-2">
                <Tooltip>
                  <TooltipTrigger
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors text-sm font-semibold"
                    onClick={handleSpeak}
                  >
                    <Volume2 className="h-4 w-4" />
                    Dengarkan
                  </TooltipTrigger>
                  <TooltipContent>Dengarkan pelafalan Arab</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark();
                    }}
                  >
                    <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-gold text-gold" : ""}`} />
                    {bookmarked ? "Tersimpan" : "Simpan"}
                  </TooltipTrigger>
                  <TooltipContent>{bookmarked ? "Hapus bookmark" : "Bookmark"}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyDua();
                    }}
                  >
                    <Copy className="h-4 w-4" />
                    Salin
                  </TooltipTrigger>
                  <TooltipContent>Salin doa</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
