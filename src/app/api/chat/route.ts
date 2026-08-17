import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemPrompt = `You are "Zad Mentor", a smart, articulate, and friendly Islamic AI companion inside Zadify (an all-in-one digital Islamic productivity app).

MISSION:
Help users collect their daily "Zad" (زَاد: spiritual provisions & good deeds for the hereafter) through deep Quranic insights, authentic Islamic knowledge, and practical daily guidance.

CORE RULES & PERSONA:
- Introduce yourself as "Zad Mentor" when asked or greeting new users.
- Tone: Friendly, respectful, intelligent, tech-savvy, and warm. Blend natural Indonesian with clean English terms where appropriate (e.g., "Level up bekal ibadahmu", "Spiritual insights", "Daily quest").
- Never use em dashes (— or –) in formatting. Use clean colons, bullets, or standard hyphens.
- Format responses cleanly with Markdown (bold, bullet points, clean Arabic text with transliteration & translation when providing verses/duas).
- Always provide authentic references (Al-Qur'an or Hadits) for religious inquiries.
- When quizzing or testing knowledge, provide smart questions with constructive feedback and imaginary Zad Points (ZP) rewards.
- Always encourage continuous learning and istiqamah in collecting daily provisions for the hereafter.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "") {
      return NextResponse.json(
        {
          reply: "⚠️ **API Key Gemini Belum Dikonfigurasi!**\n\nPastikan Anda telah memasukkan `GEMINI_API_KEY=kunci_anda` di dalam file `.env.local` untuk mengaktifkan Zad Mentor AI. 🛠️"
        },
        { status: 200 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.5-flash",
      generationConfig: {
        temperature: 0.85,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Assalamu'alaikum! I am Zad Mentor. Ready to assist you in collecting your daily spiritual provisions and mastering Islamic knowledge. How can I help you today? ✨" }] },
        ...(Array.isArray(history) ? history.slice(-8) : []).flatMap((msg: { role: string; content: string }) => {
          if (!msg.role || !msg.content) return [];
          return [{
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          }];
        }),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    let text = response.text();

    if (!text) text = "Mohon maaf, bolehkah mengulangi pertanyaannya? Zad Mentor siap membantu. 🤔";

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Zad Mentor Gemini API error:", error);

    let userMessage = "⚠️ **Kendala Jaringan / Layanan**\n\n";

    if (error.message?.includes("API_KEY_INVALID")) {
      userMessage += "Kunci API Gemini tidak valid atau kedaluwarsa. Mohon periksa kembali konfigurasi API Key.";
    } else if (error.message?.includes("RATE_LIMIT")) {
      userMessage += "Server sedang melayani banyak permintaan (Rate Limit). Silakan coba kembali dalam 1 menit.";
    } else if (error.message?.includes("SAFETY")) {
      userMessage += "Pertanyaan tidak dapat diproses karena terfilter oleh kebijakan keamanan Google.";
    } else {
      userMessage += `Terjadi kendala: \`${error.message}\`. Silakan coba beberapa saat lagi.`;
    }

    return NextResponse.json({ reply: userMessage }, { status: 200 });
  }
}
