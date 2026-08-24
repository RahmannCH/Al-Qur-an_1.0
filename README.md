# Zadify: The Comprehensive Digital Al-Qur'an Provision for Muslims

Islamic Super-App Modern dan Quran Reader Pro berbasis Next.js 16 (Turbopack) dengan Tajweed Berwarna, Kompas Kiblat 3D, Murottal per Ayat, Gamifikasi Zad Points (ZP), dan Asisten AI Zad Mentor.

Live Demo: https://al-quran-1-0.vercel.app/ atau https://zadify.vercel.app/

---

## Fitur Utama Zadify

### 1. Quran Reader Pro dan Murottal per Ayat
* Tajweed Berwarna: Pewarnaan visual otomatis 7 hukum tajwid resmi (Qalqalah, Ghunnah, Mad, Ikhfa, Iqlab, Idgham).
* Transliterasi Latin: Ejaan latin cara membaca ayat lengkap dengan tombol toggle cepat.
* Murottal Per-Ayat dan Auto-Scroll: Putar audio Syekh Mishari Rasyid per ayat dengan pergeseran layar otomatis mengikuti ayat yang sedang dibaca.
* Dynamic Island Audio Player: Mode audio minimalis melayang di atas layar.
* Share Ayat as Image: Ekspor kartu ayat resolusi tinggi PNG (Native Canvas 2D) bebas error.

### 2. Jadwal Sholat dan Kompas Kiblat 3D
* Kompas Kiblat 3D: Sensor giroskop perangkat untuk mendeteksi arah Ka'bah waktu nyata.
* Waktu Sholat dan Momen: Imsak, Subuh, Syuruq, Dhuha, Dzuhur, Ashar, Maghrib, Isya, dan Qiyamul Lail (Tengah Malam).
* Kalibrasi Lokasi: Deteksi GPS otomatis atau pilih 25+ kota besar Indonesia secara manual tanpa izin lokasi.

### 3. Kalender Hijriyah dan 18 Hari Besar Islam
* Tear-Off Calendar: Penanggalan Hijriyah akurat (Rabi'ul Awwal 1448 H) dengan ejaan bahasa Indonesia.
* 3D Flip Card Hari Besar: Kotak 18 hari besar Islam sepanjang tahun yang dapat dibalik untuk membaca sejarah dan saran amalan sunnah.

### 4. Learn Academy (Jalur Belajar Mualaf dan Pemula)
* 9 Modul Bertahap: Dari Rukun Iman hingga Fikih Jual Beli.
* 3 Sesi Kelas Virtual: Membaca/Menonton Video Youtube ter-embed -> Uji Pemahaman (Kuis minimal skor 70% untuk melaju) -> Layar Kelulusan (+50 ZP).

### 5. Haji dan Umroh Savings Planner
* Kalkulator Biaya: Proyeksi inflasi masa depan, estimasi potongan gaji, dan tanggal keberangkatan.
* Savings Streak dan History: Catatan menabung harian, checklist 8 tahap haji, dan doa-doa ibadah.

### 6. Gamifikasi dan Dunia Anak
* Zad Points (ZP) dan 15 Badges: Dapatkan ZP dari tilawah, sholat, dzikir, dan kuis.
* Tasbih Digital Cincin 3D: 7 pilihan lantunan dzikir ber-haptic dengan auto-reset ke 0 saat target tercapai.
* Dunia Anak dan Parenting: 15 Kisah Nabi lengkap, Edukasi Fitrah Syariat (Pencegahan LGBTQ), dan Dashboard Orang Tua.
* 6 Arcade Games: Trivia Islami (Duolingo-style), Wordle Arab (Harf-le), Tebak Ayat, Sambung Ayat, Tajwid Ninja, dan Memory Match.

### 7. Zad Mentor AI Companion
* Floating Chat Bubble: Asisten pintar melayang di pojok layar yang bisa dibuka tanpa meninggalkan bacaan Al-Qur'an.

---

## Teknologi yang Digunakan

* Core: Next.js 16.3 (Turbopack), React 19, TypeScript 5
* Styling dan UI: Tailwind CSS v4, shadcn/ui, Lucide Icons, Amiri dan Plus Jakarta Sans
* State Management: Zustand v5 (Persist Storage)
* AI Engine: Google Gemini API (gemini-3.5-flash)
* Audio: Web Audio API Sintetis dan Quran.com Audio CDN

---

## Panduan Instalasi Lokal

```bash
# 1. Clone repository
git clone https://github.com/RahmannCH/Al-Qur-an_1.0.git

# 2. Masuk ke folder projek
cd Al-Qur-an_1.0

# 3. Install dependencies
npm install

# 4. Setup file .env.local
GEMINI_API_KEY=kunci_api_gemini_anda

# 5. Jalankan server lokal
npm run dev
```

Buka http://localhost:3000 di browser.

---

## Lisensi dan Pengembang

Dikembangkan oleh Rahman CH di bawah lisensi MIT License.
