# Al-Qur'an Digital 1.0 - Architecture & Design

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│           Next.js App Router (Frontend)         │
├─────────────────────────────────────────────────┤
│  Pages:  /  /surah/[id]  /prayer-times  /chat  │
│  /dua  /search  /bookmarks  /settings           │
├─────────────────────────────────────────────────┤
│         Components & React Hooks                │
│  (Framer Motion, Zustand, shadcn/ui)            │
├─────────────────────────────────────────────────┤
│       State Management (Zustand Stores)         │
│ bookmark-store  settings-store  prayer-store    │
├─────────────────────────────────────────────────┤
│            API Layer & Services                 │
│ quran-api  prayer-api  chat-api  search         │
├─────────────────────────────────────────────────┤
│         External APIs & LocalStorage            │
│ Quran.com  Aladhan  Gemini  localStorage        │
└─────────────────────────────────────────────────┘
```

## 📂 Folder Structure Explained

### `/app`
- **Root layout:** Theme provider, header, bottom nav
- **Pages:** Each route is a page
- **API routes:** `/api/chat/route.ts` untuk Gemini

### `/components`
- **layout/:** Header, Bottom Nav, Theme Provider, Animated BG
- **quran/:** Surah list, ayah cards, surah header
- **prayer/:** Prayer hero, list, streak tracker
- **dua/:** Dua grid, cards
- **home/:** Daily ayat, progress widget, quick actions
- **ui/:** shadcn primitives (Button, Input, Card, etc)

### `/lib`
- **api.ts:** Quran.com API wrapper (getChapters, getVerses, search)
- **prayer-api.ts:** Aladhan API + helpers
- **constants.ts:** Reciters, translation IDs, icons
- **utils.ts:** tailwind merge utilities

### `/hooks`
Custom React hooks (future: useApi, usePagination, dll)

### `/store`
Zustand stores:
- **bookmark-store.ts:** Save/remove bookmarks
- **settings-store.ts:** Font size, reciter, translation toggle, last read
- **prayer-store.ts:** Prayer checklist, streak counter
- **audio-store.ts:** Current playing ayat, playback state

### `/types`
TypeScript interfaces:
- **quran.ts:** Chapter, Verse, Translation, etc
- **prayer.ts:** PrayerTimesResponse, etc

### `/data`
- **dua-basic.json:** 25 duas dengan teks Arab, transliterasi, arti

## 🔄 Data Flow

### Reading Al-Qur'an Flow
```
User opens / → Home Dashboard
    ↓
User clicks surah → /surah/[id]
    ↓
getChapters() → Quran.com API
    ↓
getVerses() → Quran.com API (per halaman)
    ↓
Component render (Ayah cards)
    ↓
User scroll → IntersectionObserver detects
    ↓
setLastRead() → settings-store (persist localStorage)
    ↓
User click bookmark → addBookmark() → localStorage
```

### Prayer Times Flow
```
User opens /prayer-times
    ↓
getPrayerTimes() → Aladhan API (lokasi: Yogyakarta)
    ↓
getNextPrayer() → Calculate next sholat time
    ↓
useEffect countdown → Update setiap 1 detik
    ↓
Component render countdown timer
    ↓
User toggle prayer → usePrayerStore (toggle prayer)
    ↓
Persist ke localStorage (prayer-tracker)
```

### Chat Flow
```
User types message → /chat
    ↓
handleSubmit() → POST /api/chat
    ↓
Gemini API (dengan history context)
    ↓
JSON response {reply: "..."}
    ↓
Display message bubble
    ↓
Scroll to bottom
```

## 🎨 Component Hierarchy

```
RootLayout
├── ThemeProvider (next-themes)
├── TooltipProvider (shadcn)
├── AnimatedBackground (floating blobs)
├── Header
│   ├── Logo
│   ├── Last Read Badge
│   └── ThemeToggle
├── Main Content
│   ├── Home
│   ├── Surah Detail
│   ├── Prayer Times
│   ├── Dua
│   ├── Chat
│   ├── Search
│   ├── Bookmarks
│   └── Settings
└── BottomNav (mobile only)
    ├── Home
    ├── Quran
    ├── Sholat
    ├── Doa
    └── More
```

## 🔀 State Management Strategy

### Local Component State
- UI toggles, loading states
- Form inputs

### Zustand Stores (Persisted to localStorage)
- **bookmarks:** Save ayat/doa
- **settings:** Font size, reciter, translation toggle, last read
- **prayer:** Prayer checklist, streak
- **audio:** (future) Current playing ayat

### Server State
- Quran.com API responses (cached by Next.js)
- Aladhan API responses

## 🔌 API Integration Points

| API | Endpoint | Usage | Auth |
|---|---|---|---|
| **Quran.com** | api.quran.com/api/v4 | Chapters, verses, search, tafsir | None |
| **Aladhan** | api.aladhan.com/v1 | Prayer times, hijri calendar | None |
| **Gemini** | generativeai.googleapis.com | AI chat | API Key (env) |

## 🎯 Key Design Decisions

### 1. Why Zustand over Redux?
- Smaller bundle size
- Simpler API
- Built-in persistence middleware
- Perfect untuk simple state management

### 2. Why Framer Motion for animations?
- Powerful spring animations
- Easy stagger effect untuk lists
- Smooth page transitions
- Great DX

### 3. Why shadcn/ui?
- Customizable components
- Tailwind-based (matches project)
- Accessibility built-in
- Small bundle size

### 4. Why localStorage untuk persistence?
- No backend needed
- Fast access
- Simple API
- Good untuk MVP

### 5. Responsive Strategy
- Mobile-first design
- Bottom nav untuk mobile
- CSS breakpoints: sm(640), md(768), lg(1024)
- Touch-friendly buttons

## 🚀 Performance Considerations

- **Code Splitting:** Route-based splitting (Next.js automatic)
- **Image Optimization:** shadcn images lazy-loaded
- **API Caching:** Next.js cache + revalidate: 86400
- **Bundle Size:** ~250kb gzipped (target)
- **Lighthouse:** Target 90+ score

---

**Last Updated:** 2026-08-04