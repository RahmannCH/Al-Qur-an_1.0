"use client";

import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/settings-store";
import { useTheme } from "next-themes";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "@/components/layout/back-button";
import { Settings, Sun, Moon, Trash2 } from "lucide-react";
import { RECITERS } from "@/lib/constants";
import { ReminderWidget } from "@/components/home/reminder-widget";

export default function SettingsPage() {
  const { fontSize, setFontSize, reciterId, setReciterId, showTranslation, setShowTranslation } = useSettingsStore();
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <BackButton />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-display font-bold">Pengaturan</h1>
        </div>
        <p className="text-muted-foreground">Kustomisasi pengalaman membaca Al-Qur&apos;an</p>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border bg-card p-6"
        >
          <h2 className="font-display font-semibold mb-4">Tampilan</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-3 block">Tema</label>
              <div className="flex gap-3">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="flex-1"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Terang
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="flex-1"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Gelap
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Ukuran Font Arab</label>
                <span className="text-sm text-muted-foreground">{fontSize}px</span>
              </div>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(Array.isArray(value) ? value[0] : value)}
                min={20}
                max={48}
                step={2}
                className="w-full"
              />
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-arabic text-right" dir="rtl" style={{ fontSize: `${fontSize}px` }}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border bg-card p-6"
        >
          <h2 className="font-display font-semibold mb-4">Teks & Terjemahan</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tampilkan Terjemahan</p>
                <p className="text-sm text-muted-foreground">Tampilkan terjemahan di bawah ayat</p>
              </div>
              <Button
                variant={showTranslation ? "default" : "outline"}
                onClick={() => setShowTranslation(!showTranslation)}
              >
                {showTranslation ? "Aktif" : "Nonaktif"}
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border bg-card p-6"
        >
          <h2 className="font-display font-semibold mb-4">Audio</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-3 block">Qari Default</label>
              <div className="grid gap-2 sm:grid-cols-2">
                {RECITERS.map((reciter) => (
                  <Button
                    key={reciter.id}
                    variant={reciterId === reciter.id ? "default" : "outline"}
                    onClick={() => setReciterId(reciter.id)}
                    className="justify-start"
                  >
                    {reciter.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <ReminderWidget />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-destructive/20 bg-card p-6"
        >
          <h2 className="font-display font-semibold mb-4 text-destructive">Data & Privasi</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Hapus Semua Data</p>
              <p className="text-sm text-muted-foreground">Hapus bookmark, progress, dan pengaturan</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("Yakin ingin menghapus semua data?")) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
