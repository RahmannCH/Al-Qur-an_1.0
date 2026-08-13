# Al-Qur'an Digital 1.0 - AI Agent Instructions

## 🤖 Purpose of This File

This file contains instructions for AI assistants (like Claude, GPT, Gemini) that work on this project in the future. It ensures consistency, prevents context loss, and maintains architectural integrity.

---

## 📋 Project Context Summary

### What is This Project?
Al-Qur'an Digital 1.0 is a **modern, interactive Al-Qur'an web application** built with Next.js 16. It's designed for a competition with professional standards, combining modern web technologies with Islamic values.

### Tech Stack (DO NOT CHANGE)
- **Framework:** Next.js 16.3 (App Router)
- **React:** 19.2.8
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animations:** Framer Motion v12
- **State:** Zustand v5
- **APIs:** Quran.com v4, Aladhan, Gemini AI

### Design System (STICK TO THIS)
- **Primary Color:** `#1E3A5F` (Deep Blue)
- **Accent:** `#D4A847` (Gold)
- **Teal:** `#2A9D8F`
- **Emerald:** `#1B7A5A`
- **Fonts:** Inter (body), Amiri (Arabic), Plus Jakarta Sans (display)

---

## 🚨 CRITICAL RULES FOR AI AGENTS

### 1. READ BEFORE WRITING
**ALWAYS** read existing files before making changes:
```typescript
// READ these files first:
// - src/app/page.tsx (current home structure)
// - src/lib/api.ts (API patterns)
// - src/store/*.ts (state patterns)
// - .opencode/plans/ARCHITECTURE.md (system design)
```

### 2. FOLDER STRUCTURE
**NEVER** create new top-level folders. Use existing:
```
src/
├── app/           # Pages & routes (ONLY)
├── components/    # React components (ONLY)
│   ├── layout/    # Header, Nav, Footer
│   ├── quran/     # Quran-specific components
│   ├── prayer/    # Prayer-specific components
│   ├── dua/       # Dua-specific components
│   ├── home/      # Home page components
│   └── ui/        # shadcn primitives
├── lib/           # Utilities & API wrappers
├── store/         # Zustand stores
├── types/         # TypeScript interfaces
├── hooks/         # Custom React hooks
└── data/          # JSON data files
```

### 3. API INTEGRATION
**ALWAYS** use existing API wrappers:
```typescript
// ✅ CORRECT
import { getChapters, getVerses, searchQuran } from "@/lib/api";
import { getPrayerTimes } from "@/lib/prayer-api";

// ❌ WRONG - Don't create new fetch calls
const response = await fetch("https://api.quran.com/...");
```

### 4. STATE MANAGEMENT
**USE Zustand stores** for global state:
```typescript
// Existing stores (USE THESE):
// - useBookmarkStore (src/store/bookmark-store.ts)
// - useSettingsStore (src/store/settings-store.ts)
// - usePrayerStore (src/store/prayer-store.ts)
// - useAudioStore (src/store/audio-store.ts)

// ✅ CORRECT
import { useSettingsStore } from "@/store/settings-store";
const fontSize = useSettingsStore((s) => s.fontSize);

// ❌ WRONG - Don't use useState for global state
const [fontSize, setFontSize] = useState(28);
```

### 5. COMPONENT PATTERNS
**FOLLOW** existing component patterns:
```typescript
// ✅ CORRECT - Use Framer Motion
"use client";
import { motion } from "framer-motion";

export function NewComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-6"
    >
      Content
    </motion.div>
  );
}
```

### 6. STYLING
**USE Tailwind CSS + Design System:**
```typescript
// ✅ CORRECT - Use design system colors
<div className="bg-primary text-primary-foreground">
<div className="text-gold bg-teal">
<div className="bg-card border rounded-xl">

// ❌ WRONG - Don't use custom colors
<div style={{ backgroundColor: "#ff0000" }}>
```

### 7. TYPESCRIPT
**MAINTAIN** strict typing:
```typescript
// ✅ CORRECT - Define interfaces
interface Props {
  surahId: number;
  onClose: () => void;
}

export function Component({ surahId, onClose }: Props) {
  // ...
}

// ❌ WRONG - Don't use 'any'
export function Component(props: any) {
  // ...
}
```

---

## 🎯 CURRENT PROJECT STATUS

