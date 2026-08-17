"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useGamificationStore, getLevelInfo } from "@/store/gamification-store";
import { Trophy, ChevronRight } from "lucide-react";

export function UserLevelWidget() {
  const { xp } = useGamificationStore();
  const lvl = getLevelInfo(xp);

  return (
    <Link href="/achievements">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 bg-gradient-to-r from-primary/10 via-teal/10 to-gold/10 border border-primary/20 px-4 py-2.5 rounded-2xl cursor-pointer"
      >
        <div className="bg-primary text-primary-foreground p-2 rounded-xl">
          <Trophy className="h-5 w-5 text-gold fill-gold" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Lvl {lvl.level} &middot; {lvl.title}</p>
          <p className="text-sm font-bold text-primary">{xp} ZP</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground ml-1" />
      </motion.div>
    </Link>
  );
}
