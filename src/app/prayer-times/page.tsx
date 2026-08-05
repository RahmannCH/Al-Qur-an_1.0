import { getPrayerTimes } from "@/lib/prayer-api";
import { PrayerHero } from "@/components/prayer/prayer-hero";
import { PrayerList } from "@/components/prayer/prayer-list";
import { PrayerStreak } from "@/components/prayer/prayer-streak";
import { QiblaCompass } from "@/components/prayer/qibla-compass";
import { BackButton } from "@/components/layout/back-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal Sholat - Al-Qur'an Digital",
  description: "Jadwal sholat harian berdasarkan lokasi GPS",
};

export default async function PrayerTimesPage() {
  const prayerTimes = await getPrayerTimes();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Jadwal Sholat</h1>
        <p className="text-muted-foreground">Yogyakarta, Indonesia</p>
      </div>

      <PrayerHero prayerTimes={prayerTimes} />
      
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <PrayerList prayerTimes={prayerTimes} />
        <div className="space-y-6">
          <QiblaCompass />
          <PrayerStreak />
        </div>
      </div>
    </div>
  );
}