### ✅ Completed Features
1. **Home Dashboard** - Daily Ayat (terkurasi, deterministik WITA), Progress, Quick Actions, Daily Quests + Lootbox, Reading Plan, Reminder Widget
2. **Surah Reading** - Text, translation, bookmark, last read, infinite scroll, word-by-word
3. **Prayer Times** - 5 waktu, countdown, tracker WITA time-gated, streak, rekap 7 hari, Kompas Kiblat
4. **Doa Collection** - 25 duas, expand/collapse, bookmark
5. **AI Chat** - Gemini (`gemini-3.5-flash`), React Markdown
6. **Search** - Quran search by text
7. **Bookmarks** - List, delete, copy
8. **Settings** - Theme, font size, qari selection, Reminders
9. **Bottom Nav** - 4 tabs (Home, Ibadah, Lifestyle, Arcade) + Sheet menu di header
10. **Dark Mode + Time Theme** - Warna otomatis mengikuti periode sholat WITA
11. **Gamification** - XP/level, quests harian, lootbox, sfx Web Audio, Kuis Interaktif (Trivia)
12. **Murottal Presisi** - Timestamp API + binary search highlight ayat
13. **Hubs** - /ibadah, /lifestyle (Hijri Widget), /ruhiyah (P3K Jiwa), /memorize (Practice Mode), /kids (8 kisah nabi + gender edu + Parent Dashboard), /learn (9 modul, unlock berbasis XP)
14. **Kalkulator** - Haji/Umroh (Full feature), Waris (wasiat ≤1/3), Zakat (harga emas tersinkron)
15. **Onboarding** - Nama + target ayat harian, UserGreeting
16. **PWA** - manifest + ikon + link + Service Worker Offline Cache

### 🔴 Known Bugs / Catatan
1. **Harga emas "live"** masih simulasi statis (Rp 1.450.000); butuh API nyata jika diinginkan.
2. Lokasi kompas kiblat tergantung hardware perangkat, pastikan HTTPS.

### ⏳ Pending Features (Lihat FEATURES.md & ROADMAP.md)
- Polish accessibility dan screen reader
- Image lazy loading & bundle optimization

---

## 📚 KEY FILES REFERENCE

### API Layer
- `src/lib/api.ts` - Quran.com API wrapper
- `src/lib/prayer-api.ts` - Aladhan API + helpers
- `src/lib/constants.ts` - Reciters, translation IDs

### State Management
- `src/store/bookmark-store.ts` - Bookmark state
- `src/store/settings-store.ts` - App settings
- `src/store/prayer-store.ts` - Prayer tracker
- `src/store/audio-store.ts` - Audio player state

### Types
- `src/types/quran.ts` - Chapter, Verse, etc.
- `src/types/prayer.ts` - Prayer times response

### Pages
- `src/app/page.tsx` - Home dashboard
- `src/app/surah/[id]/page.tsx` - Surah detail
- `src/app/prayer-times/page.tsx` - Prayer times
- `src/app/dua/page.tsx` - Doa collection
- `src/app/chat/page.tsx` - AI chat
- `src/app/search/page.tsx` - Search
- `src/app/bookmarks/page.tsx` - Bookmarks
- `src/app/settings/page.tsx` - Settings

---

## 🔧 COMMON TASKS GUIDE

