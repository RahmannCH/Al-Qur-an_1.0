"use client";

import { useGamificationStore, type DailyQuest } from "@/store/gamification-store";
import { getWitaDate } from "@/store/prayer-store";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, Lock, Zap, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sfx } from "@/lib/sfx";

const QUEST_ICONS: Record<string, any> = {
  read: Target,
  dzikir: Sparkles,
  sholat: Clock,
};

function QuestCard({ quest }: { quest: DailyQuest }) {
  const Icon = QUEST_ICONS[quest.type] || Target;
  const progressPercent = Math.min(100, (quest.progress / quest.target) * 100);

  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        quest.completed
          ? "bg-emerald-500/10 border-emerald-500/30"
          : "bg-card hover:bg-accent"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${quest.completed ? "bg-emerald-500/20" : "bg-primary/10"}`}>
            <Icon className={`h-4 w-4 ${quest.completed ? "text-emerald-600" : "text-primary"}`} />
          </div>
          <div>
            <p className="font-semibold text-sm">{quest.title}</p>
            <p className="text-xs text-muted-foreground">+{quest.xpReward} XP</p>
          </div>
        </div>
        {quest.completed ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        ) : (
          <Lock className="h-4 w-4 text-muted-foreground" />
        )}
      </div>

      <div className="space-y-1.5">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-teal"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-right">
          {quest.progress}/{quest.target}
        </p>
      </div>
    </div>
  );
}

function LootboxModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { claimLootbox } = useGamificationStore();
  const [opened, setOpened] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-card p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center border"
          onClick={(e) => e.stopPropagation()}
        >
          {!opened ? (
            <>
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-6"
              >
                🎁
              </motion.div>
              <h3 className="text-2xl font-display font-bold mb-2">Peti Harta Karun!</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Selamat! Kamu telah menyelesaikan semua misi hari ini.
              </p>
              <Button
                onClick={() => {
                  sfx.playSuccess();
                  claimLootbox();
                  setOpened(true);
                }}
                className="w-full h-14 text-lg bg-gradient-to-r from-gold to-amber-500 hover:from-gold/90 hover:to-amber-500/90"
              >
                <Zap className="mr-2 h-5 w-5" /> Buka Peti!
              </Button>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-display font-bold mb-2">+200 XP!</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Terima kasih telah istiqamah hari ini. Besok akan ada misi baru!
              </p>
              <Button onClick={onClose} variant="outline" className="w-full">
                Tutup
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function DailyQuestsWidget() {
  const { dailyQuests, lastQuestDate, lootboxAvailable, checkAndResetQuests } = useGamificationStore();
  const [showLootbox, setShowLootbox] = useState(false);

  useEffect(() => {
    const today = getWitaDate();
    checkAndResetQuests(today);
  }, [checkAndResetQuests]);

  useEffect(() => {
    if (lootboxAvailable) {
      setShowLootbox(true);
    }
  }, [lootboxAvailable]);

  const completedCount = dailyQuests.filter((q) => q.completed).length;

  return (
    <>
      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-gold" /> Misi Harian
          </h3>
          <span className="text-sm text-muted-foreground">
            {completedCount}/{dailyQuests.length} selesai
          </span>
        </div>

        <div className="space-y-3">
          {dailyQuests.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Memuat misi...
            </p>
          ) : (
            dailyQuests.map((quest) => <QuestCard key={quest.id} quest={quest} />)
          )}
        </div>

        {lootboxAvailable && (
          <Button
            onClick={() => setShowLootbox(true)}
            className="w-full mt-4 h-12 bg-gradient-to-r from-gold to-amber-500 hover:from-gold/90 hover:to-amber-500/90"
          >
            🎁 Buka Peti Harta Karun!
          </Button>
        )}
      </div>

      <LootboxModal isOpen={showLootbox} onClose={() => setShowLootbox(false)} />
    </>
  );
}
