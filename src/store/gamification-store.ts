import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export const AVAILABLE_BADGES: Badge[] = [
  { id: "first_read", name: "Langkah Pertama", description: "Membaca ayat pertama", icon: "📖" },
  { id: "night_owl", name: "Night Owl", description: "Membaca di atas jam 12 malam", icon: "🦉" },
  { id: "streak_7", name: "Istiqomah 7", description: "Membaca 7 hari berturut-turut", icon: "🔥" },
  { id: "hafiz_apprentice", name: "Murid Hafiz", description: "Selesaikan 1 Surah", icon: "🎓" },
  { id: "jumuah_mubarak", name: "Jumu'ah Mubarak", description: "Buka Al-Kahfi di hari Jumat", icon: "🕌" },
  { id: "chat_explorer", name: "Explorer", description: "Gunakan AI Chat 5 kali", icon: "🤖" },
  { id: "dzikir_master", name: "Dzikir Master", description: "Lakukan 1000x Tasbih", icon: "📿" }
];

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  nextXp: number;
}

export function getLevelInfo(xp: number): LevelInfo {
  const levels = [
    { level: 1, title: "Mubtadi", minXp: 0, nextXp: 100 },
    { level: 2, title: "Mubtadi II", minXp: 100, nextXp: 300 },
    { level: 3, title: "Mubtadi III", minXp: 300, nextXp: 600 },
    { level: 4, title: "Mutawassith", minXp: 600, nextXp: 1200 },
    { level: 5, title: "Mutawassith II", minXp: 1200, nextXp: 2500 },
    { level: 6, title: "Muta'allim", minXp: 2500, nextXp: 5000 },
    { level: 7, title: "Muta'allim II", minXp: 5000, nextXp: 10000 },
    { level: 8, title: "Mujahid", minXp: 10000, nextXp: 20000 },
    { level: 9, title: "Mujahid II", minXp: 20000, nextXp: 40000 },
    { level: 10, title: "Hafiz", minXp: 40000, nextXp: 100000 }
  ];

  let current = levels[0];
  for (const lvl of levels) {
    if (xp >= lvl.minXp) current = lvl;
    else break;
  }
  return current;
}

interface GamificationStore {
  xp: number;
  unlockedBadges: string[];
  recentXpGains: { amount: number; reason: string; id: string }[];
  shields: number;
  readCount: number;
  chatCount: number;
  dzikirCount: number;
  
  addXp: (amount: number, reason: string) => void;
  clearRecentXpGain: (id: string) => void;
  unlockBadge: (badgeId: string) => void;
  incrementRead: () => void;
  incrementChat: () => void;
  incrementDzikir: (amount: number) => void;
  checkMilestones: () => void;
}

export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set, get) => ({
      xp: 0,
      unlockedBadges: [],
      recentXpGains: [],
      shields: 0,
      readCount: 0,
      chatCount: 0,
      dzikirCount: 0,

      addXp: (amount, reason) => {
        const id = Date.now().toString() + Math.random().toString();
        set((state) => ({
          xp: state.xp + amount,
          recentXpGains: [...state.recentXpGains, { amount, reason, id }]
        }));
        get().checkMilestones();
      },

      clearRecentXpGain: (id) => {
        set((state) => ({
          recentXpGains: state.recentXpGains.filter((g) => g.id !== id)
        }));
      },

      unlockBadge: (badgeId) => {
        set((state) => {
          if (state.unlockedBadges.includes(badgeId)) return state;
          return { unlockedBadges: [...state.unlockedBadges, badgeId] };
        });
      },

      incrementRead: () => set((state) => ({ readCount: state.readCount + 1 })),
      incrementChat: () => set((state) => ({ chatCount: state.chatCount + 1 })),
      incrementDzikir: (amount) => set((state) => ({ dzikirCount: state.dzikirCount + amount })),

      checkMilestones: () => {
        const state = get();
        const hour = new Date().getHours();
        
        if (state.readCount === 1) get().unlockBadge("first_read");
        if (hour >= 0 && hour < 4 && state.readCount > 0) get().unlockBadge("night_owl");
        if (state.chatCount >= 5) get().unlockBadge("chat_explorer");
        if (state.dzikirCount >= 1000) get().unlockBadge("dzikir_master");
        
        const day = new Date().getDay();
        if (day === 5) get().unlockBadge("jumuah_mubarak");
      }
    }),
    { name: "gamification-storage" }
  )
);
