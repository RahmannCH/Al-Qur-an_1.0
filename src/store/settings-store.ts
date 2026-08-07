import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LastRead {
  verseKey: string;
  surahId: number;
  surahName: string;
  verseNumber: number;
  timestamp: number;
}

interface SettingsStore {
  fontSize: number;
  showTranslation: boolean;
  reciterId: number;
  lastRead: LastRead | null;
  userName: string;
  dailyTargetAyah: number;
  hasCompletedOnboarding: boolean;

  setFontSize: (size: number) => void;
  setShowTranslation: (show: boolean) => void;
  setReciterId: (id: number) => void;
  setLastRead: (lastRead: LastRead) => void;
  setUserName: (name: string) => void;
  setDailyTargetAyah: (target: number) => void;
  completeOnboarding: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      fontSize: 28,
      showTranslation: true,
      reciterId: 7,
      lastRead: null,
      userName: "",
      dailyTargetAyah: 10,
      hasCompletedOnboarding: false,

      setFontSize: (fontSize) => set({ fontSize }),
      setShowTranslation: (showTranslation) => set({ showTranslation }),
      setReciterId: (reciterId) => set({ reciterId }),
      setLastRead: (lastRead) => set({ lastRead }),
      setUserName: (userName) => set({ userName }),
      setDailyTargetAyah: (dailyTargetAyah) => set({ dailyTargetAyah }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
    }),
    { name: "quran-settings" }
  )
);
