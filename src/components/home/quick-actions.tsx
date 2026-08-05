"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Heart, MessageCircle, Search, Settings, Trophy, Gamepad2, Activity } from "lucide-react";

const actions = [
  { href: "/prayer-times", icon: Clock, label: "Sholat", color: "from-primary to-primary/80" },
  { href: "/dua", icon: Heart, label: "Doa", color: "from-rose-500 to-rose-400" },
  { href: "/dzikir", icon: Activity, label: "Dzikir", color: "from-teal to-teal/80" },
  { href: "/games", icon: Gamepad2, label: "Arcade", color: "from-blue-500 to-cyan-500" },
  { href: "/chat", icon: MessageCircle, label: "AI Chat", color: "from-emerald to-emerald/80" },
  { href: "/search", icon: Search, label: "Cari", color: "from-purple-500 to-indigo-500" },
  { href: "/achievements", icon: Trophy, label: "Badge", color: "from-gold to-gold/80" },
  { href: "/settings", icon: Settings, label: "Setting", color: "from-muted-foreground to-muted-foreground/80" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export function QuickActions() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="rounded-xl border bg-card p-5"
    >
      <h3 className="font-display font-semibold mb-4">Akses Cepat</h3>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.div key={action.href} variants={item}>
              <Link
                href={action.href}
                className="flex flex-col items-center justify-center p-2 rounded-xl transition-all hover:scale-105 hover:shadow-md bg-accent/30 hover:bg-accent"
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${action.color} mb-2 shadow-sm`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-[10px] font-medium text-center">{action.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
