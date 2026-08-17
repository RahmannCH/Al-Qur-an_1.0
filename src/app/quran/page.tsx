import { getChapters } from "@/lib/api";
import { SurahList } from "@/components/quran/surah-list";
import { BackButton } from "@/components/layout/back-button";

export const metadata = {
  title: "Al-Qur'an | Zadify",
  description: "Membaca Al-Qur'an 30 Juz dan 114 Surah dengan panduan tajwid berwarna dan murottal per-ayat",
};

export default async function QuranPage() {
  const chapters = await getChapters("id");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <BackButton />
      <div className="mb-8 mt-2">
        <h1 className="text-4xl font-display font-bold mb-2">Al-Qur'an</h1>
        <p className="text-muted-foreground text-lg">Membaca 114 Surah, 6236 Ayat, 30 Juz</p>
      </div>

      <div className="bg-card border rounded-3xl p-6 md:p-10 shadow-sm">
        <SurahList chapters={chapters} />
      </div>
    </div>
  );
}
