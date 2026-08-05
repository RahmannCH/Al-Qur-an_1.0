"use client";

import { useBookmarkStore } from "@/store/bookmark-store";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Bookmark, Copy, BookOpenText } from "lucide-react";
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
            <DialogTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent text-muted-foreground hover:text-foreground" onClick={loadTafsir}>
              <Tooltip>
                <TooltipTrigger>
                  <BookOpenText className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Baca Tafsir</TooltipContent>
              </Tooltip>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display text-xl mb-4">
                  Tafsir Kemenag - QS. {chapter.name_simple}: {verse.verse_number}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="font-arabic text-2xl text-right leading-loose text-primary" dir="rtl">{verse.text_uthmani}</p>
                <Separator />
                {tafsirLoading ? (
                  <div className="animate-pulse space-y-3 pt-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none pt-2 leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: tafsirText }} />
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

      <p
        className="mb-4 text-right leading-[2.2] font-arabic"
        dir="rtl"
        style={{ fontSize: `${fontSize}px` }}
      >
        {verse.text_uthmani}
      </p>

      {showTranslation && cleanTranslation && (
        <>
          <Separator className="my-4" />
          <p className="text-sm leading-relaxed text-muted-foreground">{cleanTranslation}</p>
        </>
      )}
    </div>
  );
}
