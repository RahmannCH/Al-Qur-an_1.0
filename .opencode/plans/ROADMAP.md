# Al-Qur'an Digital 1.0 - Product Roadmap

## 📅 Timeline Overview

```
Week 1 (Aug 4-10)      Week 2 (Aug 11-17)     Week 3 (Aug 18-24)
├─ P0 Bugs Fix         ├─ Audio Player        ├─ PWA Setup
├─ Back Button         ├─ Qibla Compass      ├─ Statistics
├─ Chat Improvement   ├─ Tafsir Modal       ├─ Achievements
└─ Error Handling     └─ Reading Plan        └─ Polish
```

---

## 🔴 PHASE 0: Critical Bug Fixes (Days 1-2)

### P0.1 - Fix Prayer API Error
**Problem:** `Cannot read properties of undefined (reading 'Fajr')`
**Root Cause:** API returns undefined for timings sometimes

**Solution:**
- [ ] Add null checks in `getNextPrayer()`
- [ ] Add fallback default times
- [ ] Test with error boundary
- [ ] Add user-friendly error messages

**Files to Update:**
- `src/lib/prayer-api.ts` — Add safety checks
- `src/components/prayer/prayer-hero.tsx` — Add error state

**Estimated Time:** 30 minutes

---

### P0.2 - Fix Chat Bot Error & Improve Flexibility
**Problem:** Chat error on message send, responses too rigid

**Solution:**
- [ ] Improve error handling in `/api/chat/route.ts`
- [ ] Upgrade system prompt (more natural, less robotic)
- [ ] Add retry logic
- [ ] Add streaming response (future)
- [ ] Better error messages to user

**Files to Update:**
- `src/app/api/chat/route.ts` — Better error handling
- `src/app/chat/page.tsx` — User-friendly errors

**Estimated Time:** 45 minutes

---

### P0.3 - Add Back Button All Pages
**Problem:** Users must use header to navigate back

**Solution:**
- [ ] Create `<BackButton />` component
- [ ] Add to all pages (except home)
- [ ] Floating button top-left
- [ ] Keyboard shortcut: Escape key
- [ ] Mobile swipe gesture (future)

**Files to Create:**
- `src/components/layout/back-button.tsx` — New component

**Files to Update:**
- `src/app/surah/[id]/page.tsx`
- `src/app/prayer-times/page.tsx`
- `src/app/dua/page.tsx`
- `src/app/chat/page.tsx`
- `src/app/search/page.tsx`
- `src/app/bookmarks/page.tsx`
- `src/app/settings/page.tsx`

**Estimated Time:** 1 hour

---

## 🟡 PHASE 1: Core Features (Week 1-2)

### P1.1 - Audio Player (Day 3-4)
**Priority:** HIGH — Core feature

**Features:**
- [ ] Sticky bottom player (fixed position)
- [ ] Play/Pause per ayat
- [ ] Next/Previous buttons
- [ ] Progress slider
- [ ] Current time / Total time display
- [ ] Qari selection dropdown
- [ ] Speed control (0.5x, 1x, 1.5x)
- [ ] Volume control
- [ ] Auto-scroll to current ayat highlight
- [ ] Keyboard shortcuts (spacebar=play/pause, arrow keys=next/prev)
- [ ] Minimize/expand button

**Components to Create:**
- `src/components/quran/audio-player.tsx` — Main player
- `src/components/quran/audio-controls.tsx` — Control buttons

**Files to Update:**
- `src/app/surah/[id]/page.tsx` — Integrate player
- `src/store/audio-store.ts` — Enhance with more states
- `src/lib/api.ts` — Add audio URL helpers

**Estimated Time:** 1.5 hours

---

### P1.2 - Qibla Compass (Day 4)
**Priority:** MEDIUM

**Features:**
- [ ] Real-time compass using DeviceOrientation API
- [ ] Visual compass indicator
- [ ] Direction to Mecca (North-based)
- [ ] Accuracy display
- [ ] Permission handling
- [ ] Fallback for desktop (manual direction)

