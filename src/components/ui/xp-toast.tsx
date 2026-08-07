"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGamificationStore } from "@/store/gamification-store";
import { Sparkles } from "lucide-react";
import { sfx } from "@/lib/sfx";

export function XpToastContainer() {
  const { recentXpGains, clearRecentXpGain } = useGamificationStore();

  useEffect(() => {
    if (recentXpGains.length > 0) {
      sfx.playSuccess();
    }
  }, [recentXpGains.length]);

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {recentXpGains.map((gain) => (
          <XpToast key={gain.id} gain={gain} onRemove={() => clearRecentXpGain(gain.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function XpToast({ gain, onRemove }: { gain: any; onRemove: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 3000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className="flex items-center gap-3 bg-gradient-to-r from-gold/90 to-gold/70 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl shadow-gold/20"
    >
      <div className="bg-white/20 p-2 rounded-xl">
        <Sparkles className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-display font-bold text-lg leading-none">+{gain.amount} XP</p>
        <p className="text-xs font-medium text-white/90 mt-0.5">{gain.reason}</p>
      </div>
    </motion.div>
  );
}
