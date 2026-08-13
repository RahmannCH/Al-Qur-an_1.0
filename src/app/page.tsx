import { Suspense } from "react";
import { getChapters } from "@/lib/api";
import { SurahList } from "@/components/quran/surah-list";
import { DailyAyat } from "@/components/home/daily-ayat";
import { ProgressWidget } from "@/components/home/progress-widget";
import { UserLevelWidget } from "@/components/home/user-level-widget";
import { DynamicThemeBanner } from "@/components/home/dynamic-theme-banner";
import { PrayerWidget } from "@/components/home/prayer-widget";
import { PrayerStreak } from "@/components/prayer/prayer-streak";
import { LastReadCard } from "@/components/quran/last-read-card";
import { HeroBentoGrid } from "@/components/home/hero-bento-grid";
import { DailyQuestsWidget } from "@/components/home/daily-quests-widget";
import { OnboardingModal } from "@/components/home/onboarding-modal";
import { UserGreeting } from "@/components/home/user-greeting";
import { ReadingPlanWidget } from "@/components/home/reading-plan-widget";
import { Loader2 } from "lucide-react";

// Pisahkan fetching ke komponen khusus agar bisa di-Suspense
async function AsyncSurahList() {
  const chapters = await getChapters("id");
  return <SurahList chapters={chapters} />;
}

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 min-h-screen">
      <OnboardingModal />
      <DynamicThemeBanner />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 mt-8">
        <UserGreeting />
        <UserLevelWidget />
      </div>

      <HeroBentoGrid />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-6">
          <LastReadCard />
          <DailyAyat />
        </div>
        <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
          <PrayerWidget />
          <DailyQuestsWidget />
          <ReadingPlanWidget />
          <ProgressWidget />
        </div>
      </div>

      <section className="mb-12">
        <PrayerStreak className="w-full shadow-lg" />
      </section>

      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold mb-2">Baca Al-Qur'an</h2>
        <p className="text-muted-foreground">114 Surah &middot; 6236 Ayat &middot; 30 Juz</p>
      </div>

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
          <p>Memuat daftar surah...</p>
        </div>
      }>
        <AsyncSurahList />
      </Suspense>
    </div>
  );
}
