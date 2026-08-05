"use client";

import { motion } from "framer-motion";
import { useBookmarkStore } from "@/store/bookmark-store";
import { Bookmark, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/layout/back-button";
import Link from "next/link";

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

  if (bookmarks.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Bookmark</h1>
        <div className="text-center py-20">
          <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Belum ada bookmark tersimpan</p>
          <Link href="/">
            <Button>Jelajahi Al-Qur&apos;an</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Bookmark</h1>
        <p className="text-muted-foreground">{bookmarks.length} ayat/doa tersimpan</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {bookmarks.map((bookmark) => {
          const isDua = bookmark.verseKey.startsWith("dua-");
          const link = isDua ? "/dua" : `/surah/${bookmark.verseKey.split(":")[0]}#verse-${bookmark.verseKey.split(":")[1]}`;

          return (
            <motion.div
              key={bookmark.verseKey}
              variants={item}
              className="rounded-xl border bg-card p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Bookmark className="h-4 w-4 text-gold fill-gold" />
                    <Link href={link} className="font-semibold hover:text-primary transition-colors">
                      {bookmark.surahName}
                    </Link>
                  </div>
                  <p className="font-arabic text-xl text-primary leading-loose mb-2" dir="rtl">
                    {bookmark.text}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Disimpan: {new Date(bookmark.timestamp).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigator.clipboard.writeText(bookmark.text)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeBookmark(bookmark.verseKey)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
