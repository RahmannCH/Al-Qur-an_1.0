import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReadingPlanState {
  isActive: boolean;
  targetDays: number;
  startDate: string; // ISO string
  ayahsRead: number;
  totalAyahs: number; // typically 6236
  setPlan: (days: number) => void;
  addProgress: (ayahs: number) => void;
  resetPlan: () => void;
}

export const useReadingPlanStore = create<ReadingPlanState>()(
  persist(
    (set) => ({
      isActive: false,
      targetDays: 30,
      startDate: new Date().toISOString(),
      ayahsRead: 0,
      totalAyahs: 6236,
      
      setPlan: (days) => set({
        isActive: true,
        targetDays: days,
        startDate: new Date().toISOString(),
        ayahsRead: 0
      }),
      
      addProgress: (ayahs) => set((state) => ({
        ayahsRead: Math.min(state.ayahsRead + ayahs, state.totalAyahs)
      })),
      
      resetPlan: () => set({ isActive: false, ayahsRead: 0 })
    }),
    {
      name: "reading-plan-storage"
    }
  )
);
