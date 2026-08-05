# Al-Qur'an Digital 1.0 - Development Guide

## 🚀 Getting Started

### Prerequisites
- **Node.js:** 18+ (recommended: 20.x LTS)
- **Package Manager:** npm or yarn
- **IDE:** VS Code (recommended)
- **Browser:** Chrome/Firefox for testing

### Initial Setup

1. **Clone/Navigate to Project**
```bash
cd "C:\Users\LENOVO\OneDrive\Documents\Programming\Al-Qur'an_1.0"
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment Variables**
Create `.env.local` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

To get Gemini API key:
- Visit https://aistudio.google.com/apikey
- Click "Create API Key"
- Copy and paste to `.env.local`

4. **Run Development Server**
```bash
npm run dev
```

Open http://localhost:3000

---

## 📦 Package Scripts

```json
{
  "dev": "next dev",           // Start dev server
  "build": "next build",       // Production build
  "start": "next start",       // Start production server
  "lint": "eslint"            // Run linter
}
```

---

## 🏗️ Project Structure Guide

### Adding a New Page

1. Create page file in `/app`:
```typescript
// src/app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page</div>;
}
```

2. Add to bottom nav (if needed):
```typescript
// src/components/layout/bottom-nav.tsx
const navItems = [
  ...existing,
  { href: "/new-page", icon: NewIcon, label: "New" }
];
```

### Adding a New Component

1. Create component file:
```typescript
// src/components/feature/new-component.tsx
"use client"; // if using hooks/state

import { motion } from "framer-motion";

export function NewComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Content
    </motion.div>
  );
}
```

2. Use in page:
```typescript
import { NewComponent } from "@/components/feature/new-component";
```

### Adding a New API Endpoint

1. Create route handler:
```typescript
// src/app/api/new-endpoint/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const data = { message: "Hello" };
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ received: body });
}
```

2. Call from client:
```typescript
const response = await fetch("/api/new-endpoint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ data: "value" }),
});
const result = await response.json();
```

### Adding a New Zustand Store

1. Create store file:
```typescript
// src/store/new-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NewStore {
  value: string;
  setValue: (val: string) => void;
}

export const useNewStore = create<NewStore>()(
  persist(
    (set) => ({
      value: "",
      setValue: (value) => set({ value }),
    }),
    { name: "new-store" } // localStorage key
  )
);
```

2. Use in component:
```typescript
"use client";
import { useNewStore } from "@/store/new-store";

export function Component() {
  const { value, setValue } = useNewStore();
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

---

## 🎨 Styling Guide

### Using Tailwind Classes
```tsx
<div className="rounded-xl border bg-card p-6 hover:shadow-lg transition-all">
  Content
</div>
```

### Custom Colors
```tsx
// From design system
<div className="bg-primary text-primary-foreground" />
<div className="text-gold bg-teal" />
```

### Responsive Design
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
</div>
```

### Dark Mode
```tsx
<div className="bg-white dark:bg-[#161B22]">
  Auto switches based on theme
</div>
```

---

## 🎭 Animation Patterns

### Page Transition
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Page content
</motion.div>
```

### Staggered List
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.div key={i} variants={item}>
      {i}
    </motion.div>
  ))}
</motion.div>
```

---

## 🐛 Debugging Tips

### Check localStorage
```javascript
// Browser console
localStorage.getItem('quran-bookmarks')
localStorage.getItem('quran-settings')
localStorage.getItem('prayer-tracker')
```

### Clear all data
```javascript
localStorage.clear();
window.location.reload();
```

### Check API responses
```typescript
const data = await getChapters();
console.log("Chapters:", data);
```

### React DevTools
Install React DevTools extension to inspect:
- Component tree
- Props & State
- Zustand stores (via Components tab)

---

## 🧪 Testing

### Manual Testing Checklist

**Home Page:**
- [ ] Daily Ayat displays correctly
- [ ] Last Read card shows/hides based on data
- [ ] Quick Actions navigate correctly
- [ ] Surah search works
- [ ] Surah cards clickable

**Surah Detail:**
- [ ] Arabic text renders correctly (Amiri font)
- [ ] Translation shows/hides via settings
- [ ] Bookmark toggle works
- [ ] Copy button copies text
- [ ] Back button navigates home
- [ ] Last read auto-updates on scroll

**Prayer Times:**
- [ ] 5 prayer times display
- [ ] Countdown updates every second
- [ ] Prayer tracker checkboxes work
- [ ] Streak counter increments
- [ ] Persists across refresh

**Doa:**
- [ ] Cards expand/collapse
- [ ] Bookmark works
- [ ] Copy works
- [ ] Arabic text renders

**Chat:**
- [ ] Message sends
- [ ] AI responds
- [ ] Loading state shows
- [ ] Error handling works
- [ ] Suggested questions work

**Search:**
- [ ] Search returns results
- [ ] Links navigate to correct surah
- [ ] Empty state shows

**Bookmarks:**
- [ ] Lists all bookmarks
- [ ] Delete works
- [ ] Copy works
- [ ] Empty state shows

**Settings:**
- [ ] Theme toggle works
- [ ] Font size slider updates preview
- [ ] Translation toggle persists
- [ ] Qari selection persists
- [ ] Reset data works

---

## 📱 Mobile Testing

### Responsive Breakpoints
- **Mobile:** < 640px (Bottom nav visible)
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Test on:
1. Chrome DevTools mobile emulation
2. Real device (Android/iOS)
3. Different orientations (portrait/landscape)

### Check:
- [ ] Bottom nav works
- [ ] Touch targets are large enough (min 44x44px)
- [ ] Text is readable
- [ ] No horizontal scroll
- [ ] Animations smooth

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Check for:
- TypeScript errors
- Build warnings
- Bundle size

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Add Environment Variables**
In Vercel dashboard:
- Settings → Environment Variables
- Add `GEMINI_API_KEY`

5. **Redeploy**
```bash
vercel --prod
```

### Alternative: Manual Deploy

1. Build locally:
```bash
npm run build
```

2. Upload `.next` folder + other files to hosting
3. Set environment variables
4. Run `npm start`

---

## 🔧 Common Issues & Solutions

### Issue: Prayer times not loading
**Solution:** Check network, API might be down. Add fallback times.

### Issue: Chat not responding
**Solution:** Check `.env.local` has correct API key.

### Issue: Dark mode not working
**Solution:** Check `ThemeProvider` wraps app in layout.tsx

### Issue: Bookmark not saving
**Solution:** Check localStorage quota, clear if needed.

### Issue: Build fails
**Solution:** Run `npm install`, check TypeScript errors.

---

## 📚 Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/
- **shadcn/ui:** https://ui.shadcn.com/
- **Zustand:** https://docs.pmnd.rs/zustand/

---

**Last Updated:** 2026-08-04