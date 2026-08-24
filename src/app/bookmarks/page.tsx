"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBookmarkStore } from "@/store/bookmark-store";
import { Bookmark, Trash2, Copy, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/layout/back-button";
import Link from "next/link";
import { sfx } from "@/lib/sfx";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarkStore();
  const [filterType, setFilterType] = useState<"all" | "quran" | "dua">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookmarks = bookmarks.filter((bm) => {
    const isDua = bm.verseKey.startsWith("dua-");
    
    // Filter tipe
    if (filterType === "quran" && isDua) return false;
    if (filterType === "dua" && !isDua) return false;

    // Filter search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        bm.surahName.toLowerCase().includes(q) ||
        bm.text.toLowerCase().includes(q) ||
        bm.verseKey.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pb-32">
      <BackButton />
      
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Ayat & Doa Tersimpan</h1>
        <p className="text-muted-foreground">{bookmarks.length} item tersimpan di Zadify</p>
      </div>

      {bookmarks.length > 0 && (
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari dalam item tersimpan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl text-xs"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { setFilterType("all"); sfx.playTap(); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "all" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card border text-muted-foreground"
              }`}
            >
              Semua ({bookmarks.length})
            </button>
            <button
              onClick={() => { setFilterType("quran"); sfx.playTap(); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "quran" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card border text-muted-foreground"
              }`}
            >
              Al-Qur'an ({bookmarks.filter(b => !b.verseKey.startsWith("dua-")).length})
            </button>
            <button
              onClick={() => { setFilterType("dua"); sfx.playTap(); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "dua" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card border text-muted-foreground"
              }`}
            >
              Doa ({bookmarks.filter(b => b.verseKey.startsWith("dua-")).length})
            </button>
          </div>
        </div>
      )}

      {filteredBookmarks.length === 0 ? (
        <div className="text-center py-20 bg-card border rounded-3xl p-8">
          <Bookmark className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-bold text-lg mb-1">Tidak ada item tersimpan</p>
          <p className="text-xs text-muted-foreground mb-6">
            {bookmarks.length === 0 ? "Belum ada ayat atau doa yang di-bookmark." : "Tidak ada hasil yang sesuai dengan filter."}
          </p>
          <Link href="/quran">
            <Button className="rounded-xl">Jelajahi Al-Qur'an</Button>
          </Link>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {filteredBookmarks.map((bookmark) => {
            const isDua = bookmark.verseKey.startsWith("dua-");
            const link = isDua ? "/dua" : `/surah/${bookmark.verseKey.split(":")[0]}#verse-${bookmark.verseKey.split(":")[1]}`;

            return (
              <motion.div
                key={bookmark.verseKey}
                variants={item}
                className="rounded-2xl border bg-card p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Bookmark className="h-4 w-4 text-gold fill-gold shrink-0" />
                      <Link href={link} onClick={() => sfx.playWoosh()} className="font-bold text-base hover:text-primary transition-colors">
                        {bookmark.surahName}
                      </Link>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {isDua ? "Doa" : "Ayat"}
                      </span>
                    </div>
                    <p className="font-arabic text-2xl text-primary leading-loose mb-3 text-right" dir="rtl">
                      {bookmark.text}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      Disimpan: {new Date(bookmark.timestamp).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg"
                      title="Salin teks"
                      onClick={() => {
                        sfx.playTap();
                        navigator.clipboard.writeText(bookmark.text);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                      title="Hapus bookmark"
                      onClick={() => {
                        sfx.playTap();
                        removeBookmark(bookmark.verseKey);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
