import { getChapter, getVerses } from "@/lib/api";
import { SurahHeader } from "@/components/quran/surah-header";
import { AyahList } from "@/components/quran/ayah-list";
import { BackButton } from "@/components/layout/back-button";
import { SurahPageClient } from "@/components/quran/surah-page-client";
import type { Verse } from "@/types/quran";

interface SurahPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SurahPageProps) {
  const { id } = await params;
  const chapter = await getChapter(Number(id));
  return {
    title: `${chapter.name_simple} - Al-Qur'an Digital`,
    description: `Baca Surah ${chapter.name_simple} (${chapter.translated_name.name}) - ${chapter.verses_count} ayat`,
  };
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params;
  const chapterId = Number(id);
  const chapter = await getChapter(chapterId);

  const allVerses: Verse[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const data = await getVerses(chapterId, page, 50);
    allVerses.push(...data.verses);
    hasMore = data.pagination.next_page !== null;
    page++;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <BackButton />
      <SurahHeader chapter={chapter} />
      <SurahPageClient verses={allVerses} chapter={chapter} />
    </div>
  );
}
