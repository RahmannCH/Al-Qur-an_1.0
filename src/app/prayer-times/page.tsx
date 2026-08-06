"use client";

import { useEffect } from "react";
import { PrayerHero } from "@/components/prayer/prayer-hero";
import { PrayerList } from "@/components/prayer/prayer-list";
import { PrayerStreak } from "@/components/prayer/prayer-streak";
import { QiblaCompass } from "@/components/prayer/qibla-compass";
import { BackButton } from "@/components/layout/back-button";
import { Loader2, MapPin } from "lucide-react";
import { usePrayerStore } from "@/store/prayer-store";

export default function PrayerTimesPage() {
  const { prayerSchedule, locationName, fetchAndSyncLocation } = usePrayerStore();

  useEffect(() => {
    // If we haven't synced location today, do it now
    fetchAndSyncLocation();
  }, [fetchAndSyncLocation]);

  if (!prayerSchedule) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-32 flex flex-col items-center justify-center text-center">
        <BackButton />
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-display font-bold mb-2">Mendeteksi Lokasi Akurat...</h2>
        <p className="text-muted-foreground">Menyesuaikan waktu sholat dengan daerah Anda</p>
      </div>
    );
  }

  // Adapter untuk komponen child yang menggunakan tipe data lama
  const adapterPrayerTimes: any = {
    date: { readable: new Date().toLocaleDateString("id-ID") },
    timings: prayerSchedule
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Jadwal Sholat</h1>
        <p className="text-muted-foreground flex items-center gap-1 font-medium">
           <MapPin className="h-4 w-4 text-primary" /> {locationName}
        </p>
      </div>

      <PrayerHero prayerTimes={adapterPrayerTimes} />
      
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <PrayerList prayerTimes={adapterPrayerTimes} />
        <div className="space-y-6">
          <QiblaCompass />
          <PrayerStreak />
        </div>
      </div>
    </div>
  );
}
