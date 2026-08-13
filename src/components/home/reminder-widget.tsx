"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Clock, Plus, Trash2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReminderStore, Reminder } from "@/store/reminder-store";
import { sfx } from "@/lib/sfx";

export function ReminderWidget() {
  const { reminders, addReminder, toggleReminder, deleteReminder } = useReminderStore();
  const [mounted, setMounted] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newTime, setNewTime] = useState("08:00");
  const [newType, setNewType] = useState<Reminder["type"]>("custom");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAdd = () => {
    if (!newTitle.trim()) return;

    addReminder({
      type: newType,
      title: newTitle,
      message: newMessage || newTitle,
      time: newTime,
      enabled: true,
    });

    setNewTitle("");
    setNewMessage("");
    setShowAdd(false);
    sfx.playSuccess();
  };

  const requestPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        sfx.playSuccess();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg">Pengingat Harian</h3>
            <p className="text-xs text-muted-foreground">Kelola pengingat ibadah & tabungan</p>
          </div>
        </div>

        <Button
          onClick={() => setShowAdd(!showAdd)}
          size="sm"
          className="rounded-xl gap-2"
        >
          <Plus className="h-4 w-4" /> Tambah
        </Button>
      </div>

      {mounted && "Notification" in window && Notification.permission !== "granted" && (
        <div className="mb-6 p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-700 font-medium">
              Aktifkan notifikasi browser untuk menerima pengingat harian
            </p>
          </div>
          <Button
            onClick={requestPermission}
            size="sm"
            variant="outline"
            className="shrink-0 rounded-xl text-xs"
          >
            Aktifkan
          </Button>
        </div>
      )}

      {showAdd && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 border rounded-2xl bg-muted/30 space-y-3"
        >
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Judul Pengingat</label>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Contoh: Nabung Haji"
              className="h-10 rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Pesan</label>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Pesan motivasi..."
              className="h-10 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-muted-foreground mb-1 block">Waktu</label>
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground mb-1 block">Kategori</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as Reminder["type"])}
                className="w-full h-10 rounded-xl border bg-background px-3 text-sm font-medium"
              >
                <option value="savings">💰 Tabungan</option>
                <option value="prayer">🕌 Sholat</option>
                <option value="reading">📖 Membaca</option>
                <option value="custom">🔔 Kustom</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              onClick={() => setShowAdd(false)}
              variant="outline"
              size="sm"
              className="rounded-xl"
            >
              Batal
            </Button>
            <Button onClick={handleAdd} size="sm" className="rounded-xl">
              Simpan
            </Button>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {reminders.map((reminder) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
              reminder.enabled ? "bg-card border-primary/20" : "bg-muted/30 opacity-60"
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  toggleReminder(reminder.id);
                  sfx.playTap();
                }}
                className={`p-2 rounded-xl transition-colors ${
                  reminder.enabled ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {reminder.enabled ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              </button>

              <div>
                <p className="font-bold text-sm">{reminder.title}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {reminder.time} &middot; {reminder.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                deleteReminder(reminder.id);
                sfx.playTap();
              }}
              className="p-2 text-muted-foreground hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
