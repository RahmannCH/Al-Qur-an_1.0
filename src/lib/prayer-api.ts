import type { PrayerTimesResponse } from "@/types/prayer";

const API_BASE = "https://api.aladhan.com/v1";

export async function getPrayerTimes(latitude?: number, longitude?: number): Promise<NonNullable<PrayerTimesResponse["data"]>> {
  const currentDate = new Date().toISOString().split("T")[0];
  const lat = latitude ?? -3.4472;
  const lng = longitude ?? 114.8405;

  // 1. Jika di sisi browser, gunakan proxy internal API route untuk menghindari CORS / TypeError
  if (typeof window !== "undefined") {
    try {
      const res = await fetch(`/api/prayer-times?latitude=${lat}&longitude=${lng}&date=${currentDate}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (err) {
      console.warn("Client internal proxy failed, trying direct or fallback:", err);
    }
  }

  // 2. Fetch langsung (Server-side atau Direct Fallback)
  try {
    const url = `${API_BASE}/timings/${currentDate}?latitude=${lat}&longitude=${lng}&method=2`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });
    
    if (response.ok) {
      const data: PrayerTimesResponse = await response.json();
      if (data.data) return data.data;
    }
  } catch (error) {
    console.error("Direct prayer times fetch error:", error);
  }

  // 3. Fallback dinamis berdasarkan tanggal hari ini
  return getDynamicFallbackPrayerTimes();
}

function getDynamicFallbackPrayerTimes(): NonNullable<PrayerTimesResponse["data"]> {
  const now = new Date();
  
  // Format tanggal Masehi hari ini
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const gregorianWeekday = days[now.getDay()];
  const gregorianMonth = months[now.getMonth()];
  const gregorianDay = String(now.getDate()).padStart(2, "0");
  const gregorianYear = String(now.getFullYear());

  // Estimasi tanggal Hijriah dinamis (tahun 2026/2027 berkisar 1447-1448 H)
  // Menggunakan Intl jika didukung
  let hijriDay = "15";
  let hijriMonthNumber = 8;
  let hijriMonthEn = "Sha'ban";
  let hijriYear = "1448";

  try {
    const hijriFormatter = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    const parts = hijriFormatter.formatToParts(now);
    const d = parts.find((p) => p.type === "day")?.value;
    const m = parts.find((p) => p.type === "month")?.value;
    const y = parts.find((p) => p.type === "year")?.value;

    if (d) hijriDay = d;
    if (m) hijriMonthNumber = parseInt(m, 10);
    if (y) hijriYear = y;

    const hijriMonthsEn = [
      "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
      "Jumada al-ula", "Jumada al-akhirah", "Rajab", "Sha'ban",
      "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
    ];
    hijriMonthEn = hijriMonthsEn[hijriMonthNumber - 1] || "Sha'ban";
  } catch {}

  return {
    date: {
      readable: now.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      timestamp: Date.now(),
      hijri: {
        date: { string: `${hijriDay} ${hijriMonthEn} ${hijriYear}` },
        year: hijriYear,
        month: { number: hijriMonthNumber, en: hijriMonthEn },
        day: hijriDay,
      },
      gregorian: {
        date: { string: `${gregorianDay} ${gregorianMonth.slice(0, 3)} ${gregorianYear}` },
        weekday: { en: gregorianWeekday },
        year: gregorianYear,
        month: { number: now.getMonth() + 1, en: gregorianMonth },
        day: gregorianDay,
      },
    },
    timings: {
      Fajr: "05:04",
      Sunrise: "06:21",
      Dhuhr: "12:28",
      Asr: "15:47",
      Sunset: "18:32",
      Maghrib: "18:32",
      Isha: "19:42",
      Imsak: "04:54",
      Midnight: "00:28",
    },
  };
}

export function getNextPrayer(prayerTimes: NonNullable<PrayerTimesResponse["data"]>) {
  const times = prayerTimes?.timings;
  
  if (!times || !times.Fajr || !times.Dhuhr || !times.Asr || !times.Maghrib || !times.Isha) {
    return {
      name: "Fajr",
      time: "04:45",
      secondsLeft: 16200,
    };
  }
  
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  for (const prayer of prayers) {
    const timeStr = times[prayer as keyof typeof times];
    if (!timeStr) continue;
    
    const [hour, minute] = timeStr.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute)) continue;
    
    const prayerTime = hour * 60 + minute;

    if (prayerTime > currentTime) {
      return {
        name: prayer,
        time: timeStr,
        secondsLeft: (prayerTime - currentTime) * 60,
      };
    }
  }

  return {
    name: "Fajr",
    time: times.Fajr,
    secondsLeft: (24 * 60 - currentTime + 4 * 60) * 60,
  };
}

export function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  if (h > 0) {
    return `${h}h ${m}m ${s}s`;
  }
  return `${m}m ${s}s`;
}

export function getPrayerProgress(currentTime: string, nextTime: string) {
  const [currH, currM] = currentTime.split(":").map(Number);
  const [nextH, nextM] = nextTime.split(":").map(Number);
  
  const currentMinutes = currH * 60 + currM;
  const nextMinutes = nextH * 60 + nextM;
  
  const totalTime = nextMinutes - currentMinutes;
  const elapsed = currentMinutes - currentMinutes;
  
  return Math.min(100, Math.max(0, (elapsed / totalTime) * 100));
}
