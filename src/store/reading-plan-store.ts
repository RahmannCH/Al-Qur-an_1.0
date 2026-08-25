import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReadingPlanState {
  isActive: boolean;
  targetDays: number;
  startDate: string;
  ayahsRead: number;
  totalAyahs: number;

  setPlan: (days: number) => void;
  addProgress: (ayahs: number) => void;
  resetPlan: () => void;

  // Adaptive Khatam helpers
  getDaysElapsed: () => number;
  getDaysRemaining: () => number;
  getAdaptiveDailyTarget: () => number;
  isOnTrack: () => boolean;
}

export const useReadingPlanStore = create<ReadingPlanState>()(
  persist(
    (set, get) => ({
      isActive: false,
      targetDays: 30,
      startDate: new Date().toISOString(),
      ayahsRead: 0,
      totalAyahs: 6236,

      setPlan: (days) =>
        set({
          isActive: true,
          targetDays: days,
          startDate: new Date().toISOString(),
          ayahsRead: 0,
        }),

      addProgress: (ayahs) =>
        set((state) => ({
          ayahsRead: Math.min(state.ayahsRead + ayahs, state.totalAyahs),
        })),

      resetPlan: () => set({ isActive: false, ayahsRead: 0 }),

      getDaysElapsed: () => {
        const start = new Date(get().startDate);
        const now = new Date();
        return Math.max(0, Math.floor((now.getTime() - start.getTime()) / 86400000));
      },

      getDaysRemaining: () => {
        const elapsed = get().getDaysElapsed();
        return Math.max(0, get().targetDays - elapsed);
      },

      getAdaptiveDailyTarget: () => {
        const remaining = get().totalAyahs - get().ayahsRead;
        const daysLeft = get().getDaysRemaining();
        if (daysLeft <= 0 || remaining <= 0) return 0;
        return Math.ceil(remaining / daysLeft);
      },

      isOnTrack: () => {
        const elapsed = get().getDaysElapsed();
        if (elapsed === 0) return true;
        const expectedByNow = Math.ceil((get().totalAyahs / get().targetDays) * elapsed);
        return get().ayahsRead >= expectedByNow;
      },
    }),
    {
      name: "reading-plan-storage",
    }
  )
);
