import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PrayerStore {
  todayPrayers: string[];
  streak: number;
  lastCheckDate: string;
  togglePrayer: (prayer: string) => void;
  checkAndResetDay: () => void;
}

export const usePrayerStore = create<PrayerStore>()(
  persist(
    (set, get) => ({
      todayPrayers: [],
      streak: 0,
      lastCheckDate: new Date().toISOString().split("T")[0],

      togglePrayer: (prayer) => {
        const state = get();
        state.checkAndResetDay();
        
        const isChecked = state.todayPrayers.includes(prayer);
        const newPrayers = isChecked
          ? state.todayPrayers.filter((p) => p !== prayer)
          : [...state.todayPrayers, prayer];

        let newStreak = state.streak;
        if (newPrayers.length === 5 && state.todayPrayers.length < 5) {
          newStreak = state.streak + 1;
        } else if (newPrayers.length < 5 && state.todayPrayers.length === 5) {
          newStreak = Math.max(0, state.streak - 1);
        }

        set({
          todayPrayers: newPrayers,
          streak: newStreak,
        });
      },

      checkAndResetDay: () => {
        const today = new Date().toISOString().split("T")[0];
        const state = get();
        
        if (state.lastCheckDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split("T")[0];
          
          const isConsecutive = state.lastCheckDate === yesterdayStr;
          const hadFullPrayers = state.todayPrayers.length === 5;
          
          set({
            todayPrayers: [],
            lastCheckDate: today,
            streak: isConsecutive && hadFullPrayers ? state.streak : 0,
          });
        }
      },
    }),
    { name: "prayer-tracker" }
  )
);
