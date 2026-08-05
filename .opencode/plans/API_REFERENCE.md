# Al-Qur'an Digital 1.0 - API Reference

## 📚 External APIs Used

### 1. Quran.com API v4
**Base URL:** `https://api.quran.com/api/v4`
**Documentation:** https://api-docs.quran.com/docs/category/quran.com-api
**Authentication:** None required

#### Endpoints Used

##### Get All Chapters
```
GET /chapters?language=id
Response: { chapters: Chapter[] }
```

**Usage:**
```typescript
import { getChapters } from "@/lib/api";
const chapters = await getChapters("id");
```

##### Get Single Chapter
```
GET /chapters/{id}?language=id
Response: { chapter: Chapter }
```

##### Get Verses by Chapter
```
GET /verses/by_chapter/{chapter_id}
Params:
  - language: "id" | "en"
  - words: "true" (include word-by-word)
  - translations: "33" (ID: Indonesian, 131: English)
  - page: number
  - per_page: number (default 50)
  
Response: { 
  verses: Verse[], 
  pagination: PaginationMeta 
}
```

**Usage:**
```typescript
const data = await getVerses(1, 1, 50, "id");
// chapter 1, page 1, 50 per page, Indonesian
```

##### Search Quran
```
GET /search?q={query}&language=id&size=20&page=1
Response: {
  search: {
    results: Array<{
      verse_key: string,
      text: string,
      translations: Array<{ text: string }>
    }>
  }
}
```

##### Get Reciters
```
GET /resources/recitations?language=en
Response: { reciters: Reciter[] }
```

##### Get Chapter Audio
```
GET /chapter_recitations/{reciter_id}/{chapter_id}
Response: { audio_file: AudioFile }
```

##### Get Verse Audio
```
GET /recitations/{reciter_id}/by_ayah/{verse_key}
Response: { audio_file: { url: string } }
```

**Reciter IDs Used:**
- `7` - Mishari Rashid al-Afasy
- `1` - Abdul Basit Abdul Samad
- `5` - Abu Bakr al-Shatri
- `6` - Maher Al Muaiqly
- `10` - Saad al-Ghamdi

---

### 2. Al-Adhan API (Aladhan.com)
**Base URL:** `https://api.aladhan.com/v1`
**Documentation:** https://aladhan.com/prayer-times-api
**Authentication:** None required

#### Endpoints Used

##### Get Prayer Times by City
```
GET /timings/{date}?city={city}&country={country}
Params:
  - date: YYYY-MM-DD or timestamp
  - city: "Yogyakarta"
  - country: "Indonesia"
  - method: 2 (ISNA) default
  
Response: {
  code: 200,
  data: {
    timings: {
      Fajr: "04:45",
      Sunrise: "05:58",
      Dhuhr: "11:55",
      Asr: "15:18",
      Maghrib: "17:48",
      Isha: "19:02"
    },
    date: {
      readable: "04 Aug 2026",
      hijri: {
        date: "10 Safar 1448",
        month: { en: "Ṣafar" }
      }
    }
  }
}
```

**Usage:**
```typescript
import { getPrayerTimes } from "@/lib/prayer-api";
const prayerData = await getPrayerTimes();
```

##### Get Hijri Calendar
```
GET /gToH/{date}
Converts Gregorian to Hijri date
```

##### Get Current Islamic Date
```
GET /currentDate
Response: { data: { hijri: {...} } }
```

---

### 3. Google Gemini API
**Base URL:** `https://generativelanguage.googleapis.com/v1beta`
**Documentation:** https://ai.google.dev/gemini-api/docs
**Authentication:** API Key required

#### Model Used
- **Model:** `gemini-pro`
- **Temperature:** 0.7 (default)
- **Max Tokens:** 2048

#### Implementation
```typescript
// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const chat = model.startChat({
  history: [...previousMessages],
});

const result = await chat.sendMessage(userMessage);
const response = result.response.text();
```

#### System Prompt
```
Kamu adalah sahabat Muslim yang membantu pengguna belajar Islam dengan cara yang natural dan bersahabat.

Pedoman:
1. Jawab seperti teman yang mengobrol biasa, tapi tetap sopan
2. Berikan sumber yang jelas kalau bahas ayat/hadits
3. Jujur kalau tidak tahu
4. Tidak memberikan fatwa yang kompleks (sarankan ke ulama)
5. Bisa ngobrol santai tentang topik apapun (tidak harus selalu Islam)
```

#### Environment Variable
```env
# .env.local
GEMINI_API_KEY=AIzaSy...
```

---

## 🔧 Helper Functions

### Prayer API Helpers

#### getNextPrayer()
Calculate next prayer time from current time
```typescript
export function getNextPrayer(prayerTimes: PrayerTimesData) {
  const times = prayerTimes?.timings || {};
  // Returns: { name: string, time: string, secondsLeft: number }
}
```

#### formatTime()
Format seconds to human-readable time
```typescript
export function formatTime(seconds: number): string {
  // Returns: "2h 15m 30s" or "45m 30s"
}
```

---

## 📊 Data Models

### Chapter (Surah)
```typescript
interface Chapter {
  id: number;
  revelation_place: "makkah" | "madinah";
  name_simple: string; // "Al-Fatihah"
  name_complex: string;
  name_arabic: string; // "الفاتحة"
  verses_count: number;
  translated_name: {
    language_name: string;
    name: string; // "The Opening"
  };
}
```

### Verse (Ayat)
```typescript
interface Verse {
  id: number;
  verse_number: number;
  verse_key: string; // "1:1"
  text_uthmani: string; // Arabic text
  words?: Word[];
  translations?: Translation[];
  audio?: { url: string };
}
```

### Prayer Times Response
```typescript
interface PrayerTimesResponse {
  code: number;
  data: {
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
    date: {
      readable: string;
      hijri: { date: string; month: { en: string } };
    };
  };
}
```

---

## ⚠️ Rate Limits & Best Practices

### Quran.com API
- **Rate Limit:** No official limit, but use reasonable caching
- **Best Practice:** Cache responses with `revalidate: 86400` (24 hours)
- **Error Handling:** Retry with exponential backoff

### Aladhan API
- **Rate Limit:** No strict limit
- **Best Practice:** Cache prayer times per day (valid until midnight)
- **Error Handling:** Fallback to default times if API fails

### Gemini API
- **Rate Limit:** 
  - Free tier: 15 RPM (requests per minute)
  - Paid tier: 360 RPM
- **Best Practice:** Implement retry logic, show loading states
- **Error Handling:** User-friendly error messages

---

## 🔐 Security Notes

1. **API Keys:** Store in `.env.local`, never commit to git
2. **Client-side:** Quran & Aladhan APIs are safe to call from client
3. **Server-side:** Gemini API calls via `/api/chat/route.ts` to hide key
4. **CORS:** All APIs support CORS, no proxy needed

---

**Last Updated:** 2026-08-04