"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Bookmark, ChevronDown, ChevronUp } from "lucide-react";
import { useBookmarkStore } from "@/store/bookmark-store";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Transliterasi:</p>
                <p className="text-sm italic text-muted-foreground">{dua.transliteration}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Artinya:</p>
                <p className="text-sm leading-relaxed">{dua.translation_id}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">{dua.source}</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
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
