import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getPrayerTimes } from "@/lib/prayer-api";

interface PrayerSchedule {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const WITA_OFFSET_MS = 8 * 3600 * 1000;

export function getWitaDate(date: Date = new Date()): string {
  return new Date(date.getTime() + WITA_OFFSET_MS).toISOString().split("T")[0];
}

export function getWitaTime(date: Date = new Date()): string {
  const d = new Date(date.getTime() + WITA_OFFSET_MS);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function shiftDateKey(key: string, deltaDays: number): string {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, m - 1, d + deltaDays);
  const yy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

const DAILY_TOTAL = 5;

function computeStreak(history: Record<string, string[]>, todayKey: string): number {
  let count = 0;
  const today = history[todayKey];
  if (today && today.length === DAILY_TOTAL) count++;
  for (let i = 1; i <= 365; i++) {
    const key = shiftDateKey(todayKey, -i);
    const day = history[key];
    if (day && day.length === DAILY_TOTAL) count++;
    else break;
  }
  return count;
}

interface PrayerStore {
  todayPrayers: string[];
  streak: number;
  lastCheckDate: string;
  history: Record<string, string[]>;
  locationName: string;
  latitude: number | null;
  longitude: number | null;
  prayerSchedule: PrayerSchedule | null;
  lastFetchedDate: string | null;

  togglePrayer: (prayer: string) => void;
  checkAndResetDay: () => void;
  fetchAndSyncLocation: () => Promise<void>;
  forceSyncLocation: () => Promise<boolean>;
  setManualLocation: (cityName: string, lat: number, lng: number) => Promise<void>;
}

export const usePrayerStore = create<PrayerStore>()(
  persist(
    (set, get) => ({
      todayPrayers: [],
      streak: 0,
      lastCheckDate: getWitaDate(),
      history: {},
      locationName: "Mendeteksi Lokasi...",
      latitude: null,
      longitude: null,
      prayerSchedule: null,
      lastFetchedDate: null,

      setManualLocation: async (cityName: string, lat: number, lng: number) => {
        const today = getWitaDate();
        try {
          const data = await getPrayerTimes(lat, lng);
          set({
            prayerSchedule: data.timings as PrayerSchedule,
            locationName: cityName,
            latitude: lat,
            longitude: lng,
            lastFetchedDate: today,
          });
        } catch (err) {
          console.error("Gagal set manual location", err);
        }
      },

      forceSyncLocation: async (): Promise<boolean> => {
        const today = getWitaDate();
        return new Promise((resolve) => {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                try {
                  const data = await getPrayerTimes(lat, lng);
                  let locName = "Lokasi Ditemukan";
                  try {
                    const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id`);
                    const geoData = await geoRes.json();
                    locName = `${geoData.city || geoData.locality || "Lokasi Anda"}, ${geoData.countryName}`;
                  } catch {}

                  set({
                    prayerSchedule: data.timings as PrayerSchedule,
                    locationName: locName,
                    latitude: lat,
                    longitude: lng,
                    lastFetchedDate: today,
                  });
                  resolve(true);
                } catch {
                  resolve(false);
                }
              },
              async () => {
                // Denied GPS
                const fallbackData = await getPrayerTimes();
                set({
                  prayerSchedule: fallbackData.timings as PrayerSchedule,
                  locationName: "Akses GPS Ditolak - Default (Banjarbaru)",
                  lastFetchedDate: today,
                });
                resolve(false);
              },
              { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
          } else {
            resolve(false);
          }
        });
      },

      fetchAndSyncLocation: async () => {
        const today = getWitaDate();

        // Return if already fetched today to prevent spamming API
        if (get().lastFetchedDate === today && get().prayerSchedule) {
          return;
        }

        const stateLat = get().latitude;
        const stateLng = get().longitude;

        if (stateLat && stateLng) {
          try {
            const data = await getPrayerTimes(stateLat, stateLng);
            set({ prayerSchedule: data.timings as PrayerSchedule, lastFetchedDate: today });
            return;
          } catch {}
        }

        try {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const data = await getPrayerTimes(lat, lng);

                try {
                  const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id`);
                  const geoData = await geoRes.json();
                  const locName = `${geoData.city || geoData.locality || "Lokasi Anda"}, ${geoData.countryName}`;
                  set({ prayerSchedule: data.timings as PrayerSchedule, locationName: locName, latitude: lat, longitude: lng, lastFetchedDate: today });
                } catch {
                  set({ prayerSchedule: data.timings as PrayerSchedule, locationName: "Lokasi Ditemukan", latitude: lat, longitude: lng, lastFetchedDate: today });
                }
              },
              async () => {
                // Denied GPS
                const fallbackData = await getPrayerTimes();
                set({ prayerSchedule: fallbackData.timings as PrayerSchedule, locationName: "Akses GPS Ditolak - Default (Banjarbaru)", lastFetchedDate: today });
              }
            );
          } else {
            // Not supported
            const fallbackData = await getPrayerTimes();
            set({ prayerSchedule: fallbackData.timings as PrayerSchedule, locationName: "GPS Tidak Didukung - Default (Banjarbaru)", lastFetchedDate: today });
          }
        } catch (error) {
          console.error("Gagal sinkronisasi waktu sholat", error);
        }
      },

      togglePrayer: (prayer) => {
        const state = get();
        state.checkAndResetDay();

        const isChecked = state.todayPrayers.includes(prayer);
        if (isChecked) return;
        const newPrayers = [...state.todayPrayers, prayer];

        // Integrasi dengan Daily Quest Gamification (pindah ke async IIFE agar tidak memblokir state)
        (async () => {
          const gamificationStore = (await import("./gamification-store")).useGamificationStore.getState();
          gamificationStore.updateQuestProgress("sholat", 1);
        })();

        const todayKey = getWitaDate();
        const newHistory = {
          ...state.history,
          [todayKey]: newPrayers,
        };

        set({
          todayPrayers: newPrayers,
          history: newHistory,
          streak: computeStreak(newHistory, todayKey),
        });
      },

      checkAndResetDay: () => {
        const today = getWitaDate();
        const state = get();

        if (state.lastCheckDate !== today) {
          const newHistory = { ...state.history };

          // Simpan sisa checklist hari kemarin ke riwayat
          if (state.todayPrayers.length > 0) {
            newHistory[state.lastCheckDate] = state.todayPrayers;
          }

          // Pertahankan hanya 7 hari terakhir
          const cutoff = shiftDateKey(today, -6);
          for (const key of Object.keys(newHistory)) {
            if (key < cutoff) delete newHistory[key];
          }

          set({
            todayPrayers: [],
            lastCheckDate: today,
            history: newHistory,
            streak: computeStreak(newHistory, today),
          });
        }
      },
    }),
    { name: "prayer-tracker" }
  )
);
