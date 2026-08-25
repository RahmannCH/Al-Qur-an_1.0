"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { BookHeart, Search, Tag, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useTadabburStore } from "@/store/tadabbur-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl mb-4">🕌</div>
      <h3 className="text-xl font-bold font-display mb-2">Belum Ada Catatan Tadabbur</h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Saat membaca Al-Qur'an, tekan ikon buku pada ayat untuk mulai mencatat refleksi Anda.
      </p>
    </div>
  );
}

export default function TadabburPage() {
  const { notes, deleteNote, searchNotes } = useTadabburStore();
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayed = useMemo(
    () => (query.trim() ? searchNotes(query) : notes),
    [query, notes, searchNotes]
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <BackButton />

      <div className="mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-amber-500/10 rounded-2xl">
            <BookHeart className="h-7 w-7 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">Jurnal Tadabbur</h1>
            <p className="text-sm text-muted-foreground">{notes.length} catatan refleksi tersimpan</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Cari catatan, surah, atau tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {displayed.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {displayed.map((note, idx) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: idx * 0.04 }}
              >
                <Card className="p-5 border-primary/15 bg-card/70 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {note.verseKey}
                        </span>
                        <span className="text-xs text-muted-foreground">{note.surahName}</span>
                      </div>

                      <p
                        dir="rtl"
                        className="font-amiri text-xl leading-relaxed text-foreground mb-2"
                      >
                        {note.arabicText}
                      </p>

                      <p className="text-xs text-muted-foreground italic mb-3 line-clamp-2">
                        {note.translation}
                      </p>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <button
                    className="w-full flex items-center justify-between text-left"
                    onClick={() => setExpandedId(expandedId === note.id ? null : note.id)}
                  >
                    <span className="text-sm font-semibold text-primary">Lihat Refleksi Saya</span>
                    {expandedId === note.id ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedId === note.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{note.reflection}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[11px] gap-1">
                          <Tag className="h-2.5 w-2.5" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-[10px] text-muted-foreground mt-2">
                    {new Date(note.createdAt).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
