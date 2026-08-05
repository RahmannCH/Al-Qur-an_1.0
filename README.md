# 📖 Al-Qur'an Digital 1.0

Aplikasi Al-Qur'an digital modern dengan fitur pembelajaran Islami yang komprehensif. Dibangun untuk kompetisi dengan standar professional.

## ✨ Fitur Utama

- **📖 Baca Al-Qur'an** - Teks Arab Uthmani + terjemahan Indonesia
- **📅 Jadwal Sholat** - 5 waktu + countdown ke sholat berikutnya
- **🙏 Tracker Streak** - Checklist 5 sholat per hari dengan streak counter
- **🤲 Koleksi Doa** - 25+ doa sehari-hari dengan transliterasi
- **🤖 AI Chat Islami** - Tanya jawab dengan Gemini AI
- **🔍 Cari Ayat** - Search teks Arab & terjemahan
- **📌 Bookmark** - Simpan ayat favorit
- **⚙️ Pengaturan** - Custom font size, tema, qari default
- **📱 Bottom Navigation** - Mobile-first design

## 🛠️ Tech Stack

- **Framework:** Next.js 16.3 (App Router)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animations:** Framer Motion v12
- **State:** Zustand v5
- **Icons:** Lucide React
- **APIs:** Quran.com, Aladhan, Google Gemini

## 🚀 Quick Start

```bash
# Clone atau navigate ke folder
cd "C:\Users\LENOVO\OneDrive\Documents\Programming\Al-Qur'an_1.0"

# Install dependencies
npm install

# Setup environment (untuk AI Chat)
# Buat file .env.local dengan:
GEMINI_API_KEY=

# Jalankan dev server
npm run dev
```

Buka http://localhost:3000

## 📁 Struktur Folder

```
src/
├── app/              # Pages & routes
│   ├── api/          # API routes (Gemini chat)
│   └── (routes)
├── components/       # React components
│   ├── layout/
│   ├── quran/
│   ├── prayer/
│   ├── dua/
│   ├── home/
│   └── ui/
├── lib/              # Utilities & API wrappers
├── store/            # Zustand stores
├── types/            # TypeScript types
└── data/             # JSON data
```

## 📖 Dokumentasi Lengkap

Lihat folder `.opencode/plans/` untuk dokumentasi lengkap:
- `PROJECT_OVERVIEW.md` - Vision & overview
- `FEATURES.md` - Semua fitur (completed & pending)
- `ARCHITECTURE.md` - System design & data flow
- `API_REFERENCE.md` - Semua API used
- `DEVELOPMENT_GUIDE.md` - How to develop
- `ROADMAP.md` - Timeline & priorities
- `AGENTS.md` - AI instructions

## 🎨 Design System

- **Primary:** `#1E3A5F` (Deep Blue)
- **Gold:** `#D4A847`
- **Teal:** `#2A9D8F`
- **Arabic Font:** Amiri
- **Body Font:** Inter

## 🐛 Known Issues

- **Prayer API Error** - `Cannot read properties of undefined (reading 'Fajr')`
- **Chat Bot Error** - Error handling perlu improve
- **Back Button** - Belum ada di semua halaman

Lihat `ROADMAP.md` untuk fix plan.

## 📝 Future Features

Lihat `ROADMAP.md`:
- Audio Player (sticky bottom)
- Qibla Compass
- Tafsir Integration
- Reading Plan & Khatam Tracker
- Share Ayat as Image
- PWA Offline Mode
- Statistics & Achievements

## 🚀 Deployment

### Build Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License

---

**Version:** 1.0.0-beta  
**Last Updated:** 2026-08-04  
**Lead:** Kiro AI Assistant