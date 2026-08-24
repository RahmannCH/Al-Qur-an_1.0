import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getChapters } from "@/lib/api";
import { SurahList } from "@/components/quran/surah-list";
import { DailyAyat } from "@/components/home/daily-ayat";
import { ProgressWidget } from "@/components/home/progress-widget";
import { UserLevelWidget } from "@/components/home/user-level-widget";
import { DynamicThemeBanner } from "@/components/home/dynamic-theme-banner";
import { PrayerWidget } from "@/components/home/prayer-widget";
import { LastReadCard } from "@/components/quran/last-read-card";
import { HeroBentoGrid } from "@/components/home/hero-bento-grid";
import { OnboardingModal } from "@/components/home/onboarding-modal";
import { UserGreeting } from "@/components/home/user-greeting";
import { Loader2 } from "lucide-react";

// --- DYNAMIC IMPORTS ---
const HijriCalendarWidget = dynamic(
  () => import("@/components/home/hijri-calendar-widget").then((mod) => mod.HijriCalendarWidget),
  {
    loading: () => <div className="h-48 w-full rounded-3xl border bg-card/50 animate-pulse" />,
  }
);

const DailyQuestsWidget = dynamic(
  () => import("@/components/home/daily-quests-widget").then((mod) => mod.DailyQuestsWidget),
  {
    loading: () => <div className="h-48 w-full rounded-3xl border bg-card/50 animate-pulse" />,
  }
);

const MiniMurottalWidget = dynamic(
  () => import("@/components/home/mini-murottal-widget").then((mod) => mod.MiniMurottalWidget),
  {
    loading: () => <div className="h-24 w-full rounded-3xl border bg-card/50 animate-pulse" />,
  }
);

const AsmaulHusnaWidget = dynamic(
  () => import("@/components/home/asmaul-husna-widget").then((mod) => mod.AsmaulHusnaWidget),
  {
    loading: () => <div className="h-48 w-full rounded-3xl border bg-card/50 animate-pulse" />,
  }
);

const PrayerStreak = dynamic(
  () => import("@/components/prayer/prayer-streak").then((mod) => mod.PrayerStreak),
  {
    loading: () => <div className="h-96 w-full rounded-3xl border bg-card/50 animate-pulse" />,
  }
);

// --- ASYNC COMPONENT ---
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

      {/* --- ROW 1: TIME & QUESTS --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-6">
          <PrayerWidget />
        </div>
        <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-6">
          <HijriCalendarWidget />
        </div>
        <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
          <DailyQuestsWidget />
        </div>
      </div>

      {/* --- ROW 2: ACTIVITIES & MEDIA --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-6">
          <LastReadCard />
          <DailyAyat />
        </div>
        <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
          <ProgressWidget />
          <MiniMurottalWidget />
          <AsmaulHusnaWidget />
        </div>
      </div>

      {/* --- PRAYER TRACKER --- */}
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
