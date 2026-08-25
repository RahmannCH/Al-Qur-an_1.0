"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Upload, CheckCircle2, AlertCircle } from "lucide-react";

interface CloudSyncModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CloudSyncModal({ open, onOpenChange }: CloudSyncModalProps) {
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleExport = () => {
    try {
      const backupData: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("zadify") || key.startsWith("quran") || key.includes("storage"))) {
          backupData[key] = localStorage.getItem(key);
        }
      }

      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `zadify-backup-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      setStatus({ type: "success", msg: "Backup berhasil diekspor!" });
    } catch {
      setStatus({ type: "error", msg: "Gagal membuat file backup." });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        Object.entries(parsed).forEach(([k, v]) => {
          if (typeof v === "string") {
            localStorage.setItem(k, v);
          }
        });

        setStatus({ type: "success", msg: "Data berhasil diimpor! Muat ulang halaman untuk melihat hasil." });
        setTimeout(() => window.location.reload(), 1500);
      } catch {
        setStatus({ type: "error", msg: "File tidak valid atau rusak." });
      }
    };
    reader.readAsText(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Backup & Sinkronisasi Data</DialogTitle>
          <DialogDescription>
            Ekspor progress ZP, bookmark, catatan tadabbur, dan hafalan Anda ke file JSON atau pulihkan ke perangkat lain.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-4 rounded-2xl border bg-card flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">Ekspor Backup</div>
              <div className="text-xs text-muted-foreground">Unduh snapshot data lokal ke .json</div>
            </div>
            <Button onClick={handleExport} size="sm" className="gap-1.5">
              <Download className="h-4 w-4" />
              Unduh
            </Button>
          </div>

          <div className="p-4 rounded-2xl border bg-card flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">Impor Backup</div>
              <div className="text-xs text-muted-foreground">Pulihkan data dari file .json</div>
            </div>
            <label className="cursor-pointer">
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors">
                <Upload className="h-4 w-4" />
                Pilih File
              </span>
            </label>
          </div>

          {status && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                status.type === "success"
                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-600 border border-rose-500/20"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0" />
              )}
              {status.msg}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
