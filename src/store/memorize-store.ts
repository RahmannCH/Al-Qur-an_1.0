import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MemorizeStore {
  memorizedVerses: string[]; // List verseKey e.g. ["1:1", "1:2", "112:1"]
  inProgressSurahs: number[]; // List surahId e.g. [1, 112, 114]
  murajaahStreak: number;
  lastMurajaahDate: string | null;

  toggleMemorizedVerse: (verseKey: string) => void;
  isVerseMemorized: (verseKey: string) => boolean;
  addInProgressSurah: (surahId: number) => void;
  recordMurajaahSession: () => void;
  resetMemorizeData: () => void;
}

export const useMemorizeStore = create<MemorizeStore>()(
  persist(
    (set, get) => ({
      memorizedVerses: [],
      inProgressSurahs: [1, 112, 113, 114], // Default surah pendek yang sering dipelajari
      murajaahStreak: 0,
      lastMurajaahDate: null,

      toggleMemorizedVerse: (verseKey: string) => {
        set((state) => {
          const exists = state.memorizedVerses.includes(verseKey);
          const updated = exists
            ? state.memorizedVerses.filter((k) => k !== verseKey)
            : [...state.memorizedVerses, verseKey];

          return {
            memorizedVerses: updated,
          };
        });
      },

      isVerseMemorized: (verseKey: string) => {
        return get().memorizedVerses.includes(verseKey);
      },

      addInProgressSurah: (surahId: number) => {
        set((state) => {
          if (state.inProgressSurahs.includes(surahId)) return state;
          return { inProgressSurahs: [...state.inProgressSurahs, surahId] };
        });
      },

      recordMurajaahSession: () => {
        const today = new Date().toISOString().split("T")[0];
        set((state) => {
          if (state.lastMurajaahDate === today) return state;
          return {
            murajaahStreak: state.murajaahStreak + 1,
            lastMurajaahDate: today,
          };
        });
      },

      resetMemorizeData: () => {
        set({
          memorizedVerses: [],
          inProgressSurahs: [],
          murajaahStreak: 0,
          lastMurajaahDate: null,
        });
      },
    }),
    {
      name: "zadify-memorize-storage",
    }
  )
);
