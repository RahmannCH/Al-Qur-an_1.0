"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import type { Chapter } from "@/types/quran";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function SurahList({ chapters }: { chapters: Chapter[] }) {
  const [search, setSearch] = useState("");

  const filtered = chapters.filter(
    (c) =>
      c.name_simple.toLowerCase().includes(search.toLowerCase()) ||
      c.name_arabic.includes(search) ||
      c.translated_name.name.toLowerCase().includes(search.toLowerCase()) ||
      String(c.id).includes(search)
  );

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari surah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((chapter) => (
          <motion.div key={chapter.id} variants={item}>
            <Link
              href={`/surah/${chapter.id}`}
              className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-sm font-bold text-primary-foreground shadow-md">
                {chapter.id}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-display font-semibold truncate">{chapter.name_simple}</p>
                  <p className="font-arabic text-lg leading-none shrink-0" dir="rtl">
                    {chapter.name_arabic}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="truncate">{chapter.translated_name.name}</span>
                  <span>&middot;</span>
                  <span>{chapter.verses_count} ayat</span>
                </div>
                <Badge variant="secondary" className="mt-2 text-[10px] px-2 py-0.5">
                  {chapter.revelation_place === "makkah" ? "Makkiyah" : "Madaniyah"}
                </Badge>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center text-muted-foreground"
        >
          Surah tidak ditemukan.
        </motion.p>
      )}
    </div>
  );
}
