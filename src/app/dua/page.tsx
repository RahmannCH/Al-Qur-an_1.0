"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import duaData from "@/data/dua-basic.json";
import { DuaGrid } from "@/components/dua/dua-grid";
import { BackButton } from "@/components/layout/back-button";
import { Input } from "@/components/ui/input";
import { Search, Heart } from "lucide-react";
import { sfx } from "@/lib/sfx";

export default function DuaPage() {
  const categories = duaData.categories;
  const [selectedCatId, setSelectedCatId] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.map((cat) => {
    // Filter berdasarkan kategori yang dipilih
    if (selectedCatId !== "all" && cat.id !== selectedCatId) {
      return null;
    }

    // Filter berdasarkan kata kunci pencarian
    const filteredDuas = cat.duas.filter(
      (dua) =>
        dua.name_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dua.translation_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dua.transliteration.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredDuas.length === 0) return null;

    return {
      ...cat,
      duas: filteredDuas,
    };
  }).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pb-32">
      <BackButton />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500">
            <Heart className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-display font-bold">Koleksi Doa Mustajab</h1>
        </div>
        <p className="text-muted-foreground">Doa-doa sehari-hari, bacaan sholat, dzikir pagi petang, dan perlindungan.</p>
      </div>

      {/* Baris Filter & Search */}
      <div className="space-y-4 mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari doa (misal: wudhu, istighfar, orang tua)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-2xl text-sm"
          />
        </div>

        {/* Filter Pill Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => { setSelectedCatId("all"); sfx.playTap(); }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCatId === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border hover:bg-muted text-muted-foreground"
            }`}
          >
            Semua Doa ({categories.reduce((sum, c) => sum + c.duas.length, 0)})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCatId(cat.id); sfx.playTap(); }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCatId === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border hover:bg-muted text-muted-foreground"
              }`}
            >
              {cat.name} ({cat.duas.length})
            </button>
          ))}
        </div>
      </div>

      {/* Render Doa Categories */}
      {filteredCategories.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <p className="font-bold text-lg mb-1">Doa tidak ditemukan</p>
          <p className="text-xs">Coba gunakan kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        filteredCategories.map((category) => (
          <div key={category!.id} className="mb-12">
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              {category!.name}
            </h2>
            <DuaGrid duas={category!.duas} categoryId={category!.id} />
          </div>
        ))
      )}
    </div>
  );
}
