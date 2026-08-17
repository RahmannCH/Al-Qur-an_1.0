"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Search, Check, RefreshCw, Loader2 } from "lucide-react";
import { usePrayerStore } from "@/store/prayer-store";
import { sfx } from "@/lib/sfx";

// Daftar kota besar Indonesia dengan koordinat akurat
const INDONESIAN_CITIES = [
  { name: "Jakarta (DKI Jakarta)", lat: -6.2088, lng: 106.8456 },
  { name: "Surabaya (Jawa Timur)", lat: -7.2575, lng: 112.7521 },
  { name: "Bandung (Jawa Barat)", lat: -6.9175, lng: 107.6191 },
  { name: "Medan (Sumatera Utara)", lat: 3.5952, lng: 98.6722 },
  { name: "Makassar (Sulawesi Selatan)", lat: -5.1477, lng: 119.4327 },
  { name: "Semarang (Jawa Tengah)", lat: -6.9667, lng: 110.4167 },
  { name: "Yogyakarta (DIY)", lat: -7.7956, lng: 110.3695 },
  { name: "Banjarmasin (Kalimantan Selatan)", lat: -3.3194, lng: 114.5908 },
  { name: "Banjarbaru (Kalimantan Selatan)", lat: -3.4472, lng: 114.8405 },
  { name: "Banda Aceh (Aceh)", lat: 5.5483, lng: 95.3238 },
  { name: "Padang (Sumatera Barat)", lat: -0.9471, lng: 100.4172 },
  { name: "Palembang (Sumatera Selatan)", lat: -2.9761, lng: 104.7754 },
  { name: "Pekanbaru (Riau)", lat: 0.5071, lng: 101.4478 },
  { name: "Balikpapan (Kalimantan Timur)", lat: -1.2379, lng: 116.8529 },
  { name: "Samarinda (Kalimantan Timur)", lat: -0.5022, lng: 117.1536 },
  { name: "Pontianak (Kalimantan Barat)", lat: -0.0263, lng: 109.3425 },
  { name: "Denpasar (Bali)", lat: -8.6705, lng: 115.2126 },
  { name: "Mataram (Lombok / NTB)", lat: -8.5833, lng: 116.1167 },
  { name: "Kupang (NTT)", lat: -10.1772, lng: 123.6070 },
  { name: "Manado (Sulawesi Utara)", lat: 1.4748, lng: 124.8428 },
  { name: "Ambon (Maluku)", lat: -3.6547, lng: 128.1906 },
  { name: "Jayapura (Papua)", lat: -2.5916, lng: 140.6690 },
  { name: "Sorong (Papua Barat)", lat: -0.8762, lng: 131.2558 },
  { name: "Malang (Jawa Timur)", lat: -7.9666, lng: 112.6326 },
  { name: "Surakarta / Solo (Jawa Tengah)", lat: -7.5755, lng: 110.8243 },
];

export function LocationModal() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSyncingGps, setIsSyncingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const { locationName, setManualLocation, forceSyncLocation } = usePrayerStore();

  const filteredCities = INDONESIAN_CITIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCity = async (city: typeof INDONESIAN_CITIES[0]) => {
    sfx.playSuccess();
    await setManualLocation(city.name, city.lat, city.lng);
    setOpen(false);
  };

  const handleGpsSync = async () => {
    setIsSyncingGps(true);
    setGpsError(null);
    sfx.playTap();

    const success = await forceSyncLocation();
    setIsSyncingGps(false);

    if (success) {
      sfx.playSuccess();
      setOpen(false);
    } else {
      setGpsError("Izin GPS ditolak atau tidak tersedia. Anda bisa memilih kota dari daftar di bawah.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => sfx.playTap()}
        className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg border border-primary/20 transition-all outline-none"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        <span>Ganti / Kalibrasi Lokasi</span>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[85vh] flex flex-col p-6 rounded-3xl">
        <DialogHeader className="text-left pb-2 border-b">
          <DialogTitle className="font-display text-xl font-bold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" /> Pengaturan Lokasi Sholat
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Lokasi aktif: <span className="font-bold text-foreground">{locationName}</span>
          </p>
        </DialogHeader>

        {/* Tombol GPS Otomatis */}
        <div className="pt-2">
          <Button
            onClick={handleGpsSync}
            disabled={isSyncingGps}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary to-teal text-white font-bold flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-transform"
          >
            {isSyncingGps ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Navigation className="h-5 w-5" />
            )}
            <span>{isSyncingGps ? "Mendeteksi Koordinat..." : "Gunakan GPS Otomatis"}</span>
          </Button>

          {gpsError && (
            <p className="text-[11px] text-rose-500 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900 mt-2 font-medium">
              {gpsError}
            </p>
          )}
        </div>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-muted-foreground font-bold text-[10px]">
              Atau Pilih Wilayah Manual
            </span>
          </div>
        </div>

        {/* Search Box */}
        <div className="relative mb-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Ketik nama kota/provinsi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 rounded-xl text-xs"
          />
        </div>

        {/* List Kota */}
        <div className="overflow-y-auto space-y-1.5 flex-1 pr-1 max-h-[260px]">
          {filteredCities.length === 0 ? (
            <p className="text-xs text-center py-6 text-muted-foreground">Kota tidak ditemukan</p>
          ) : (
            filteredCities.map((city) => {
              const isSelected = locationName.toLowerCase().includes(city.name.split(" ")[0].toLowerCase());

              return (
                <button
                  key={city.name}
                  onClick={() => handleSelectCity(city)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all text-xs font-semibold ${
                    isSelected
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background hover:bg-muted border-border/60 hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 opacity-60 shrink-0" />
                    <span className="truncate">{city.name}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
