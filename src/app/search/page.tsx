"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { searchQuran } from "@/lib/api";
import { BackButton } from "@/components/layout/back-button";

interface SearchResult {
  verse_key: string;
  text: string;
  translations: Array<{ text: string }>;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const data = await searchQuran(query, "id", 1);
      setResults(data.search?.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Cari Al-Qur&apos;an</h1>
        <p className="text-muted-foreground">Cari ayat berdasarkan teks Arab atau terjemahan</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari teks atau terjemahan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Mencari..." : "Cari"}
        </Button>
      </form>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <p className="text-sm text-muted-foreground mb-4">{results.length} hasil ditemukan</p>
          {results.map((result, idx) => {
            const [surahId, ayahNum] = result.verse_key.split(":");
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-xl border bg-card p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Link
                      href={`/surah/${surahId}#verse-${ayahNum}`}
                      className="flex items-center gap-2 mb-2 hover:text-primary transition-colors"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span className="font-semibold">QS. {result.verse_key}</span>
                    </Link>
                    <p className="font-arabic text-lg text-primary leading-loose mb-2" dir="rtl">
                      {result.text}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {result.translations?.[0]?.text?.replace(/<[^>]*>/g, "")}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {query && results.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tidak ada hasil untuk "{query}"</p>
        </div>
      )}

      {!query && results.length === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 text-center">
            <Search className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="font-semibold mb-1">Cari Teks</p>
            <p className="text-sm text-muted-foreground">Cari berdasarkan teks Arab atau terjemahan</p>
          </div>
          <div className="rounded-xl border bg-card p-6 text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="font-semibold mb-1">Jelajahi Surah</p>
            <p className="text-sm text-muted-foreground">
              <Link href="/" className="text-primary hover:underline">
                Kembali ke daftar surah
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
