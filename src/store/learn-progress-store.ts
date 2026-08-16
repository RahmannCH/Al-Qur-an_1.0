import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LearnProgressStore {
  // Map of module slug -> highest quiz score (0 to 100)
  completedModules: Record<string, number>;
  markModuleCompleted: (slug: string, score: number) => void;
  isModuleCompleted: (slug: string) => boolean;
  getModuleScore: (slug: string) => number;
  resetProgress: () => void;
}

export const useLearnProgressStore = create<LearnProgressStore>()(
  persist(
    (set, get) => ({
      completedModules: {},

      markModuleCompleted: (slug: string, score: number) => {
        set((state) => {
          const currentScore = state.completedModules[slug] || 0;
          return {
            completedModules: {
              ...state.completedModules,
              [slug]: Math.max(currentScore, score),
            },
          };
        });
      },

      isModuleCompleted: (slug: string) => {
        const score = get().completedModules[slug];
        return typeof score === "number" && score >= 70;
      },

      getModuleScore: (slug: string) => {
        return get().completedModules[slug] || 0;
      },

      resetProgress: () => set({ completedModules: {} }),
    }),
    {
      name: "learn-progress-storage",
    }
  )
);
