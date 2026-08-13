import type { PrayerTimesResponse } from "@/types/prayer";

const API_BASE = "https://api.aladhan.com/v1";

export async function getPrayerTimes(latitude?: number, longitude?: number) {
  try {
    const currentDate = new Date().toISOString().split("T")[0];
    
    // Default ke koordinat Banjarbaru, Kalimantan Selatan jika GPS tidak ada
    const lat = latitude ?? -3.4472;
    const lng = longitude ?? 114.8405;
    
    const url = `${API_BASE}/timings/${currentDate}?latitude=${lat}&longitude=${lng}&method=2`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: PrayerTimesResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("Prayer times fetch error:", error);
    return getFallbackPrayerTimes();
  }
}

function getFallbackPrayerTimes(): NonNullable<PrayerTimesResponse["data"]> {
  return {
    date: {
      readable: new Date().toLocaleDateString("id-ID"),
      timestamp: Date.now(),
      hijri: {
        date: { string: "10 Safar 1448" },
        year: "1448",
        month: { number: 2, en: "Ṣafar" },
        day: "10"
      },
      gregorian: {
        date: { string: "04 Aug 2026" },
        weekday: { en: "Tuesday" },
        year: "2026",
        month: { number: 8, en: "August" },
        day: "04"
      }
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
      Midnight: "00:28"
    }
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
