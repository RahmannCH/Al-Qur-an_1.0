import React from "react";

// Palet warna hukum tajwid standar Mushaf Tajwid Internasional
const TAJWEED_COLOR_MAP: Record<string, { color: string; label: string; desc: string }> = {
  // Qalqalah (Pantulan) - Merah
  qalaqalah: { color: "text-red-500 font-bold", label: "Qalqalah", desc: "Pantulan bunyi pada huruf (ق، ط، ب، ج، د)" },
  
  // Ghunnah & Idgham Bighunnah (Dengung) - Hijau Emerald
  ghunnah: { color: "text-emerald-500 font-bold", label: "Ghunnah", desc: "Dengung ditahan 2 harakat pada Nun/Mim bertasydid" },
  idgham_with_ghunnah: { color: "text-emerald-500 font-bold", label: "Idgham Bighunnah", desc: "Melebur disertai dengung 2 harakat" },
  idgham_shafawi: { color: "text-emerald-600 font-bold", label: "Idgham Syafawi", desc: "Mim mati bertemu Mim dengan dengung" },
  idgham_mutajanisayn: { color: "text-emerald-600 font-bold", label: "Idgham Mutajanisain", desc: "Peleburan dua huruf sejenis" },
  idgham_mutaqaribayn: { color: "text-emerald-600 font-bold", label: "Idgham Mutaqaribain", desc: "Peleburan dua huruf berdekatan makhraj" },

  // Idgham Bilaghunnah (Peleburan tanpa dengung) - Amber / Oranye
  idgham_without_ghunnah: { color: "text-amber-500 font-bold", label: "Idgham Bilaghunnah", desc: "Melebur langsung tanpa dengung pada huruf Lam (ل) dan Ra (ر)" },

  // Ikhfa (Samar) - Teal / Cyan
  ikhfa: { color: "text-teal-400 font-bold", label: "Ikhfa Haqiqi", desc: "Membaca nun mati/tanwin secara samar antara izhar dan idgham" },
  ikhfa_shafawi: { color: "text-teal-500 font-bold", label: "Ikhfa Syafawi", desc: "Mim mati bertemu Ba dibaca samar di bibir dengan dengung" },

  // Iqlab (Mengubah bunyi jadi Mim) - Ungu / Purple
  iqlab: { color: "text-purple-400 font-bold", label: "Iqlab", desc: "Mengubah bunyi nun mati/tanwin menjadi Mim saat bertemu Ba (ب)" },

  // Mad / Panjang - Biru
  madda_necessary: { color: "text-blue-500 font-bold", label: "Mad Lazim", desc: "Wajib dipanjangkan 6 harakat" },
  madda_obligatory: { color: "text-blue-400 font-bold", label: "Mad Wajib Muttashil", desc: "Wajib dipanjangkan 4-5 harakat" },
  madda_permissible: { color: "text-blue-400 font-bold", label: "Mad Jaiz Munfashil", desc: "Boleh dipanjangkan 2, 4, atau 5 harakat" },
  madda_normal: { color: "text-sky-400 font-medium", label: "Mad Thabi'i", desc: "Panjang 2 harakat standar" },

  // Alif Lam & Hamzah Wasl - Abu-abu Lembut (Silent/Connect)
  ham_wasl: { color: "text-muted-foreground/60 font-normal", label: "Hamzah Washal", desc: "Hanya dibaca saat memulai, lebur saat washal" },
  laam_shamsiyah: { color: "text-muted-foreground/60 font-normal", label: "Alif Lam Syamsiyah", desc: "Huruf Lam tidak dibaca, langsung melebur ke huruf berikutnya" },
  silent: { color: "text-muted-foreground/40 font-normal", label: "Huruf Tidak Dibaca", desc: "Tertulis dalam mushaf namun tidak dilafalkan" },
};

export const TAJWEED_LEGEND = [
  { class: "qalaqalah", name: "Qalqalah (Memantul)", color: "text-red-500", desc: "Pantulan pada huruf (ق، ط، ب، ج، د) sukun" },
  { class: "ghunnah", name: "Ghunnah & Idgham Bighunnah", color: "text-emerald-500", desc: "Dengung 2 harakat pada Nun/Mim bertasydid & huruf (ي، ن، م، و)" },
  { class: "ikhfa", name: "Ikhfa (Samar)", color: "text-teal-400", desc: "Samar-samar berdengung pada 15 huruf ikhfa" },
  { class: "iqlab", name: "Iqlab (Menjadi Mim)", color: "text-purple-400", desc: "Bunyi nun/tanwin berubah menjadi Mim saat bertemu Ba (ب)" },
  { class: "madda_obligatory", name: "Mad Wajib / Jaiz (Panjang)", color: "text-blue-400", desc: "Dipanjangkan 4-5 harakat (Mad Wajib/Jaiz/Lazim)" },
  { class: "idgham_without_ghunnah", name: "Idgham Bilaghunnah", color: "text-amber-500", desc: "Melebur tanpa dengung pada huruf Lam (ل) dan Ra (ر)" },
  { class: "laam_shamsiyah", name: "Hamzah Washal & Syamsiyah", color: "text-muted-foreground/60", desc: "Huruf pengikat yang tidak dilafalkan saat bersambung" },
];

export function parseTajweed(html: string): React.ReactNode[] {
  if (!html) return [];

  // Regex fleksibel yang mendukung class bertanda kutip maupun tanpa tanda kutip dari API Quran.com
  const regex = /<tajweed\s+class=["']?([^"'\s>]+)["']?[^>]*>([\s\S]*?)<\/tajweed>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const parts: React.ReactNode[] = [];
  let partKey = 0;

  while ((match = regex.exec(html)) !== null) {
    // Teks biasa sebelum tag tajweed
    if (match.index > lastIndex) {
      const rawSlice = html.slice(lastIndex, match.index);
      parts.push(
        <span key={`text-${partKey++}`} dangerouslySetInnerHTML={{ __html: rawSlice }} />
      );
    }

    const tajweedClass = match[1];
    const innerHtml = match[2];
    const mapping = TAJWEED_COLOR_MAP[tajweedClass];
    const colorClass = mapping ? mapping.color : "text-foreground";
    const label = mapping ? mapping.label : tajweedClass;

    parts.push(
      <span
        key={`tajweed-${partKey++}`}
        className={`${colorClass} transition-colors duration-200`}
        title={label}
      >
        <span dangerouslySetInnerHTML={{ __html: innerHtml }} />
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  // Sisa teks setelah tag tajweed terakhir
  if (lastIndex < html.length) {
    const remaining = html.slice(lastIndex);
    parts.push(
      <span key={`text-${partKey++}`} dangerouslySetInnerHTML={{ __html: remaining }} />
    );
  }

  return parts.length > 0 ? parts : [<span key="raw" dangerouslySetInnerHTML={{ __html: html }} />];
}

export function getTajweedLegend() {
  return TAJWEED_LEGEND;
}
