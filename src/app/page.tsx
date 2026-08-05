import { getChapters } from "@/lib/api";
import { SurahList } from "@/components/quran/surah-list";
import { LastReadCard } from "@/components/quran/last-read-card";
import { DailyAyat } from "@/components/home/daily-ayat";
import { QuickActions } from "@/components/home/quick-actions";
import { ProgressWidget } from "@/components/home/progress-widget";
import { UserLevelWidget } from "@/components/home/user-level-widget";

export default async function Home() {
  const chapters = await getChapters("id");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-1">Assalamu&apos;alaikum</h1>
          <p className="text-muted-foreground">Selamat datang di Al-Qur&apos;an Digital</p>
        </div>
        <UserLevelWidget />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <LastReadCard />
          <DailyAyat />
        </div>
        <div className="space-y-6">
          <ProgressWidget />
          <QuickActions />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold mb-2">Daftar Surah</h2>
        <p className="text-muted-foreground">114 Surah &middot; 6236 Ayat &middot; 30 Juz</p>
      </div>

      <SurahList chapters={chapters} />
    </div>
  );
}
