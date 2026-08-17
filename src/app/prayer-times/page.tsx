"use client";

import { useEffect } from "react";
import { PrayerHero } from "@/components/prayer/prayer-hero";
import { PrayerList } from "@/components/prayer/prayer-list";
import { PrayerStreak } from "@/components/prayer/prayer-streak";
import { QiblaCompass } from "@/components/prayer/qibla-compass";
import { SunnahTracker } from "@/components/prayer/sunnah-tracker";
import { LocationModal } from "@/components/prayer/location-modal";
import { BackButton } from "@/components/layout/back-button";
import { Loader2, MapPin } from "lucide-react";
import { usePrayerStore } from "@/store/prayer-store";
import { gregorianToHijri } from "@/lib/prayer-api";

export default function PrayerTimesPage() {
  const { prayerSchedule, locationName, fetchAndSyncLocation } = usePrayerStore();

  useEffect(() => {
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

  const now = new Date();
  const hijriNow = gregorianToHijri(now);

  // Adapter dinamis untuk komponen child yang menggunakan tipe data lama
  const adapterPrayerTimes: any = {
    date: { 
      readable: now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      hijri: {
        day: String(hijriNow.day),
        month: { en: hijriNow.monthName, number: hijriNow.month },
        year: String(hijriNow.year)
      },
      gregorian: {
        weekday: { en: now.toLocaleDateString("en-US", { weekday: 'long' }) }
      }
    },
    timings: prayerSchedule
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pb-32 min-h-screen">
      <BackButton />
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Jadwal Sholat & Kiblat</h1>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-muted-foreground flex items-center gap-1.5 font-medium bg-primary/5 w-fit px-3 py-1.5 rounded-lg border border-primary/10 text-xs md:text-sm">
             <MapPin className="h-4 w-4 text-primary" /> {locationName}
          </p>
          <LocationModal />
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <PrayerHero prayerTimes={adapterPrayerTimes} />
      </div>
      
      {/* Grid Layout 3 Kolom Utama di Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-start">
        {/* Kolom 1: Daftar Waktu Sholat */}
        <div className="md:col-span-6 lg:col-span-4 h-full">
          <PrayerList prayerTimes={adapterPrayerTimes} />
        </div>
        
        {/* Kolom 2: Tracker Sunnah & Puasa */}
        <div className="md:col-span-6 lg:col-span-4 h-full">
          <SunnahTracker 
            hijriDate={adapterPrayerTimes.date.hijri} 
            gregorianDate={adapterPrayerTimes.date.gregorian} 
          />
        </div>

        {/* Kolom 3: Kompas Kiblat */}
        <div className="md:col-span-12 lg:col-span-4 h-full">
          <QiblaCompass />
        </div>
      </div>

      {/* Full Width Tracker Bawah */}
      <section className="mt-12">
        <PrayerStreak className="w-full shadow-lg" />
      </section>
    </div>
  );
}