**Components to Create:**
- `src/components/prayer/qibla-compass.tsx` — Compass display

**Files to Update:**
- `src/app/prayer-times/page.tsx` — Add compass

**Estimated Time:** 1 hour

---

### P1.3 - Tafsir Integration & Modal (Day 5-6)
**Priority:** HIGH

**Features:**
- [ ] Click ayat → show tafsir modal
- [ ] Multiple tafsir options (Ibn Kathir, Jalalayn, Al-Baydawi)
- [ ] Beautiful modal design
- [ ] Close on background click
- [ ] Keyboard close (Escape)
- [ ] Bookmark tafsir
- [ ] Share tafsir snippet

**Components to Create:**
- `src/components/quran/tafsir-modal.tsx` — Modal
- `src/components/quran/tafsir-selector.tsx` — Tafsir option picker

**Files to Update:**
- `src/components/quran/ayah-card.tsx` — Add tafsir button
- `src/lib/api.ts` — Add getTafsir() function
- `src/types/quran.ts` — Add Tafsir interface

**Estimated Time:** 1.5 hours

---

### P1.4 - Reading Plan & Khatam Tracker (Day 6-7)
**Priority:** HIGH — Gamification element

**Features:**
- [ ] Set khatam target (30/60/90 days)
- [ ] Daily reading goal calculation
- [ ] Visual progress bar per juz
- [ ] Suggested daily reading (ayat count)
- [ ] Completion percentage
- [ ] Completion deadline
- [ ] Motivational messages
- [ ] Browser notifications (optional)
- [ ] Reset option

**Components to Create:**
- `src/components/home/reading-plan-widget.tsx` — Plan display
- `src/app/progress/page.tsx` — Detailed progress page

**Files to Create:**
- `src/store/reading-plan-store.ts` — Plan state

**Estimated Time:** 1.5 hours

---

### P1.5 - Share Ayat as Image (Day 7)
**Priority:** MEDIUM

**Features:**
- [ ] Generate beautiful ayat card (html2canvas)
- [ ] Customizable template:
  - Font size
  - Color scheme
  - Background style (gradient/solid)
- [ ] Download as image
- [ ] Share to WhatsApp (opens link)
- [ ] Share to Twitter (pre-filled text)
- [ ] Social media optimized dimensions

**Components to Create:**
- `src/components/quran/share-ayat-modal.tsx` — Share UI
- `src/components/quran/ayat-card-preview.tsx` — Preview template

**Files to Update:**
- `src/components/quran/ayah-card.tsx` — Add share button

**Estimated Time:** 1 hour

---

## 🟢 PHASE 2: Enhancement Features (Week 2-3)

### P2.1 - Dzikir Counter (Day 8)
**Features:**
- [ ] Tap to increment counter
- [ ] Preset counters (33x, 100x, custom)
- [ ] Vibration feedback (mobile)
- [ ] Sound (optional, toggle)
- [ ] Progress ring visualization
- [ ] Reset button
- [ ] History/tracking (last count)

**Components to Create:**
- `src/app/dzikir/page.tsx` — Dzikir counter page
- `src/components/home/dzikir-widget.tsx` — Widget version

**Estimated Time:** 45 minutes

---

### P2.2 - Statistics & Achievements (Day 8-9)
**Features:**
- [ ] Total ayat read
- [ ] Longest streak
- [ ] Badges system (earn on milestones):
  - "First Read" (read first ayat)
  - "7 Day Streak"
  - "30 Day Streak"
  - "Khatam Complete"
  - "100 Bookmarks"
  - "Chat Master" (50 messages)
- [ ] Points/XP system
- [ ] Level system (1-30)
- [ ] Local leaderboard (optional)

**Components to Create:**
- `src/app/achievements/page.tsx` — Achievements page
- `src/components/home/stats-widget.tsx` — Stats display

