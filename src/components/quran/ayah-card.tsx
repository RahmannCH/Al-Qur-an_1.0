"use client";

import { useBookmarkStore } from "@/store/bookmark-store";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Bookmark, Copy, BookOpenText, Languages } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import type { Verse, Chapter } from "@/types/quran";

import { ShareAyatModal } from "@/components/quran/share-ayat-modal";

interface AyahCardProps {
  verse: Verse;
  chapter: Chapter;
  fontSize: number;
  showTranslation: boolean;
}

export function AyahCard({ verse, chapter, fontSize, showTranslation }: AyahCardProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const [tafsirText, setTafsirText] = useState("");
  const [showWordByWord, setShowWordByWord] = useState(false);
  const verseKey = verse.verse_key;
  const bookmarked = isBookmarked(verseKey);

  const toggleBookmark = () => {
    if (bookmarked) removeBookmark(verseKey);
    else addBookmark({ verseKey, surahName: chapter.name_simple, text: verse.text_uthmani, timestamp: Date.now() });
  };

  const loadTafsir = async () => {
    if (tafsirText) return;
    setTafsirLoading(true);
    try {
      // Menggunakan Tafsir Kemenag (ID: 16)
      const res = await fetch(`https://api.quran.com/api/v4/tafsirs/16/by_ayah/${verseKey}`);
      const data = await res.json();
      setTafsirText(data.tafsir?.text || "Tafsir tidak ditemukan.");
    } catch {
      setTafsirText("Gagal memuat tafsir. Coba lagi nanti.");
    } finally {
      setTafsirLoading(false);
    }
  };

  const translation = verse.translations?.[0]?.text || "";
  const cleanTranslation = translation.replace(/<[^>]*>/g, "");

  return (
    <div
      id={`verse-${verse.verse_number}`}
      data-verse={verse.verse_number}
      className="rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:shadow-primary/5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-xs font-bold text-primary-foreground shadow-sm">
          {verse.verse_number}
        </div>
        <div className="flex items-center gap-1">
          <Dialog>
            <DialogTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent text-muted-foreground hover:text-foreground outline-none" onClick={loadTafsir}>
              <BookOpenText className="h-4 w-4" />
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display text-xl mb-4">
                  Tafsir Kemenag - QS. {chapter.name_simple}: {verse.verse_number}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="font-arabic text-2xl text-right leading-loose text-primary" dir="rtl">{verse.text_uthmani}</p>
                {cleanTranslation && (
                  <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-[11px] font-bold text-primary mb-1 uppercase tracking-wider">Terjemahan Ayat</p>
                    <p className="text-sm leading-relaxed text-foreground/90 font-medium">{cleanTranslation}</p>
                  </div>
                )}
                <Separator />
                {tafsirLoading ? (
                  <div className="animate-pulse space-y-3 pt-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                ) : (
                  <div 
                    className="prose prose-sm dark:prose-invert max-w-none pt-2 leading-relaxed text-foreground space-y-2" 
                    dangerouslySetInnerHTML={{ 
                      __html: tafsirText
                        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                        .replace(/style="[^"]*"/gi, "") 
                    }} 
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Tooltip>
            <TooltipTrigger
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent"
              onClick={toggleBookmark}
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-gold text-gold" : ""}`} />
            </TooltipTrigger>
            <TooltipContent>{bookmarked ? "Hapus bookmark" : "Bookmark"}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent"
              onClick={() => {
                navigator.clipboard.writeText(`${verse.text_uthmani}\n\n${cleanTranslation}\n\n— QS. ${chapter.name_simple}: ${verse.verse_number}`);
              }}
            >
              <Copy className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>Salin ayat</TooltipContent>
          </Tooltip>

          <ShareAyatModal verse={verse} chapter={chapter} translation={cleanTranslation} />
        </div>
      </div>

      <div className="mb-4 flex items-center justify-end gap-2">
        {verse.words && verse.words.length > 0 && (
          <button
            onClick={() => setShowWordByWord(!showWordByWord)}
            className={`text-xs px-2 py-1 rounded-lg border transition-all ${
              showWordByWord ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-accent"
            }`}
          >
            <Languages className="h-3 w-3 inline mr-1" />
            {showWordByWord ? "Tampilan Biasa" : "Per Kata"}
          </button>
        )}
      </div>

      {showWordByWord && verse.words ? (
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-6 justify-end leading-[2.2] font-arabic" dir="rtl" style={{ fontSize: `${fontSize}px` }}>
          {verse.words.map((word) => (
            <span key={word.id} className="inline-flex flex-col items-center group cursor-default">
              <span className="text-primary group-hover:text-gold transition-colors">{word.text_uthmani}</span>
              <span className="text-[10px] text-muted-foreground font-sans mt-1 text-center max-w-[80px] leading-tight">
                {word.translation?.text || ""}
              </span>
            </span>
          ))}
        </div>
      ) : (
        <p
          className="mb-4 text-right leading-[2.2] font-arabic"
          dir="rtl"
          style={{ fontSize: `${fontSize}px` }}
        >
          {verse.text_uthmani}
        </p>
      )}

      {showTranslation && cleanTranslation && (
        <>
          <Separator className="my-4" />
          <p className="text-sm leading-relaxed text-muted-foreground">{cleanTranslation}</p>
        </>
      )}
    </div>
  );
}