### Task: Add New Feature
1. **READ** `ARCHITECTURE.md` to understand system design
2. **READ** `FEATURES.md` to check if feature exists
3. **READ** existing similar components for patterns
4. **CREATE** component in appropriate folder (components/*)
5. **UPDATE** relevant page to use new component
6. **TEST** manually in browser
7. **BUILD** to check TypeScript errors
8. **UPDATE** `FEATURES.md` to mark complete

### Task: Fix Bug
1. **IDENTIFY** exact error message
2. **READ** file where error occurs
3. **CHECK** related files (imports, dependencies)
4. **FIX** with minimal changes (don't refactor)
5. **TEST** fix works
6. **BUILD** to verify no new errors
7. **UPDATE** `ROADMAP.md` to mark bug as fixed

### Task: Refactor Code
1. **READ** entire file to understand context
2. **PLAN** changes in comments
3. **REFACTOR** incrementally (small steps)
4. **TEST** after each change
5. **BUILD** frequently to catch errors early
6. **UPDATE** relevant documentation

### Task: Add New Page
1. **READ** existing page for structure pattern
2. **CREATE** file in `src/app/new-page/page.tsx`
3. **ADD** to bottom nav if needed
4. **ADD** back button component
5. **TEST** navigation works
6. **UPDATE** `ARCHITECTURE.md` to document new route

### Task: Add New Component
1. **DETERMINE** which folder (quran/prayer/dua/home/layout)
2. **READ** existing component in same folder for pattern
3. **CREATE** file with TypeScript interface
4. **USE** Framer Motion for animations
5. **USE** Tailwind + design system colors
6. **TEST** in isolation first
7. **INTEGRATE** into page

---

## ⚠️ ANTI-PATTERNS (DO NOT DO)

### ❌ Don't: Create New API Wrappers
```typescript
// ❌ BAD - Creating duplicate API logic
export async function fetchSurah(id: number) {
  const res = await fetch(`https://api.quran.com/chapters/${id}`);
  return res.json();
}

// ✅ GOOD - Use existing wrapper
import { getChapter } from "@/lib/api";
const chapter = await getChapter(id);
```

### ❌ Don't: Use useState for Global State
```typescript
// ❌ BAD - Local state for global data
export function Component() {
  const [bookmarks, setBookmarks] = useState([]);
}

// ✅ GOOD - Use Zustand store
import { useBookmarkStore } from "@/store/bookmark-store";
const { bookmarks } = useBookmarkStore();
```

### ❌ Don't: Inline Styles
```typescript
// ❌ BAD - Inline styles
<div style={{ padding: "20px", borderRadius: "10px" }}>

// ✅ GOOD - Tailwind classes
<div className="p-5 rounded-xl">
```

### ❌ Don't: Ignore TypeScript Errors
```typescript
// ❌ BAD - Suppressing errors
// @ts-ignore
someFunction();

// ✅ GOOD - Fix the error properly
someFunction(properArgument);
```

### ❌ Don't: Break Mobile Responsive
```typescript
// ❌ BAD - Fixed width
<div style={{ width: "1200px" }}>

// ✅ GOOD - Responsive
<div className="max-w-7xl mx-auto px-4">
```

---

## 📝 DOCUMENTATION CHECKLIST

When making changes, update relevant docs:

- [ ] `PROJECT_OVERVIEW.md` - If adding new major feature
- [ ] `FEATURES.md` - Mark feature as complete/in-progress
- [ ] `ARCHITECTURE.md` - If changing structure
- [ ] `API_REFERENCE.md` - If using new API endpoint
- [ ] `DEVELOPMENT_GUIDE.md` - If adding new pattern
- [ ] `ROADMAP.md` - Update status
- [ ] `AGENTS.md` - If changing conventions

---

## 🎯 AI BEHAVIOR GUIDELINES

### When Working on This Project:

1. **BE CONSERVATIVE** - Don't make unnecessary changes
2. **READ FIRST** - Always read existing code before editing
3. **FOLLOW PATTERNS** - Match existing code style
4. **MINIMAL CHANGES** - Fix bugs with smallest possible change
5. **TEST OFTEN** - Run `npm run build` frequently
6. **DOCUMENT** - Update relevant .md files
7. **EXPLAIN** - Tell user what you're doing before doing it
8. **VERIFY** - Test that changes work correctly
9. **COMMIT** - (Optional) If user asks, commit with clear message

### Response Style:
- **BE DIRECT** - Get straight to the point
- **BE CONCISE** - Don't write novels
- **BE HELPFUL** - Explain what you're doing
- **BE HONEST** - If something is wrong, say it
- **BE PROACTIVE** - Suggest improvements

---

## 📞 User Communication

### If User Asks to:
- **"Add feature X"** → Check FEATURES.md first, then implement
- **"Fix bug Y"** → Check ROADMAP.md known bugs, then fix
- **"Explain how Z works"** → Read relevant code, explain clearly
- **"Deploy"** → See DEVELOPMENT_GUIDE.md deployment section
- **"Change tech stack"** → ADVISE AGAINST (see rules)

### If User is Confused:
- Point them to relevant .md file
- Explain with code examples
- Show before/after comparison

---

## 🔄 Version Control Notes

### Git Commit Message Format:
```
feat: Add audio player component
fix: Prayer API null check error
docs: Update FEATURES.md
refactor: Simplify bookmark store
style: Improve mobile responsive
test: Add unit tests for api.ts
chore: Update dependencies
```

### Branch Strategy (Optional):
- `main` - Production ready
- `dev` - Development
- `feature/*` - New features
- `fix/*` - Bug fixes

---

## 🏁 Final Notes

### Project Goals:
- **Professional** - Competition-grade quality
- **Modern** - Latest tech stack
- **Islamic** - Respectful, accurate content
- **Accessible** - Works for everyone
- **Fast** - Lighthouse 90+

### Success Criteria:
- All P0 bugs fixed
- All P1 features implemented
- Build passes with no errors
- Responsive on all devices
- Dark mode works
- APIs functioning

---

**This file ensures continuity across AI sessions. Read it at the start of each conversation.**

**Last Updated:** 2026-08-07
**Version:** 1.1
**Maintainer:** Kiro AI Assistant