**Files to Create:**
- `src/store/achievements-store.ts` — Achievement state

**Estimated Time:** 1.5 hours

---

### P2.3 - Word-by-Word Translation (Day 9-10)
**Features:**
- [ ] Hover/tap Arabic word → tooltip with translation
- [ ] Transliteration per word
- [ ] Root word analysis (if available)
- [ ] Part of speech (noun, verb, etc)
- [ ] Beautiful tooltip design

**Components to Create:**
- `src/components/quran/word-tooltip.tsx` — Tooltip

**Files to Update:**
- `src/types/quran.ts` — Add Word interface details
- `src/lib/api.ts` — Use word data from API

**Estimated Time:** 1 hour

---

### P2.4 - Hijri Calendar Widget (Day 10)
**Features:**
- [ ] Current Hijri date display
- [ ] Islamic events highlight:
  - Ramadhan start/end
  - Idul Fitri
  - Idul Adha
  - Islamic New Year
- [ ] Calendar month view
- [ ] Conversion tools

**Components to Create:**
- `src/components/home/hijri-calendar.tsx` — Calendar widget
- `src/app/calendar/page.tsx` — Full calendar page

**Estimated Time:** 45 minutes

---

## 🔵 PHASE 3: Polish & Optimization (Week 3)

### P3.1 - PWA Offline Mode (Day 11-12)
**Features:**
- [ ] Service worker setup
- [ ] Cache Quran data
- [ ] Offline Quran reading
- [ ] Sync when online
- [ ] Install prompt
- [ ] Offline indicator

**Files to Create:**
- `public/service-worker.js` — Service worker
- `src/lib/offline.ts` — Offline helpers

**Estimated Time:** 1.5 hours

---

### P3.2 - Night Mode Auto-Switch (Day 12)
**Features:**
- [ ] Auto dark mode between Maghrib-Subuh
- [ ] Based on prayer times
- [ ] Manual override option
- [ ] User preference persistence

**Files to Update:**
- `src/app/layout.tsx` — Add auto-theme logic
- `src/store/settings-store.ts` — Add auto-theme setting

**Estimated Time:** 30 minutes

---

### P3.3 - Micro-interactions & Polish (Day 13)
**Features:**
- [ ] Haptic feedback (mobile)
- [ ] Page transitions smooth
- [ ] Loading states improved
- [ ] Skeleton screens all pages
- [ ] Pull-to-refresh (mobile)
- [ ] Smooth scroll animations

**Estimated Time:** 2 hours

---

### P3.4 - Performance Optimization (Day 13-14)
**Features:**
- [ ] Image lazy loading
- [ ] Virtualized lists (long lists)
- [ ] Code splitting per route
- [ ] Bundle size analysis
- [ ] Lighthouse 90+ score

**Estimated Time:** 1 hour

---

### P3.5 - Accessibility Improvements (Day 14)
**Features:**
- [ ] High contrast mode
- [ ] Font size presets
- [ ] Screen reader support
- [ ] Keyboard navigation
- [ ] Color blind mode (future)

**Estimated Time:** 1.5 hours

---

## 🎯 Success Metrics

### Performance
- Lighthouse score: 90+
- Bundle size: < 300kb gzipped
- TTFB: < 1s
- FCP: < 2s

### User Experience
- All 10 core features working
- No console errors
- Smooth animations
- Mobile responsive
- Dark mode working

### Code Quality
- TypeScript strict mode
- No ESLint warnings
- Test coverage: 80%+ (future)
- Accessibility: WCAG 2.1 AA

---

## 📝 Notes

- **Each feature** should include testing
- **Each day** should have 1-2 features max
- **Daily commits** to git with clear messages
- **User testing** at end of each phase
- **Bug fixes** as they arise (P0 always)
- **Documentation** updated simultaneously

---

**Roadmap Status:** Active Development
**Last Updated:** 2026-08-04
**Next Review:** 2026-08-11