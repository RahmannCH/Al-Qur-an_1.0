# Al-Qur'an Digital 1.0 - Project Overview

## 🎯 Vision
Membangun aplikasi Al-Qur'an digital yang modern, interaktif, dan komprehensif dengan fitur pembelajaran Islami yang mendalam. Aplikasi ini dirancang untuk kompetisi dengan standar professional, menggabungkan teknologi terkini dengan nilai-nilai Islami.

## 📊 Key Metrics
- **Platform:** Web (Next.js)
- **Languages:** Indonesia + English (future)
- **Target Users:** Muslim yang ingin belajar Al-Qur'an dengan cara modern
- **Performance:** Lighthouse 90+, TTFB < 1s
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile:** Responsive, bottom navigation, PWA ready

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16.3 (App Router)
- **React:** 19.2.8
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animations:** Framer Motion v12.43
- **State Management:** Zustand v5
- **Icons:** Lucide React v1.28
- **Theme:** next-themes v0.4.6
- **Utilities:** TypeScript, clsx, class-variance-authority

### APIs & Services
- **Quran Data:** Quran.com API v4 (chapters, verses, translations, tafsir, search)
- **Prayer Times:** Al-Adhan API (aladhan.com)
- **AI Chat:** Google Gemini API (via @google/generative-ai)
- **Image Generation:** html2canvas v1.4.1

### Storage & Persistence
- **localStorage:** Bookmark, last read, settings, streaks, prayer tracker
- **IndexedDB:** (future) Offline mode, large data caching

### Deployment
- **Hosting:** Vercel (recommended)
- **CI/CD:** GitHub Actions (optional)
- **Environment:** Node.js 18+, npm/yarn

## 📁 Directory Structure

```
Al-Qur'an_1.0/
├── .opencode/
│   └── plans/
│       ├── PROJECT_OVERVIEW.md (this file)
│       ├── FEATURES.md
│       ├── ARCHITECTURE.md
│       ├── API_REFERENCE.md
│       ├── DEVELOPMENT_GUIDE.md
│       ├── ROADMAP.md
│       └── AGENTS.md
├── src/
│   ├── app/
│   │   ├── (pages & routes)
│   │   ├── api/
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   ├── quran/
│   │   ├── prayer/
│   │   ├── dua/
│   │   ├── home/
│   │   └── ui/
│   ├── lib/
│   │   ├── api.ts (Quran.com)
│   │   ├── prayer-api.ts (Aladhan)
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── hooks/
│   ├── store/
│   ├── types/
│   ├── data/
│   │   └── dua-basic.json
│   └── styles/
├── public/
├── .env.local (API keys)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.ts
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary:** `#1E3A5F` (Deep Blue)
- **Primary Light:** `#4A90D9`
- **Primary Background:** `#E8F0FE`
- **Gold:** `#D4A847`
- **Teal:** `#2A9D8F`
- **Emerald:** `#1B7A5A`
- **Background:** `#FAF7F2` (Cream)
- **Dark BG:** `#0D1117`

### Typography
- **Body Font:** Inter
- **Display Font:** Plus Jakarta Sans
- **Arabic Font:** Amiri (Naskh style)
- **Mono Font:** Geist Mono

### Responsive Breakpoints
- Mobile: `< 640px` (Bottom nav)
- Tablet: `640px - 1024px` (Sidebar optional)
- Desktop: `> 1024px` (Full layout)

## 📊 Project Status

### ✅ Completed
- [x] Design system (colors, fonts, animations)
- [x] Project structure & folder setup
- [x] Home dashboard (Daily Ayat, Progress, Quick Actions)
- [x] Surah listing & detail pages
- [x] Prayer times integration (Aladhan API)
- [x] Prayer streak tracker
- [x] Doa collection (25 duas)
- [x] AI Chat (Gemini)
- [x] Search functionality
- [x] Bookmarks page
- [x] Settings page
- [x] Bottom navigation (mobile)
- [x] Dark/Light theme
- [x] Bookmark & last read persistence

### ❌ Pending
- [ ] Audio player (sticky bottom)
- [ ] Qibla compass
- [ ] Tafsir integration & modal
- [ ] Reading plan & Khatam tracker
- [ ] Share ayat as image
- [ ] Dzikir counter
- [ ] PWA offline mode
- [ ] Word-by-word translation
- [ ] Statistics & achievements
- [ ] Night mode auto-switch
- [ ] Hijri calendar widget
- [ ] Browser notifications
- [ ] Error handling improvements

## 🚀 How to Start

```bash
cd "C:\Users\LENOVO\OneDrive\Documents\Programming\Al-Qur'an_1.0"
npm run dev
# Open http://localhost:3000
```

## 📝 Next Steps

1. **Fix P0 Bugs:** Prayer API error, Chat error
2. **Add Back Button:** All pages
3. **Implement Audio Player:** Week 1
4. **Add Tafsir:** Week 1
5. **PWA Setup:** Week 2
6. **Final Polish:** Week 3

---

**Last Updated:** 2026-08-05
**Version:** 1.0.0-beta
**Lead:** Kiro AI Assistant