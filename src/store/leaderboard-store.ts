import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getWitaDate } from "./prayer-store";

export interface LeagueEntry {
  id: string;
  name: string;
  xp: number;
  weeklyXp: number;
  level: number;
  isMe?: boolean;
}

export const LEAGUE_TIERS = [
  { name: "Bronze", icon: "🥉", minXp: 0, color: "from-amber-700 to-yellow-600" },
  { name: "Silver", icon: "🥈", minXp: 200, color: "from-slate-400 to-gray-300" },
  { name: "Gold", icon: "🥇", minXp: 600, color: "from-yellow-500 to-amber-400" },
  { name: "Platinum", icon: "💎", minXp: 1500, color: "from-cyan-400 to-teal-300" },
  { name: "Diamond", icon: "💠", minXp: 3000, color: "from-blue-500 to-indigo-400" },
  { name: "Hafiz", icon: "👑", minXp: 6000, color: "from-purple-600 to-pink-500" },
];

export function getTierForXp(weeklyXp: number) {
  let tier = LEAGUE_TIERS[0];
  for (const t of LEAGUE_TIERS) {
    if (weeklyXp >= t.minXp) tier = t;
    else break;
  }
  return tier;
}

const AI_RIVALS: Omit<LeagueEntry, "weeklyXp">[] = [
  { id: "r1", name: "Ahmad Fauzi", xp: 1200, level: 4 },
  { id: "r2", name: "Siti Nurhaliza", xp: 3400, level: 6 },
  { id: "r3", name: "Rizky Pratama", xp: 800, level: 3 },
  { id: "r4", name: "Fatimah Zahra", xp: 2100, level: 5 },
  { id: "r5", name: "Umar Habibie", xp: 450, level: 2 },
  { id: "r6", name: "Khadijah Putri", xp: 5200, level: 8 },
  { id: "r7", name: "Hasan Basri", xp: 1800, level: 4 },
  { id: "r8", name: "Aisyah Rahmi", xp: 280, level: 2 },
];

interface LeaderboardStore {
  weeklyXp: number;
  weekStartDate: string;
  
  addWeeklyXp: (amount: number) => void;
  resetWeekIfNeeded: () => void;
  getLeaderboard: (myXp: number, myName: string, myLevel: number) => LeagueEntry[];
  getCurrentTier: () => typeof LEAGUE_TIERS[0];
}

export const useLeaderboardStore = create<LeaderboardStore>()(
  persist(
    (set, get) => ({
      weeklyXp: 0,
      weekStartDate: getWitaDate(),

      addWeeklyXp: (amount) => {
        get().resetWeekIfNeeded();
        set((state) => ({ weeklyXp: state.weeklyXp + amount }));
      },

      resetWeekIfNeeded: () => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const weekStr = startOfWeek.toISOString().split("T")[0];
        
        if (get().weekStartDate !== weekStr) {
          set({ weeklyXp: 0, weekStartDate: weekStr });
        }
      },

      getLeaderboard: (myXp, myName, myLevel) => {
        const myWeeklyXp = get().weeklyXp;
        const me: LeagueEntry = {
          id: "me",
          name: myName || "Kamu",
          xp: myXp,
          weeklyXp: myWeeklyXp,
          level: myLevel,
          isMe: true,
        };

        const rivals: LeagueEntry[] = AI_RIVALS.map((r) => ({
          ...r,
          weeklyXp: Math.floor(r.xp * 0.1 + Math.random() * 150),
        }));

        return [...rivals, me].sort((a, b) => b.weeklyXp - a.weeklyXp);
      },

      getCurrentTier: () => getTierForXp(get().weeklyXp),
    }),
    { name: "zadify-leaderboard-storage" }
  )
);
