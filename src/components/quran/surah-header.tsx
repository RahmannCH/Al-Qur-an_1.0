import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import type { Chapter } from "@/types/quran";

export function SurahHeader({ chapter }: { chapter: Chapter }) {
  return (
    <div className="mb-8">
      <Link 
        href="/" 
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>

      <div className="text-center rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border p-8">
        <h1 className="text-3xl font-display font-bold mb-2">{chapter.name_simple}</h1>
        <p className="font-arabic text-3xl text-primary mb-3" dir="rtl">
          {chapter.name_arabic}
        </p>
        <p className="text-muted-foreground mb-4">{chapter.translated_name.name}</p>

        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {chapter.revelation_place === "makkah" ? "Makkiyah" : "Madaniyah"}
          </Badge>
          <Badge variant="outline">{chapter.verses_count} Ayat</Badge>
        </div>

        {chapter.bismillah_pre && (
          <p className="mt-8 font-arabic text-3xl text-primary leading-relaxed" dir="rtl">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </p>
        )}
      </div>
    </div>
  );
}
