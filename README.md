# 📖 Al-Qur'an Digital 1.0

Aplikasi web Al-Qur'an Digital & Islamic Super-App modern yang dirancang dengan performa instan, visual interaktif 3D, serta gamifikasi ibadah harian. Dibangun menggunakan Next.js 16 (Turbopack) untuk kompetisi dengan standar industri profesional.

🚀 **Live Demo:** [https://al-quran-1-0.vercel.app/](https://al-quran-1-0.vercel.app/)

---

## ✨ Fitur Unggulan & Interaktif

### 1. 📖 Quran Reader Pro & Murottal Ayat-per-Ayat
*   **Tajweed Berwarna (Color-Coded):** Pewarnaan otomatis teks Uthmani secara visual (Madd, Qalqalah, Ghunnah, dll.) sesuai kaidah tajwid resmi.
*   **Panduan Legenda Tajwid:** Laci info detail makna warna tajwid dilengkapi klip audio contoh pengucapan.
*   **Play per Ayat & Auto-Scroll:** Klik putar dari ayat mana saja, audio MP3 dari Syekh Mishari Rasyid terputar instan, dan pembacaan otomatis bergeser (*scroll*) mengikuti jalannya bacaan.
*   **Dynamic Island Audio Player:** Audio player yang dapat di-minimize menjadi kapsul melayang dinamis di bagian atas layar desktop maupun mobile.
*   **Share Ayat as Image:** Ekspor ayat pilihan menjadi gambar PNG gradien resolusi tinggi dengan watermark "Linux 25" yang siap di-download atau disalin ke clipboard (bebas dari error parser CSS oklab).

### 2. 🕌 Jadwal Sholat & Kompas Kiblat 3D
*   **Kompas Kiblat Interaktif:** Gyroscope & DeviceOrientation API mendeteksi arah Ka'bah secara 3D waktu nyata dengan visual kompas berputar dinamis.
*   **Waktu Sholat Akurat:** Deteksi koordinat GPS otomatis dengan countdown sholat berikutnya.

### 3. 🗓️ Kalender Hijriyah & Event Tracker
*   **Tear-Off Calendar:** Tampilan visual kalender sobek estetik di beranda dengan translasi ejaan nama bulan Hijriyah bahasa Indonesia.
*   **Event Slider:** Navigasi tombol (Prev/Next) untuk melihat 10 hari besar Islam tahun ini.

### 4. 🎓 Learn Academy (Sequential Roadmap)
*   **Jalur Belajar Mualaf:** 9 modul belajar interaktif dari Rukun Islam hingga Fikih Jual Beli.
*   **3 Sesi Kelas Virtual:** Membaca/Menonton Video Youtube ter-embed -> Uji Pemahaman (Kuis minimal skor 70% untuk melaju) -> Layar Kelulusan (+50 XP & selebrasi).

### 5. 💰 Haji & Umroh Savings Planner
*   **Kalkulator Inflasi:** Menghitung perkiraan biaya masa depan, target bulanan/harian, dan potongan gaji.
*   **Savings Tracker & Streak:** Mengelola catatan tabungan harian, riwayat setoran, serta streak konsistensi menabung.
*   **Doa & Panduan:** Checklist 8 langkah wajib ibadah haji terintegrasi doa-doa maknawi.

### 6. 🕹️ Gamification, Quests & Parent Dashboard
*   **Leveling System:** Dapatkan XP dari membaca Qur'an, dzikir (cincin tasbih ber-haptic), sholat, dan kuis.
*   **Daily Quests & Lootbox:** Jalankan 3 quest harian sholat, dzikir, dan membaca untuk membuka peti harian (Lootbox).
*   **Parent Dashboard:** Halaman pantau progres ibadah anak, lencana (Badges) yang diraih, dan grafik aktivitas.

### 7. 🤖 Omnipresent AI Chat Companion
*   **Floating Chat Bubble:** Asisten AI yang selalu melayang di kanan bawah layar. Dapat di-klik untuk membuka obrolan interaktif tanpa perlu berpindah dari halaman bacaan Anda.

---

## 🛠️ Tech Stack & Dependencies

*   **Core:** Next.js 16.3.0 (Turbopack), React 19.2.8, TypeScript 5
*   **Design System:** Tailwind CSS v4, shadcn/ui, Lucide Icons, Amiri & Plus Jakarta Sans Font
*   **State & Client Storage:** Zustand v5 (Persist middleware)
*   **Animation & Graphics:** Framer Motion v12, Html2canvas v1.4.1
*   **AI Engine:** Google Gemini SDK (`gemini-3.5-flash`)
*   **PWA:** Service Worker (Offline Cache API), Web App Manifest

---

## 🚀 Instalasi & Menjalankan Lokal

```bash
# 1. Masuk ke direktori projek
cd "C:\Users\LENOVO\OneDrive\Documents\Programming\Al-Qur'an_1.0"

# 2. Install dependencies
npm install

# 3. Konfigurasi Environment API Key
# Buat file .env.local di root folder dan tambahkan kunci Gemini Anda:
GEMINI_API_KEY=kunci_gemini_anda_disini

# 4. Jalankan Server Development (Next.js Turbopack)
npm run dev

# 5. Build untuk Produksi
npm run build
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

---

## 📁 Struktur Direktori Utama

```
Al-Qur'an_1.0/
├── public/                 # Service Worker (sw.js), Manifest PWA, Ikon PWA
├── src/
│   ├── app/                # Halaman Utama, Dynamic Routes, API chat Gemini
│   ├── components/
│   │   ├── home/           # Widget Bento, Asmaul Husna, Murottal, Onboarding
│   │   ├── layout/         # Header, Bottom Nav, Floating AI Chat, SW Registry
│   │   ├── quran/          # AyahList, AyahCard, TajweedText, Share Modal
│   │   ├── prayer/         # PrayerStreak, Qibla Compass
│   │   └── ui/             # Shadcn primitives
│   ├── store/              # Zustand global state (XP, Haji, Belajar, Reminder, Sholat)
│   ├── data/               # Data statis (99 Asmaul Husna, Soal Kuis, 25 Doa)
│   ├── lib/                # Audio SFX sintetis, Tajweed parser, Wita time sensor
│   ├── hooks/              # Custom React hooks (Time Theme)
│   └── types/              # Deklarasi tipe data TypeScript (Qur'an & Prayer)
```
